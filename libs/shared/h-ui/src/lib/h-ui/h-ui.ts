import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-hui',
  imports: [CommonModule],
  templateUrl: './h-ui.html',
  styleUrl: './h-ui.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HUi {}
