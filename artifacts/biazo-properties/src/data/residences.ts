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
import deiraImage from '@assets/generated_images/biazo-deira.jpg';
import jvcImage from '@assets/generated_images/biazo-jvc.jpg';
import jumeirahImage from '@assets/generated_images/biazo-jumeirah.jpg';
import jbrImage from '@assets/generated_images/biazo-jbr.jpg';
import szrImage from '@assets/generated_images/biazo-szr.jpg';
import alBarshaImage from '@assets/generated_images/biazo-albarsha.jpg';

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
      { url: downtownImage, caption: 'Downtown Dubai & Burj Khalifa skyline perspective' },
      { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85', caption: 'Floor-to-ceiling glass panoramic living salon' },
      { url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85', caption: 'The principal suite & Italian linen bed' },
      { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85', caption: 'Freestanding travertine soaking tub with city views' },
      { url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1600&q=85', caption: 'Private infinity-edge rooftop pool overlooking the skyline' }
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
      { start: '2026-10-14', end: '2026-10-18' },
      { start: '2026-11-04', end: '2026-11-09' }
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
      { url: beachImage, caption: 'Private beachfront & shoreline on Palm Frond N' },
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85', caption: 'Double-height grand oceanfront salon' },
      { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85', caption: 'Master suite with private sunrise ocean balcony' },
      { url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=85', caption: 'Private courtyard infinity pool & sun loungers' },
      { url: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=85', caption: 'Open-air dining terrace overlooking the Arabian Gulf' }
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
      { start: '2026-10-20', end: '2026-10-25' },
      { start: '2026-11-14', end: '2026-11-20' }
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
      { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85', caption: 'Marina-facing open salon with yacht views' },
      { url: terraceImage, caption: 'Curved glass terrace overlooking the yacht marina' },
      { url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85', caption: 'Primary bedroom suite with harbor vistas' },
      { url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85', caption: 'Designer quartz chef kitchen with wine cooler' },
      { url: heroImage, caption: 'Illuminated Dubai Marina night vista' }
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
      { start: '2026-10-08', end: '2026-10-12' },
      { start: '2026-11-06', end: '2026-11-12' }
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
      { url: golfImage, caption: 'Private estate grounds bordering championship fairways' },
      { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85', caption: 'Grand architectural reception hall with bespoke chandelier' },
      { url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=85', caption: 'Presidential master sanctuary with fairway views' },
      { url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=85', caption: '20-meter private illuminated garden swimming pool' },
      { url: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1600&q=85', caption: 'Private cinema lounge & marble fireplace salon' }
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
      { start: '2026-10-10', end: '2026-10-16' },
      { start: '2026-11-18', end: '2026-11-25' }
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
      { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85', caption: 'Double-height industrial-chic concrete & timber salon' },
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=85', caption: 'Upper mezzanine sleeping retreat with glass balustrade' },
      { url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85', caption: 'Artisan cocktail bar & dedicated workstation' },
      { url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=85', caption: 'Matte black & brushed brass rain-shower ensuite' },
      { url: futureCityImage, caption: 'Architectural skyline overlooking DIFC Gate Village' }
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
      { start: '2026-10-01', end: '2026-10-04' },
      { start: '2026-11-03', end: '2026-11-08' }
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
    description: "Wake up to the Gulf and the iconic Ain Dubai — the world's largest observation wheel — from your private waterfront terrace. This beautifully appointed two-bedroom retreat combines airy island calm with the energy of Dubai's most exciting new destination, steps from world-class dining and the Caesars Palace beach.",
    images: [
      { url: bluewatersImage, caption: 'Direct seafront panorama with Ain Dubai views' },
      { url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85', caption: 'Bright coastal open-plan living room with linen furnishings' },
      { url: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=85', caption: 'Calm sea-view master bedroom' },
      { url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1600&q=85', caption: 'Private sunset terrace overlooking the Arabian Gulf' },
      { url: jbrImage, caption: 'Caesars Palace private beach & Ain Dubai promenade' }
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
      { start: '2026-10-05', end: '2026-10-09' },
      { start: '2026-11-20', end: '2026-11-26' }
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
    description: "A sophisticated full-floor penthouse hovering above the Dubai Water Canal with commanding views of the Burj Khalifa and Downtown skyline. Dark timber, brushed brass fixtures, and custom Italian furnishings set the tone — paired with a chef kitchen, private jacuzzi, and seamless access to Dubai's financial and cultural heartbeat.",
    images: [
      { url: businessBayImage, caption: 'Canal-front open salon with designer marble kitchen' },
      { url: 'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?auto=format&fit=crop&w=1600&q=85', caption: 'Dark timber & brass master bedroom overlooking canal bridges' },
      { url: 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1600&q=85', caption: 'Private rooftop heated jacuzzi deck under the stars' },
      { url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=85', caption: 'Formal dining room with Gaggenau wine library' },
      { url: szrImage, caption: 'Wraparound penthouse terrace with illuminated city skyline' }
    ],
    amenities: [
      'Dubai Water Canal & Burj Khalifa Views',
      'Private Rooftop Jacuzzi',
      "Chef's Gaggenau Kitchen",
      'Dedicated Concierge & Valet',
      'Infinity Rooftop Pool Access',
      'Walking Distance to Dubai Mall & Metro',
      'Smart Home Automation',
      'Keyless Mobile Entry',
      '2 Reserved Parking Spaces'
    ],
    bookedRanges: [
      { start: '2026-10-12', end: '2026-10-17' },
      { start: '2026-11-16', end: '2026-11-22' }
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
      { url: downtown2Image, caption: 'Private heated plunge pool directly facing Burj Khalifa' },
      { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85', caption: 'Opulent high-ceiling penthouse salon with velvet and brass' },
      { url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85', caption: 'Grand master suite with direct views of the Dubai Fountain show' },
      { url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=85', caption: 'Marble ensuite bathroom with deep soaking jacuzzi tub' },
      { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85', caption: 'Sunset dining balcony overlooking Downtown Dubai' }
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
      { start: '2026-10-22', end: '2026-10-27' },
      { start: '2026-11-24', end: '2026-11-30' }
    ]
  },
  {
    id: 'bvh-muse-dubai-marina',
    name: 'The Muse — JW Marriott Residence',
    tagline: 'Timeless indulgence at the heart of Dubai Marina',
    neighborhood: 'Dubai Marina',
    address: 'JW Marriott Hotel Marina, Dubai Marina, Dubai',
    type: 'Suite',
    bedrooms: 2,
    bathrooms: 2,
    sleeps: 4,
    sqft: 1400,
    pricePerNightAed: 885,
    cleaningFeeAed: 250,
    rating: 4.35,
    reviewsCount: 7,
    description: "An exquisitely curated residence within the iconic JW Marriott tower, offering a seamless blend of residential privacy and five-star hotel living. Styled with bespoke furnishings, a fully equipped gourmet kitchen, and a private balcony overlooking the Dubai Marina yacht parade — just 15 minutes' walk from Marina Beach. Guests enjoy access to the JW Marriott's rooftop pool, spa, and restaurant portfolio while retreating to a home that is entirely their own.",
    images: [
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/752412665.jpg?k=16bd634779a5c7ec4bc55fa6bed73a862741283328e3809a101270ae419e41d1&o=&hp=1',
        caption: 'The Muse — grand living salon at JW Marriott Marina'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/752412650.jpg?k=5e21a8a11c139ac399066a530842d5e8052d5baaeb689e1746fb99227f2cb748&o=&hp=1',
        caption: 'Private balcony with panoramic Dubai Marina views'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/752412647.jpg?k=33d9a61592a7e966b4854e9245340a9a0d2966ef4cf8b74e40fbf5ac50213d0b&o=&hp=1',
        caption: 'Master bedroom with flat-screen TV and plush linen'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/752412621.jpg?k=36ed6f64c4c588a6bdbe4617394b97f1fcac07f183c4b0c1dcd64657dfbe22f0&o=&hp=1',
        caption: 'Marble bathroom with soaking tub and walk-in shower'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/752412580.jpg?k=b5146c32ed09bb0076a0a108498b44506a544f05cb61b0729a232da4f9225e61&o=&hp=1',
        caption: 'JW Marriott rooftop pool with city skyline backdrop'
      }
    ],
    amenities: [
      'JW Marriott Hotel Rooftop Pool Access',
      'Fully Equipped Gourmet Kitchen',
      'Private Marina-View Balcony',
      '15-Min Walk to Marina Beach',
      'Five-Star Hotel Concierge',
      'Luxury Spa & Wellness Access',
      'Valet Parking Available',
      'High-Speed Wi-Fi',
      'Daily Housekeeping on Request',
      'Keyless Smart Entry'
    ],
    bookedRanges: []
  },
  {
    id: 'bvh-hampton-hilton-airport',
    name: 'Hampton by Hilton Dubai Airport',
    tagline: 'Brand-new contemporary hotel steps from Dubai International Airport',
    neighborhood: 'Al Qusais',
    address: 'Damascus Street, Al Qusais, Dubai',
    type: 'Apartment',
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 2,
    sqft: 320,
    pricePerNightAed: 189,
    cleaningFeeAed: 80,
    rating: 4.0,
    reviewsCount: 6352,
    description: "A brand-new, contemporary hotel ideally located close to Dubai International Airport. Featuring modern, well-appointed rooms with all the comforts of home, a sparkling outdoor pool, fully equipped fitness centre, and complimentary breakfast. Perfect for business travellers and transit guests seeking quality accommodation with seamless airport access and easy connectivity to the city.",
    images: [
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/483734620.jpg?k=b3f8f83441fed9414cd3bbb2eb5a2b3b6e3c2082123e272a3c9f9aa0c7d96ba2&o=&hp=1',
        caption: 'Outdoor swimming pool with loungers at Hampton by Hilton Dubai Airport'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/723711802.jpg?k=ed7cdd1c3441a5a07d54346c8c49ccada4377e05a992a7ee303ebc8c9697f2aa&o=&hp=1',
        caption: 'Contemporary hotel exterior with palm tree surroundings'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/723711941.jpg?k=795d7a97bce5311cf31820091223ede44d4754d450ae540f8a89fc65e4cd8d1a&o=&hp=1',
        caption: 'Modern hotel room with king bed and work desk'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/483734598.jpg?k=402cedd8c21e3da1e3bc4b86c10a0e2709f037857fc683b5ec883a48bbeb0701&o=&hp=1',
        caption: 'Clean en-suite bathroom with walk-in shower'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/514371513.jpg?k=12086a259baa18ba5d03a51643098ee35f6b56965495f593dc46b13b5a255e92&o=&hp=1',
        caption: 'Pool deck with sun umbrellas and city views'
      }
    ],
    amenities: [
      'Complimentary Daily Breakfast',
      'Outdoor Swimming Pool',
      'Fitness Centre',
      '3-Min Drive to Dubai International Airport',
      'Free Airport Shuttle',
      'Business Centre & Meeting Rooms',
      'On-Site Restaurant & Bar',
      'High-Speed Wi-Fi Throughout',
      'Keyless Smart Entry',
      '24/7 Front Desk'
    ],
    bookedRanges: []
  },
  {
    id: 'bvh-damac-hills-2-rotana',
    name: 'DAMAC Hills 2 Hotel — Edge by Rotana',
    tagline: 'Tranquil resort-style retreat with swimming pools & community leisure',
    neighborhood: 'DAMAC Hills 2',
    address: 'DAMAC Hills 2, Dubai, United Arab Emirates',
    type: 'Apartment',
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 2,
    sqft: 350,
    pricePerNightAed: 127,
    cleaningFeeAed: 70,
    rating: 4.1,
    reviewsCount: 2901,
    description: "Set in the tranquil master community of DAMAC Hills 2, this contemporary Edge by Rotana hotel combines modern comforts with resort-style leisure. Features outdoor swimming pools with sun decks, a state-of-the-art fitness centre, stylish all-day dining restaurant and bar, and quick connectivity to Dubai's arterial highways while escaping the bustle of downtown.",
    images: [
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/403702022.jpg?k=813d904014699b92a782dfc54dac184555c4cd01041929619aaba9d9ea442f2e&o=&hp=1',
        caption: 'Contemporary hotel architecture and landscaped grounds'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/422847598.jpg?k=1d3569d2f0f5aec41b8bb770ba762d21b7b8bfeef8f83cb0a8e5eef4ad5be934&o=&hp=1',
        caption: 'Resort swimming pool with sun loungers and cabana seating'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/403924712.jpg?k=1121835fe43523cf5f7d442b96c83917c5bddde0df35d622242f630b5f474ba4&o=&hp=1',
        caption: 'Deluxe guest room with plush bed and seating lounge'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/614237499.jpg?k=a2c941ec791141a44b95acbfbc5e9b8f18a0f29a7e1b4ee177383579099c121d&o=&hp=1',
        caption: 'Modern en-suite bathroom with walk-in rain shower'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/407424646.jpg?k=5075b28b66ac74afeb2811ffb7ca4d96878ee4d900a04d629e3a97590c161425&o=&hp=1',
        caption: 'Urban Bar and all-day dining restaurant'
      }
    ],
    amenities: [
      'Outdoor Swimming Pools & Sun Deck',
      'State-of-the-Art Fitness Centre',
      'Urban Bar & All-Day Dining',
      'High-Speed Wi-Fi',
      'Complimentary Self & Valet Parking',
      '24/7 Front Desk & Concierge',
      'Individual Climate Control',
      'Keyless Smart Entry',
      'In-Room Coffee & Tea Facilities'
    ],
    bookedRanges: []
  },
  {
    id: 'bvh-towers-rotana-szr',
    name: 'Towers Rotana — Sheikh Zayed Road',
    tagline: 'Prime city hotel suite facing the Burj Khalifa & Financial Centre',
    neighborhood: 'Sheikh Zayed Road',
    address: 'Sheikh Zayed Road, Trade Centre Area, Dubai',
    type: 'Suite',
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 2,
    sqft: 345,
    pricePerNightAed: 330,
    cleaningFeeAed: 120,
    rating: 4.35,
    reviewsCount: 3560,
    description: "Located prominently on Dubai's legendary Sheikh Zayed Road, Towers Rotana offers luxury hospitality right opposite the Financial Centre Metro Station and only minutes from Burj Khalifa and Dubai Mall. Guests enjoy an elevated rooftop swimming pool with sun terrace overlooking the metropolis, Bodylines Fitness & Wellness Club, award-winning dining including Teatro, and seamless access to Dubai's financial and leisure hubs.",
    images: [
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/481019125.jpg?k=6e0635929a3d73101f102e6d5c614fae9de8d7662c727441998c444a776f3be1&o=&hp=1',
        caption: 'Elevated outdoor pool overlooking the Sheikh Zayed Road skyline'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/637036331.jpg?k=819ab3f00c7a78ed680ba003181375567811e9f4a56bbefc9ff60096d4160d07&o=&hp=1',
        caption: 'Classic King bedroom with panoramic Dubai city views'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/481913608.jpg?k=8956dea196be6381bd93b75768b1649debb60920138c509bab3b4ec19a608a96&o=&hp=1',
        caption: 'Rooftop sundeck with sun umbrellas and loungers'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/664756347.jpg?k=3e412835a140058c82928e1bd030b93c680589a173061e29f106d6748dd445ee&o=&hp=1',
        caption: 'Executive lounge living area and work salon'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/637036275.jpg?k=dcb7768e7004ecc7c65fb9e3b55264df4b67a8d4e8f72401018763ee7d590ff5&o=&hp=1',
        caption: 'En-suite marble bathroom with bathtub and luxury toiletries'
      }
    ],
    amenities: [
      'Elevated Rooftop Swimming Pool & Sundeck',
      'Directly Opposite Financial Centre Metro Station',
      'Bodylines Fitness & Wellness Club',
      'Award-Winning On-Site Restaurants & Teatro Lounge',
      '5-Min Drive to Burj Khalifa & Dubai Mall',
      'Valet & Covered Parking',
      'Ultra High-Speed Wi-Fi',
      '24/7 Room Service & Concierge',
      'Keyless Smart Entry'
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
