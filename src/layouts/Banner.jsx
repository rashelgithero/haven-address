import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Link } from 'react-router';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Banner() {
  const slides = [
    {
      id: 1,
      title: 'Modern Luxury Waterfront Villa',
      subtitle: 'Exclusive Coastal Living',
      description: 'Experience panoramic sea views, private infinity pools, and ultra-modern smart home technology designed for refined living.',
      price: '$2,450,000',
      tag: 'Featured Villa',
      location: 'Miami Beach, Florida',
      specs: { beds: 5, baths: 6, sqft: '6,200 sqft' },
      bgImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1920&q=80',
    },
    {
      id: 2,
      title: 'Skyline View Luxury Penthouse',
      subtitle: 'Heart of the City',
      description: 'Floor-to-ceiling windows, private elevator access, and a custom designer kitchen in the absolute heart of downtown.',
      price: '$1,850,000',
      tag: 'Urban Luxury',
      location: 'Downtown Manhattan, NY',
      specs: { beds: 3, baths: 3.5, sqft: '3,400 sqft' },
      bgImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80',
    },
    {
      id: 3,
      title: 'Serene Suburban Smart Estate',
      subtitle: 'Family & Comfort First',
      description: 'Spacious backyard oasis, energy-efficient solar architecture, top-tier school district, and 24/7 gated security.',
      price: '$980,000',
      tag: 'Family Living',
      location: 'Austin, Texas',
      specs: { beds: 4, baths: 3, sqft: '4,100 sqft' },
      bgImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80',
    },
  ];

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 my-6">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        className="w-full h-[520px] sm:h-[600px] lg:h-[650px] banner-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex items-center">
              {/* Background Image with Dark Gradient Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url(${slide.bgImage})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-transparent"></div>
              </div>

              {/* Slide Content */}
              <div className="relative z-10 max-w-3xl px-8 sm:px-14 lg:px-20 text-white space-y-5">
                
                {/* Badge Tag & Location */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3.5 py-1 bg-[#F9A51A] text-slate-950 text-xs font-extrabold uppercase tracking-wider rounded-full shadow-md">
                    {slide.tag}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-slate-300 flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                    <svg className="w-4 h-4 text-[#F9A51A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {slide.location}
                  </span>
                </div>

                {/* Subtitle & Main Title */}
                <div>
                  <p className="text-sm sm:text-base font-semibold text-[#F9A51A] tracking-wider uppercase mb-1">
                    {slide.subtitle}
                  </p>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                    {slide.title}
                  </h1>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-sm sm:text-base max-w-xl line-clamp-2 sm:line-clamp-3">
                  {slide.description}
                </p>

                {/* Specs Bar (Beds, Baths, Sqft) */}
                <div className="flex items-center gap-6 pt-2 border-t border-white/10 text-slate-300 text-sm">
                  <div>
                    <span className="text-white font-bold block text-base">{slide.specs.beds}</span>
                    <span className="text-xs text-slate-400">Bedrooms</span>
                  </div>
                  <div className="h-8 w-px bg-white/10"></div>
                  <div>
                    <span className="text-white font-bold block text-base">{slide.specs.baths}</span>
                    <span className="text-xs text-slate-400">Bathrooms</span>
                  </div>
                  <div className="h-8 w-px bg-white/10"></div>
                  <div>
                    <span className="text-white font-bold block text-base">{slide.specs.sqft}</span>
                    <span className="text-xs text-slate-400">Area</span>
                  </div>
                </div>

                {/* Pricing & Call to Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <div className="text-2xl sm:text-3xl font-black text-[#F9A51A]">
                    {slide.price}
                  </div>
                  
                  <Link
                    to="/properties"
                    className="px-6 py-3 bg-[#F9A51A] hover:bg-[#e09212] text-slate-950 font-bold text-sm rounded-xl transition shadow-lg flex items-center gap-2"
                  >
                    View Details
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>

                  <Link
                    to="/contact"
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 transition backdrop-blur-md"
                  >
                    Schedule Tour
                  </Link>
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}