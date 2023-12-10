import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { ConfigService } from "./config.service";

@Injectable({
    providedIn: 'root'
})

export class StartUpService {
    private apiUrl: string;

    constructor (private configService: ConfigService, private http: HttpClient) {
        this.apiUrl = this.configService.getApiUrl();
    }

    getSupportedWebs(): Observable<any> {
        const getAllWebsUrl = `${this.apiUrl}/supportedWebs`;
        return this.http.get<any>(getAllWebsUrl);
    }
}