import { Product } from "../../models/product";

export const twoProductHardCoded: Product[] = [
  {
    productId: 'c657fbc2-20b4-42fb-8b60-2d051b4bed2e',
    productName: 'Haruharu WONDER - Black Rice Hyaluronic Toner - Fragrance Free - 300ml',
    productUrl: 'https://www.stylevana.com/en_US/haruharu-wonder-black-rice-hyaluronic-toner-fragrance-free-300ml.html',
    createdDate: 1698182607,
    deletedDate: 0,
    imagePath: 'https://cdn.stylevana.com/media/catalog/product/cache/1/image/1000x1231/17f82f742ffe127f42dca9de82fb58b1/h/a/haruharu-wonder-black-rice-hyaluronic-toner-fragrance-free-300ml-899.jpg',
    options: {
      Size: '300ml',
      Color: 'No Color',
    },
    priceHistory: [
      { Price: 2240, UpdatedDate: 1698182607 },
      { Price: 1439, UpdatedDate: 1698252491 },
      { Price: 1920, UpdatedDate: 1699286222 },
      { Price: 1919, UpdatedDate: 1700580635 },
    ],
    newestPrice: 1919, // Add a property for the newest price if needed
  },
  {
    productId: '576461c7-a720-48b8-9a99-28a1fc052e1b',
    productName: 'BEAUTY OF JOSEON - Relief Sun : Rice + Probiotic SPF50+ PA++++ - 50ml',
    productUrl: 'https://www.stylevana.com/en_US/beauty-of-joseon-relief-sun-rice-probiotic-50ml.html',
    createdDate: 1698181905,
    deletedDate: 0,
    imagePath: 'https://cdn.stylevana.com/media/catalog/product/cache/1/image/1000x1231/17f82f742ffe127f42dca9de82fb58b1/b/e/beauty-of-joseon-relief-sun-rice-probiotic-50ml-318.jpg',
    options: {
      Size: '50ml',
      Color: 'No Color',
    },
    priceHistory: [
      { Price: 1440, UpdatedDate: 1698181905 },
      { Price: 1100, UpdatedDate: 1698252430 },
      { Price: 1169, UpdatedDate: 1698255996 },
      { Price: 1079, UpdatedDate: 1698849361 },
      { Price: 1440, UpdatedDate: 1699286161 },
      { Price: 1199, UpdatedDate: 1700580574 },
    ],
    newestPrice: 1199, // Add a property for the newest price if needed
  },
];
