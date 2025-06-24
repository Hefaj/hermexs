import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HMenu, HMenuComponent } from '@h-core/ui';

@Component({
  imports: [CommonModule, HMenuComponent],
  selector: 'app-creator-entry',
  templateUrl: './creator.html',
  styleUrls: ['./creator.scss'],
})
export class RemoteEntry {
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
