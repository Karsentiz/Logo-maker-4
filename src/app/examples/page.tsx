import React from 'react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Image from 'next/image'

// Sample logos with their descriptions
const sampleLogos = [
  {
    category: "Dual Combination",
    examples: [
      {
        image: "/examples/cafe-logo.png",
        name: "Coffee Cat Café",
        description: "Cat and coffee combination logo",
        prompt: "wablogo, logo, Minimalist, cat and coffee"
      },
      {
        image: "/examples/tech-logo.png",
        name: "LeafTech",
        description: "Nature and technology fusion",
        prompt: "wablogo, logo, Minimalist, leaf and circuit"
      }
    ]
  },
  {
    category: "Font Combination",
    examples: [
      {
        image: "/examples/book-logo.png",
        name: "Mindful",
        description: "Book with letter M design",
        prompt: "wablogo, logo, Minimalist, book with the letter M"
      },
      {
        image: "/examples/print-logo.png",
        name: "HandPrint",
        description: "Fingerprint with HP letters",
        prompt: "wablogo, logo, Minimalist, fingerprint pattern with letters HP"
      }
    ]
  },
  {
    category: "Text Below Graphic",
    examples: [
      {
        image: "/examples/leaf-logo.png",
        name: "Eco Solutions",
        description: "Simple leaf symbol",
        prompt: "wablogo, logo, Minimalist, leaf symbol"
      },
      {
        image: "/examples/wave-logo.png",
        name: "Ocean Fresh",
        description: "Wave pattern design",
        prompt: "wablogo, logo, Minimalist, wave symbol"
      }
    ]
  }
]

export default function Examples() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 container-width py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="heading-1 mb-4">Logo Examples</h1>
            <p className="body-text max-w-2xl mx-auto">
              Explore our gallery of AI-generated logos. Each example demonstrates the versatility
              and creativity of our logo generation system.
            </p>
          </div>

          {/* Logo Categories */}
          <div className="space-y-16">
            {sampleLogos.map((category) => (
              <section key={category.category} className="space-y-8">
                <h2 className="heading-2">{category.category}</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {category.examples.map((logo) => (
                    <div key={logo.name} className="card p-6 space-y-4">
                      <div className="relative aspect-square bg-neutral-900 rounded-lg overflow-hidden">
                        <Image
                          src={logo.image}
                          alt={logo.name}
                          fill
                          className="object-contain p-4"
                        />
                      </div>
                      <div className="space-y-2">
                        <h3 className="heading-3">{logo.name}</h3>
                        <p className="body-text">{logo.description}</p>
                        <div className="p-3 bg-surface/30 rounded-lg">
                          <p className="text-sm text-neutral-400 font-mono">
                            Prompt: {logo.prompt}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center space-y-6 py-12 card">
            <h2 className="heading-2">Create Your Own Logo</h2>
            <p className="body-text max-w-2xl mx-auto">
              Ready to generate your unique logo? Try our AI logo generator now and create
              a professional logo for your business in minutes.
            </p>
            <a 
              href="/#try-now"
              className="btn-primary inline-block"
            >
              Create Your Logo
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
} 