const initialState = [
  /*   
    {
        sku: "AI16SG",
        price: 289990,
        name: "Apple Iphone 11 Pro 64GB Space Grey",
        stock: 110,
        warning_at: 3,
        description: `5.8" SuperRetina XDR (2436x1125) TrueTone kijelző
        12+12/12/12MP kamera; A13 Bionic chip (2+4 mag)
        iOS 13 operációs rendszer`,
        specs: "Kijelző=5.8\" SuperRetina XDR (2436x1125) TrueTone\nProcesszor=A13 Bionic chip (2+4 mag)\nKamera=12+12/12/12MP\nOperációs renszer=iOS 13",
        primary_image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-pro-max-space-select-2019?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1566953858806",
        images:['https://img.windtrebusiness.it/Assets/device/397/C_4_device_311_0_foto3Colore.png','https://istyle.hu/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/i/p/iphone_11_pro_sg_1_1_2.jpg','https://istyle.hu/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/i/p/iphone_11_pro_sg_6_1_2.jpg'],
        recommended:["AI11SG","AI112P","AI16SG","MBP13","IP2020","BCNAFT"],
    },{
        sku: "AI11SG",
        price: 309990,
        name: "Apple Iphone 11 Pro 128GB Midnight Green",
        stock: 3,
        warning_at: 3,
        description: `5.8" SuperRetina XDR (2436x1125) TrueTone kijelző
        12+12/12/12MP kamera; A13 Bionic chip (2+4 mag)
        iOS 13 operációs rendszer`,
        specs: "asd",
        primary_image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-pro-max-midnight-green-select-2019?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1566953859350",
        images:['https://img.windtrebusiness.it/Assets/device/397/C_4_device_311_0_foto3Colore.png','https://istyle.hu/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/i/p/iphone_11_pro_sg_1_1_2.jpg','https://istyle.hu/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/i/p/iphone_11_pro_sg_6_1_2.jpg'],
        recommended:["AI11SG","AI16SG","MBP13","IP2020","BCNAFT"],
    },
    {
        sku: "AI112P",
        price: 349990,
        name: "Apple Iphone 11 256GB (PRODUCT RED)",
        stock: 0,
        warning_at: 3,
        description: `5.8" SuperRetina XDR (2436x1125) TrueTone kijelző
        12+12/12/12MP kamera; A13 Bionic chip (2+4 mag)
        iOS 13 operációs rendszer`,
        specs: "asd",
        primary_image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone11-red-select-2019_GEO_EMEA?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1567021767076",
        images:['https://istyle.hu/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/i/p/iphone_11_pro_sg_1_1_2.jpg','https://istyle.hu/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/i/p/iphone_11_pro_sg_6_1_2.jpg'],
        recommended:["AI11SG","AI112P"],
    },
    {
        sku: "MBP13",
        price: 449900,
        name: "Apple Macbook Pro 13",
        stock: 2,
        warning_at: 3,
        description: `Intel® Core™ i5 / 4C / 1,4-3,9GHz +128MB eDRAM
        8 GB LPDDR3 RAM, 128 GB SSD
        13,3" WQXGA (2560 x 1600) IPS Retina kijelző`,
        specs: "asd",
        primary_image: "https://ctcszorakoztato.cdn.shoprenter.hu/custom/ctcszorakoztato/image/cache/w650h650wt1/products/r2/1979303982_171005160013701784.jpg?lastmod=1539607873.1482238000",
        images:['https://istyle.hu/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/i/p/iphone_11_pro_sg_1_1_2.jpg','https://istyle.hu/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/i/p/iphone_11_pro_sg_6_1_2.jpg'],
        recommended:["AI11SG","AI112P"],
    },
    {
        sku: "IP2020",
        price: 399000,
        name: "Apple iPad Pro 12.9\" + Cellular 64GB",
        stock: 10,
        warning_at: 3,
        description: `12,9″ Multi-Touch kijel­ző IPS LED
        A12X Bionic Octa-Core processzor
        iOS 12 operácios rendszer`,
        specs: "asd",
        primary_image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-select-cell-silver-202003_FMT_WHH?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1583551106639",
        images:['https://istyle.hu/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/i/p/iphone_11_pro_sg_1_1_2.jpg','https://istyle.hu/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/i/p/iphone_11_pro_sg_6_1_2.jpg'],
        recommended:["AI11SG","AI112P"],
    },
    {
        sku: "BCNAFT",
        price: 164990,
        name: "Boring Company Not a Flamethrower",
        stock: 10,
        warning_at: 3,
        description: `Additional customs fees may apply for international orders because of laws`,
        specs: "International customers can receive a full refund if not happy with said fees\nBefore shipping, aspiring flamethrower aficionados will be sent a terms and conditions rhyme for review and acceptance",
        primary_image: "https://images.squarespace-cdn.com/content/v1/5915617137c58104451ac5fb/1547102278389-T1626TUAKA8ENDM7YXHI/ke17ZwdGBToddI8pDm48kBbdSUIHrnfszC0Uv-s6NXNZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVHVFCHbO600DSvoILJ4oa2QnThAdi_sonYsmMjm7Z6bbO87Nsj43NRAr6WuWZv5DKs/giphy.gif?format=500w",
        images:['https://istyle.hu/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/i/p/iphone_11_pro_sg_1_1_2.jpg','https://istyle.hu/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/i/p/iphone_11_pro_sg_6_1_2.jpg'],
        recommended:["AI11SG","AI112P"],
    } */
];

export default function (state = initialState, action) {
  switch (action.type) {
    case "FETCH_PRODUCTS": {
      return [...action.payload.products];
    }
    default:
      return state;
  }
}
