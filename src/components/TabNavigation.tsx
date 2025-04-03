import { FC } from 'react';
import { Link } from 'react-router-dom';

interface TabNavigationProps {
  activeTab: string;
}

const TabNavigation: FC<TabNavigationProps> = ({ activeTab }) => {
    return (
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex">
          <Link
            to="/overall"
            className={`px-4 py-4 text-base font-medium ${
              activeTab === 'overall'
                ? 'border-b-2 border-green-500 text-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Overall
          </Link>
          <Link
          to="/employee"
          className={`px-4 py-4 text-base font-medium ${
            activeTab === 'employee'
              ? 'border-b-2 border-green-500 text-green-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Employee
        </Link>
        <Link
          to="/focus-groups"
          className={`px-4 py-4 text-base font-medium ${
            activeTab === 'focus-group'
              ? 'border-b-2 border-green-500 text-green-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Focus Group
        </Link>
      </nav>
    </div>
  );
};

export default TabNavigation;