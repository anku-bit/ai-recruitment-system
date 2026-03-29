import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

const AI_STEPS = [
  {
    id: 'intro',
    aiMessage: "Great to meet you! 🎉 I'm going to ask you a few questions to build your profile. Let's start with the most important one — tell me about yourself in your own words. What do you do, and what are you passionate about?",
    placeholder: "e.g. I'm a final year CS student passionate about building web apps. I love React and have been freelancing for a year...",
    field: 'about',
    hint: 'Just speak naturally — I\'ll structure it for you',
  },
  {
    id: 'experience',
    aiMessage: "That sounds great! Now, tell me about any work experience you have. This could be internships, freelance work, part-time jobs, or even significant academic projects. Don't worry about format — just describe it!",
    placeholder: "e.g. I did a 3-month internship at a startup called TechVibe where I built their dashboard using React. I also freelanced for 2 clients building e-commerce sites...",
    field: 'experienceRaw',
    hint: 'Include company name, role, duration and what you did',
  },
  {
    id: 'projects',
    aiMessage: "Impressive! Projects are a great signal for freshers and early professionals. Tell me about your best project — what did you build, what tech did you use, and what was the impact or outcome?",
    placeholder: "e.g. I built a task management app called 'FlowDesk' using React + Firebase. It had real-time sync and 200+ users. I deployed it on Vercel and it got featured on Product Hunt...",
    field: 'projectRaw',
    hint: 'Include tech stack, your role, and any measurable outcomes',
  },
  {
    id: 'education',
    aiMessage: "Now tell me about your education. Where did you study, what degree/course are you pursuing or completed, and when did/will you graduate?",
    placeholder: "e.g. B.Tech Computer Science from BITS Pilani, graduating June 2025. CGPA 8.4. Also completed certifications in AWS and React from Udemy...",
    field: 'educationRaw',
    hint: 'Include institution, degree, graduation year and any certifications',
  },
];

const SUGGESTED_SKILLS = {
  'Frontend Developer': ['React', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Next.js', 'Redux', 'Tailwind CSS', 'Git', 'REST APIs', 'Figma'],
  'Backend Developer': ['Node.js', 'Python', 'Java', 'SQL', 'MongoDB', 'Docker', 'AWS', 'REST APIs', 'Git', 'Redis'],
  'Full Stack Developer': ['React', 'Node.js', 'JavaScript', 'TypeScript', 'MongoDB', 'SQL', 'Docker', 'Git', 'AWS', 'REST APIs'],
  'UI/UX Designer': ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research', 'Wireframing', 'Design Systems', 'Accessibility', 'HTML/CSS'],
  'Data Analyst': ['Python', 'SQL', 'Excel', 'Tableau', 'Power BI', 'Statistics', 'Pandas', 'Data Visualization', 'R', 'Machine Learning'],
  'Product Manager': ['Product Strategy', 'Agile', 'Jira', 'User Research', 'Data Analysis', 'SQL', 'Roadmapping', 'Stakeholder Management'],
};

export default function ProfileBuilder() {
  const { navigate, profile, setProfile } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [savedAt, setSavedAt] = useState(null);
  const [autoSaved, setAutoSaved] = useState(false);
  const [completionPct, setCompletionPct] = useState(15);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const step = AI_STEPS[currentStep];
  const totalSteps = AI_STEPS.length;

  // Initial message
  useEffect(() => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages([{ role: 'ai', text: AI_STEPS[0].aiMessage }]);
    }, 900);
  }, []);

  // Auto-save every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      if (messages.length > 1) {
        setSavedAt(new Date());
        setAutoSaved(true);
        setTimeout(() => setAutoSaved(false), 2000);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [messages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const simulateAIProcessing = (userText, stepIdx) => {
    setProcessing(true);
    // Simulate AI structuring the response
    setTimeout(() => {
      setProcessing(false);
      const nextIdx = stepIdx + 1;

      // Update profile with structured data
      if (stepIdx === 0) {
        setProfile(p => ({ ...p, about: userText }));
        setCompletionPct(35);
      } else if (stepIdx === 1) {
        // Parse experience
        const exp = {
          id: Date.now(),
          company: 'TechVibe (Internship)',
          role: 'Frontend Developer Intern',
          duration: '3 months',
          description: userText.substring(0, 120),
          bullets: ['Built interactive dashboard using React', 'Improved load time by 40%', 'Collaborated with 5-person team'],
        };
        setProfile(p => ({ ...p, experience: [exp] }));
        setCompletionPct(55);
      } else if (stepIdx === 2) {
        const proj = {
          id: Date.now(),
          name: 'FlowDesk',
          tech: ['React', 'Firebase', 'Vercel'],
          description: userText.substring(0, 100),
          impact: '200+ users, featured on Product Hunt',
          link: 'github.com/user/flowdesk',
        };
        setProfile(p => ({ ...p, projects: [proj] }));
        setCompletionPct(75);
      } else if (stepIdx === 3) {
        const edu = { degree: 'B.Tech Computer Science', institution: 'BITS Pilani', year: '2025', grade: '8.4 CGPA' };
        setProfile(p => ({ ...p, education: [edu] }));
        setCompletionPct(88);
      }

      if (nextIdx < totalSteps) {
        // AI structures the input visually + asks next question
        const structuredNote = getStructuredNote(stepIdx, userText);
        setMessages(prev => [...prev,
          { role: 'ai', text: structuredNote, isStructured: true },
          { role: 'ai', text: AI_STEPS[nextIdx].aiMessage },
        ]);
        setCurrentStep(nextIdx);
        setSavedAt(new Date());
      } else {
        // Done!
        setProfile(p => ({
          ...p,
          skills: (SUGGESTED_SKILLS[p.role] || SUGGESTED_SKILLS['Full Stack Developer']).slice(0, 6),
          completionScore: 88,
        }));
        setMessages(prev => [...prev,
          { role: 'ai', text: "🎉 Amazing! I've structured all your information. Let's now refine your skills and finalize your profile!", isStructured: false },
        ]);
        setTimeout(() => navigate('skills'), 1500);
      }
    }, 1800);
  };

  const getStructuredNote = (stepIdx, text) => {
    const notes = [
      `✅ Got it! I've written your professional summary:\n\n"${text.slice(0, 80)}..."\n\nThis looks strong for a ${profile.role} profile.`,
      `✅ Structured your experience! I identified:\n• Role: Frontend Developer Intern\n• Company: TechVibe\n• Duration: ~3 months\n• Key achievement: Extracted from your description\n\nLooks great — added to your profile.`,
      `✅ Project captured! I found:\n• Project: FlowDesk\n• Tech Stack: React, Firebase, Vercel\n• Impact: 200+ users\n\nThis shows strong initiative!`,
      `✅ Education added:\n• Degree: B.Tech CS\n• Institution: BITS Pilani\n• Expected: 2025\n• CGPA: 8.4\n\nGreat academic background!`,
    ];
    return notes[stepIdx] || '✅ Information processed!';
  };

  const handleSend = () => {
    if (!userInput.trim() || processing) return;
    const text = userInput.trim();
    setMessages(prev => [...prev, { role: 'user', text }]);
    setUserInput('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      simulateAIProcessing(text, currentStep);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const sidebarSections = [
    { label: 'About You', done: currentStep > 0 },
    { label: 'Experience', done: currentStep > 1 },
    { label: 'Projects', done: currentStep > 2 },
    { label: 'Education', done: currentStep > 3 },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 1.5rem', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{ width: 28, height: 28, background: 'var(--primary)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.72rem', fontWeight: 700 }}>TF</div>
          <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>AI Profile Builder</span>
          <span className="badge badge-purple" style={{ fontSize: '0.68rem' }}>🤖 Sage</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Auto-save indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: autoSaved ? 'var(--green)' : 'var(--text3)' }}>
            <span>{autoSaved ? '✓ Saved' : savedAt ? `Saved ${savedAt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}` : 'Auto-save on'}</span>
          </div>
          {/* Progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className="progress-bar" style={{ width: 100, height: 5 }}>
              <div className="progress-fill" style={{ width: `${completionPct}%` }} />
            </div>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)' }}>{completionPct}%</span>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', maxWidth: 1100, width: '100%', margin: '0 auto', padding: '1.5rem', gap: '1.5rem' }}>
        {/* Sidebar */}
        <aside style={{ width: 220, flexShrink: 0 }} className="hide-mobile">
          <div className="card" style={{ padding: '1.2rem' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Profile Sections</div>
            {sidebarSections.map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                padding: '0.55rem 0.7rem', borderRadius: 'var(--radius-xs)',
                fontSize: '0.83rem', fontWeight: s.done ? 600 : 500,
                color: s.done ? 'var(--green)' : i === currentStep ? 'var(--primary)' : 'var(--text2)',
                background: i === currentStep ? 'var(--primary-light)' : 'transparent',
                marginBottom: '0.2rem',
              }}>
                <span style={{ width: 18, height: 18, borderRadius: '50%', background: s.done ? 'var(--green-light)' : i === currentStep ? 'var(--primary-light)' : 'var(--bg2)', border: `1px solid ${s.done ? '#86efac' : i === currentStep ? 'var(--primary-mid)' : 'var(--border2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 700, color: s.done ? '#16a34a' : 'var(--primary)', flexShrink: 0 }}>
                  {s.done ? '✓' : i + 1}
                </span>
                {s.label}
              </div>
            ))}

            <div style={{ height: 1, background: 'var(--border)', margin: '1rem 0' }} />

            <div style={{ fontSize: '0.72rem', color: 'var(--text3)', marginBottom: '0.6rem' }}>Profile completion</div>
            <div className="progress-bar" style={{ marginBottom: '0.4rem', height: 6 }}>
              <div className="progress-fill" style={{ width: `${completionPct}%` }} />
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)' }}>{completionPct}% complete</div>

            {/* AI tip */}
            <div style={{ marginTop: '1.2rem', padding: '0.8rem', background: 'var(--primary-light)', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', color: 'var(--primary)', lineHeight: 1.5 }}>
              💡 <strong>AI Tip:</strong> The more detail you share, the stronger your profile. Mention numbers, outcomes, and tech names.
            </div>
          </div>
        </aside>

        {/* Chat area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Current step indicator */}
          <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text2)' }}>
            <span className="badge badge-purple">Step {currentStep + 1} of {totalSteps}</span>
            <span>{step?.id === 'intro' ? 'Professional Summary' : step?.id === 'experience' ? 'Work Experience' : step?.id === 'projects' ? 'Projects' : 'Education'}</span>
            {step?.hint && <span style={{ color: 'var(--text3)' }}>— {step.hint}</span>}
          </div>

          {/* Messages */}
          <div className="card" style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', maxHeight: 'calc(100vh - 280px)', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start', animation: 'fadeUp 0.3s ease', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
                {msg.role === 'ai' ? (
                  <div className="avatar avatar-ai" style={{ fontSize: '1rem' }}>🤖</div>
                ) : (
                  <div className="avatar" style={{ background: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 700, fontSize: '0.8rem' }}>
                    {profile.name?.charAt(0)}
                  </div>
                )}
                <div style={{ maxWidth: '78%' }}>
                  {msg.role === 'ai' ? (
                    msg.isStructured ? (
                      <div style={{ background: 'var(--green-light)', border: '1px solid #86efac', borderRadius: 12, padding: '0.9rem 1.1rem', fontSize: '0.85rem', lineHeight: 1.6, color: '#166534', whiteSpace: 'pre-line' }}>
                        {msg.text}
                      </div>
                    ) : (
                      <div className="ai-bubble">
                        <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--text)' }}>{msg.text}</p>
                      </div>
                    )
                  ) : (
                    <div className="user-bubble">
                      <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--text)' }}>{msg.text}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {(isTyping || processing) && (
              <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start', animation: 'fadeIn 0.3s ease' }}>
                <div className="avatar avatar-ai" style={{ fontSize: '1rem' }}>🤖</div>
                <div className="ai-bubble" style={{ display: 'flex', alignItems: 'center', gap: 0, padding: '0.9rem 1.1rem' }}>
                  {processing ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--primary)' }}>
                      <div className="spinner" style={{ width: 14, height: 14, borderWidth: '1.5px' }} />
                      Structuring your response with AI...
                    </div>
                  ) : (
                    <>
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                    </>
                  )}
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input area */}
          <div className="card" style={{ padding: '1rem', marginTop: '1rem' }}>
            <textarea
              ref={inputRef}
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={step?.placeholder || 'Type your response...'}
              rows={3}
              className="input"
              style={{ width: '100%', border: 'none', padding: '0', resize: 'none', fontSize: '0.9rem', outline: 'none', background: 'transparent', lineHeight: 1.6, marginBottom: '0.8rem' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>Press Enter to send · Shift+Enter for new line</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => navigate('skills')} className="btn btn-ghost btn-sm">
                  Skip to Skills →
                </button>
                <button onClick={handleSend} disabled={!userInput.trim() || processing} className="btn btn-primary btn-sm"
                  style={{ opacity: (!userInput.trim() || processing) ? 0.5 : 1 }}>
                  {processing ? <><div className="spinner" style={{ width: 14, height: 14, borderWidth: '1.5px', borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'white' }} /> Processing...</> : 'Send →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
