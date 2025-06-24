import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { ComponentMetadata } from '@h-core/model';
import { ComponentRegistryService } from '@h-core/service';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'creator-palette',
  templateUrl: './palette.html',
  styleUrls: ['./palette.scss'],
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule]
})
export class PaletteComponent implements OnInit {
  // emitujemy metadata wybranego bloku do nadrzędnego kontenera (canvas)
  @Output() blockSelected = new EventEmitter<ComponentMetadata<any>>();

  // metadane wszystkich zarejestrowanych bloków
  public blocks: ComponentMetadata<any>[] = [];

  private registry = inject(ComponentRegistryService);

  ngOnInit(): void {
    this.blocks = this.registry.getAll(); 
    console.log(this.blocks);
    // getAll zwraca tablicę ComponentMetadata, zawierającą m.in.
    // displayName, selector, icon, inputs…
  }

  selectBlock(md: ComponentMetadata<any>) {
    // przekazujemy do kontenera wybrane metadata
    this.blockSelected.emit(md);
  }

  dragStart(md: ComponentMetadata<any>, ev: DragEvent) {
    // ustawiamy w transferze selector, aby kontener wiedział, co wstawić
    ev.dataTransfer?.setData('component-selector', md.selector);
  }
}
