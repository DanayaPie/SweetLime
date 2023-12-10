import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ConfigService {
    private apiUrl = 'http://localhost:8080';

    getApiUrl(): string {
        return this.apiUrl;
    }
}