import { Component, OnInit } from '@angular/core';

import { StartUpService } from '../startup/start-up.service';
import { SharedService } from '../services/shared.service';
import { ActivatedRoute } from '@angular/router';

interface RouteData {
  supportedWebs: string[];
}

@Component({
  selector: 'app-supported-web',
  templateUrl: './supported-web.component.html',
  styleUrls: ['./supported-web.component.scss']
})

export class SupportedWebComponent {
  supportedWebs: string[] = [];

  constructor(
    private startUpService: StartUpService,
  ) {}

  ngDoCheck() {
    this.supportedWebs = this.startUpService.getWebList();
    // this.supportedWebs = this.route.snapshot.data['supportedWebs'];
    console.log('Supported Websites:', this.supportedWebs)
  }
}
