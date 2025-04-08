'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Main component - Landing page
export default function LandingPage() {
  const pathname = usePathname();
  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState('monthly');
  
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
              <h1 className="text-[#F5F5F0] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-medium font-serif leading-[1.05] tracking-tight max-w-full">
                Making Kingdom<br className="block" />Normal
              </h1>
              
              {/* Subheadline */}
              <p className="text-[#F5F5F0]/90 text-xs sm:text-sm md:text-base max-w-xl leading-relaxed mb-8">
                Join Brilliant Movement and cultivate an extraordinary relationship with God through community, resources, and direct learning.
              </p>
              
              {/* CTA Button */}
              <div className="flex justify-start">
                <a 
                  href="#pricing"
                  className="inline-flex items-center px-6 py-3 text-base sm:text-lg font-medium rounded-md bg-[#E9C46A] text-[#264653] hover:bg-[#e6bd58] transition-all shadow-lg hover:shadow-xl hover:translate-y-[-2px] active:translate-y-0"
                >
                  Join the movement
                  <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission, Vision, and Values Section with Map Integration */}
      <div className="bg-white py-12 sm:py-16 lg:py-24 w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:gap-x-12 gap-y-8 sm:gap-y-12 lg:gap-y-0">
            {/* Left Column - Big Headline */}
            <div className="flex-1 text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-serif tracking-tight text-[#264653] leading-tight">
                Brilliant helps believers discover their new normal in Christ
              </h2>
              <div className="mt-6 sm:mt-8">
                <a href="/checkout" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-[#264653] bg-[#E9C46A] hover:bg-[#e6bd58] transition-colors">
                  JOIN BRILLIANT
                  <svg className="ml-2 -mr-1 h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column - Descriptive Text */}
            <div className="flex-1 space-y-4 sm:space-y-6 text-sm sm:text-base text-gray-600 text-left">
              <p className="text-xl sm:text-2xl text-gray-800 font-medium">
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
      <div className="container-[how-to-get-involved] relative w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-serif tracking-tight text-[#264653] mb-4">
            What you'll get as a member
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            Enjoy these exclusive benefits as part of your Brilliant Movement membership, designed to transform your relationship with God and deepen your Kingdom experience.
          </p>
        </div>

        <div className="flex flex-wrap -mx-4">
          {/* The App Card */}
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <div className="group relative bg-[#264653] rounded-lg overflow-hidden h-full transition-transform duration-300 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#264653] to-transparent z-10"></div>
              <div className="relative aspect-[4/3]">
                <Image
                  src="/Group-21.jpg"
                  alt="Mobile app interface"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="relative z-20 p-6">
                <div className="mb-4">
                  <span className="inline-block bg-[#E9C46A] text-[#264653] text-xs font-semibold px-2.5 py-1 rounded">
                    Mobile App
                  </span>
                </div>
                <h3 className="text-2xl font-medium font-serif tracking-tight text-white mb-3 group-hover:text-[#E9C46A] transition-colors">The App</h3>
                <p className="text-[#F5F5F0]/90 text-base leading-relaxed">
                  With over 500 teachings, prayers & prophetic words from Graham Cooke, Brilliant Plus with Graham Cooke is the perfect companion to engage deeply with God's love every day.
                </p>
              </div>
            </div>
          </div>

          {/* Gatherings Card */}
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <div className="group relative bg-[#264653] rounded-lg overflow-hidden h-full transition-transform duration-300 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#264653] to-transparent z-10"></div>
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/Graham2.png"
                  alt="Community gathering"
                  fill
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="relative z-20 p-6">
                <div className="mb-4">
                  <span className="inline-block bg-[#E9C46A] text-[#264653] text-xs font-semibold px-2.5 py-1 rounded">
                    Community
                  </span>
                </div>
                <h3 className="text-2xl font-medium font-serif tracking-tight text-white mb-3 group-hover:text-[#E9C46A] transition-colors">Gatherings</h3>
                <p className="text-[#F5F5F0]/90 text-base leading-relaxed">
                  Your global community moving in the same direction as you. Engage with powerful teaching, immersion times and prophetic activation with believers who think just like you from around the world.
                </p>
              </div>
            </div>
          </div>

          {/* Small Groups Card */}
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <div className="group relative bg-[#264653] rounded-lg overflow-hidden h-full transition-transform duration-300 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#264653] to-transparent z-10"></div>
              <div className="relative aspect-[4/3]">
                <Image
                  src="/SmallGroups.png"
                  alt="Small group meeting"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="relative z-20 p-6">
                <div className="mb-4">
                  <span className="inline-block bg-[#E9C46A] text-[#264653] text-xs font-semibold px-2.5 py-1 rounded">
                    Weekly Study
                  </span>
                </div>
                <h3 className="text-2xl font-medium font-serif tracking-tight text-white mb-3 group-hover:text-[#E9C46A] transition-colors">Small Groups</h3>
                <p className="text-[#F5F5F0]/90 text-base leading-relaxed">
                  Experience the joy of belonging to a global community discovering the Father's love together. Twice yearly, dive into 12-week small group studies like "Fruit of the Spirit" where you'll connect with fellow believers practicing His presence as your normal reality.
                </p>
              </div>
            </div>
          </div>

          {/* Live Events Card */}
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <div className="group relative bg-[#264653] rounded-lg overflow-hidden h-full transition-transform duration-300 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#264653] to-transparent z-10"></div>
              <div className="relative aspect-[4/3]">
                <Image
                  src="/Events.jpg"
                  alt="Training and conference"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="relative z-20 p-6">
                <div className="mb-4">
                  <span className="inline-block bg-[#E9C46A] text-[#264653] text-xs font-semibold px-2.5 py-1 rounded">
                    Training & Conference
                  </span>
                </div>
                <h3 className="text-2xl font-medium font-serif tracking-tight text-white mb-3 group-hover:text-[#E9C46A] transition-colors">Live Events</h3>
                <p className="text-[#F5F5F0]/90 text-base leading-relaxed">
                  Access to "Limitless Life with God" training events and our annual "Brilliance26" 3-day virtual conference.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="bg-[#264653] py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-gradient-to-r from-[#2A9D8F]/20 to-transparent rounded-full mix-blend-overlay blur-3xl opacity-40 transform -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-1/4 w-[35rem] h-[35rem] bg-gradient-to-l from-[#E9C46A]/20 to-transparent rounded-full mix-blend-overlay blur-3xl opacity-30 transform translate-y-1/3"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-serif tracking-tight text-white mb-3 sm:mb-4">
              What Our Community Says
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
              Join thousands of believers experiencing transformation through Kingdom perspectives.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
            {/* Testimonial 1 */}
            <div className="flex-grow basis-full sm:basis-[calc(50%-1rem)] lg:basis-[calc(33.333%-1.5rem)] max-w-full sm:max-w-[calc(50%-1rem)] lg:max-w-[calc(33.333%-1.5rem)] bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 lg:p-8 relative">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 24H18L15 34H21L24 24V14H12V24ZM28 24H34L31 34H37L40 24V14H28V24Z" fill="#E9C46A" fillOpacity="0.2"/>
                </svg>
              </div>
              <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 relative z-10">
                "Wow!! Powerful. Transforming, Brilliant has opened up locked spaces in my life."
              </p>
              <p className="text-[#E9C46A] font-medium">Sarah M.</p>
            </div>

            {/* Testimonial 2 */}
            <div className="flex-grow basis-full sm:basis-[calc(50%-1rem)] lg:basis-[calc(33.333%-1.5rem)] max-w-full sm:max-w-[calc(50%-1rem)] lg:max-w-[calc(33.333%-1.5rem)] bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 lg:p-8 relative">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 24H18L15 34H21L24 24V14H12V24ZM28 24H34L31 34H37L40 24V14H28V24Z" fill="#E9C46A" fillOpacity="0.2"/>
                </svg>
              </div>
              <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 relative z-10">
                "Life-changing perspectives for those with an open heart."
              </p>
              <p className="text-[#E9C46A] font-medium">Michael R.</p>
            </div>

            {/* Testimonial 3 */}
            <div className="flex-grow basis-full sm:basis-[calc(50%-1rem)] lg:basis-[calc(33.333%-1.5rem)] max-w-full sm:max-w-[calc(50%-1rem)] lg:max-w-[calc(33.333%-1.5rem)] bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 lg:p-8 relative">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 24H18L15 34H21L24 24V14H12V24ZM28 24H34L31 34H37L40 24V14H28V24Z" fill="#E9C46A" fillOpacity="0.2"/>
                </svg>
              </div>
              <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 relative z-10">
                "I'm so grateful for the truth that God wants me to understand through Brilliant perspectives."
              </p>
              <p className="text-[#E9C46A] font-medium">Rachel K.</p>
            </div>

            {/* Testimonial 4 */}
            <div className="flex-grow basis-full sm:basis-[calc(50%-1rem)] lg:basis-[calc(33.333%-1.5rem)] max-w-full sm:max-w-[calc(50%-1rem)] lg:max-w-[calc(33.333%-1.5rem)] bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 lg:p-8 relative">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 24H18L15 34H21L24 24V14H12V24ZM28 24H34L31 34H37L40 24V14H28V24Z" fill="#E9C46A" fillOpacity="0.2"/>
                </svg>
              </div>
              <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 relative z-10">
                "It's the first time in my life I've been able to understand the work of the spirit free of the mumbo-jumbo. Thank you for taking me to the next level!"
              </p>
              <p className="text-[#E9C46A] font-medium">David W.</p>
            </div>

            {/* Testimonial 5 */}
            <div className="flex-grow basis-full sm:basis-[calc(50%-1rem)] lg:basis-[calc(33.333%-1.5rem)] max-w-full sm:max-w-[calc(50%-1rem)] lg:max-w-[calc(33.333%-1.5rem)] bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 lg:p-8 relative">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 24H18L15 34H21L24 24V14H12V24ZM28 24H34L31 34H37L40 24V14H28V24Z" fill="#E9C46A" fillOpacity="0.2"/>
                </svg>
              </div>
              <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 relative z-10">
                "It's such a gift listening to Graham. He opens my eyes to a beautiful faith."
              </p>
              <p className="text-[#E9C46A] font-medium">Emma L.</p>
            </div>

            {/* Testimonial 6 */}
            <div className="flex-grow basis-full sm:basis-[calc(50%-1rem)] lg:basis-[calc(33.333%-1.5rem)] max-w-full sm:max-w-[calc(50%-1rem)] lg:max-w-[calc(33.333%-1.5rem)] bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 lg:p-8 relative">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 24H18L15 34H21L24 24V14H12V24ZM28 24H34L31 34H37L40 24V14H28V24Z" fill="#E9C46A" fillOpacity="0.2"/>
                </svg>
              </div>
              <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 relative z-10">
                "Long time member and listener, these messages are an excellent affirmation of who we are in Christ and help maintain kingdom normal."
              </p>
              <p className="text-[#E9C46A] font-medium">James B.</p>
            </div>

            {/* Testimonial 7 */}
            <div className="flex-grow basis-full sm:basis-[calc(50%-1rem)] lg:basis-[calc(33.333%-1.5rem)] max-w-full sm:max-w-[calc(50%-1rem)] lg:max-w-[calc(33.333%-1.5rem)] bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 lg:p-8 relative">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 24H18L15 34H21L24 24V14H12V24ZM28 24H34L31 34H37L40 24V14H28V24Z" fill="#E9C46A" fillOpacity="0.2"/>
                </svg>
              </div>
              <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 relative z-10">
                "This content is beyond Good! Thank you!"
              </p>
              <p className="text-[#E9C46A] font-medium">Lisa P.</p>
            </div>

            {/* Testimonial 8 */}
            <div className="flex-grow basis-full sm:basis-[calc(50%-1rem)] lg:basis-[calc(33.333%-1.5rem)] max-w-full sm:max-w-[calc(50%-1rem)] lg:max-w-[calc(33.333%-1.5rem)] bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 lg:p-8 relative">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 24H18L15 34H21L24 24V14H12V24ZM28 24H34L31 34H37L40 24V14H28V24Z" fill="#E9C46A" fillOpacity="0.2"/>
                </svg>
              </div>
              <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 relative z-10">
                "There really aren't words to convey the blessing Graham and his team. You'll find yourself soaking and relistening to content over and over. Give yourself time to go on a journey with Brilliant. You'll never be the same."
              </p>
              <p className="text-[#E9C46A] font-medium">Thomas H.</p>
            </div>

            {/* Testimonial 9 */}
            <div className="flex-grow basis-full sm:basis-[calc(50%-1rem)] lg:basis-[calc(33.333%-1.5rem)] max-w-full sm:max-w-[calc(50%-1rem)] lg:max-w-[calc(33.333%-1.5rem)] bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 lg:p-8 relative">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 24H18L15 34H21L24 24V14H12V24ZM28 24H34L31 34H37L40 24V14H28V24Z" fill="#E9C46A" fillOpacity="0.2"/>
                </svg>
              </div>
              <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 relative z-10">
                "After 5 years of deconstructing, I got tired of doubting everything about God, and realized I miss the reality of Jesus. I've been having an astounding time with God, and Graham's teaching helped me have the right perspective on life in the spirit."
              </p>
              <p className="text-[#E9C46A] font-medium">Mark S.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pricing Section */}
      <div id="pricing" className="isolate overflow-hidden bg-[#264653]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-16 sm:pt-20 lg:pt-24 pb-64 sm:pb-80 lg:pb-96 text-center lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-sm sm:text-base font-semibold text-[#E9C46A]">Membership Plans</h2>
            <p className="mt-2 text-3xl sm:text-4xl md:text-5xl font-medium font-serif tracking-tight text-balance text-white sm:text-6xl">
              Choose Your Kingdom Journey
            </p>
          </div>
          <div className="relative mt-4 sm:mt-6">
            <p className="mx-auto max-w-2xl text-base sm:text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
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
        <div className="flow-root bg-white pb-16 sm:pb-20 lg:pb-24">
          <div className="-mt-56 sm:-mt-64 lg:-mt-80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto flex justify-center">
                {/* Monthly Plan */}
                <div className="flex flex-col justify-between rounded-3xl bg-white p-5 sm:p-8 lg:p-10 ring-1 shadow-xl ring-gray-900/10 w-full max-w-2xl">
                  <div>
                    <h3 id="tier-monthly" className="text-2xl sm:text-3xl lg:text-4xl font-medium font-serif tracking-tight text-[#264653] text-center mb-2 sm:mb-4">
                      Become a member today
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 text-center mb-4 sm:mb-6">Full access to the Brilliant Movement with flexible monthly billing.</p>
                    
                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-x-3 sm:gap-x-4 mb-8 sm:mb-12">
                      <button 
                        type="button"
                        onClick={() => setSelectedFrequency('monthly')}
                        className={`text-xs sm:text-sm font-medium ${selectedFrequency === 'monthly' ? 'text-[#264653]' : 'text-gray-500 hover:text-gray-700'} transition-colors cursor-pointer`}
                      >
                        Monthly
                      </button>
                      <button
                        type="button"
                        className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#264653] focus:ring-offset-2 bg-gray-200"
                        role="switch"
                        aria-checked={selectedFrequency === 'annual'}
                        onClick={() => setSelectedFrequency(selectedFrequency === 'monthly' ? 'annual' : 'monthly')}
                      >
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            selectedFrequency === 'annual' ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedFrequency('annual')}
                        className={`text-xs sm:text-sm font-medium ${selectedFrequency === 'annual' ? 'text-[#264653]' : 'text-gray-500 hover:text-gray-700'} transition-colors cursor-pointer`}
                      >
                        Annual
                      </button>
                    </div>
                    
                    <ul role="list" className="space-y-6 sm:space-y-8 text-sm/6 text-gray-600">
                      <li className="flex flex-col sm:flex-row items-start gap-y-2 sm:gap-x-4">
                        <div className="flex-shrink-0 mt-1 flex justify-center w-full sm:w-auto sm:justify-start">
                          <svg className="h-5 w-5 sm:h-6 sm:w-5 flex-none text-[#E9C46A]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="flex-grow text-center sm:text-left">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 sm:mb-2">
                            <h4 className="text-xl sm:text-2xl font-normal text-[#264653]">The App</h4>
                            <span className="text-base sm:text-xl font-normal text-[#264653]">Value: $397</span>
                          </div>
                          <p className="text-gray-600 text-sm sm:text-base font-light">With over 500 teachings, prayers & prophetic words from Graham Cooke, Brilliant Plus with Graham Cooke is the perfect companion to engage deeply with God's love every day.</p>
                        </div>
                      </li>
                      <li className="flex flex-col sm:flex-row items-start gap-y-2 sm:gap-x-4">
                        <div className="flex-shrink-0 mt-1 flex justify-center w-full sm:w-auto sm:justify-start">
                          <svg className="h-5 w-5 sm:h-6 sm:w-5 flex-none text-[#E9C46A]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="flex-grow text-center sm:text-left">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 sm:mb-2">
                            <h4 className="text-xl sm:text-2xl font-normal text-[#264653]">Gatherings</h4>
                            <span className="text-base sm:text-xl font-normal text-[#264653]">Value: $197</span>
                          </div>
                          <p className="text-gray-600 text-sm sm:text-base font-light">Your global community moving in the same direction as you. Engage with powerful teaching, immersion times and prophetic activation with believers who think just like you from around the world.</p>
                        </div>
                      </li>
                      <li className="flex flex-col sm:flex-row items-start gap-y-2 sm:gap-x-4">
                        <div className="flex-shrink-0 mt-1 flex justify-center w-full sm:w-auto sm:justify-start">
                          <svg className="h-5 w-5 sm:h-6 sm:w-5 flex-none text-[#E9C46A]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="flex-grow text-center sm:text-left">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 sm:mb-2">
                            <h4 className="text-xl sm:text-2xl font-normal text-[#264653]">Events</h4>
                            <span className="text-base sm:text-xl font-normal text-[#264653]">Value: $297</span>
                          </div>
                          <p className="text-gray-600 text-sm sm:text-base font-light">Exclusive tickets to our biggest events of the year, all included in your membership.</p>
                        </div>
                      </li>
                      <li className="flex flex-col sm:flex-row items-start gap-y-2 sm:gap-x-4">
                        <div className="flex-shrink-0 mt-1 flex justify-center w-full sm:w-auto sm:justify-start">
                          <svg className="h-5 w-5 sm:h-6 sm:w-5 flex-none text-[#E9C46A]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="flex-grow text-center sm:text-left">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 sm:mb-2">
                            <h4 className="text-xl sm:text-2xl font-normal text-[#264653]">Small Groups</h4>
                            <span className="text-base sm:text-xl font-normal text-[#264653]">Priceless</span>
                          </div>
                          <p className="text-gray-600 text-sm sm:text-base font-light">Experience the joy of belonging to a global community discovering the Father's love together. Twice yearly, dive into 12-week small group studies like "Fruit of the Spirit" where you'll connect with fellow believers practicing His presence as your normal reality.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-8 sm:mt-12 text-center">
                    <div className="flex flex-col items-center gap-y-2 sm:gap-y-3">
                      <span className="text-base sm:text-lg font-medium text-gray-600 line-through">Total Value: $891</span>
                      <div className="flex items-baseline gap-x-1 sm:gap-x-2 justify-center mb-4 sm:mb-6">
                        <span className="text-4xl sm:text-5xl lg:text-6xl font-medium font-serif tracking-tight text-[#264653]">
                          ${selectedFrequency === 'annual' ? '397' : '47'}
                        </span>
                        <span className="text-base sm:text-xl font-semibold text-gray-600">/{selectedFrequency === 'annual' ? 'year' : 'month'}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
                        {selectedFrequency === 'annual' ? '' : ''}
                      </p>
                    </div>
                    <a
                      href={`/checkout?plan=${selectedFrequency}`}
                      aria-describedby="tier-monthly"
                      className="block w-full sm:w-auto sm:inline-block rounded-md bg-[#264653] px-4 sm:px-6 py-3 text-center text-sm sm:text-base font-semibold text-white shadow-lg hover:bg-[#1d3741] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#264653]"
                    >
                      Join {selectedFrequency === 'annual' ? 'Annually' : 'Monthly'}
                    </a>
                  </div>
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
