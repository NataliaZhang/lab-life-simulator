import type { GameState } from '../types';
import { formatTime } from '../types';

interface Props {
  state: GameState;
  studentPanelOpen: boolean;
  onToggleStudentPanel: () => void;
  projectPanelOpen: boolean;
  onToggleProjectPanel: () => void;
}

function reputationDesc(rep: number): string {
  if (rep === 0) return 'Google搜你，前几条结果还不是你';
  if (rep < 5)   return '有几篇引用，大多是自引';
  if (rep < 15)  return '圈内有人偶尔听说过你';
  if (rep < 30)  return '同方向小有名气';
  if (rep < 60)  return '顶会常客，圈内大佬';
  return '学术大牛，门生满天下';
}

export function StatusBar({ state, studentPanelOpen, onToggleStudentPanel, projectPanelOpen, onToggleProjectPanel }: Props) {
  const { lab, time, phase } = state;

  return (
    <header className="status-bar">
      <div className="status-left">
        <span className="game-title">实验室模拟器</span>
        <span className="time-display">{formatTime(time)}</span>
        {phase !== 'playing' && (
          <span className="phase-badge">{phase === 'won' ? '毕业了' : '结束了'}</span>
        )}
      </div>
      <div className="status-right">
        <span className={`stat-chip${lab.funding < 10 ? ' stat-chip--warn' : ''}`}>
          <span className="stat-label">资金</span>
          <span className="stat-value">{lab.funding}万</span>
        </span>
        <span className="stat-chip" title={reputationDesc(lab.reputation)}>
          <span className="stat-label">声望</span>
          <span className="stat-value">{lab.reputation}</span>
        </span>
        <span className={`stat-chip${lab.energy < 30 ? ' stat-chip--warn' : ''}`}>
          <span className="stat-label">精力</span>
          <span className="stat-value">{lab.energy}</span>
        </span>
        <button
          className={`panel-toggle-btn${projectPanelOpen ? ' panel-toggle-btn--active' : ''}`}
          onClick={onToggleProjectPanel}
          title={projectPanelOpen ? '关闭项目面板' : '查看项目'}
        >
          项目{state.projectIdeas.length > 0 && !projectPanelOpen
            ? ` (${state.projectIdeas.length})`
            : (projectPanelOpen ? ' ✕' : ' ▸')}
        </button>
        <button
          className={`panel-toggle-btn${studentPanelOpen ? ' panel-toggle-btn--active' : ''}`}
          onClick={onToggleStudentPanel}
          title={studentPanelOpen ? '隐藏成员' : '查看成员'}
        >
          成员{studentPanelOpen ? ' ✕' : ' ▸'}
        </button>
      </div>
    </header>
  );
}
