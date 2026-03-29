import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const MOCK_CANDIDATES = [
  { id: 1, name: 'Arjun Mehta', role: 'Frontend Developer', location: 'Bangalore', score: 92, skills: ['React', 'TypeScript', 'Next.js', 'Node.js'], experience: '1 yr', edu: 'BITS Pilani', status: 'new', aiSummary: 'Strong React developer with internship + freelance. Fast learner, builds production apps.', matchPct: 95, lastActive: '2h ago', avatar: 'A', color: 'linear-gradient(135deg, #6c47ff, #a78bfa)' },
  { id: 2, name: 'Priya Sharma', role: 'UI/UX + Frontend', location: 'Mumbai', score: 88, skills: ['Figma', 'React', 'CSS', 'Design Systems'], experience: '6 mo', edu: 'IIT Bombay', status: 'shortlisted', aiSummary: 'Design-first mindset. Built 3 production apps. Strong portfolio with measurable impact.', matchPct: 88, lastActive: '5h ago', avatar: 'P', color: 'linear-gradient(135deg, #ec4899, #f9a8d4)' },
  { id: 3, name: 'Rahul Gupta', role: 'Full Stack Developer', location: 'Hyderabad', score: 85, skills: ['Node.js', 'React', 'MongoDB', 'Docker'], experience: '2 yrs', edu: 'NIT Warangal', status: 'new', aiSummary: 'Solid full-stack experience. Deployed 2 SaaS products. Good problem-solving track record.', matchPct: 82, lastActive: '1d ago', avatar: 'R', color: 'linear-gradient(135deg, #3b82f6, #93c5fd)' },
  { id: 4, name: 'Sneha Kulkarni', role: 'Frontend Developer', location: 'Pune', score: 79, skills: ['Vue.js', 'JavaScript', 'CSS', 'Firebase'], experience: 'Fresher', edu: 'Pune University', status: 'new', aiSummary: 'Self-taught developer with impressive project portfolio. Built 5 apps in 6 months.', matchPct: 76, lastActive: '3d ago', avatar: 'S', color: 'linear-gradient(135deg, #22c55e, #86efac)' },
  { id: 5, name: 'Karthik Raj', role: 'Frontend + React Native', location: 'Chennai', score: 74, skills: ['React', 'React Native', 'JavaScript', 'Redux'], experience: '8 mo', edu: 'Anna University', status: 'rejected', aiSummary: 'Mobile + web hybrid developer. Built cross-platform app with 500+ downloads.', matchPct: 71, lastActive: '1w ago', avatar: 'K', color: 'linear-gradient(135deg, #f59e0b, #fcd34d)' },
  { id: 6, name: 'Ananya Iyer', role: 'Frontend Developer', location: 'Bangalore', score: 91, skills: ['React', 'TypeScript', 'GraphQL', 'AWS'], experience: '1.5 yrs', edu: 'IIT Madras', status: 'new', aiSummary: 'Performance-focused developer. Optimized 3 large-scale apps. Strong TypeScript skills.', matchPct: 93, lastActive: '6h ago', avatar: 'A', color: 'linear-gradient(135deg, #14b8a6, #5eead4)' },
];

const STATUS_CONFIG = {
  new: { label: 'New', class: 'badge-blue' },
  shortlisted: { label: 'Shortlisted', class: 'badge-green' },
  rejected: { label: 'Rejected', class: 'badge-gray' },
  interview: { label: 'Interview', class: 'badge-amber' },
};

export default function RecruiterDashboard() {
  const { navigate, shortlisted, setShortlisted } = useApp();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('score');
  const [selectedId, setSelectedId] = useState(null);
  const [comparing, setComparing] = useState([]);

  const toggleShortlist = (id) => {
    setShortlisted(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleCompare = (id) => {
    setComparing(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  };

  const filtered = MOCK_CANDIDATES.filter(c => {
    if (filter === 'shortlisted') return shortlisted.includes(c.id);
    if (filter === 'new') return c.status === 'new';
    if (search) return c.name.toLowerCase().includes(search.toLowerCase()) || c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    return true;
  }).sort((a, b) => sort === 'score' ? b.score - a.score : sort === 'match' ? b.matchPct - a.matchPct : 0);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 1.5rem', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{ width: 28, height: 28, background: 'var(--primary)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.72rem', fontWeight: 700 }}>TF</div>
          <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Recruiter Dashboard</span>
          <span className="badge badge-blue" style={{ fontSize: '0.68rem' }}>Junior Frontend Engineer</span>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
          {shortlisted.length > 0 && (
            <button onClick={() => navigate('shortlist')} className="btn btn-outline btn-sm">
              ⭐ Shortlist ({shortlisted.length}) →
            </button>
          )}
          {comparing.length === 2 && (
            <button onClick={() => navigate('shortlist')} className="btn btn-primary btn-sm">
              Compare {comparing.length} →
            </button>
          )}
          <button onClick={() => navigate('landing')} className="btn btn-ghost btn-sm">← Home</button>
        </div>
      </div>

      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '1.5rem', width: '100%' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.8rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Total Candidates', value: MOCK_CANDIDATES.length, color: 'var(--primary)', bg: 'var(--primary-light)' },
            { label: 'New Profiles', value: MOCK_CANDIDATES.filter(c => c.status === 'new').length, color: 'var(--blue)', bg: 'var(--blue-light)' },
            { label: 'Shortlisted', value: shortlisted.length, color: 'var(--green)', bg: 'var(--green-light)' },
            { label: 'Avg. Match Score', value: `${Math.round(MOCK_CANDIDATES.reduce((a, c) => a + c.matchPct, 0) / MOCK_CANDIDATES.length)}%`, color: 'var(--amber)', bg: 'var(--amber-light)' },
          ].map(stat => (
            <div key={stat.label} style={{ background: stat.bg, borderRadius: 'var(--radius-sm)', padding: '1rem', border: `1px solid ${stat.color}22` }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text2)', fontWeight: 500, marginTop: '0.2rem' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters row */}
        <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
            <span style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.85rem', color: 'var(--text3)' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or skill..."
              className="input" style={{ paddingLeft: '2.2rem', fontSize: '0.85rem', padding: '0.55rem 0.8rem 0.55rem 2.2rem', width: '100%' }} />
          </div>
          {['all', 'new', 'shortlisted'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '0.45rem 1rem', borderRadius: 100, fontSize: '0.8rem', fontWeight: 600,
              border: `1.5px solid ${filter === f ? 'var(--primary)' : 'var(--border2)'}`,
              background: filter === f ? 'var(--primary)' : 'transparent',
              color: filter === f ? 'white' : 'var(--text2)', transition: 'all 0.15s',
            }}>{f === 'all' ? 'All' : f === 'new' ? 'New' : `Shortlisted (${shortlisted.length})`}</button>
          ))}
          <select value={sort} onChange={e => setSort(e.target.value)} className="input" style={{ padding: '0.45rem 0.8rem', fontSize: '0.82rem', width: 'auto' }}>
            <option value="score">Sort: Profile Score</option>
            <option value="match">Sort: Match %</option>
          </select>
        </div>

        {/* AI insight bar */}
        <div style={{ padding: '0.8rem 1.2rem', background: 'var(--primary-light)', border: '1px solid var(--primary-mid)', borderRadius: 'var(--radius-sm)', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.82rem' }}>
          <div className="avatar avatar-ai" style={{ width: 24, height: 24, fontSize: '0.7rem', flexShrink: 0 }}>🤖</div>
          <span style={{ color: 'var(--primary)', fontWeight: 600 }}>AI Insight:</span>
          <span style={{ color: 'var(--text2)' }}>6 candidates match your role. Top picks: <strong>Arjun</strong> and <strong>Ananya</strong> have the strongest TypeScript + React combination you listed as key requirements.</span>
        </div>

        {/* Candidate grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
          {filtered.map(c => {
            const isShortlisted = shortlisted.includes(c.id);
            const isComparing = comparing.includes(c.id);
            return (
              <div key={c.id} className="card" style={{ padding: '1.2rem', transition: 'all 0.2s', borderColor: isShortlisted ? '#86efac' : isComparing ? 'var(--primary-mid)' : '' }}
                onMouseEnter={e => { if (!isShortlisted) e.currentTarget.style.boxShadow = 'var(--shadow)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = ''; }}>

                {/* Header */}
                <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start', marginBottom: '0.9rem' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '1rem', flexShrink: 0 }}>
                    {c.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.1rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>{c.name}</span>
                      <span className={`badge ${STATUS_CONFIG[c.status]?.class}`} style={{ fontSize: '0.62rem' }}>{STATUS_CONFIG[c.status]?.label}</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text2)' }}>{c.role} · {c.location}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>{c.edu} · {c.experience} exp · {c.lastActive}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: c.score >= 90 ? 'var(--green)' : c.score >= 80 ? 'var(--primary)' : 'var(--amber)' }}>{c.score}</div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--text3)' }}>score</div>
                  </div>
                </div>

                {/* AI Summary */}
                <div style={{ padding: '0.6rem 0.8rem', background: 'var(--primary-light)', borderRadius: 8, marginBottom: '0.8rem', fontSize: '0.78rem', color: 'var(--text)', lineHeight: 1.5 }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 600 }}>🤖 AI:</span> {c.aiSummary}
                </div>

                {/* Skills */}
                <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginBottom: '0.9rem' }}>
                  {c.skills.map(s => <span key={s} className="badge badge-purple" style={{ fontSize: '0.68rem' }}>{s}</span>)}
                </div>

                {/* Match bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text2)', minWidth: 55 }}>Role match</span>
                  <div className="progress-bar" style={{ flex: 1, height: 5 }}>
                    <div className="progress-fill" style={{ width: `${c.matchPct}%`, background: c.matchPct >= 90 ? 'var(--green)' : c.matchPct >= 75 ? 'var(--primary)' : 'var(--amber)' }} />
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: c.matchPct >= 90 ? 'var(--green)' : 'var(--primary)', minWidth: 32 }}>{c.matchPct}%</span>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button onClick={() => { setSelectedId(c.id); navigate('candidate-view'); }}
                    className="btn btn-ghost btn-sm" style={{ flex: 1, justifyContent: 'center', fontSize: '0.78rem' }}>
                    View Profile
                  </button>
                  <button onClick={() => toggleCompare(c.id)} className="btn btn-ghost btn-sm"
                    style={{ fontSize: '0.78rem', borderColor: isComparing ? 'var(--primary)' : '', color: isComparing ? 'var(--primary)' : '', background: isComparing ? 'var(--primary-light)' : '' }}>
                    {isComparing ? '✓ Comparing' : 'Compare'}
                  </button>
                  <button onClick={() => toggleShortlist(c.id)} style={{
                    width: 30, height: 30, borderRadius: '50%', border: `1.5px solid ${isShortlisted ? '#86efac' : 'var(--border2)'}`,
                    background: isShortlisted ? 'var(--green-light)' : 'transparent', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.15s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {isShortlisted ? '⭐' : '☆'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`@media(max-width:640px){.grid-stats{grid-template-columns:repeat(2,1fr)!important;}}`}</style>
    </div>
  );
}
