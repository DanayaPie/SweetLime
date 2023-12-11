import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class SharedService {
    public webList: string[] = [];
    showProductComponent = false;
    supportedProduct = false;

    setWebList(supportedWebs: any[]): void {
        this.webList = supportedWebs.map(web => web.domainName);
        console.log('Web List: ', this.webList);
    }

    getWebList(): string[] {
        return this.webList;
    }
}