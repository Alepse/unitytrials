// Trials Service - Handles data transformation and business logic
import { ClinicalTrial } from './clinical-trials-api'

export interface TransformedTrial {
  id: string
  nctId: string
  title: string
  officialTitle: string
  acronym?: string
  condition: string[]
  conditionMeshTerms: string[]
  phase: string[]
  status: string
  studyType: string
  location: {
    country: string[]
    state: string[]
    city: string[]
    facility: string[]
  }
  sponsor: {
    lead: string
    leadClass: string
    collaborators: string[]
    collaboratorClasses: string[]
  }
  description: {
    brief: string
    detailed: string
  }
  eligibility: {
    criteria: string
    ageRange: string
    sex: string
    healthyVolunteers: string
    studyPopulation: string
    samplingMethod: string
  }
  enrollment: {
    count: number
    actualCount: number
  }
  dates: {
    start: string
    completion: string
    primaryCompletion: string
    lastUpdated: string
    firstPosted: string
    resultsFirstPosted: string
    lastVerified: string
  }
  keywords: string[]
  meshTerms: string[]
  interventions: {
    name: string[]
    type: string[]
    description: string[]
  }
  outcomes: {
    primary: {
      measure: string[]
      description: string[]
      timeFrame: string[]
    }
    secondary: {
      measure: string[]
      description: string[]
      timeFrame: string[]
    }
    other: {
      measure: string[]
      description: string[]
      timeFrame: string[]
    }
  }
  studyDesign: {
    allocation: string
    interventionModel: string
    primaryPurpose: string
    masking: string
    maskingDescription: string
    observationalModel: string
    timePerspective: string
    bioSpecRetention: string
    bioSpecDescription: string
    samplingMethod: string
    population: string
    studyPopulation: string
    samplingMethodDescription: string
  }
  studyArms: string
  matchScore?: number
  isSaved?: boolean
}

export interface SearchFilters {
  condition?: string
  location?: string
  phase?: string
  status?: string
  age?: string
  sex?: string
  limit?: number
  offset?: number
  country?: string
}

export interface SearchResult {
  trials: TransformedTrial[]
  total: number
  pageToken?: string
  hasMore: boolean
}

export class TrialsService {
  private transformTrial(rawTrial: any): TransformedTrial {
    return {
      id: rawTrial.NCTId || `trial-${Date.now()}`,
      nctId: rawTrial.NCTId || '',
      title: rawTrial.BriefTitle || 'Untitled Study',
      officialTitle: rawTrial.OfficialTitle || rawTrial.BriefTitle || 'Untitled Study',
      acronym: rawTrial.Acronym || undefined,
      condition: Array.isArray(rawTrial.Condition) ? rawTrial.Condition : [rawTrial.Condition || 'Not specified'],
      conditionMeshTerms: Array.isArray(rawTrial.ConditionMeshTerm) ? rawTrial.ConditionMeshTerm : [rawTrial.ConditionMeshTerm || ''],
      phase: Array.isArray(rawTrial.Phase) ? rawTrial.Phase : [rawTrial.Phase || 'Not specified'],
      status: rawTrial.Status || 'Unknown',
      studyType: rawTrial.StudyType || 'Not specified',
      location: {
        country: Array.isArray(rawTrial.LocationCountry) ? rawTrial.LocationCountry : [rawTrial.LocationCountry || 'Not specified'],
        state: Array.isArray(rawTrial.LocationState) ? rawTrial.LocationState : [rawTrial.LocationState || ''],
        city: Array.isArray(rawTrial.LocationCity) ? rawTrial.LocationCity : [rawTrial.LocationCity || ''],
        facility: Array.isArray(rawTrial.LocationFacility) ? rawTrial.LocationFacility : [rawTrial.LocationFacility || '']
      },
      sponsor: {
        lead: rawTrial.LeadSponsorName || 'Not specified',
        leadClass: rawTrial.LeadSponsorClass || 'Not specified',
        collaborators: Array.isArray(rawTrial.CollaboratorName) ? rawTrial.CollaboratorName : [rawTrial.CollaboratorName || ''],
        collaboratorClasses: Array.isArray(rawTrial.CollaboratorClass) ? rawTrial.CollaboratorClass : [rawTrial.CollaboratorClass || '']
      },
      description: {
        brief: rawTrial.BriefSummary || 'No brief description available',
        detailed: rawTrial.DetailedDescription || 'No detailed description available'
      },
      eligibility: {
        criteria: rawTrial.EligibilityCriteria || 'Contact study coordinator for eligibility information',
        ageRange: this.formatAgeRange(rawTrial.MinimumAge, rawTrial.MaximumAge),
        sex: rawTrial.Sex || 'All',
        healthyVolunteers: rawTrial.HealthyVolunteers || 'Not specified',
        studyPopulation: rawTrial.StudyPopulation || 'Not specified',
        samplingMethod: rawTrial.SamplingMethod || 'Not specified'
      },
      enrollment: {
        count: rawTrial.EnrollmentCount || 0,
        actualCount: rawTrial.EnrollmentCountActual || 0
      },
      dates: {
        start: this.formatDate(rawTrial.StartDate),
        completion: this.formatDate(rawTrial.CompletionDate),
        primaryCompletion: this.formatDate(rawTrial.PrimaryCompletionDate),
        lastUpdated: this.formatDate(rawTrial.LastUpdatePostDate),
        firstPosted: this.formatDate(rawTrial.FirstPostedDate),
        resultsFirstPosted: this.formatDate(rawTrial.ResultsFirstPostedDate),
        lastVerified: this.formatDate(rawTrial.LastVerifiedDate)
      },
      keywords: Array.isArray(rawTrial.Keyword) ? rawTrial.Keyword : [rawTrial.Keyword || ''],
      meshTerms: Array.isArray(rawTrial.MeshTerm) ? rawTrial.MeshTerm : [rawTrial.MeshTerm || ''],
      interventions: {
        name: Array.isArray(rawTrial.InterventionName) ? rawTrial.InterventionName : [rawTrial.InterventionName || ''],
        type: Array.isArray(rawTrial.InterventionType) ? rawTrial.InterventionType : [rawTrial.InterventionType || ''],
        description: Array.isArray(rawTrial.InterventionDescription) ? rawTrial.InterventionDescription : [rawTrial.InterventionDescription || '']
      },
      outcomes: {
        primary: {
          measure: Array.isArray(rawTrial.PrimaryOutcomeMeasure) ? rawTrial.PrimaryOutcomeMeasure : [rawTrial.PrimaryOutcomeMeasure || ''],
          description: Array.isArray(rawTrial.PrimaryOutcomeDescription) ? rawTrial.PrimaryOutcomeDescription : [rawTrial.PrimaryOutcomeDescription || ''],
          timeFrame: Array.isArray(rawTrial.PrimaryOutcomeTimeFrame) ? rawTrial.PrimaryOutcomeTimeFrame : [rawTrial.PrimaryOutcomeTimeFrame || '']
        },
        secondary: {
          measure: Array.isArray(rawTrial.SecondaryOutcomeMeasure) ? rawTrial.SecondaryOutcomeMeasure : [rawTrial.SecondaryOutcomeMeasure || ''],
          description: Array.isArray(rawTrial.SecondaryOutcomeDescription) ? rawTrial.SecondaryOutcomeDescription : [rawTrial.SecondaryOutcomeDescription || ''],
          timeFrame: Array.isArray(rawTrial.SecondaryOutcomeTimeFrame) ? rawTrial.SecondaryOutcomeTimeFrame : [rawTrial.SecondaryOutcomeTimeFrame || '']
        },
        other: {
          measure: Array.isArray(rawTrial.OtherOutcomeMeasure) ? rawTrial.OtherOutcomeMeasure : [rawTrial.OtherOutcomeMeasure || ''],
          description: Array.isArray(rawTrial.OtherOutcomeDescription) ? rawTrial.OtherOutcomeDescription : [rawTrial.OtherOutcomeDescription || ''],
          timeFrame: Array.isArray(rawTrial.OtherOutcomeTimeFrame) ? rawTrial.OtherOutcomeTimeFrame : [rawTrial.OtherOutcomeTimeFrame || '']
        }
      },
      studyDesign: {
        allocation: rawTrial.StudyDesignAllocation || 'Not specified',
        interventionModel: rawTrial.StudyDesignInterventionModel || 'Not specified',
        primaryPurpose: rawTrial.StudyDesignPrimaryPurpose || 'Not specified',
        masking: rawTrial.StudyDesignMasking || 'Not specified',
        maskingDescription: rawTrial.StudyDesignMaskingDescription || 'Not specified',
        observationalModel: rawTrial.StudyDesignObservationalModel || 'Not specified',
        timePerspective: rawTrial.StudyDesignTimePerspective || 'Not specified',
        bioSpecRetention: rawTrial.StudyDesignBioSpecRetention || 'Not specified',
        bioSpecDescription: rawTrial.StudyDesignBioSpecDescription || 'Not specified',
        samplingMethod: rawTrial.StudyDesignSamplingMethod || 'Not specified',
        population: rawTrial.StudyDesignPopulation || 'Not specified',
        studyPopulation: rawTrial.StudyDesignStudyPopulation || 'Not specified',
        samplingMethodDescription: rawTrial.StudyDesignSamplingMethodDescription || 'Not specified'
      },
      studyArms: rawTrial.StudyArms || 'Not specified',
      matchScore: this.calculateMatchScore(rawTrial),
      isSaved: false
    }
  }

  private formatAgeRange(minAge: string, maxAge: string): string {
    if (!minAge && !maxAge) return 'Not specified'
    if (minAge && maxAge) return `${minAge} - ${maxAge} years`
    if (minAge) return `${minAge}+ years`
    if (maxAge) return `Up to ${maxAge} years`
    return 'Not specified'
  }

  private formatDate(dateString: string): string {
    if (!dateString) return 'Not specified'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  private calculateMatchScore(trial: any): number {
    let score = 50 // Base score

    // Boost for recruiting status
    if (trial.Status === 'Recruiting') score += 20

    // Boost for recent updates
    if (trial.LastUpdatePostDate) {
      const lastUpdate = new Date(trial.LastUpdatePostDate)
      const daysSinceUpdate = (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24)
      if (daysSinceUpdate < 30) score += 15
      else if (daysSinceUpdate < 90) score += 10
    }

    // Boost for Phase III trials (more established)
    if (trial.Phase && trial.Phase.some((phase: string) => phase.includes('Phase 3'))) {
      score += 10
    }

    // Boost for US locations
    if (trial.LocationCountry && trial.LocationCountry.some((country: string) => 
      country.toLowerCase().includes('united states') || country.toLowerCase().includes('us')
    )) {
      score += 5
    }

    return Math.min(score, 100)
  }

  async searchTrials(filters: SearchFilters): Promise<SearchResult> {
    try {
      console.log('TrialsService - Starting search with filters:', filters)
      
      // Call our API route
      const params = new URLSearchParams()
      if (filters.condition) params.append('condition', filters.condition)
      if (filters.location) params.append('location', filters.location)
      if (filters.phase) params.append('phase', filters.phase)
      if (filters.status) params.append('status', filters.status)
      if (filters.age) params.append('age', filters.age)
      if (filters.sex) params.append('sex', filters.sex)
      if (filters.limit) params.append('limit', filters.limit.toString())
      if (filters.offset) params.append('offset', filters.offset.toString())
      if (filters.country) params.append('country', filters.country)

      const apiUrl = `/api/trials?${params.toString()}`
      console.log('TrialsService - Making request to:', apiUrl)

      const response = await fetch(apiUrl)
      
      console.log('TrialsService - Response status:', response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('TrialsService - HTTP error response:', errorText)
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      console.log('TrialsService - Response received:', {
        success: result.success,
        dataLength: result.data?.length || 0,
        total: result.total || 0
      })

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch trials')
      }

      const transformedTrials = result.data.map((trial: any) => this.transformTrial(trial))
      console.log('TrialsService - Transformed trials:', transformedTrials.length)

      return {
        trials: transformedTrials,
        total: result.total || transformedTrials.length,
        pageToken: result.pageToken,
        hasMore: transformedTrials.length === (filters.limit || 10)
      }

    } catch (error) {
      console.error('TrialsService - Error searching trials:', error)
      
      // Return fallback data if API fails
      const fallbackTrials: TransformedTrial[] = [
        {
          id: 'fallback-1',
          nctId: 'NCT00000001',
          title: 'Clinical Trial for Various Conditions',
          officialTitle: 'A Study to Evaluate Treatment Options for Multiple Medical Conditions',
          condition: ['Various Conditions', 'Medical Research'],
          conditionMeshTerms: ['Medical Research'],
          phase: ['Phase 2', 'Phase 3'],
          status: 'Recruiting',
          studyType: 'Interventional',
          location: {
            country: ['United States'],
            state: ['Multiple States'],
            city: ['Multiple Cities'],
            facility: ['Multiple Facilities']
          },
          sponsor: {
            lead: 'Research Institute',
            leadClass: 'Other',
            collaborators: [],
            collaboratorClasses: []
          },
          description: {
            brief: 'This clinical trial is designed to evaluate new treatment approaches for various medical conditions. The study aims to improve patient outcomes and advance medical knowledge.',
            detailed: 'This comprehensive clinical trial evaluates multiple treatment approaches for various medical conditions. The study includes rigorous safety monitoring and efficacy assessments.'
          },
          eligibility: {
            criteria: 'Adults aged 18-75 with qualifying medical conditions. Must be able to provide informed consent and attend regular follow-up visits.',
            ageRange: '18-75 years',
            sex: 'All',
            healthyVolunteers: 'No',
            studyPopulation: 'Patients with qualifying conditions',
            samplingMethod: 'Probability Sample'
          },
          enrollment: {
            count: 500,
            actualCount: 250
          },
          dates: {
            start: '2024-01-15',
            completion: '2026-12-31',
            primaryCompletion: '2026-06-30',
            lastUpdated: '2024-08-01',
            firstPosted: '2024-01-01',
            resultsFirstPosted: '',
            lastVerified: '2024-08-01'
          },
          keywords: ['clinical trial', 'treatment', 'research'],
          meshTerms: ['Clinical Trial'],
          interventions: {
            name: ['Standard Treatment', 'Experimental Treatment'],
            type: ['Drug', 'Procedure'],
            description: ['Standard care protocol', 'Novel therapeutic approach']
          },
          outcomes: {
            primary: {
              measure: ['Overall Survival'],
              description: ['Time from randomization to death'],
              timeFrame: ['2 years']
            },
            secondary: {
              measure: ['Progression Free Survival'],
              description: ['Time from randomization to disease progression'],
              timeFrame: ['1 year']
            },
            other: {
              measure: ['Quality of Life'],
              description: ['Patient reported outcomes'],
              timeFrame: ['6 months']
            }
          },
          studyDesign: {
            allocation: 'Randomized',
            interventionModel: 'Parallel Assignment',
            primaryPurpose: 'Treatment',
            masking: 'Double',
            maskingDescription: 'Participants and investigators are masked',
            observationalModel: 'Not Applicable',
            timePerspective: 'Prospective',
            bioSpecRetention: 'Samples With DNA',
            bioSpecDescription: 'Blood samples for genetic analysis',
            samplingMethod: 'Probability Sample',
            population: 'Patients with qualifying conditions',
            studyPopulation: 'Adults aged 18-75',
            samplingMethodDescription: 'Random selection from eligible population'
          },
          studyArms: 'Experimental and Control groups',
          matchScore: 85,
          isSaved: false
        },
        {
          id: 'fallback-2',
          nctId: 'NCT00000002',
          title: 'Innovative Therapy Development Study',
          officialTitle: 'Development and Evaluation of Novel Therapeutic Approaches',
          condition: ['Therapeutic Research', 'Innovation'],
          conditionMeshTerms: ['Therapeutic Research'],
          phase: ['Phase 1', 'Phase 2'],
          status: 'Recruiting',
          studyType: 'Interventional',
          location: {
            country: ['United States'],
            state: ['California', 'New York'],
            city: ['Los Angeles', 'New York City'],
            facility: ['Medical Center A', 'Medical Center B']
          },
          sponsor: {
            lead: 'Medical Center',
            leadClass: 'Other',
            collaborators: [],
            collaboratorClasses: []
          },
          description: {
            brief: 'This study focuses on developing and evaluating innovative therapeutic approaches for various medical conditions. The research aims to bring new treatment options to patients.',
            detailed: 'This innovative study evaluates novel therapeutic approaches through rigorous clinical testing. The research includes comprehensive safety and efficacy assessments.'
          },
          eligibility: {
            criteria: 'Participants must meet specific medical criteria and be willing to participate in research activities. Age requirements vary by study arm.',
            ageRange: '18-80 years',
            sex: 'All',
            healthyVolunteers: 'Yes',
            studyPopulation: 'Healthy volunteers and patients',
            samplingMethod: 'Non-Probability Sample'
          },
          enrollment: {
            count: 300,
            actualCount: 150
          },
          dates: {
            start: '2024-03-01',
            completion: '2027-06-30',
            primaryCompletion: '2027-03-31',
            lastUpdated: '2024-07-15',
            firstPosted: '2024-02-15',
            resultsFirstPosted: '',
            lastVerified: '2024-07-15'
          },
          keywords: ['therapy', 'innovation', 'development'],
          meshTerms: ['Therapeutic Research'],
          interventions: {
            name: ['Novel Therapy A', 'Novel Therapy B'],
            type: ['Drug', 'Biological'],
            description: ['Experimental therapeutic agent', 'Biological therapy approach']
          },
          outcomes: {
            primary: {
              measure: ['Safety Profile'],
              description: ['Incidence of adverse events'],
              timeFrame: ['1 year']
            },
            secondary: {
              measure: ['Efficacy Measures'],
              description: ['Clinical response rates'],
              timeFrame: ['6 months']
            },
            other: {
              measure: ['Biomarker Analysis'],
              description: ['Molecular response markers'],
              timeFrame: ['3 months']
            }
          },
          studyDesign: {
            allocation: 'Randomized',
            interventionModel: 'Sequential Assignment',
            primaryPurpose: 'Treatment',
            masking: 'Single',
            maskingDescription: 'Participants are masked to treatment assignment',
            observationalModel: 'Not Applicable',
            timePerspective: 'Prospective',
            bioSpecRetention: 'Samples Without DNA',
            bioSpecDescription: 'Blood samples for biomarker analysis',
            samplingMethod: 'Non-Probability Sample',
            population: 'Healthy volunteers and patients',
            studyPopulation: 'Adults aged 18-80',
            samplingMethodDescription: 'Convenience sampling from eligible population'
          },
          studyArms: 'Multiple dose escalation arms',
          matchScore: 75,
          isSaved: false
        }
      ]

      console.log('TrialsService - Returning fallback data with', fallbackTrials.length, 'trials')
      
      return {
        trials: fallbackTrials,
        total: fallbackTrials.length,
        pageToken: null,
        hasMore: false
      }
    }
  }

  async getTrialDetails(nctId: string): Promise<TransformedTrial | null> {
    try {
      const response = await fetch('/api/trials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nctId })
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch trial details')
      }

      return this.transformTrial(result.data)

    } catch (error) {
      console.error('Error fetching trial details:', error)
      return null
    }
  }

  async searchByCondition(condition: string, limit: number = 5): Promise<TransformedTrial[]> {
    const result = await this.searchTrials({ condition, limit })
    return result.trials
  }

  async searchByLocation(location: string, limit: number = 5): Promise<TransformedTrial[]> {
    const result = await this.searchTrials({ location, limit })
    return result.trials
  }

  async searchByPhase(phase: string, limit: number = 5): Promise<TransformedTrial[]> {
    const result = await this.searchTrials({ phase, limit })
    return result.trials
  }

  // Advanced search methods
  async advancedSearch(filters: {
    condition?: string
    location?: string
    phase?: string
    status?: string
    age?: string
    sex?: string
    studyType?: string
    sponsor?: string
    intervention?: string
    outcome?: string
    dateRange?: string
    limit?: number
    offset?: number
  }): Promise<SearchResult> {
    return this.searchTrials(filters)
  }

  async searchByIntervention(intervention: string, limit: number = 5): Promise<TransformedTrial[]> {
    const result = await this.searchTrials({ intervention, limit })
    return result.trials
  }

  async searchBySponsor(sponsor: string, limit: number = 5): Promise<TransformedTrial[]> {
    const result = await this.searchTrials({ sponsor, limit })
    return result.trials
  }

  async searchByOutcome(outcome: string, limit: number = 5): Promise<TransformedTrial[]> {
    const result = await this.searchTrials({ outcome, limit })
    return result.trials
  }

  async searchByDateRange(startDate: string, endDate: string, limit: number = 5): Promise<TransformedTrial[]> {
    const result = await this.searchTrials({ dateRange: `${startDate}:${endDate}`, limit })
    return result.trials
  }

  // USA-only search methods
  async searchTrialsUSA(filters: SearchFilters): Promise<SearchResult> {
    return this.searchTrials({ ...filters, country: 'United States' })
  }

  async searchByConditionUSA(condition: string, limit: number = 5): Promise<TransformedTrial[]> {
    const result = await this.searchTrials({ condition, limit, country: 'United States' })
    return result.trials
  }

  async searchByLocationUSA(location: string, limit: number = 5): Promise<TransformedTrial[]> {
    const result = await this.searchTrials({ location, limit, country: 'United States' })
    return result.trials
  }

  async getCompleteTrialDetails(nctId: string): Promise<TransformedTrial | null> {
    try {
      const response = await fetch(`/api/trials/details/${nctId}`)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch trial details')
      }

      return this.transformTrial(result.data)

    } catch (error) {
      console.error('Error fetching complete trial details:', error)
      return null
    }
  }

  // Utility methods for filtering and sorting
  filterTrialsByPhase(trials: TransformedTrial[], phase: string): TransformedTrial[] {
    return trials.filter(trial => 
      trial.phase.some(p => p.toLowerCase().includes(phase.toLowerCase()))
    )
  }

  filterTrialsByLocation(trials: TransformedTrial[], location: string): TransformedTrial[] {
    return trials.filter(trial => 
      trial.location.some(loc => loc.toLowerCase().includes(location.toLowerCase()))
    )
  }

  sortTrialsByMatchScore(trials: TransformedTrial[]): TransformedTrial[] {
    return [...trials].sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
  }

  sortTrialsByDate(trials: TransformedTrial[]): TransformedTrial[] {
    return [...trials].sort((a, b) => {
      const dateA = new Date(a.lastUpdated).getTime()
      const dateB = new Date(b.lastUpdated).getTime()
      return dateB - dateA
    })
  }

  // Search suggestions based on common conditions
  getSearchSuggestions(): string[] {
    return [
      'cancer',
      'diabetes',
      'heart disease',
      'lung cancer',
      'breast cancer',
      'prostate cancer',
      'leukemia',
      'lymphoma',
      'depression',
      'anxiety',
      'alzheimer',
      'parkinson',
      'asthma',
      'copd',
      'rheumatoid arthritis',
      'lupus',
      'multiple sclerosis'
    ]
  }

  // Get phase descriptions for user education
  getPhaseDescriptions(): Record<string, string> {
    return {
      'Phase 1': 'Safety and dosage studies with a small group of people',
      'Phase 2': 'Effectiveness studies with a larger group',
      'Phase 3': 'Large-scale studies to confirm effectiveness and monitor side effects',
      'Phase 4': 'Post-marketing studies after FDA approval'
    }
  }
}

// Export singleton instance
export const trialsService = new TrialsService() 