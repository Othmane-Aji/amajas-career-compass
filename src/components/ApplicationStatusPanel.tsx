
import React, { useState } from 'react';
import { Search, Eye, X, Clock, CheckCircle, XCircle, Calendar } from 'lucide-react';

interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected';
  appliedDate: string;
  salary?: string;
  location: string;
}

const mockApplications: JobApplication[] = [
  {
    id: '1',
    company: 'Google',
    position: 'Senior Software Engineer',
    status: 'interview',
    appliedDate: '2024-01-15',
    salary: '$120k - $180k',
    location: 'Mountain View, CA'
  },
  {
    id: '2',
    company: 'Microsoft',
    position: 'Full Stack Developer',
    status: 'applied',
    appliedDate: '2024-01-20',
    salary: '$110k - $160k',
    location: 'Seattle, WA'
  },
  {
    id: '3',
    company: 'Amazon',
    position: 'Frontend Engineer',
    status: 'offer',
    appliedDate: '2024-01-10',
    salary: '$130k - $190k',
    location: 'Seattle, WA'
  },
  {
    id: '4',
    company: 'Meta',
    position: 'React Developer',
    status: 'rejected',
    appliedDate: '2024-01-05',
    salary: '$115k - $170k',
    location: 'Menlo Park, CA'
  },
];

const statusConfig = {
  applied: { label: 'Applied', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100' },
  interview: { label: 'Interview', icon: Calendar, color: 'text-orange-600', bg: 'bg-orange-100' },
  offer: { label: 'Offer', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
  rejected: { label: 'Rejected', icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' },
};

const ApplicationStatusPanel: React.FC = () => {
  const [applications] = useState<JobApplication[]>(mockApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusCounts = () => {
    return {
      all: applications.length,
      applied: applications.filter(app => app.status === 'applied').length,
      interview: applications.filter(app => app.status === 'interview').length,
      offer: applications.filter(app => app.status === 'offer').length,
      rejected: applications.filter(app => app.status === 'rejected').length,
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Application Status</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          Start Job Matching
        </button>
      </div>

      {/* Status Filter */}
      <div className="flex space-x-2 mb-4 overflow-x-auto">
        {Object.entries(statusCounts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              selectedStatus === status
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span className="capitalize">{status === 'all' ? 'All' : status}</span>
            <span className="bg-white px-2 py-0.5 rounded-full text-xs">{count}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search applications..."
        />
      </div>

      {/* Applications List */}
      <div className="space-y-3">
        {filteredApplications.length > 0 ? (
          filteredApplications.map((app) => {
            const StatusIcon = statusConfig[app.status].icon;
            return (
              <div
                key={app.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{app.position}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[app.status].bg} ${statusConfig[app.status].color}`}>
                        <StatusIcon size={12} className="mr-1" />
                        {statusConfig[app.status].label}
                      </span>
                    </div>
                    <p className="text-gray-600 font-medium mb-1">{app.company}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{app.location}</span>
                      {app.salary && <span>{app.salary}</span>}
                      <span>Applied: {new Date(app.appliedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg font-medium mb-2">No applications found</p>
            <p className="text-sm">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationStatusPanel;
