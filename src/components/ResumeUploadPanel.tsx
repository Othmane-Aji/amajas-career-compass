import React, { useState, useCallback } from 'react';
import { FileUp, File, X, CheckCircle, Clock } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface ResumeFile {
  name: string;
  size: number;
  uploadDate: string;
  status: 'uploading' | 'completed' | 'error';
  progress: number;
}

interface ResumeUploadPanelProps {
  onResumeAnalyzed?: (hasCountry: boolean) => void;
}

const ResumeUploadPanel: React.FC<ResumeUploadPanelProps> = ({ onResumeAnalyzed }) => {
  const [uploadedFile, setUploadedFile] = useState<ResumeFile | null>(null);
  const [extractedSkills] = useState(['React', 'TypeScript', 'Node.js', 'Python', 'AWS']);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const newFile: ResumeFile = {
        name: file.name,
        size: file.size,
        uploadDate: new Date().toLocaleDateString(),
        status: 'uploading',
        progress: 0
      };
      
      setUploadedFile(newFile);
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadedFile(prev => {
          if (!prev) return null;
          const newProgress = Math.min(prev.progress + 20, 100);
          if (newProgress === 100) {
            clearInterval(interval);
            // Simulate resume analysis - randomly determine if country is found
            const hasCountry = Math.random() > 0.5;
            onResumeAnalyzed?.(hasCountry);
            return { ...prev, progress: newProgress, status: 'completed' };
          }
          return { ...prev, progress: newProgress };
        });
      }, 300);
    }
  }, [onResumeAnalyzed]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1
  });

  const formatFileSize = (bytes: number) => {
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  const removeFile = () => {
    setUploadedFile(null);
    onResumeAnalyzed?.(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Resume Upload</h2>
        {uploadedFile?.status === 'completed' && (
          <div className="flex items-center text-green-600 text-sm">
            <CheckCircle size={16} className="mr-1" />
            Upload Complete
          </div>
        )}
      </div>

      {!uploadedFile ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />
          <FileUp className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">
            {isDragActive ? 'Drop your resume here' : 'Upload your resume'}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Drag and drop your resume, or click to browse
          </p>
          <p className="text-xs text-gray-400">
            Supports PDF, DOC, DOCX (Max 10MB)
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* File Info */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <File className="h-8 w-8 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {formatFileSize(uploadedFile.size)} • Uploaded {uploadedFile.uploadDate}
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Upload Progress */}
          {uploadedFile.status === 'uploading' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Uploading...</span>
                <span className="text-gray-600">{uploadedFile.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadedFile.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Resume Analysis */}
          {uploadedFile.status === 'completed' && (
            <div className="space-y-4">
              <div className="flex items-center text-sm text-green-600">
                <CheckCircle size={16} className="mr-2" />
                Resume successfully parsed and analyzed
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Extracted Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {extractedSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeUploadPanel;
