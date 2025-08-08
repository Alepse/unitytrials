"use client"

import { Search, Users, Target, CheckCircle, Shield, Award, FileText, MapPin, TrendingUp, Heart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import TestimonialsSection from '../components/testimonials-section'
import ImprovedFooter from '../components/improved-footer'
import ChatbotFixed from '../components/chatbot-fixed'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-200 to-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-teal-100 text-teal-700 border-teal-200 px-3 py-1 text-sm font-medium">
                  AI-Powered Matching
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  Find Your Perfect{' '}
                  <span className="text-teal-600">Clinical Trial</span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Connect with life-changing clinical trials across the United States. Our AI-powered platform matches you with the right studies for your condition.
                </p>
              </div>

              {/* Search Input */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input 
                      placeholder="Enter medical condition..." 
                      className="border-0 text-lg focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div className="flex-1">
                    <Input 
                      placeholder="Enter location (USA only)..." 
                      className="border-0 text-lg focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <Button className="w-full md:w-auto bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <Search className="w-5 h-5 mr-2" />
                    Search Trials
                  </Button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Free to use</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span>Privacy protected</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-500" />
                  <span>FDA approved trials</span>
                </div>
              </div>
            </div>

            {/* Right Content - Doctor Image Only */}
            <div className="flex items-center justify-center">
              <img src="/doctor.svg" alt="Doctor" className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 object-contain mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics and Map Section */}
      <section className="py-20 bg-gradient-to-br from-slate-200 to-blue-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - USA Map */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 flex flex-col items-center justify-center">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">UNITED STATES OF AMERICA</h3>
                <p className="text-slate-600">Clinical trial locations across all 50 states</p>
              </div>
              <img src="/map.svg" alt="USA Map" className="w-full max-w-md mx-auto" />
            </div>

            {/* Right Side - Statistics Grid */}
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-green-700 mb-2">50</div>
                    <div className="text-sm text-green-600 font-medium">States Covered</div>
                  </CardContent>
                </Card>
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-blue-700 mb-2">1,200+</div>
                    <div className="text-sm text-blue-600 font-medium">Research Centers</div>
                  </CardContent>
                </Card>
                <Card className="border-slate-200 bg-slate-50">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-slate-700 mb-2">25K+</div>
                    <div className="text-sm text-slate-600 font-medium">Participants</div>
                  </CardContent>
                </Card>
                <Card className="border-teal-200 bg-teal-50">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-teal-700 mb-2">100+</div>
                    <div className="text-sm text-teal-600 font-medium">Conditions</div>
                  </CardContent>
                </Card>
              </div>

              {/* Why Choose UnityTrials */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Why Choose UnityTrials?</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700">Free trial matching service</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-blue-500" />
                    <span className="text-slate-700">HIPAA compliant platform</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-teal-500" />
                    <span className="text-slate-700">Advanced matching algorithm</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-purple-500" />
                    <span className="text-slate-700">Diverse trial opportunities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="bg-slate-100 text-slate-700 border-slate-200 px-3 py-1 text-sm font-medium mb-4">
              Our Mission
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Advancing Healthcare Through{' '}
              <span className="text-blue-700">Inclusive Research</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Connecting diverse patient populations with groundbreaking clinical trials through innovative matching technology and inclusive enrollment practices.
            </p>
          </div>

          {/* Process Flowchart */}
          <div className="relative max-w-4xl mx-auto">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 to-blue-500 transform -translate-x-1/2"></div>
            
            {/* Step 1 */}
            <div className="relative flex flex-col md:flex-row items-start gap-6 mb-12">
              <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg z-10">
                1
              </div>
              <Card className="border-teal-200 bg-teal-50 flex-1">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-slate-900">Broadening Trial Eligibility Criteria</h4>
                    <Target className="w-6 h-6 text-teal-600" />
                  </div>
                  <p className="text-slate-700 mb-4">
                    Despite FDA promoting enrollment practices for clinical trials to better reflect the population most likely to use a drug if approved, challenges to participation remain.
                  </p>
                  <div className="flex gap-2">
                    <Badge className="bg-teal-100 text-teal-700 border-teal-200">FDA Guidelines</Badge>
                    <Badge className="bg-teal-100 text-teal-700 border-teal-200">Inclusion Focus</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col md:flex-row items-start gap-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg z-10">
                2
              </div>
              <Card className="border-blue-200 bg-blue-50 flex-1">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-slate-900">Enrolling Underrepresented Populations</h4>
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-slate-700 mb-4">
                    Clinicians and researchers must carefully consider inclusion criteria to align with FDA guidance. Unity Trials helps connect people with appropriate research.
                  </p>
                  <div className="flex gap-2">
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">Unity Trials</Badge>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">Diversity Focus</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-12">
            <Button className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Search className="w-5 h-5 mr-2" />
              Find Your Clinical Trial Match
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-teal-500 to-blue-600">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Find Your Clinical Trial Match
            </h2>
            <p className="text-xl text-teal-100 leading-relaxed">
              Join thousands of participants who have found life-changing clinical trials through our platform.
            </p>
            <Button className="bg-white text-teal-600 hover:bg-slate-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Search className="w-5 h-5 mr-2" />
              Start Your Search
            </Button>
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <ImprovedFooter />
      <ChatbotFixed />
    </div>
  )
}
