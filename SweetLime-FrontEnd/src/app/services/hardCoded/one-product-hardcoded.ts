import { Product } from "../../models/product";

export const oneProductHardCoded: Product[] = [
  {
    productId: "8a218519-53a0-4115-a5fa-6a962b56a047",
    productName: "numbuzin - No.3 Super Glowing Essence Toner - 200ml",
    productUrl: "https://www.stylevana.com/en_US/numbuz-n-no-3-super-glowing-essence-toner-200ml.html",
    createdDate: new Date("10/25/2023"),
    deletedDate: null,
    imagePath: "https://cdn.stylevana.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/n/u/numbuzin-no-3-super-glowing-essence-toner-200ml-529.jpg",
    options: {
      Size: "200ml",
      Color: "NOC",
    },
    priceHistory: [
      { Price: 12.5, UpdatedDate: new Date("10/25/2019") },
      { Price: 16.1, UpdatedDate: new Date("10/25/2023") },
      { Price: 15.3, UpdatedDate: new Date("10/28/2023") },
      { Price: 13.2, UpdatedDate: new Date("11/01/2023") },
      { Price: 11.11, UpdatedDate: new Date("11/11/2023") },
      { Price: 16, UpdatedDate: new Date("11/25/2023") },
      { Price: 14., UpdatedDate: new Date("11/30/2023") },
      { Price: 13.95, UpdatedDate: new Date("12/05/2023") },
      { Price: 14.09, UpdatedDate: new Date("12/15/2023") },
    ],
    newestPrice: 14.09,
    webdomain: 'Stylevana'
  }
];
