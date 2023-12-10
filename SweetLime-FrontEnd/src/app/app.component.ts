import { Component, OnInit } from '@angular/core';

import { StartUpService } from './services/startup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'SweetLime';

  constructor(private startupService: StartUpService) {}

  ngOnInit() {
    this.startupService.getSupportedWebsRequest().subscribe(
      (supportedWebs) => {
        this.startupService.setWebList(supportedWebs);
        console.log('Data fetched successfully:', supportedWebs);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    )
  }
}
