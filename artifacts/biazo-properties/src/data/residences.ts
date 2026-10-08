import heroImage from '@assets/generated_images/biazo-hero.jpg';
import livingImage from '@assets/generated_images/biazo-featured-living.jpg';
import bedroomImage from '@assets/generated_images/biazo-featured-bedroom.jpg';
import poolImage from '@assets/generated_images/biazo-pool.jpg';
import terraceImage from '@assets/generated_images/biazo-terrace.jpg';
import beachImage from '@assets/generated_images/biazo-beach.jpg';
import downtownImage from '@assets/generated_images/biazo-downtown.jpg';
import futureCityImage from '@assets/generated_images/biazo-future-city.jpg';
import golfImage from '@assets/generated_images/biazo-golf.jpg';
import bluewatersImage from '@assets/generated_images/biazo-bluewaters.jpg';
import businessBayImage from '@assets/generated_images/biazo-businessbay.jpg';
import downtown2Image from '@assets/generated_images/biazo-downtown2.jpg';

export interface Residence {
  id: string;
  name: string;
  tagline: string;
  neighborhood: string;
  address: string;
  type: 'Penthouse' | 'Villa' | 'Suite' | 'Apartment';
  bedrooms: number;
  bathrooms: number;
  sleeps: number;
  sqft: number;
  pricePerNightAed: number;
  cleaningFeeAed: number;
  rating: number;
  reviewsCount: number;
  description: string;
  images: { url: string; caption: string }[];
  amenities: string[];
  bookedRanges: { start: string; end: string }[];
  externalIcalUrls?: string[];
}

export const residences: Residence[] = [
  {
    id: 'bvh-skyline-suite',
    name: 'The Address Skyline Suite',
    tagline: 'High-floor panoramic haven overlooking the Burj Khalifa',
    neighborhood: 'Downtown Dubai',
    address: 'Sheikh Mohammed bin Rashid Blvd, Downtown Dubai',
    type: 'Penthouse',
    bedrooms: 2,
    bathrooms: 2.5,
    sleeps: 4,
    sqft: 1850,
    pricePerNightAed: 1850,
    cleaningFeeAed: 350,
    rating: 4.96,
    reviewsCount: 38,
    description: 'A high-floor two-bedroom residence overlooking the city’s most iconic silhouette. Calm natural timber, bespoke Italian furnishings, soft Belgian linen, and floor-to-ceiling glass that reveals the Dubai skyline as light transitions through the day.',
    images: [
      { url: livingImage, caption: 'The panoramic living salon' },
      { url: bedroomImage, caption: 'The principal suite & skyline views' },
      { url: poolImage, caption: 'Private infinity-edge rooftop pool' },
      { url: terraceImage, caption: 'Sunlit sunset terrace' },
      { url: downtownImage, caption: 'Downtown neighborhood perspective' },
    ],
    amenities: [
      'Private Rooftop Pool Access',
      '24/7 Dedicated Concierge',
      'Burj Khalifa & Fountain Views',
      'Valet & Reserved Covered Parking',
      'Daily Housekeeping Available',
      'Sonos Multi-Room Sound',
      'Gourmet Nespresso & Tea Bar',
      'Ultra High-Speed Fiber Wi-Fi (500 Mbps)',
      'Luxury Acqua di Parma Toiletries',
      'Keyless Smart Door Lock'
    ],
    bookedRanges: [
      { start: '2026-10-02', end: '2026-10-06' },
      { start: '2026-10-14', end: '2026-10-18' }
    ]
  },
  {
    id: 'bvh-palm-beach-villa',
    name: 'Palm Jumeirah Ocean Villa',
    tagline: 'Direct beachfront villa with private shoreline and infinity pool',
    neighborhood: 'Palm Jumeirah',
    address: 'Frond N, Palm Jumeirah, Dubai',
    type: 'Villa',
    bedrooms: 4,
    bathrooms: 4.5,
    sleeps: 8,
    sqft: 5200,
    pricePerNightAed: 4600,
    cleaningFeeAed: 650,
    rating: 4.98,
    reviewsCount: 52,
    description: 'Step directly from your private travertine patio onto the serene white sands of the Arabian Gulf. Featuring generous outdoor entertaining spaces, a temperature-controlled pool, private sunbeds, and custom interior architecture.',
    images: [
      { url: beachImage, caption: 'Private beachfront & shoreline' },
      { url: poolImage, caption: 'Private courtyard infinity pool' },
      { url: livingImage, caption: 'Double-height grand salon' },
      { url: bedroomImage, caption: 'Master suite with private ocean balcony' },
      { url: terraceImage, caption: 'Open-air dining terrace' }
    ],
    amenities: [
      'Direct Private Beach Access',
      'Private Temperature-Controlled Pool',
      'Outdoor BBQ & Al Fresco Dining',
      'Private Butler Service on Request',
      'Miele Fitted Chef Kitchen',
      'Chauffeured Airport Arrival Transfer',
      'Paddleboards & Beach Equipment',
      'Creston Home Automation',
      'Secure Gated Community'
    ],
    bookedRanges: [
      { start: '2026-09-28', end: '2026-10-03' },
      { start: '2026-10-20', end: '2026-10-25' }
    ]
  },
  {
    id: 'bvh-marina-promenade',
    name: 'Marina Promenade Sky Residence',
    tagline: 'Waterfront luxury surrounded by yachts, sea breezes, and city lights',
    neighborhood: 'Dubai Marina',
    address: 'Marina Promenade, Dubai Marina',
    type: 'Apartment',
    bedrooms: 3,
    bathrooms: 3.5,
    sleeps: 6,
    sqft: 2600,
    pricePerNightAed: 2450,
    cleaningFeeAed: 450,
    rating: 4.92,
    reviewsCount: 29,
    description: 'Perched above the sparkling water of Dubai Marina, this three-bedroom home combines nautical elegance with relaxed residential warmth. Walk down to premier waterfront dining, or watch luxury yachts glide by from your expansive terrace.',
    images: [
      { url: terraceImage, caption: 'Marina waterfront terrace' },
      { url: livingImage, caption: 'Spacious light-flooded living room' },
      { url: bedroomImage, caption: 'Primary bedroom suite' },
      { url: poolImage, caption: 'Building resident lap pool' },
      { url: heroImage, caption: 'Marina night vista' }
    ],
    amenities: [
      'Expansive Marina Waterfront Terrace',
      'Walking Distance to JBR Beach',
      'Technogym Wellness Gym Access',
      'High-Speed Wi-Fi',
      'Smart 75" 4K OLED Screens',
      'Wine Cooler & Espresso Bar',
      '2 Dedicated Parking Bays',
      '24/7 Security & Concierge'
    ],
    bookedRanges: [
      { start: '2026-10-08', end: '2026-10-12' }
    ]
  },
  {
    id: 'bvh-emirates-hills-sanctuary',
    name: 'Emirates Hills Golf Estate',
    tagline: 'Secluded private estate overlooking championship emerald fairways',
    neighborhood: 'Emirates Hills',
    address: 'Montgomerie Hill, Emirates Hills, Dubai',
    type: 'Villa',
    bedrooms: 5,
    bathrooms: 6,
    sleeps: 10,
    sqft: 7800,
    pricePerNightAed: 6800,
    cleaningFeeAed: 900,
    rating: 5.0,
    reviewsCount: 19,
    description: 'An architectural statement set in the prestigious Emirates Hills enclave. Sprawling manicured gardens, a secluded 20-meter pool, private screening room, and panoramic golf course views deliver the ultimate in tranquility and family privacy.',
    images: [
      { url: golfImage, caption: 'Championship fairways & private grounds' },
      { url: livingImage, caption: 'Art-curated living gallery' },
      { url: poolImage, caption: '20m private illuminated pool' },
      { url: bedroomImage, caption: 'Presidential master retreat' },
      { url: terraceImage, caption: 'Sunset pergola & lounge' }
    ],
    amenities: [
      'Championship Golf Course Frontage',
      'Private 20-Meter Pool & Jacuzzi',
      'Private Cinema & Entertainment Lounge',
      'Dedicated Driver & Private Chef Available',
      'Staff Quarters with Separate Entrance',
      'Sub-Zero & Wolf Kitchen Appliances',
      'Lush Landscaped Lawns & Barbecue Station',
      'Ultimate Privacy in Dubai’s Most Exclusive Gated Community'
    ],
    bookedRanges: [
      { start: '2026-10-10', end: '2026-10-16' }
    ]
  },
  {
    id: 'bvh-difc-loft',
    name: 'DIFC Artisan Sky Loft',
    tagline: 'Sophisticated metropolitan duplex for couples & business travelers',
    neighborhood: 'Downtown Dubai',
    address: 'Gate Precinct, DIFC, Dubai',
    type: 'Suite',
    bedrooms: 1,
    bathrooms: 1.5,
    sleeps: 2,
    sqft: 1250,
    pricePerNightAed: 1250,
    cleaningFeeAed: 250,
    rating: 4.89,
    reviewsCount: 44,
    description: 'Steps away from Dubai’s Michelin-starred restaurants and contemporary art galleries. Features soaring double-height concrete-and-timber ceilings, bespoke cocktail station, dedicated workstation, and serene urban elegance.',
    images: [
      { url: futureCityImage, caption: 'Metropolitan cityscape view' },
      { url: livingImage, caption: 'Double-height urban loft salon' },
      { url: bedroomImage, caption: 'Mezzanine master sleeping suite' },
      { url: heroImage, caption: 'Twilight architectural skyline' }
    ],
    amenities: [
      'Walking Distance to Gate Village & Fine Dining',
      'Dedicated Ergonomic Workstation & Fast Wi-Fi',
      'Artisan Coffee & Craft Cocktail Bar',
      'Building Infinity Pool & Spa Access',
      'Metro & Downtown Proximity',
      'Keyless Mobile Entry'
    ],
    bookedRanges: [
      { start: '2026-10-01', end: '2026-10-04' }
    ]
  },
  {
    id: 'bvh-bluewaters-retreat',
    name: 'Bluewaters Island Waterfront Retreat',
    tagline: 'Seafront living with Ain Dubai views and private Gulf terrace',
    neighborhood: 'Bluewaters Island',
    address: 'Bluewaters Residences, Bluewaters Island, Dubai',
    type: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    sleeps: 4,
    sqft: 1620,
    pricePerNightAed: 2100,
    cleaningFeeAed: 380,
    rating: 4.94,
    reviewsCount: 31,
    description: 'Wake up to the Gulf and the iconic Ain Dubai — the world\'s largest observation wheel — from your private waterfront terrace. This beautifully appointed two-bedroom retreat combines airy island calm with the energy of Dubai\'s most exciting new destination, steps from world-class dining and the Caesars Palace beach.',
    images: [
      { url: bluewatersImage, caption: 'Gulf-front living with Ain Dubai views' },
      { url: beachImage, caption: 'Caesars Palace private beach access' },
      { url: livingImage, caption: 'Bright open-plan living salon' },
      { url: bedroomImage, caption: 'Master bedroom with sea breeze' },
      { url: terraceImage, caption: 'Waterfront terrace at sunset' },
    ],
    amenities: [
      'Ain Dubai & Gulf Panorama Views',
      'Access to Caesars Palace Beach',
      'Island Promenade & World-Class Dining Steps Away',
      'Private Waterfront Terrace',
      'Keyless Smart Entry',
      '24/7 Concierge',
      'Technogym Fitness Access',
      'Secure Covered Parking',
      'High-Speed Wi-Fi'
    ],
    bookedRanges: [
      { start: '2026-10-05', end: '2026-10-09' }
    ]
  },
  {
    id: 'bvh-businessbay-canal',
    name: 'Business Bay Canal Penthouse',
    tagline: 'Sleek urban sanctuary above the glittering Dubai Water Canal',
    neighborhood: 'Business Bay',
    address: 'Executive Towers, Business Bay, Dubai',
    type: 'Penthouse',
    bedrooms: 3,
    bathrooms: 3.5,
    sleeps: 6,
    sqft: 2900,
    pricePerNightAed: 2750,
    cleaningFeeAed: 480,
    rating: 4.91,
    reviewsCount: 23,
    description: 'A sophisticated full-floor penthouse hovering above the Dubai Water Canal with commanding views of the Burj Khalifa and Downtown skyline. Dark timber, brushed brass fixtures, and custom Italian furnishings set the tone — paired with a chef kitchen, private jacuzzi, and seamless access to Dubai\'s financial and cultural heartbeat.',
    images: [
      { url: businessBayImage, caption: 'Canal-view living & designer kitchen' },
      { url: futureCityImage, caption: 'Business Bay skyline at dusk' },
      { url: bedroomImage, caption: 'Master suite with canal views' },
      { url: poolImage, caption: 'Private rooftop jacuzzi deck' },
      { url: terraceImage, caption: 'Wraparound penthouse terrace' },
    ],
    amenities: [
      'Dubai Water Canal & Burj Khalifa Views',
      'Private Rooftop Jacuzzi',
      'Chef\'s Gaggenau Kitchen',
      'Dedicated Concierge & Valet',
      'Infinity Rooftop Pool Access',
      'Walking Distance to Dubai Mall & Metro',
      'Smart Home Automation',
      'Keyless Mobile Entry',
      '2 Reserved Parking Spaces'
    ],
    bookedRanges: [
      { start: '2026-10-12', end: '2026-10-17' }
    ]
  },
  {
    id: 'bvh-downtown-fountain-penthouse',
    name: 'Downtown Fountain Penthouse',
    tagline: 'Iconic terrace pool with front-row Burj Khalifa & Fountain views',
    neighborhood: 'Downtown Dubai',
    address: 'Opera Grand, Downtown Dubai',
    type: 'Penthouse',
    bedrooms: 3,
    bathrooms: 3,
    sleeps: 6,
    sqft: 3400,
    pricePerNightAed: 3950,
    cleaningFeeAed: 580,
    rating: 5.0,
    reviewsCount: 14,
    description: 'The most coveted address in Downtown Dubai — a sprawling three-bedroom penthouse with an enormous private terrace, heated plunge pool, and an uninterrupted front-row seat to the Dubai Fountain and Burj Khalifa light show every evening. Designed for those who want the absolute best that Dubai has to offer.',
    images: [
      { url: downtown2Image, caption: 'Private terrace pool with Burj Khalifa view' },
      { url: downtownImage, caption: 'Downtown Dubai neighbourhood' },
      { url: livingImage, caption: 'Grand penthouse living salon' },
      { url: bedroomImage, caption: 'Master suite with fountain views' },
      { url: poolImage, caption: 'Terrace heated plunge pool at night' },
    ],
    amenities: [
      'Unobstructed Burj Khalifa & Fountain Views',
      'Private Heated Terrace Plunge Pool',
      'Front-Row Dubai Fountain Show Nightly',
      'Steps from Dubai Opera & Dubai Mall',
      'Dedicated Butler on Request',
      'Valet & Covered Parking',
      'Luxury Diptyque Toiletries',
      'Keyless Smart Entry',
      'Daily Housekeeping'
    ],
    bookedRanges: [
      { start: '2026-10-08', end: '2026-10-11' },
      { start: '2026-10-22', end: '2026-10-27' }
    ]
  },
  {
    id: 'bvh-holiday-inn-jvc',
    name: 'Holiday Inn Dubai Jumeirah Village Circle by IHG',
    tagline: 'Contemporary hotel suites in the heart of JVC with resort-style pool',
    neighborhood: 'Jumeirah Village Circle',
    address: 'Jumeirah Village Circle, Dubai',
    type: 'Suite',
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 2,
    sqft: 450,
    pricePerNightAed: 480,
    cleaningFeeAed: 80,
    rating: 4.5,
    reviewsCount: 128,
    description: 'Stylish modern suites in the vibrant Jumeirah Village Circle community. Enjoy resort-style amenities including a rooftop pool, fitness centre, and easy access to Dubai\'s key business and leisure hubs. Perfect for both short stays and extended visits.',
    images: [
      { url: livingImage, caption: 'Modern suite living area' },
      { url: bedroomImage, caption: 'Comfortable king bedroom' },
      { url: poolImage, caption: 'Rooftop pool & sun deck' },
    ],
    amenities: [
      'Rooftop Pool',
      '24/7 Fitness Centre',
      'On-Site Restaurant & Bar',
      'Free High-Speed Wi-Fi',
      'Daily Housekeeping',
      'Concierge Service',
      'IHG Rewards Benefits'
    ],
    bookedRanges: []
  },
  {
    id: 'bvh-ibis-deira-creekside',
    name: 'ibis Deira Creekside Dubai',
    tagline: 'Smart city-centre stay steps from the historic Dubai Creek',
    neighborhood: 'Deira',
    address: 'Al Rigga, Deira, Dubai',
    type: 'Suite',
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 2,
    sqft: 320,
    pricePerNightAed: 280,
    cleaningFeeAed: 50,
    rating: 4.2,
    reviewsCount: 214,
    description: 'A smart and comfortable base in the heart of historic Deira, steps from the iconic Dubai Creek, traditional souks, and Al Rigga metro station. Featuring modern rooms, a rooftop pool, and everything you need for an efficient, comfortable stay.',
    images: [
      { url: bedroomImage, caption: 'Cosy modern room' },
      { url: heroImage, caption: 'Deira creek neighbourhood' },
      { url: poolImage, caption: 'Rooftop swimming pool' },
    ],
    amenities: [
      'Rooftop Pool',
      'Free Wi-Fi',
      'Daily Housekeeping',
      'Steps to Al Rigga Metro',
      'On-Site Restaurant',
      'Tour Desk & Concierge',
      '24/7 Reception'
    ],
    bookedRanges: []
  },
  {
    id: 'bvh-radisson-blu-canal',
    name: 'Radisson Blu Hotel, Dubai Canal View',
    tagline: 'Upscale waterfront rooms overlooking the Dubai Water Canal',
    neighborhood: 'Business Bay',
    address: 'Business Bay, Dubai Canal, Dubai',
    type: 'Suite',
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 2,
    sqft: 520,
    pricePerNightAed: 750,
    cleaningFeeAed: 120,
    rating: 4.7,
    reviewsCount: 97,
    description: 'A premium Radisson Blu property offering stunning views of the Dubai Water Canal in the bustling Business Bay district. Featuring spacious rooms, a rooftop infinity pool, world-class dining, and proximity to Downtown Dubai and the Dubai Mall.',
    images: [
      { url: businessBayImage, caption: 'Canal view from the hotel' },
      { url: livingImage, caption: 'Elegant suite lounge' },
      { url: poolImage, caption: 'Rooftop infinity pool' },
      { url: bedroomImage, caption: 'Deluxe king room' },
    ],
    amenities: [
      'Dubai Water Canal Views',
      'Rooftop Infinity Pool',
      'Spa & Wellness Centre',
      'Multiple F&B Outlets',
      'Free High-Speed Wi-Fi',
      'Fitness Centre',
      'Valet Parking'
    ],
    bookedRanges: []
  },
  {
    id: 'bvh-radisson-blu-barsha',
    name: 'Radisson Blu Hotel, Dubai Barsha Heights',
    tagline: 'Upscale hotel in Barsha Heights with easy access to Dubai\'s business districts',
    neighborhood: 'Barsha Heights',
    address: 'Barsha Heights (TECOM), Dubai',
    type: 'Suite',
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 2,
    sqft: 490,
    pricePerNightAed: 680,
    cleaningFeeAed: 110,
    rating: 4.6,
    reviewsCount: 143,
    description: 'Located in the thriving Barsha Heights (TECOM) business hub, this Radisson Blu property is the ideal base for business and leisure guests alike. Enjoy elegant rooms, a rooftop pool with panoramic city views, and seamless connectivity to Media City, Internet City, and JBR.',
    images: [
      { url: futureCityImage, caption: 'City views from Barsha Heights' },
      { url: bedroomImage, caption: 'Spacious Radisson Blu room' },
      { url: poolImage, caption: 'Rooftop pool with city views' },
      { url: livingImage, caption: 'Suite lounge area' },
    ],
    amenities: [
      'Rooftop Pool & Sundeck',
      'Spa & Fitness Centre',
      'On-Site Restaurant & Bar',
      'Free High-Speed Wi-Fi',
      'Meeting & Event Facilities',
      'Metro Access Nearby',
      '24/7 Concierge'
    ],
    bookedRanges: []
  },
  {
    id: 'bvh-howard-johnson-deira',
    name: 'Howard Johnson Plaza by Wyndham Dubai Deira',
    tagline: 'Comfortable full-service hotel in the lively heart of Deira',
    neighborhood: 'Deira',
    address: 'Al Rigga Road, Deira, Dubai',
    type: 'Suite',
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 2,
    sqft: 400,
    pricePerNightAed: 420,
    cleaningFeeAed: 70,
    rating: 4.3,
    reviewsCount: 176,
    description: 'A well-established full-service hotel in Al Rigga, Deira — one of Dubai\'s most authentic and vibrant districts. Walking distance to the Dubai Creek, Gold Souk, Spice Souk, and Al Rigga Metro Station. Features dining, pool, and friendly Wyndham hospitality.',
    images: [
      { url: bedroomImage, caption: 'Comfortable guest room' },
      { url: poolImage, caption: 'Outdoor swimming pool' },
      { url: heroImage, caption: 'Deira neighbourhood' },
    ],
    amenities: [
      'Outdoor Swimming Pool',
      'Multiple Dining Options',
      'Free Wi-Fi',
      'Tour & Travel Desk',
      'Steps to Gold & Spice Souks',
      'Airport Shuttle Available',
      '24/7 Front Desk'
    ],
    bookedRanges: []
  },
  {
    id: 'bvh-hampton-airport',
    name: 'Hampton By Hilton Dubai Airport',
    tagline: 'Smart airport hotel with seamless connectivity and Hilton comfort',
    neighborhood: 'Dubai Airport',
    address: 'Dubai International Airport Area, Dubai',
    type: 'Suite',
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 2,
    sqft: 380,
    pricePerNightAed: 500,
    cleaningFeeAed: 80,
    rating: 4.4,
    reviewsCount: 201,
    description: 'The ideal choice for transit travellers and early-morning or late-night arrivals. Offering the signature Hampton by Hilton comfort with clean, modern rooms, complimentary breakfast, an outdoor pool, and just minutes from Terminal 1 and Terminal 3 of Dubai International Airport.',
    images: [
      { url: bedroomImage, caption: 'Clean, comfortable Hampton room' },
      { url: poolImage, caption: 'Outdoor pool' },
      { url: livingImage, caption: 'Relaxed common area' },
    ],
    amenities: [
      'Complimentary Hot Breakfast',
      'Outdoor Swimming Pool',
      'Free Airport Shuttle',
      'Fitness Centre',
      'Free High-Speed Wi-Fi',
      'Hilton Honors Benefits',
      '24/7 Reception'
    ],
    bookedRanges: []
  },
  {
    id: 'bvh-first-collection-jvc',
    name: 'The First Collection Dubai Jumeirah Village Circle',
    tagline: 'Trendy boutique-style hotel with rooftop pool in vibrant JVC',
    neighborhood: 'Jumeirah Village Circle',
    address: 'Jumeirah Village Circle, Dubai',
    type: 'Apartment',
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 2,
    sqft: 560,
    pricePerNightAed: 650,
    cleaningFeeAed: 100,
    rating: 4.6,
    reviewsCount: 89,
    description: 'A Tribute Portfolio Hotel that brings a fresh, design-forward hospitality concept to JVC. Featuring a spectacular rooftop pool and bar, contemporary rooms with local artwork, and a vibrant food and beverage scene. Part of the Marriott Bonvoy portfolio.',
    images: [
      { url: futureCityImage, caption: 'Rooftop views across JVC' },
      { url: poolImage, caption: 'Rooftop pool & bar' },
      { url: bedroomImage, caption: 'Design-forward bedroom' },
      { url: livingImage, caption: 'Stylish living area' },
    ],
    amenities: [
      'Rooftop Pool & Bar',
      'Modern Fitness Studio',
      'Multiple Dining Venues',
      'Free High-Speed Wi-Fi',
      'Marriott Bonvoy Benefits',
      'Parking Available',
      'Concierge Service'
    ],
    bookedRanges: []
  },
  {
    id: 'bvh-crowne-plaza-jumeirah',
    name: 'Crowne Plaza Dubai Jumeirah by IHG',
    tagline: 'Premium hotel with beach access in the heart of Jumeirah',
    neighborhood: 'Jumeirah',
    address: 'Jumeirah Beach Road, Dubai',
    type: 'Suite',
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 2,
    sqft: 550,
    pricePerNightAed: 820,
    cleaningFeeAed: 130,
    rating: 4.7,
    reviewsCount: 112,
    description: 'A landmark property on Jumeirah Beach Road offering the quintessential Dubai beach holiday. Guests enjoy access to a private beach, outdoor pool, a variety of restaurants, and the iconic location that is central to everything Jumeirah has to offer. IHG Rewards recognised.',
    images: [
      { url: beachImage, caption: 'Private beach access' },
      { url: poolImage, caption: 'Outdoor swimming pool' },
      { url: bedroomImage, caption: 'Elegant Crowne Plaza room' },
      { url: terraceImage, caption: 'Poolside terrace' },
    ],
    amenities: [
      'Private Beach Access',
      'Outdoor Pool',
      'Multiple Restaurants & Bars',
      'Fitness & Wellness Centre',
      'Free Wi-Fi',
      'IHG Rewards Benefits',
      'Concierge & Valet'
    ],
    bookedRanges: []
  },
  {
    id: 'bvh-ibis-styles-airport',
    name: 'ibis Styles Dubai Airport Hotel',
    tagline: 'Cheerful, value-for-money hotel minutes from Dubai Airport',
    neighborhood: 'Dubai Airport',
    address: 'Airport Road, Dubai',
    type: 'Suite',
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 2,
    sqft: 300,
    pricePerNightAed: 260,
    cleaningFeeAed: 45,
    rating: 4.1,
    reviewsCount: 283,
    description: 'An ibis Styles property bursting with colour and personality, ideally located near Dubai International Airport. Offering comfortable rooms with complimentary breakfast, a pool, and everything you need for a smooth transit stay or budget-friendly Dubai trip.',
    images: [
      { url: bedroomImage, caption: 'Colourful ibis Styles room' },
      { url: poolImage, caption: 'Outdoor pool' },
      { url: heroImage, caption: 'Airport area location' },
    ],
    amenities: [
      'Complimentary Breakfast',
      'Outdoor Pool',
      'Free Wi-Fi',
      'On-Site Restaurant',
      'Airport Shuttle Available',
      'AccorHotels Benefits',
      '24/7 Front Desk'
    ],
    bookedRanges: []
  },
  {
    id: 'bvh-novotel-al-barsha',
    name: 'Novotel Dubai Al Barsha',
    tagline: 'Well-appointed hotel with mall access and easy MOE connectivity',
    neighborhood: 'Al Barsha',
    address: 'Al Barsha, Sheikh Zayed Road, Dubai',
    type: 'Suite',
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 2,
    sqft: 480,
    pricePerNightAed: 550,
    cleaningFeeAed: 90,
    rating: 4.5,
    reviewsCount: 167,
    description: 'A reliable Novotel property in Al Barsha, directly connected to the Mall of the Emirates and a short walk to the metro. Offering spacious rooms, a rooftop pool, fitness centre, and the signature Novotel dining experience — ideal for families and business travellers.',
    images: [
      { url: livingImage, caption: 'Spacious Novotel room' },
      { url: poolImage, caption: 'Rooftop pool & sundeck' },
      { url: bedroomImage, caption: 'King-bedded guest room' },
      { url: futureCityImage, caption: 'Al Barsha city views' },
    ],
    amenities: [
      'Connected to Mall of the Emirates',
      'Rooftop Pool',
      'Fitness Centre',
      'Multiple Dining Options',
      'Free Wi-Fi',
      'AccorHotels ALL Benefits',
      'Metro Access Nearby'
    ],
    bookedRanges: []
  },
  {
    id: 'bvh-hilton-garden-deira',
    name: 'Hilton Garden Inn Dubai Deira',
    tagline: 'Dependable Hilton hospitality in the vibrant Deira district',
    neighborhood: 'Deira',
    address: 'Al Rigga, Deira, Dubai',
    type: 'Suite',
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 2,
    sqft: 430,
    pricePerNightAed: 620,
    cleaningFeeAed: 100,
    rating: 4.5,
    reviewsCount: 155,
    description: 'The Hilton Garden Inn brings reliable upscale comfort to the heart of Deira. Guests enjoy spacious, modern rooms, an outdoor pool, and easy access to Dubai Creek, the souks, and Al Rigga metro. A great base for exploring Dubai\'s historic and modern sides alike.',
    images: [
      { url: bedroomImage, caption: 'Hilton Garden Inn guest room' },
      { url: poolImage, caption: 'Outdoor swimming pool' },
      { url: heroImage, caption: 'Deira neighbourhood views' },
      { url: livingImage, caption: 'Comfortable lounge area' },
    ],
    amenities: [
      'Outdoor Pool',
      '24/7 Fitness Centre',
      'The Garden Grille & Bar',
      'Free Wi-Fi',
      'Hilton Honors Benefits',
      'Business Centre',
      'Steps to Deira Souks'
    ],
    bookedRanges: []
  },
  {
    id: 'bvh-damac-hills-2',
    name: 'DAMAC Hills 2 Hotel, an Edge by Rotana Hotel',
    tagline: 'Resort-style hotel surrounded by lush greenery in DAMAC Hills 2',
    neighborhood: 'DAMAC Hills 2',
    address: 'DAMAC Hills 2, Dubailand, Dubai',
    type: 'Suite',
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 2,
    sqft: 500,
    pricePerNightAed: 590,
    cleaningFeeAed: 95,
    rating: 4.4,
    reviewsCount: 76,
    description: 'An Edge by Rotana property nestled within the green master-planned community of DAMAC Hills 2. Enjoy a tranquil resort-like atmosphere with multiple pools, tennis courts, and beautifully landscaped surroundings — ideal for families seeking space and calm away from the city centre.',
    images: [
      { url: golfImage, caption: 'Lush community greenery' },
      { url: poolImage, caption: 'Community pool complex' },
      { url: bedroomImage, caption: 'Comfortable Edge by Rotana room' },
      { url: terraceImage, caption: 'Relaxing outdoor terrace' },
    ],
    amenities: [
      'Multiple Swimming Pools',
      'Tennis & Sports Courts',
      'Fitness Centre',
      'On-Site Restaurant',
      'Free Wi-Fi',
      'Rotana Rewards Benefits',
      'Family-Friendly Facilities'
    ],
    bookedRanges: []
  },
  {
    id: 'bvh-hyatt-regency-corniche',
    name: 'Hyatt Regency Dubai - Corniche',
    tagline: 'Iconic beachfront tower with panoramic Gulf views on the Corniche',
    neighborhood: 'Deira',
    address: 'Baniyas Road, Corniche, Deira, Dubai',
    type: 'Suite',
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 2,
    sqft: 580,
    pricePerNightAed: 950,
    cleaningFeeAed: 150,
    rating: 4.8,
    reviewsCount: 189,
    description: 'One of Dubai\'s most iconic hotels, the Hyatt Regency Dubai stands tall on the Corniche waterfront with sweeping views of the Arabian Gulf, Deira skyline, and Dubai Creek. Enjoy an array of world-class dining, a private beach, stunning pool deck, and World of Hyatt recognition.',
    images: [
      { url: beachImage, caption: 'Corniche waterfront & private beach' },
      { url: poolImage, caption: 'Pool deck with Gulf views' },
      { url: bedroomImage, caption: 'Panoramic Gulf-view room' },
      { url: heroImage, caption: 'Corniche waterfront promenade' },
    ],
    amenities: [
      'Private Beach Access',
      'Gulf & Creek Panoramic Views',
      'Pool Deck & Sundeck',
      'Multiple Fine Dining Outlets',
      'Regency Club Lounge',
      'World of Hyatt Benefits',
      'Fitness Centre & Spa'
    ],
    bookedRanges: []
  },
  {
    id: 'bvh-gulf-oasis-barsha',
    name: 'Gulf Oasis Hotel Apartments',
    tagline: 'Spacious furnished apartments in Barsha Heights for short & long stays',
    neighborhood: 'Barsha Heights',
    address: 'Barsha Heights (TECOM), Dubai',
    type: 'Apartment',
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 3,
    sqft: 650,
    pricePerNightAed: 480,
    cleaningFeeAed: 85,
    rating: 4.3,
    reviewsCount: 94,
    description: 'Well-appointed hotel apartments in the heart of Barsha Heights (TECOM), offering the flexibility of a home with the services of a hotel. Spacious fully-furnished units with kitchens, a rooftop pool, and excellent proximity to Media City, Internet City, and Dubai Marina.',
    images: [
      { url: livingImage, caption: 'Fully furnished apartment living area' },
      { url: bedroomImage, caption: 'Comfortable king bedroom' },
      { url: poolImage, caption: 'Rooftop pool' },
    ],
    amenities: [
      'Fully Equipped Kitchen',
      'Rooftop Pool',
      'Fitness Centre',
      'Free Wi-Fi',
      'Daily/Weekly Housekeeping',
      'Laundry Facilities',
      'Concierge Service'
    ],
    bookedRanges: []
  },
  {
    id: 'bvh-voco-palm',
    name: 'voco Dubai The Palm by IHG',
    tagline: 'Stylish Palm Jumeirah retreat with Gulf views and beach club access',
    neighborhood: 'Palm Jumeirah',
    address: 'Palm Jumeirah, Dubai',
    type: 'Suite',
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 2,
    sqft: 600,
    pricePerNightAed: 1400,
    cleaningFeeAed: 200,
    rating: 4.8,
    reviewsCount: 134,
    description: 'The voco Dubai The Palm combines IHG\'s signature relaxed luxury with an unbeatable Palm Jumeirah address. Enjoy spectacular Arabian Gulf views, a stunning beach club, outdoor pools, and world-class dining — all infused with voco\'s playful, spirited personality.',
    images: [
      { url: beachImage, caption: 'Private beach club on the Palm' },
      { url: poolImage, caption: 'Outdoor infinity pool with Gulf views' },
      { url: bedroomImage, caption: 'Contemporary voco suite' },
      { url: terraceImage, caption: 'Sunset terrace overlooking the Gulf' },
    ],
    amenities: [
      'Private Beach Club',
      'Outdoor Infinity Pool',
      'Arabian Gulf Views',
      'Multiple Restaurants & Bars',
      'Fitness & Wellness Centre',
      'IHG One Rewards Benefits',
      'Concierge & Valet'
    ],
    bookedRanges: []
  },
  {
    id: 'bvh-la-zona-continental',
    name: 'La Zona Continental Hotel',
    tagline: 'Welcoming boutique hotel in historic Bur Dubai near the Creek',
    neighborhood: 'Bur Dubai',
    address: 'Bur Dubai, Dubai',
    type: 'Suite',
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 2,
    sqft: 350,
    pricePerNightAed: 350,
    cleaningFeeAed: 60,
    rating: 4.2,
    reviewsCount: 68,
    description: 'A charming and welcoming hotel tucked in the heart of Bur Dubai — one of the city\'s most culturally rich neighbourhoods. Guests are steps away from the Dubai Museum, Textile Souk, and Dubai Creek abra crossing. Clean, comfortable rooms and warm hospitality at a great value.',
    images: [
      { url: bedroomImage, caption: 'Comfortable guest room' },
      { url: heroImage, caption: 'Bur Dubai & Creek views' },
      { url: livingImage, caption: 'Hotel common area' },
    ],
    amenities: [
      'Free Wi-Fi',
      'Daily Housekeeping',
      'Tour & Travel Desk',
      'Steps to Dubai Museum',
      'Restaurant On-Site',
      '24/7 Front Desk',
      'Airport Transfer Available'
    ],
    bookedRanges: []
  },
  {
    id: 'bvh-tower-plaza',
    name: 'The Tower Plaza Hotel Dubai',
    tagline: 'Central Sheikh Zayed Road hotel with pool and panoramic city views',
    neighborhood: 'Sheikh Zayed Road',
    address: 'Sheikh Zayed Road, Dubai',
    type: 'Suite',
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 2,
    sqft: 420,
    pricePerNightAed: 580,
    cleaningFeeAed: 95,
    rating: 4.4,
    reviewsCount: 112,
    description: 'Conveniently positioned on iconic Sheikh Zayed Road, The Tower Plaza Hotel offers easy access to Dubai\'s financial centre, Dubai Mall, and Downtown Dubai. Featuring city-view rooms, a rooftop pool, fitness centre, and multiple dining options — a smart choice for business and leisure.',
    images: [
      { url: futureCityImage, caption: 'Sheikh Zayed Road skyline' },
      { url: bedroomImage, caption: 'City-view guest room' },
      { url: poolImage, caption: 'Rooftop pool' },
      { url: livingImage, caption: 'Comfortable lounge area' },
    ],
    amenities: [
      'Panoramic City Views',
      'Rooftop Pool',
      'Fitness Centre',
      'On-Site Restaurant & Bar',
      'Free Wi-Fi',
      'Metro Access Nearby',
      'Valet Parking'
    ],
    bookedRanges: []
  },
  {
    id: 'bvh-sheraton-the-walk',
    name: 'Sheraton The Walk, Dubai',
    tagline: 'Beachside luxury steps from JBR beach and The Walk promenade',
    neighborhood: 'Jumeirah Beach Residence',
    address: 'The Walk, JBR, Dubai Marina, Dubai',
    type: 'Suite',
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 2,
    sqft: 520,
    pricePerNightAed: 880,
    cleaningFeeAed: 140,
    rating: 4.7,
    reviewsCount: 223,
    description: 'A sophisticated Sheraton property positioned at the heart of The Walk at JBR — Dubai\'s iconic beachside promenade. Steps from Jumeirah Beach, world-class restaurants, and vibrant retail, with beautiful sea views, an outdoor pool terrace, and the legendary Sheraton service.',
    images: [
      { url: beachImage, caption: 'JBR beach & The Walk promenade' },
      { url: poolImage, caption: 'Outdoor pool with sea views' },
      { url: bedroomImage, caption: 'Contemporary Sheraton suite' },
      { url: terraceImage, caption: 'Sea-view terrace at sunset' },
    ],
    amenities: [
      'Steps to JBR Beach',
      'Outdoor Pool with Sea Views',
      'The Walk Promenade Access',
      'Multiple Restaurants & Lounges',
      'Fitness Centre',
      'Marriott Bonvoy Benefits',
      'Concierge & Valet'
    ],
    bookedRanges: []
  },
  {
    id: 'bvh-novotel-suites-mall-avenue',
    name: 'Novotel Suites Mall Avenue Dubai',
    tagline: 'Spacious aparthotel suites with direct mall access on Sheikh Zayed Road',
    neighborhood: 'Sheikh Zayed Road',
    address: 'Sheikh Zayed Road, Mall Avenue, Dubai',
    type: 'Apartment',
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 3,
    sqft: 580,
    pricePerNightAed: 620,
    cleaningFeeAed: 100,
    rating: 4.5,
    reviewsCount: 148,
    description: 'A modern aparthotel concept from Accor, offering generously sized suites with kitchenettes and direct access to Mall Avenue on Sheikh Zayed Road. Ideal for extended stays, families, and business travellers who want the flexibility of apartment living with full hotel services.',
    images: [
      { url: livingImage, caption: 'Spacious suite with kitchenette' },
      { url: bedroomImage, caption: 'Comfortable king bedroom' },
      { url: futureCityImage, caption: 'Sheikh Zayed Road views' },
      { url: poolImage, caption: 'Rooftop pool & terrace' },
    ],
    amenities: [
      'Direct Mall Avenue Access',
      'In-Suite Kitchenette',
      'Rooftop Pool',
      'Fitness Centre',
      'Free High-Speed Wi-Fi',
      'AccorHotels ALL Benefits',
      'Laundry Facilities'
    ],
    bookedRanges: []
  }
];

export interface BookingRecord {
  id: string;
  residenceId: string;
  residenceName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  totalAed: number;
  currency: 'AED' | 'USD';
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  paymentMethod: 'card' | 'arrival' | 'whatsapp';
  paymentStatus: 'paid' | 'guaranteed' | 'inquiry';
  bookedAt: string;
  smartLockPin: string;
}

export const AED_TO_USD_RATE = 3.6725;
