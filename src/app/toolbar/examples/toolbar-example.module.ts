import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../demo/components/demo-components.module';
import { FiltersModule } from '../../filters/filters.module';
import { ToolbarModule } from '../toolbar.module';
import { ToolbarExampleComponent } from './toolbar-example.component';

@NgModule({
  declarations: [ ToolbarExampleComponent ],
  imports: [
    BsDropdownModule.forRoot(),
    CommonModule,
    DemoComponentsModule,
    FiltersModule,
    TabsModule.forRoot(),
    ToolbarModule
  ],
  providers: [ BsDropdownConfig, TabsetConfig ]
})
export class ToolbarExampleModule {
  constructor() {}
}
