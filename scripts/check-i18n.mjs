#!/usr/bin/env node
/**
 * Localization checker — compares English overlays (src/data/en/) against the
 * Chinese source data (src/data/) and reports structural mismatches.
 *
 * Usage:
 *   npm run check:i18n                                  full report (all content + coverage)
 *   npm run check:i18n -- src/data/en/events/news.ts    only the given overlay module(s)
 *
 * Loads the TypeScript modules through Vite's SSR loader, so no extra tooling is needed.
 * Exits with code 1 when any error is found.
 */

import { createServer } from 'vite';

const CHAR_PREFIX = {
  lin_xiaojuan: 'lxj_', gu_mianmian: 'gmm_', ye_zhiqiu: 'yzq_', bai_xiaoman: 'bxm_',
  bi_xiaotian: 'bxt_', qian_duoduo: 'qdd_', he_shixu: 'hsx_', tang_kuolie: 'tkl_',
  mo_wenxuan: 'mwx_', xie_zhiwei: 'xzw_',
};

// Placeholders the English renderer understands. Pronoun forms resolve to he/she
// (him/her, his/her, himself/herself) from the bound student's profile.
const S1 = ['studentName', 'he', 'him', 'his', 'He', 'His', 'himself'];
const S2 = ['student2Name', 'he2', 'him2', 'his2', 'He2', 'His2', 'himself2'];
const KNOWN = new Set([...S1, ...S2, 'projectMonths']);

// Pinyin given names that must never leak into English text (canonical English names only).
const PINYIN = /\b(Xiaojuan|Mianmian|Zhiqiu|Xiaoman|Xiaotian|Duoduo|Shixu|Kuolie|Wenxuan|Zhiwei)\b/;
const HAN = /[㐀-鿿　-〿！-｠]/;

const errors = [];
const warnings = [];
const err = (where, msg) => errors.push(`✗ ${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`! ${where}: ${msg}`);

function collectStrings(ev) {
  const out = [ev.title, ev.tagline, ev.prompt, ...(ev.description ?? [])];
  for (const o of ev.options ?? []) out.push(o.text, ...o.outcomes.map(x => x.narrative));
  return out.filter(s => typeof s === 'string');
}

function collectEnStrings(tr) {
  const out = [tr.title, tr.tagline, tr.prompt, ...(tr.description ?? [])];
  for (const o of Object.values(tr.options ?? {})) out.push(o.text, ...(o.outcomes ?? []));
  return out.filter(s => typeof s === 'string');
}

function checkText(where, s, allowS1, allowS2) {
  if (typeof s !== 'string') return err(where, 'not a string');
  if (s.trim() === '' ) return;
  if (HAN.test(s)) err(where, `contains Chinese characters: “${s.match(/.{0,20}[㐀-鿿　-〿！-｠].{0,20}/)?.[0]}”`);
  if (PINYIN.test(s)) err(where, `uses a pinyin name (${s.match(PINYIN)[0]}); use the canonical English name`);
  // Untranslated markers like [[TODO]] or TODO(i18n); a plain “TODO” can be legitimate story text.
  if (/\[\[|TODO\(i18n\)/.test(s)) err(where, 'contains an untranslated-text marker');
  for (const m of s.matchAll(/\{([A-Za-z0-9]+)\}/g)) {
    const p = m[1];
    if (!KNOWN.has(p)) err(where, `unknown placeholder {${p}}`);
    else if (S1.includes(p) && !allowS1) err(where, `{${p}} used but the Chinese event never binds {studentName}`);
    else if (S2.includes(p) && !allowS2) err(where, `{${p}} used but the Chinese event never binds {student2Name}`);
  }
  if (/[^\s]"|"[^\s]/.test(s) && s.includes('"')) warn(where, 'straight double quote; prefer “ ”');
  if (/\w'\w/.test(s)) warn(where, 'straight apostrophe; prefer ’');
}

function checkEvent(id, zh, tr) {
  const w = `event ${id}`;
  if (!zh) return err(w, 'no Chinese event with this ID');
  const zhAll = collectStrings(zh).join('\n');
  const allowS1 = zhAll.includes('{studentName}');
  const allowS2 = zhAll.includes('{student2Name}');

  if (!tr.title) err(w, 'missing title');
  if (zh.prompt && !tr.prompt) err(w, 'missing prompt');
  if (!zh.prompt && tr.prompt) err(w, 'has prompt but Chinese does not');
  if (zh.tagline && !tr.tagline) err(w, 'missing tagline');

  const zd = zh.description ?? [];
  const ed = tr.description ?? [];
  if (zd.length !== ed.length) err(w, `description has ${ed.length} paragraphs, Chinese has ${zd.length}`);
  zd.forEach((p, i) => {
    if (ed[i] === undefined) return;
    if ((p.trim() === '') !== (ed[i].trim() === '')) err(`${w} description[${i}]`, 'empty/non-empty mismatch with Chinese');
  });

  const zo = zh.options ?? [];
  const eo = tr.options ?? {};
  const zIds = zo.map(o => o.id);
  for (const o of zo) {
    const t = eo[o.id];
    if (!t) { err(w, `missing option ${o.id}`); continue; }
    if (!t.text) err(`${w} option ${o.id}`, 'missing text');
    const n = o.outcomes.length;
    const m = (t.outcomes ?? []).length;
    if (n !== m) err(`${w} option ${o.id}`, `${m} outcome narratives, Chinese has ${n}`);
  }
  for (const k of Object.keys(eo)) if (!zIds.includes(k)) err(w, `option ${k} does not exist in Chinese`);

  const fields = [['title', tr.title], ['tagline', tr.tagline], ['prompt', tr.prompt]];
  ed.forEach((p, i) => fields.push([`description[${i}]`, p]));
  for (const [k, o] of Object.entries(eo)) {
    fields.push([`option ${k} text`, o.text]);
    (o.outcomes ?? []).forEach((x, i) => fields.push([`option ${k} outcome[${i}]`, x]));
  }
  for (const [f, s] of fields) if (s !== undefined) checkText(`${w} ${f}`, s, allowS1, allowS2);

  const enAll = collectEnStrings(tr).join('\n');
  if (allowS1 && !/\{studentName\}/.test(enAll)) warn(w, 'Chinese uses {studentName} but English never does (fine only if intentional)');
}

function firstRecord(mod) {
  for (const v of Object.values(mod)) {
    if (v && typeof v === 'object' && !Array.isArray(v)) return v;
  }
  return {};
}

const server = await createServer({
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
  logLevel: 'error',
  optimizeDeps: { noDiscovery: true, include: [] },
});

try {
  const zhEvents = (await server.ssrLoadModule('/src/data/events/index.ts')).events;
  const { allCandidates } = await server.ssrLoadModule('/src/data/studentPool.ts');
  const { traitDefs } = await server.ssrLoadModule('/src/data/traits.ts');
  const { projectDefinitions } = await server.ssrLoadModule('/src/data/projects.ts');
  const { achievements } = await server.ssrLoadModule('/src/data/achievements.ts');

  const targets = process.argv.slice(2).map(p => p.replace(/^\.?\//, '').replace(/^/, '/'));

  // Expected Chinese event IDs for a given English overlay module.
  async function expectedIds(path) {
    const charMatch = path.match(/\/characters\/([a-z_]+)\.ts$/);
    if (charMatch) {
      const id = charMatch[1];
      const own = Object.keys(firstRecord(await server.ssrLoadModule(`/src/data/events/students/${id}.ts`)));
      const extra = [`half_favor_${id}`, `max_favor_${id}`, `new_year_gift_result_${id}`].filter(e => zhEvents[e]);
      return [...own, ...extra];
    }
    const evMatch = path.match(/\/data\/en\/events\/([a-z_]+)\.ts$/);
    if (evMatch) {
      const name = evMatch[1];
      const ids = Object.keys(firstRecord(await server.ssrLoadModule(`/src/data/events/${name}.ts`)));
      if (name === 'new_year') return ids.filter(i => !i.startsWith('new_year_gift_result_'));
      return ids;
    }
    return [];
  }

  function checkProfile(id, p) {
    const zh = allCandidates.find(c => c.id === id);
    const w = `profile ${id}`;
    if (!zh) return err(w, 'unknown candidate');
    for (const f of ['name', 'tagline', 'bio']) if (!p[f]) err(w, `missing ${f}`);
    if (zh.farewell && !p.farewell) err(w, 'missing farewell');
    const expectPronoun = zh.pronoun === '她' ? 'she' : 'he';
    if (p.pronoun !== expectPronoun) err(w, `pronoun should be ${expectPronoun}`);
    for (const f of ['name', 'tagline', 'bio', 'farewell']) if (p[f]) checkText(`${w} ${f}`, p[f], false, false);
  }

  if (targets.length > 0) {
    for (const t of targets) {
      const mod = await server.ssrLoadModule(t);
      const exported = Object.values(mod)[0];
      const isPack = exported && 'profile' in exported && 'events' in exported;
      const trs = isPack ? exported.events : exported;
      if (isPack) checkProfile(t.match(/([a-z_]+)\.ts$/)[1], exported.profile);
      for (const [id, tr] of Object.entries(trs)) checkEvent(id, zhEvents[id], tr);
      const expected = await expectedIds(t);
      const missing = expected.filter(id => !trs[id]);
      if (missing.length) err(t, `missing ${missing.length} event(s): ${missing.join(', ')}`);
      console.log(`${t}: ${Object.keys(trs).length}/${expected.length} events translated`);
    }
  } else {
    // Full mode loads every overlay; targeted mode above loads only the requested modules
    // so a half-finished file elsewhere cannot break someone else's check.
    const en = await server.ssrLoadModule('/src/data/en/index.ts');
    for (const [id, tr] of Object.entries(en.eventsEn)) checkEvent(id, zhEvents[id], tr);
    const missing = Object.keys(zhEvents).filter(id => !en.eventsEn[id]);
    if (missing.length) err('coverage', `${missing.length} event(s) without English: ${missing.join(', ')}`);

    for (const c of allCandidates) {
      const p = en.candidatesEn[c.id];
      if (!p) err('coverage', `no English profile for ${c.id}`); else checkProfile(c.id, p);
    }
    for (const id of Object.keys(traitDefs)) {
      const t = en.traitsEn[id];
      if (!t) { err('coverage', `no English trait ${id}`); continue; }
      for (const f of ['name', 'description', 'effect']) {
        if (!t[f]) err(`trait ${id}`, `missing ${f}`); else checkText(`trait ${id} ${f}`, t[f], false, false);
      }
    }
    for (const p of projectDefinitions) {
      const t = en.projectsEn[p.id];
      if (!t) { err('coverage', `no English project ${p.id}`); continue; }
      for (const f of ['name', 'description', 'completionSummary']) {
        if (!t[f]) err(`project ${p.id}`, `missing ${f}`); else checkText(`project ${p.id} ${f}`, t[f], false, false);
      }
      if (t.ideaSources.length !== p.ideaSources.length) err(`project ${p.id}`, 'ideaSources length differs from Chinese');
      t.ideaSources.forEach((s, i) => checkText(`project ${p.id} ideaSources[${i}]`, s, false, false));
    }
    for (const a of achievements) {
      const t = en.achievementsEn[a.id];
      if (!t) { err('coverage', `no English achievement ${a.id}`); continue; }
      checkText(`achievement ${a.id} title`, t.title, false, false);
      checkText(`achievement ${a.id} criteria`, t.criteria, false, false);
    }
    console.log(`Events: ${Object.keys(en.eventsEn).length}/${Object.keys(zhEvents).length} translated`);
  }
} finally {
  await server.close();
}

for (const w of warnings) console.log(w);
for (const e of errors) console.log(e);
console.log(`\n${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length > 0 ? 1 : 0);
