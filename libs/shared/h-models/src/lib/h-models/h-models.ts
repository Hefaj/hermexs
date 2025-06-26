import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-hmodels',
  imports: [CommonModule],
  templateUrl: './h-models.html',
  styleUrl: './h-models.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HModels {}
