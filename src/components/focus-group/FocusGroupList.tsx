import FocusGroupCard from "./FocusGroupCard";
import { FocusGroup } from "../../types";
import { FC } from "react";

interface FocusGroupListProps {
  focusGroups: FocusGroup[];
  onDelete: (id: string) => void;
  onEdit: (focusGroup: FocusGroup) => void;
}

const FocusGroupList: FC<FocusGroupListProps> = ({
  focusGroups,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="mt-6">
      {focusGroups.map((group) => (
        <FocusGroupCard
          key={group.id}
          focusGroup={group}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default FocusGroupList;
