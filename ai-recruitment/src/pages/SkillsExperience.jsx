import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const SKILL_CATEGORIES = {
  'Frontend': ['React', 'Vue.js', 'Angular', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Next.js', 'Tailwind CSS', 'Redux', 'GraphQL'],
  'Backend': ['Node.js', 'Python', 'Java', 'Go', 'PHP', 'Ruby', 'Express.js', 'Django', 'Spring Boot', 'FastAPI'],
  'Database': ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'SQLite', 'Firebase', 'Supabase', 'DynamoDB'],
  'DevOps / Cloud': ['Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'CI/CD', 'Git', 'Linux', 'Nginx', 'Terraform'],
  'Tools': ['Figma', 'VS Code', 'Jira', 'Notion', 'Postman', 'Webpack', 'Vite', 'Jest', 'Cypress'],
  'Soft Skills': ['Communication', 'Problem Solving', 'Team Collaboration', 'Time Management', 'Adaptability', 'Leadership'],
};

const SKILL_LEVELS = ['Learning', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

const AI_RECOMMENDATIONS = [
  { skill: 'TypeScript', reason: 'Common pairing with React in 2024', confidence: 92 },
  { skill: 'Next.js', reason: 'Based on your React experience', confidence: 88 },
  { skill: 'Docker', reason: 'Expected for Frontend Developers', confidence: 75 },
  { skill: 'Jest', reason: 'Testing is a key hiring signal', confidence: 82 },
];

export default function SkillsExperience() {
  const { navigate, profile, setProfile } = useApp();
  const [selectedSkills, setSelectedSkills] = useState(
    profile.skills?.length ? profile.skills.map(s => typeof s === 'string' ? { name: s, level: 'Intermediate' } : s) : []
  );
  const [customSkill, setCustomSkill] = useState('');
  const [activeCategory, setActiveCategory] = useState('Frontend');
  const [savedAt, setSavedAt] = useState(null);
  const [autoSaved, setAutoSaved] = useState(false);
  const [aiSummary, setAiSummary] = useState('');
  const [generating, setGenerating] = useState(false);
  const [completionPct, setCompletionPct] = useState(88);

  const isSelected = (name) => selectedSkills.some(s => s.name === name);

  const toggleSkill = (name) => {
    setSelectedSkills(prev => {
      const updated = isSelected(name)
        ? prev.filter(s => s.name !== name)
        : [...prev, { name, level: 'Intermediate' }];
      setProfile(p => ({ ...p, skills: updated }));
      setCompletionPct(Math.min(95, 88 + updated.length));
      // Auto-save
      setSavedAt(new Date());
      setAutoSaved(true);
      setTimeout(() => setAutoSaved(false), 1500);
      return updated;
    });
  };

  const setLevel = (name, level) => {
    setSelectedSkills(prev => prev.map(s => s.name === name ? { ...s, level } : s));
  };

  const addCustom = () => {
    if (!customSkill.trim()) return;
    toggleSkill(customSkill.trim());
    setCustomSkill('');
  };

  const generateSummary = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setAiSummary(`${profile.name} is a results-driven ${profile.role} with hands-on experience in ${selectedSkills.slice(0,3).map(s=>s.name).join(', ')} and more. Demonstrated ability to build production-ready applications through internships and personal projects. Currently pursuing ${profile.education?.[0]?.degree || 'a technical degree'}, bringing strong academic foundations combined with practical development experience. Particularly skilled at crafting intuitive user interfaces and writing clean, maintainable code.`);
      setCompletionPct(98);
    }, 2000);
  };

  const handleFinish = () => {
    setProfile(p => ({
      ...p,
      skills: selectedSkills,
      summary: aiSummary,
      completionScore: completionPct,
      savedAt: new Date(),
    }));
    navigate('preview');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Top bar */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 1.5rem', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{ width: 28, height: 28, background: 'var(--primary)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.72rem', fontWeight: 700 }}>TF</div>
          <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Skills & Finalize</span>
          <span className="badge badge-green" style={{ fontSize: '0.68rem' }}>Almost done!</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.75rem', color: autoSaved ? 'var(--green)' : 'var(--text3)' }}>
            {autoSaved ? '✓ Saved' : savedAt ? `Saved ${savedAt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}` : 'Auto-save on'}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className="progress-bar" style={{ width: 90 }}>
              <div className="progress-fill" style={{ width: `${completionPct}%` }} />
            </div>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)' }}>{completionPct}%</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: '0 auto', padding: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', alignItems: 'start' }}>
          {/* Left: skill picker */}
          <div>
            {/* AI Recommendations */}
            <div className="card" style={{ padding: '1.2rem', marginBottom: '1.2rem', border: '1px solid var(--primary-mid)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.9rem' }}>
                <div className="avatar avatar-ai" style={{ width: 28, height: 28, fontSize: '0.8rem' }}>🤖</div>
                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--primary)' }}>AI Skill Suggestions</span>
                <span className="badge badge-purple">Based on your profile</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text2)', marginBottom: '0.9rem' }}>
                Based on your experience with React and internship background, I recommend adding:
              </p>
              <div style={{ display: 'flex', flex: 'wrap', gap: '0.5rem', flexWrap: 'wrap' }}>
                {AI_RECOMMENDATIONS.map(r => (
                  <div key={r.skill} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', borderRadius: 100, background: isSelected(r.skill) ? 'var(--primary)' : 'var(--primary-light)', border: '1px solid rgba(108,71,255,0.25)', cursor: 'pointer', transition: 'all 0.15s' }}
                    onClick={() => toggleSkill(r.skill)}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: isSelected(r.skill) ? 'white' : 'var(--primary)' }}>{r.skill}</span>
                    <span style={{ fontSize: '0.65rem', color: isSelected(r.skill) ? 'rgba(255,255,255,0.7)' : 'var(--text3)', background: isSelected(r.skill) ? 'rgba(255,255,255,0.15)' : 'rgba(108,71,255,0.1)', padding: '0.05rem 0.35rem', borderRadius: 100 }}>{r.confidence}%</span>
                    {isSelected(r.skill) && <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.9)' }}>✓</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Category tabs */}
            <div className="card" style={{ padding: '1.2rem', marginBottom: '1.2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 style={{ fontWeight: 700, fontSize: '0.95rem' }}>Select Your Skills</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input value={customSkill} onChange={e => setCustomSkill(e.target.value)} onKeyDown={e => e.key === 'Enter' && addCustom()}
                    placeholder="Add custom skill..." className="input" style={{ padding: '0.45rem 0.8rem', fontSize: '0.82rem', width: 160 }} />
                  <button onClick={addCustom} className="btn btn-ghost btn-sm">+ Add</button>
                </div>
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {Object.keys(SKILL_CATEGORIES).map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                    padding: '0.3rem 0.8rem', borderRadius: 100, fontSize: '0.78rem', fontWeight: 600,
                    border: `1px solid ${activeCategory === cat ? 'var(--primary)' : 'var(--border2)'}`,
                    background: activeCategory === cat ? 'var(--primary)' : 'transparent',
                    color: activeCategory === cat ? 'white' : 'var(--text2)',
                    transition: 'all 0.15s',
                  }}>{cat}</button>
                ))}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {SKILL_CATEGORIES[activeCategory].map(skill => (
                  <button key={skill} onClick={() => toggleSkill(skill)} className={`skill-tag ${isSelected(skill) ? 'selected' : ''}`}
                    style={{ transition: 'all 0.15s' }}>
                    {isSelected(skill) && <span style={{ fontSize: '0.65rem' }}>✓</span>}
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected skills with levels */}
            {selectedSkills.length > 0 && (
              <div className="card" style={{ padding: '1.2rem' }}>
                <h3 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '1rem' }}>
                  Your Skills ({selectedSkills.length})
                  <span style={{ fontWeight: 400, fontSize: '0.8rem', color: 'var(--text2)', marginLeft: '0.5rem' }}>— Set your proficiency level</span>
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {selectedSkills.map(skill => (
                    <div key={skill.name} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.6rem 0.8rem', background: 'var(--bg)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border)' }}>
                      <span style={{ flex: 1, fontWeight: 600, fontSize: '0.85rem' }}>{skill.name}</span>
                      <div style={{ display: 'flex', gap: '0.3rem' }}>
                        {SKILL_LEVELS.map(level => (
                          <button key={level} onClick={() => setLevel(skill.name, level)} style={{
                            padding: '0.2rem 0.6rem', borderRadius: 100, fontSize: '0.7rem', fontWeight: 600,
                            border: `1px solid ${skill.level === level ? 'var(--primary)' : 'var(--border)'}`,
                            background: skill.level === level ? 'var(--primary)' : 'transparent',
                            color: skill.level === level ? 'white' : 'var(--text3)',
                            cursor: 'pointer', transition: 'all 0.12s',
                          }}>{level}</button>
                        ))}
                      </div>
                      <button onClick={() => toggleSkill(skill.name)} style={{ background: 'none', border: 'none', color: 'var(--text3)', fontSize: '0.9rem', cursor: 'pointer', padding: '0 0.2rem' }}>×</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: AI summary + actions */}
          <div style={{ position: 'sticky', top: 72 }}>
            {/* Profile summary card */}
            <div className="card" style={{ padding: '1.2rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1rem' }}>
                <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '1rem' }}>
                  {profile.name?.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{profile.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text2)' }}>{profile.role}</div>
                </div>
              </div>

              {/* Completion */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--text2)' }}>Profile strength</span>
                  <span style={{ fontWeight: 700, color: completionPct >= 90 ? 'var(--green)' : 'var(--primary)' }}>{completionPct >= 90 ? 'Strong' : completionPct >= 70 ? 'Good' : 'Building'}</span>
                </div>
                <div className="progress-bar" style={{ height: 7 }}>
                  <div className="progress-fill" style={{ width: `${completionPct}%`, background: completionPct >= 90 ? 'var(--green)' : 'var(--primary)' }} />
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text3)', marginTop: '0.3rem' }}>{completionPct}% — {completionPct >= 90 ? 'Ready to submit!' : 'Add more skills to strengthen'}</div>
              </div>

              {/* Checklist */}
              {[
                { label: 'About / Summary', done: !!profile.about },
                { label: 'Work Experience', done: profile.experience?.length > 0 },
                { label: 'Projects', done: profile.projects?.length > 0 },
                { label: 'Education', done: profile.education?.length > 0 },
                { label: 'Skills', done: selectedSkills.length >= 3 },
                { label: 'AI Summary', done: !!aiSummary },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', marginBottom: '0.35rem', color: item.done ? 'var(--green)' : 'var(--text3)' }}>
                  <span style={{ fontWeight: 700 }}>{item.done ? '✓' : '○'}</span> {item.label}
                </div>
              ))}
            </div>

            {/* AI summary generator */}
            <div className="card" style={{ padding: '1.2rem', marginBottom: '1rem', border: '1px solid var(--primary-mid)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.7rem' }}>
                <span style={{ fontSize: '1rem' }}>✨</span>
                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--primary)' }}>AI Auto-Summary</span>
              </div>
              {aiSummary ? (
                <div>
                  <p style={{ fontSize: '0.8rem', lineHeight: 1.65, color: 'var(--text2)', marginBottom: '0.7rem' }}>{aiSummary}</p>
                  <button onClick={generateSummary} className="btn btn-ghost btn-sm" style={{ width: '100%', justifyContent: 'center' }}>Regenerate</button>
                </div>
              ) : (
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text2)', marginBottom: '0.8rem', lineHeight: 1.5 }}>
                    Generate a professional summary based on all your inputs automatically.
                  </p>
                  <button onClick={generateSummary} disabled={generating} className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                    {generating ? <><div className="spinner" style={{ width: 13, height: 13, borderWidth: '1.5px', borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'white' }} /> Generating...</> : '✨ Generate Summary'}
                  </button>
                </div>
              )}
            </div>

            {/* Actions */}
            <button onClick={handleFinish} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', marginBottom: '0.6rem' }}>
              Preview Profile →
            </button>
            <button onClick={() => navigate('builder')} className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
              ← Back to AI Chat
            </button>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:720px){.container>div>div{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}
