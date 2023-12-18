import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { SharedService } from "../services/shared.service";

export function supportedWebsiteCheck(
    sharedService: SharedService
): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const url = control.value || '';
            console.log("SupportedWebsiteCheck - url:", url);

            const isSupported = sharedService.getWebList().some(web => url.includes(web));
            console.log("SupportedWebsiteCheck - isSupported", isSupported);

            return isSupported ? null : {supportedProduct: true};
        };
}
