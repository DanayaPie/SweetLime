import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})

export class PriceListComponent {
  @ViewChild('chart') private chartRef!: ElementRef;
  @Input() product: Product | undefined;

  public priceHistoryChart: any;
  public selectedTimeRange: string = 'all';

  ngOnInit(): void {
    // Check if product and priceHistory are defined before calling createChart
    if (this.product?.priceHistory) {
      this.createChart(this.product.priceHistory);
    }  
  }

  createChart(priceHistory: { Price: number; UpdatedDate: Date }[]){
    if (this.priceHistoryChart) {
      this.priceHistoryChart.destroy(); // destroy previous chart instance to prevent memory leaks
    }

    const filteredDate = this.filterDataByTimeRange(priceHistory);
    const labels = this.generateCustomLabels(priceHistory);
    const price = priceHistory.map(entry => entry.Price);

    this.priceHistoryChart = new Chart("PriceHistory", {
      type: 'line', //this denotes tha type of chart
      data: {
        // values on X-Axis
        labels: labels, 
	       datasets: [
          {
            data: price,
            fill: false,
            borderColor: '#ffb340'
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            display: false // hind legend
          }
        },
      }
    });
  }

  generateCustomLabels(priceHistory: { Price: number; UpdatedDate: Date }[]): string[] {
    let currentYear = '';

    const filteredDate = this.filterDataByTimeRange(priceHistory);
        
    return filteredDate.map(entry => {
      const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: '2-digit' };
      const formattedDate = entry.UpdatedDate.toLocaleDateString(undefined, options);
      
      // Extract the last two digits of the year
      const yearSubstring = formattedDate.slice(-2);
  
      // Update currentYear when the year changes
      if (currentYear !== yearSubstring) {
        currentYear = yearSubstring;
        return `${formattedDate}'`;
      }
  
      // Only display the month and day when the year remains the same
      return formattedDate.slice(0, -3);
    });
  }
  
  filterDataByTimeRange(data: { Price: number; UpdatedDate: Date }[]): { Price: number; UpdatedDate: Date }[] {    
    if (!data) {
      return [];
    }

    const currentDate = new Date();
    let startDate = new Date();

    switch (this.selectedTimeRange) {
      case '1':
        startDate.setMonth(currentDate.getMonth() - 1);
        break;
      case '3':
        startDate.setMonth(currentDate.getMonth() - 3);
        break;
      case '6':
        startDate.setMonth(currentDate.getMonth() - 6);
        break;
      case '12':
        startDate.setMonth(currentDate.getMonth() - 12);
        break;
      default:
        // 'all' or invalid option will return original data
        return data;
    }

    // filter data based on the start date
    return data.filter(entry => entry.UpdatedDate >= startDate);
  }

  onTimeRangeClick(timeRange: string) {
    this.selectedTimeRange = timeRange;
    this.createChart(this.product?.priceHistory || []);
  }

  isSelectedTimeRange(timeRange: string): boolean {
    return this.selectedTimeRange === timeRange;
  }
}
