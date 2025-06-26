import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { BlockRegistry } from '../block-registry.service';

@Component({
  selector: 'h-block-palette',
  standalone: true,
  imports: [CommonModule, CdkDrag, MatListModule, MatIconModule],
  template: `
    <mat-nav-list>
      <a mat-list-item
         *ngFor="let def of registry.definitions()"
         cdkDrag
         [cdkDragData]="def"
         (cdkDragStarted)="preview = def.icon"
         (cdkDragEnded)="preview = null">
        <mat-icon>{{ def.icon }}</mat-icon>
        {{ def.displayName }}
      </a>
    </mat-nav-list>

    <div class="drag-preview" *ngIf="preview">
      <mat-icon>{{ preview }}</mat-icon>
    </div>
  `,
  styles: [`.drag-preview { position:fixed; pointer-events:none; }`]
})
export class BlockPaletteComponent {
  preview: string|null = null;
  public registry = inject(BlockRegistry);
}
