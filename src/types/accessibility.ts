export type VerificationStatus =
  | 'facility_reported'
  | 'official_source'
  | 'community_reported'
  | 'ai_extracted'
  | 'conflicting'
  | 'unknown';

export type AccessibilityCategory =
  | 'mobility'
  | 'vision'
  | 'hearing'
  | 'sensory'
  | 'communication';

export interface AccessibilityFact {
  id: string;
  category: AccessibilityCategory;
  attribute: string; 
  description: string; 
  status: VerificationStatus;
  sourceName: string; 
  sourceUrl?: string;
  lastChecked: string; 
  conflictDetail?: string; 
}

export interface FacilityLocation {
  id: string;
  name: string;
  type: string; 
  address: string;
  facts: AccessibilityFact[];
}