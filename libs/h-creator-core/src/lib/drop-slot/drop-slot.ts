import {
  Component,
  Input,
  OnInit,
  inject,
  signal
} from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { BlockHostComponent } from '../block-host/block-host';
import { PageStore } from '../page-store.service';
import { BlockDefinition, BlockInstance } from '@h-models';
import { arrayMove } from '@h-utils';

@Component({
  selector: 'h-drop-slot',
  standalone: true,
  imports: [CommonModule, DragDropModule, BlockHostComponent],
  template: `
  <div
    cdkDropList
    [id]="slotId"
    [cdkDropListData]="childrenIds()"
    class="min-h-20 border border-dashed rounded-lg p-2 block"
    (cdkDropListDropped)="onDrop($event)">

    <ng-container *ngFor="let id of childrenIds(); let i = index">
      <h-block-host [instance]="blockById(id)" />
    </ng-container>
  </div>`,
})
export class DropSlotComponent implements OnInit {
  @Input({ required: true }) slotId!: string;
  @Input({ required: true }) children!: string[];

  public readonly childrenIds = signal<string[]>([]);

  private store = inject(PageStore);

  ngOnInit(): void {
    this.childrenIds.set(this.children);
  }

  blockById = (id: string): BlockInstance => this.store.state().blocks[id];

  onDrop(ev: CdkDragDrop<string[]>): void {
    const id        = ev.item.data as string;
    const fromSlot  = ev.previousContainer.id;
    const toSlot    = ev.container.id;
    const newIdx    = ev.currentIndex;
    this.store.moveBlock(id, fromSlot, toSlot, newIdx);
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      // reorder w tym samym slocie
      this.store.mutate(p => {
        arrayMove(p[this.slotId], event.previousIndex, event.currentIndex);
      });
    } else if (event.item.data?.type) {
      // drag z palety – event.item.data to BlockDefinition
      const def: BlockDefinition = event.item.data;
      const newInst: BlockInstance = {
        id: crypto.randomUUID(),
        selector: def.selector,
        props: {},           // domyślne -> możesz wypełnić z def.defaultProps
        children: {}
      };
      this.store.mutate(p => {
        p.blocks[newInst.id] = newInst;
        (p.children[this.slotId] ??= []).splice(event.currentIndex, 0, newInst.id);
      });
      // auto-select nowy blok
      this.store.selectedBlock.set(newInst.id);
    } else {
      // przenosimy istniejący blok między slotami
      const id = event.item.data as string;
      this.store.moveBlock(id,
          (event.previousContainer.data as DropSlotComponent).slotId,
          this.slotId,
          event.currentIndex);
    }
  }
}
