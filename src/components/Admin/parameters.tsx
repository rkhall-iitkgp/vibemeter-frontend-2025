import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Save } from "lucide-react";
import { useState } from "react";

// Types for our parameters
interface Parameter {
  id: string;
  name: string;
  value: number;
}

// Dummy data
const initialParameters: Parameter[] = [
  { id: "1", name: "Parameter 1", value: 0.8 },
  { id: "2", name: "Parameter 1", value: 0.8 },
  { id: "3", name: "Parameter 1", value: 0.8 },
  { id: "4", name: "Parameter 1", value: 0.8 },
  { id: "5", name: "Parameter 1", value: 0.8 },
];

export default function Parameter() {
  const [parameters, setParameters] = useState<Parameter[]>(initialParameters);
  const [isEditing, setIsEditing] = useState(false);
  const [editedValues, setEditedValues] = useState<Record<string, number>>({});

  // Toggle edit mode
  const toggleEditMode = () => {
    if (isEditing) {
      // Apply changes when saving
      const updatedParameters = parameters.map((param) => ({
        ...param,
        value:
          editedValues[param.id] !== undefined
            ? editedValues[param.id]
            : param.value,
      }));
      setParameters(updatedParameters);
      setEditedValues({});
    }
    setIsEditing(!isEditing);
  };

  // Handle parameter value change
  const handleValueChange = (id: string, value: string) => {
    const numValue = Number.parseFloat(value);
    if (!isNaN(numValue)) {
      setEditedValues((prev) => ({
        ...prev,
        [id]: numValue,
      }));
    }
  };

  return (
    <div className="w-full mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Parameters</h2>
          <p className="text-sm text-gray-500">
            View or Edit your current parameters
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleEditMode}
          className="text-[#80C342] hover:text-[#80C342] hover:bg-green-50"
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {parameters.map((parameter) => (
          <ParameterCard
            key={parameter.id}
            parameter={parameter}
            isEditing={isEditing}
            editedValue={editedValues[parameter.id]}
            onValueChange={(value) => handleValueChange(parameter.id, value)}
          />
        ))}
      </div>
    </div>
  );
}

interface ParameterCardProps {
  parameter: Parameter;
  isEditing: boolean;
  editedValue?: number;
  onValueChange: (value: string) => void;
}

function ParameterCard({
  parameter,
  isEditing,
  editedValue,
  onValueChange,
}: ParameterCardProps) {
  const displayValue =
    editedValue !== undefined ? editedValue : parameter.value;

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4">
        <Label
          htmlFor={`parameter-${parameter.id}`}
          className="block text-sm font-medium text-[#80C342] mb-1"
        >
          {parameter.name}
        </Label>
        {isEditing ? (
          <Input
            id={`parameter-${parameter.id}`}
            type="number"
            value={displayValue}
            onChange={(e) => onValueChange(e.target.value)}
            step="0.1"
            min="0"
            max="1"
            className="text-2xl font-semibold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        ) : (
          <div className="text-2xl font-semibold text-gray-900">
            {displayValue}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
