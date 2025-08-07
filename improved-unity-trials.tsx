import { Search, MapPin, Users, Target, CheckCircle, ArrowRight, Mail, Phone, Shield, Heart, Star, Play, ChevronDown, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from 'react'

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">UnityTrials.org</h1>
                <p className="text-xs text-gray-500">Clinical Trial Signup Made Easy</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Find Clinical Trials</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Types of Trials</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Resources</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About</a>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                <Phone className="w-4 h-4 mr-2" />
                Talk to Us
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-sm font-semibold px-4 py-2">
                  🏥 Trusted Healthcare Partner
                </Badge>
                <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                  Your Partner in Health,
                  <br />
                  For <span className="text-orange-500">A Unity of Care</span> and
                  <br />
                  <span className="text-blue-600">Research</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  We help connect individuals and diverse populations to appropriate clinical trial opportunities, advancing medical research for everyone.
                </p>
              </div>

              {/* Enhanced Email Signup */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Get Trial Updates</h3>
                </div>
                <p className="text-gray-600 mb-4 text-sm">
                  Be the first to know about clinical trials that match your profile.
                </p>
                <div className="flex gap-3">
                  <Input 
                    placeholder="Enter your email address" 
                    className="flex-1 border-gray-300 focus:border-blue-500"
                  />
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6">
                    Notify Me
                  </Button>
                </div>
                <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>HIPAA Compliant</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Secure & Private</span>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">10K+</div>
                  <div className="text-sm text-gray-600">Patients Connected</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">500+</div>
                  <div className="text-sm text-gray-600">Active Trials</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">95%</div>
                  <div className="text-sm text-gray-600">Satisfaction Rate</div>
                </div>
              </div>
            </div>

            {/* Enhanced Doctor Image */}
            <div className="relative">
              <div className="relative">
                <div className="w-80 h-80 mx-auto rounded-full overflow-hidden border-8 border-white shadow-2xl">
                  <img 
                    src="/black-male-doctor-smiling.png" 
                    alt="Professional healthcare provider"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg">
                  <Shield className="w-6 h-6 text-green-500" />
                </div>
                <div className="absolute top-1/2 -right-8 bg-blue-500 text-white rounded-full p-2 shadow-lg">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              {/* Background Elements */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-50"></div>
                <div className="absolute bottom-10 right-10 w-16 h-16 bg-orange-200 rounded-full opacity-50"></div>
                <div className="absolute top-1/2 left-0 w-12 h-12 bg-purple-200 rounded-full opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-4">
              🇺🇸 Nationwide Coverage
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Patient Recruitment for Clinical Trials
              <br />
              <span className="text-blue-600">Across the United States</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We help people — both healthy individuals and those suffering from specific conditions — find clinical trials that could change their lives, advancing medical research for everyone.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Map */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl p-8 shadow-lg">
                <img 
                  src="/us-clinical-trials.png" 
                  alt="United States map showing clinical trial locations"
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute top-4 left-4 bg-white rounded-lg px-3 py-2 shadow-md">
                  <div className="text-sm font-semibold text-gray-900">UNITED STATES OF AMERICA</div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">50</div>
                    <div className="text-sm text-gray-600">States Covered</div>
                  </CardContent>
                </Card>
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">1,200+</div>
                    <div className="text-sm text-gray-600">Research Centers</div>
                  </CardContent>
                </Card>
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">25K+</div>
                    <div className="text-sm text-gray-600">Participants Matched</div>
                  </CardContent>
                </Card>
                <Card className="bg-orange-50 border-orange-200">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">100+</div>
                    <div className="text-sm text-gray-600">Medical Conditions</div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Why Choose UnityTrials?</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Free matching service</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>HIPAA compliant platform</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Dedicated patient support</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Diverse trial opportunities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200 mb-4">
              🔬 Our Mission
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Advancing Healthcare Through
              <br />
              <span className="text-indigo-600">Inclusive Research</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connecting diverse patient populations with groundbreaking clinical trials through innovative 
              matching technology and inclusive enrollment practices.
            </p>
          </div>

          {/* Enhanced Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-orange-400 to-blue-500 rounded-full"></div>
            
            <div className="space-y-16">
              {/* Step 1 */}
              <div className="flex items-center gap-8">
                <div className="flex-1 text-right">
                  <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center justify-end gap-3">
                        <CardTitle className="text-xl text-orange-900">Broadening Trial Eligibility Criteria</CardTitle>
                        <div className="p-3 bg-orange-100 rounded-full">
                          <Target className="w-6 h-6 text-orange-600" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Despite the Federal Drug Administration (FDA) promoting enrollment practices for clinical trials to better reflect the 
                        population most likely to use a drug if approved, challenges to participation remain and certain groups continue to be underrepresented.
                      </p>
                      <div className="flex justify-end gap-2">
                        <Badge className="bg-orange-100 text-orange-700">FDA Guidelines</Badge>
                        <Badge className="bg-gray-100 text-gray-700">Inclusion Focus</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl z-10 shadow-xl">
                  1
                </div>
                
                <div className="flex-1"></div>
              </div>

              {/* Step 2 */}
              <div className="flex items-center gap-8">
                <div className="flex-1"></div>
                
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl z-10 shadow-xl">
                  2
                </div>
                
                <div className="flex-1">
                  <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 rounded-full">
                          <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-xl text-blue-900">Enrolling Underrepresented Populations</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Clinicians and researchers</span> must carefully 
                        consider inclusion or exclusion criteria for their clinical trials in order to align with FDA enrollment practices guidance. 
                        Unity Trials helps connect people with the appropriate research.
                      </p>
                      <div className="flex gap-2">
                        <Badge className="bg-blue-100 text-blue-700">Unity Trials</Badge>
                        <Badge className="bg-gray-100 text-gray-700">Diversity Focus</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-lg">
              <Search className="w-5 h-5 mr-2" />
              Find Your Clinical Trial Match
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
