import { FacilityLocation } from '../types/accessibility';

export const MOCK_LOCATIONS: FacilityLocation[] = [
  {
id: 'central-hospital',
    name: 'District Community Health Center',
    type: 'Hospital / Healthcare Facility', // <-- Add "Hospital" here
    address: '450 Wellness Way, Suite 100',    facts: [
      {
        id: 'f1',
        category: 'mobility',
        attribute: 'Step-free North Entrance',
        description: 'Automated wide sliding doors with concrete ramp.',
        status: 'facility_reported',
        sourceName: 'Official Clinic Website',
        sourceUrl: 'https://example.com/accessibility',
        lastChecked: 'October 2026',
      },
      {
        id: 'f2',
        category: 'mobility',
        attribute: 'Main Elevators',
        description: 'Two passenger elevators servicing floors 1 through 4.',
        status: 'conflicting',
        sourceName: 'Official Directory vs. Community',
        lastChecked: 'September 2026',
        conflictDetail: 'Community report notes elevator #1 is under repair; expect delays for wheelchair transport.',
      },
      {
        id: 'f3',
        category: 'hearing',
        attribute: 'Reception Hearing Loop',
        description: 'Induction loop installed at Check-in Desk B.',
        status: 'official_source',
        sourceName: 'County Building Inspection',
        lastChecked: 'August 2026',
      },
    ],
  },
  {
    id: 'civic-library',
    name: 'Metropolitan Public Library',
    type: 'Public Civic Building',
    address: '12 Civic Center Plaza',
    facts: [
      {
        id: 'l1',
        category: 'mobility',
        attribute: 'Ramped Street Access',
        description: 'Ramp slope 1:12 on east wing entrance.',
        status: 'facility_reported',
        sourceName: 'City Parks & Public Works',
        lastChecked: 'September 2026',
      },
      {
        id: 'l2',
        category: 'sensory',
        attribute: 'Low-Stimulation Study Zone',
        description: 'Room 204 features adjustable lighting and low background noise.',
        status: 'community_reported',
        sourceName: 'Visitor Submission',
        lastChecked: 'October 2026',
      },
      {
        id: 'l3',
        category: 'communication',
        attribute: 'ASL Interpretation Available',
        description: 'Requires 48-hour advance notice via email.',
        status: 'official_source',
        sourceName: 'Library Policy Manual',
        lastChecked: 'July 2026',
      },
    ],
  }
];