import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from './config.service';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private apiUrl: string;

    constructor (
        private configService: ConfigService, 
        private http: HttpClient
    ) {
        this.apiUrl = this.configService.getApiUrl();
    }

    fetchProductByUrl(productUrl: string): Observable<any> {
        const requestBody = { productUrl };
        const getProductByUrl = `${this.apiUrl}/productUrl`;
        return this.http.post<Product>(getProductByUrl, requestBody);
    }
}
