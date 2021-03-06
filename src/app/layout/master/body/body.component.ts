import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { LayoutDirective } from '../../layout.directive';
import { LayoutItem } from '../../layout-item.class';
import { LayoutComponentInterface } from '../../layout.component.interface';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyPanelComponent implements OnInit, OnDestroy {
  @Input() layouts: LayoutItem[] = [];

  currentAdIndex = -1;

  @ViewChild(LayoutDirective, {static: true}) layoutHost!: LayoutDirective;
  interval: number|undefined;

  ngOnInit() {
    this.loadComponent();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.layouts.length;
    const LayoutItem = this.layouts[this.currentAdIndex];

    const viewContainerRef = this.layoutHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<LayoutComponentInterface>(LayoutItem.component);
    componentRef.instance.data = LayoutItem.data;
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/