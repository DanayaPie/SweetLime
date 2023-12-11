import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, of, switchMap, tap, throwError } from "rxjs";

import { ConfigService } from "../services/config.service";

@Injectable({
    providedIn: 'root'
})

export class StartUpService {
    private apiUrl: string;
    private webList: string[] = []

    constructor (
        private configService: ConfigService, 
        private http: HttpClient
        ) {
            this.apiUrl = this.configService.getApiUrl();
    }

    fetchSupportedWebs(): Observable<String[]> {
        const getAllWebsUrl = `${this.apiUrl}/supportedWebs`;

        return this.http.get<any[]>(getAllWebsUrl).pipe(
            catchError(error => {
                console.error('Error fetching supported websites:', error);
                return of([]); // return empty array
            }),
            tap(supportedWebs => this.setWebList(supportedWebs)) // tap is used to perform the 'setWebList' with the main observable
        );
    }

    setWebList(supportedWebs: any[]): void {
        this.webList = supportedWebs.map(web => web.domainName);
        console.log('Web List: ', this.webList);
    }

    getWebList(): string[] {
        return this.webList;
    }
}