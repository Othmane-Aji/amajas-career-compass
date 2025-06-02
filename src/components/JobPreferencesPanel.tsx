
import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface JobPreferences {
  jobTypes: string[];
  industries: string[];
  salaryRange: { min: number; max: number };
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
    industries: ['Technology'],
    salaryRange: { min: 50000, max: 150000 }
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

  const updateSalaryRange = (field: 'min' | 'max', value: number) => {
    setPreferences(prev => ({
      ...prev,
      salaryRange: { ...prev.salaryRange, [field]: value }
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

      {/* Salary Range */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Salary Range (USD)</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Minimum</label>
              <input
                type="number"
                value={preferences.salaryRange.min}
                onChange={(e) => updateSalaryRange('min', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="50,000"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Maximum</label>
              <input
                type="number"
                value={preferences.salaryRange.max}
                onChange={(e) => updateSalaryRange('max', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="150,000"
              />
            </div>
          </div>
          
          {/* Salary Range Slider Visual */}
          <div className="px-2">
            <div className="relative">
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-blue-500 rounded-full"
                  style={{
                    marginLeft: `${(preferences.salaryRange.min / 200000) * 100}%`,
                    width: `${((preferences.salaryRange.max - preferences.salaryRange.min) / 200000) * 100}%`
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$0</span>
                <span>$200k+</span>
              </div>
            </div>
          </div>
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
