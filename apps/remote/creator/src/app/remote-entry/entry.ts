import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HMenu, HMenuComponent, HMenuMetadata } from '@h-core/ui';
import { ComponentRegistryService } from '@h-core/service';
import { PaletteComponent } from './component/palette/palette';

@Component({
  imports: [CommonModule, HMenuComponent, PaletteComponent],
  selector: 'app-creator-entry',
  templateUrl: './creator.html',
  styleUrls: ['./creator.scss'],
})
export class RemoteEntry {
  private reg = inject(ComponentRegistryService);
  constructor() {
    this.reg.registerComponent(HMenuComponent, HMenuMetadata);
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
