import { addProperty } from '../services/propertyService';

const newProperty = {
  title: 'Baseline Premier - 1BR Condo for Rent',
  type: 'Rental' as const,
  location: 'Cebu' as const,
  price: 30000,
  area: 36,
  bedrooms: 1,
  bathrooms: 1,
  description: 'Fully furnished 1-bedroom condo for rent at Baseline Premier, Cebu City. Beautiful seaview unit with 36 sqm floor area. Monthly rate of ₱30,000 inclusive of condo dues and WiFi. Unit comes complete with bed, aircon, TV, wardrobe, sofa, dining set, kitchen appliances (rangehood, induction cooker, refrigerator, rice cooker), and hot & cold shower. Minimum 1-year contract. 1 month advance, 2 months deposit. Available for viewing August 10, 2025.',
  features: [
    'Seaview',
    'Fully Furnished',
    'Bed Frame & Mattress',
    'Air Conditioner',
    'TV',
    'Wardrobe Cabinet',
    'Sofa',
    'Dining Table & Chairs',
    'Rangehood',
    'Induction Cooker',
    'Refrigerator',
    'Rice Cooker',
    'Kitchen Utensils',
    'Hot & Cold Shower',
    'WiFi Included',
    'Condo Dues Included',
    '1-Year Contract',
    '1 Month Advance, 2 Months Deposit'
  ],
  images: [
    'https://scontent.fmnl4-3.fna.fbcdn.net/v/t39.30808-6/547491964_122184093368505927_3920377461682835231_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=nCKwt-UDcdUQ7kNvwHr6SWI&_nc_oc=Admb8jtR5YW7aDw3ngKdyfWW2u_T_3iyWzSi_GOjFzezBgoiDOGNqG3IPqn0Z0nzv9nkA51zl8F44b2dG7o1xNjy&_nc_zt=23&_nc_ht=scontent.fmnl4-3.fna&_nc_gid=Z6qyaz7B0CrA-xiuAoBedw&oh=00_AfkPT-1UfMjPpbsLAIJic80xmvlEnCZiB8-MlmVWfb_uIg&oe=693615C3',
    'https://scontent.fceb6-2.fna.fbcdn.net/v/t39.30808-6/547543676_122184093800505927_8328156651405291879_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=4vLgzKZkC3UQ7kNvwEGmFXK&_nc_oc=AdlEeBR9gngEnpf7HNKvE0KV5OBynu9kgWPQ658VYdfuF_xBjuQxqmgm19d1q7g9LV8diQ8LvKEkbbSGnwJCemtm&_nc_zt=23&_nc_ht=scontent.fceb6-2.fna&_nc_gid=IGwmeIN-qIAjj34kswfTKg&oh=00_Afm5_hVUChvnPxPuBMRDBhuQiJkg04nLbHlmH_4aCcEqSA&oe=6935F692',
    'https://scontent.fmnl4-1.fna.fbcdn.net/v/t39.30808-6/547406202_122184093530505927_5410215565068102943_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=UUHRYhUad8gQ7kNvwH8Qg-7&_nc_oc=Adm_LwDsW19hw_kj7ImUyVRkrIXVMYVDmZbPWrdmb6IA3wG8yYbCwH6RSDA6gbb9BT0jFHXD6H1hPbj8QSd-qqS5&_nc_zt=23&_nc_ht=scontent.fmnl4-1.fna&_nc_gid=3QflTAHL5StKK48oSA_JZg&oh=00_AfkTygK4FpqHMwv-bbyTblGbqVyu_Fr-B7EF9YO5VxB41g&oe=69360523',
    'https://scontent.fmnl4-2.fna.fbcdn.net/v/t39.30808-6/547419028_122184093938505927_540882076301409558_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=gevU59wKbtoQ7kNvwEiUc_t&_nc_oc=AdmyGoNjQqUaUz0icvqy-xy7WkOMTeU59Vx27gHQ0FJyZl6X1Q3uNUdAZWn_kNVOavMMcD6S3BzGVK2JWZQ18y5F&_nc_zt=23&_nc_ht=scontent.fmnl4-2.fna&_nc_gid=P2zXHRHIVPIayKDTXshoag&oh=00_AfkV3w_Tq-Rwfzw1NY-YpkXSNZe0LfYB9Fg50FJhWWnkgA&oe=6935E9D5',
    'https://scontent.fmnl4-3.fna.fbcdn.net/v/t39.30808-6/549446794_122184093344505927_2862263279410783426_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=_aYko0JKp80Q7kNvwEmEyu5&_nc_oc=AdlHCHcjdc2MwVHLRxzS_FNivs8SGEs8KPqHEf-MM-pgjf7e2wJUfzZBl5Del_ouRv76bFdKZoZQJoR4HG6-vYoG&_nc_zt=23&_nc_ht=scontent.fmnl4-3.fna&_nc_gid=vCUsLFx4d6TlHLDObUB8ig&oh=00_AfmgW2DzXvI0YpQ1i8EOslDBSXbQJYIo3vtWxBFHrEf6Tg&oe=6935EA00',
    'https://scontent.fmnl4-2.fna.fbcdn.net/v/t39.30808-6/547826412_122184093812505927_788783618610454450_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=g788qRr5hJ8Q7kNvwGUe71q&_nc_oc=Adnrg25gT0k3V2A679UkRztLZiwfW8Kl8hQg61qT2ijKPbHvkejga9xZrWPnw2K05T7mIwTL6_2_xx3njpwVIRL_&_nc_zt=23&_nc_ht=scontent.fmnl4-2.fna&_nc_gid=dvhADL4lj992Pq2KssHKpg&oh=00_AfnFN7pUe04ZWbxb821hjAJjGvCMk1V5_9vf6ylCc1jTBw&oe=6935E398',
    'https://scontent.fceb6-2.fna.fbcdn.net/v/t39.30808-6/549167509_122184093680505927_8218742699220735480_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=K2Hw9GYocb4Q7kNvwGE670t&_nc_oc=Adk73gkqtapF6F28oh1Evs0pqxJXUVwH0ROGBogQfvlIDyxSlWL6NU_onDeqysHVeYAvrpcYwk5eZ_f2bb38ml9t&_nc_zt=23&_nc_ht=scontent.fceb6-2.fna&_nc_gid=FB9kd5iPYB8XNe-VcRA98w&oh=00_AfncklT8hIFEeaj9bq_LUke-yUp60-MqiN5ORvcnzupGnw&oe=6935FC23',
    'https://scontent.fmnl4-3.fna.fbcdn.net/v/t39.30808-6/549159467_122184093950505927_9190117782425298361_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=nnbf2rF-3M4Q7kNvwFUi8U_&_nc_oc=AdkTBESJu9ntS9LdObRued3WUaocspOKj5oij1iaVIErsFN0Bs_8ABbrrpkfAIIv0rA9FR1Rj4-THzBdSkxhUIae&_nc_zt=23&_nc_ht=scontent.fmnl4-3.fna&_nc_gid=stt9SvwchED9tsMY33dDng&oh=00_AflchOQ7f6nKSR85Uc0_Q5v8amyvGyfb9RnKHCUIiZuFcQ&oe=6935F324',
    'https://scontent.fmnl4-8.fna.fbcdn.net/v/t39.30808-6/548042078_122184093668505927_692361895657611735_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=0bcZeewJcyMQ7kNvwHZzLy7&_nc_oc=AdmHTfuBLWGtFvzL5bxSL5da03x_jlyDJxDu9sdWvEBHV5IF1oZRPi6T1CBbfI1kwN-yQqVr6TCF-xxEiAUcQTWw&_nc_zt=23&_nc_ht=scontent.fmnl4-8.fna&_nc_gid=aH2uIbz_O17a2u1seIYJcQ&oh=00_AfnzCgcrguHUOfqTWj80EhhjBXbyzsKl0qAR7cOLz7JzVQ&oe=6935ECD5',
    'https://scontent.fmnl4-3.fna.fbcdn.net/v/t39.30808-6/547680030_122184093974505927_6514556310627049891_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=tuz_sYLLoPEQ7kNvwFHVsxg&_nc_oc=AdkUWkVCNnmPfmbjf5EI7-DqOyBHr-uvrymhmmSBdebI38gug0aCfyXOjQRG7Cdff0xvgSWLksfX4blVuGPQryOM&_nc_zt=23&_nc_ht=scontent.fmnl4-3.fna&_nc_gid=BpTTQ-VFMD7dtCvyMVvRcg&oh=00_AfnFB3EaLc4EaVI3mvmQNO8j9TR8UErSm8aeFGqekUVlaA&oe=69360FD9',
    'https://scontent.fmnl4-2.fna.fbcdn.net/v/t39.30808-6/549330569_122184093548505927_3048078160100798499_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=1eTSfeaq1VgQ7kNvwHvK9QJ&_nc_oc=Adl1HTadCweWzcS41itKk4o13hZZ87NWszXiDdRlEp5v85a4dR5KiM3pCCphCRfDXXP6nmA5yQ5DTpv6pHBI3SPN&_nc_zt=23&_nc_ht=scontent.fmnl4-2.fna&_nc_gid=c3xFPd1gusf307WK1FsmiA&oh=00_Afnzhv1KRagAfETdbaddc51aiuA2ZeQv_ywaviXUd2kD4g&oe=6935F377'
  ],
  featured: true,
};

const addNewProperty = async () => {
  console.log('Adding Baseline Premier rental property to Firebase...');
  try {
    const id = await addProperty(newProperty);
    console.log(`✅ Property added successfully with ID: ${id}`);
  } catch (error) {
    console.error('❌ Failed to add property:', error);
  }
};

addNewProperty();
