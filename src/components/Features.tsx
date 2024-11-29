import React from 'react'

const features = [
  {
    title: 'AI-Powered Design',
    description: 'Cutting-edge artificial intelligence creates unique logos tailored to your brand.',
    icon: '🤖'
  },
  {
    title: 'Instant Generation',
    description: 'Get your logo in seconds, not days. Perfect for startups and businesses on the go.',
    icon: '⚡'
  },
  {
    title: 'Unlimited Options',
    description: 'Generate as many variations as you need until you find the perfect logo.',
    icon: '🎨'
  },
  {
    title: 'Professional Quality',
    description: 'High-resolution logos ready for both digital and print use.',
    icon: '✨'
  }
]

export default function Features() {
  return (
    <div className="py-24 bg-surface/30" id="how-it-works">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-4">How IconInk Works</h2>
          <p className="body-text">Create your perfect logo in three simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="card p-6 text-center hover:transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="heading-3 mb-2">{feature.title}</h3>
              <p className="body-text">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 