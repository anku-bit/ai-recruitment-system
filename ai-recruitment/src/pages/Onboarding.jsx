import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Onboarding() {
  const { navigate, setProfile, profile } = useApp();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', role: '', userType: 'fresher' });

  const roles = ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'UI/UX Designer', 'Data Analyst', 'Product Manager', 'DevOps Engineer', 'Mobile Developer'];

  const handleStart = () => {
    if (!form.name || !form.email) return;
    setProfile(p => ({ ...p, name: form.name, email: form.email, role: form.role || roles[0] }));
    navigate('builder');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 28, height: 28, background: 'var(--primary)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: 700 }}>TF</div>
          <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>TalentForge</span>
        </div>
        <button onClick={() => navigate('landing')} style={{ background: 'none', border: 'none', color: 'var(--text2)', fontSize: '0.82rem', cursor: 'pointer' }}>← Back</button>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
        {step === 1 && (
          <div style={{ maxWidth: 520, width: '100%', animation: 'fadeUp 0.4s ease' }}>
            {/* AI intro */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', marginBottom: '2rem' }}>
              <div className="avatar avatar-ai" style={{ width: 44, height: 44, fontSize: '1.1rem', flexShrink: 0 }}>🤖</div>
              <div>
                <div className="ai-bubble" style={{ marginBottom: '0.5rem' }}>
                  <p style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.4rem' }}>Hi! I'm Sage, your AI profile assistant. 👋</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text2)', lineHeight: 1.6 }}>
                    I'm here to help you build a <strong>powerful profile</strong> — no resume upload needed. 
                    Just answer my questions naturally and I'll structure everything for you.
                  </p>
                </div>
                <div className="ai-bubble">
                  <p style={{ fontSize: '0.875rem', color: 'var(--text2)', lineHeight: 1.6 }}>
                    ✓ <strong>No PDF uploads</strong> &nbsp;·&nbsp; ✓ <strong>No formatting stress</strong> &nbsp;·&nbsp; ✓ <strong>Auto-saved progress</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="card-elevated" style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.3rem' }}>Let's get started</h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text2)', marginBottom: '1.5rem' }}>Tell me a little about yourself</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label className="label">Your Name *</label>
                  <input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Priya Sharma" />
                </div>
                <div className="form-group">
                  <label className="label">Email Address *</label>
                  <input className="input" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="priya@example.com" />
                </div>
                <div className="form-group">
                  <label className="label">Target Role</label>
                  <select className="input" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
                    {roles.map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="label">I am a...</label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {[['fresher', '🎓 Fresher / Student'], ['early', '🌱 Early Professional (0-2 yrs)'], ['mid', '💼 Mid-level (2-5 yrs)']].map(([v, l]) => (
                      <button key={v} onClick={() => setForm(f => ({ ...f, userType: v }))} style={{
                        padding: '0.5rem 1rem', borderRadius: 100, fontSize: '0.8rem', fontWeight: 600,
                        border: `1.5px solid ${form.userType === v ? 'var(--primary)' : 'var(--border2)'}`,
                        background: form.userType === v ? 'var(--primary-light)' : 'var(--surface)',
                        color: form.userType === v ? 'var(--primary)' : 'var(--text2)',
                        transition: 'all 0.15s',
                      }}>{l}</button>
                    ))}
                  </div>
                </div>

                <button onClick={handleStart} disabled={!form.name || !form.email} className="btn btn-primary"
                  style={{ justifyContent: 'center', padding: '0.85rem', marginTop: '0.5rem', opacity: (!form.name || !form.email) ? 0.5 : 1 }}>
                  Start Building with AI →
                </button>
              </div>
            </div>

            {/* Info strip */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.2rem', flexWrap: 'wrap' }}>
              {['🔒 100% Private', '⚡ Takes ~8 mins', '💾 Auto-saved'].map(s => (
                <span key={s} style={{ fontSize: '0.75rem', color: 'var(--text3)', fontWeight: 500 }}>{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
