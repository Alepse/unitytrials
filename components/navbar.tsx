'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Image 
              src="/unity.svg" 
              alt="UnityTrials Logo" 
              width={79} 
              height={13}
              className="h-8 w-auto"
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="/" className="text-slate-700 hover:text-teal-600 font-semibold transition-colors relative group cursor-pointer">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 transition-all group-hover:w-full"></span>
            </a>
            <a href="/find-trials" className="text-slate-700 hover:text-teal-600 font-semibold transition-colors relative group cursor-pointer">
              Find Trials
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 transition-all group-hover:w-full"></span>
            </a>
            <a href="/types-of-trials" className="text-slate-700 hover:text-teal-600 font-semibold transition-colors relative group cursor-pointer">
              Trial Types
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 transition-all group-hover:w-full"></span>
            </a>
            <a href="/professional-services" className="text-slate-700 hover:text-teal-600 font-semibold transition-colors relative group cursor-pointer">
              Professional Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 transition-all group-hover:w-full"></span>
            </a>
            <a href="/about" className="text-slate-700 hover:text-teal-600 font-semibold transition-colors relative group cursor-pointer">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 transition-all group-hover:w-full"></span>
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Button className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl cursor-pointer">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-lg z-50">
            <div className="px-6 py-4 space-y-4">
              <a 
                href="/" 
                className="block text-slate-700 hover:text-teal-600 font-semibold transition-colors cursor-pointer py-2 border-b border-slate-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="/find-trials" 
                className="block text-slate-700 hover:text-teal-600 font-semibold transition-colors cursor-pointer py-2 border-b border-slate-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Trials
              </a>
              <a 
                href="/types-of-trials" 
                className="block text-slate-700 hover:text-teal-600 font-semibold transition-colors cursor-pointer py-2 border-b border-slate-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Trial Types
              </a>
              <a 
                href="/professional-services" 
                className="block text-slate-700 hover:text-teal-600 font-semibold transition-colors cursor-pointer py-2 border-b border-slate-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Professional Services
              </a>
              <a 
                href="/about" 
                className="block text-slate-700 hover:text-teal-600 font-semibold transition-colors cursor-pointer py-2 border-b border-slate-100"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <div className="pt-4">
                <Button className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl cursor-pointer">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 