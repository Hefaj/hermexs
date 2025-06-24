import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HMenuItem, HMenuItemComponent } from './h-menu-item/h-menu-item';

export interface HMenu {
  items: HMenuItem[];
}


@Component({
  selector: 'h-menu',
  standalone: true,
  imports: [MatMenuModule, CommonModule, MatButtonModule, MatIconModule, HMenuItemComponent],
  templateUrl: './h-menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HMenuComponent {
  readonly data = input.required<HMenu>();
}