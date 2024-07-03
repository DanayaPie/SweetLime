import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'timeRangeLabel'
})


export class TimeRangeLabelPipe implements PipeTransform {
    transform(value: string): string {
        switch (value) {
            case '1':
                return '1 Month';
            case '3':
                return '3 Months';
            case '6':
                return '6 Months';
            case '12':
                return '1 Year';
            case 'all':
                return 'All Time';
            default:
                return '';
        }
    }    
}