import React from 'react'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-surface/30">
      <div className="container-width py-24 space-y-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Create Stunning Logos with <span className="text-primary-500">AI</span>
          </h1>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Transform your brand with unique, AI-generated logos. Fast, professional, and tailored to your business.
          </p>
        </div>
        
        <div className="flex justify-center space-x-4">
          <a 
            href="#try-now" 
            className="btn-primary"
          >
            Try Now - It's Free
          </a>
          <a 
            href="#how-it-works" 
            className="btn-secondary"
          >
            How It Works
          </a>
        </div>
      </div>
    </div>
  )
} 