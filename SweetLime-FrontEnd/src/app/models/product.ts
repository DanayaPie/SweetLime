export interface Product {
    productId: string;
    productName: string;
    productUrl: string;
    createdDate: number;
    deletedDate: number;
    imagePath: string | null;
    options: {
        [key: string]: string
    };
    priceHistory: {
        Price: number; 
        UpdatedDate: number
    }[];
    newestPrice: number;
}