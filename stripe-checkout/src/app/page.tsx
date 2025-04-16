'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { productSchema, organizationSchema, faqSchema, grahamCookeSchema } from './index';
import Script from 'next/script';
import { trackButtonClick, trackPageView } from './utils/analytics';

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

  useEffect(() => {
    // Track page view when component mounts
    if (typeof window !== 'undefined') {
      trackPageView('Home', 'landing', document.referrer);
    }
  }, [pathname]);

  // Handle CTA button click
  const handleCTAClick = (buttonId: string, buttonText: string, section: string) => {
    trackButtonClick(buttonId, buttonText, section);
  };

  return (
    <main className="min-h-screen bg-[#f9f5f0] pt-12">
      {/* JSON-LD Structured Data */}
      <Script 
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Script 
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script 
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script 
        id="graham-cooke-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(grahamCookeSchema) }}
      />
      
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
              Join Brilliant with Graham Cooke and become a member of the global movement experiencing God's love every day. With an exclusive app, gatherings, global small groups, you'll unlock keys to a way with God that's simple and relational.
            </p>

            {/* CTA Button */}
            <div className="w-full mt-2">
              <a 
                href="/checkout" 
                className="block w-full text-center py-4 px-8 bg-[#74A78E] hover:bg-[#74A78E]/90 transition-colors text-white rounded-full font-medium"
                onClick={() => handleCTAClick('hero-cta', 'Start your five day free trial today', 'Hero Section')}
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
                alt="Graham Cooke leading a Brilliant Movement gathering and teaching session" 
                fill
                className="object-cover object-center"
                priority
              />
            </div>
            </div>
          </div>
        </div>
        
      {/* Benefits Three Column Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex flex-wrap -mx-4">
            {/* Column 1 */}
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-10 md:mb-8">
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-semibold text-[#264653] mb-3 text-left sm:text-center">
                  Discover rich, constant fellowship with God
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-[#74A78E] to-[#E9C46A] rounded-full mb-4 self-start sm:self-center"></div>
                <p className="text-gray-600 text-left sm:text-center leading-relaxed flex-grow">
                  Join God in every part of your day, not just designated quiet times. Finally experience 
                  what it means to maintain consistent fellowship without the pressure of performance.
                </p>
          </div>
        </div>

            {/* Column 2 */}
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-10 md:mb-8">
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-semibold text-[#264653] mb-3 text-left sm:text-center">
                  Exchange Anxiety for God's Peace
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-[#74A78E] to-[#E9C46A] rounded-full mb-4 self-start sm:self-center"></div>
                <p className="text-gray-600 text-left sm:text-center leading-relaxed flex-grow">
                  Step into the Father's heart and exchange your anxiety for His firm commitment to 
                  be with you.
                </p>
              </div>
        </div>

            {/* Column 3 */}
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-10 md:mb-0 md:mx-auto lg:mx-0">
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-semibold text-[#264653] mb-3 text-left sm:text-center">
                  Recognize His Voice Daily
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-[#74A78E] to-[#E9C46A] rounded-full mb-4 self-start sm:self-center"></div>
                <p className="text-gray-600 text-left sm:text-center leading-relaxed flex-grow">
                  Move from uncertain prayer monologues to confident dialogue with God. 
                  Experience the joy of truly knowing His voice in every situation.
                </p>
              </div>
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
                alt="Testimonial from Brilliant Movement member about transformative experience" 
                width={300}
                height={200}
                className="h-auto"
              />
          </div>
            <div className="w-auto md:w-auto">
              <Image 
                src="/Testimonial2.png" 
                alt="Testimonial from Brilliant Movement community member describing spiritual growth" 
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
              className="block w-full text-center py-4 px-8 bg-[#74A78E] hover:bg-[#74A78E]/90 transition-colors text-white rounded-full font-medium"
              onClick={() => handleCTAClick('testimonials-cta', 'Start your five day free trial today', 'Testimonials Section')}
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
                  alt="Brilliant Plus app interface showing meditation and prayer content on smartphone" 
                  width={700}
                  height={700}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-[50%] mt-8 md:mt-0 md:pl-4 max-w-md">
              <span className="text-[#74A78E] font-semibold text-sm uppercase tracking-wide mb-2 inline-block">THE ESSENTIAL APP</span>
              <div className="w-full mb-4">
                <Image 
                  src="/BlackBPlus.png" 
                  alt="Brilliant Plus logo - the essential app for Brilliant Movement members" 
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
                  className="block w-full sm:w-auto text-center py-3 px-8 bg-[#74A78E] hover:bg-[#74A78E]/90 transition-colors text-white rounded-full font-medium"
                  onClick={() => handleCTAClick('app-showcase-cta', 'Start Your Journey Today', 'App Showcase Section')}
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
                    alt="Brilliant Plus sleep content feature with calming night landscape" 
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
                    alt="Brilliant Plus routines feature interface for daily spiritual practices" 
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
                    alt="Brilliant Plus teaching library with Graham Cooke content and resources" 
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
              className="inline-block py-4 px-8 bg-[#74A78E] hover:bg-[#74A78E]/90 transition-colors text-white rounded-full font-medium"
              onClick={() => handleCTAClick('app-features-cta', 'Start your five day free trial today', 'App Features Section')}
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
              <span className="text-[#74A78E] font-semibold text-sm uppercase tracking-wide">THE HEART OF THE MOVEMENT</span>
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
                  className="block w-full sm:w-auto text-center py-3 px-8 bg-[#74A78E] hover:bg-[#74A78E]/90 transition-colors text-white rounded-full font-medium"
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
                  alt="Brilliant Movement monthly gatherings with community members connecting online" 
                  width={700}
                  height={700}
                  className="w-full h-auto"
                />
              </div>
          </div>
          </div>
        </div>
      </div>

      {/* Events & Small Groups Section */}
      <div className="bg-[#F6F5F2] py-16 sm:py-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto px-0 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#74A78E] uppercase tracking-[0.2em]">
              Also Included In Every Membership
            </h2>
          </div>
          <div className="flex flex-col md:flex-row gap-10 md:gap-16">
            {/* Events Column */}
            <div className="w-full md:w-1/2">
              <div className="bg-white rounded-2xl p-8 h-full shadow-sm">
                <span className="text-[#74A78E] font-semibold text-sm uppercase tracking-wide">EXCLUSIVE ACCESS</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-black mt-2 mb-4">
                  Event Tickets
                </h3>
                <div className="relative rounded-xl overflow-hidden mb-4 aspect-[16/9]">
                  <Image 
                    src="/Events.jpg" 
                    alt="Brilliant Movement live events and conferences with Graham Cooke" 
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-gray-700 mb-6">
                  Exclusive tickets to our biggest events of the year, all included in your membership.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#74A78E] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Limitless Life with God training</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#74A78E] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Annual Brilliance26 virtual conference</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Small Groups Column */}
            <div className="w-full md:w-1/2">
              <div className="bg-white rounded-2xl p-8 h-full shadow-sm">
                <span className="text-[#74A78E] font-semibold text-sm uppercase tracking-wide">COMMUNITY LEARNING</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-black mt-2 mb-4">
                  Small Groups
                </h3>
                <div className="relative rounded-xl overflow-hidden mb-4 aspect-[16/9]">
                  <Image 
                    src="/SmallGroups.png" 
                    alt="Brilliant Movement small groups connecting globally for spiritual growth and community" 
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-gray-700">
                  Experience the joy of belonging to a global community discovering the Father's love together. Twice yearly, dive into 12-week small group studies like "Fruit of the Spirit" where you'll connect with fellow believers practicing His presence as your normal reality.
                </p>
              </div>
        </div>
      </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="bg-white py-16 sm:py-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto px-0 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-[#74A78E] font-semibold text-sm uppercase tracking-wide mb-2 inline-block">FROM OUR COMMUNITY</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
              What People Are Saying
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of believers experiencing transformation through Kingdom perspectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Testimonial 1 */}
            <div className="bg-[#F6F5F2] rounded-2xl p-6 relative">
              <div className="mb-4 text-gray-700 italic">
                "Wow!! Powerful. Transforming, Brilliant has opened up locked spaces in my life."
              </div>
              <div className="font-semibold text-[#264653]">Sarah M.</div>
        </div>

            {/* Testimonial 2 */}
            <div className="bg-[#F6F5F2] rounded-2xl p-6 relative">
              <div className="mb-4 text-gray-700 italic">
                "Life-changing perspectives for those with an open heart."
        </div>
              <div className="font-semibold text-[#264653]">Michael R.</div>
      </div>

            {/* Testimonial 3 */}
            <div className="bg-[#F6F5F2] rounded-2xl p-6 relative">
              <div className="mb-4 text-gray-700 italic">
                "I'm so grateful for the truth that God wants me to understand through Brilliant perspectives."
              </div>
              <div className="font-semibold text-[#264653]">Rachel K.</div>
      </div>

            {/* Testimonial 4 */}
            <div className="bg-[#F6F5F2] rounded-2xl p-6 relative">
              <div className="mb-4 text-gray-700 italic">
                "It's the first time in my life I've been able to understand the work of the spirit free of the mumbo-jumbo. Thank you for taking me to the next level!"
              </div>
              <div className="font-semibold text-[#264653]">David W.</div>
        </div>

            {/* Testimonial 5 */}
            <div className="bg-[#F6F5F2] rounded-2xl p-6 relative">
              <div className="mb-4 text-gray-700 italic">
                "It's such a gift listening to Graham. He opens my eyes to a beautiful faith."
              </div>
              <div className="font-semibold text-[#264653]">Emma L.</div>
      </div>

            {/* Testimonial 6 */}
            <div className="bg-[#F6F5F2] rounded-2xl p-6 relative">
              <div className="mb-4 text-gray-700 italic">
                "Long time member and listener, these messages are an excellent affirmation of who we are in Christ and help maintain kingdom normal."
              </div>
              <div className="font-semibold text-[#264653]">James B.</div>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="mt-12 text-center">
            <a 
              href="/checkout" 
              className="block w-full text-center py-4 px-8 bg-[#74A78E] hover:bg-[#74A78E]/90 transition-colors text-white rounded-full font-medium"
              onClick={() => handleCTAClick('testimonials-cta', 'Start your five day free trial today', 'Testimonials Section')}
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
      
      {/* Who is Graham Cooke Section */}
      <div className="bg-white py-16 sm:py-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto px-0 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Image */}
            <div className="w-full md:w-1/3 mb-8 md:mb-0">
              <div className="relative rounded-xl overflow-hidden aspect-[3/4] shadow-lg">
                <Image 
                  src="/Graham2.png" 
                  alt="Graham Cooke, founder of Brilliant Movement and internationally renowned speaker and author" 
                  fill
                  className="object-cover object-center"
                />
              </div>
                  </div>
            
            {/* Content */}
            <div className="w-full md:w-2/3">
              <span className="text-[#74A78E] font-semibold text-sm uppercase tracking-wide mb-2 inline-block">MEET YOUR MENTOR</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">
                Who is Graham Cooke?
              </h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Graham Cooke is an internationally recognized author, teacher, and speaker whose powerful, life-changing messages have helped transform the lives of people around the world. With over 40 years of ministry experience, Graham's unique revelatory insights about God's nature and our identity in Christ have helped countless believers move from religious performance into authentic relationship with God.
                </p>
                <p>
                  As the founder of Brilliant Perspectives and the Brilliant Movement, Graham has created a global community dedicated to living in the fullness of God's presence every day. His extensive library of books, courses and teachings has become a treasured resource for individuals, small groups, and churches worldwide.
                </p>
                <p>
                  Graham's passion is to mentor people in their journey of spiritual growth, empowering them to know God intimately and live victoriously. His teachings focus on experiencing the Father's affection, recognizing God's voice, and understanding your true identity in Christ.
                </p>
                </div>
              
              {/* Call to Action */}
              <div className="mt-8">
                <a 
                  href="/checkout" 
                  className="inline-block py-4 px-8 bg-[#74A78E] hover:bg-[#74A78E]/90 transition-colors text-white rounded-full font-medium"
                  onClick={() => handleCTAClick('graham-cta', 'Start your five day free trial today', 'Graham Cooke Section')}
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
            </div>
          </div>
          
      {/* Pricing Section */}
      <div id="pricing" className="bg-[#F6F5F2] py-16 sm:py-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto px-0 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-[#74A78E] font-semibold text-sm uppercase tracking-wide mb-2 inline-block">YOUR MEMBERSHIP OPTIONS</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
              Choose Your Kingdom Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the membership that best suits your journey. Both options include full access to our community, resources, and teaching library.
            </p>
            </div>

          {/* Pricing Card */}
          <div className="bg-white rounded-3xl shadow-md overflow-hidden mx-auto max-w-2xl">
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black text-center mb-6">
                Become a member today
              </h3>
              <p className="text-center text-gray-600 mb-8">
                Full access to the Brilliant Movement with flexible billing.
              </p>
              
              {/* Billing Toggle */}
              <div className="flex items-center justify-center gap-x-3 sm:gap-x-4 mb-8">
                <button 
                  type="button"
                  onClick={() => setSelectedFrequency('monthly')}
                  className={`text-sm font-medium ${selectedFrequency === 'monthly' ? 'text-[#264653]' : 'text-gray-500 hover:text-gray-700'} transition-colors cursor-pointer`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#74A78E] focus:ring-offset-2 bg-gray-200"
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
                  className={`text-sm font-medium ${selectedFrequency === 'annual' ? 'text-[#264653]' : 'text-gray-500 hover:text-gray-700'} transition-colors cursor-pointer`}
                >
                  Annual
                </button>
            </div>
              
              {/* Feature List */}
              <div className="space-y-6 sm:space-y-8">
                {/* The App */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-4">
                    <svg className="h-6 w-6 text-[#74A78E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-xl font-semibold text-[#264653]">The App</h4>
                      <span className="text-base font-medium text-[#264653] w-[100px] text-right">Value: $397</span>
                    </div>
                    <p className="text-gray-600">With over 500 teachings, prayers & prophetic words from Graham Cooke</p>
                  </div>
                </div>
                
                {/* Gatherings */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-4">
                    <svg className="h-6 w-6 text-[#74A78E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-xl font-semibold text-[#264653]">Gatherings</h4>
                      <span className="text-base font-medium text-[#264653] w-[100px] text-right">Value: $197</span>
                    </div>
                    <p className="text-gray-600">Your global community engaging with powerful teaching and prophetic activation</p>
                  </div>
                </div>
                
                {/* Events */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-4">
                    <svg className="h-6 w-6 text-[#74A78E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-xl font-semibold text-[#264653]">Events</h4>
                      <span className="text-base font-medium text-[#264653] w-[100px] text-right">Value: $297</span>
                    </div>
                    <p className="text-gray-600">Exclusive tickets to our biggest events of the year, all included</p>
            </div>
          </div>
          
                {/* Small Groups */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-4">
                    <svg className="h-6 w-6 text-[#74A78E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-xl font-semibold text-[#264653]">Small Groups</h4>
                      <span className="text-base font-medium text-[#264653] w-[100px] text-right">Priceless</span>
                    </div>
                    <p className="text-gray-600">Twice yearly 12-week studies connecting you with fellow believers</p>
                  </div>
                </div>
            </div>
            
              {/* Price and CTA */}
              <div className="mt-10 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-base font-medium text-gray-500 line-through">Total Value: $891</span>
                  <div className="flex items-baseline my-4">
                    <span className="text-5xl font-bold text-[#264653]">
                      ${selectedFrequency === 'annual' ? '397' : '47'}
                    </span>
                    <span className="text-xl font-medium text-gray-600 ml-2">/{selectedFrequency === 'annual' ? 'year' : 'month'}</span>
            </div>
                  
                  <a
                    href={`/checkout?plan=${selectedFrequency}`}
                    className="mt-4 w-full sm:w-auto px-8 py-4 bg-[#74A78E] hover:bg-[#74A78E]/90 text-white rounded-full font-medium inline-block"
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
