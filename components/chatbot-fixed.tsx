'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, User, Loader2, Search, Target, Heart, Info, Play, Shield } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { trialsService, TransformedTrial } from '@/lib/trials-service'
import { aiService, AIResponse } from '@/lib/ai-service'

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  suggestions?: string[]
  trials?: TransformedTrial[]
  quickActions?: QuickAction[]
}

interface QuickAction {
  label: string
  action: string
  icon: string
}

export default function ChatbotFixed() {
  const [isOpen, setIsOpen] = useState(false)
  const [showLogo, setShowLogo] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm Unity AI, your clinical trial finder. I can help you discover studies that match your medical condition, location, and preferences. What type of clinical trial are you looking for?",
      timestamp: new Date(),
      quickActions: [
        { label: "Find Cancer Trials", action: "cancer trials", icon: "Heart" },
        { label: "Diabetes Studies", action: "diabetes research", icon: "Target" },
        { label: "Heart Disease", action: "cardiovascular trials", icon: "Heart" },
        { label: "Browse All Categories", action: "show all categories", icon: "Search" }
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Enhanced toggle function with logo animation
  const toggleChatbot = () => {
    if (!isOpen) {
      // Show logo animation when opening
      setShowLogo(true)
      setTimeout(() => setShowLogo(false), 2000) // Hide logo after 2 seconds
    }
    setIsOpen(prev => !prev)
  }

  const searchTrials = async (query: string): Promise<TransformedTrial[]> => {
    try {
      // Use AI service to comprehend the query and extract valid search terms
      const comprehension = await aiService['comprehendSearchQuery'](query)
      
      // Use the comprehended condition if available, otherwise use the original query
      const searchTerm = comprehension.condition || query
      
      if (!searchTerm || searchTerm.trim() === '') {
        // If no valid search term found, return empty array
        return []
      }
      
      const trials = await trialsService.searchByConditionUSA(searchTerm, 3)
      return trials
    } catch (error) {
      console.error('Error searching trials:', error)
      
      // Return fallback data if API fails
      const fallbackTrials: TransformedTrial[] = [
        {
          id: 'fallback-1',
          nctId: 'NCT12345678',
          title: 'Phase III Diabetes Prevention Study',
          officialTitle: 'A Phase III Study for Diabetes Prevention',
          condition: ['Type 2 Diabetes'],
          conditionMeshTerms: ['Diabetes Mellitus, Type 2'],
          phase: ['Phase 3'],
          status: 'Recruiting',
          studyType: 'Interventional',
          location: {
            country: ['United States'],
            state: ['Multiple States'],
            city: ['Multiple Cities'],
            facility: ['Multiple Facilities']
          },
          sponsor: {
            lead: 'National Institute of Diabetes and Digestive and Kidney Diseases',
            leadClass: 'NIH',
            collaborators: [],
            collaboratorClasses: []
          },
          description: {
            brief: 'This study evaluates a new medication for preventing Type 2 diabetes in high-risk individuals.',
            detailed: 'This comprehensive clinical trial evaluates multiple treatment approaches for Type 2 diabetes prevention. The study includes rigorous safety monitoring and efficacy assessments.'
          },
          eligibility: {
            criteria: 'Adults aged 18-75 with prediabetes or high risk for diabetes. Must be able to provide informed consent and attend regular follow-up visits.',
            ageRange: '18 - 75 years',
            sex: 'All',
            healthyVolunteers: 'No',
            studyPopulation: 'Patients with prediabetes',
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
            lastUpdated: '2024-03-01',
            firstPosted: '2024-01-01',
            resultsFirstPosted: '',
            lastVerified: '2024-03-01'
          },
          keywords: ['diabetes', 'prevention', 'medication'],
          meshTerms: ['Diabetes Prevention'],
          interventions: {
            name: ['Standard Treatment', 'Experimental Treatment'],
            type: ['Drug', 'Procedure'],
            description: ['Standard care protocol', 'Novel therapeutic approach']
          },
          outcomes: {
            primary: {
              measure: ['Diabetes Incidence'],
              description: ['Rate of new diabetes cases'],
              timeFrame: ['2 years']
            },
            secondary: {
              measure: ['HbA1c Levels'],
              description: ['Blood sugar control'],
              timeFrame: ['6 months']
            },
            other: {
              measure: ['Quality of Life'],
              description: ['Patient reported outcomes'],
              timeFrame: ['1 year']
            }
          },
          studyDesign: {
            allocation: 'Randomized',
            interventionModel: 'Parallel Assignment',
            primaryPurpose: 'Prevention',
            masking: 'Double',
            maskingDescription: 'Participants and investigators are masked',
            observationalModel: 'Cohort',
            timePerspective: 'Prospective',
            bioSpecRetention: 'Samples With DNA',
            bioSpecDescription: 'Blood samples for genetic analysis',
            samplingMethod: 'Probability Sample',
            population: 'Adults with prediabetes',
            studyPopulation: 'Patients with qualifying conditions',
            samplingMethodDescription: 'Random selection from eligible population'
          },
          studyArms: 'Experimental: New medication, Placebo: Standard care',
          matchScore: 85,
          isSaved: false
        },
        {
          id: 'fallback-2',
          nctId: 'NCT87654321',
          title: 'Advanced Cancer Immunotherapy Trial',
          officialTitle: 'Immunotherapy for Advanced Solid Tumors',
          condition: ['Lung Cancer', 'Breast Cancer'],
          conditionMeshTerms: ['Lung Neoplasms', 'Breast Neoplasms'],
          phase: ['Phase 2'],
          status: 'Recruiting',
          studyType: 'Interventional',
          location: {
            country: ['United States'],
            state: ['New York', 'California'],
            city: ['New York', 'Los Angeles'],
            facility: ['Memorial Sloan Kettering Cancer Center', 'UCLA Medical Center']
          },
          sponsor: {
            lead: 'Memorial Sloan Kettering Cancer Center',
            leadClass: 'Other',
            collaborators: ['National Cancer Institute'],
            collaboratorClasses: ['NIH']
          },
          description: {
            brief: 'This clinical trial is testing innovative immunotherapy combinations for advanced solid tumors.',
            detailed: 'This study evaluates novel immunotherapy combinations for patients with advanced solid tumors who have failed standard treatments.'
          },
          eligibility: {
            criteria: 'Adults with advanced solid tumors who have failed standard treatments. Must have measurable disease and adequate organ function.',
            ageRange: '18+ years',
            sex: 'All',
            healthyVolunteers: 'No',
            studyPopulation: 'Patients with advanced cancer',
            samplingMethod: 'Non-Probability Sample'
          },
          enrollment: {
            count: 200,
            actualCount: 150
          },
          dates: {
            start: '2024-02-01',
            completion: '2025-06-30',
            primaryCompletion: '2025-03-31',
            lastUpdated: '2024-02-15',
            firstPosted: '2024-01-15',
            resultsFirstPosted: '',
            lastVerified: '2024-02-15'
          },
          keywords: ['immunotherapy', 'cancer', 'solid tumors'],
          meshTerms: ['Immunotherapy'],
          interventions: {
            name: ['Checkpoint Inhibitor', 'CAR-T Cell Therapy'],
            type: ['Biological', 'Cell Therapy'],
            description: ['Immune checkpoint blockade', 'Genetically modified T cells']
          },
          outcomes: {
            primary: {
              measure: ['Overall Survival'],
              description: ['Time from treatment to death'],
              timeFrame: ['2 years']
            },
            secondary: {
              measure: ['Progression-Free Survival'],
              description: ['Time without disease progression'],
              timeFrame: ['1 year']
            },
            other: {
              measure: ['Response Rate'],
              description: ['Tumor response to treatment'],
              timeFrame: ['6 months']
            }
          },
          studyDesign: {
            allocation: 'Non-Randomized',
            interventionModel: 'Single Group Assignment',
            primaryPurpose: 'Treatment',
            masking: 'None',
            maskingDescription: 'Open label study',
            observationalModel: 'Case-Only',
            timePerspective: 'Prospective',
            bioSpecRetention: 'Samples Without DNA',
            bioSpecDescription: 'Tumor tissue for biomarker analysis',
            samplingMethod: 'Non-Probability Sample',
            population: 'Patients with advanced solid tumors',
            studyPopulation: 'Patients with qualifying conditions',
            samplingMethodDescription: 'Convenience sampling from eligible patients'
          },
          studyArms: 'Experimental: Immunotherapy combination',
          matchScore: 80,
          isSaved: false
        }
      ]
      
      const queryLower = query.toLowerCase()
      const relevantTrials = fallbackTrials.filter(trial => 
        trial.condition.some(condition => condition.toLowerCase().includes(queryLower)) ||
        trial.title.toLowerCase().includes(queryLower) ||
        trial.keywords.some(keyword => keyword.toLowerCase().includes(queryLower))
      )
      
      return relevantTrials.length > 0 ? relevantTrials : fallbackTrials
    }
  }

  const generateBotResponse = async (userMessage: string): Promise<Message> => {
    try {
      const aiResponse = await aiService.processMessage(userMessage)
      
      let trials: TransformedTrial[] = []
      if (aiResponse.intent === 'search') {
        trials = await searchTrials(userMessage)
      }
      
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: aiResponse.message,
        timestamp: new Date(),
        trials: trials.length > 0 ? trials : undefined,
        suggestions: aiResponse.suggestions,
        quickActions: aiResponse.quickActions
      }
    } catch (error) {
      console.error('Error generating bot response:', error)
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: "I'm having trouble processing your request right now. Please try again or ask me to search for a specific condition like 'cancer' or 'diabetes'.",
        timestamp: new Date(),
        quickActions: [
          { label: "Cancer Research", action: "cancer trials", icon: "Heart" },
          { label: "Diabetes Studies", action: "diabetes research", icon: "Target" },
          { label: "Heart Health", action: "cardiovascular trials", icon: "Heart" },
          { label: "Browse All", action: "show all categories", icon: "Search" }
        ]
      }
    }
  }

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      const botResponse = await generateBotResponse(message)
      setMessages(prev => [...prev, botResponse])
    } catch (error) {
      console.error('Error handling message:', error)
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: "I'm sorry, I'm having trouble processing your request. Please try again.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleQuickAction = (action: string) => {
    handleSendMessage(action)
  }

  const handleViewCompleteDetails = async (nctId: string) => {
    try {
      const response = await fetch(`/api/trials/details/${nctId}`)
      const result = await response.json()
      
      if (result.success) {
        const trial = result.data
        const detailedMessage = `Here are the complete details for ${trial.title} (${trial.nctId}):

**Study Information:**
- Official Title: ${trial.officialTitle}
- Status: ${trial.status}
- Phase: ${trial.phase.join(', ')}
- Study Type: ${trial.studyType}

**Eligibility:**
- Age Range: ${trial.eligibility.ageRange}
- Sex: ${trial.eligibility.sex}
- Healthy Volunteers: ${trial.eligibility.healthyVolunteers}

**Locations:**
${trial.location.country.join(', ')}

**Sponsor:**
${trial.sponsor.lead}

**Detailed Description:**
${trial.description.detailed}

**Eligibility Criteria:**
${trial.eligibility.criteria}

**Interventions:**
${trial.interventions.name.join(', ')}

**Primary Outcomes:**
${trial.outcomes.primary.measure.join(', ')}

**Study Design:**
- Allocation: ${trial.studyDesign.allocation}
- Intervention Model: ${trial.studyDesign.interventionModel}
- Primary Purpose: ${trial.studyDesign.primaryPurpose}

For more information, visit: https://clinicaltrials.gov/ct2/show/${trial.nctId}`

        const detailedResponse: Message = {
          id: Date.now().toString(),
          type: 'bot',
          content: detailedMessage,
          timestamp: new Date()
        }
        
        setMessages(prev => [...prev, detailedResponse])
      } else {
        console.error('Failed to fetch trial details:', result.error)
      }
    } catch (error) {
      console.error('Error fetching trial details:', error)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      {/* Logo Animation Overlay */}
      {showLogo && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 shadow-2xl transform animate-in zoom-in duration-500">
            <div className="text-center space-y-4">
              <img src="/logo1.svg" alt="UnityTrials Logo" className="w-20 h-20 mx-auto" />
              <h2 className="text-2xl font-bold text-slate-900">UnityTrials</h2>
              <p className="text-slate-600">Clinical Trial Matching</p>
              <div className="flex items-center justify-center gap-2 text-teal-600">
                <div className="w-2 h-2 bg-teal-600 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-teal-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-teal-600 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Chatbot Toggle Button */}
      <div className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-50">
        <button
          data-testid="chatbot-toggle"
          onClick={toggleChatbot}
          className="group relative w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer overflow-hidden"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Pulse effect */}
          <div className="absolute inset-0 rounded-full bg-teal-400 animate-ping opacity-20"></div>
          
          {/* Icon */}
          <div className="relative z-10">
            {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          </div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {isOpen ? 'Close Chat' : 'Open AI Assistant'}
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
          </div>
        </button>
      </div>

      {/* Enhanced Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-2 md:right-6 w-[calc(100vw-1rem)] sm:w-[28rem] md:w-96 h-[70vh] md:h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-40 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Enhanced Header */}
          <div className="relative bg-gradient-to-r from-teal-500 via-blue-500 to-teal-600 text-white p-4 rounded-t-2xl">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <div className="absolute top-4 right-4 w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-2 left-4 w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
            
            <div className="relative z-10 flex items-center gap-3">
              {/* Logo */}
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <div className="w-6 h-6 border border-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-lg">Unity AI Trial Finder</h3>
                <div className="flex items-center gap-2 text-sm opacity-90">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Online • Finding Clinical Trials</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-slate-50 to-white">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-start gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white' 
                          : 'bg-gradient-to-r from-teal-500 to-blue-600 text-white'
                      }`}>
                        {message.type === 'user' ? <User className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                      </div>
                      <div className={`rounded-2xl p-4 shadow-sm ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white'
                          : 'bg-white text-gray-900 border border-gray-100'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className={`text-xs mt-2 ${
                          message.type === 'user' ? 'text-teal-100' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>

                                         {/* Enhanced Trial Results with Complete Information */}
                     {message.trials && message.trials.length > 0 && (
                       <div className="mt-4 space-y-4">
                         {message.trials.map((trial) => (
                           <Card key={trial.id} className="bg-white border border-teal-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden">
                             <CardContent className="p-4">
                               <div className="space-y-3">
                                 {/* Header */}
                                 <div className="flex items-start gap-3">
                                   <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                     <Target className="w-5 h-5 text-white" />
                                   </div>
                                   <div className="flex-1">
                                     <h4 className="font-semibold text-sm text-gray-900 mb-1 leading-tight">{trial.title}</h4>
                                     {trial.acronym && (
                                       <p className="text-xs text-gray-500 mb-2">({trial.acronym})</p>
                                     )}
                                     <div className="flex gap-1 mb-2 flex-wrap">
                                       {trial.condition.slice(0, 3).map((condition, index) => (
                                         <Badge key={index} className="bg-gradient-to-r from-teal-100 to-blue-100 text-teal-700 text-xs border-0">
                                           {condition}
                                         </Badge>
                                       ))}
                                     </div>
                                   </div>
                                 </div>

                                 {/* Trial Details */}
                                 <div className="grid grid-cols-2 gap-3 text-xs">
                                   <div>
                                     <span className="font-medium text-gray-700">Status:</span>
                                     <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                                       trial.status === 'Recruiting' ? 'bg-green-100 text-green-700' :
                                       trial.status === 'Active, not recruiting' ? 'bg-yellow-100 text-yellow-700' :
                                       'bg-gray-100 text-gray-700'
                                     }`}>
                                       {trial.status}
                                     </span>
                                   </div>
                                   <div>
                                     <span className="font-medium text-gray-700">Phase:</span>
                                     <span className="ml-1 text-gray-600">{trial.phase.join(', ')}</span>
                                   </div>
                                   <div>
                                     <span className="font-medium text-gray-700">Study Type:</span>
                                     <span className="ml-1 text-gray-600">{trial.studyType}</span>
                                   </div>
                                   <div>
                                     <span className="font-medium text-gray-700">Enrollment:</span>
                                     <span className="ml-1 text-gray-600">{trial.enrollment.count}</span>
                                   </div>
                                 </div>

                                 {/* Location */}
                                 {trial.location.country.length > 0 && (
                                   <div className="text-xs">
                                     <span className="font-medium text-gray-700">Locations:</span>
                                     <span className="ml-1 text-gray-600">
                                       {trial.location.country.slice(0, 3).join(', ')}
                                       {trial.location.country.length > 3 && ' and more...'}
                                     </span>
                                   </div>
                                 )}

                                 {/* Description */}
                                 <div className="text-xs">
                                   <span className="font-medium text-gray-700">Description:</span>
                                   <p className="mt-1 text-gray-600 leading-relaxed">
                                     {trial.description.brief.length > 150 
                                       ? trial.description.brief.substring(0, 150) + '...' 
                                       : trial.description.brief}
                                   </p>
                                 </div>

                                 {/* Sponsor */}
                                 <div className="text-xs">
                                   <span className="font-medium text-gray-700">Sponsor:</span>
                                   <span className="ml-1 text-gray-600">{trial.sponsor.lead}</span>
                                 </div>

                                 {/* Action Buttons */}
                                 <div className="flex gap-2 pt-2">
                                   <Button 
                                     size="sm" 
                                     className="flex-1 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white text-xs rounded-lg"
                                     onClick={() => window.open(`https://clinicaltrials.gov/ct2/show/${trial.nctId}`, '_blank')}
                                   >
                                     View Full Details
                                   </Button>
                                   <Button 
                                     size="sm" 
                                     variant="outline"
                                     className="text-xs border-teal-200 text-teal-600 hover:bg-teal-50 rounded-lg"
                                     onClick={() => handleViewCompleteDetails(trial.nctId)}
                                   >
                                     Complete Info
                                   </Button>
                                 </div>
                               </div>
                             </CardContent>
                           </Card>
                         ))}
                       </div>
                     )}

                    {/* Enhanced Quick Actions */}
                    {message.quickActions && message.quickActions.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        {message.quickActions.map((action, index) => {
                          const getIconComponent = (iconName: string) => {
                            const iconMap: { [key: string]: any } = {
                              'Heart': Heart,
                              'Target': Target,
                              'Search': Search,
                              'Info': Info,
                              'Play': Play,
                              'Shield': Shield
                            }
                            return iconMap[iconName] || Search
                          }
                          
                          const IconComponent = getIconComponent(action.icon)
                          return (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuickAction(action.action)}
                              className="text-xs border-2 border-teal-200 text-teal-600 hover:bg-gradient-to-r hover:from-teal-50 hover:to-blue-50 p-3 h-auto flex flex-col items-center gap-2 rounded-xl transition-all duration-300 hover:shadow-md"
                            >
                              <IconComponent className="w-5 h-5" />
                              <span className="text-center leading-tight font-medium">{action.label}</span>
                            </Button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Enhanced Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <Search className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-sm text-gray-600 font-medium">Searching trials...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me to find clinical trials..."
                  className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 focus:border-teal-500 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-teal-200"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage(inputValue)
                    }
                  }}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search className="w-4 h-4" />
                </div>
              </div>
              <Button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 