import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter, Heart, Shield, Users, FileText, HelpCircle, Calendar, Star, Award } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function ImprovedFooter() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <img 
                  src="/unity.svg" 
                  alt="UnityTrials Logo" 
                  className="h-16 w-auto"
                />
                
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed max-w-md">
              Connecting patients with life-changing clinical trials through innovative matching technology and 
              inclusive enrollment practices. Making healthcare research accessible to everyone.
            </p>

            {/* Newsletter Signup */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-5 h-5 text-teal-400" />
                <h4 className="text-lg font-semibold">Get Updates</h4>
              </div>
              <p className="text-slate-300 mb-4 text-sm">
                We'll email you about the latest clinical trials and healthcare research opportunities.
              </p>
              <div className="flex gap-2">
                <Input 
                  placeholder="E-mail address" 
                  className="bg-white/20 border-white/30 text-white placeholder:text-slate-300 focus:border-teal-400 rounded-xl"
                />
                <Button className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold px-6 rounded-xl">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
                <Shield className="w-4 h-4 text-teal-400" />
                <span className="text-sm">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
                <Award className="w-4 h-4 text-blue-400" />
                <span className="text-sm">FDA Approved</span>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
            <nav className="space-y-3">
              <a href="#" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors group">
                <FileText className="w-4 h-4 group-hover:text-teal-400" />
                Clinical Trial Guide
              </a>
              <a href="#" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors group">
                <HelpCircle className="w-4 h-4 group-hover:text-teal-400" />
                FAQ
              </a>
              <a href="#" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors group">
                <Calendar className="w-4 h-4 group-hover:text-teal-400" />
                Trial Calendar
              </a>
            </nav>
          </div>

          {/* Contact & Support */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white mb-4">Contact & Support</h4>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-300">
                <Phone className="w-5 h-5 text-teal-400" />
                <div>
                  <p className="font-medium text-white">1-800-UNITY-TRIAL</p>
                  <p className="text-sm">Mon-Fri, 8AM-6PM EST</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="w-5 h-5 text-teal-400" />
                <div>
                  <p className="font-medium text-white">support@unitytrials.org</p>
                  <p className="text-sm">24/7 email support</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-slate-300">
                <MapPin className="w-5 h-5 text-teal-400" />
                <div>
                  <p className="font-medium text-white">Nationwide Coverage</p>
                  <p className="text-sm">Serving all 50 states</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <h5 className="font-semibold text-white mb-2">Talk to Us</h5>
              <p className="text-sm text-slate-300 mb-3">
                Our patient advocates are here to guide you through the clinical trial process.
              </p>
              <Button variant="outline" size="sm" className="border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-white rounded-xl">
                Get Support
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright & Legal */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-slate-400">
              <p>© 2025 UNITY TRIALS LLC. All rights reserved.</p>
              <div className="flex gap-4">

              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-400">Follow us:</span>
              <div className="flex gap-3">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-teal-600 transition-colors group"
                >
                  <Facebook className="w-5 h-5 text-slate-300 group-hover:text-white" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-teal-600 transition-colors group"
                >
                  <Linkedin className="w-5 h-5 text-slate-300 group-hover:text-white" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-teal-600 transition-colors group"
                >
                  <Twitter className="w-5 h-5 text-slate-300 group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
