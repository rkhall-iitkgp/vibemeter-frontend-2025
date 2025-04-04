import { X } from "lucide-react";
import { Button } from "../ui/button";

interface DeleteConfirmationModalProps {
  onClose: () => void;
  onConfirm: () => void;
  actionTitle: string;
  isDeleting: boolean;
}

export default function DeleteConfirmationModal({
  onClose,
  onConfirm,
  actionTitle,
  isDeleting
}: DeleteConfirmationModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Confirm Deletion</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
            disabled={isDeleting}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="mb-6 text-gray-700">
            Are you sure you want to delete <span className="font-semibold">"{actionTitle}"</span>? 
            This action cannot be undone.
          </p>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-gray-800 hover:bg-gray-200"
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={onConfirm}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}