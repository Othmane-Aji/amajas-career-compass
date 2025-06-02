
import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface JobPreferences {
  jobTypes: string[];
  industries: string[];
}

const jobTypes = [
  { id: 'full-time', label: 'Full-time' },
  { id: 'part-time', label: 'Part-time' },
  { id: 'contract', label: 'Contract' },
  { id: 'freelance', label: 'Freelance' },
];

const industries = [
  'Technology',
  'Finance',
  'Healthcare',
  'Education',
  'Marketing',
  'Engineering',
  'Design',
  'Sales',
  'Operations',
  'Consulting',
];

const JobPreferencesPanel: React.FC = () => {
  const [preferences, setPreferences] = useState<JobPreferences>({
    jobTypes: ['full-time'],
    industries: ['Technology']
  });

  const toggleJobType = (jobType: string) => {
    setPreferences(prev => ({
      ...prev,
      jobTypes: prev.jobTypes.includes(jobType)
        ? prev.jobTypes.filter(type => type !== jobType)
        : [...prev.jobTypes, jobType]
    }));
  };

  const toggleIndustry = (industry: string) => {
    setPreferences(prev => ({
      ...prev,
      industries: prev.industries.includes(industry)
        ? prev.industries.filter(ind => ind !== industry)
        : [...prev.industries, industry]
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Job Preferences</h2>
      
      {/* Job Types */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Job Type</h3>
        <div className="grid grid-cols-2 gap-3">
          {jobTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => toggleJobType(type.id)}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                preferences.jobTypes.includes(type.id)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="font-medium">{type.label}</span>
              {preferences.jobTypes.includes(type.id) && (
                <Check size={16} className="text-blue-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Industries */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Industries</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {industries.map((industry) => (
            <label
              key={industry}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={preferences.industries.includes(industry)}
                onChange={() => toggleIndustry(industry)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-gray-700">{industry}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
        Save Preferences
      </button>
    </div>
  );
};

export default JobPreferencesPanel;
