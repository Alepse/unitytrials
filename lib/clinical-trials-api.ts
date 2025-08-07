// ClinicalTrials.gov API integration
// Documentation: https://clinicaltrials.gov/api/gui/ref/api_urls

export interface ClinicalTrial {
  NCTId: string
  BriefTitle: string
  OfficialTitle: string
  Condition: string[]
  Phase: string[]
  Status: string
  LocationCountry: string[]
  LocationFacility: string[]
  LeadSponsorName: string
  BriefSummary: string
  DetailedDescription: string
  EligibilityCriteria: string
  MinimumAge: string
  MaximumAge: string
  Sex: string
  HealthyVolunteers: string
  StudyType: string
  EnrollmentCount: number
  StartDate: string
  CompletionDate: string
  LastUpdatePostDate: string
  Keyword: string[]
  MeshTerm: string[]
}

export interface SearchParams {
  condition?: string
  location?: string
  phase?: string
  status?: string
  age?: string
  sex?: string
  limit?: number
  offset?: number
}

export class ClinicalTrialsAPI {
  private baseUrl = 'https://clinicaltrials.gov/api/v2/studies'
  
  async searchTrials(params: SearchParams): Promise<ClinicalTrial[]> {
    try {
      const queryParams = new URLSearchParams()
      
      if (params.condition) {
        queryParams.append('query.term', params.condition)
      }
      
      if (params.location) {
        queryParams.append('query.locations', params.location)
      }
      
      if (params.phase) {
        queryParams.append('query.phases', params.phase)
      }
      
      if (params.status) {
        queryParams.append('query.status', params.status)
      }
      
      if (params.age) {
        queryParams.append('query.age', params.age)
      }
      
      if (params.sex) {
        queryParams.append('query.sex', params.sex)
      }
      
      queryParams.append('pageSize', (params.limit || 10).toString())
      queryParams.append('pageToken', (params.offset || 0).toString())
      queryParams.append('fields', 'NCTId,BriefTitle,OfficialTitle,Condition,Phase,Status,LocationCountry,LocationFacility,LeadSponsorName,BriefSummary,DetailedDescription,EligibilityCriteria,MinimumAge,MaximumAge,Sex,HealthyVolunteers,StudyType,EnrollmentCount,StartDate,CompletionDate,LastUpdatePostDate,Keyword,MeshTerm')
      
      const response = await fetch(`${this.baseUrl}?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data.studies || []
    } catch (error) {
      console.error('Error fetching clinical trials:', error)
      return []
    }
  }
  
  async getTrialDetails(nctId: string): Promise<ClinicalTrial | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${nctId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching trial details:', error)
      return null
    }
  }
  
  async searchByCondition(condition: string, limit: number = 5): Promise<ClinicalTrial[]> {
    return this.searchTrials({
      condition,
      status: 'Recruiting',
      limit
    })
  }
  
  async searchByLocation(location: string, limit: number = 5): Promise<ClinicalTrial[]> {
    return this.searchTrials({
      location,
      status: 'Recruiting',
      limit
    })
  }
  
  async searchByPhase(phase: string, limit: number = 5): Promise<ClinicalTrial[]> {
    return this.searchTrials({
      phase,
      status: 'Recruiting',
      limit
    })
  }
}

// Export singleton instance
export const clinicalTrialsAPI = new ClinicalTrialsAPI() 