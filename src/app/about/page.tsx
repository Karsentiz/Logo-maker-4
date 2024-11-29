import React from 'react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 container-width py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-1 mb-8">About IconInk</h1>
          
          <div className="space-y-12">
            {/* Mission Statement */}
            <section className="space-y-4">
              <h2 className="heading-2">Our Mission</h2>
              <p className="body-text">
                At IconInk, we're revolutionizing the way businesses create their visual identity. Our mission is to make professional logo design accessible to everyone through the power of artificial intelligence.
              </p>
            </section>

            {/* Story Section */}
            <section className="space-y-4">
              <h2 className="heading-2">Our Story</h2>
              <p className="body-text">
                Founded by a team of designers and AI enthusiasts, IconInk was born from a simple observation: creating a professional logo shouldn't require weeks of time and thousands of dollars. We've combined cutting-edge AI technology with design principles to create a tool that generates unique, meaningful logos in minutes.
              </p>
            </section>

            {/* Technology Section */}
            <section className="space-y-4">
              <h2 className="heading-2">Our Technology</h2>
              <p className="body-text">
                IconInk leverages state-of-the-art AI models trained on thousands of professional logos. Our technology understands design principles, brand aesthetics, and industry-specific trends to create logos that are both beautiful and relevant to your business.
              </p>
            </section>

            {/* Values Section */}
            <section className="space-y-6">
              <h2 className="heading-2">Our Values</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="card p-6">
                  <h3 className="heading-3 mb-2">Innovation</h3>
                  <p className="body-text">
                    Pushing the boundaries of what's possible with AI and design.
                  </p>
                </div>
                <div className="card p-6">
                  <h3 className="heading-3 mb-2">Accessibility</h3>
                  <p className="body-text">
                    Making professional design available to businesses of all sizes.
                  </p>
                </div>
                <div className="card p-6">
                  <h3 className="heading-3 mb-2">Quality</h3>
                  <p className="body-text">
                    Never compromising on the quality of our generated logos.
                  </p>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="text-center space-y-6">
              <h2 className="heading-2">Ready to Create Your Logo?</h2>
              <p className="body-text">
                Join thousands of businesses who have already discovered the power of AI-generated logos.
              </p>
              <a 
                href="/#try-now"
                className="btn-primary inline-block"
              >
                Try IconInk Free
              </a>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
} 