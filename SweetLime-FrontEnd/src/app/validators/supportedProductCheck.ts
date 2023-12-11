import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { SharedService } from "../services/shared.service";

export function supportedProductCheck(
    sharedService: SharedService
): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const url = control.value || '';
            const isSupported = sharedService.getWebList().some(web => url.includes(web));

            return isSupported ? null : {supportedProduct: true};
        };
}
