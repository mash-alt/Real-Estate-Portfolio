import { addProperty } from '../services/propertyService';

const newProperty = {
  title: 'Avida Riala IT Park - 1BR for Rent',
  type: 'Rental' as const,
  location: 'Cebu' as const,
  price: 35000,
  area: 40,
  bedrooms: 1,
  bathrooms: 1,
  description: 'Modern, calm, and newly opened 1-bedroom unit at Avida Riala, perfectly located in IT Park. Features digital lock, cozy modern interiors, fast Wi-Fi, Smart TV, comfortable living & dining space, well-equipped kitchen, and clean stylish bathroom. Open for sublease. Long term lease preferred. Rent excludes condo dues and utilities. 1 month advance and 2 months deposit required.',
  features: [
    'Digital Lock',
    'Fast Wi-Fi',
    'Smart TV',
    'Modern Interiors',
    'Fully Furnished',
    'Swimming Pool',
    'Shooting Court',
    "Children's Playground",
    '24/7 Security',
    'Lobby & Concierge',
    'IT Park Location',
    'Tower 1 - 5th Floor'
  ],
  images: [
    'https://scontent.fceb6-3.fna.fbcdn.net/v/t39.30808-6/584403344_122193935576505927_1248581511704497561_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=4Y4TlR5yTLwQ7kNvwHT8kv2&_nc_oc=AdmsLndlpLByMdFI4UVhWIGA3KqB1RYoI1Zkc5D6n9m0K8n8919TpUsnWS0RD2HRocyTDuBEGf_EpGp1vsbYpAgp&_nc_zt=23&_nc_ht=scontent.fceb6-3.fna&_nc_gid=nk9zrdK59-pD8q2UWtyhmw&oh=00_AflzojiuWrGZTnMcN30C7ptlnk-pHse9TVrHvmdKo7duxQ&oe=6935DACF',
    'https://scontent.fceb6-4.fna.fbcdn.net/v/t39.30808-6/580588045_122193934994505927_5253524997664266426_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=7o6zu7YxKvYQ7kNvwEv6uXS&_nc_oc=AdlHAxd40sdhIqKv0Z4sMErlFhuJ8KjJtAywCsPQta-R75g-ea6BtgMdBp_1bk4aKgF7hh2xGXy9BT0O5O_TK3O1&_nc_zt=23&_nc_ht=scontent.fceb6-4.fna&_nc_gid=YFNJgsq3r9f6I1KOZ6GccA&oh=00_AfnycutbXwWSWvrN1wDvvNfzSrtVW-hzd_7zs25--WC_Pw&oe=69360001',
    'https://scontent.fceb2-2.fna.fbcdn.net/v/t39.30808-6/583681410_122193935570505927_2564581930110085534_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=aPF1HtD1KmwQ7kNvwEY_dCM&_nc_oc=AdkqdrfL7i92-t90uNYfRuRbr-KRiUvgEV6puDvKRW8oz5N7RuMetY3n8IVG1NmNsrH3Fax93Yh_tJqXH5NUEYsJ&_nc_zt=23&_nc_ht=scontent.fceb2-2.fna&_nc_gid=QwDZHjnjmoTDFsJAxaQh6g&oh=00_AfnBV1MaT2vO5DG4-1d2INcD8PH9aT6j9APms5RHEfPLzQ&oe=693602A4',
    'https://scontent.fceb2-2.fna.fbcdn.net/v/t39.30808-6/581949803_122193934826505927_3541532887922273510_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=rvpk5MD156cQ7kNvwH1NJhc&_nc_oc=AdlScz0fbH7Ct9fA0OIUcxJGsU0yX3Pv6wRHMfgcJlM7K4ykJimbCovNAwPe0XMzCKX7LPu8Ep43Gvzf16ijPW0-&_nc_zt=23&_nc_ht=scontent.fceb2-2.fna&_nc_gid=-5oDght8He8IywWGwror3w&oh=00_Afn9a58hOE4ZX1UHu8JW9q2wyalljiF9WeZUNU3gIPvPCw&oe=693605AA',
    'https://scontent.fceb6-3.fna.fbcdn.net/v/t39.30808-6/582705373_122193934778505927_610940082097217434_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Uierrgrj8-MQ7kNvwFzRKeb&_nc_oc=AdlX_usCCKSt2um727L0zZD1_4ehoutNnrQHMOgStPYakTBgfw2EnFGVKnReFN4hCnToA4SLSuKR4mC2OafNlVKp&_nc_zt=23&_nc_ht=scontent.fceb6-3.fna&_nc_gid=QwugEXRYBo2o1xWLie324A&oh=00_AfkDDpCLLkllOLB4npg-X4a_C3mwNLM0dXDuYzxW4-F4HQ&oe=6935FA69',
    'https://scontent.fceb6-2.fna.fbcdn.net/v/t39.30808-6/584505933_122193935042505927_3908263788760769210_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=4Um_5nYzdaYQ7kNvwE_xftT&_nc_oc=AdlQ5jW6Hf9HcluVwKGTWKXtDBiagyEWNtWCrqr0J_exXSWIxrLBd4hjPi6jjx_QTqjCdVbJRhrbigk4V-pcpLka&_nc_zt=23&_nc_ht=scontent.fceb6-2.fna&_nc_gid=-7MdMnZcWlpf2rtV3JJGzA&oh=00_Afl_baFlAMio7Bf0OqORQQztRc76yAMOnVdpXqM_7OZmzg&oe=6935D546',
    'https://scontent.fceb2-1.fna.fbcdn.net/v/t39.30808-6/583996039_122193935600505927_3194205803779353297_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=CM6mkiEhmmoQ7kNvwHaMyRP&_nc_oc=AdkyrLE_w5Hy0pWB63MoRVLXlS7pEqNJAe_Y6VPHBEd5U7YAQaYlQ9fVkxErzLBLEkC5SKJZrMecIeDxYCelZIjm&_nc_zt=23&_nc_ht=scontent.fceb2-1.fna&_nc_gid=oygQfVhtuS_Me9o659d_WQ&oh=00_AfkTm71juugGh3uUaU66um1Pa6d6Ww7g2hY3F_q7jd1EXA&oe=6935E721',
    'https://scontent.fceb6-4.fna.fbcdn.net/v/t39.30808-6/582013485_122193935588505927_4633713450293629393_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=evXZRCCBDccQ7kNvwFvGNFa&_nc_oc=Adm0j_ewEoNPWcx2Flw2ua4uPlm3GgCyE8CDnK2RWPBUmbqThJT7TGG2LxjLrvRkVh4D0LVj28Ywxoy2rJ59Do0A&_nc_zt=23&_nc_ht=scontent.fceb6-4.fna&_nc_gid=CPU-Qsd8SqEsyQHOsJu3Ig&oh=00_Afm8ZtFq7azYRGlpydwoO6lW7eZO2GXb9jOlVJ_jvq95Tw&oe=6935D612'
  ],
  featured: true,
};

const addNewProperty = async () => {
  console.log('Adding Avida Riala property to Firebase...');
  try {
    const id = await addProperty(newProperty);
    console.log(`✅ Property added successfully with ID: ${id}`);
  } catch (error) {
    console.error('❌ Failed to add property:', error);
  }
};

addNewProperty();
