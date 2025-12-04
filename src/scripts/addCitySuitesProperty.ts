import { addProperty } from '../services/propertyService';

const property = {
  title: 'City Suites Ramos Tower - Studio Near Velez Hospital',
  type: 'Condominium' as const,
  price: 2600000,
  area: 25,
  location: 'Cebu' as const,
  bedrooms: 0,
  bathrooms: 1,
  description: 'Semi-furnished studio condo for sale at City Suites Ramos Tower, F. Ramos St., Cebu City. Located on the 8th floor with balcony facing Robinsons Fuente. ₱2.6M NET to seller, buyer pays CGT, doc stamp, notarial and transfer charges. Unit comes with queen bed, single bed, smart TV, split-type aircon, hot & cold shower, microwave, plates & utensils, electric stove, heater, and refrigerator. Ideal for end-use or rental investment. Prime location near Velez Hospital, schools, and major establishments.',
  features: ['Semi-Furnished', 'Queen Bed', 'Single Bed', 'Smart TV', 'Split-Type Aircon', 'Hot & Cold Shower', 'Microwave', 'Plates & Utensils', 'Electric Stove', 'Heater', 'Refrigerator', 'Balcony', 'Facing Robinsons Fuente', '8th Floor', 'Near Velez Hospital', 'Near Schools', 'Prime Location', 'Rental Investment Potential'],
  images: [
    'https://scontent.fmnl13-2.fna.fbcdn.net/v/t39.30808-6/581934435_122193518408505927_1579979622180754770_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=a2xCSVc2o_QQ7kNvwHBvWpk&_nc_oc=AdmyL-QikkaNl57rWWH9R7r1lC5FkpoSygtm8DZ9HxFga6n6-LoU82R46RonX8UyCqg&_nc_zt=23&_nc_ht=scontent.fmnl13-2.fna&_nc_gid=dc5eX71Z_fMhJQWPrdCK3A&oh=00_AfnOYmfcxX1uyqlygwzxMkdU8bTxioYlhg8vGHRGQqe_DA&oe=69360829',
    'https://scontent.fmnl13-2.fna.fbcdn.net/v/t39.30808-6/581834656_122193518450505927_6243901183934657526_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=JFITNAWsoY4Q7kNvwHD65Tz&_nc_oc=Adlg9Rwtke77tye2BQan08iwYqD1Y5epiwi6H90WW7Jjv8jOqnq3xHxK9KEIZuA6rVM&_nc_zt=23&_nc_ht=scontent.fmnl13-2.fna&_nc_gid=0XdIqJEWAtNUptOYaAP0hg&oh=00_Afkb738MBAddlEGfP5gc-RPzl7N53D9Xm5YtMKRMEdTiKw&oe=6935EF8F',
    'https://scontent.fmnl13-2.fna.fbcdn.net/v/t39.30808-6/581453914_122193518426505927_7583186685011770910_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=6jOL2HB53AAQ7kNvwE4hlLC&_nc_oc=AdnmKNFVaFi-Xgb3CdPhkvuJ9dePZcbSdMGb-mfDAfB_ena-IgsDWnjdGIJ9bSF5nQA&_nc_zt=23&_nc_ht=scontent.fmnl13-2.fna&_nc_gid=geqzeI4UP0yJHWSvx1OdOg&oh=00_AfmXrPvSftkdjE7X6VZIlHsno8K2a1EQSVH3BFf0_e4ZTg&oe=6935EBE5',
    'https://scontent.fmnl13-1.fna.fbcdn.net/v/t39.30808-6/582757376_122193518402505927_7462827963687544396_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=r4-sACkRiIYQ7kNvwEMWCJ6&_nc_oc=AdmjX9RRJx1jrHWPmmXIXPDqgI7sjtzwsYrH_-2fE6y8XUGstGnWUJbglG4ld0fFIxE&_nc_zt=23&_nc_ht=scontent.fmnl13-1.fna&_nc_gid=Io-jrMJjiXIZkxl9mTq_jQ&oh=00_Afm7-a_oK2zAVfi-IcLi6bZPfqZtXHHoKOkMdPveaex0GA&oe=6935F77E',
    'https://scontent.fmnl13-1.fna.fbcdn.net/v/t39.30808-6/581374621_122193518438505927_3626752831322225044_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=e2k5rjJAZ8IQ7kNvwEXRAYT&_nc_oc=AdkuE-oHlEvp_ufAu090QSzui8_wWR1U4ggkwaFBX_JblqNgCtU4PO7TtKt1uWaE3EY&_nc_zt=23&_nc_ht=scontent.fmnl13-1.fna&_nc_gid=4VShgY3VetDN7qOVbd7gpA&oh=00_AfkNAD4WiXYAKV7nnWIjv4E6QN_yxr-EOHAf1dlm_O1eXQ&oe=6935F851'
  ],
  featured: false,
};

async function addCitySuitesProperty() {
  try {
    console.log('Adding City Suites Ramos Tower property to Firebase...');
    const id = await addProperty(property);
    console.log('✅ Property added successfully with ID:', id);
  } catch (error) {
    console.error('❌ Error adding property:', error);
  }
}

addCitySuitesProperty();
