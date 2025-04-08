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
      {/* New Hero Header */}
      <div className="w-[90%] sm:w-[85%] mx-auto relative max-w-7xl py-8 sm:py-12 pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 bg-[#F6F5F2] rounded-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-center mx-auto max-w-5xl px-[18px] sm:px-[37px]">
          {/* Left Content - Text and CTA */}
          <div className="flex flex-col lg:w-[45%] space-y-4 text-left">
            <p className="uppercase text-sm font-semibold tracking-wider text-[#264653]">JOIN THE MOVEMENT DISCOVERING</p>
            <h1 className="text-[3.4034rem] sm:text-[3.64rem] md:text-[3.9rem] font-bold text-black leading-[1.1] tracking-[-0.03em] mb-3">
              A simple,<br />
              relational way<br />
              of being<br />
              with God
            </h1>
            <p className="text-base text-gray-700 mb-8">
              Join Brilliant with Graham Cooke and become a member of the global movement experiencing God's love every day. Unlock keys to a daily routine with God that's simple and relational.
            </p>

            {/* CTA Button */}
            <div className="w-full mt-2">
              <a 
                href="/checkout" 
                className="block w-full text-center py-4 px-8 bg-[#E76F51] hover:bg-[#E76F51]/90 transition-colors text-white rounded-full font-medium"
              >
                <div className="flex flex-col items-center">
                  <span>Start your five day free trial today</span>
                  <div className="flex items-center space-x-1 mt-1 text-xs">
                    <span className="text-[#FFDD99]">★★★★★</span>
                    <span className="text-white/90">| 4000+ Reviews</span>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative lg:w-[55%] mt-6 lg:mt-0">
            <div className="aspect-square relative rounded-xl overflow-hidden w-[90%] mx-auto">
              <Image 
                src="/Graham2.png" 
                alt="Graham Cooke" 
                fill
                className="object-cover object-center"
                priority
              />
            </div>
            <div className="absolute -bottom-2 right-0 left-0 text-center">
              <p className="text-sm text-gray-700 italic bg-white/90 backdrop-blur-sm py-3 px-4 rounded-xl mx-auto inline-block">
                With over 500 teachings, prayers & prophetic words<br />
                from Graham Cooke
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Three Column Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 lg:gap-8">
            {/* Column 1 */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold text-[#264653] mb-3 text-center">
                Discover rich, constant fellowship with God
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-[#E76F51] to-[#E9C46A] rounded-full mb-4"></div>
              <p className="text-gray-600 text-center leading-relaxed">
                Join God in every part of your day, not just designated quiet times. Finally experience 
                what it means to maintain consistent fellowship without the pressure of performance.
              </p>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold text-[#264653] mb-3 text-center">
                Exchange Anxiety for God's Peace
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-[#E76F51] to-[#E9C46A] rounded-full mb-4"></div>
              <p className="text-gray-600 text-center leading-relaxed">
                Step into the Father's heart and exchange your anxiety for His firm commitment to 
                be with you.
              </p>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold text-[#264653] mb-3 text-center">
                Recognize His Voice Daily
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-[#E76F51] to-[#E9C46A] rounded-full mb-4"></div>
              <p className="text-gray-600 text-center leading-relaxed">
                Move from uncertain prayer monologues to confident dialogue with God. 
                Experience the joy of truly knowing His voice in every situation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Images Section */}
      <div className="bg-white pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex flex-col md:flex-row gap-0 justify-center items-center">
            <div className="w-auto md:w-auto">
              <Image 
                src="/Testimonial1.png" 
                alt="Testimonial quote"
                width={300}
                height={200}
                className="h-auto"
              />
            </div>
            <div className="w-auto md:w-auto">
              <Image 
                src="/Testimonial2.png" 
                alt="Testimonial quote"
                width={300}
                height={200}
                className="h-auto"
              />
            </div>
          </div>
          
          {/* CTA Button under testimonials */}
          <div className="w-full max-w-md mx-auto mt-10">
            <a 
              href="/checkout" 
              className="block w-full text-center py-4 px-8 bg-[#E76F51] hover:bg-[#E76F51]/90 transition-colors text-white rounded-full font-medium"
            >
              <div className="flex flex-col items-center">
                <span>Start your five day free trial today</span>
                <div className="flex items-center space-x-1 mt-1 text-xs">
                  <span className="text-[#FFDD99]">★★★★★</span>
                  <span className="text-white/90">| 4000+ Reviews</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* App Showcase Section */}
      <div className="bg-[#F6F5F2] py-16 sm:py-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto px-0 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 lg:gap-4">
            {/* Phone Mockup */}
            <div className="w-full md:w-[50%] md:pr-4">
              <div className="relative mx-auto max-w-[450px]">
                <Image 
                  src="/Final-Mockups-Medium.png" 
                  alt="Brilliant App Interface"
                  width={700}
                  height={700}
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            {/* Content */}
            <div className="w-full md:w-[50%] mt-8 md:mt-0 md:pl-4 max-w-md">
              <span className="text-[#E76F51] font-semibold text-sm uppercase tracking-wide">THE ESSENTIAL COMPANION TO THE MOVEMENT</span>
              <div className="w-full mb-4">
                <Image 
                  src="/BlackBPlus.png" 
                  alt="Brilliant Plus"
                  width={500}
                  height={150}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-gray-700 mb-6">
                Brilliant Plus is the essential companion to any member of the Brilliant Movement. With over 600 teachings, guided prayer sessions, meditations, soaking sessions and an ever growing library of sleep content, the app is dedicated to one thing - teaching you to experience the kingdom in every part of your world.
              </p>
              
              {/* Testimonial Quote */}
              <div className="mb-8 italic text-gray-700">
                "I became aware that i'm at rest and peace for where i am right now" - <span className="font-semibold">Dinka</span>
              </div>
              
              {/* CTA Button */}
              <div className="mb-4">
                <a 
                  href="/checkout" 
                  className="block w-full sm:w-auto text-center py-3 px-8 bg-[#E76F51] hover:bg-[#E76F51]/90 transition-colors text-white rounded-full font-medium"
                >
                  Start Your Journey Today
                </a>
              </div>
              
              {/* Reviews */}
              <div className="flex items-center space-x-2">
                <div className="flex text-[#E9C46A]">★★★★★</div>
                <span className="text-sm text-gray-700">| 4000+ Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* App Features Cards */}
      <div className="bg-[#F6F5F2] pt-4 pb-24">
        <div className="max-w-6xl mx-auto px-0 sm:px-8 lg:px-12">
          <div className="flex flex-wrap -mx-3">
            {/* Sleep Card */}
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <div className="bg-[#1E3A59] rounded-2xl overflow-hidden h-full">
                <div className="relative h-52 sm:h-64">
                  <Image
                    src="/Nighttime Medium.jpeg"
                    alt="Night landscape with moonlight"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-semibold mb-3 uppercase">Sleep</h3>
                  <p className="text-white/90">
                    Silence nighttime anxiety as you fall asleep to deep truths about who God is, what He's like, and how that changes everything.
                  </p>
                </div>
              </div>
            </div>

            {/* Routines Card */}
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <div className="bg-[#A58667] rounded-2xl overflow-hidden h-full">
                <div className="relative h-52 sm:h-64">
                  <Image
                    src="/Routines.png"
                    alt="Routines interface"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-semibold mb-3 uppercase">Routines</h3>
                  <p className="text-white/90">
                    Experience the pressure lift as you step into a simple, relational way of being with God. Build your daily routine with God around rest and peace.
                  </p>
                </div>
              </div>
            </div>

            {/* Teaching Card */}
            <div className="w-full md:w-1/3 px-3">
              <div className="bg-[#171C26] rounded-2xl overflow-hidden h-full">
                <div className="relative h-52 sm:h-64">
                  <Image
                    src="/Teaching.png"
                    alt="Teaching library interface"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-semibold mb-3 uppercase">Teaching</h3>
                  <p className="text-white/90">
                    With Graham Cooke as your guide and digital mentor explore a digital library designed to lead you to the heart of God and teach you to stay there.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="mt-12 text-center">
            <a 
              href="/checkout" 
              className="inline-block py-4 px-8 bg-[#E76F51] hover:bg-[#E76F51]/90 transition-colors text-white rounded-full font-medium"
            >
              <div className="flex flex-col items-center">
                <span>Start your five day free trial today</span>
                <div className="flex items-center space-x-1 mt-1 text-xs">
                  <span className="text-[#FFDD99]">★★★★★</span>
                  <span className="text-white/90">| 4000+ Reviews</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Gatherings Section */}
      <div className="bg-[#F6F5F2] py-16 sm:py-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto px-0 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 lg:gap-4">
            {/* Content */}
            <div className="w-full md:w-[50%] mt-8 md:mt-0 md:pr-4 max-w-md">
              <span className="text-[#E76F51] font-semibold text-sm uppercase tracking-wide">THE HEART OF THE MOVEMENT</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mt-2 mb-6">
                Monthly Gatherings
              </h2>
              <p className="text-gray-700 mb-6">
                As a member, you'll gain access to monthly online gatherings (held on the first Monday of each month) with Graham Cooke and the Brilliant community.
              </p>
              
              <p className="text-gray-700 mb-6">
                The gatherings and Brilliant Plus app work together seamlessly - dive deeper into the teachings from gatherings through the app, and apply what you learn from the app during our corporate times together. This creates a powerful cycle of learning, application, and community growth.
              </p>
              
              {/* Testimonial Quote */}
              <div className="mb-8 italic text-gray-700">
                "The gatherings have completely transformed how I see God working in my life" - <span className="font-semibold">Jessica</span>
              </div>
              
              {/* CTA Button */}
              <div className="mb-4">
                <a 
                  href="/checkout" 
                  className="block w-full sm:w-auto text-center py-3 px-8 bg-[#E76F51] hover:bg-[#E76F51]/90 transition-colors text-white rounded-full font-medium"
                >
                  Join the next gathering
                </a>
              </div>
            </div>
            
            {/* Gatherings Image */}
            <div className="w-full md:w-[50%] md:pl-4">
              <div className="relative mx-auto rounded-xl overflow-hidden">
                <Image 
                  src="/SmallGroups.png" 
                  alt="Brilliant Gatherings"
                  width={700}
                  height={700}
                  className="w-full h-auto"
                />
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
