# TalentForge — AI-Powered Recruitment Platform
## Assignment: AI-Powered Recruitment Experience

---

## 🚀 Quick Start

```bash
cd ai-recruitment
npm install
npm start
# Opens at http://localhost:3000
```

---

## 📋 Assignment Deliverables

### 1. Problem Understanding
**What's wrong with resume-based hiring?**
- Recruiters spend avg. 7 seconds per resume → bias decides fate
- PDF parsing loses 40–60% of context and formatting
- 75% of candidates are filtered by ATS before humans see them
- Inconsistent data makes fair comparison impossible
- Freshers/students with no formal experience are unfairly penalized

**What does AI solve?**
- Replaces rigid upload with natural conversation
- Structures free-form answers into consistent data
- Generates skill suggestions based on profile context
- Auto-summarizes candidate strengths for recruiters
- Enables fair, structured comparison without format bias

---

### 2. User Flows Implemented

**Candidate Flow (7 screens):**
1. Landing Page → problem statement + CTA
2. Onboarding → sign up + AI Sage introduction
3. AI Profile Builder → chat interface, 4-step guided conversation
4. Skills & Experience → AI recommendations + skill picker
5. Profile Preview → review + export + share
6. Submission Confirmation → success + stats
7. [Navigates back to home or recruiter view]

**Recruiter Flow (3 screens):**
1. Recruiter Dashboard → candidate grid, search/filter, AI insights
2. Candidate Profile View → full profile with skill bars + AI summary
3. Shortlist / Compare → side-by-side comparison, action management

---

### 3. Information Architecture

**Candidate Profile Data Structure:**
```
Profile {
  name, email, role, location
  about: String (AI-structured summary)
  skills: [{ name, level }]
  experience: [{ company, role, duration, bullets[] }]
  projects: [{ name, tech[], description, impact, link }]
  education: [{ degree, institution, year, grade }]
  completionScore: Number (0-100)
  savedAt: Timestamp
  aiGeneratedSummary: String
}
```

---

### 4. Core Screens (8 screens implemented)

| Screen | Type | Description |
|--------|------|-------------|
| Landing | Public | Problem + solution + user flows |
| Onboarding | Candidate | Sign up + AI Sage intro |
| AI Profile Builder | Candidate | Chat-based profile creation (CORE) |
| Skills & Experience | Candidate | Skill picker + AI recommendations |
| Profile Preview | Candidate | Review + export/share |
| Recruiter Dashboard | Recruiter | Candidate list, search, filter |
| Candidate Profile View | Recruiter | Detailed profile + AI summary |
| Shortlist / Compare | Recruiter | Side-by-side comparison + actions |

---

### 5. AI Interaction Design (Critical)

**AI Interactions Implemented:**

1. **Conversational Profile Building**
   - "Tell me about your experience" → AI structures → shows formatted result
   - Typing indicator while processing
   - Structured confirmation ("✅ I identified: Role, Company, Duration...")

2. **Skill Suggestions**
   - AI recommends skills with % confidence
   - Based on role + conversation context
   - e.g., "TypeScript (92%) — Common pairing with React in 2024"

3. **Auto-Summary Generation**
   - "✨ Generate Summary" button
   - Creates professional paragraph from all inputs
   - Can regenerate

4. **Recruiter AI Insights**
   - Dashboard banner: "AI Insight: Arjun and Ananya have strongest TypeScript + React combination..."
   - Per-candidate AI summary card
   - Strengths / concerns auto-generated

5. **Role-Based Recommendations**
   - Skill suggestions change based on target role
   - Match % score comparing candidate to job requirements

---

### 6. Product Thinking

**Auto-Save & Progress:**
- Saves every 30 seconds (with timestamp display)
- Visual progress bar (step %)
- Section completion checklist
- "Saved at 14:32" indicator

**Export / Share:**
- "Download PDF" button (simulated)
- "Share Link" (copy to clipboard)
- Both in Preview screen and top action bar

**Completion Score:**
- Real-time progress tracking (15% → 35% → 55% → 75% → 88% → 98%)
- Changes color at 90% (green = "Strong")
- Visual ring on profile card

---

## 🎨 Design Decisions

- **Color:** Purple (#6C47FF) primary — conveys intelligence + trustworthiness
- **Font:** Sora — modern, geometric, readable at all sizes
- **No gradients on surfaces** — clean flat design
- **AI bubbles** — distinct from user messages with tail indicator
- **Consistent badge system** — skill levels, status, match %
- **Sticky nav** — always accessible save status + progress

---

## 📊 Evaluation Criteria Coverage

| Criteria | Weight | Implementation |
|----------|--------|----------------|
| UX Thinking | 25% | 8 screens, complete flows, micro-interactions |
| AI Interaction Design | 20% | Chat UI, skill suggestions, auto-summary, insights |
| Problem Solving | 20% | Problem statement, user flows, IA all documented |
| Product Thinking | 15% | Auto-save, export, share, progress tracking |
| Visual Design | 10% | Design system, consistent tokens, dark-ready |
| Originality | 10% | No LinkedIn/Naukri UI, unique "Sage" AI persona |
