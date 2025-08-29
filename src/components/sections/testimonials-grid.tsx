"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";

const TestimonialsGrid = () => {
  const { t, config } = useLanguage();

  // Default testimonials matching the original design
  const defaultTestimonials = [
    {
      name: "Jeremiah Jones",
      quote: "Make a healthier choice for your late-night snack and use the Cal AI app to track your calories",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
    },
    {
      name: "Dawson Gibbs",
      quote: "Track with Cal AI app. If you're not tracking your calories while going for your goals then you're doing it all wrong.",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=500&fit=crop&crop=face",
    },
    {
      name: "Hussein Farhat",
      quote: "If you're tracking your calories and macros correctly with Cal AI, you can get away with eating almost anything and still get in shape as long as it matches your daily goals.",
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=600&fit=crop&crop=face",
    },
    {
      name: "Kadin Kerns", 
      quote: "Looking good as usual and my calories are too with Cal AI 💪",
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=500&fit=crop&crop=face",
    },
    {
      name: "Brian Wallack",
      quote: "Cal AI can literally track anything 😍",
      image: "https://images.unsplash.com/photo-1594736797933-d0f1dd35ba8a?w=400&h=400&fit=crop&crop=face",
    },
    {
      name: "Alex Eubank",
      quote: "Cal AI is literally the best calorie tracker. Fastest and most accurate I've ever used",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=500&fit=crop&crop=face",
    },
  ];

  // Get testimonials from translations or use defaults
  const testimonialItems = t('testimonials.items') || defaultTestimonials;
  const influencerImages = config?.images?.testimonials?.influencers || [];

  // Map testimonials with images
  const testimonials = testimonialItems.map((testimonial: any, index: number) => ({
    name: testimonial.name,
    quote: testimonial.quote,
    image: influencerImages[index]?.image || defaultTestimonials[index]?.image || `https://images.unsplash.com/photo-${1567515004624 + index}?w=400&h=${500 + index * 20}&fit=crop&crop=face`,
  }));

  if (!Array.isArray(testimonials) || testimonials.length === 0) {
    return (
      <section id="testimonials" className="py-16 lg:py-24 px-4 bg-[#FFF8F0]">
        <div className="text-center text-gray-500">Loading testimonials...</div>
      </section>
    );
  }

  const TestimonialCard = ({ testimonial }: { testimonial: any }) => (
    <a 
      href="#" 
      aria-label={`View ${testimonial.name} testimonial video`}
      target="_blank"
      className="block"
    >
      <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden shadow-lg group">
        <Image
          src={testimonial.image}
          alt={`${testimonial.name} testimonial`}
          fill
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        
        {/* Content overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-black/20 backdrop-blur-md rounded-b-2xl text-white border border-[#cfcfcf79] rounded-md m-4">
          <p className="text-4xl font-bold text-blue-400 -mt-2 -mb-5">"</p>
          <h3 className="text-xl font-semibold mb-1">{testimonial.name}</h3>
          <p className="text-sm font-light opacity-90">
            {testimonial.quote}
          </p>
        </div>
      </div>
    </a>
  );

  return (
    <section id="testimonials" className="py-16 lg:py-20 px-4 lg:px-6 bg-[#FFF8F0]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-3xl lg:text-4xl font-medium mb-12" style={{ color: config?.brand?.colors?.text || '#ff7778' }}>
          {t('testimonials.title')}
        </h2>
        
        {/* Grid Layout with 16:9 Aspect Ratio Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsGrid;