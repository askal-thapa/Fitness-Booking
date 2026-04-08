export const SPECIALTIES = [
  { value: 'Weight Loss', label: 'Weight Loss', icon: '🔥' },
  { value: 'Muscle Building', label: 'Muscle Building', icon: '💪' },
  { value: 'Endurance', label: 'Endurance', icon: '🏃' },
  { value: 'Flexibility', label: 'Flexibility', icon: '🧘' },
  { value: 'Consultant', label: 'Consultant', icon: '📋' },
  { value: 'Diet Planner', label: 'Diet Planner', icon: '🥗' },
] as const;

export const TRAINING_FOCUS = [
  { value: 'Weight Loss', label: 'Weight Loss', icon: '🔥' },
  { value: 'Muscle Building', label: 'Muscle Building', icon: '💪' },
  { value: 'Endurance', label: 'Endurance', icon: '🏃' },
  { value: 'Flexibility', label: 'Flexibility', icon: '🧘' },
  { value: 'Consultant', label: 'Consultant', icon: '📋' },
  { value: 'Diet Planner', label: 'Diet Planner', icon: '🥗' },
] as const;

export type SpecialtyValue = typeof SPECIALTIES[number]['value'];
export type TrainingFocusValue = typeof TRAINING_FOCUS[number]['value'];
