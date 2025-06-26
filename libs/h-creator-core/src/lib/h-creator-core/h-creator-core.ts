import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-hcreator-core',
  imports: [CommonModule],
  templateUrl: './h-creator-core.html',
  styleUrl: './h-creator-core.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HCreatorCore {}
