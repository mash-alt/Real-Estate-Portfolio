import { addProperty } from '../services/propertyService';

const newProperty = {
  title: 'Deo City Condominiums - Cozy Loft',
  type: 'Condominium' as const,
  location: 'Cebu' as const,
  price: 2000000,
  area: 32,
  bedrooms: 1,
  bathrooms: 1,
  description: 'Cozy 32 sqm loft unit at Deo City Condominiums in Brgy. Sacsac, Consolacion, Cebu. Features loft layout with kitchenette, free parking, and WiFi-ready. Surrounded by nature in a peaceful location. Available for assume with ₱400K equity paid, ₱1.6M Pag-IBIG loan, and ₱11,053 monthly amortization (2 years paid). Also available for rent at ₱12,000/month (negotiable). Perfect for those seeking affordable living in a serene environment.',
  features: [
    'Loft Layout',
    'With Kitchenette',
    'Free Parking',
    'WiFi-Ready',
    'Nature Surroundings',
    'For Assume',
    'For Rent: ₱12K/mo',
    'Equity Paid: ₱400K',
    'Pag-IBIG Loan: ₱1.6M',
    'Monthly Amort: ₱11,053',
    '2 Years Paid'
  ],
  images: [
    'https://scontent.fmnl4-3.fna.fbcdn.net/v/t39.30808-6/584660121_122193706316505927_5432146480928753027_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=IQNIY7wB7TUQ7kNvwF32Aba&_nc_oc=AdkiAu_fUlQZJwIPFWS2TjwDtmGEXUfYsThCuyAIOzLbz4v7fo72pGA6bFbWmhfVGtiXT04ogtsmkQ7203R-WkyG&_nc_zt=23&_nc_ht=scontent.fmnl4-3.fna&_nc_gid=SQ64bjpeePqzeryG2elsgQ&oh=00_AfmoJvtS4pwtFp9HYbq-MpnE9H4pyjt7JqGlicq4LXZbkw&oe=6935FDD4',
    'https://scontent.fceb6-2.fna.fbcdn.net/v/t39.30808-6/581074434_122193705512505927_1921961600800251489_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=UDQXvvvokOsQ7kNvwHpvNHZ&_nc_oc=Adl0OI3FqZeGlHc1vJI3zAwCUoxY8KrC1jND7-1n-vIyhfqLFTkL-Fdfn8SEtTHmBnDI_oTj7i0o2NIFHDxOxH7V&_nc_zt=23&_nc_ht=scontent.fceb6-2.fna&_nc_gid=lGclW-xCXisjJJXdEauVNg&oh=00_AfnBuo1r6GIew0d3puvDCT5xPpwWExJBYxQGlnc0xHLfwA&oe=69360AF4',
    'https://scontent.fceb6-2.fna.fbcdn.net/v/t39.30808-6/584255461_122193706328505927_4004959592751742194_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=YpQGGYo0cmsQ7kNvwHhmQfA&_nc_oc=Adk9xUKFhbddvrPEPTzUFV1r8ubFqGOOPsLn6ZR06nrNljSjoVW6B2UZtrNEwpv_bau1agTca87PYVXzwUEI8AdT&_nc_zt=23&_nc_ht=scontent.fceb6-2.fna&_nc_gid=C9o8sa9CIlhNC3yFIrYhSQ&oh=00_AfkKylhSTHrK8Z4Yw5yywjQQ0XORc_OlCZ_VTCd6Vb2GCg&oe=6935E4BC',
    'https://scontent.fmnl4-3.fna.fbcdn.net/v/t39.30808-6/583859792_122193706394505927_4920849254332375745_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=goumAQl6vaIQ7kNvwFZU1Gd&_nc_oc=AdkvlrPUZ8Xm9c-2LqU-4X2vUnZmB98Xb8Yp5kHha46ja3bs2L9B1e9q9nLIey9mhZXu_qwJx3TxClmub_wv_xHP&_nc_zt=23&_nc_ht=scontent.fmnl4-3.fna&_nc_gid=Us8Kf_7dIOUkIM5ev3uY9A&oh=00_Afm8ERNnuGWuEj9vYSkmBF7owAy6KTAWR0DTghdc2wS-Zg&oe=69360CC8'
  ],
  featured: true,
};

const addNewProperty = async () => {
  console.log('Adding Deo City Condominiums property to Firebase...');
  try {
    const id = await addProperty(newProperty);
    console.log(`✅ Property added successfully with ID: ${id}`);
  } catch (error) {
    console.error('❌ Failed to add property:', error);
  }
};

addNewProperty();
