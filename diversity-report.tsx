import { TrendingDown, Users, BarChart3, AlertTriangle, ExternalLink, Quote, PieChart, Target } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200 text-lg px-4 py-2">
                Critical Healthcare Gap
              </Badge>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Clinical Trial Diversity Crisis</h1>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Examining the significant underrepresentation of minorities in clinical research and its impact on
              healthcare equity across America.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* First Statistic - NIH Finding */}
        <div className="mb-20">
          <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0 min-h-[500px]">
                {/* Visual Data Section */}
                <div className="bg-gradient-to-br from-red-500 to-orange-600 p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
                    <div className="absolute bottom-10 right-10 w-24 h-24 border-4 border-white rounded-full"></div>
                    <div className="absolute top-1/2 left-1/4 w-16 h-16 border-4 border-white rounded-full"></div>
                  </div>

                  <div className="text-center z-10">
                    <TrendingDown className="w-16 h-16 mb-6 mx-auto" />
                    <div className="text-8xl font-bold mb-4">30%</div>
                    <div className="text-2xl font-semibold mb-4">Maximum Minority Representation</div>
                    <div className="text-lg opacity-90">in NIH-sponsored clinical trials</div>
                  </div>

                  {/* Visual representation */}
                  <div className="mt-8 flex gap-2">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className={`w-4 h-12 rounded-full ${i < 3 ? "bg-white" : "bg-white/30"}`} />
                    ))}
                  </div>
                  <div className="text-sm mt-2 opacity-75">Visual representation of participation rates</div>
                </div>

                {/* Content Section */}
                <div className="p-12 flex flex-col justify-center bg-white">
                  <div className="flex items-center gap-3 mb-8">
                    <Badge className="bg-red-100 text-red-700 border-red-200 text-lg px-4 py-2 font-semibold">
                      NIH Research Findings
                    </Badge>
                  </div>

                  <Quote className="w-12 h-12 text-gray-300 mb-6" />
                  <blockquote className="text-2xl font-medium text-gray-900 leading-relaxed mb-8">
                    "A report found minorities represented less than 30% of enrollees in clinical trials sponsored by
                    the National Institutes of Health (NIH)."
                  </blockquote>

                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Research Citation</h4>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      Pinn V.W., Roth C., et al. Monitoring Adherence to the NIH Policy on the Inclusion of Women and
                      Minorities as Subjects in Clinical Research. National Institutes of Health, 2009.
                    </p>
                    <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Access Full Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Second Statistic - Population Disparity */}
        <div className="mb-20">
          <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-bl from-blue-50 via-indigo-50 to-purple-50">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0 min-h-[500px]">
                {/* Content Section */}
                <div className="p-12 flex flex-col justify-center bg-white order-2 lg:order-1">
                  <div className="flex items-center gap-3 mb-8">
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-lg px-4 py-2 font-semibold">
                      Population Analysis
                    </Badge>
                  </div>

                  <Quote className="w-12 h-12 text-gray-300 mb-6" />
                  <blockquote className="text-2xl font-medium text-gray-900 leading-relaxed mb-8">
                    "While racially and ethnically diverse consumers make up nearly 40% of the population, about 80% of
                    clinical trial participants are white."
                  </blockquote>

                  <div className="space-y-6 mb-8">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-semibold text-gray-700">US Diverse Population</span>
                        <span className="text-2xl font-bold text-blue-600">40%</span>
                      </div>
                      <Progress value={40} className="h-4" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-semibold text-gray-700">White Trial Participants</span>
                        <span className="text-2xl font-bold text-orange-600">80%</span>
                      </div>
                      <Progress value={80} className="h-4" />
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Research Source</h4>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      Scientific American. Clinical Trials Have far too Little Racial and Ethnic Diversity. September
                      2018.
                    </p>
                    <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Read Full Article
                    </Button>
                  </div>
                </div>

                {/* Visual Data Section */}
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-12 flex flex-col justify-center items-center text-white relative overflow-hidden order-1 lg:order-2">
                  <div className="absolute inset-0 opacity-10">
                    <PieChart className="absolute top-10 right-10 w-32 h-32" />
                    <BarChart3 className="absolute bottom-10 left-10 w-24 h-24" />
                    <Target className="absolute top-1/3 left-1/3 w-16 h-16" />
                  </div>

                  <div className="text-center z-10 mb-8">
                    <Users className="w-16 h-16 mb-6 mx-auto" />
                    <div className="text-6xl font-bold mb-4">40% vs 80%</div>
                    <div className="text-xl font-semibold mb-2">Population vs Participation</div>
                    <div className="text-lg opacity-90">The representation gap</div>
                  </div>

                  {/* Visual comparison */}
                  <div className="flex gap-8 items-end">
                    <div className="text-center">
                      <div className="w-16 h-24 bg-white rounded-t-lg mb-2"></div>
                      <div className="text-sm">Population</div>
                      <div className="text-lg font-bold">40%</div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-48 bg-white rounded-t-lg mb-2"></div>
                      <div className="text-sm">Trials</div>
                      <div className="text-lg font-bold">80%</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Impact Statement */}
        <div className="text-center mb-16">
          <Card className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border-0 shadow-2xl">
            <CardContent className="p-16">
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-center mb-8">
                  <div className="p-4 bg-white/10 rounded-full">
                    <Users className="w-16 h-16 text-blue-400" />
                  </div>
                </div>
                <h2 className="text-4xl font-bold mb-6">The Path Forward</h2>
                <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                  These statistics reveal a critical healthcare equity issue. When clinical trials don't reflect our
                  diverse population, the resulting treatments may not work effectively for everyone. It's time for
                  systemic change in how we approach clinical research enrollment.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4">
                    Explore Solutions
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent text-lg px-8 py-4"
                  >
                    View More Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
