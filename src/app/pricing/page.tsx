import React from 'react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Link from 'next/link'

const pricingTiers = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for trying out our AI logo generator",
    features: [
      "3 logo generations per day",
      "Basic resolution downloads",
      "Standard support",
      "Commercial use license"
    ],
    cta: "Start Free",
    ctaLink: "/#try-now",
    highlight: false
  },
  {
    name: "Pro",
    price: "19",
    description: "Ideal for businesses needing multiple logo variations",
    features: [
      "Unlimited logo generations",
      "High-resolution downloads",
      "Multiple file formats (PNG, SVG)",
      "Priority support",
      "Commercial use license",
      "Logo variations",
      "Color palette suggestions"
    ],
    cta: "Get Started",
    ctaLink: "/#try-now",
    highlight: true
  },
  {
    name: "Enterprise",
    price: "49",
    description: "For companies needing advanced branding solutions",
    features: [
      "Everything in Pro",
      "Brand guidelines generation",
      "Multiple brand profiles",
      "API access",
      "Dedicated support",
      "Custom modifications",
      "Team collaboration"
    ],
    cta: "Contact Sales",
    ctaLink: "/contact",
    highlight: false
  }
]

const frequentlyAskedQuestions = [
  {
    question: "Can I use my generated logo commercially?",
    answer: "Yes! All logos generated on IconInk come with a commercial use license, allowing you to use them for your business."
  },
  {
    question: "What file formats do I get?",
    answer: "Free users receive PNG files. Pro and Enterprise users get access to PNG, SVG, and other vector formats suitable for any use case."
  },
  {
    question: "Can I modify my logo after generation?",
    answer: "Yes! You can generate multiple variations and Pro/Enterprise users get access to customization options."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 14-day money-back guarantee if you're not satisfied with our service."
  }
]

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 container-width py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="heading-1 mb-4">Simple, Transparent Pricing</h1>
            <p className="body-text max-w-2xl mx-auto">
              Choose the perfect plan for your business. All plans include access to our AI logo generator.
            </p>
          </div>

          {/* Pricing Tiers */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {pricingTiers.map((tier) => (
              <div 
                key={tier.name}
                className={`card p-8 relative ${
                  tier.highlight 
                    ? 'border-primary-500 ring-2 ring-primary-500 ring-opacity-50' 
                    : ''
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h2 className="heading-2 mb-2">{tier.name}</h2>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">${tier.price}</span>
                    <span className="text-neutral-400">/month</span>
                  </div>
                  <p className="body-text">{tier.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center text-neutral-300">
                      <svg className="w-5 h-5 text-primary-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.ctaLink}
                  className={`block text-center py-2 px-4 rounded-lg transition-colors ${
                    tier.highlight
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <section className="space-y-8">
            <h2 className="heading-2 text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {frequentlyAskedQuestions.map((faq) => (
                <div key={faq.question} className="card p-6">
                  <h3 className="heading-3 mb-2">{faq.question}</h3>
                  <p className="body-text">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Enterprise CTA */}
          <div className="mt-16 text-center card p-8 space-y-6">
            <h2 className="heading-2">Need a Custom Solution?</h2>
            <p className="body-text max-w-2xl mx-auto">
              We offer custom plans for larger organizations with specific requirements.
              Contact our sales team to discuss your needs.
            </p>
            <Link href="/contact" className="btn-primary inline-block">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
} 