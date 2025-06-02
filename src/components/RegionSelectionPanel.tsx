
import React, { useState } from 'react';
import { ChevronDown, MapPin, Search } from 'lucide-react';

interface Region {
  id: string;
  name: string;
  code: string;
  countries: string[];
}

const regions: Region[] = [
  {
    id: 'north-america',
    name: 'North America',
    code: 'NA',
    countries: ['United States', 'Canada', 'Mexico']
  },
  {
    id: 'europe',
    name: 'Europe',
    code: 'EU',
    countries: ['Germany', 'France', 'United Kingdom', 'Spain', 'Italy']
  },
  {
    id: 'asia-pacific',
    name: 'Asia-Pacific',
    code: 'AP',
    countries: ['Japan', 'Australia', 'Singapore', 'South Korea', 'India']
  },
  {
    id: 'latin-america',
    name: 'Latin America',
    code: 'LA',
    countries: ['Brazil', 'Argentina', 'Chile', 'Colombia', 'Peru']
  },
  {
    id: 'middle-east-africa',
    name: 'Middle East & Africa',
    code: 'MEA',
    countries: ['UAE', 'Saudi Arabia', 'South Africa', 'Nigeria', 'Egypt']
  }
];

const RegionSelectionPanel: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRegions = regions.filter(region =>
    region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    region.countries.some(country => 
      country.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region);
    setIsDropdownOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Target Region</h2>
      <p className="text-sm text-gray-600 mb-4">
        Select your preferred region for job opportunities
      </p>

      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <MapPin size={20} className="text-gray-400" />
            <span className="text-gray-900">
              {selectedRegion ? selectedRegion.name : 'Select a region...'}
            </span>
          </div>
          <ChevronDown 
            size={20} 
            className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="p-3 border-b border-gray-200">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search regions or countries..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="max-h-64 overflow-y-auto">
              {filteredRegions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => handleRegionSelect(region)}
                  className="w-full text-left p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{region.name}</p>
                      <p className="text-sm text-gray-500">
                        {region.countries.slice(0, 3).join(', ')}
                        {region.countries.length > 3 && ` +${region.countries.length - 3} more`}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded">
                      {region.code}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedRegion && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin size={16} className="text-blue-600" />
            <span className="font-medium text-blue-900">{selectedRegion.name}</span>
          </div>
          <p className="text-sm text-blue-700">
            Targeting opportunities in: {selectedRegion.countries.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};

export default RegionSelectionPanel;
