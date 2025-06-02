
import React, { useState } from 'react';
import { Search, Calendar, MapPin, DollarSign, Building, ExternalLink, Eye, Trash2 } from 'lucide-react';

interface AppliedJob {
  id: string;
  company: string;
  position: string;
  location: string;
  salary: string;
  appliedDate: string;
  status: 'applied' | 'reviewing' | 'interview-scheduled' | 'interview-completed' | 'offer' | 'rejected' | 'withdrawn';
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
  description: string;
  applicationSource: string;
}

const mockAppliedJobs: AppliedJob[] = [
  {
    id: '1',
    company: 'Google',
    position: 'Senior Software Engineer',
    location: 'Mountain View, CA',
    salary: '$120k - $180k',
    appliedDate: '2024-01-15',
    status: 'interview-scheduled',
    jobType: 'Full-time',
    description: 'Join our team to build next-generation software solutions...',
    applicationSource: 'LinkedIn'
  },
  {
    id: '2',
    company: 'Microsoft',
    position: 'Full Stack Developer',
    location: 'Seattle, WA',
    salary: '$110k - $160k',
    appliedDate: '2024-01-20',
    status: 'reviewing',
    jobType: 'Full-time',
    description: 'Work on cloud-based applications and services...',
    applicationSource: 'Company Website'
  },
  {
    id: '3',
    company: 'Amazon',
    position: 'Frontend Engineer',
    location: 'Seattle, WA',
    salary: '$130k - $190k',
    appliedDate: '2024-01-10',
    status: 'offer',
    jobType: 'Full-time',
    description: 'Build user-facing features for millions of customers...',
    applicationSource: 'Indeed'
  },
  {
    id: '4',
    company: 'Meta',
    position: 'React Developer',
    location: 'Menlo Park, CA',
    salary: '$115k - $170k',
    appliedDate: '2024-01-05',
    status: 'rejected',
    jobType: 'Full-time',
    description: 'Develop cutting-edge React applications...',
    applicationSource: 'Glassdoor'
  },
  {
    id: '5',
    company: 'Stripe',
    position: 'Frontend Engineer',
    location: 'San Francisco, CA',
    salary: '$125k - $175k',
    appliedDate: '2024-01-25',
    status: 'applied',
    jobType: 'Full-time',
    description: 'Build payment infrastructure for the internet...',
    applicationSource: 'AngelList'
  }
];

const statusConfig = {
  'applied': { label: 'Applied', color: 'bg-blue-100 text-blue-800' },
  'reviewing': { label: 'Under Review', color: 'bg-yellow-100 text-yellow-800' },
  'interview-scheduled': { label: 'Interview Scheduled', color: 'bg-purple-100 text-purple-800' },
  'interview-completed': { label: 'Interview Completed', color: 'bg-indigo-100 text-indigo-800' },
  'offer': { label: 'Offer Received', color: 'bg-green-100 text-green-800' },
  'rejected': { label: 'Rejected', color: 'bg-red-100 text-red-800' },
  'withdrawn': { label: 'Withdrawn', color: 'bg-gray-100 text-gray-800' }
};

const AllAppliedJobsPanel: React.FC = () => {
  const [jobs] = useState<AppliedJob[]>(mockAppliedJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'company' | 'status'>('date');

  const filteredAndSortedJobs = jobs
    .filter(job => {
      const matchesSearch = job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
        case 'company':
          return a.company.localeCompare(b.company);
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

  const getStatusCounts = () => {
    const counts = { all: jobs.length };
    jobs.forEach(job => {
      counts[job.status] = (counts[job.status] || 0) + 1;
    });
    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">All Applied Jobs</h2>
          <p className="text-sm text-gray-600">Track all your job applications in one place</p>
        </div>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          {jobs.length} Applications
        </span>
      </div>

      {/* Filters and Search */}
      <div className="space-y-4 mb-6">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by company, position, or location..."
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Status Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              statusFilter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({statusCounts.all})
          </button>
          {Object.entries(statusConfig).map(([status, config]) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                statusFilter === status 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {config.label} ({statusCounts[status] || 0})
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'company' | 'status')}
            className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="date">Application Date</option>
            <option value="company">Company</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredAndSortedJobs.length > 0 ? (
          filteredAndSortedJobs.map((job) => (
            <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{job.position}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[job.status].color}`}>
                      {statusConfig[job.status].label}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <Building size={16} className="text-gray-500" />
                    <span className="font-medium text-gray-700">{job.company}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{job.jobType}</span>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center space-x-1">
                      <MapPin size={14} />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign size={14} />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>Applied {new Date(job.appliedDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{job.description}</p>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Applied via:</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                      {job.applicationSource}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="View Details">
                    <Eye size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Open Job Posting">
                    <ExternalLink size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Withdraw Application">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
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

export default AllAppliedJobsPanel;
