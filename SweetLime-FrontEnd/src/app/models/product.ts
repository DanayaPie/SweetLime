export interface Product {
    productId: string;
    productName: string;
    productUrl: string;
    createdDate: string;
    deletedDate: string;
    imagePath: string | null;
    options: {
        [key: string]: string
    };
    priceHistory: {
        Price: number; 
        UpdatedDate: string
    }[];
    newestPrice: number;
}