import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class SharedService {
    showProductComponent = false;
    
    public webList: string[] = [];

    getWebList(): String[] {
        return this.webList;
    }
}