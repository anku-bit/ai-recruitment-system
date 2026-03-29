import React, { useState } from 'react';
import './styles/global.css';

// Pages
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import ProfileBuilder from './pages/ProfileBuilder';
import SkillsExperience from './pages/SkillsExperience';
import ProfilePreview from './pages/ProfilePreview';
import RecruiterDashboard from './pages/RecruiterDashboard';
import CandidateProfileView from './pages/CandidateProfileView';
import ShortlistScreen from './pages/ShortlistScreen';

// Context
import { AppContext } from './context/AppContext';

export default function App() {
  const [screen, setScreen] = useState('landing');
  const [userType, setUserType] = useState('candidate');
  const [profile, setProfile] = useState({
    name: 'Arjun Mehta',
    email: 'arjun@example.com',
    role: 'Frontend Developer',
    location: 'Bangalore, India',
    about: '',
    experience: [],
    skills: [],
    projects: [],
    education: [],
    completionScore: 0,
    savedAt: null,
    autoSaved: false,
  });
  const [shortlisted, setShortlisted] = useState([]);

  const navigate = (s) => {
    setScreen(s);
    window.scrollTo(0, 0);
  };

  return (
    <AppContext.Provider value={{
      screen, navigate, userType, setUserType,
      profile, setProfile, shortlisted, setShortlisted,
    }}>
      <div className="app">
        {screen === 'landing' && <Landing />}
        {screen === 'onboarding' && <Onboarding />}
        {screen === 'builder' && <ProfileBuilder />}
        {screen === 'skills' && <SkillsExperience />}
        {screen === 'preview' && <ProfilePreview />}
        {screen === 'recruiter' && <RecruiterDashboard />}
        {screen === 'candidate-view' && <CandidateProfileView />}
        {screen === 'shortlist' && <ShortlistScreen />}
      </div>
    </AppContext.Provider>
  );
}
