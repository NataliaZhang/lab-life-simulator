import { useEffect, useRef, useState } from 'react';
import type { LogEntry, StatChange } from '../types';
import type { Locale } from '../types/i18n';
import { expressionUrl } from '../data/studentArt';
import { useI18n } from '../i18n/I18nProvider';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

// Separate feedback surveys per UI language.
const FEEDBACK_URL: Record<Locale, string> = {
  zh: 'https://docs.google.com/forms/d/e/1FAIpQLSdJuktfSdSF9zmmM4ihdafhVA58nfYcDOd0bIiRc083fwA41Q/viewform?usp=publish-editor',
  en: 'https://docs.google.com/forms/d/e/1FAIpQLSdGaeu6fxNvoci48s0kOefViPar4S7K8AjBSnxhw1xv1jHjBg/viewform?usp=publish-editor',
};

function FeedbackModal({ onClose }: { onClose: () => void }) {
  const { m, locale } = useI18n();
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.35)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          padding: '1.75rem 2rem',
          maxWidth: '340px',
          width: '90%',
          textAlign: 'center',
        }}
        onClick={e => e.stopPropagation()}
      >
        <p style={{ margin: '0 0 0.5rem', fontWeight: 700, fontSize: '1rem' }}>{m.intro.feedbackTitle}</p>
        <p style={{
          margin: '0 0 1.5rem',
          fontSize: '0.875rem',
          lineHeight: 1.7,
          color: 'var(--color-text-muted)',
        }}>
          {m.intro.feedbackBody}
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button
            className="btn btn--primary btn--sm"
            onClick={() => { window.open(FEEDBACK_URL[locale], '_blank', 'noopener,noreferrer'); onClose(); }}
          >
            {m.intro.feedbackGo}
          </button>
          <button className="btn btn--ghost btn--sm" onClick={onClose}>
            {m.intro.feedbackLater}
          </button>
        </div>
      </div>
    </div>
  );
}

interface Props {
  log: LogEntry[];
}

function formatDelta(c: StatChange, moneyDelta: (d: number) => string): string {
  if (c.unit === 'funding') return moneyDelta(c.delta);
  return (c.delta >= 0 ? `+${c.delta}` : `${c.delta}`) + (c.suffix ?? '');
}

function StatChangePills({ changes }: { changes: StatChange[] }) {
  const { m, text } = useI18n();
  return (
    <div className="stat-changes">
      {changes.map((c, i) => (
        <span
          key={i}
          className={`stat-change-pill ${c.delta >= 0 ? 'stat-change-pill--pos' : 'stat-change-pill--neg'}`}
        >
          {text(c.label)} {formatDelta(c, m.moneyDelta)}
        </span>
      ))}
    </div>
  );
}

function LogEntryItem({ entry }: { entry: LogEntry }) {
  const { m, text } = useI18n();
  const choiceEl = entry.choiceText && (
    <div className="log-entry__choice">
      <span className="log-entry__choice-label">{m.log.choice}</span>
      {text(entry.choiceText)}
    </div>
  );

  const narrativeEl = (
    <div className="log-entry__narrative">
      {text(entry.narrative).split('\n\n').map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  );

  return (
    <article className={`log-entry log-entry--${entry.type}`}>
      <header className="log-entry__header">
        <span className="log-entry__title">{text(entry.title)}</span>
        <span className="log-entry__time">
          {m.time.log(entry.time.year, entry.time.month)}
        </span>
      </header>
      {entry.studentPortrait ? (
        <div className="log-entry__body-with-portrait">
          <div className="log-entry__body-left">
            {choiceEl}
            {narrativeEl}
          </div>
          <img
            className="log-entry__student-portrait"
            src={expressionUrl(entry.studentPortrait, 'smug')}
            alt=""
            aria-hidden="true"
          />
        </div>
      ) : (
        <>
          {choiceEl}
          {narrativeEl}
        </>
      )}
      {entry.statChanges && entry.statChanges.length > 0 && (
        <StatChangePills changes={entry.statChanges} />
      )}
      {entry.image && entry.imageRevealed && (
        <img
          className="log-entry__illustration"
          src={`${BASE}/${entry.image}`}
          alt=""
          aria-hidden="true"
        />
      )}
      {entry.imageRevealed && entry.narrativeAfterImage && (
        <div className="log-entry__narrative">
          {text(entry.narrativeAfterImage).split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}
    </article>
  );
}

export function StoryLog({ log }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const { m } = useI18n();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [log]);

  if (log.length === 0) {
    const features = m.intro.features;

    return (
      <>
      <section
        className="story-log story-log--empty"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div style={{ width: '100%', maxWidth: '500px', padding: '3rem 2rem' }}>

          {/* 标题区 */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <p style={{
              margin: '0 0 0.75rem',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              opacity: 0.35,
            }}>
              Lab Life Simulator
            </p>
            <h2 style={{
              margin: 0,
              fontSize: '1.5rem',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
            }}>
              {m.intro.welcome}
            </h2>
          </div>

          {/* 分割线 */}
          <hr style={{
            border: 'none',
            borderTop: '1px solid currentColor',
            opacity: 0.12,
            margin: '0 0 1.75rem',
          }} />

          {/* 简介 */}
          <p style={{
            margin: '0 0 2rem',
            textAlign: 'center',
            lineHeight: 1.9,
            opacity: 0.7,
            fontSize: '0.875rem',
          }}>
            {m.intro.premise}
          </p>

          {/* 特性列表 */}
          <div style={{ marginBottom: '2.25rem' }}>
            <p style={{
              margin: '0 0 0.7rem',
              fontSize: '0.7rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              opacity: 0.38,
            }}>
              {m.intro.featuresHeading}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {features.map((text, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    padding: '0.6rem 0.9rem',
                    borderLeft: '2px solid currentColor',
                    opacity: 0.65 + i * 0.06,
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{
                    flexShrink: 0,
                    fontSize: '0.65rem',
                    opacity: 0.45,
                    letterSpacing: '0.05em',
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* 结尾 */}
          <div style={{
            textAlign: 'center',
            paddingTop: '1.5rem',
            borderTop: '1px solid currentColor',
            opacity: 0.55,
          }}>
            <p style={{ margin: '0 0 0.2rem', fontSize: '0.8rem' }}>{m.intro.closingLead}</p>
            <p style={{ margin: '0 0 0.35rem', fontWeight: 700, fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
              {m.intro.closingMain}
            </p>
            <p style={{ margin: 0, fontSize: '0.8rem' }}>{m.intro.closingTail}</p>
          </div>

          {/* 反馈按钮 */}
          <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
            <button
              className="btn btn--ghost btn--sm"
              style={{ fontSize: '0.75rem', opacity: 0.5 }}
              onClick={() => setFeedbackOpen(true)}
            >
              {m.intro.feedback}
            </button>
          </div>

        </div>
      </section>

      {feedbackOpen && <FeedbackModal onClose={() => setFeedbackOpen(false)} />}
      </>
    );
  }

  return (
    <section className="story-log">
      {log.map(entry => (
        <LogEntryItem key={entry.id} entry={entry} />
      ))}
      <div ref={bottomRef} />
    </section>
  );
}
