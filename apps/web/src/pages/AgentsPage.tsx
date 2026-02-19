import { Link } from 'react-router-dom';

export function AgentsPage() {
  return (
    <main style={{ fontFamily: 'Inter, system-ui, sans-serif', margin: '2rem', color: '#e7eaf0' }}>
      <h1>Agents</h1>
      <p>Placeholder page (mock only).</p>
      <Link to="/dashboard" style={{ color: '#8fb3ff' }}>← Back to dashboard</Link>
    </main>
  );
}
