import React from 'react';
import { useApp } from '../context/AppContext';

export default function Landing() {
  const { navigate, setUserType } = useApp();

  const problems = [
    { icon: '📄', text: 'Recruiters spend 7s per resume', sub: 'Bias decides fate' },
    { icon: '🧩', text: 'PDFs lose context & structure', sub: 'Poor parsing' },
    { icon: '📉', text: '75% of candidates filtered by ATS', sub: 'Talent ignored' },
    { icon: '🕒', text: '45 days average time-to-hire', sub: 'Slow & costly' },
  ];

  const features = [
    { icon: '🤖', title: 'AI-Guided Input', desc: 'Just talk — AI structures your experience into a professional profile automatically.' },
    { icon: '⚡', title: 'Smart Skill Map', desc: 'AI suggests relevant skills from your conversation and verifies them intelligently.' },
    { icon: '📊', title: 'Structured Data', desc: 'Consistent, bias-free profiles that recruiters can actually compare side-by-side.' },
    { icon: '🎯', title: 'Role Matching', desc: 'AI recommends matching roles based on your skills and experience context.' },
    { icon: '💾', title: 'Auto-Save & Sync', desc: 'Your progress is saved every 30 seconds. Resume anytime, anywhere.' },
    { icon: '📤', title: 'Export & Share', desc: 'Generate a PDF resume or shareable profile link in one click.' },
  ];

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Navbar */}
      <nav style={{ background: 'rgba(247,246,243,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 100, padding: '0 1.5rem' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: 32, height: 32, background: 'var(--primary)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.85rem', fontWeight: 700 }}>TF</div>
            <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>TalentForge</span>
            <span className="badge badge-purple" style={{ marginLeft: '0.3rem' }}>AI</span>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button onClick={() => { setUserType('recruiter'); navigate('recruiter'); }} className="btn btn-ghost btn-sm">
              Recruiter View
            </button>
            <button onClick={() => navigate('onboarding')} className="btn btn-primary btn-sm">
              Build Profile →
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '5rem 1.5rem 4rem', textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
        <div className="badge badge-purple" style={{ marginBottom: '1.2rem', fontSize: '0.8rem', padding: '0.35rem 1rem' }}>
          🚫 No Resume Upload Required
        </div>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.2rem', color: 'var(--text)' }}>
          Hire Better.<br />
          <span style={{ color: 'var(--primary)' }}>No Resumes.</span> No Bias.
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text2)', lineHeight: 1.7, marginBottom: '2rem', maxWidth: 540, margin: '0 auto 2rem' }}>
          TalentForge replaces the broken resume-upload process with an AI-assisted conversation that builds structured, fair candidate profiles.
        </p>
        <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('onboarding')} className="btn btn-primary btn-lg">
            Build Your Profile Free →
          </button>
          <button onClick={() => { setUserType('recruiter'); navigate('recruiter'); }} className="btn btn-ghost btn-lg">
            View Recruiter Demo
          </button>
        </div>

        {/* Trust bar */}
        <div style={{ marginTop: '3rem', display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['50K+ Profiles Built', '98% Candidate Satisfaction', '3x Faster Hiring'].map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text2)', fontWeight: 600 }}>
              <span style={{ color: 'var(--green)', fontSize: '0.7rem' }}>✓</span> {s}
            </div>
          ))}
        </div>
      </section>

      {/* Problem section */}
      <section style={{ padding: '3rem 1.5rem', background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="section-label">The Problem</div>
            <h2 className="section-title" style={{ fontSize: '1.9rem' }}>Traditional hiring is broken</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {problems.map((p, i) => (
              <div key={i} className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.7rem' }}>{p.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.3rem' }}>{p.text}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 600 }}>{p.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', margin: '2rem 0 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem', padding: '0 1rem' }}>↓ Our Solution</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {features.map((f, i) => (
              <div key={i} className="card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary-mid)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
              >
                <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>{f.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.3rem' }}>{f.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text2)', lineHeight: 1.6 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Flow Diagram */}
      <section style={{ padding: '4rem 1.5rem', maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="section-label">User Flow</div>
          <h2 className="section-title" style={{ fontSize: '1.9rem' }}>Built for both sides of hiring</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* Candidate flow */}
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.3rem' }}>🎓</span>
              <span style={{ fontWeight: 700, fontSize: '1rem' }}>Candidate Flow</span>
              <span className="badge badge-purple">Student / Fresher</span>
            </div>
            {['Sign Up & Welcome', 'AI Profile Builder Chat', 'Experience & Projects Input', 'Skills Map & Suggestions', 'Profile Preview & Review', 'Submit & Get Matched'].map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', marginBottom: i < 5 ? '0' : '0' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, flexShrink: 0 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--primary-light)', border: '1.5px solid var(--primary-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)' }}>{i + 1}</div>
                  {i < 5 && <div style={{ width: 1, height: 22, background: 'var(--primary-mid)', opacity: 0.4 }} />}
                </div>
                <div style={{ paddingTop: '0.3rem', paddingBottom: i < 5 ? '0.5rem' : 0 }}>
                  <div style={{ fontSize: '0.87rem', fontWeight: 600 }}>{step}</div>
                </div>
              </div>
            ))}
            <button onClick={() => navigate('onboarding')} className="btn btn-primary btn-sm" style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}>
              Start as Candidate →
            </button>
          </div>

          {/* Recruiter flow */}
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.3rem' }}>💼</span>
              <span style={{ fontWeight: 700, fontSize: '1rem' }}>Recruiter Flow</span>
              <span className="badge badge-blue">HR / Manager</span>
            </div>
            {['Login to Dashboard', 'Search & Filter Candidates', 'View Structured Profile', 'AI-Generated Summary', 'Compare Side-by-Side', 'Shortlist & Take Action'].map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, flexShrink: 0 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--blue-light)', border: '1.5px solid #93c5fd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700, color: 'var(--blue)' }}>{i + 1}</div>
                  {i < 5 && <div style={{ width: 1, height: 22, background: '#93c5fd', opacity: 0.4 }} />}
                </div>
                <div style={{ paddingTop: '0.3rem', paddingBottom: i < 5 ? '0.5rem' : 0 }}>
                  <div style={{ fontSize: '0.87rem', fontWeight: 600 }}>{step}</div>
                </div>
              </div>
            ))}
            <button onClick={() => { setUserType('recruiter'); navigate('recruiter'); }} className="btn btn-ghost btn-sm" style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center', borderColor: 'var(--blue)', color: 'var(--blue)' }}>
              Open Recruiter Dashboard →
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 1.5rem', textAlign: 'center', background: 'var(--primary)', color: 'white', marginTop: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.8rem' }}>Ready to hire smarter?</h2>
        <p style={{ opacity: 0.8, marginBottom: '1.8rem', fontSize: '1rem' }}>No PDF. No bias. Just talent.</p>
        <button onClick={() => navigate('onboarding')} className="btn btn-lg" style={{ background: 'white', color: 'var(--primary)', fontWeight: 700 }}>
          Get Started Free →
        </button>
      </section>

      {/* Footer */}
      <footer style={{ padding: '1.5rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text3)', borderTop: '1px solid var(--border)' }}>
        © 2025 TalentForge — AI-Powered Recruitment Platform · Assignment Submission
      </footer>

      <style>{`@media(max-width:640px){section > div > div:first-child{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}
