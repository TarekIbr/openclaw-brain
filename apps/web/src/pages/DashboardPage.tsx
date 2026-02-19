import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { agents, instances, logLines, messages, tasks } from '../services/mock/data';

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'logs' | 'tasks'>('logs');
  const [draft, setDraft] = useState('');

  const visibleItems = useMemo(() => {
    return activeTab === 'logs' ? logLines.map((l) => `[${l.level}] ${l.text}`) : tasks.map((t) => `${t.title} (${t.state})`);
  }, [activeTab]);

  const active = instances[0];

  return (
    <div className="layout">
      <aside className="sidebar stack">
        <div className="card">
          <h3>Navigation</h3>
          <div className="stack">
            <Link className="nav-btn active" to="/dashboard">Dashboard</Link>
            <Link className="nav-btn" to="/agents">Agents</Link>
          </div>
        </div>

        <div className="card">
          <h4>Instances</h4>
          <ul className="list-clean">
            {instances.map((instance) => (
              <li className="row" key={instance.id}>
                <span>{instance.name}</span>
                <span className="muted">{instance.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <section className="main stack">
        <header className="card row">
          <span><strong>Active:</strong> {active.name}</span>
          <span className="muted"><strong>Status:</strong> {active.status}</span>
        </header>

        <main className="card">
          <h3>Chat</h3>
          <div className="stack">
            {messages.map((message) => (
              <div key={message.id}>
                <strong>{message.author}:</strong> {message.text}
              </div>
            ))}
          </div>

          <div className="chat-controls">
            <input
              className="chat-input"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Type a mock message..."
            />
            <button className="send-btn" onClick={() => setDraft('')}>Send</button>
          </div>
        </main>
      </section>

      <aside className="right-panel stack">
        <div className="card">
          <h3>Right Panel</h3>
          <div className="chat-controls">
            <button
              className={`tab-btn ${activeTab === 'logs' ? 'active' : ''}`}
              onClick={() => setActiveTab('logs')}
            >
              Logs
            </button>
            <button
              className={`tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
              onClick={() => setActiveTab('tasks')}
            >
              Tasks
            </button>
          </div>
        </div>

        <div className="card">
          <h4>{activeTab === 'logs' ? 'Logs' : 'Tasks'}</h4>
          <ul className="list-clean">
            {visibleItems.map((item, index) => (
              <li key={`${activeTab}-${index}`}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h4>Agents</h4>
          <ul className="list-clean">
            {agents.map((agent) => (
              <li key={agent.id}>{agent.name} — <span className="muted">{agent.role}</span></li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
