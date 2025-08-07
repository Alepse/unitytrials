"use client";
import { Search, Users, Target, Award, CheckCircle, Mail, Phone, Shield, MapPin, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImprovedFooter from './improved-footer';
import ChatbotFixed from './chatbot-fixed';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function FindTrialsClient() {
  const searchParams = useSearchParams();
  const [searchCondition, setSearchCondition] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Check for URL parameters on component mount
  useEffect(() => {
    const condition = searchParams.get('condition');
    const location = searchParams.get('location');
    if (condition || location) {
      setSearchCondition(condition || '');
      setSearchLocation(location || '');
      performSearch(condition || '', location || '');
    }
  }, [searchParams]);

  const performSearch = async (condition: string, location: string) => {
    if (!condition && !location) return;
    setIsLoading(true);
    setHasSearched(true);
    try {
      const params = new URLSearchParams();
      if (condition) params.append('condition', condition);
      if (location) params.append('location', location);
      const response = await fetch(`/api/trials/usa?${params.toString()}`);
      const result = await response.json();
      if (result.success) {
        setSearchResults(result.data || []);
      } else {
        console.error('Search failed:', result.error);
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchCondition, searchLocation);
  };

  // Category and featured trial data
  const trialCategories = [
    {
      category: "Cancer Studies",
      icon: Users,
      count: "150+ Active Trials",
      description: "Breakthrough treatments for various cancer types",
      color: "bg-teal-50 border-teal-200",
      iconColor: "text-teal-600"
    },
    {
      category: "Heart Disease",
      icon: Users,
      count: "85+ Active Trials", 
      description: "Cardiovascular research and prevention studies",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600"
    },
    {
      category: "Diabetes Research",
      icon: Target,
      count: "120+ Active Trials",
      description: "Type 1, Type 2, and prevention studies",
      color: "bg-slate-100 border-slate-200",
      iconColor: "text-slate-700"
    },
    {
      category: "Neurological Studies",
      icon: Users,
      count: "95+ Active Trials",
      description: "Alzheimer's, Parkinson's, and brain health",
      color: "bg-teal-50 border-teal-200",
      iconColor: "text-teal-600"
    },
    {
      category: "Mental Health",
      icon: Users,
      count: "70+ Active Trials",
      description: "Depression, anxiety, and behavioral studies",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600"
    },
    {
      category: "Rare Diseases",
      icon: Users,
      count: "45+ Active Trials",
      description: "Orphan diseases and genetic conditions",
      color: "bg-slate-100 border-slate-200",
      iconColor: "text-slate-700"
    }
  ];

  const featuredTrials = [
    {
      title: 'Phase III Diabetes Prevention Study',
      condition: 'Type 2 Diabetes',
      phase: 'Phase III',
      location: 'Multiple Locations - New York, California, Texas, Florida',
      duration: '12 months',
      participants: '2,500 participants needed',
      status: 'Recruiting',
      description: 'This study evaluates a new medication for preventing Type 2 diabetes in high-risk individuals. The purpose is to determine if the investigational drug can delay or prevent the onset of Type 2 diabetes in adults with prediabetes.',
      eligibility: {
        inclusion: ['Age 18-65 years', 'Diagnosed with prediabetes', 'BMI 25-40 kg/m²', 'Stable weight for 3 months'],
        exclusion: ['Current diabetes diagnosis', 'Pregnancy', 'Severe kidney disease', 'Recent heart attack']
      },
      intervention: 'Investigational diabetes prevention medication vs. placebo',
      sponsor: 'National Institute of Health',
      contact: 'Dr. Sarah Johnson - (555) 123-4567',
      nctNumber: 'NCT12345678',
      matchScore: 95
    },
    {
      title: 'Cardiovascular Health Research Study',
      condition: 'Heart Disease',
      phase: 'Phase II',
      location: 'Major Medical Centers - Boston, Chicago, Los Angeles, Miami',
      duration: '18 months',
      participants: '1,200 participants needed',
      status: 'Recruiting',
      description: 'Testing innovative treatment approaches for cardiovascular disease prevention in adults with risk factors. This study aims to evaluate the safety and effectiveness of a new heart medication.',
      eligibility: {
        inclusion: ['Age 45-75 years', 'History of heart disease or risk factors', 'Stable condition for 6 months', 'Able to exercise'],
        exclusion: ['Recent heart surgery', 'Uncontrolled blood pressure', 'Severe heart failure', 'Pregnancy']
      },
      intervention: 'New cardiovascular medication plus lifestyle counseling',
      sponsor: 'American Heart Association',
      contact: 'Dr. Michael Chen - (555) 987-6543',
      nctNumber: 'NCT87654321',
      matchScore: 88
    },
    {
      title: 'Advanced Cancer Immunotherapy Trial',
      condition: 'Lung Cancer',
      phase: 'Phase I/II',
      location: 'Leading Cancer Centers - MD Anderson, Mayo Clinic, Johns Hopkins',
      duration: '24 months',
      participants: '800 participants needed',
      status: 'Recruiting',
      description: 'Investigating new immunotherapy combinations for advanced lung cancer treatment. This study tests whether combining two immunotherapy drugs is more effective than standard treatment.',
      eligibility: {
        inclusion: ['Age 18+ years', 'Advanced non-small cell lung cancer', 'Previous treatment with standard therapy', 'Good performance status'],
        exclusion: ['Active autoimmune disease', 'Previous immunotherapy', 'Severe organ dysfunction', 'Active infections']
      },
      intervention: 'Combination immunotherapy (Drug A + Drug B) vs. standard care',
      sponsor: 'Cancer Research Institute',
      contact: 'Dr. Maria Rodriguez - (555) 456-7890',
      nctNumber: 'NCT11223344',
      matchScore: 92
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 to-teal-200">
      {/* Modern Hero Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="bg-teal-100 text-teal-700 border-teal-200 mb-4 rounded-lg">
              🔍 Advanced Trial Search
            </Badge>
            <h1 className="text-6xl font-bold text-slate-900 mb-6">
              Find Clinical Trials
              <br />
              <span className="text-teal-600">That Match Your Needs</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Search through thousands of clinical trials using our advanced matching system. 
              Find studies by condition, location, trial phase, and eligibility criteria.
            </p>
          </div>

          {/* Modern Search Form */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-slate-200 max-w-6xl mx-auto rounded-3xl">
            <CardContent className="p-8">
              <form onSubmit={handleSearch} className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-slate-700 mb-3">Search USA Clinical Trials</label>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="condition" className="block text-sm font-medium text-slate-700 mb-2">
                        Medical Condition
                      </label>
                      <Input 
                        id="condition"
                        value={searchCondition}
                        onChange={(e) => setSearchCondition(e.target.value)}
                        placeholder="Enter condition, disease, or drug name (e.g., diabetes, cancer, heart disease)" 
                        className="border-slate-300 h-12 text-lg rounded-xl" 
                      />
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-2">
                        Location (USA Only)
                      </label>
                      <Input 
                        id="location"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        placeholder="Enter city, state, or ZIP code" 
                        className="border-slate-300 h-12 text-lg rounded-xl" 
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-8 h-12 rounded-xl w-full md:w-auto"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5 mr-2" />
                        Search USA Trials
                      </>
                    )}
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Popular Searches</label>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      type="button"
                      variant="outline" 
                      size="sm" 
                      className="border-teal-200 text-teal-600 hover:bg-teal-50 rounded-lg"
                      onClick={() => performSearch('diabetes', '')}
                    >
                      Diabetes
                    </Button>
                    <Button 
                      type="button"
                      variant="outline" 
                      size="sm" 
                      className="border-blue-200 text-blue-600 hover:bg-blue-50 rounded-lg"
                      onClick={() => performSearch('cancer', '')}
                    >
                      Cancer
                    </Button>
                    <Button 
                      type="button"
                      variant="outline" 
                      size="sm" 
                      className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg"
                      onClick={() => performSearch('heart disease', '')}
                    >
                      Heart Disease
                    </Button>
                    <Button 
                      type="button"
                      variant="outline" 
                      size="sm" 
                      className="border-teal-200 text-teal-600 hover:bg-teal-50 rounded-lg"
                      onClick={() => performSearch('alzheimer', '')}
                    >
                      Alzheimer's
                    </Button>
                    <Button 
                      type="button"
                      variant="outline" 
                      size="sm" 
                      className="border-blue-200 text-blue-600 hover:bg-blue-50 rounded-lg"
                      onClick={() => performSearch('depression', '')}
                    >
                      Depression
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Search Results */}
      {hasSearched && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                {isLoading ? 'Searching...' : `Search Results (${searchResults.length} trials found)`}
              </h2>
              {(searchCondition || searchLocation) && (
                <p className="text-lg text-slate-600">
                  Showing results for: 
                  {searchCondition && <span className="font-semibold text-teal-600"> {searchCondition}</span>}
                  {searchLocation && <span className="font-semibold text-blue-600"> in {searchLocation}</span>}
                  <span className="text-slate-500"> (USA only)</span>
                </p>
              )}
            </div>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
                <span className="ml-3 text-lg text-slate-600">Searching clinical trials...</span>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-6">
                {searchResults.map((trial, index) => (
                  <Card key={index} className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-900 mb-2">{trial.BriefTitle || trial.OfficialTitle || 'Clinical Trial'}</h3>
                          <div className="flex gap-2 mb-3">
                            {trial.Condition && (
                              <Badge className="bg-teal-100 text-teal-700 rounded-lg">
                                {Array.isArray(trial.Condition) ? trial.Condition[0] : trial.Condition}
                              </Badge>
                            )}
                            {trial.Phase && (
                              <Badge className="bg-blue-100 text-blue-700 rounded-lg">
                                {Array.isArray(trial.Phase) ? trial.Phase.join(', ') : trial.Phase}
                              </Badge>
                            )}
                            {trial.Status && (
                              <Badge className="bg-slate-100 text-slate-700 rounded-lg">
                                {trial.Status}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-slate-500">NCT ID</div>
                          <div className="font-mono text-sm font-semibold text-slate-700">{trial.NCTId}</div>
                        </div>
                      </div>
                      {trial.BriefSummary && (
                        <p className="text-slate-700 mb-4 line-clamp-3">
                          {trial.BriefSummary}
                        </p>
                      )}
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        {trial.LocationCountry && (
                          <div>
                            <span className="font-medium text-slate-700">Location:</span>
                            <span className="ml-1 text-slate-600">
                              {Array.isArray(trial.LocationCountry) ? trial.LocationCountry.join(', ') : trial.LocationCountry}
                            </span>
                          </div>
                        )}
                        {trial.EnrollmentCount && (
                          <div>
                            <span className="font-medium text-slate-700">Enrollment:</span>
                            <span className="ml-1 text-slate-600">{trial.EnrollmentCount}</span>
                          </div>
                        )}
                        {trial.LeadSponsorName && (
                          <div>
                            <span className="font-medium text-slate-700">Sponsor:</span>
                            <span className="ml-1 text-slate-600">{trial.LeadSponsorName}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-3 mt-4">
                        <Button 
                          size="sm"
                          className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg"
                          onClick={() => window.open(`https://clinicaltrials.gov/ct2/show/${trial.NCTId}`, '_blank')}
                        >
                          <Search className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button 
                          size="sm"
                          variant="outline" 
                          className="border-teal-200 text-teal-600 hover:bg-teal-50 rounded-lg"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Check Eligibility
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : hasSearched ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No trials found</h3>
                <p className="text-slate-600 mb-6">
                  Try adjusting your search criteria or browse our featured trials below.
                </p>
                <Button 
                  onClick={() => {
                    setSearchCondition('');
                    setSearchLocation('');
                    setHasSearched(false);
                    setSearchResults([]);
                  }}
                  className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg"
                >
                  Clear Search
                </Button>
              </div>
            ) : null}
          </div>
        </section>
      )}

      {/* Browse by Category */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-slate-900 mb-6">Browse Trials by Category</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Explore clinical trials organized by medical condition and research area.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trialCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index} className={`${category.color} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer rounded-2xl`}>
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md`}>
                      <IconComponent className={`w-8 h-8 ${category.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{category.category}</h3>
                    <Badge className="mb-3 bg-white/80 text-slate-700 rounded-lg">{category.count}</Badge>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">{category.description}</p>
                    <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl">
                      View Trials
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Trials */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-5xl font-bold text-slate-900 mb-4">Featured Clinical Trials</h2>
              <p className="text-xl text-slate-600">High-priority studies currently recruiting participants</p>
            </div>
            <Badge className="bg-teal-100 text-teal-700 text-lg px-4 py-2 rounded-lg">
              {featuredTrials.length} Featured Trials
            </Badge>
          </div>
          <div className="space-y-8">
            {featuredTrials.map((trial, index) => (
              <Card key={index} className="bg-white border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-2xl font-bold text-slate-900">{trial.title}</h3>
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-semibold text-slate-700">{trial.matchScore}% Match</span>
                            </div>
                          </div>
                          <div className="flex gap-2 mb-4">
                            <Badge className="bg-teal-100 text-teal-700 rounded-lg">{trial.condition}</Badge>
                            <Badge className="bg-blue-100 text-blue-700 rounded-lg">{trial.phase}</Badge>
                            <Badge className="bg-slate-100 text-slate-700 rounded-lg">{trial.status}</Badge>
                          </div>
                        </div>
                      </div>
                      <p className="text-slate-700 leading-relaxed mb-6">{trial.description}</p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-teal-500" />
                            Key Details
                          </h4>
                          <ul className="space-y-2 text-sm text-slate-600">
                            <li className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-teal-500" />
                              {trial.location}
                            </li>
                            <li className="flex items-center gap-2">
                              {trial.duration}
                            </li>
                            <li className="flex items-center gap-2">
                              <Users className="w-5 h-5 text-slate-700" />
                              {trial.participants}
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-3">Quick Eligibility Check</h4>
                          <div className="space-y-2">
                            {trial.eligibility.inclusion.slice(0, 3).map((criteria, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                                <CheckCircle className="w-4 h-4 text-teal-500" />
                                <span>{criteria}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-1">
                      <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-6 h-full flex flex-col justify-between border border-teal-200">
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <Award className="w-5 h-5 text-teal-600" />
                            <span className="font-semibold text-slate-900">Sponsored by</span>
                          </div>
                          <p className="text-sm text-slate-700 mb-6">{trial.sponsor}</p>
                          <div className="flex items-center gap-2 mb-4">
                            <Shield className="w-5 h-5 text-blue-600" />
                            <span className="text-sm font-semibold text-slate-700">NCT: {trial.nctNumber}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl">
                            <Search className="w-4 h-4 mr-2" />
                            Learn More
                          </Button>
                          <Button variant="outline" className="w-full border-teal-200 text-teal-600 hover:bg-teal-50 rounded-xl">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Check Eligibility
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-teal-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6">Can't Find What You're Looking For?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Our AI-powered chatbot can help you find clinical trials that match your specific needs. 
            Get personalized recommendations in real-time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-teal-600 hover:bg-slate-100 px-8 py-4 text-lg rounded-xl">
              <Search className="w-5 h-5 mr-2" />
              Try AI Trial Finder
            </Button>
            <Button size="lg" variant="outline" className="border-white text-teal-600 hover:bg-white hover:text-blue-800 px-8 py-4 text-lg rounded-xl">
              <Users className="w-5 h-5 mr-2" />
              Speak with Coordinator
            </Button>
          </div>
        </div>
      </section>

      <ImprovedFooter />
      <ChatbotFixed />
    </div>
  );
}