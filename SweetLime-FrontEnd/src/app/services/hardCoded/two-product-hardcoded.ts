import { Product } from "../../models/product";

export const twoProductHardCoded: Product[] = [
  {
    productId: '3dbff070-572b-4a21-8c73-95666d8b3cb7',
    productName: 'BEAUTY OF JOSEON - Relief Sun : Rice + Probiotic SPF50+ PA++++ - 10ml',
    productUrl: 'https://www.stylevana.com/en_US/beauty-of-joseon-relief-sun-rice-probiotic-50ml.html',
    createdDate: 1698181905,
    deletedDate: 0,
    imagePath: 'https://cdn.stylevana.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/b/e/beauty-of-joseon-relief-sun-rice-probiotic-50ml-318.jpg',
    options: {
      Size: '10ml',
      Color: 'N',
    },
    priceHistory: [
      { Price: 329, UpdatedDate: 1698181905 },
      { Price: 369, UpdatedDate: 1700580574 },
      { Price: 289, UpdatedDate: 1701304396 },
      { Price: 329, UpdatedDate: 1702669823 },
    ],
    newestPrice: 329, // Add a property for the newest price if needed
  },
  {
    productId: '576461c7-a720-48b8-9a99-28a1fc052e1b',
    productName: 'BEAUTY OF JOSEON - Relief Sun : Rice + Probiotic SPF50+ PA++++ - 50ml',
    productUrl: 'https://www.stylevana.com/en_US/beauty-of-joseon-relief-sun-rice-probiotic-50ml.html',
    createdDate: 1698181905,
    deletedDate: 0,
    imagePath: 'https://cdn.stylevana.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/b/e/beauty-of-joseon-relief-sun-rice-probiotic-spf50-pa-10ml-688.jpg',
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
