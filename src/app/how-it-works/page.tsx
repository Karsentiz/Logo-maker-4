import React from 'react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 container-width py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-1 mb-8">How IconInk Works</h1>

          {/* Process Steps */}
          <div className="space-y-16">
            <section className="space-y-8">
              <h2 className="heading-2">Create Your Logo in 3 Simple Steps</h2>
              
              <div className="grid gap-8">
                <div className="card p-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-primary-500"></div>
                  <span className="text-5xl font-bold text-primary-500/20 absolute right-8 top-6">01</span>
                  <div className="relative">
                    <h3 className="heading-3 mb-4">Describe Your Business</h3>
                    <p className="body-text mb-4">
                      Tell us about your company and what makes it unique. Our AI understands context and industry-specific elements to create relevant designs.
                    </p>
                    <ul className="list-disc list-inside body-text space-y-2">
                      <li>Enter your company name</li>
                      <li>Describe your business focus</li>
                      <li>Share your brand vision</li>
                    </ul>
                  </div>
                </div>

                <div className="card p-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-primary-500"></div>
                  <span className="text-5xl font-bold text-primary-500/20 absolute right-8 top-6">02</span>
                  <div className="relative">
                    <h3 className="heading-3 mb-4">Choose Your Style</h3>
                    <p className="body-text mb-4">
                      Select from our curated design styles or let our AI interpret your brand's essence.
                    </p>
                    <ul className="list-disc list-inside body-text space-y-2">
                      <li>Dual Combination designs</li>
                      <li>Font-focused compositions</li>
                      <li>Symbol-based logos</li>
                    </ul>
                  </div>
                </div>

                <div className="card p-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-primary-500"></div>
                  <span className="text-5xl font-bold text-primary-500/20 absolute right-8 top-6">03</span>
                  <div className="relative">
                    <h3 className="heading-3 mb-4">Generate & Download</h3>
                    <p className="body-text mb-4">
                      Watch as AI creates your unique logo in seconds. Download in multiple formats for any use case.
                    </p>
                    <ul className="list-disc list-inside body-text space-y-2">
                      <li>Instant generation</li>
                      <li>Multiple variations</li>
                      <li>High-resolution files</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Technology Section */}
            <section className="space-y-6">
              <h2 className="heading-2">Our Technology</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="card p-6">
                  <h3 className="heading-3 mb-4">Advanced AI Model</h3>
                  <p className="body-text">
                    Powered by state-of-the-art machine learning models trained on thousands of professional logos to understand design principles and brand aesthetics.
                  </p>
                </div>
                <div className="card p-6">
                  <h3 className="heading-3 mb-4">Smart Generation</h3>
                  <p className="body-text">
                    Our AI analyzes your input to create contextually relevant designs that align with your industry and brand values.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="space-y-6">
              <h2 className="heading-2">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="card p-6">
                  <h3 className="heading-3 mb-2">How long does it take to generate a logo?</h3>
                  <p className="body-text">
                    Most logos are generated within seconds. The AI model might take a minute to warm up on first use.
                  </p>
                </div>
                <div className="card p-6">
                  <h3 className="heading-3 mb-2">Can I modify the generated logo?</h3>
                  <p className="body-text">
                    Yes! You can generate multiple variations and download the one that best fits your needs.
                  </p>
                </div>
                <div className="card p-6">
                  <h3 className="heading-3 mb-2">What file formats do I get?</h3>
                  <p className="body-text">
                    Logos are provided in high-resolution formats suitable for both digital and print use.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="text-center space-y-6">
              <h2 className="heading-2">Ready to Create Your Logo?</h2>
              <p className="body-text">
                Join thousands of businesses who have already discovered the power of AI-generated logos.
              </p>
              <a 
                href="/#try-now"
                className="btn-primary inline-block"
              >
                Create Your Logo Now
              </a>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
} 