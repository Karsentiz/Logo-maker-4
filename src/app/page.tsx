import React from 'react'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import Features from '../components/Features'
import LogoForm from '../components/LogoForm'
import Console from '../components/Console'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        <Hero />
        
        <Features />
        
        <div className="py-24" id="try-now">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="heading-2 mb-4">
                Create Your Logo
              </h2>
              <p className="body-text">
                Describe your business and let our AI create the perfect logo for you.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              <div className="card p-8">
                <LogoForm />
              </div>
              <Console />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 