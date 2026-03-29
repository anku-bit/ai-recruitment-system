import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export function CandidateProfileView() {
  const { navigate, shortlisted, setShortlisted } = useApp();
  const [action, setAction] = useState(null);
  const isShortlisted = shortlisted.includes(1);

  const toggleShortlist = () => setShortlisted(prev => prev.includes(1) ? prev.filter(x => x !== 1) : [...prev, 1]);

  const candidate = {
    name: 'Arjun Mehta', role: 'Frontend Developer', location: 'Bangalore, India',
    email: 'arjun.mehta@example.com', score: 92, matchPct: 95,
    edu: 'B.Tech CS · BITS Pilani · 2025 · CGPA 8.4',
    experience: '1 year (Internship + Freelance)',
    skills: [
      { name: 'React', level: 'Advanced' }, { name: 'TypeScript', level: 'Intermediate' },
      { name: 'JavaScript', level: 'Advanced' }, { name: 'Next.js', level: 'Intermediate' },
      { name: 'Node.js', level: 'Beginner' }, { name: 'CSS/Tailwind', level: 'Advanced' },
      { name: 'Git', level: 'Intermediate' }, { name: 'Firebase', level: 'Intermediate' },
    ],
    aiSummary: 'Arjun is a results-driven Frontend Developer with solid hands-on experience in React and modern JavaScript. Demonstrated ability to build production-ready applications through a 3-month internship at TechVibe and multiple freelance projects. Currently pursuing B.Tech at BITS Pilani, bringing strong academic foundations combined with practical development experience. Particularly skilled at crafting intuitive user interfaces and writing clean, maintainable code.',
    experience_detail: [{ company: 'TechVibe', role: 'Frontend Developer Intern', duration: 'Jun–Aug 2024 · 3 months', bullets: ['Built interactive analytics dashboard in React 18 reducing report generation time by 60%', 'Implemented code splitting and lazy loading improving page load by 40%', 'Collaborated with 5-person design + engineering team on component library'] }],
    projects: [
      { name: 'FlowDesk', tech: ['React', 'Firebase', 'Vercel'], desc: 'Real-time task management app with drag-and-drop kanban board.', impact: '200+ active users, featured on Product Hunt', link: 'github.com/arjun/flowdesk' },
      { name: 'ShopAI', tech: ['Next.js', 'Stripe', 'MongoDB'], desc: 'E-commerce platform with AI product recommendations.', impact: 'Built for 2 freelance clients, ₹18K revenue', link: 'shopai.vercel.app' },
    ],
    recruiterNotes: ['Strong TypeScript + React combo', 'Internship + projects = good signal', 'Fast learner, proactive communicator'],
  };

  const LEVEL_MAP = { Expert: 5, Advanced: 4, Intermediate: 3, Beginner: 2, Learning: 1 };
  const LEVEL_COLOR = { Expert: 'var(--green)', Advanced: 'var(--primary)', Intermediate: 'var(--blue)', Beginner: 'var(--amber)', Learning: 'var(--text3)' };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 1.5rem', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <button onClick={() => navigate('recruiter')} style={{ background: 'none', border: 'none', color: 'var(--text2)', cursor: 'pointer', fontSize: '0.85rem' }}>← Candidates</button>
          <span style={{ color: 'var(--border2)' }}>|</span>
          <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{candidate.name}</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={toggleShortlist} className="btn btn-ghost btn-sm" style={{ borderColor: isShortlisted ? '#86efac' : '', color: isShortlisted ? 'var(--green)' : '' }}>
            {isShortlisted ? '⭐ Shortlisted' : '☆ Shortlist'}
          </button>
          <button onClick={() => setAction('schedule')} className="btn btn-outline btn-sm">Schedule Interview</button>
          <button onClick={() => { toggleShortlist(); navigate('shortlist'); }} className="btn btn-primary btn-sm">Move Forward →</button>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.5rem', alignItems: 'start' }}>
          {/* Main */}
          <div>
            {/* Header card */}
            <div className="card-elevated" style={{ padding: '1.8rem', marginBottom: '1.2rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #6c47ff, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '1.5rem', flexShrink: 0 }}>A</div>
                <div style={{ flex: 1 }}>
                  <h1 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.25rem' }}>{candidate.name}</h1>
                  <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.3rem' }}>{candidate.role}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text2)', display: 'flex', gap: '1rem' }}>
                    <span>📍 {candidate.location}</span>
                    <span>🎓 {candidate.experience} exp</span>
                  </div>
                </div>
                <div>
                  <div style={{ textAlign: 'center', padding: '0.8rem 1rem', background: 'var(--primary-light)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--primary-mid)' }}>
                    <div style={{ fontWeight: 700, fontSize: '1.6rem', color: 'var(--primary)', lineHeight: 1 }}>{candidate.score}</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text2)', marginTop: '0.2rem' }}>Profile Score</div>
                  </div>
                </div>
              </div>

              {/* AI Summary */}
              <div style={{ padding: '1rem', background: 'var(--primary-light)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', border: '1px solid var(--primary-mid)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                  <div className="avatar avatar-ai" style={{ width: 22, height: 22, fontSize: '0.65rem' }}>🤖</div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>AI Recruiter Summary</span>
                </div>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--text)' }}>{candidate.aiSummary}</p>
              </div>

              {/* Match breakdown */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
                {[['Role Match', `${candidate.matchPct}%`, 'var(--green)'], ['Skills Match', '89%', 'var(--primary)'], ['Culture Fit', 'Strong', 'var(--blue)']].map(([label, val, color]) => (
                  <div key={label} style={{ padding: '0.7rem', background: 'var(--bg)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border)', textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color }}>{val}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text2)' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="card" style={{ padding: '1.5rem', marginBottom: '1.2rem' }}>
              <h2 style={{ fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>⚡ Skills Proficiency</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {candidate.skills.map(skill => (
                  <div key={skill.name} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, minWidth: 110 }}>{skill.name}</span>
                    <div className="progress-bar" style={{ flex: 1, height: 6 }}>
                      <div className="progress-fill" style={{ width: `${(LEVEL_MAP[skill.level] / 5) * 100}%`, background: LEVEL_COLOR[skill.level] }} />
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, color: LEVEL_COLOR[skill.level], minWidth: 80 }}>{skill.level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="card" style={{ padding: '1.5rem', marginBottom: '1.2rem' }}>
              <h2 style={{ fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>💼 Work Experience</h2>
              {candidate.experience_detail.map((exp, i) => (
                <div key={i}>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.2rem' }}>{exp.role}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.6rem' }}>{exp.company} · {exp.duration}</div>
                  {exp.bullets.map((b, j) => (
                    <div key={j} style={{ display: 'flex', gap: '0.4rem', fontSize: '0.83rem', color: 'var(--text2)', marginBottom: '0.3rem' }}>
                      <span style={{ color: 'var(--primary)', flexShrink: 0 }}>•</span>{b}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Projects */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>🚀 Projects</h2>
              {candidate.projects.map((p, i) => (
                <div key={i} style={{ padding: '1rem', background: 'var(--bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', marginBottom: '0.7rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{p.name}</span>
                    <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>🏆 {p.impact}</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text2)', marginBottom: '0.5rem' }}>{p.desc}</p>
                  <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                    {p.tech.map(t => <span key={t} className="badge badge-purple" style={{ fontSize: '0.65rem' }}>{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ position: 'sticky', top: 72 }}>
            <div className="card" style={{ padding: '1.2rem', marginBottom: '1rem' }}>
              <h3 style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.8rem' }}>🎓 Education</h3>
              <div style={{ fontSize: '0.83rem', lineHeight: 1.6, color: 'var(--text2)' }}>{candidate.edu}</div>
            </div>

            <div className="card" style={{ padding: '1.2rem', marginBottom: '1rem' }}>
              <h3 style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.8rem' }}>🤖 AI Recruiter Notes</h3>
              {candidate.recruiterNotes.map((note, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text2)', marginBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--primary)' }}>✓</span> {note}
                </div>
              ))}
            </div>

            <div className="card" style={{ padding: '1.2rem', marginBottom: '1rem' }}>
              <h3 style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.8rem' }}>📋 Take Action</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {['Schedule Interview', 'Send Message', 'Request More Info', 'Reject (with feedback)'].map(a => (
                  <button key={a} onClick={() => setAction(a)} className="btn btn-ghost btn-sm"
                    style={{ justifyContent: 'flex-start', fontSize: '0.8rem', color: a.includes('Reject') ? 'var(--accent)' : '' }}>
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {action && (
              <div style={{ padding: '1rem', background: 'var(--green-light)', border: '1px solid #86efac', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', color: '#166534' }}>
                ✅ {action} — action recorded! Candidate will be notified.
                <button onClick={() => setAction(null)} style={{ background: 'none', border: 'none', color: '#166534', marginLeft: '0.5rem', cursor: 'pointer' }}>×</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:720px){.container{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}

export default CandidateProfileView;
