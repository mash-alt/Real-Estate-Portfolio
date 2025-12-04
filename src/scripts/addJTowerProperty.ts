import { addProperty } from '../services/propertyService';

const newProperty = {
  title: 'J Tower Residences - SM Jmall Mandaue',
  type: 'Condominium' as const,
  location: 'Cebu' as const,
  price: 1400000,
  area: 28,
  bedrooms: 1,
  bathrooms: 1,
  description: 'Brand new 1-bedroom corner unit at J Tower Residences, located right beside SM Jmall Mandaue City. High floor Level 20 unit with 28 sqm floor area. Fully furnished and ready to move in. Available for assume/sale at ₱1.4M with monthly amortization of ₱40K for 10 years, or for rent at ₱35,000/month. Perfect investment opportunity in a prime location.',
  features: [
    'Corner Unit',
    'High Floor Level 20',
    'Fully Furnished',
    'Beside SM Jmall',
    'Brand New',
    'For Assume',
    'For Rent',
    'Monthly Rental: ₱35K',
    'Assume Price: ₱1.4M',
    'Monthly Amortization: ₱40K',
    '10-Year Term'
  ],
  images: [
    'https://scontent.fmnl4-1.fna.fbcdn.net/v/t39.30808-6/583319081_122193717902505927_6687622235585633822_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Y4BD3BZHV-oQ7kNvwGIhEep&_nc_oc=Adk_9v9E2TEK6ucvW0OLeo6QrGxmXhmPtSOdkTZagDCpk5uTxNrPWIBI_z0DGa4nENLZeOwtrWkayvTF80ZD1WPY&_nc_zt=23&_nc_ht=scontent.fmnl4-1.fna&_nc_gid=Nxk49YozGDykDNvb6croiw&oh=00_AflpZwy6_XoOKDyftSSUX2lFzYpkrPLxFD5BS6i8oGOOrw&oe=6935E2E0',
    'https://scontent.fceb6-2.fna.fbcdn.net/v/t39.30808-6/583705699_122193718022505927_8493638804567519306_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=N9aoDW6BhPIQ7kNvwEPSM5r&_nc_oc=AdkEK5E5jWP8dFdYJJS9_BjiCwV9w8QSTQg4Y_k40WDkK43CD_9FFIQrVibf3R2uAp537Fe-0bEEvKy4jm11cTpX&_nc_zt=23&_nc_ht=scontent.fceb6-2.fna&_nc_gid=bwoninAWToRdanROMuETxQ&oh=00_Afkhsp1Ldfk9-ZHvkC8UqeuKAs4Gscywg0oiTvQwsFw6ew&oe=6935DF03',
    'https://scontent.fceb6-3.fna.fbcdn.net/v/t39.30808-6/583307255_122193718190505927_5728053898864625076_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=lyze0Z4t1rkQ7kNvwERDvfo&_nc_oc=Adnjb79hW75iLDmdv7hlLE4KF4zvE5uz-Gnc7HdsLfA0kcjMDBl3yVjTUVPDAmZBXDe01ihbX4x-scQgjLxnacA3&_nc_zt=23&_nc_ht=scontent.fceb6-3.fna&_nc_gid=B5LXOpL_SllegpRC6Uv9Xg&oh=00_Afke1v2CBtBwPERmYWOJhKD4ZEQNItuY_q71_b257oQ9XA&oe=6936030D',
    'https://scontent.fceb6-3.fna.fbcdn.net/v/t39.30808-6/583793317_122193718010505927_2475737819170013285_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Xn1nP_FWTjoQ7kNvwFMOpTM&_nc_oc=Adl7__LK_uk2pEtCpZvaAXdar2dAS3KyswKtJlQn-ly_dQTcewkC7A7LTO7jLeSmJ12HhXGLWd5xLsxBThamyeN1&_nc_zt=23&_nc_ht=scontent.fceb6-3.fna&_nc_gid=82LUCQ5DyUKlqrs4JnbaRA&oh=00_AfmvO3N9A3GnSRAFGD3nDdiZfeYWdFn_doFeDCiKZXdJlw&oe=6935F05E',
    'https://scontent.fceb6-3.fna.fbcdn.net/v/t39.30808-6/582961667_122193717920505927_3215142621930609165_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=ALEJeWEHX-8Q7kNvwFQCt6d&_nc_oc=AdkC-1UjJozDRxCKK7kwKwZkuXTbdSK_V4fqL0Zy_V-_na34S98-M59MGbkxcUt133gh17N_9hf64vi3b4AXfet0&_nc_zt=23&_nc_ht=scontent.fceb6-3.fna&_nc_gid=2w238in32pECne3AARKl4Q&oh=00_Afn0hSYRJ4la-osqlUbwW0XgcHEJrcZ-KxkCiIm-Ea_xpg&oe=6935F856',
    'https://scontent.fceb6-2.fna.fbcdn.net/v/t39.30808-6/581934431_122193718196505927_1613701827633966331_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=HKuNzxY3DHsQ7kNvwHgdrTB&_nc_oc=AdkwCFaomulZyihC7TbgNdHnAhhou-1aR4gvIdV73qbHijM1GIo84ruYO0nWBJ19VNBy75qbAefq_DX1c2TcZk4-&_nc_zt=23&_nc_ht=scontent.fceb6-2.fna&_nc_gid=c6UXrNVXKDQwNBmg8R3lVQ&oh=00_Afk8E9CqtHmNB0ip-Jf1m11ma-rsC7dLYOqfc4ETUu2scw&oe=6935F24D',
    'https://scontent.fceb6-3.fna.fbcdn.net/v/t39.30808-6/584235983_122193717998505927_4958669053571317861_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=nPkYfhSELhsQ7kNvwH094Pb&_nc_oc=AdnJLlfcxZk9zb9YXgYJdkH4raKIIwWZqBDcgY07lTPLJ9t_n-n_BqSdeiNdaEzHSn9sJTL4KW_XHT8_asINaQ8A&_nc_zt=23&_nc_ht=scontent.fceb6-3.fna&_nc_gid=Xf1nf3M5poBhyKUpcazOlQ&oh=00_AfkXxVcwFZHVkSldgasj9tCHRoHfCS-qcDVQ5FbYqdgxaQ&oe=6935F53D',
    'https://scontent.fceb6-3.fna.fbcdn.net/v/t39.30808-6/583772165_122193717962505927_838410708137892056_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=zSnX19rnIKQQ7kNvwHKALpK&_nc_oc=AdluA29G_7tDSw35BNAZiAa8OmRx72DGUp-NttTjC3QcwZwD8r8s1P0HYC8pWu1OMwdFdKop-grzIHPC8oRTM2Oq&_nc_zt=23&_nc_ht=scontent.fceb6-3.fna&_nc_gid=qnbpIKTdDOtZp0W6HcZQrw&oh=00_AfmUjLGqHl8Kfc82fJl4FG8SW1QO9VrnrQk0CjeM6BKosA&oe=6935EEF1',
    'https://scontent.fceb6-2.fna.fbcdn.net/v/t39.30808-6/583006029_122193718256505927_5370761467685076135_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=N7S80vOdLAEQ7kNvwGy_stK&_nc_oc=AdkBOMxX3GMGgJIAx18sO-S0WbBkroqf_PEpnvwc-xRxS5xotavKTUoH1uPrW57E2fd7ulRni7CISeEJvgCSiuAD&_nc_zt=23&_nc_ht=scontent.fceb6-2.fna&_nc_gid=KQp0RibAYfrbZ2T9FRHehw&oh=00_AflmmJN6xm0aci1WSPA5DYiWzucMg_f3N9mJMDfCkP_eXA&oe=6935FA10',
    'https://scontent.fceb6-2.fna.fbcdn.net/v/t39.30808-6/584469440_122193717974505927_3784136371843097453_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=EGU-fLCjrtkQ7kNvwFa4FsR&_nc_oc=Adlts_XEPejn-iv-hUByR3jgcfHSI1d6eRoNFzd2Vg-7deNbmq0pFjAFPQKF3cdq80dW8NjdJpy1YPbcywNVieJ6&_nc_zt=23&_nc_ht=scontent.fceb6-2.fna&_nc_gid=_vpLjPbWu8K7eBRXIRVijw&oh=00_AfmgvC9KYRWYNYQETEMqX0xiZALuggBdusys62J4gbzJKA&oe=6935DBBB',
    'https://scontent.fceb6-3.fna.fbcdn.net/v/t39.30808-6/583847190_122193717986505927_6218470457902463164_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=P1hDWl_ccfsQ7kNvwE_Fx8n&_nc_oc=Adng3rLyCOptr8Uut2T9lByX1gNZBgo38nShILO9mXPDthtX3MsGO85gGKMRIHV-cFeqqxSckuFWp01oIWa98OwW&_nc_zt=23&_nc_ht=scontent.fceb6-3.fna&_nc_gid=ccAxM61E2bAHrypiyjIEfQ&oh=00_Afno_WtRdMEnub4rKVdtP7NGU8oXdreFaiswwWc3iNoxow&oe=6935F0BE'
  ],
  featured: true,
};

const addNewProperty = async () => {
  console.log('Adding J Tower Residences property to Firebase...');
  try {
    const id = await addProperty(newProperty);
    console.log(`✅ Property added successfully with ID: ${id}`);
  } catch (error) {
    console.error('❌ Failed to add property:', error);
  }
};

addNewProperty();
