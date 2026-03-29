import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const ALL_CANDIDATES = [
  { id: 1, name: 'Arjun Mehta', role: 'Frontend Developer', score: 92, matchPct: 95, skills: ['React', 'TypeScript', 'Next.js', 'Node.js'], edu: 'BITS Pilani', exp: '1 yr', color: 'linear-gradient(135deg, #6c47ff, #a78bfa)', avatar: 'A', strengths: ['Strong React ecosystem', 'Production experience', 'BITS Pilani pedigree'], concerns: ['Limited backend exposure'], recommendation: 'Highly Recommended' },
  { id: 2, name: 'Priya Sharma', role: 'UI/UX + Frontend', score: 88, matchPct: 88, skills: ['Figma', 'React', 'CSS', 'Design Systems'], edu: 'IIT Bombay', exp: '6 mo', color: 'linear-gradient(135deg, #ec4899, #f9a8d4)', avatar: 'P', strengths: ['Design systems expertise', 'IIT pedigree', 'Portfolio quality'], concerns: ['Less code-heavy experience'], recommendation: 'Recommended' },
  { id: 6, name: 'Ananya Iyer', role: 'Frontend Developer', score: 91, matchPct: 93, skills: ['React', 'TypeScript', 'GraphQL', 'AWS'], edu: 'IIT Madras', exp: '1.5 yrs', color: 'linear-gradient(135deg, #14b8a6, #5eead4)', avatar: 'A', strengths: ['TypeScript + GraphQL combo', 'AWS knowledge', 'IIT Madras'], concerns: ['Higher salary expectation'], recommendation: 'Highly Recommended' },
];

export default function ShortlistScreen() {
  const { navigate, shortlisted, setShortlisted } = useApp();
  const [actions, setActions] = useState({});
  const [compareMode, setCompareMode] = useState(false);

  const candidates = ALL_CANDIDATES.filter(c => shortlisted.includes(c.id));

  const setAction = (id, action) => {
    setActions(prev => ({ ...prev, [id]: action }));
  };

  const ACTION_COLORS = {
    'Schedule Interview': 'var(--primary)',
    'Offer Role': 'var(--green)',
    'On Hold': 'var(--amber)',
    'Rejected': 'var(--accent)',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 1.5rem', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <button onClick={() => navigate('recruiter')} style={{ background: 'none', border: 'none', color: 'var(--text2)', cursor: 'pointer', fontSize: '0.85rem' }}>← Dashboard</button>
          <span style={{ color: 'var(--border2)' }}>|</span>
          <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Shortlisted Candidates</span>
          <span className="badge badge-green">{shortlisted.length} candidates</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setCompareMode(v => !v)} className={`btn btn-sm ${compareMode ? 'btn-primary' : 'btn-outline'}`}>
            {compareMode ? '✓ Compare Mode' : 'Compare Side-by-Side'}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem' }}>
        {candidates.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text2)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐</div>
            <h2 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>No shortlisted candidates</h2>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>Go back to the dashboard and star candidates to shortlist them.</p>
            <button onClick={() => navigate('recruiter')} className="btn btn-primary">← Go to Dashboard</button>
          </div>
        ) : compareMode && candidates.length >= 2 ? (
          /* Compare mode */
          <div>
            <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.2rem' }}>Comparing Top Candidates</h2>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(candidates.length, 3)}, 1fr)`, gap: '1rem' }}>
              {candidates.slice(0, 3).map(c => (
                <div key={c.id} className="card-elevated" style={{ overflow: 'hidden' }}>
                  {/* Card header */}
                  <div style={{ background: c.color, padding: '1.5rem', textAlign: 'center', color: 'white' }}>
                    <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.2rem', margin: '0 auto 0.6rem' }}>{c.avatar}</div>
                    <div style={{ fontWeight: 700, fontSize: '1rem' }}>{c.name}</div>
                    <div style={{ fontSize: '0.78rem', opacity: 0.85, marginTop: '0.15rem' }}>{c.role}</div>
                  </div>

                  <div style={{ padding: '1.2rem' }}>
                    {/* Scores */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
                      <div style={{ textAlign: 'center', padding: '0.6rem', background: 'var(--primary-light)', borderRadius: 8 }}>
                        <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--primary)' }}>{c.score}</div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text2)' }}>Profile</div>
                      </div>
                      <div style={{ textAlign: 'center', padding: '0.6rem', background: 'var(--green-light)', borderRadius: 8 }}>
                        <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--green)' }}>{c.matchPct}%</div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text2)' }}>Match</div>
                      </div>
                    </div>

                    {/* Details */}
                    {[['Education', c.edu], ['Experience', c.exp], ['Recommendation', c.recommendation]].map(([label, val]) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.45rem', alignItems: 'center' }}>
                        <span style={{ color: 'var(--text2)' }}>{label}</span>
                        <span style={{ fontWeight: 600, color: val === 'Highly Recommended' ? 'var(--green)' : val === 'Recommended' ? 'var(--primary)' : 'var(--text)' }}>{val}</span>
                      </div>
                    ))}

                    <div style={{ height: 1, background: 'var(--border)', margin: '0.8rem 0' }} />

                    {/* Strengths */}
                    <div style={{ marginBottom: '0.7rem' }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text3)', marginBottom: '0.4rem' }}>STRENGTHS</div>
                      {c.strengths.map(s => (
                        <div key={s} style={{ fontSize: '0.78rem', color: 'var(--green)', display: 'flex', gap: '0.3rem', marginBottom: '0.2rem' }}>
                          <span>✓</span>{s}
                        </div>
                      ))}
                    </div>

                    {/* Concerns */}
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text3)', marginBottom: '0.4rem' }}>WATCH POINTS</div>
                      {c.concerns.map(con => (
                        <div key={con} style={{ fontSize: '0.78rem', color: 'var(--amber)', display: 'flex', gap: '0.3rem', marginBottom: '0.2rem' }}>
                          <span>⚠</span>{con}
                        </div>
                      ))}
                    </div>

                    {/* Action */}
                    <select value={actions[c.id] || ''} onChange={e => setAction(c.id, e.target.value)}
                      className="input" style={{ width: '100%', padding: '0.55rem 0.8rem', fontSize: '0.82rem', color: actions[c.id] ? ACTION_COLORS[actions[c.id]] : 'var(--text2)' }}>
                      <option value="">— Take action —</option>
                      {['Schedule Interview', 'Offer Role', 'On Hold', 'Rejected'].map(a => <option key={a}>{a}</option>)}
                    </select>
                    {actions[c.id] && (
                      <div style={{ marginTop: '0.5rem', padding: '0.5rem', background: 'var(--green-light)', borderRadius: 6, fontSize: '0.75rem', color: '#166534', textAlign: 'center' }}>
                        ✅ Marked as: {actions[c.id]}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* List mode */
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <h2 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Your Shortlist ({candidates.length})</h2>
              <span style={{ fontSize: '0.8rem', color: 'var(--text2)' }}>Tip: Enable Compare Mode to evaluate side-by-side</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {candidates.map(c => (
                <div key={c.id} className="card" style={{ padding: '1.2rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '1rem', flexShrink: 0 }}>{c.avatar}</div>
                  <div style={{ flex: 1, minWidth: 160 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{c.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text2)' }}>{c.role} · {c.edu} · {c.exp}</div>
                    <div style={{ display: 'flex', gap: '0.3rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
                      {c.skills.slice(0, 4).map(s => <span key={s} className="badge badge-purple" style={{ fontSize: '0.65rem' }}>{s}</span>)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--primary)' }}>{c.score}</div>
                      <div style={{ fontSize: '0.62rem', color: 'var(--text3)' }}>Score</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--green)' }}>{c.matchPct}%</div>
                      <div style={{ fontSize: '0.62rem', color: 'var(--text3)' }}>Match</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <button onClick={() => navigate('candidate-view')} className="btn btn-ghost btn-sm">View</button>
                    <select value={actions[c.id] || ''} onChange={e => setAction(c.id, e.target.value)}
                      className="input" style={{ padding: '0.4rem 0.7rem', fontSize: '0.78rem', width: 'auto', color: actions[c.id] ? ACTION_COLORS[actions[c.id]] : '' }}>
                      <option value="">Action...</option>
                      {['Schedule Interview', 'Offer Role', 'On Hold', 'Rejected'].map(a => <option key={a}>{a}</option>)}
                    </select>
                    <button onClick={() => setShortlisted(prev => prev.filter(x => x !== c.id))} className="btn btn-ghost btn-sm" style={{ color: 'var(--text3)' }}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
