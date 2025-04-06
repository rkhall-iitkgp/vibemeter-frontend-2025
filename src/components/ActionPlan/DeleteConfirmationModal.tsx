import { Button } from "../ui/button";
import { X } from "lucide-react";

interface DeleteConfirmationModalProps {
  isOpen: boolean; // Add isOpen prop
  onClose: () => void;
  onConfirm: () => void;
  title: string; // Changed from actionTitle to title to match parent component
  isSubmitting?: boolean; // Optional, renamed from isDeleting to match parent component
}

export default function DeleteConfirmationModal({
  isOpen, // Add isOpen prop
  onClose,
  onConfirm,
  title, // Changed from actionTitle to title
  isSubmitting = false, // Default value, renamed from isDeleting
}: DeleteConfirmationModalProps) {
  // If the modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Confirm Deletion
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
            disabled={isSubmitting}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="mb-6 text-gray-700">
            Are you sure you want to delete{" "}
            <span className="font-semibold">"{title}"</span>? This action
            cannot be undone.
          </p>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-gray-800 hover:bg-gray-200"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={onConfirm}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}