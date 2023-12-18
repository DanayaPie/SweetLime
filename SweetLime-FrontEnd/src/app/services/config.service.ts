import { Injectable } from "@angular/core";
import { environment } from "src/config";

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    
    getApiUrl(): string {
        return environment.apiUrl;
    }

    getSupportedWebsites(): string[] {
        return environment.supportedWebsites;
    }
}
