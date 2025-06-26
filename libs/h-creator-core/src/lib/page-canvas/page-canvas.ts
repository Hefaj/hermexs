import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BlockHostComponent } from '../block-host/block-host';
import { PageStore } from '../page-store.service';

@Component({
  selector: 'h-page-canvas',
  standalone: true,
  imports: [CommonModule, DragDropModule, BlockHostComponent],
  template: `
  <div class="flex flex-col gap-4" cdkDropList id="root" [cdkDropListData]="rootIds" (cdkDropListDropped)="onRootDrop($event)">
    <ng-container *ngFor="let blk of page.rootBlocks()">
      <h-block-host [instance]="blk" />
    </ng-container>
  </div>`,
})
export class PageCanvasComponent {
  public page = inject(PageStore);

  get rootIds(): string[] {
    return this.page.state().root;
  }

  onRootDrop = (ev: import('@angular/cdk/drag-drop').CdkDragDrop<string[]>): void => {
    const id = ev.item.data as string;
    this.page.moveBlock(id, 'root', 'root', ev.currentIndex);
  };
}
