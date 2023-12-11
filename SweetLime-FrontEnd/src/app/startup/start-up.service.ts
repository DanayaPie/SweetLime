import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, of, switchMap, tap, throwError } from "rxjs";

import { ConfigService } from "../services/config.service";
import { SharedService } from "../services/shared.service";

@Injectable({
    providedIn: 'root'
})

export class StartUpService {
    private apiUrl: string;

    constructor (
        private configService: ConfigService, 
        private http: HttpClient,
        private sharedService: SharedService
        ) {
            this.apiUrl = this.configService.getApiUrl();
            this.fetchSupportedWebs().subscribe();
    }

    fetchSupportedWebs(): Observable<String[]> {
        const getAllWebsUrl = `${this.apiUrl}/supportedWebs`;

        return this.http.get<any[]>(getAllWebsUrl).pipe(
            catchError(error => {
                console.error('Error fetching supported websites:', error);
                return of([]); // return empty array
            }),
            tap(supportedWebs => this.sharedService.setWebList(supportedWebs)) // tap is used to perform the 'setWebList' with the main observable
        );
    }
}