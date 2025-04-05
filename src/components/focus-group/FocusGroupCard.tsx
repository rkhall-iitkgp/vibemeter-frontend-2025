import { useNavigate } from "react-router";
import { FocusGroup } from "../../types";
import { FC, useState } from "react";

interface FocusGroupCardProps {
  focusGroup: FocusGroup;
  onDelete?: (id: string) => void;
  onEdit?: (focusGroup: FocusGroup) => void;
}

const TagColors: Record<string, string> = {
  Morality: "bg-amber-100 text-amber-800",
  Engagement: "bg-teal-100 text-teal-800",
  "Cultural Score": "bg-pink-100 text-pink-800",
  "Leave Impact": "bg-green-100 text-green-800",
};

const FocusGroupCard: FC<FocusGroupCardProps> = ({
  focusGroup,
  onDelete,
  onEdit,
}) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleClick = () => {
    navigate(`/focus-groups/${focusGroup.focus_group_id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(focusGroup.focus_group_id);
    }
    setShowDeleteModal(false);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    if (onEdit) {
      onEdit(focusGroup);
    }
  };

  return (
    <>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Modal Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 transition-opacity"
            onClick={handleCancelDelete}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 z-50">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Confirm Deletion
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete the focus group "
                {focusGroup.name}"? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleCancelDelete}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Focus Group Card */}
      <div
        className="mb-4 rounded-lg border border-gray-200 bg-white p-6 cursor-pointer hover:shadow-md transition-shadow relative"
        onClick={handleClick}
      >
        {/* Edit and Delete buttons in top right */}
        <div className="absolute top-4 right-4 flex space-x-2 z-10">
          <button
            className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
            onClick={handleEdit}
            aria-label="Edit focus group"
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button
            className="p-1.5 rounded-full bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600"
            onClick={handleDeleteClick}
            aria-label="Delete focus group"
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center">
            <h3 className="text-xl font-semibold text-gray-900">
              {focusGroup.name}
            </h3>
            <span className="ml-2 text-sm font-medium text-green-500">
              {focusGroup.members} Members
            </span>
          </div>
          <div className="flex gap-4">
            <p className="mt-2 text-sm text-gray-500">
              Created on{" "}
              {new Date(focusGroup.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              })}
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              {focusGroup.metrics.map((metric, index) => (
                <span
                  key={index}
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${TagColors[metric] || "bg-gray-100 text-gray-800"}`}
                >
                  {metric}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-3 text-sm text-gray-700">{focusGroup.description}</p>
        </div>
      </div>
    </>
  );
};

export default FocusGroupCard;
