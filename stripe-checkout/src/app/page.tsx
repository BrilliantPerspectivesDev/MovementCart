'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

// Main component - Landing page
export default function LandingPage() {
  const pathname = usePathname();
  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    // Extract affiliate code from URL path
    const path = window.location.pathname;
    const pathParts = path.split('/');
    const affiliateCode = pathParts[1];
    
    // Only save affiliate code if it's not 'ambassador', 'checkout', etc.
    if (affiliateCode && affiliateCode !== '' && 
        !['ambassador', 'checkout', 'cart', 'success'].includes(affiliateCode)) {
      localStorage.setItem('pathParam', affiliateCode);
      localStorage.setItem('affiliateCode', affiliateCode);
      console.log('Saved affiliate code:', affiliateCode);
    }
    
    // Add scroll event listener
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
    } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  return (
    <main className="min-h-screen bg-[#f9f5f0] pt-12">
      {/* Navigation Bar - Now with scroll effect */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent pt-4 pb-2'}`}>
        <div className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-300 ${scrolled ? 'h-20' : 'h-16'}`}>
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Image
                src="/Blacklogo.png" 
                alt="Brilliant Logo"
                width={120}
                height={30}
                className={`transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-90'}`}
                priority
              />
            </div>
            
            {/* Right side buttons */}
            <div className="hidden md:flex items-center">
              <a href="#" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${scrolled ? 'text-gray-700 hover:text-[#2A9D8F]' : 'text-gray-500 hover:text-gray-900'}`}>
                Sign In
              </a>
              <a href="/ambassador" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${scrolled ? 'text-gray-700 hover:text-[#2A9D8F]' : 'text-gray-500 hover:text-gray-900'}`}>
                Ambassador Program
              </a>
              <a href="/checkout" className="ml-4 px-4 py-2 rounded-md bg-[#E9C46A] text-gray-800 text-sm font-medium hover:bg-[#e6bd58] transition-colors">
                Join the Movement
              </a>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <span className="sr-only">Open main menu</span>
                {/* Hamburger icon */}
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu, show/hide based on menu state */}
        <div className={`md:hidden w-[80%] mx-auto bg-white shadow-lg rounded-b-lg ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="pt-2 pb-3 space-y-1">
            <a href="#" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700">
              Sign In
            </a>
            <a href="/ambassador" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700">
              Ambassador Program
            </a>
            <a href="/checkout" className="block pl-3 pr-4 py-2 bg-[#E9C46A] text-gray-800 text-base font-medium">
              Join the Movement
            </a>
          </div>
        </div>
      </nav>
      
      {/* Hero Header Container - With rounded corners on all sides */}
      <div className="w-[90%] sm:w-[85%] md:w-[80%] mx-auto rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden relative mt-12 sm:mt-16 mb-12 sm:mb-16 min-h-[450px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[75vh]">
        {/* Background Image - Covers the entire container */}
        <div className="absolute inset-0 z-0">
          {/* Added left-to-right black gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-transparent z-10"></div>
          <Image
            src="/Graham.jpg"
            alt="Graham worship image"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
        </div>

        {/* Content Container - Using absolute positioning for perfect vertical centering */}
        <div className="absolute inset-0 z-20 flex items-center">
          {/* Text and Interactive Elements - In a centered column */}
          <div className="p-4 sm:p-6 md:p-10 w-full max-w-3xl mx-auto md:mx-10">
            <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
              {/* Category Label */}
              <p className="text-[#F5F5F0] text-[10px] sm:text-xs tracking-[0.05em] uppercase font-medium">
                KINGDOM ACTIVATION • UPSTAIRS THINKING • DIRECT LEARNING
              </p>
              
              {/* Primary Headline - Now Much Bigger */}
              <h1 className="text-[#F5F5F0] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium font-serif leading-[1.05] tracking-tight max-w-full">
                Making Kingdom<br className="block" />Normal
              </h1>
              
              {/* Subheadline */}
              <p className="text-[#F5F5F0]/90 text-xs sm:text-sm md:text-base max-w-xl leading-relaxed">
                Join Brilliant Movement and cultivate an extraordinary relationship with God through community, resources, and direct learning.
              </p>
              
              {/* Email signup */}
              <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 mt-4 sm:mt-6 md:mt-8">
                <div className="relative w-full md:w-[70%]">
                  <input
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="appearance-none w-full bg-white text-gray-800 py-2 sm:py-3 px-3 sm:px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E9C46A] text-xs sm:text-sm"
                  />
                  <div className="text-[#F5F5F0] text-[10px] sm:text-xs md:text-sm mt-2 ml-1 font-medium flex items-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-[#E9C46A] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="flex-grow">Get our free 10-minute training on Making Kingdom Normal</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full md:w-[30%] bg-[#E9C46A] hover:bg-[#e6bd58] text-gray-800 font-medium py-2 sm:py-3 px-3 sm:px-4 rounded-md shadow-sm transition-colors flex items-center justify-center text-xs sm:text-sm">
                  <span>Get Free Training</span>
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission, Vision, and Values Section with Map Integration */}
      <div className="bg-white py-16 sm:py-24 w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
            {/* Left Column - Big Headline */}
            <div>
              <h2 className="text-4xl sm:text-5xl font-medium font-serif tracking-tight text-[#264653] leading-tight">
                Brilliant helps believers discover their new normal in Christ
              </h2>
              <div className="mt-8">
                <a href="/checkout" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-[#264653] bg-[#E9C46A] hover:bg-[#e6bd58] transition-colors">
                  JOIN BRILLIANT
                  <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column - Descriptive Text */}
            <div className="space-y-6 text-base text-gray-600">
              <p className="text-2xl text-gray-800 font-medium">
                Brilliant is a movement of Kingdom activators who are discovering that living in the fullness of Christ is meant to be our normal reality.
              </p>
              
              <p>
                The Brilliant movement is founded on the revolutionary concept that God doesn't see anything wrong with you because of Jesus - He only sees what's missing in your life that He's excited to provide. This completely shifts the paradigm from performance-based religion to relationship-based living.
              </p>
              
              <p>
                When you understand that you're already complete in Christ, you begin to experience:
              </p>
              
              <ul className="list-disc pl-5 space-y-2">
                <li>The freedom to let go of old religious patterns and expectations</li>
                <li>A relationship with God based on His delight in you, not your performance</li>
                <li>The joy of living from His perspective rather than earthly limitations</li>
                <li>Direct learning through relational engagement rather than just accumulating information</li>
              </ul>
          </div>
          </div>
        </div>
        </div>

      {/* How to Get Involved Section */}
      <div className="bg-black py-24 relative overflow-hidden">
        {/* Background gradient elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-gradient-to-r from-[#2A9D8F]/20 to-transparent rounded-full mix-blend-overlay blur-3xl opacity-40 transform -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-1/4 w-[35rem] h-[35rem] bg-gradient-to-l from-[#E9C46A]/20 to-transparent rounded-full mix-blend-overlay blur-3xl opacity-30 transform translate-y-1/3"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Heading and intro text */}
          <div className="max-w-3xl mb-20">
            <span className="text-[#E9C46A] font-medium tracking-wide uppercase text-sm mb-4 block">DISCOVER NEW POSSIBILITIES WITH A BRILLIANT MEMBERSHIP</span>
            <h2 className="text-5xl sm:text-6xl font-medium font-serif tracking-tight mb-8 text-white leading-[1.1]">
              Experience the fullness of the father's delight in global community
            </h2>
            <p className="text-gray-300 text-xl mb-10 leading-relaxed">
              Join Brilliant Movement and access our complete ecosystem of resources designed to help you discover an extraordinary relationship with God.
            </p>
            <div>
              <a href="/checkout" className="inline-flex items-center px-8 py-4 border border-transparent rounded-full text-base font-medium bg-[#E9C46A] text-[#264653] hover:bg-[#e6bd58] transition-all shadow-lg hover:shadow-xl hover:translate-y-[-2px] active:translate-y-0">
                JOIN BRILLIANT
                <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Single row of four cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {/* Card 1: The App */}
            <div className="group">
              <div className="h-[300px] w-full overflow-hidden rounded-2xl mb-6 relative">
                <img 
                  src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="BrilliantPlus App" 
                  className="w-full h-full object-cover object-center transition-transform duration-700 scale-105 group-hover:scale-110"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-white inline-block mb-3">Mobile App</span>
                </div>
              </div>
              <h3 className="text-2xl font-medium text-white mb-3 group-hover:text-[#E9C46A] transition-colors">The App</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                BrilliantPlus gives you access to hundreds of teachings, guided prayers, and immersive experiences.
              </p>
              <a href="#" className="text-[#E9C46A] inline-flex items-center font-medium hover:text-[#e6bd58] transition-colors">
                Learn more
                <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            
            {/* Card 2: Gatherings */}
            <div className="group">
              <div className="h-[300px] w-full overflow-hidden rounded-2xl mb-6 relative">
                <img 
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Brilliant Gatherings" 
                  className="w-full h-full object-cover object-center transition-transform duration-700 scale-105 group-hover:scale-110"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-white inline-block mb-3">Community</span>
                </div>
              </div>
              <h3 className="text-2xl font-medium text-white mb-3 group-hover:text-[#E9C46A] transition-colors">Gatherings</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Monthly community events on the first Monday of each month at 4pm PT to connect with others on the same journey.
              </p>
              <a href="#" className="text-[#E9C46A] inline-flex items-center font-medium hover:text-[#e6bd58] transition-colors">
                Learn more
                <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            
            {/* Card 3: Small Groups */}
            <div className="group">
              <div className="h-[300px] w-full overflow-hidden rounded-2xl mb-6 relative">
                <img 
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Small Groups" 
                  className="w-full h-full object-cover object-center transition-transform duration-700 scale-105 group-hover:scale-110"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-white inline-block mb-3">Weekly Study</span>
                </div>
              </div>
              <h3 className="text-2xl font-medium text-white mb-3 group-hover:text-[#E9C46A] transition-colors">Small Groups</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Weekly online Zoom groups with 12-week studies focused on topics like "Fruit of the Spirit" and "The Nature of Freedom."
              </p>
              <a href="#" className="text-[#E9C46A] inline-flex items-center font-medium hover:text-[#e6bd58] transition-colors">
                Learn more
                <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            
            {/* Card 4: Live Events */}
            <div className="group">
              <div className="h-[300px] w-full overflow-hidden rounded-2xl mb-6 relative">
                <img 
                  src="https://images.unsplash.com/photo-1527153818091-1a9638521e2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Live Events" 
                  className="w-full h-full object-cover object-center transition-transform duration-700 scale-105 group-hover:scale-110"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-white inline-block mb-3">Training & Conference</span>
                </div>
              </div>
              <h3 className="text-2xl font-medium text-white mb-3 group-hover:text-[#E9C46A] transition-colors">Live Events</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Access to "Limitless Life with God" training events and our annual "Brilliance26" 3-day virtual conference.
              </p>
              <a href="#" className="text-[#E9C46A] inline-flex items-center font-medium hover:text-[#e6bd58] transition-colors">
                Learn more
                <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Subtle bottom decorative element */}
          <div className="flex justify-center mt-20">
            <div className="h-[1px] w-16 bg-white/10"></div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="relative isolate bg-[#f9f5f0] pt-16 pb-24 sm:pt-24">
        {/* Gradient decorations */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-20 blur-3xl"
        >
          <div 
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-[#2A9D8F] to-[#264653]"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-15 blur-3xl sm:pt-40 xl:justify-end"
        >
          <div 
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#264653] to-[#E9C46A] xl:mr-[calc(50%-12rem)] xl:ml-0"
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base/7 font-semibold text-[#2A9D8F]">Testimonials</h2>
            <p className="mt-2 text-4xl font-medium font-serif tracking-tight text-balance text-[#264653] sm:text-5xl">
              What Our Community Is Saying
            </p>
            
            {/* CTA Button for Testimonials section */}
            <div className="mt-8">
              <a href="/checkout" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-[#264653] bg-[#E9C46A] hover:bg-[#e6bd58] transition-colors">
                JOIN BRILLIANT
                <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 md:gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {/* Featured testimonial in row 1, spans 2 columns */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-2 row-span-1">
              <figure className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200 h-full flex flex-col">
                <blockquote className="text-lg font-medium tracking-tight text-gray-900 flex-grow">
                  <p>"The Brilliant Movement has completely transformed my walk with God. The community has helped me understand Kingdom principles in a way that's practical and actionable. I'm seeing Heaven's perspective in every situation now."</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-x-4 border-t border-gray-200 pt-4">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-10 w-10 rounded-full bg-gray-50"
                  />
                  <div>
                    <div className="font-medium">Sarah Johnson</div>
                    <div className="text-gray-600">Member since 2022</div>
                  </div>
                </figcaption>
              </figure>
            </div>

            {/* Two more testimonials in row 1 */}
            <figure className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200 h-full flex flex-col">
              <blockquote className="text-gray-900 flex-grow">
                <p>"The teachings on Kingdom activation have given me practical tools to live from my true identity in Christ. I'm seeing breakthroughs in areas where I was stuck for years."</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-x-4">
                <img 
                  alt="" 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  className="h-10 w-10 rounded-full bg-gray-50" 
                />
                <div>
                  <div className="font-medium">Leslie Alexander</div>
                  <div className="text-gray-600">Ambassador</div>
                </div>
              </figcaption>
            </figure>
              
            <figure className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200 h-full flex flex-col">
              <blockquote className="text-gray-900 flex-grow">
                <p>"The community aspect of Brilliant Movement has been life-changing. I'm surrounded by people who see me through Heaven's perspective and challenge me to live in my true identity."</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-x-4">
                <img 
                  alt="" 
                  src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  className="h-10 w-10 rounded-full bg-gray-50" 
                />
                <div>
                  <div className="font-medium">Michael Brown</div>
                  <div className="text-gray-600">Kingdom Activator</div>
                </div>
              </figcaption>
            </figure>
              
            {/* Row 2: four testimonials */}
            <figure className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200 h-full flex flex-col">
              <blockquote className="text-gray-900 flex-grow">
                <p>"Learning to think from an 'upstairs perspective' has completely shifted how I respond to challenges. I'm no longer defined by my circumstances but by who God says I am."</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-x-4">
                <img 
                  alt="" 
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  className="h-10 w-10 rounded-full bg-gray-50" 
                />
                <div>
                  <div className="font-medium">Jamie Wilson</div>
                  <div className="text-gray-600">Member since 2023</div>
                </div>
              </figcaption>
            </figure>
              
            <figure className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200 h-full flex flex-col">
              <blockquote className="text-gray-900 flex-grow">
                <p>"The direct learning approach has helped me hear God's voice more clearly than ever before. I'm now confident in my ability to recognize His guidance in every situation."</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-x-4">
                <img 
                  alt="" 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  className="h-10 w-10 rounded-full bg-gray-50" 
                />
                <div>
                  <div className="font-medium">David Chen</div>
                  <div className="text-gray-600">Ambassador</div>
                </div>
              </figcaption>
            </figure>
              
            <figure className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200 h-full flex flex-col">
              <blockquote className="text-gray-900 flex-grow">
                <p>"The BrilliantPlus app has become my daily companion. Having these resources at my fingertips has accelerated my spiritual growth in ways I never thought possible."</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-x-4">
                <img 
                  alt="" 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  className="h-10 w-10 rounded-full bg-gray-50" 
                />
                <div>
                  <div className="font-medium">Robert Thompson</div>
                  <div className="text-gray-600">Member since 2023</div>
                </div>
              </figcaption>
            </figure>
              
            <figure className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200 h-full flex flex-col">
              <blockquote className="text-gray-900 flex-grow">
                <p>"The monthly gatherings are a highlight for me. Each one brings fresh revelation and deeper connection to the community. I've never experienced teaching that so consistently transforms my perspective."</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-x-4">
                <img 
                  alt="" 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  className="h-10 w-10 rounded-full bg-gray-50" 
                />
                <div>
                  <div className="font-medium">Amanda Rodriguez</div>
                  <div className="text-gray-600">Ambassador</div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
      
      {/* Pricing Section */}
      <div className="isolate overflow-hidden bg-[#264653] mt-16">
        <div className="mx-auto max-w-7xl px-6 pt-24 pb-96 text-center sm:pt-32 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-base/7 font-semibold text-[#E9C46A]">Membership Plans</h2>
            <p className="mt-2 text-5xl font-medium font-serif tracking-tight text-balance text-white sm:text-6xl">
              Choose Your Kingdom Journey
            </p>
            </div>
          <div className="relative mt-6">
            <p className="mx-auto max-w-2xl text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
              Select the membership that best suits your journey. Both options include full access to our community, resources, and teaching library to help you discover an extraordinary relationship with God.
            </p>
            <svg
              viewBox="0 0 1208 1024"
              className="absolute -top-10 left-1/2 -z-10 h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0"
            >
              <ellipse cx={604} cy={512} rx={604} ry={512} fill="url(#gradient-pricing)" />
              <defs>
                <radialGradient id="gradient-pricing">
                  <stop stopColor="#2A9D8F" />
                  <stop offset={1} stopColor="#E9C46A" />
                </radialGradient>
              </defs>
            </svg>
              </div>
            </div>
        <div className="flow-root bg-white pb-24 sm:pb-32">
          <div className="-mt-80">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
                {/* Monthly Plan */}
                <div
                  className="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 shadow-xl ring-gray-900/10 sm:p-10"
                >
                  <div>
                    <h3 id="tier-monthly" className="text-base/7 font-semibold text-[#2A9D8F]">
                      Member - Monthly
                    </h3>
                    <div className="mt-4 flex items-baseline gap-x-2">
                      <span className="text-5xl font-medium font-serif tracking-tight text-[#264653]">$47</span>
                      <span className="text-base/7 font-semibold text-gray-600">/month</span>
                    </div>
                    <p className="mt-6 text-base/7 text-gray-600">Full access to the Brilliant Movement with flexible monthly billing.</p>
                    <ul role="list" className="mt-10 space-y-4 text-sm/6 text-gray-600">
                      <li className="flex gap-x-3">
                        <svg className="h-6 w-5 flex-none text-[#E9C46A]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <span className="font-medium">The App:</span> BrilliantPlus the key resource of the movement
                        </div>
                      </li>
                      <li className="flex gap-x-3">
                        <svg className="h-6 w-5 flex-none text-[#E9C46A]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <span className="font-medium">Gatherings:</span> Monthly Gatherings (First Monday of the Month 4pm PT)
                        </div>
                      </li>
                      <li className="flex gap-x-3">
                        <svg className="h-6 w-5 flex-none text-[#E9C46A]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <span className="font-medium">Small Groups:</span> Online weekly small groups via zoom with 12-Week studies like Fruit of the Spirit and The Nature of Freedom
                        </div>
                      </li>
                      <li className="flex gap-x-3">
                        <svg className="h-6 w-5 flex-none text-[#E9C46A]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <span className="font-medium">Events:</span> Free access to Limitless life with God training events and the annual Brilliance26 conference
                        </div>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/checkout"
                    aria-describedby="tier-monthly"
                    className="mt-8 block rounded-md bg-[#264653] px-3.5 py-2 text-center text-sm/6 font-semibold text-white shadow-xs hover:bg-[#1d3741] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#264653]"
                  >
                    Join Monthly
                  </a>
                </div>
          
                {/* Annual Plan */}
                <div
                  className="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 shadow-xl ring-gray-900/10 sm:p-10"
                >
                  <div>
                    <h3 id="tier-annual" className="text-base/7 font-semibold text-[#2A9D8F]">
                      Member - Annual
                    </h3>
                    <div className="mt-4 flex items-baseline gap-x-2">
                      <span className="text-5xl font-medium font-serif tracking-tight text-[#264653]">$397</span>
                      <span className="text-base/7 font-semibold text-gray-600">/year</span>
                    </div>
                    <p className="mt-6 text-base/7 text-gray-600">Our best value option with approximately two months free, perfect for those committed to their Kingdom journey.</p>
                    <ul role="list" className="mt-10 space-y-4 text-sm/6 text-gray-600">
                      <li className="flex gap-x-3">
                        <svg className="h-6 w-5 flex-none text-[#E9C46A]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Everything in the monthly plan</span>
                      </li>
                      <li className="flex gap-x-3">
                        <svg className="h-6 w-5 flex-none text-[#E9C46A]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span><strong>Save $167</strong> with annual billing</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/checkout"
                    aria-describedby="tier-annual"
                    className="mt-8 block rounded-md bg-[#264653] px-3.5 py-2 text-center text-sm/6 font-semibold text-white shadow-xs hover:bg-[#1d3741] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#264653]"
                  >
                    Join Annually
                  </a>
                </div>
            
                {/* Ambassador Add-on */}
                <div className="flex flex-col items-start gap-x-8 gap-y-6 rounded-3xl p-8 ring-1 ring-gray-900/10 sm:gap-y-10 sm:p-10 lg:col-span-2 lg:flex-row lg:items-center bg-[#2A9D8F]/10">
                  <div className="lg:min-w-0 lg:flex-1">
                    <h3 className="text-base/7 font-semibold text-[#2A9D8F]">Ambassador Program</h3>
                    <p className="mt-1 text-lg text-gray-600">
                      Only $10 per year for additional benefits:
                    </p>
                    <ul className="mt-6 space-y-3 text-sm/6 text-gray-600">
                      <li className="flex gap-x-3">
                        <svg className="h-6 w-5 flex-none text-[#2A9D8F]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Provide people a link to access the BrilliantPlus app with a 5-day free trial
                      </li>
                      <li className="flex gap-x-3">
                        <svg className="h-6 w-5 flex-none text-[#2A9D8F]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Share in a portion of the membership fee when people join
                      </li>
                      <li className="flex gap-x-3">
                        <svg className="h-6 w-5 flex-none text-[#2A9D8F]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Receive Ambassador-only monthly training on growing impact and income
                      </li>
                      <li className="flex gap-x-3">
                        <svg className="h-6 w-5 flex-none text-[#2A9D8F]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Receive a Brilliant Debit Card to access your funds
                      </li>
                      <li className="flex gap-x-3 items-start">
                        <svg className="h-6 w-5 flex-none text-[#2A9D8F] mt-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-500 text-xs italic">Currently only available in the U.S.A with plans to expand internationally</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/checkout"
                    className="rounded-md px-3.5 py-2 text-sm/6 font-semibold text-[#2A9D8F] ring-1 ring-[#2A9D8F] ring-inset hover:bg-[#2A9D8F]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A9D8F]"
                  >
                    Add Ambassador Program <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-[#222222] text-white py-8">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between">
            {/* Logo and copyright */}
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-2">Brilliant Perspectives LLC</h2>
              <p className="text-gray-400 text-sm">
                © 2025 Brilliant Perspectives LLC. All rights reserved.
              </p>
            </div>
            
            {/* Contact info */}
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <p className="text-gray-400">
                <a href="mailto:help@brilliantperspectives.com" className="hover:text-white transition-colors duration-200">
                  help@brilliantperspectives.com
                </a>
              </p>
              <p className="text-gray-400">Voicemail: (800) 351-7541</p>
              <p className="text-gray-400">
                735 State St. #517<br />
                Santa Barbara, CA 93101
              </p>
            </div>
          </div>
          
          {/* Bottom bar */}
          <div className="mt-8 pt-4 border-t border-gray-700 text-center">
            <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-8">
              <a 
                href="https://brilliantperspectives.clickfunnels.com/optincxp26vyu" 
                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </a>
              <a 
                href="https://brilliantperspectives.clickfunnels.com/optinlhu0kk20" 
                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
