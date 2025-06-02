
import React from 'react';
import { User, Briefcase, GraduationCap, Award, Mail, Phone, MapPin } from 'lucide-react';

interface ExtractedInfo {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  experience: {
    company: string;
    position: string;
    duration: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  skills: string[];
  certifications: string[];
}

const mockExtractedInfo: ExtractedInfo = {
  personalInfo: {
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA"
  },
  summary: "Experienced software engineer with 5+ years in full-stack development, specializing in React, Node.js, and cloud technologies.",
  experience: [
    {
      company: "Tech Solutions Inc.",
      position: "Senior Software Engineer",
      duration: "2021 - Present",
      description: "Led development of scalable web applications serving 100k+ users"
    },
    {
      company: "StartupCorp",
      position: "Full Stack Developer",
      duration: "2019 - 2021",
      description: "Built and maintained multiple React-based applications"
    }
  ],
  education: [
    {
      degree: "Bachelor of Computer Science",
      institution: "University of California",
      year: "2019"
    }
  ],
  skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "MongoDB"],
  certifications: ["AWS Certified Developer", "Google Cloud Professional"]
};

const ExtractedResumeInfoPanel: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Extracted Resume Information</h2>
      
      {/* Personal Information */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <User size={20} className="text-blue-600" />
          <h3 className="text-md font-medium text-gray-900">Personal Information</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-700">Name:</span>
            <span className="text-gray-900">{mockExtractedInfo.personalInfo.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail size={14} className="text-gray-500" />
            <span className="text-gray-700">{mockExtractedInfo.personalInfo.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone size={14} className="text-gray-500" />
            <span className="text-gray-700">{mockExtractedInfo.personalInfo.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin size={14} className="text-gray-500" />
            <span className="text-gray-700">{mockExtractedInfo.personalInfo.location}</span>
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-900 mb-2">Professional Summary</h3>
        <p className="text-gray-700 text-sm leading-relaxed">{mockExtractedInfo.summary}</p>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <Briefcase size={20} className="text-blue-600" />
          <h3 className="text-md font-medium text-gray-900">Experience</h3>
        </div>
        <div className="space-y-3">
          {mockExtractedInfo.experience.map((exp, index) => (
            <div key={index} className="border-l-2 border-blue-200 pl-4">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium text-gray-900">{exp.position}</h4>
                <span className="text-xs text-gray-500">{exp.duration}</span>
              </div>
              <p className="text-sm text-blue-600 mb-1">{exp.company}</p>
              <p className="text-xs text-gray-600">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <GraduationCap size={20} className="text-blue-600" />
          <h3 className="text-md font-medium text-gray-900">Education</h3>
        </div>
        <div className="space-y-2">
          {mockExtractedInfo.education.map((edu, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3">
              <p className="font-medium text-gray-900">{edu.degree}</p>
              <p className="text-sm text-gray-600">{edu.institution} • {edu.year}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-900 mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {mockExtractedInfo.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <Award size={20} className="text-blue-600" />
          <h3 className="text-md font-medium text-gray-900">Certifications</h3>
        </div>
        <div className="space-y-2">
          {mockExtractedInfo.certifications.map((cert, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Award size={14} className="text-green-600" />
              <span className="text-sm text-gray-700">{cert}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExtractedResumeInfoPanel;
