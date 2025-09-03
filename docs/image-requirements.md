# BiMakas Landing Page - Image Requirements

This document outlines all the visual assets needed for the BiMakas mobile app landing page, organized by section and priority.

## 📱 Mobile App Mockups (HIGH PRIORITY)

### 1. Hero Section - Main Mobile Mockup
- **Purpose**: Primary app showcase in hero section
- **Specifications**: 
  - Dimensions: 700x700px (will be responsive)
  - Format: WebP preferred, PNG/JPG acceptable
  - Content: BiMakas app main screen showing booking interface
- **Suggested Screens**: 
  - Service selection screen with barber/beauty options
  - Location/map view showing nearby professionals
  - Professional profile with ratings and services
- **Current Config Path**: `config.images.hero.mobileMockup`

### 2. Features Section - Mobile Screens (4 screens needed)
- **Purpose**: Interactive feature showcase with corresponding app screens
- **Specifications**: 
  - Dimensions: 350x700px (mobile aspect ratio)
  - Format: PNG/WebP
  - Quantity: 4 screens matching the 4 features
- **Required Screens**:
  
  #### Screen 1: "Call the Nearest Barber or Hairdresser to Your Location"
  - Map interface showing nearby professionals
  - Location pins with professional photos
  - Distance indicators and availability status
  
  #### Screen 2: "Wide Range of Services" 
  - Service categories grid (haircut, beard, skincare, etc.)
  - Service icons and pricing
  - Popular services highlighted
  
  #### Screen 3: "Easy Booking and Instant Requests"
  - Booking flow screen with date/time selection
  - Professional profile with reviews
  - Instant vs scheduled booking options
  
  #### Screen 4: "Live Tracking and Secure Payment"
  - Real-time tracking map showing professional en route
  - ETA and contact options
  - Payment confirmation screen

- **Current Config Path**: `config.images.features.mobileScreens[]`

### 3. Dark Mode Feature Section
- **Purpose**: Showcase dark mode version of the app
- **Specifications**:
  - Dimensions: 300x600px
  - Format: PNG/WebP with transparency
  - Content: Same as hero screen but in dark theme
- **Current Config Path**: `config.images.darkMode.mobileMockup`

## 👥 User Avatar & Profile Images

### 4. Hero Section - User Avatars (3 needed)
- **Purpose**: Social proof showing real users
- **Specifications**:
  - Dimensions: 32x32px (circular crop)
  - Format: PNG/JPG
  - Content: Diverse, professional-looking individuals
- **Current Config Path**: `config.images.hero.userAvatars[]`

### 5. User Reviews - Profile Pictures (4-5 needed)
- **Purpose**: Profile images for user testimonials
- **Specifications**:
  - Dimensions: 48x48px (circular crop)
  - Format: JPG/PNG
  - Content: Diverse users who would use beauty services
- **Current Config Path**: `config.images.userReviews.profiles[]`

## 📱 Instagram Content for Testimonials Section

### 6. Professional Testimonials - Instagram-Style Content (6 needed)
- **Purpose**: Replace generic testimonials with real Instagram posts/reels
- **Specifications**:
  - Aspect Ratio: 9:16 (Instagram Story/Reel format)
  - Dimensions: Minimum 400x711px
  - Format: JPG/PNG
  - Content Type: **Instagram Reels and Posts**

#### Suggested Instagram Content:
1. **Barber/Stylist at Work** - Action shot of professional providing service
2. **Before/After Transformation** - Client transformation showcase
3. **Professional Setup** - Mobile beauty station setup at client location
4. **Client Testimonial Video** - Screenshot from video testimonial
5. **Service in Progress** - Professional working at client's home/office
6. **Team/Professional Portrait** - Professional beauty expert portrait

#### Content Requirements:
- Real professionals in beauty/grooming industry
- High-quality, professional photography
- Authentic, not stock photos
- Include overlay text space for testimonial quotes
- Show BiMakas branding if possible

- **Current Config Path**: `config.images.testimonials.influencers[]`

## 🎨 Brand & Decorative Elements

### 7. App Store Buttons
- **Purpose**: Download buttons for iOS and Google Play
- **Current Assets**: Already configured in brand section
- **Dimensions**: 135x40px for App Store, 162x47.8px for Google Play

### 8. Decorative Elements
- **Wreath SVG**: Already available at `/public/wreath.svg`
- **Logo**: Available at `/public/logo.png`

## 📂 File Organization

Recommended folder structure for new images:
```
/public/
├── images/
│   ├── hero/
│   │   ├── mobile-mockup.webp
│   │   └── user-avatars/
│   │       ├── avatar-1.png
│   │       ├── avatar-2.png
│   │       └── avatar-3.png
│   ├── features/
│   │   ├── location-screen.png
│   │   ├── services-screen.png
│   │   ├── booking-screen.png
│   │   └── tracking-screen.png
│   ├── testimonials/
│   │   ├── instagram-post-1.jpg
│   │   ├── instagram-post-2.jpg
│   │   ├── instagram-reel-1.jpg
│   │   └── ... (6 total)
│   ├── reviews/
│   │   └── user-profiles/
│   └── dark-mode/
│       └── dark-mobile-mockup.png
```

## 🎯 Content Focus Areas

### For Mobile App Screenshots:
1. **Service Discovery**: Show how users find nearby professionals
2. **Booking Process**: Demonstrate easy scheduling
3. **Professional Profiles**: Highlight trust indicators (ratings, reviews, certifications)
4. **Real-time Features**: GPS tracking, communication tools
5. **Payment Integration**: Secure, seamless payment flow

### For Instagram Content:
1. **Real Professionals**: Actual barbers, stylists, beauty experts
2. **Service Delivery**: Professionals working at client locations
3. **Client Satisfaction**: Happy customers with great results
4. **Professional Quality**: High-end equipment and techniques
5. **Convenience Factor**: Services being delivered at homes, offices, hotels

## 📱 Technical Specifications

### Mobile Mockups:
- Use realistic device frames (iPhone/Android)
- Ensure UI elements are clearly visible
- Include BiMakas branding consistently
- Use actual color scheme from brand config (#ff7778 primary)
- Show realistic content, not Lorem ipsum

### Image Optimization:
- Use WebP format where possible for better performance
- Compress images while maintaining quality
- Provide 2x resolution for retina displays
- Ensure fast loading on mobile devices

## 🔄 Update Process

To update images in the site:
1. Add new images to `/public/images/` folder
2. Update the corresponding paths in `/src/config/site-config.json`
3. Test on both desktop and mobile devices
4. Verify loading performance

---

**Priority Order for Creation:**
1. Hero mobile mockup (most visible)
2. 4 feature screens (interactive showcase)
3. Instagram testimonial content (6 pieces)
4. User avatars and profile pictures
5. Dark mode mockup

This comprehensive image strategy will create a professional, authentic representation of the BiMakas platform that resonates with both service providers and customers.
