import { Users, Target, CheckCircle, ArrowRight, AlertCircle, FileText, Heart, Shield, TrendingUp, Lightbulb, BookOpen, Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Approach 1: Interactive Timeline */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Approach 1: Interactive Process Timeline</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            
            <div className="space-y-12">
              {/* Step 1 */}
              <div className="flex items-center gap-8">
                <div className="flex-1 text-right">
                  <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-end gap-3">
                        <CardTitle className="text-xl text-blue-900">Broadening Trial Eligibility Criteria</CardTitle>
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Target className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">
                        Despite the Federal Drug Administration (FDA) promoting enrollment practices for clinical trials to better reflect the 
                        population most likely to use a drug if approved, challenges to participation remain and certain groups continue to be underrepresented.
                      </p>
                      <div className="mt-4 flex justify-end">
                        <Badge className="bg-blue-100 text-blue-700">FDA Guidelines</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg z-10 shadow-lg">
                  1
                </div>
                
                <div className="flex-1"></div>
              </div>

              {/* Step 2 */}
              <div className="flex items-center gap-8">
                <div className="flex-1"></div>
                
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg z-10 shadow-lg">
                  2
                </div>
                
                <div className="flex-1">
                  <Card className="bg-white/80 backdrop-blur-sm border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-full">
                          <Users className="w-6 h-6 text-purple-600" />
                        </div>
                        <CardTitle className="text-xl text-purple-900">Enrolling Underrepresented Populations</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">
                        <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Clinicians and researchers</span> must carefully 
                        consider inclusion or exclusion criteria for their clinical trials in order to align with FDA enrollment practices guidance. 
                        Unity Trials helps connect people with the appropriate research.
                      </p>
                      <div className="mt-4">
                        <Badge className="bg-purple-100 text-purple-700">Unity Trials Solution</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Approach 2: Problem-Solution Framework */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Approach 2: Problem-Solution Framework</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Problem Side */}
            <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200 shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                  <CardTitle className="text-2xl text-red-900">The Challenge</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-white/80 rounded-lg p-6 border border-red-200">
                  <h3 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Eligibility Barriers
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Despite FDA promoting enrollment practices for clinical trials to better reflect the population most likely to use a drug if approved, 
                    challenges to participation remain and certain groups continue to be underrepresented.
                  </p>
                </div>
                
                <div className="bg-white/80 rounded-lg p-6 border border-red-200">
                  <h3 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Representation Gap
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Traditional enrollment criteria often exclude diverse populations, leading to research results that may not apply to everyone who will use the treatment.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Solution Side */}
            <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200 shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <CardTitle className="text-2xl text-green-900">The Solution</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-white/80 rounded-lg p-6 border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Inclusive Criteria Design
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="text-blue-600 font-semibold">Clinicians and researchers</span> must carefully consider inclusion or exclusion criteria 
                    for their clinical trials in order to align with FDA enrollment practices guidance.
                  </p>
                </div>
                
                <div className="bg-white/80 rounded-lg p-6 border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Unity Trials Connection
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Unity Trials helps connect people with the appropriate research, bridging the gap between diverse populations and clinical opportunities.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Approach 3: Interactive Tabs with Statistics */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Approach 3: Interactive Knowledge Hub</h2>
          <Tabs defaultValue="eligibility" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="eligibility" className="text-lg py-3">
                <Target className="w-5 h-5 mr-2" />
                Eligibility Criteria
              </TabsTrigger>
              <TabsTrigger value="enrollment" className="text-lg py-3">
                <Users className="w-5 h-5 mr-2" />
                Population Enrollment
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="eligibility" className="space-y-6">
              <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Broadening Trial Eligibility Criteria</h3>
                      <p className="text-blue-100 leading-relaxed mb-6">
                        Despite the Federal Drug Administration (FDA) promoting enrollment practices for clinical trials to better reflect the 
                        population most likely to use a drug if approved, challenges to participation remain and certain groups continue to be underrepresented.
                      </p>
                      <Button className="bg-white text-blue-600 hover:bg-blue-50">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Learn More About FDA Guidelines
                      </Button>
                    </div>
                    <div className="text-center">
                      <div className="bg-white/20 rounded-full p-8 inline-block mb-4">
                        <Target className="w-16 h-16" />
                      </div>
                      <div className="text-4xl font-bold mb-2">FDA</div>
                      <div className="text-blue-200">Enrollment Guidelines</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="enrollment" className="space-y-6">
              <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Enrolling Underrepresented Populations</h3>
                      <p className="text-purple-100 leading-relaxed mb-6">
                        <span className="text-yellow-300 font-semibold">Clinicians and researchers</span> must carefully consider inclusion or exclusion criteria 
                        for their clinical trials in order to align with FDA enrollment practices guidance. Unity Trials helps connect people with the appropriate research.
                      </p>
                      <Button className="bg-white text-purple-600 hover:bg-purple-50">
                        <Search className="w-4 h-4 mr-2" />
                        Find Trials with Unity Trials
                      </Button>
                    </div>
                    <div className="text-center">
                      <div className="bg-white/20 rounded-full p-8 inline-block mb-4">
                        <Users className="w-16 h-16" />
                      </div>
                      <div className="text-4xl font-bold mb-2">Unity</div>
                      <div className="text-purple-200">Trials Platform</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Approach 4: Infographic Style */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Approach 4: Visual Infographic</h2>
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              
              {/* Current State */}
              <div className="text-center">
                <div className="bg-red-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <AlertCircle className="w-12 h-12 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-red-900 mb-3">Current Challenge</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Despite FDA guidelines, certain groups remain underrepresented in clinical trials
                </p>
                <div className="mt-4">
                  <Progress value={30} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">30% diverse representation</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <ArrowRight className="w-12 h-12 text-blue-500" />
              </div>

              {/* Solution */}
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-900 mb-3">Unity Trials Solution</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Connecting diverse populations with appropriate clinical research opportunities
                </p>
                <div className="mt-4">
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">Target: 75% representation</p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Broadening Eligibility
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    FDA promotes enrollment practices to better reflect the population most likely to use approved drugs, 
                    yet participation challenges persist.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-purple-900 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Inclusive Enrollment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Researchers must align inclusion/exclusion criteria with FDA guidance while Unity Trials facilitates connections.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
