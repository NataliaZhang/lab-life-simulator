import { useEffect, useRef, useState } from 'react';
import type { LogEntry, StatChange } from '../types';
import { expressionUrl } from '../data/studentArt';

const FEEDBACK_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdJuktfSdSF9zmmM4ihdafhVA58nfYcDOd0bIiRc083fwA41Q/viewform?usp=publish-editor';

function FeedbackModal({ onClose }: { onClose: () => void }) {
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
        <p style={{ margin: '0 0 0.5rem', fontWeight: 700, fontSize: '1rem' }}>感谢你玩这个游戏</p>
        <p style={{
          margin: '0 0 1.5rem',
          fontSize: '0.875rem',
          lineHeight: 1.7,
          color: 'var(--color-text-muted)',
        }}>
          如果你愿意，可以花两分钟填写一份简短的反馈问卷，帮助我们改进游戏。
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button
            className="btn btn--primary btn--sm"
            onClick={() => { window.open(FEEDBACK_URL, '_blank', 'noopener,noreferrer'); onClose(); }}
          >
            去填写
          </button>
          <button className="btn btn--ghost btn--sm" onClick={onClose}>
            下次再说
          </button>
        </div>
      </div>
    </div>
  );
}

interface Props {
  log: LogEntry[];
}

function StatChangePills({ changes }: { changes: StatChange[] }) {
  return (
    <div className="stat-changes">
      {changes.map((c, i) => (
        <span
          key={i}
          className={`stat-change-pill ${c.delta >= 0 ? 'stat-change-pill--pos' : 'stat-change-pill--neg'}`}
        >
          {c.label} {c.delta >= 0 ? `+${c.delta}` : c.delta}{c.suffix ?? ''}
        </span>
      ))}
    </div>
  );
}

function LogEntryItem({ entry }: { entry: LogEntry }) {
  const choiceEl = entry.choiceText && (
    <div className="log-entry__choice">
      <span className="log-entry__choice-label">选择：</span>
      {entry.choiceText}
    </div>
  );

  const narrativeEl = (
    <div className="log-entry__narrative">
      {entry.narrative.split('\n\n').map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  );

  return (
    <article className={`log-entry log-entry--${entry.type}`}>
      <header className="log-entry__header">
        <span className="log-entry__title">{entry.title}</span>
        <span className="log-entry__time">
          第{entry.time.year}年&thinsp;{entry.time.month}月
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
    </article>
  );
}

export function StoryLog({ log }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [log]);

  if (log.length === 0) {
    const features = [
      '招募卷王、天才、摸鱼怪和未来创业家',
      '见证学生毕业、跑路、延毕或一夜成名',
      '申请经费、回复 Reviewer、拯救服务器',
      '调查到底是谁偷偷占满了全部 GPU',
    ] as const;

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
              欢迎来到奇妙实验室模拟器！
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
            你是一名刚刚入职计算机系的助理教授，拥有一间空实验室、一笔启动经费，以及一个没人知道会变成什么样的未来。
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
              在接下来的六年里，你将有机会：
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
            <p style={{ margin: '0 0 0.2rem', fontSize: '0.8rem' }}>无论如何，</p>
            <p style={{ margin: '0 0 0.35rem', fontWeight: 700, fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
              请努力活到 Tenure。
            </p>
            <p style={{ margin: 0, fontSize: '0.8rem' }}>祝你好运！</p>
          </div>

          {/* 反馈按钮 */}
          <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
            <button
              className="btn btn--ghost btn--sm"
              style={{ fontSize: '0.75rem', opacity: 0.5 }}
              onClick={() => setFeedbackOpen(true)}
            >
              反馈
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
