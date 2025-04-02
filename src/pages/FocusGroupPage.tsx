import { FC, useState, useEffect } from 'react';
import { FocusGroup } from '../types';
import { mockFocusGroups } from '../data/mockData';
import TabNavigation from '../components/TabNavigation';
import SearchBar from '../components/SearchBar';
import FilterButton from '../components/FilterButton';
import FocusGroupList from '../components/FocusGroupList';
import { useParams, Link } from 'react-router-dom';

const FocusGroupPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [focusGroups, setFocusGroups] = useState<FocusGroup[]>(mockFocusGroups);
  const [filteredGroups, setFilteredGroups] = useState<FocusGroup[]>(mockFocusGroups);
  const [selectedGroup, setSelectedGroup] = useState<FocusGroup | null>(null);
  
  useEffect(() => {
    if (id) {
      const group = mockFocusGroups.find(group => group.id === id);
      setSelectedGroup(group || null);
    } else {
      setSelectedGroup(null);
    }
  }, [id]);
  
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredGroups(focusGroups);
      return;
    }
    
    const filtered = focusGroups.filter((group) =>
      group.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredGroups(filtered);
  };
  
  const handleFilter = () => {
    // Implement filter functionality here
    console.log('Filter button clicked');
  };
  
  // Group details view
  if (id && selectedGroup) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <TabNavigation activeTab="focus-group" />
          
          <div className="mt-8">
            <div className="mb-4">
              <Link to="/focus-group" className="text-green-600 hover:text-green-700">
                ← Back to Focus Groups
              </Link>
            </div>
            
            <div className="rounded-lg border border-gray-200 bg-white p-8">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{selectedGroup.title}</h1>
                  <p className="mt-1 text-gray-500">ID: {selectedGroup.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">Participants</p>
                  <p className="text-sm text-gray-700">{selectedGroup.participantCount} Members</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-500">Created on {selectedGroup.createdDate}</p>
                <div className="mt-2 flex space-x-2">
                  {selectedGroup.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        {
                          'Morality': 'bg-amber-100 text-amber-800',
                          'Engagement': 'bg-teal-100 text-teal-800',
                          'Cultural Score': 'bg-pink-100 text-pink-800',
                          'Leave Impact': 'bg-green-100 text-green-800'
                        }[tag] || 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="mb-2 text-xl font-semibold text-gray-900">Description</h2>
                <p className="text-gray-700">{selectedGroup.description}</p>
              </div>
              
              <div>
                <h2 className="mb-4 text-xl font-semibold text-gray-900">Analytics Data</h2>
                <p className="text-gray-600">Detailed analytics for this focus group will be shown here.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // List view
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <TabNavigation activeTab="focus-group" />
        
        <div className="mt-8">
          <h1 className="text-3xl font-bold text-gray-900">Focus Groups</h1>
          <p className="mt-2 text-gray-600">
            Select the Focus Group to see its analytics report
          </p>
          
          <div className="mt-6 flex space-x-4">
            <div className="w-full max-w-md">
              <SearchBar onSearch={handleSearch} />
            </div>
            <FilterButton onClick={handleFilter} />
          </div>
          
          <FocusGroupList focusGroups={filteredGroups} />
        </div>
      </div>
    </div>
  );
};

export default FocusGroupPage;