
import React, { useState } from 'react';
import { Search, MapPin, Star } from 'lucide-react';

interface Country {
  code: string;
  name: string;
  flag: string;
  region: string;
}

const countries: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', region: 'North America' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', region: 'North America' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', region: 'Europe' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', region: 'Europe' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', region: 'Oceania' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', region: 'Asia' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', region: 'Asia' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', region: 'Europe' },
];

const favoriteCountries = ['US', 'CA', 'GB', 'DE'];

const CountrySelectionPanel: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const favorites = countries.filter(country => favoriteCountries.includes(country.code));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Country Selection</h2>
      
      {/* Selected Country Display */}
      {selectedCountry && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{selectedCountry.flag}</span>
            <div>
              <p className="font-medium text-gray-900">{selectedCountry.name}</p>
              <p className="text-sm text-gray-600 flex items-center">
                <MapPin size={14} className="mr-1" />
                {selectedCountry.region}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Favorites */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Star size={14} className="mr-1 text-yellow-500" />
          Favorite Countries
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {favorites.map((country) => (
            <button
              key={country.code}
              onClick={() => setSelectedCountry(country)}
              className="flex items-center space-x-2 p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg">{country.flag}</span>
              <span className="text-sm font-medium text-gray-700">{country.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search and Select */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search Countries
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for a country..."
          />
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-lg border border-gray-200 overflow-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => {
                    setSelectedCountry(country);
                    setShowDropdown(false);
                    setSearchTerm('');
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="text-xl">{country.flag}</span>
                  <div>
                    <p className="font-medium text-gray-900">{country.name}</p>
                    <p className="text-sm text-gray-500">{country.region}</p>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-500 text-center">
                No countries found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Close dropdown when clicking outside */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default CountrySelectionPanel;
