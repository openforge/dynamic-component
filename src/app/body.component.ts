import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { AdDirective } from './ad.directive';
import { LayoutItem } from './ad-item';
import { AdComponent } from './ad.component';

@Component({
  selector: 'app-body',
  template: `
    <div class="ad-banner-example">
      <h3>Advertisements</h3>
      <ng-template layoutHost></ng-template>
    </div>
  `
})
export class BodyPanelComponent implements OnInit, OnDestroy {
  @Input() ads: LayoutItem[] = [];

  currentAdIndex = -1;

  @ViewChild(AdDirective, {static: true}) layoutHost!: AdDirective;
  interval: number|undefined;

  ngOnInit() {
    this.loadComponent();
    this.getAds();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    const LayoutItem = this.ads[this.currentAdIndex];

    const viewContainerRef = this.layoutHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<AdComponent>(LayoutItem.component);
    componentRef.instance.data = LayoutItem.data;
  }

  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/