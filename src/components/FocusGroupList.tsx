import { FC } from 'react';
import { FocusGroup } from '../types';
import FocusGroupCard from './FocusGroupCard';

interface FocusGroupListProps {
  focusGroups: FocusGroup[];
}

const FocusGroupList: FC<FocusGroupListProps> = ({ focusGroups }) => {
  return (
    <div className="mt-6">
      {focusGroups.map((group) => (
        <FocusGroupCard key={group.id} focusGroup={group} />
      ))}
    </div>
  );
};

export default FocusGroupList; 