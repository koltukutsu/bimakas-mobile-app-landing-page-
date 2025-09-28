"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";

const UserReviews = () => {
  const { t, config } = useLanguage();
  
  // Get reviews from translations
  const reviewItems = t('userReviews.items') || [];
  const reviewProfiles = config?.images?.userReviews?.profiles || [];

  // Map reviews with profile images
  const reviews = reviewItems.map((review: any, index: number) => ({
    name: review.username,
    quote: review.quote,
    image: reviewProfiles[index] || null,
    initials: review.username ? review.username.charAt(0).toUpperCase() : "U",
  }));

  if (!Array.isArray(reviews) || reviews.length === 0) {
    return (
      <section id="reviews" className="bg-[#3C4043] text-white py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-gray-400">Loading reviews...</div>
        </div>
      </section>
    );
  }

  // Determine grid layout based on number of reviews
  const getGridLayout = (count: number) => {
    if (count === 1) return "grid-cols-1 max-w-sm";
    if (count === 2) return "grid-cols-1 sm:grid-cols-2 max-w-2xl";
    if (count === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl";
    if (count === 4) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl";
    if (count >= 5) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl";
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl";
  };

  const ReviewCard = ({ review }: { review: any }) => (
    <div className="bg-[#2A2D36] p-4 sm:p-6 rounded-2xl flex flex-col gap-3 sm:gap-4 w-full transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center gap-3">
        {review.image ? (
          <Image
            src={review.image}
            alt={`${review.name} testimonial`}
            width={48}
            height={48}
            className="rounded-full w-10 h-10 sm:w-12 sm:h-12 object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#4A4A4C] to-[#3A3A3C] flex items-center justify-center text-white font-semibold text-base sm:text-lg flex-shrink-0">
            {review.initials}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm sm:text-base text-white mb-1 truncate">{review.name}</p>
          <div className="flex text-yellow-400 text-base sm:text-lg">
            {"★".repeat(5)}
          </div>
        </div>
      </div>
      <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
        "{review.quote}"
      </p>
    </div>
  );

  return (
    <section id="reviews" className="bg-[#3C4043] text-white py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-semibold mb-8 sm:mb-12 lg:mb-16 leading-tight text-white">
          {t('userReviews.title')}
        </h2>
        <div className={`grid ${getGridLayout(reviews.length)} gap-4 sm:gap-6 mx-auto justify-items-center`}>
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserReviews;