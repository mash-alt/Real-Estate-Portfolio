import { addProperty } from '../services/propertyService';

const newProperty = {
  title: 'Mulberry Drive Talamban - Sacrifice Sale',
  type: 'House and Lot' as const,
  location: 'Cebu' as const,
  price: 4700000,
  area: 50,
  bedrooms: 2,
  bathrooms: 2,
  description: 'Fully furnished 2-storey townhouse in Mulberry Drive, Talamban. Flood-free property across Maria Montessori International School. Clean title, exclusive pocket-sized community of only 51 units. Includes split-type AC, screen doors/windows, and all furniture and appliances. Moving back to main house. Priced at ₱4.7M, cheaper than current market price of ₱5.5M unfurnished. Buyer to shoulder all taxes and transfer costs.',
  features: [
    'Clean Title',
    'Fully Furnished',
    'Split Type AC',
    'Screen Doors/Windows',
    '24hrs Security Guard',
    'Swimming Pool',
    'Gated Community',
    'Across Maria Montessori School',
    'Flood Free',
    'Exclusive 51 Units Only'
  ],
  images: [
    'https://scontent.fceb6-1.fna.fbcdn.net/v/t39.30808-6/587331302_122195005808505927_3405117034055089763_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGJdxyLbPXvYKeKGFvu9za346f7zJuibKvjp_vMm6Jsq9h8hidM-6JpZXWKTBBUw7xxU8VAJVYvZrvBF_-1Mnx6&_nc_ohc=wL7LYnoX_QAQ7kNvwFJRfLN&_nc_oc=Adk52J1thlXcns5T5YJ-TWHf26WFjqvZ5UXof2J9GieksIkkPbggvemFlFb7wGZcahwYCjUh_nKmLl19ZjA0jGCR&_nc_zt=23&_nc_ht=scontent.fceb6-1.fna&_nc_gid=DV7YHmtzZNr3EiG0WCzGUQ&oh=00_AfncLmmSa2yhbgHc4elApMiETmG642pT3JERaROy9xUKhA&oe=6935E771',
    'https://scontent.fceb6-4.fna.fbcdn.net/v/t39.30808-6/587206736_122195005868505927_1022596212013933448_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEX4KuDdo2bC1lYnZzIS0Mh_9QNxxG-yTP_1A3HEb7JM6ZIZp9FWjlRvpiXy6ZwUuSsLkrIyu8W7qhPnsWxauik&_nc_ohc=LD5I_zjviG4Q7kNvwFWVUKV&_nc_oc=AdldA3xc9TugcyHM4gV7IwqiWKM5-8Yv26SqoM3RQp6YDQmIz8BfmLJC1IbQMTVgawIH6xTDH5PXfpSX405pYLrI&_nc_zt=23&_nc_ht=scontent.fceb6-4.fna&_nc_gid=8g6Mt4VQN8wn2hiDsLjLNQ&oh=00_AfnbCEspRoXNB7P4cixEZMwRP4rYuRwXVee3ZjE-PbbZ4g&oe=6935CCAF',
    'https://scontent.fceb2-1.fna.fbcdn.net/v/t39.30808-6/588225266_122195005922505927_3903220640825282993_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEPUDBz2ZFNIFeyYh60Fh1-cPQLDvowNIlw9AsO-jA0iRa5pDm2l5juznu1Y2xkFhlo5ftHfOJH0fVqBmRgBqOO&_nc_ohc=AmvnW3CKSUEQ7kNvwG9eZFM&_nc_oc=AdnRdEO0vXefyj4vmenYGBasTRGPz9qGBCL2-VS9-uhqrNMG4gPbWRW2Rb5B_qaEgh5oJfaaGBkpNEG38wQVDZTV&_nc_zt=23&_nc_ht=scontent.fceb2-1.fna&_nc_gid=gC5MKyFHP-go6JtJbTQOXQ&oh=00_AfmTTAa6LmFXCufJvfUY0zsXpsiEQp4ox_sQ3049r9FEyQ&oe=6935CF3D',
    'https://scontent.fceb6-2.fna.fbcdn.net/v/t39.30808-6/587938426_122195005892505927_6557618771600612074_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHwErZqq2jsy0tulRTTN35K9riL5MtKH4X2uIvky0ofhZ-UWM9tY8GHoUkL7iSq_H7ThosIcaXVlNEbribzSRyb&_nc_ohc=wwsRETw4_MgQ7kNvwGgtfO_&_nc_oc=AdkXuuvlN6QTRy-X6FHO-HAONqW3707hHjdWbe-l9PA2zVObZ0P0PQnp892fn_sjw9g&_nc_zt=23&_nc_ht=scontent.fceb6-2.fna&_nc_gid=rwYHlP0d61o5kNMIqULdsQ&oh=00_AfncQw_LdLcjLpuvHOLzLgXymYQKvVIEfrmFmLyzDn6r9w&oe=6935D896'
  ],
  featured: true,
};

const addNewProperty = async () => {
  console.log('Adding Mulberry Drive property to Firebase...');
  try {
    const id = await addProperty(newProperty);
    console.log(`✅ Property added successfully with ID: ${id}`);
  } catch (error) {
    console.error('❌ Failed to add property:', error);
  }
};

addNewProperty();
