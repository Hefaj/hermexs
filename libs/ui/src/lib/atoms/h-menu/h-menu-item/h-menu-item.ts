import { ChangeDetectionStrategy, Component, input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface HMenuItem {
  displayName: string;
  iconName: string;
  route?: string;
  children?: HMenuItem[];
}

@Component({
  selector: 'h-menu-item',
  imports: [MatMenuModule, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './h-menu-item.html',
  styleUrl: './h-menu-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HMenuItemComponent {
  readonly items = input.required<HMenuItem[]>();
  @ViewChild('childMenu') childMenu!: MatMenu;
}
