import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { ComponentMetadata } from '@h-core/model';
import { ComponentRegistryService } from '@h-core/service';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatExpansionModule } from '@angular/material/expansion';


@Component({
  selector: 'app-palette',
  templateUrl: './palette.html',
  styleUrls: ['./palette.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    DragDropModule,
    MatExpansionModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaletteComponent implements OnInit {
  public blocks: ComponentMetadata<any>[] = [];

  private registry = inject(ComponentRegistryService);

  ngOnInit(): void {
    this.blocks = this.registry.getAll(); 
  }

}