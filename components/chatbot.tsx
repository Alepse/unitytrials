'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, User, Loader2, Search, Target, Heart, Info, Play, Shield, Brain } from 'lucide-react'
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
  iconType?: 'default' | 'website' | 'general'
}

interface QuickAction {
  label: string
  action: string
  icon: string
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
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

  // Debug function to test click handler
  const handleToggleChatbot = () => {
    console.log('Chatbot button clicked! Current state:', isOpen)
    setIsOpen(!isOpen)
    console.log('New state will be:', !isOpen)
  }

  const searchTrials = async (query: string): Promise<TransformedTrial[]> => {
    try {
      // Use the trials service to search
      const trials = await trialsService.searchByCondition(query, 3)
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
          phase: ['Phase 3'],
          status: 'Recruiting',
          location: {
            country: ['United States'],
            state: [],
            city: [],
            facility: []
          },
          sponsor: {
            lead: 'National Institute of Diabetes and Digestive and Kidney Diseases',
            leadClass: 'NIH',
            collaborators: [],
            collaboratorClasses: []
          },
          description: {
            brief: 'This study evaluates a new medication for preventing Type 2 diabetes in high-risk individuals.',
            detailed: 'This study evaluates a new medication for preventing Type 2 diabetes in high-risk individuals. The study is currently recruiting participants across multiple locations in the United States.'
          },
          eligibility: {
            criteria: 'Adults aged 18-75 with prediabetes or high risk for diabetes',
            ageRange: '18 - 75 years',
            sex: 'All',
            healthyVolunteers: 'No',
            studyPopulation: '',
            samplingMethod: ''
          },
          studyType: 'Interventional',
          enrollment: { count: 500, actualCount: 0 },
          keywords: ['diabetes', 'prevention', 'medication'],
          matchScore: 85,
          isSaved: false,
          conditionMeshTerms: [],
          dates: {
            start: '',
            completion: '',
            primaryCompletion: '',
            lastUpdated: '',
            firstPosted: '',
            resultsFirstPosted: '',
            lastVerified: ''
          },
          meshTerms: [],
          interventions: { name: [], type: [], description: [] },
          outcomes: {
            primary: { measure: [], description: [], timeFrame: [] },
            secondary: { measure: [], description: [], timeFrame: [] },
            other: { measure: [], description: [], timeFrame: [] }
          },
          studyDesign: {
            allocation: '',
            interventionModel: '',
            primaryPurpose: '',
            masking: '',
            maskingDescription: '',
            observationalModel: '',
            timePerspective: '',
            bioSpecRetention: '',
            bioSpecDescription: '',
            samplingMethod: '',
            population: '',
            studyPopulation: '',
            samplingMethodDescription: ''
          },
          studyArms: '',
        },
        {
          id: 'fallback-2',
          nctId: 'NCT87654321',
          title: 'Advanced Cancer Immunotherapy Trial',
          officialTitle: 'Immunotherapy for Advanced Solid Tumors',
          condition: ['Lung Cancer', 'Breast Cancer'],
          phase: ['Phase 2'],
          status: 'Recruiting',
          location: {
            country: ['United States'],
            state: [],
            city: [],
            facility: []
          },
          sponsor: {
            lead: 'Memorial Sloan Kettering Cancer Center',
            leadClass: 'MSK',
            collaborators: [],
            collaboratorClasses: []
          },
          description: {
            brief: 'This clinical trial is testing innovative immunotherapy combinations for advanced solid tumors.',
            detailed: 'This clinical trial is testing innovative immunotherapy combinations for advanced solid tumors. The study aims to improve treatment outcomes for patients with limited options.'
          },
          eligibility: {
            criteria: 'Adults with advanced solid tumors who have failed standard treatments',
            ageRange: '18+ years',
            sex: 'All',
            healthyVolunteers: 'No',
            studyPopulation: '',
            samplingMethod: ''
          },
          studyType: 'Interventional',
          enrollment: { count: 200, actualCount: 0 },
          keywords: ['immunotherapy', 'cancer', 'solid tumors'],
          matchScore: 80,
          isSaved: false,
          conditionMeshTerms: [],
          dates: {
            start: '',
            completion: '',
            primaryCompletion: '',
            lastUpdated: '',
            firstPosted: '',
            resultsFirstPosted: '',
            lastVerified: ''
          },
          meshTerms: [],
          interventions: { name: [], type: [], description: [] },
          outcomes: {
            primary: { measure: [], description: [], timeFrame: [] },
            secondary: { measure: [], description: [], timeFrame: [] },
            other: { measure: [], description: [], timeFrame: [] }
          },
          studyDesign: {
            allocation: '',
            interventionModel: '',
            primaryPurpose: '',
            masking: '',
            maskingDescription: '',
            observationalModel: '',
            timePerspective: '',
            bioSpecRetention: '',
            bioSpecDescription: '',
            samplingMethod: '',
            population: '',
            studyPopulation: '',
            samplingMethodDescription: ''
          },
          studyArms: '',
        }
      ]
      
      // Filter fallback trials based on query
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
      const aiResponse: AIResponse = await aiService.processMessage(userMessage)
      let iconType: 'default' | 'website' | 'general' = 'default'
      if (aiResponse.intent === 'website') iconType = 'website'
      if (aiResponse.intent === 'general') iconType = 'general'
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: aiResponse.message,
        timestamp: new Date(),
        trials: aiResponse.trials,
        suggestions: aiResponse.suggestions,
        quickActions: aiResponse.quickActions,
        iconType
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      {/* Debug indicator - remove this after testing */}
      <div className="fixed top-4 right-4 bg-red-500 text-white p-2 rounded z-[9999] text-xs">
        Chatbot State: {isOpen ? 'OPEN' : 'CLOSED'}
      </div>

      {/* Modern Chatbot Toggle Button */}
      <div className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-[9998]">
        <div className="relative">
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center animate-pulse">
            <Search className="w-2 h-2 text-white" />
          </div>
          
          <Button
            onClick={handleToggleChatbot}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 border-4 border-white cursor-pointer"
          >
            {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          </Button>
          
          <div className="absolute inset-0 rounded-full bg-teal-500 animate-ping opacity-20"></div>
        </div>
      </div>

      {/* Modern Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-2 md:right-6 w-[calc(100vw-1rem)] md:w-96 h-[600px] md:h-[700px] bg-white rounded-3xl shadow-2xl border border-slate-200 z-[9997] flex flex-col overflow-hidden">
          {/* Modern Header */}
          <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white p-6 flex items-center gap-4 rounded-t-3xl">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Search className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Unity AI Trial Finder</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-300 rounded-full animate-pulse"></div>
                <p className="text-sm opacity-90">Online • Finding Clinical Trials</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-start gap-2 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' 
                          ? 'bg-teal-600 text-white' 
                          : 'bg-gradient-to-r from-teal-500 to-blue-600 text-white'
                      }`}>
                        {message.type === 'user' ? <User className="w-4 h-4" /> : message.iconType === 'website' ? <Info className="w-4 h-4" /> : message.iconType === 'general' ? <Brain className="w-4 h-4" /> : <Search className="w-4 h-4" />}
                      </div>
                      <div className={`rounded-2xl p-3 ${
                        message.type === 'user'
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-100 text-slate-900'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-teal-100' : 'text-slate-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>

                    {/* Trial Results */}
                    {message.trials && message.trials.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.trials.map((trial) => (
                          <Card key={trial.id} className="bg-white border border-teal-200 shadow-sm hover:shadow-md transition-shadow rounded-2xl cursor-pointer">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-semibold text-sm text-slate-900 leading-tight">{trial.title}</h4>
                                <Badge className="bg-teal-100 text-teal-700 text-xs ml-2 rounded-lg">
                                  {trial.matchScore}% match
                                </Badge>
                              </div>
                              <div className="flex gap-2 mb-2 flex-wrap">
                                {trial.condition.slice(0, 2).map((condition, index) => (
                                  <Badge key={index} className="bg-blue-100 text-blue-700 text-xs rounded-lg">
                                    {condition}
                                  </Badge>
                                ))}
                                {trial.phase.slice(0, 1).map((phase, index) => (
                                  <Badge key={index} className="bg-slate-100 text-slate-700 text-xs rounded-lg">
                                    {phase}
                                  </Badge>
                                ))}
                              </div>
                              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                                {trial.description.brief.length > 150
                                  ? trial.description.brief.substring(0, 150) + '...'
                                  : trial.description.brief}
                              </p>
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-xs rounded-xl cursor-pointer"
                                  onClick={() => window.open(`https://clinicaltrials.gov/ct2/show/${trial.nctId}`, '_blank')}
                                >
                                  View on ClinicalTrials.gov
                                </Button>
                                <Button size="sm" variant="outline" className="flex-1 border-teal-200 text-teal-600 hover:bg-teal-50 text-xs rounded-xl cursor-pointer">
                                  Check Eligibility
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}

                    {/* Quick Actions */}
                    {message.quickActions && message.quickActions.length > 0 && (
                      <div className="mt-3 grid grid-cols-2 gap-2">
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
                              className="text-xs border-teal-200 text-teal-600 hover:bg-teal-50 p-2 h-auto flex flex-col items-center gap-1 rounded-xl cursor-pointer"
                            >
                              <IconComponent className="w-4 h-4" />
                              <span className="text-center leading-tight">{action.label}</span>
                            </Button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
                      <Search className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-slate-100 rounded-2xl p-3">
                      <div className="flex items-center gap-1">
                        <Loader2 className="w-4 h-4 animate-spin text-teal-500" />
                        <span className="text-sm text-slate-500">Searching trials...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Modern Input */}
          <div className="p-4 border-t border-slate-200">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me to find clinical trials..."
                className="flex-1 border-slate-300 focus:border-teal-500 rounded-xl"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage(inputValue)
                  }
                }}
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 rounded-xl cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              Unity AI helps you find clinical trials. Always consult with healthcare professionals.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
