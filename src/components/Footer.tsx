import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-surface/30 border-t border-neutral-700/50">
      <div className="container-width py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="IconInk Logo"
                width={40}
                height={40}
                priority
                className="w-10 h-10 object-contain"
              />
              <span className="ml-3 text-xl font-bold text-white">IconInk</span>
            </Link>
            <p className="body-text text-sm">
              Creating unique, AI-powered logos for modern businesses.
            </p>
          </div>

          <div>
            <h3 className="heading-3 mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/how-it-works" className="body-text hover:text-white transition-colors">How it Works</Link></li>
              <li><Link href="/examples" className="body-text hover:text-white transition-colors">Examples</Link></li>
              <li><Link href="/pricing" className="body-text hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="heading-3 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="body-text hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="body-text hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="heading-3 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="body-text hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="body-text hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral-700/50 text-center body-text text-sm">
          © {new Date().getFullYear()} IconInk. All rights reserved.
        </div>
      </div>
    </footer>
  )
} 