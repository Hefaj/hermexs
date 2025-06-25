import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  HMenu, 
  HMenuComponent, 
  HMenuMetadata, 
  HAccordionComponent, 
  HAccordionMetadata,
  HGridComponent,
  HGridMetadata
 } from '@h-core/ui';
import { ComponentRegistryService } from '@h-core/service';
import { PaletteComponent } from './component/palette/palette';
import { WorkspaceComponent } from './component/workspace/workspace';

@Component({
  imports: [CommonModule, PaletteComponent, WorkspaceComponent],
  selector: 'app-creator-entry',
  templateUrl: './creator.html',
  styleUrls: ['./creator.scss'],
})
export class RemoteEntry {
  private reg = inject(ComponentRegistryService);
  constructor() {
    // atoms
    this.reg.registerComponent(HMenuComponent, HMenuMetadata);
    this.reg.registerComponent(HAccordionComponent, HAccordionMetadata);
    this.reg.registerComponent(HGridComponent, HGridMetadata);
  }

  navItems: HMenu = {
    items: [
      {
        displayName: 'Home',
        fn: () => console.log('Home clicked')
      },
      {
        displayName: 'Settings',
        children: [
          {
            displayName: 'Profile',
            fn: () => console.log('Profile clicked')
          },
          {
            displayName: 'Account',
            fn: () => console.log('Account clicked')
          }
        ]
      },
      {
        displayName: 'Help',
        fn: () => console.log('Help clicked')
      }
    ]
  };
}
