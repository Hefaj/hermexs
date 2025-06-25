import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.html',
  styleUrls: ['./workspace.scss'],
  // Jeśli komponent jest standalone, dodaj:
  // standalone: true,
  imports: [CommonModule, DragDropModule]
})
export class WorkspaceComponent {// implements OnInit, OnDestroy {
  // ID dla naszej listy cdkDropList, aby połączyć ją z paletą
  readonly WORKSPACE_DROP_LIST_ID = 'workspace-drop-list';
  // currentPage$: Observable<Page | null>;
  // selectedBlockId$: Observable<string | null>;
  // private subscriptions = new Subscription();

  // // private pageDataService: PageDataService
  // constructor() {
  //   this.currentPage$ = of();//this.pageDataService.currentPage$;
  //   this.selectedBlockId$ = this.pageDataService.selectedBlockId$;
  // }

  // ngOnInit(): void {
  //   // Można tu coś zainicjować, jeśli potrzeba
  //   // Np. upewnić się, że strona jest załadowana (choć robimy to w AppModule/AppComponent)
  // }

  // // Metoda obsługująca upuszczanie elementów
  drop(event: CdkDragDrop<any, any, any>): void {
    console.log('drop', event);
  //   // const page = this.pageDataService.getCurrentPageSnapshot();
  //   // if (!page) return;

  //   // if (event.previousContainer === event.container) {
  //   //   // Przenoszenie bloku w obrębie workspace (zmiana kolejności)
  //   //   if (event.container.data && page.blocks) {
  //   //     const movedBlockId = (event.container.data as Block<AllBlockConfigs>[])[event.previousIndex].id;
  //   //     // Tworzymy nową tablicę bloków z poprawną kolejnością
  //   //     const newBlocksArray = [...page.blocks];
  //   //     moveItemInArray(newBlocksArray, event.previousIndex, event.currentIndex);

  //   //     // Aktualizujemy 'order' dla wszystkich bloków
  //   //     const blocksWithUpdatedOrder = newBlocksArray.map((block, index) => ({ ...block, order: index }));

  //   //     // Aktualizujemy stronę w serwisie
  //   //     // Potrzebujemy metody w PageDataService, która przyjmie całą zaktualizowaną tablicę bloków
  //   //     // lub zaktualizuje kolejność na podstawie ID i nowego indeksu.
  //   //     // Dla uproszczenia, stworzymy metodę `updateBlocksArray` w PageDataService.
  //   //     this.pageDataService.updateBlocksArray(blocksWithUpdatedOrder);
  //   //     this.pageDataService.setSelectedBlock(movedBlockId); // Zaznacz przeniesiony blok
  //   //   }
  //   // } else {
  //   //   // Dodawanie nowego bloku z palety
  //   //   // event.item.data to BlockType z palety
  //   //   const newBlockType = event.item.data as BlockType;
  //   //   this.pageDataService.addBlock(newBlockType, event.currentIndex);
  //   //   // Serwis PageDataService.addBlock powinien zająć się utworzeniem bloku
  //   //   // i automatycznym zaznaczeniem go.
  //   // }
  }

  // selectBlock(blockId: string, event: MouseEvent): void {
  //   // event.stopPropagation(); // Zapobiega propagacji, jeśli bloki są zagnieżdżone
  //   // this.pageDataService.setSelectedBlock(blockId);
  // }

  // // Pomocnicza funkcja do śledzenia elementów w *ngFor dla lepszej wydajności
  // trackByBlockId(index: number, block: Block<AllBlockConfigs>): string {
  //   return block.id;
  // }

  // ngOnDestroy(): void {
  //   this.subscriptions.unsubscribe();
  // }
}