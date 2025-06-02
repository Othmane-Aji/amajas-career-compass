import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import ResumeUploadPanel from './ResumeUploadPanel';
import RegionSelectionPanel from './RegionSelectionPanel';
import JobPreferencesPanel from './JobPreferencesPanel';
import ApplicationStatusPanel from './ApplicationStatusPanel';
import ExtractedResumeInfoPanel from './ExtractedResumeInfoPanel';
import AllAppliedJobsPanel from './AllAppliedJobsPanel';

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [resumeHasCountry, setResumeHasCountry] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResumeUploadPanel onResumeAnalyzed={(hasCountry) => setResumeHasCountry(hasCountry)} />
            {!resumeHasCountry && <RegionSelectionPanel />}
            <JobPreferencesPanel />
            <ApplicationStatusPanel />
          </div>
        );
      case 'resume':
        return (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <ResumeUploadPanel onResumeAnalyzed={(hasCountry) => setResumeHasCountry(hasCountry)} />
            <ExtractedResumeInfoPanel />
          </div>
        );
      case 'preferences':
        return (
          <div className="max-w-2xl">
            <JobPreferencesPanel />
          </div>
        );
      case 'applications':
        return (
          <div className="max-w-6xl">
            <AllAppliedJobsPanel />
          </div>
        );
      case 'messages':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Messages & Notifications</h2>
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg font-medium mb-2">No new messages</p>
              <p className="text-sm">We'll notify you when there are updates on your applications</p>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Settings</h2>
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg font-medium mb-2">Profile Settings</p>
              <p className="text-sm">Manage your account settings and preferences</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getSectionTitle = () => {
    const titles = {
      dashboard: 'Welcome to AMAJAS',
      resume: 'Resume Management',
      preferences: 'Job Preferences',
      applications: 'Application Tracking',
      messages: 'Messages & Notifications',
      profile: 'Profile Settings',
    };
    return titles[activeSection as keyof typeof titles] || 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader title={getSectionTitle()} userName="John Doe" />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
