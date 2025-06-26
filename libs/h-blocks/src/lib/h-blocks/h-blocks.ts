import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-hblocks',
  imports: [CommonModule],
  templateUrl: './h-blocks.html',
  styleUrl: './h-blocks.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HBlocks {}
