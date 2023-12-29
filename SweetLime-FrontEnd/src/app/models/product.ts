export interface Product {
    productId: string;
    productName: string;
    productUrl: string;
    createdDate: Date;
    deletedDate: Date | null;
    imagePath: string | null;
    options: {
        [key: string]: string
    };
    priceHistory: {
        Price: number; 
        UpdatedDate: Date;
    }[];
    newestPrice: number;
}

// Function to format a Date to short date (day/month/year)
function formatShortDate(date: Date): string {
    return date.toLocaleDateString(undefined, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
}