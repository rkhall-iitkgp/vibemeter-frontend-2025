import { useState, useEffect } from "react";
import { X, Info, Plus, ArrowRight, Save } from "lucide-react";
import { Button } from "../ui/button";
import { ActionPlan, FocusGroup } from "@/types";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { MultiSelect } from "../ui/multi-select";

// Step components
enum FormStep {
  BasicInfo = 0,
  TargetGroups = 1,
  MetricsAndSteps = 2,
}

interface Step {
  title: string;
  description: string;
}

interface ActionPlanFormValues {
  title: string;
  purpose: string;
  is_completed: boolean;
  target_groups: { focus_group_id: string }[];
  metric: string[];
  steps: Step[];
}

interface MultiStepActionPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ActionPlanFormValues) => Promise<void>;
  plan?: ActionPlan;
  focusGroups?: FocusGroup[];
  metrics?: string[];
  isSubmitting: boolean;
}

const MultiStepActionPlanModal = ({
  isOpen,
  onClose,
  onSubmit,
  plan,
  focusGroups = [],
  metrics = [],
  isSubmitting,
}: MultiStepActionPlanModalProps) => {
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.BasicInfo);
  const [newStep, setNewStep] = useState<Step>({ title: "", description: "" });
  const [newGroupInput, setNewGroupInput] = useState("");

  const [formValues, setFormValues] = useState<ActionPlanFormValues>({
    title: "",
    purpose: "",
    is_completed: false,
    target_groups: [],
    metric: [],
    steps: [],
  });
  
  // For the UI components
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  // Determine if we're editing or creating new
  const isEditing = !!plan;
  const modalTitle = isEditing ? "Edit Initiative" : "Create Initiative";
  const modalSubtitle = "Design your next big impact";

  // Extract focus_group_ids from target_groups
  const extractFocusGroupIds = (targetGroups: any[]): string[] => {
    return targetGroups.map(group => {
      if (typeof group === 'string') return group;
      if (typeof group === 'object') {
        return group.focus_group_id || '';
      }
      return '';
    }).filter(id => id !== '');
  };

  // Reset form when modal opens or plan changes
  useEffect(() => {
    if (isOpen && plan) {
      // If editing, populate with existing data
      const targetGroups = Array.isArray(plan.target_groups) ? plan.target_groups : [];
      
      // Extract IDs for the UI
      const groupIds = extractFocusGroupIds(targetGroups);
      setSelectedGroupIds(groupIds);
      
      // Extract group names for display
      const groupNames = targetGroups.map(group => 
        typeof group === 'object' && group.name ? group.name : ''
      ).filter(name => name !== '');
      setSelectedGroups(groupNames);
      
      // Set form values
      setFormValues({
        title: plan.title || "",
        purpose: plan.purpose || "",
        is_completed: plan.is_completed || false,
        target_groups: groupIds.map(id => ({ focus_group_id: id })),
        metric: plan.metric || [],
        steps: plan.steps || [],
      });
    } else if (isOpen) {
      // If creating new, reset form
      setFormValues({
        title: "",
        purpose: "",
        is_completed: false,
        target_groups: [],
        metric: [],
        steps: [],
      });
      setSelectedGroupIds([]);
      setSelectedGroups([]);
      setCurrentStep(FormStep.BasicInfo);
    }
  }, [isOpen, plan]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleAddStep = () => {
    if (newStep.title && newStep.description) {
      setFormValues(prev => ({
        ...prev,
        steps: [...prev.steps, newStep]
      }));
      setNewStep({ title: "", description: "" });
    }
  };

  const handleRemoveStep = (index: number) => {
    setFormValues(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }));
  };

  const handleAddGroup = () => {
    if (newGroupInput) {
      // Find if the input matches any existing focus group
      const matchedGroup = focusGroups.find(
        group => group.name.toLowerCase() === newGroupInput.toLowerCase()
      );
      
      if (matchedGroup) {
        // If matched, add it to selected groups if not already there
        if (!selectedGroupIds.includes(matchedGroup.focus_group_id)) {
          setSelectedGroupIds(prev => [...prev, matchedGroup.focus_group_id]);
          setSelectedGroups(prev => [...prev, matchedGroup.name]);
          setFormValues(prev => ({
            ...prev,
            target_groups: [...prev.target_groups, { focus_group_id: matchedGroup.focus_group_id }]
          }));
        }
      }
      // Reset input field
      setNewGroupInput("");
    }
  };

  const handleRemoveGroup = (groupName: string) => {
    // Find the group to remove
    const indexToRemove = selectedGroups.indexOf(groupName);
    if (indexToRemove !== -1) {
      // Get the ID to remove
      const idToRemove = selectedGroupIds[indexToRemove];
      
      // Update selected groups
      setSelectedGroups(prev => prev.filter((_, i) => i !== indexToRemove));
      setSelectedGroupIds(prev => prev.filter((_, i) => i !== indexToRemove));
      
      // Update form values
      setFormValues(prev => ({
        ...prev,
        target_groups: prev.target_groups.filter(group => group.focus_group_id !== idToRemove)
      }));
    }
  };

  const handleMetricChange = (metric: string) => {
    // Toggle metric selection
    setFormValues(prev => {
      if (prev.metric.includes(metric)) {
        return {
          ...prev,
          metric: prev.metric.filter(m => m !== metric)
        };
      } else {
        return {
          ...prev,
          metric: [...prev.metric, metric]
        };
      }
    });
  };

  const handleContinue = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    await onSubmit(formValues);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddGroup();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <div className="text-purple-600">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <path d="M12 2v6m0 8v6M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24M2 12h6m8 0h6M4.93 19.07l4.24-4.24m5.66-5.66l4.24-4.24" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{modalTitle}</h2>
              <p className="text-sm text-gray-500">{modalSubtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
            disabled={isSubmitting}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation tabs */}
        <div className="flex border-b">
          <button 
            className={`flex items-center gap-2 px-6 py-3 ${currentStep === FormStep.BasicInfo ? 'border-b-2 border-[#86BC25] text-[#86BC25]' : 'text-gray-500'}`}
            onClick={() => setCurrentStep(FormStep.BasicInfo)}
          >
            <span className="w-5 h-5 rounded-full border flex items-center justify-center">
              1
            </span>
            <span>Basic Info</span>
          </button>
          <button 
            className={`flex items-center gap-2 px-6 py-3 ${currentStep === FormStep.TargetGroups ? 'border-b-2 border-[#86BC25] text-[#86BC25]' : 'text-gray-500'}`}
            onClick={() => setCurrentStep(FormStep.TargetGroups)}
          >
            <span className="w-5 h-5 rounded-full border flex items-center justify-center">
              2
            </span>
            <span>Target Groups</span>
          </button>
          <button 
            className={`flex items-center gap-2 px-6 py-3 ${currentStep === FormStep.MetricsAndSteps ? 'border-b-2 border-[#86BC25] text-[#86BC25]' : 'text-gray-500'}`}
            onClick={() => setCurrentStep(FormStep.MetricsAndSteps)}
          >
            <span className="w-5 h-5 rounded-full border flex items-center justify-center">
              3
            </span>
            <span>Metrics & Steps</span>
          </button>
        </div>

        <div className="p-6 max-h-[calc(100vh-240px)] overflow-y-auto">
          {/* Basic Info Step */}
          {currentStep === FormStep.BasicInfo && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <span className="bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center mr-2">1</span>
                  Title
                </label>
                <Input
                  name="title"
                  value={formValues.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter a catchy initiative title"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <span className="bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center mr-2">2</span>
                  Purpose
                </label>
                <Textarea
                  name="purpose"
                  value={formValues.purpose}
                  onChange={handleInputChange}
                  required
                  placeholder="What impact will this initiative create? Be specific and inspiring."
                  className="w-full min-h-[120px]"
                />
              </div>
            </div>
          )}

          {/* Target Groups Step */}
          {currentStep === FormStep.TargetGroups && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <span className="bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center mr-2">3</span>
                  Target Groups
                </label>
                
                <div className="border rounded-md p-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedGroups.map((group, index) => (
                      <div key={index} className="bg-purple-100 rounded-full px-3 py-1 flex items-center gap-1">
                        <span className="text-sm text-purple-800">{group}</span>
                        <button 
                          onClick={() => handleRemoveGroup(group)}
                          className="text-purple-800 hover:text-purple-900"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex">
                    <Input
                      value={newGroupInput}
                      onChange={(e) => setNewGroupInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Add target group and press Enter"
                      className="w-full rounded-r-none"
                      list="focus-group-options"
                    />
                    <datalist id="focus-group-options">
                      {focusGroups.map((group) => (
                        <option key={group.focus_group_id} value={group.name} />
                      ))}
                    </datalist>
                    <Button 
                      onClick={handleAddGroup}
                      type="button" 
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-l-none"
                    >
                      <Plus size={18} />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
                <div className="flex items-start gap-3">
                  <Info size={20} className="text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-700 mb-1">Pro Tip</h4>
                    <p className="text-sm text-blue-600">
                      Target specific groups for better engagement. Consider demographics, roles, or
                      departments that will benefit most from this initiative.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Metrics & Steps Step */}
          {currentStep === FormStep.MetricsAndSteps && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <span className="bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center mr-2">4</span>
                  Metric
                </label>
                
                <div className="border rounded-md p-2">
                  {metrics.map((metric) => (
                    <button
                      key={metric}
                      type="button"
                      onClick={() => handleMetricChange(metric)}
                      className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-gray-50 ${
                        formValues.metric.includes(metric) ? 'bg-gray-50' : ''
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full ${
                        formValues.metric.includes(metric) 
                          ? 'bg-[#86BC25]' 
                          : 'border border-gray-300'
                      }`} />
                      <span>{metric}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <span className="bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center mr-2">5</span>
                  Steps
                </label>
                
                <Textarea
                  value={newStep.description}
                  onChange={(e) => setNewStep({...newStep, description: e.target.value})}
                  placeholder="Outline the key steps required for this initiative. Be clear and actionable."
                  className="w-full min-h-[100px]"
                />
                
                {formValues.steps.length > 0 && (
                  <div className="border rounded-md mt-4 mb-2">
                    {formValues.steps.map((step, index) => (
                      <div key={index} className="border-b last:border-b-0 p-3">
                        <div className="flex justify-between">
                          <h4 className="font-medium">Step {index + 1}</h4>
                          <button
                            type="button"
                            onClick={() => handleRemoveStep(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                <Button
                  type="button"
                  onClick={() => {
                    if (newStep.description) {
                      setFormValues(prev => ({
                        ...prev,
                        steps: [...prev.steps, { 
                          title: `Step ${formValues.steps.length + 1}`,
                          description: newStep.description 
                        }]
                      }));
                      setNewStep({ title: "", description: "" });
                    }
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 mt-2"
                >
                  Add Step
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer with progress indicator and buttons */}
        <div className="flex justify-between items-center p-6 border-t">
          <div className="flex gap-1">
            <div className={`w-6 h-2 rounded-full ${currentStep >= 0 ? 'bg-[#86BC25]' : 'bg-gray-200'}`}></div>
            <div className={`w-6 h-2 rounded-full ${currentStep >= 1 ? 'bg-[#86BC25]' : 'bg-gray-200'}`}></div>
            <div className={`w-6 h-2 rounded-full ${currentStep >= 2 ? 'bg-[#86BC25]' : 'bg-gray-200'}`}></div>
          </div>
          
          <div className="flex gap-3">
            {currentStep > 0 && (
              <Button
                type="button"
                onClick={handleBack}
                className="bg-white border hover:bg-gray-50 text-gray-700"
                disabled={isSubmitting}
              >
                Back
              </Button>
            )}
            
            {currentStep < FormStep.MetricsAndSteps && (
              <Button
                type="button"
                onClick={handleContinue}
                className="bg-[#86BC25] hover:bg-[#75a621] text-white"
                disabled={
                  (currentStep === FormStep.BasicInfo && (!formValues.title || !formValues.purpose)) ||
                  (currentStep === FormStep.TargetGroups && formValues.target_groups.length === 0)
                }
              >
                Continue <ArrowRight size={16} className="ml-1" />
              </Button>
            )}
            
            {currentStep === FormStep.MetricsAndSteps && (
              <>
                <Button
                  type="button"
                  onClick={() => {
                    // Save draft functionality
                    handleSubmit();
                  }}
                  className="bg-white border hover:bg-gray-50 text-gray-700"
                  disabled={isSubmitting}
                >
                  <Save size={16} className="mr-1" /> Save Draft
                </Button>
                
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-[#86BC25] hover:bg-[#75a621] text-white"
                  disabled={
                    isSubmitting || 
                    !formValues.title || 
                    !formValues.purpose ||
                    formValues.target_groups.length === 0 ||
                    formValues.metric.length === 0
                  }
                >
                  {isSubmitting ? "Saving..." : "Apply Initiative"} <ArrowRight size={16} className="ml-1" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepActionPlanModal;