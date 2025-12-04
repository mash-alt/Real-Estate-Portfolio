import { addProperty } from '../services/propertyService';

const properties = [
  {
    title: 'Vista Verde Subdivision - 241 sqm Lot',
    type: 'House and Lot' as const,
    location: 'Cebu' as const,
    price: 3856000,
    area: 241,
    description: 'Prime 241 sqm lot for sale in Vista Verde Subdivision by Sta. Lucia, Sacsac, Consolacion. Clean titled with updated tax. Beautiful mountain view location just walking distance to the clubhouse. Priced at ₱16K per sqm net. Perfect opportunity to build your dream home in an established subdivision with complete amenities. Cash or bank financing available.',
    features: [
      '241 SQM Lot Area',
      'Clean Title',
      'Updated Tax',
      'Mountain View',
      'Walking Distance to Clubhouse',
      'Cash or Bank Financing',
      'Landscaped Entrance Gate with Guardhouse',
      'Clubhouse',
      'Swimming Pool',
      'Basketball Court',
      'By Sta. Lucia'
    ],
    images: [
      'https://scontent.fmnl4-8.fna.fbcdn.net/v/t39.30808-6/520285809_122175409370505927_6991973266465458781_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=enN9b_cy8oAQ7kNvwHOY_IJ&_nc_oc=AdkrZ8SyA6EcNxw6ahiJRWtnf6-TSBaiceFHuCjmQPWRuWeyUeuSEu3HQX7zhGI1NXLpZiT7hmi1wrQ98a46aWzJ&_nc_zt=23&_nc_ht=scontent.fmnl4-8.fna&_nc_gid=yla_mxEYva0TLFvMXsz4ZA&oh=00_Aflu4nbCyM9Iffe_XpDdkTxLLH_7azTU4l2hVQgeBOBMqw&oe=6935F624',
      'https://scontent.fceb6-2.fna.fbcdn.net/v/t39.30808-6/522639050_122175409322505927_291654686643650321_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=bq5JxeRx_-IQ7kNvwFpjCVx&_nc_oc=Adl8wc6h6kcltHX2KIQ4Own-mHl_pjD5XJVSnulfPO8vK_DXMl8SUA9YCRb0P_oQ5jKz5JMULeYNnGPlhJgTZ91e&_nc_zt=23&_nc_ht=scontent.fceb6-2.fna&_nc_gid=vmT8rnA3_FRQNtBHxtTFmg&oh=00_AfksXQZ0WIq02YIS8wUSzAIGDerDN6EpH-hFtzeJhKhjwQ&oe=6935EA32'
    ],
    featured: true,
  },
  {
    title: 'Vista Verde Subdivision - 314 sqm Lot',
    type: 'House and Lot' as const,
    location: 'Cebu' as const,
    price: 5024000,
    area: 314,
    description: 'Spacious 314 sqm lot for sale in Vista Verde Subdivision by Sta. Lucia, Sacsac, Consolacion. Clean titled with updated tax. Beautiful mountain view location just walking distance to the clubhouse. Priced at ₱16K per sqm net. Ideal for building a larger home with generous space in an established subdivision with complete amenities. Cash or bank financing available.',
    features: [
      '314 SQM Lot Area',
      'Clean Title',
      'Updated Tax',
      'Mountain View',
      'Walking Distance to Clubhouse',
      'Cash or Bank Financing',
      'Landscaped Entrance Gate with Guardhouse',
      'Clubhouse',
      'Swimming Pool',
      'Basketball Court',
      'By Sta. Lucia'
    ],
    images: [
      'https://scontent.fmnl4-8.fna.fbcdn.net/v/t39.30808-6/520285809_122175409370505927_6991973266465458781_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=enN9b_cy8oAQ7kNvwHOY_IJ&_nc_oc=AdkrZ8SyA6EcNxw6ahiJRWtnf6-TSBaiceFHuCjmQPWRuWeyUeuSEu3HQX7zhGI1NXLpZiT7hmi1wrQ98a46aWzJ&_nc_zt=23&_nc_ht=scontent.fmnl4-8.fna&_nc_gid=yla_mxEYva0TLFvMXsz4ZA&oh=00_Aflu4nbCyM9Iffe_XpDdkTxLLH_7azTU4l2hVQgeBOBMqw&oe=6935F624',
      'https://scontent.fceb6-2.fna.fbcdn.net/v/t39.30808-6/522639050_122175409322505927_291654686643650321_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=bq5JxeRx_-IQ7kNvwFpjCVx&_nc_oc=Adl8wc6h6kcltHX2KIQ4Own-mHl_pjD5XJVSnulfPO8vK_DXMl8SUA9YCRb0P_oQ5jKz5JMULeYNnGPlhJgTZ91e&_nc_zt=23&_nc_ht=scontent.fceb6-2.fna&_nc_gid=vmT8rnA3_FRQNtBHxtTFmg&oh=00_AfksXQZ0WIq02YIS8wUSzAIGDerDN6EpH-hFtzeJhKhjwQ&oe=6935EA32'
    ],
    featured: true,
  }
];

const addProperties = async () => {
  console.log('Adding Vista Verde properties to Firebase...');
  
  for (const property of properties) {
    try {
      const id = await addProperty(property);
      console.log(`✅ ${property.title} added successfully with ID: ${id}`);
    } catch (error) {
      console.error(`❌ Failed to add ${property.title}:`, error);
    }
  }
  
  console.log('\n✅ All Vista Verde properties added!');
};

addProperties();
