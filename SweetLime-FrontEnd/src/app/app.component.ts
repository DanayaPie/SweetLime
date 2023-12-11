import { Component, OnInit } from '@angular/core';

import { SharedService } from './services/shared.service';
import { StartUpService } from './startup/start-up.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'SweetLime';

  constructor(
    private startUpService: StartUpService,
    public sharedService: SharedService
    ) {}

  ngOnInit() {
    this.startUpService.fetchSupportedWebs().subscribe(
      (supportedWebs) => {
        this.sharedService.setWebList(supportedWebs);
        console.log('Data fetched successfully:', supportedWebs);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    )
  }
}
