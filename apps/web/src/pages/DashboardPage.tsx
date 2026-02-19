import { agents, instances, logLines, messages, tasks } from '../services/mock/data';

const panelStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  borderRadius: 8,
  padding: '0.75rem',
  background: '#fff'
};

export function DashboardPage() {
  const active = instances[0];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 320px', minHeight: '100vh' }}>
      <aside style={{ borderRight: '1px solid #eee', padding: '1rem' }}>
        <h3>Navigation</h3>
        <ul>
          <li>Dashboard</li>
          <li>Agents</li>
        </ul>
        <h4>Instances</h4>
        <ul>
          {instances.map((instance) => (
            <li key={instance.id}>
              {instance.name} ({instance.status})
            </li>
          ))}
        </ul>
      </aside>

      <section style={{ padding: '1rem', background: '#f7f7f9' }}>
        <header style={{ ...panelStyle, marginBottom: '1rem' }}>
          <strong>Active:</strong> {active.name} · <strong>Status:</strong> {active.status}
        </header>

        <main style={panelStyle}>
          <h3>Chat (placeholder)</h3>
          {messages.map((message) => (
            <p key={message.id}>
              <strong>{message.author}:</strong> {message.text}
            </p>
          ))}
        </main>
      </section>

      <aside style={{ borderLeft: '1px solid #eee', padding: '1rem', background: '#fafafa' }}>
        <h3>Right Panel</h3>
        <p><strong>Tabs:</strong> Logs / Tasks</p>

        <div style={{ ...panelStyle, marginBottom: '1rem' }}>
          <h4>Logs</h4>
          {logLines.map((log) => (
            <p key={log.id}>[{log.level}] {log.text}</p>
          ))}
        </div>

        <div style={panelStyle}>
          <h4>Tasks</h4>
          {tasks.map((task) => (
            <p key={task.id}>{task.title} ({task.state})</p>
          ))}
        </div>

        <div style={{ ...panelStyle, marginTop: '1rem' }}>
          <h4>Agents</h4>
          {agents.map((agent) => (
            <p key={agent.id}>{agent.name} — {agent.role}</p>
          ))}
        </div>
      </aside>
    </div>
  );
}
