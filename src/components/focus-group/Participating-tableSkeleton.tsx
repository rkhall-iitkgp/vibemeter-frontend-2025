import React from "react";

interface ParticipantsTableSkeletonProps {
  rowCount?: number;
}

const ParticipantsTableSkeleton: React.FC<ParticipantsTableSkeletonProps> = ({ rowCount = 5 }) => {
  return (
    <div className="mt-4 overflow-hidden border border-gray-200 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>

            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Employee Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Employee ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Job Title
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Date Added
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array(rowCount)
            .fill(0)
            .map((_, index) => (
              <tr key={index}>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="text-gray-600 hover:text-gray-700 focus:outline-none">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParticipantsTableSkeleton