import FocusGroupFilterModal from "../components/focus-group/FocusGroupFilterModal";
import FocusGroupModal from "../components/focus-group/FocusGroupModal";
import FocusGroupList from "../components/focus-group/FocusGroupList";
import FilterButton from "@/components/FilterButton";
import FocusGroupDetails from "./FocusGroupDetails";
import { mockFocusGroups } from "../data/mockData";
import SearchBar from "../components/SearchBar";
import { FC, useState, useEffect } from "react";
import { useParams } from "react-router";
import { FocusGroup } from "../types";
import { Plus } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const FocusGroupPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [focusGroups, setFocusGroups] = useState<FocusGroup[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<FocusGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<FocusGroup | null>(null);
  // State to control modal visibility
  const [showCreateModal, setShowCreateModal] = useState(false);
  // State for editing a focus group
  const [editingFocusGroup, setEditingFocusGroup] = useState<FocusGroup | null>(
    null
  );

  const [showFocusGroupFilterModal, setShowFocusGroupFilterModal] =
    useState(false);
  const [focusGroupFilters, setFocusGroupFilters] = useState<{
    metrics: string[];
    created_at: string[];
  }>({
    metrics: ["All"],
    created_at: ["All"],
  });

  useEffect(() => {
    // console.log(BACKEND_URL);
    fetch(`${BACKEND_URL}/api/groups`)
      .then((res) => res.json())
      .then((data) => {
        setFocusGroups(data.data);
        setFilteredGroups(data.data);
      });
  }, []);

  useEffect(() => {
    if (id) {
      // First look in the current state for the focus group
      const group = focusGroups.find((group) => group.focus_group_id === id);

      // If not found in current state, check mock data as fallback
      if (!group) {
        console.log(
          `Focus group with id ${id} not found in current state, checking mock data...`
        );
        const mockGroup = mockFocusGroups.find(
          (group) => group.focus_group_id === id
        );
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
      const matchesSearch = group.name
        .toLowerCase()
        .includes(query.toLowerCase());

      // Check if tags match filter
      const tagMatches =
        focusGroupFilters.metrics.includes("All") ||
        group.metrics.some((metric) =>
          focusGroupFilters.metrics.includes(metric)
        );

      // Check if created date matches filter
      const dateMatches =
        focusGroupFilters.created_at.includes("All") ||
        focusGroupFilters.created_at.includes(group.created_at);

      return matchesSearch && tagMatches && dateMatches;
    });
    setFilteredGroups(filtered);
  };

  const handleCreateFocusGroup = (newFocusGroup: {
    title: string;
    description: string;
    metrics: string[];
    participants: string[];
  }) => {
    // If we're editing an existing focus group
    if (editingFocusGroup) {
      console.log("Updating focus group with data:", newFocusGroup);

      const updatedGroup = {
        ...editingFocusGroup,
        title: newFocusGroup.title,
        description: newFocusGroup.description,
        tags: newFocusGroup.metrics,
        participantCount: newFocusGroup.participants.length,
      };

      // Update the focus group in the list
      const updatedGroups = focusGroups.map((group) =>
        group.focus_group_id === updatedGroup.focus_group_id
          ? updatedGroup
          : group
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
        focus_group_id: newId,
        name: newFocusGroup.title,
        description: newFocusGroup.description,
        metrics: newFocusGroup.metrics,
        members: newFocusGroup.participants.length,
        created_at: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
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
    const updatedGroups = focusGroups.filter(
      (group) => group.focus_group_id !== id
    );
    setFocusGroups(updatedGroups);
    setFilteredGroups(updatedGroups);
  };

  const handleEditFocusGroup = (focusGroup: FocusGroup) => {
    setEditingFocusGroup(focusGroup);
    setShowCreateModal(true);
    console.log("Editing focus group:", focusGroup);
  };

  const handleFocusGroupFilter = () => {
    setShowFocusGroupFilterModal(true);
  };

  const handleApplyFocusGroupFilters = (filters: {
    metrics: string[];
    created_at: string[];
  }) => {
    setFocusGroupFilters(filters);
    const filtered = focusGroups.filter((group) => {
      // Check if tags match filter
      const tagMatches =
        filters.metrics.includes("All") ||
        group.metrics.some((metric) => filters.metrics.includes(metric));

      // Check if created date matches filter
      const dateMatches =
        filters.created_at.includes("All") ||
        filters.created_at.includes(group.created_at);

      return tagMatches && dateMatches;
    });
    setFilteredGroups(filtered);
  };

  const hasFocusGroupActiveFilters = () => {
    return (
      !focusGroupFilters.metrics.includes("All") ||
      !focusGroupFilters.created_at.includes("All")
    );
  };

  if (id && selectedGroup) {
    return (
      <FocusGroupDetails
        selectedGroup={selectedGroup}
        focusGroups={focusGroups}
        setFocusGroups={setFocusGroups}
        setFilteredGroups={setFilteredGroups}
        setSelectedGroup={setSelectedGroup}
      />
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      {/* Header - consistent padding with main content */}
      <header className="bg-gray-100 z-10 p-6 pt-8">
        <div className="flex items-center gap-3">
          <span className="text-[#80C342]">
            <img src="/icons/Focus-grops.svg" className="w-[40px] h-[40px]" />
          </span>
          <h1 className="text-4xl font-semibold text-gray-800">Focus Groups</h1>
        </div>
      </header>

      {/* Dashboard content - consistent padding with smaller gaps */}
      <main className="p-6 pt-2">
        {/* Search, Filter, and Create button in same line */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center">
            <div className="relative w-128 mr-3">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search Focus groups"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>
            <FilterButton
              onClick={handleFocusGroupFilter}
              isActive={hasFocusGroupActiveFilters()}
            />
          </div>
          <button
            type="button"
            className="bg-[#80C342] text-white px-4 py-2 rounded-md flex items-center text-sm whitespace-nowrap hover:cursor-pointer"
            onClick={() => {
              setEditingFocusGroup(null);
              setShowCreateModal(true);
            }}
          >
            <Plus size={18} className="mr-2" />
            Add Focus Group
          </button>
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
      </main>
    </div>
  );
};

export default FocusGroupPage;
