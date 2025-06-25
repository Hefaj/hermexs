import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentMetadata } from '@h-core/model';

export const HGridMetadata: ComponentMetadata<HGridComponent> = {
  selector: 'h-grid',
  displayName: 'Grid (H)',
  icon: 'grid_on',
  inputs: []
}

export interface HGrid {
  columns?: number;
  rows?: number;
  gap?: string;
  justifyContent?: string;
  alignItems?: string;
  style?: { [key: string]: string };
}

@Component({
  selector: 'h-grid',
  imports: [CommonModule],
  templateUrl: './h-grid.html',
  styleUrl: './h-grid.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HGridComponent {
  readonly data = input.required<HGrid>();
}
