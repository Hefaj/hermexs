import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-hcdk-extensions',
  imports: [CommonModule],
  templateUrl: './h-cdk-extensions.html',
  styleUrl: './h-cdk-extensions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HCdkExtensions {}
