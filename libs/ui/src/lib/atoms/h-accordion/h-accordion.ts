import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentMetadata } from '@h-core/model';
import {MatExpansionModule} from '@angular/material/expansion';

export const HAccordionMetadata: ComponentMetadata<HAccordionComponent> = {
  selector: 'h-accordion',
  displayName: 'Accordion (H)',
  icon: 'burger_menu',
}

interface HAccordionItem {

}

export interface HAccordion {
  items: HAccordionItem[];
}

@Component({
  selector: 'h-accordion',
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './h-accordion.html',
  styleUrl: './h-accordion.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HAccordionComponent {
  readonly data = input.required<HAccordion>();
}
