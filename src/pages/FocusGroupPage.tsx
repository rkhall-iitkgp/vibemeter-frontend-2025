import { FC, useState, useEffect } from 'react';
import { FocusGroup, Employee } from '../types';
import { mockFocusGroups } from '../data/mockData';
import SearchBar from '../components/SearchBar';
import FilterButton from '../components/FilterButton';
import FocusGroupList from '../components/focus-group/FocusGroupList';
import FocusGroupModal from '../components/focus-group/FocusGroupModal';
import AddParticipantsModal from '../components/AddParticipantsModal';
import ParticipantFilterModal from '../components/ParticipantFilterModal';
import { useParams, Link } from 'react-router-dom';
import { ActionPlansCarousel } from '../components/action-plan-carousel';
import FocusGroupFilterModal from '../components/focus-group/FocusGroupFilterModal';

const FocusGroupPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [focusGroups, setFocusGroups] = useState<FocusGroup[]>(mockFocusGroups);
  const [filteredGroups, setFilteredGroups] = useState<FocusGroup[]>(mockFocusGroups);
  const [selectedGroup, setSelectedGroup] = useState<FocusGroup | null>(null);
  // State to control modal visibility
  const [showCreateModal, setShowCreateModal] = useState(false);
  // State for editing a focus group
  const [editingFocusGroup, setEditingFocusGroup] = useState<FocusGroup | null>(null);
  // State for Add Participants modal
  const [showAddParticipantsModal, setShowAddParticipantsModal] = useState(false);
  // State for filter participants modal
  const [showFilterModal, setShowFilterModal] = useState(false);
  // Active filters for participants
  const [participantFilters, setParticipantFilters] = useState<{
    jobTitles: string[];
    dateAdded: string[];
  }>({
    jobTitles: ['All'],
    dateAdded: ['All']
  });

  const [showFocusGroupFilterModal, setShowFocusGroupFilterModal] = useState(false);
  const [focusGroupFilters, setFocusGroupFilters] = useState<{
    tags: string[];
    createdDate: string[];
  }>({
    tags: ['All'],
    createdDate: ['All']
  });
  
  // Mock participants data
  const [participants, setParticipants] = useState<Employee[]>([
    { name: 'Harsh', id: 'EM134332', title: 'Cool Guy', dateAdded: '01-03-2025' },
    { name: 'Ankan', id: 'EM134332', title: 'Cool Guy', dateAdded: '01-03-2025' },
    { name: 'Ankan', id: 'EM134332', title: 'Cool Guy', dateAdded: '01-03-2025' },
    { name: 'Ankan', id: 'EM134332', title: 'Cool Guy', dateAdded: '01-03-2025' },
    { name: 'Ankan', id: 'EM134332', title: 'Cool Guy', dateAdded: '01-03-2025' },
    { name: 'Ankan', id: 'EM134332', title: 'Cool Guy', dateAdded: '01-03-2025' },
  ]);
  
  // Available employees for adding to the focus group
  const [allEmployees, setAllEmployees] = useState<Employee[]>([
    { name: 'John Doe', id: 'EM100001', title: 'Senior Developer', dateAdded: '01-01-2025' },
    { name: 'Jane Smith', id: 'EM100002', title: 'Product Manager', dateAdded: '02-01-2025' },
    { name: 'Bob Johnson', id: 'EM100003', title: 'UX Designer', dateAdded: '03-01-2025' },
    { name: 'Alice Williams', id: 'EM100004', title: 'Marketing Specialist', dateAdded: '04-01-2025' },
    { name: 'David Brown', id: 'EM100005', title: 'HR Manager', dateAdded: '05-01-2025' },
    { name: 'Sarah Miller', id: 'EM100006', title: 'Finance Analyst', dateAdded: '06-01-2025' },
    { name: 'Michael Davis', id: 'EM100007', title: 'DevOps Engineer', dateAdded: '07-01-2025' },
    { name: 'Emily Wilson', id: 'EM100008', title: 'Content Writer', dateAdded: '08-01-2025' },
    { name: 'James Taylor', id: 'EM100009', title: 'Sales Executive', dateAdded: '09-01-2025' },
    { name: 'Olivia Moore', id: 'EM100010', title: 'Data Scientist', dateAdded: '10-01-2025' },
  ]);
  
  // Track filtered participants
  const [filteredParticipants, setFilteredParticipants] = useState<Employee[]>(participants);
  
  // Track selected participants
  const [selectedParticipants, setSelectedParticipants] = useState<number[]>([]);
  
  useEffect(() => {
    if (id) {
      // First look in the current state for the focus group
      const group = focusGroups.find(group => group.id === id);
      
      // If not found in current state, check mock data as fallback
      if (!group) {
        console.log(`Focus group with id ${id} not found in current state, checking mock data...`);
        const mockGroup = mockFocusGroups.find(group => group.id === id);
        setSelectedGroup(mockGroup || null);
      } else {
        console.log(`Found focus group with id ${id} in current state`, group);
        setSelectedGroup(group);
      }
    } else {
      setSelectedGroup(null);
    }
  }, [id, focusGroups]);
  
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      handleApplyFocusGroupFilters(focusGroupFilters);
      return;
    }
    
    const filtered = focusGroups.filter((group) => {
      const matchesSearch = group.title.toLowerCase().includes(query.toLowerCase());
      
      // Check if tags match filter
      const tagMatches = 
        focusGroupFilters.tags.includes('All') || 
        group.tags.some(tag => focusGroupFilters.tags.includes(tag));

      // Check if created date matches filter
      const dateMatches = 
        focusGroupFilters.createdDate.includes('All') || 
        focusGroupFilters.createdDate.includes(group.createdDate);

      return matchesSearch && tagMatches && dateMatches;
    });
    setFilteredGroups(filtered);
  };
  
  const handleParticipantSearch = (query: string) => {
    if (!query.trim()) {
      applyAllParticipantFilters();
      return;
    }
    
    const query_lower = query.toLowerCase();
    const filtered = participants.filter((participant) => {
      const matchesSearch = 
        participant.name.toLowerCase().includes(query_lower) ||
        participant.id.toLowerCase().includes(query_lower) ||
        participant.title.toLowerCase().includes(query_lower);
      
      return matchesSearch && participantMatchesFilters(participant);
    });
    
    setFilteredParticipants(filtered);
  };
  
  const participantMatchesFilters = (participant: Employee) => {
    // Check if job title matches filter
    const jobTitleMatches = 
      participantFilters.jobTitles.includes('All') || 
      participantFilters.jobTitles.includes(participant.title);
    
    // Check if date added matches filter
    const dateAddedMatches = 
      participantFilters.dateAdded.includes('All') || 
      participantFilters.dateAdded.includes(participant.dateAdded);
    
    return jobTitleMatches && dateAddedMatches;
  };
  
  const applyAllParticipantFilters = () => {
    const filtered = participants.filter(participantMatchesFilters);
    setFilteredParticipants(filtered);
  };
  
  const handleApplyFilters = (filters: { jobTitles: string[]; dateAdded: string[] }) => {
    setParticipantFilters(filters);
    const filtered = participants.filter(participant => {
      // Check if job title matches filter
      const jobTitleMatches = 
        filters.jobTitles.includes('All') || 
        filters.jobTitles.includes(participant.title);
      
      // Check if date added matches filter
      const dateAddedMatches = 
        filters.dateAdded.includes('All') || 
        filters.dateAdded.includes(participant.dateAdded);
      
      return jobTitleMatches && dateAddedMatches;
    });
    setFilteredParticipants(filtered);
  };
  
  const handleFilter = () => {
    setShowFilterModal(true);
  };
  
  const hasActiveFilters = () => {
    return !participantFilters.jobTitles.includes('All') || !participantFilters.dateAdded.includes('All');
  };
  
  const toggleSelectParticipant = (index: number) => {
    if (selectedParticipants.includes(index)) {
      setSelectedParticipants(selectedParticipants.filter(i => i !== index));
    } else {
      setSelectedParticipants([...selectedParticipants, index]);
    }
  };
  
  const removeSelectedParticipants = () => {
    if (selectedParticipants.length === 0) return;
    
    const updatedParticipants = participants.filter((_, index) => 
      !selectedParticipants.includes(index)
    );
    
    setParticipants(updatedParticipants);
    setFilteredParticipants(updatedParticipants);
    setSelectedParticipants([]);
  };
  
  const handleCreateFocusGroup = (newFocusGroup: {
    title: string;
    description: string;
    tags: string[];
    participants: string[];
  }) => {
    // If we're editing an existing focus group
    if (editingFocusGroup) {
      console.log("Updating focus group with data:", newFocusGroup);
      
      const updatedGroup = {
        ...editingFocusGroup,
        title: newFocusGroup.title,
        description: newFocusGroup.description,
        tags: newFocusGroup.tags,
        participantCount: newFocusGroup.participants.length,
      };
      
      // Update the focus group in the list
      const updatedGroups = focusGroups.map(group => 
        group.id === updatedGroup.id ? updatedGroup : group
      );
      
      setFocusGroups(updatedGroups);
      setFilteredGroups(updatedGroups);
      setEditingFocusGroup(null);
      
      console.log("Focus group updated successfully");
    } else {
      console.log("Creating new focus group with data:", newFocusGroup);
      
      // Generate a unique ID for the new focus group
      const newId = `fg-${Date.now()}`;
      
      // Create a new focus group object with the current date
      const focusGroup: FocusGroup = {
        id: newId,
        title: newFocusGroup.title,
        description: newFocusGroup.description,
        tags: newFocusGroup.tags,
        participantCount: newFocusGroup.participants.length,
        createdDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };
      
      // Add the new focus group to the list
      setFocusGroups([focusGroup, ...focusGroups]);
      setFilteredGroups([focusGroup, ...filteredGroups]);
    }
    
    // Close the modal
    setShowCreateModal(false);
  };
  
  const handleDeleteFocusGroup = (id: string) => {
    // Filter out the focus group with the given id
    const updatedGroups = focusGroups.filter(group => group.id !== id);
    setFocusGroups(updatedGroups);
    setFilteredGroups(updatedGroups);
  };
  
  const handleEditFocusGroup = (focusGroup: FocusGroup) => {
    setEditingFocusGroup(focusGroup);
    setShowCreateModal(true);
    console.log("Editing focus group:", focusGroup);
  };
  
  const handleAddNewParticipants = (selectedIds: string[]) => {
    console.log('Adding participants with IDs:', selectedIds);
    
    // Find the selected employees from the allEmployees array
    const newParticipants = allEmployees.filter(emp => selectedIds.includes(emp.id));
    
    // Add the new participants to the existing participants
    const updatedParticipants = [...participants, ...newParticipants];
    setParticipants(updatedParticipants);
    setFilteredParticipants(updatedParticipants);
    
    // Update the participant count in the focus group if one is selected
    if (selectedGroup) {
      const updatedGroup = {
        ...selectedGroup,
        participantCount: updatedParticipants.length
      };
      
      // Update the focus group in the list
      const updatedGroups = focusGroups.map(group => 
        group.id === updatedGroup.id ? updatedGroup : group
      );
      
      setFocusGroups(updatedGroups);
      setFilteredGroups(updatedGroups);
      setSelectedGroup(updatedGroup);
    }
    
    // Close the modal
    setShowAddParticipantsModal(false);
  };

  const handleFocusGroupFilter = () => {
    setShowFocusGroupFilterModal(true);
  };

  const handleApplyFocusGroupFilters = (filters: { tags: string[]; createdDate: string[] }) => {
    setFocusGroupFilters(filters);
    const filtered = focusGroups.filter(group => {
      // Check if tags match filter
      const tagMatches = 
        filters.tags.includes('All') || 
        group.tags.some(tag => filters.tags.includes(tag));

      // Check if created date matches filter
      const dateMatches = 
        filters.createdDate.includes('All') || 
        filters.createdDate.includes(group.createdDate);

      return tagMatches && dateMatches;
    });
    setFilteredGroups(filtered);
  };

  const hasFocusGroupActiveFilters = () => {
    return !focusGroupFilters.tags.includes('All') || !focusGroupFilters.createdDate.includes('All');
  };
  
  // Group details view
  if (id && selectedGroup) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <div className="flex items-center text-sm">
              <Link to="/focus-group" className="text-gray-600 hover:text-gray-900">
                Focus Groups
              </Link>
              <svg className="mx-2 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-blue-600 font-medium">{selectedGroup.title}</span>
            </div>
          </div>
          
          <div className="mt-4">
            {/* Focus Group Details Card */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{selectedGroup.title}</h1>
                  <p className="text-sm text-gray-500 mt-2">Group ID: {selectedGroup.id}</p>
                </div>
                <p className="text-sm text-gray-500">Created on {selectedGroup.createdDate}</p>
              </div>
              
              <div className="mt-6 border-t border-gray-200 pt-6 -mx-6 px-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Description:</h2>
                <p className="text-gray-700">
                  {selectedGroup.description || 'The Workplace Stress & Well-being Group is a focus group formed by employees who share similar challenges regarding stress management and overall well-being at work. This group aims to discuss the common causes of workplace stress, explore potential solutions, and collaborate on strategies to improve mental health, work-life balance, and support structures.'}
                </p>
              </div>
              
              <div className="mt-6 border-t border-gray-200 pt-6 -mx-6 px-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Target Metrics:</h2>
                <div className="flex gap-4">
                  {selectedGroup.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className={`inline-flex items-center rounded-full px-4 py-1 text-sm font-medium ${
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
              
              <div className="mt-6 border-t border-gray-200 pt-6 -mx-6 px-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">No. of Participants:</h2>
                <p className="text-gray-700">{selectedGroup.participantCount}</p>
              </div>
            </div>
            
            {/* Suggested Action Plans Section */}
            <div className="mb-6">
              <ActionPlansCarousel />
            </div>
            
            {/* Participants Section */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">All Participants</h2>
              
              <div className="mb-4 flex justify-between items-center">
                <div className="w-1/2">
                  <SearchBar onSearch={handleParticipantSearch} placeholder="Search Participant" />
                </div>
                <div className="flex items-center space-x-3">
                  <FilterButton 
                    onClick={handleFilter} 
                    isActive={hasActiveFilters()}
                  />
                  <button 
                    className="flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    onClick={removeSelectedParticipants}
                    disabled={selectedParticipants.length === 0}
                  >
                    <svg className="mr-2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Remove Selected
                  </button>
                  <button 
                    className="flex items-center rounded-md bg-[#80C342] px-4 py-2 text-sm font-medium text-white hover:bg-[#72b33b]"
                    onClick={() => setShowAddParticipantsModal(true)}
                  >
                    <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Participant
                  </button>
                </div>
              </div>
              
              {/* Participants Table */}
              <div className="mt-4 overflow-hidden border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="w-12 px-6 py-3">
                        <span className="sr-only">Select</span>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Employee Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Employee ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Job Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Added
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredParticipants.map((participant, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input 
                            type="checkbox" 
                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" 
                            checked={selectedParticipants.includes(index)}
                            onChange={() => toggleSelectParticipant(index)}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {participant.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {participant.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {participant.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {participant.dateAdded}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-gray-400 hover:text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Add Participants Modal */}
          {showAddParticipantsModal && (
            <AddParticipantsModal
              onClose={() => setShowAddParticipantsModal(false)}
              onAdd={handleAddNewParticipants}
              existingParticipants={participants}
              allEmployees={allEmployees}
            />
          )}
          
          {/* Participant Filter Modal */}
          {showFilterModal && (
            <ParticipantFilterModal
              onClose={() => setShowFilterModal(false)}
              onApply={handleApplyFilters}
              participants={participants}
              currentFilters={participantFilters}
            />
          )}
        </div>
      </div>
    );
  }
  
  // List view
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mt-8">
          <div className="flex items-center">
            <div className="mr-2 text-[#80C342]">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h1 className="text-5xl text-gray-900">Focus Groups</h1>
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <div className="relative w-4/5 flex items-center space-x-4" style={{ maxWidth: '800px' }}>
              <SearchBar onSearch={handleSearch} />
              <FilterButton 
                onClick={handleFocusGroupFilter} 
                isActive={hasFocusGroupActiveFilters()}
              />
            </div>
            <div className="flex items-center">
              <button
                className="flex items-center rounded-md bg-[#80C342] px-4 py-2 text-white hover:bg-[#72b33b]"
                onClick={() => {
                  setEditingFocusGroup(null);
                  setShowCreateModal(true);
                }}
              >
                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Focus Group
              </button>
            </div>
          </div>
          
          <FocusGroupList 
            focusGroups={filteredGroups} 
            onDelete={handleDeleteFocusGroup}
            onEdit={handleEditFocusGroup}
          />

          {showFocusGroupFilterModal && (
            <FocusGroupFilterModal
              onClose={() => setShowFocusGroupFilterModal(false)}
              onApply={handleApplyFocusGroupFilters}
              focusGroups={focusGroups}
              currentFilters={focusGroupFilters}
            />
          )}
          
          {/* Create/Edit Focus Group Modal */}
          {showCreateModal && (
            <FocusGroupModal 
              onClose={() => {
                setShowCreateModal(false);
                setEditingFocusGroup(null);
              }}
              onSubmit={handleCreateFocusGroup}
              editingFocusGroup={editingFocusGroup}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FocusGroupPage;