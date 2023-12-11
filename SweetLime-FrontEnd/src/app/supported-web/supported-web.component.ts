import { Component } from '@angular/core';

import { StartUpService } from '../startup/start-up.service';
import { SharedService } from '../services/shared.service';

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
    public sharedService: SharedService,
  ) {}
}
