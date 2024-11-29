'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import type { FormEvent } from 'react'

export default function LogoForm() {
  const [companyName, setCompanyName] = useState('')
  const [companyDescription, setCompanyDescription] = useState('')
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [generationPrompt, setGenerationPrompt] = useState('')
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const logoStyles = [
    {
      type: "Cartoon Style",
      example: "cute panda mascot",
      description: "Playful cartoon character or mascot design",
      icon: "🎨",
      promptTemplate: (name: string, desc: string) => {
        return `${name} logo: ${desc}, cartoon style, professional quality`
      }
    },
    {
      type: "Character Portrait",
      example: "stylized girl with glasses",
      description: "Stylized character portrait in Pixar/Disney style",
      icon: "👤",
      promptTemplate: (name: string, desc: string) => {
        return `${name} logo: ${desc}, character portrait style, professional quality`
      }
    },
    {
      type: "Minimalist Icon",
      example: "simple geometric fox",
      description: "Clean, geometric representation of your concept",
      icon: "⚡",
      promptTemplate: (name: string, desc: string) => {
        return `${name} logo: ${desc}, minimalist style, clean lines, professional quality`
      }
    }
  ]

  useEffect(() => {
    if (companyName && companyDescription && selectedStyle) {
      const style = logoStyles.find(s => s.type === selectedStyle)
      if (style) {
        const prompt = style.promptTemplate(companyName, companyDescription)
        setGenerationPrompt(prompt + ", dalle-mix")
      }
    }
  }, [companyName, companyDescription, selectedStyle])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!generationPrompt.trim()) {
      setError("Please provide a logo description")
      return
    }
    
    setIsLoading(true)
    setError(null)

    try {
      console.log("Submitting request to generate logo...");
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          companyName, 
          description: generationPrompt
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate logo')
      }

      console.log('Successfully received logo URL')
      setLogoUrl(data.logoUrl)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate logo'
      setError(`Error: ${errorMessage}`)
      console.error('Error details:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Name Input */}
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-300">
            1. Company Name
          </label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="input-field mt-1"
            placeholder="Enter your company name"
            required
          />
        </div>

        {/* Company Description Input */}
        <div>
          <label htmlFor="companyDescription" className="block text-sm font-medium text-gray-300">
            2. What does your company do?
          </label>
          <textarea
            id="companyDescription"
            value={companyDescription}
            onChange={(e) => setCompanyDescription(e.target.value)}
            className="input-field mt-1"
            rows={3}
            placeholder="Describe your company's main business or service"
            required
          />
        </div>

        {/* Style Selection */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-300">
            3. Choose a Logo Style (Optional)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {logoStyles.map((style) => (
              <button
                key={style.type}
                type="button"
                onClick={() => setSelectedStyle(style.type)}
                className={`p-4 rounded-lg text-left transition-all duration-200 ${
                  selectedStyle === style.type
                    ? 'bg-primary-600/20 border-2 border-primary-500'
                    : 'bg-surface/50 border border-neutral-700/50 hover:border-primary-500/50'
                }`}
              >
                <div className="text-2xl mb-2">{style.icon}</div>
                <h3 className="text-sm font-semibold text-white mb-1">{style.type}</h3>
                <p className="text-xs text-neutral-400">{style.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Editable Generated Prompt */}
        <div className="space-y-2">
          <label htmlFor="generationPrompt" className="block text-sm font-medium text-gray-300">
            4. Review and Edit Logo Description
          </label>
          <textarea
            id="generationPrompt"
            value={generationPrompt}
            onChange={(e) => setGenerationPrompt(e.target.value)}
            className="input-field mt-1"
            rows={3}
            placeholder="Your logo description will appear here. You can edit it before generating."
            required
          />
          <p className="text-xs text-neutral-400">
            Feel free to modify this description to get exactly the logo you want.
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading || !generationPrompt.trim()}
          className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Loading AI Model... This might take a minute...
            </span>
          ) : (
            'Create Logo'
          )}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-900/50 text-red-200 rounded-lg border border-red-700">
          <p className="font-medium mb-2">Error:</p>
          <p>{error}</p>
          {error.includes('503') && (
            <p className="mt-2 text-sm">
              The AI model is warming up. Please try again in a few moments.
            </p>
          )}
        </div>
      )}

      {logoUrl && (
        <div className="mt-8">
          <h2 className="heading-3 mb-4">Generated Logo for {companyName}</h2>
          <div className="max-w-md mx-auto">
            <div className="relative aspect-square bg-gray-800 rounded-lg overflow-hidden">
              <Image
                src={logoUrl}
                alt={`Logo for ${companyName}`}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 400px"
                quality={100}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 