import { Injectable } from "@angular/core";
import { SharedService } from "./shared.service";

@Injectable({
    providedIn: 'root'
})

export class SupportedWebsiteCheckService {
    private supportedWebsites: string[];

    constructor(
        sharedService: SharedService
    ) {
        this.supportedWebsites = sharedService.getWebList();
    }

    isSupportedWebsite(url: string): boolean {
        const domain = this.extractDomain(url.toLowerCase());
        return this.supportedWebsites?.includes(domain);
    }

    extractDomain(url: string): string {
        const match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)/im);
        return match ? match[1] : '';
    }
}