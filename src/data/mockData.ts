import type { Property, TeamMember } from '../types';

export const properties: Property[] = [
  {
    id: '1',
    title: 'Estelle Woods Talamban - Jose Antonio',
    type: 'House and Lot',
    location: 'Cebu',
    price: 12000000,
    area: 213,
    bedrooms: 5,
    bathrooms: 3,
    description: 'Premium 3-storey Single Attached home in Estelle Woods Phase 2, Talamban. Where modern design meets sustainable living featuring generous living spaces, wider roads, and upgraded community amenities. Located along Budlaan–Talamban Road with Master\'s Bedroom w/ Walk-in Closet, Family Den/Office/Home Theater, and 2 Balconies.',
    features: ['2-Car Garage', 'Walk-in Closet', '2 Family Den/Office', '2 Balconies', 'Service Area', 'Basketball Court', 'Swimming Pool', 'Clubhouse'],
    images: [
      'https://estategenie.ph/wp-content/uploads/2025/09/Estelle-Woods-Talamban-Single-Attached-Jose-Antonio-Perspective.jpeg',
      'https://estategenie.ph/wp-content/uploads/2025/09/Estelle-Woods-Talamban-Single-Attached-Jose-Antonio-Living-and-Dining.jpeg',
      'https://estategenie.ph/wp-content/uploads/2025/09/Estelle-Woods-Talamban-Single-Attached-Jose-Antonio-Masters-Bedroom-with-Study-Area.jpeg',
      'https://estategenie.ph/wp-content/uploads/2025/09/Estelle-Woods-Talamban-Single-Attached-Jose-Antonio-Night-View.jpeg'
    ],
    featured: true,
  },
  {
    id: '2',
    title: 'Estelle Woods Talamban - Matteo Inigo',
    type: 'House and Lot',
    location: 'Cebu',
    price: 8500000,
    area: 136,
    bedrooms: 4,
    bathrooms: 3,
    description: 'Premium 3-storey Townhouse in Estelle Woods Phase 2, Talamban. Modern design with 168 exclusive homes offering comfort, space, and convenience. Perfect location along Budlaan–Talamban Road with 4 bedrooms (expandable to 5), Family Den/Office/Theater, and 2 Balconies. Ideal for families seeking long-term value.',
    features: ['1-Car Garage', '2 Balconies', 'Family Den/Office', 'Service Area', 'Basketball Court', 'Swimming Pool', 'Social Hall', 'Commercial Area'],
    images: [
      'https://estategenie.ph/wp-content/uploads/2025/09/Estelle-Woods-Talamban-Townhouse-Matteo-Inigo-Perspective.jpeg',
      'https://estategenie.ph/wp-content/uploads/2025/09/Estelle-Woods-Talamban-Townhouse-Matteo-Inigo-Dining-Room.jpeg',
      'https://estategenie.ph/wp-content/uploads/2025/09/Estelle-Woods-Talamban-Townhouse-Matteo-Inigo-Masters-BR.jpeg',
      'https://estategenie.ph/wp-content/uploads/2025/09/Estelle-Woods-Talamban-Townhouse-Matteo-Inigo-Night-View.jpeg'
    ],
    featured: true,
  },
  {
    id: '3',
    title: 'Costa Liya Subdivision',
    type: 'House and Lot',
    location: 'Cebu',
    price: 6260000,
    area: 65,
    bedrooms: 3,
    bathrooms: 2,
    description: 'Costa-inspired 2-storey townhouse in Suba Basbas, Lapu-Lapu City. 4-hectare residential subdivision with 287 coastal-themed homes minutes from CCLEX. Features spacious living areas with balcony, lanai, kitchen, dining, and service area. Near Blue Reef Resort, Gaisano Mall, and Mactan Doctors\' Hospital. Experience coastal living near the heart of the city.',
    features: ['2 Carports', 'Balcony', 'Lanai', 'Service Area', 'Clubhouse', 'Swimming Pool', 'Basketball Court', 'Guard House'],
    images: [
      'https://estategenie.ph/wp-content/uploads/2025/10/Costa-Liya-Lapu-Lapu-House-and-Lot-1024x576.jpg',
      'https://estategenie.ph/wp-content/uploads/2025/10/Costa-Liya-Mactan.jpeg',
      'https://estategenie.ph/wp-content/uploads/2025/10/Costa-Liya-Lapu-Lapu-Swimming-Pool-1024x576.jpg',
      'https://estategenie.ph/wp-content/uploads/2025/10/Costa-Liya-Subdivision-Lapu-Lapu-Basketball-Court-1024x576.jpg',
      'https://estategenie.ph/wp-content/uploads/2025/10/Costa-Liya-Subdivision-Lapu-Lapu-Clubhouse-1024x576.jpg'
    ],
    featured: true,
  },
  {
    id: '4',
    title: 'The Highlands at Robin\'s Lane',
    type: 'House and Lot',
    location: 'Cebu',
    price: 5200000,
    area: 64,
    bedrooms: 3,
    bathrooms: 2,
    description: 'Upcoming residential development in Tawason, Mandaue between North Verdana and Villa Sebastiana Subdivisions. Thoughtfully designed townhouse, duplex, and single-attached units offering comfort, convenience, and modern suburban living. Spacious layouts with carpark, service area, dining and living spaces. Near Sacred Heart School - Ateneo De Cebu and Gaisano Grand Mall Talamban with easy access to Talamban–Tintay Terminal.',
    features: ['Carpark', 'Service Area', 'Dining Area', 'Living Room', 'Free Transfer Charges', 'Free Move-in Fees', 'Free Wardrobe Cabinets', 'Free Kitchen Cabinet', 'Free Water & Electricity Connection', 'Free LED Downlights'],
    images: [
      'https://estategenie.ph/wp-content/uploads/2025/09/robins-lane-tawason-mandaue.png',
      'https://estategenie.ph/wp-content/uploads/2025/09/581973065_1290765036151559_1276073588071792373_n-1024x724.jpg',
      'https://estategenie.ph/wp-content/uploads/2025/09/581964496_1399084218462198_8844304109754391500_n-1024x724.jpg',
      'https://estategenie.ph/wp-content/uploads/2025/09/The-Highlands-at-Robins-Lane-Tawason-Mandaue.jpeg'
    ],
    featured: true,
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'JEL ANN ESTRADA, RES',
    position: 'REAL ESTATE SALES PERSON',
    image: new URL('../assets/images/agent.png', import.meta.url).href,
    email: 'jelannestradaleyson@gmail.com',
    phone: '+63 927 729 7317',
  },
];
