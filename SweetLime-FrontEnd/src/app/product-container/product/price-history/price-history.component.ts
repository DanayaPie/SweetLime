import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-price-history',
  templateUrl: './price-history.component.html',
  styleUrls: ['./price-history.component.scss']
})
export class PriceHistoryComponent implements OnInit {
  @ViewChild('chart') private chartRef!: ElementRef;
  @Input() product: Product | undefined;

  public chart: any;

  ngOnInit(): void {
    // Check if product and priceHistory are defined before calling createChart
    if (this.product?.priceHistory) {
      this.createChart(this.product.priceHistory);
    }  }

  createChart(priceHistory: { Price: number; UpdatedDate: string }[]){
    const labels = priceHistory.map(entry => entry.UpdatedDate);
    const price = priceHistory.map(entry => entry.Price);

    this.chart = new Chart("PriceHistory", {
      type: 'line', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: labels, 
	       datasets: [
          {
            data: price,
          }
        ]
      },
      options: {
        // aspectRatio:2.5
      }
    });
  }
}
