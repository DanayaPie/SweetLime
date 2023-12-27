import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-price-history',
  templateUrl: './price-history.component.html',
  styleUrls: ['./price-history.component.scss']
})

export class PriceHistoryComponent implements OnInit{
  @Input() product: Product | undefined;

  priceHistoryData: any[] = [];

  ngOnInit(): void {
    console.log('Price-History - ngOnInit', this.product)

    if (this.product) {

      this.extractPriceHistoryData();
    }
  }

  private extractPriceHistoryData(): void {
    if (this.product) {
      this.priceHistoryData = this.product.priceHistory;
    }
  }
}
