import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function ProfilePreview() {
  const { navigate, profile } = useApp();
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert('PDF Resume generated! (Simulated — would download in production)');
    }, 1500);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const skills = profile.skills || [];
  const skillList = skills.map(s => (typeof s === 'string' ? { name: s, level: 'Intermediate' } : s));

  const LEVEL_COLORS = { Expert: 'badge-green', Advanced: 'badge-purple', Intermediate: 'badge-blue', Beginner: 'badge-amber', Learning: 'badge-gray' };

  if (submitted) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: 460, padding: '2rem', animation: 'fadeUp 0.5s ease' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.6rem' }}>Profile Submitted!</h1>
        <p style={{ color: 'var(--text2)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Your profile is now live and visible to recruiters. You'll get notified when someone views or shortlists your profile.
        </p>
        <div style={{ display: 'flex', gap: '0.7rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <div className="card" style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: '1.3rem', color: 'var(--primary)' }}>{profile.completionScore || 88}%</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text2)' }}>Profile Score</div>
          </div>
          <div className="card" style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: '1.3rem', color: 'var(--green)' }}>{skillList.length}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text2)' }}>Skills Added</div>
          </div>
          <div className="card" style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: '1.3rem', color: 'var(--amber)' }}>3</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text2)' }}>Role Matches</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('landing')} className="btn btn-outline">Back to Home</button>
          <button onClick={() => { navigate('recruiter'); }} className="btn btn-primary">View Recruiter Side →</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Top bar */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 1.5rem', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{ width: 28, height: 28, background: 'var(--primary)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.72rem', fontWeight: 700 }}>TF</div>
          <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Profile Preview</span>
          <span className="badge badge-green" style={{ fontSize: '0.68rem' }}>✓ {profile.completionScore || 88}% complete</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => navigate('skills')} className="btn btn-ghost btn-sm">← Edit</button>
          <button onClick={handleCopy} className="btn btn-ghost btn-sm">
            {copied ? '✓ Link Copied!' : '🔗 Share Link'}
          </button>
          <button onClick={handleDownload} className="btn btn-ghost btn-sm">
            {downloading ? '⏳ Generating...' : '⬇ Download PDF'}
          </button>
          <button onClick={handleSubmit} className="btn btn-primary btn-sm">
            Submit Profile →
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Profile card */}
        <div className="card-elevated" style={{ padding: '2rem', marginBottom: '1.2rem' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem', marginBottom: '1.5rem' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '1.8rem', flexShrink: 0 }}>
              {profile.name?.charAt(0)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.3rem' }}>
                <h1 style={{ fontSize: '1.4rem', fontWeight: 700 }}>{profile.name || 'Arjun Mehta'}</h1>
                <span className="badge badge-green">✓ Verified</span>
              </div>
              <div style={{ fontSize: '0.95rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.3rem' }}>{profile.role || 'Frontend Developer'}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text2)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <span>📍 Bangalore, India</span>
                <span>📧 {profile.email}</span>
                <span>🎓 Open to opportunities</span>
              </div>
            </div>
            {/* Score ring */}
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{ position: 'relative', width: 64, height: 64 }}>
                <svg width="64" height="64" viewBox="0 0 64 64" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="32" cy="32" r="26" fill="none" stroke="var(--border)" strokeWidth="5" />
                  <circle cx="32" cy="32" r="26" fill="none" stroke="var(--primary)" strokeWidth="5"
                    strokeDasharray={`${((profile.completionScore || 88) / 100) * 163} 163`} strokeLinecap="round" />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)' }}>
                  {profile.completionScore || 88}
                </div>
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text3)', marginTop: '0.3rem' }}>Profile score</div>
            </div>
          </div>

          {/* AI Summary */}
          {profile.summary && (
            <div style={{ padding: '1rem 1.2rem', background: 'var(--primary-light)', borderRadius: 'var(--radius-sm)', marginBottom: '1.2rem', border: '1px solid var(--primary-mid)', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>✨ AI-Generated Summary</span>
              </div>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--text)' }}>{profile.summary}</p>
            </div>
          )}

          {/* About */}
          {profile.about && (
            <div style={{ marginBottom: '1.2rem' }}>
              <h2 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>👤</span> About
              </h2>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--text2)' }}>{profile.about}</p>
            </div>
          )}

          <div style={{ height: 1, background: 'var(--border)', margin: '1.2rem 0' }} />

          {/* Skills */}
          <div style={{ marginBottom: '1.2rem' }}>
            <h2 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>⚡</span> Skills ({skillList.length})
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {skillList.length > 0 ? skillList.map(skill => (
                <div key={skill.name} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.8rem', borderRadius: 100, background: 'var(--primary-light)', border: '1px solid var(--primary-mid)' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)' }}>{skill.name}</span>
                  <span className={`badge ${LEVEL_COLORS[skill.level] || 'badge-gray'}`} style={{ padding: '0.1rem 0.4rem', fontSize: '0.62rem' }}>{skill.level}</span>
                </div>
              )) : ['React', 'JavaScript', 'Node.js', 'CSS', 'Git'].map(s => (
                <span key={s} className="skill-tag selected">{s}</span>
              ))}
            </div>
          </div>

          <div style={{ height: 1, background: 'var(--border)', margin: '1.2rem 0' }} />

          {/* Experience */}
          <div style={{ marginBottom: '1.2rem' }}>
            <h2 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>💼</span> Experience
            </h2>
            {(profile.experience?.length > 0 ? profile.experience : [{ company: 'TechVibe', role: 'Frontend Developer Intern', duration: '3 months · 2024', bullets: ['Built interactive dashboard using React 18', 'Improved load time by 40% through code splitting', 'Collaborated with design team on component library'] }]).map((exp, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.8rem', marginBottom: '0.8rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--bg2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text2)', flexShrink: 0 }}>
                  {exp.company?.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{exp.role}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text2)', marginBottom: '0.4rem' }}>{exp.company} · {exp.duration}</div>
                  {exp.bullets?.map((b, j) => (
                    <div key={j} style={{ fontSize: '0.82rem', color: 'var(--text2)', display: 'flex', gap: '0.4rem', marginBottom: '0.2rem' }}>
                      <span style={{ color: 'var(--primary)' }}>•</span> {b}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: 'var(--border)', margin: '1.2rem 0' }} />

          {/* Projects */}
          <div style={{ marginBottom: '1.2rem' }}>
            <h2 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>🚀</span> Projects
            </h2>
            {(profile.projects?.length > 0 ? profile.projects : [{ name: 'FlowDesk', tech: ['React', 'Firebase', 'Vercel'], impact: '200+ users', description: 'Task management app with real-time sync' }]).map((proj, i) => (
              <div key={i} style={{ padding: '1rem', background: 'var(--bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', marginBottom: '0.6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{proj.name}</span>
                  {proj.impact && <span className="badge badge-green" style={{ fontSize: '0.68rem' }}>🏆 {proj.impact}</span>}
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text2)', marginBottom: '0.5rem' }}>{proj.description}</p>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {(proj.tech || []).map(t => <span key={t} className="badge badge-purple" style={{ fontSize: '0.68rem' }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div>
            <h2 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>🎓</span> Education
            </h2>
            {(profile.education?.length > 0 ? profile.education : [{ degree: 'B.Tech Computer Science', institution: 'BITS Pilani', year: '2025', grade: '8.4 CGPA' }]).map((edu, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{edu.degree}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text2)' }}>{edu.institution}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--primary)' }}>{edu.grade}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text3)' }}>Class of {edu.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action bar */}
        <div className="card" style={{ padding: '1.2rem', display: 'flex', gap: '0.7rem', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={handleDownload} className="btn btn-ghost btn-sm">
              {downloading ? '⏳' : '⬇'} Download PDF
            </button>
            <button onClick={handleCopy} className="btn btn-ghost btn-sm">
              {copied ? '✓ Copied!' : '🔗 Share Link'}
            </button>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button onClick={() => navigate('skills')} className="btn btn-ghost btn-sm">← Edit Skills</button>
            <button onClick={handleSubmit} className="btn btn-primary">Submit Profile →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
