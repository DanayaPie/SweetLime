import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { StartUpService } from "./start-up.service";

@Injectable({
    providedIn: 'root'
})

export class StartUpResolver implements Resolve<Observable<any>> {
    constructor(
        private startUpService: StartUpService
        ) {}

    resolve(): Observable<any> {
        return this.startUpService.fetchSupportedWebs();
    }
}