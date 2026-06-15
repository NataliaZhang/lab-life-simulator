import { useEffect, useRef } from 'react';
import type { LogEntry, StatChange } from '../types';

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
          {c.label} {c.delta >= 0 ? `+${c.delta}` : c.delta}
        </span>
      ))}
    </div>
  );
}

function LogEntryItem({ entry }: { entry: LogEntry }) {
  return (
    <article className={`log-entry log-entry--${entry.type}`}>
      <header className="log-entry__header">
        <span className="log-entry__title">{entry.title}</span>
        <span className="log-entry__time">
          第{entry.time.year}年&thinsp;{entry.time.month}月
        </span>
      </header>
      {entry.choiceText && (
        <div className="log-entry__choice">
          <span className="log-entry__choice-label">选择：</span>
          {entry.choiceText}
        </div>
      )}
      <div className="log-entry__narrative">
        {entry.narrative.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      {entry.statChanges && entry.statChanges.length > 0 && (
        <StatChangePills changes={entry.statChanges} />
      )}
    </article>
  );
}

export function StoryLog({ log }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [log.length]);

  if (log.length === 0) {
    return (
      <section className="story-log story-log--empty">
        <p className="story-log__placeholder">故事即将开始……</p>
      </section>
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
