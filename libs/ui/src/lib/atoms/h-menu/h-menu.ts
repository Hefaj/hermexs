import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HMenuItem, HMenuItemComponent } from './h-menu-item/h-menu-item';
import { ComponentMetadata } from '@h-core/model';

export const HMenuMetadata: ComponentMetadata<HMenuComponent> = {
  selector: 'h-menu',
  displayName: 'Menu (H)',
  icon: 'menu',
  inputs: [
    {
      name: 'data',           // musi być kluczem HMenuComponent
      label: 'Dane menu',
      defaultValue: { items: [] } as HMenu,
      schema: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            title: 'Pozycje',
            items: {
              type: 'object',
              title: 'Pozycja menu',
              properties: {
                label: { type: 'string', title: 'Etykieta' },
                icon: { type: 'string', title: 'Ikona' },
                action: { type: 'string', title: 'Akcja' },
                subItems: {
                  type: 'array',
                  title: 'Podmenu',
                  items: { /* … */ }
                }
              }
            }
          }
        }
      }
    }
  ]
};

export interface HMenu {
  items?: HMenuItem[];
}

@Component({
  selector: 'h-menu',
  standalone: true,
  imports: [MatMenuModule, CommonModule, MatButtonModule, HMenuItemComponent],
  templateUrl: './h-menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HMenuComponent {
  readonly data = input.required<HMenu>();
}