import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { BlockRegistry } from '../block-registry.service';
import { PageStore } from '../page-store.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { buildFieldsFromZod } from '@h-utils';

@Component({
  selector: 'h-properties-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatSelectModule],
  template: `
    <ng-container *ngIf="selected() as block">
      <h3 i18n>Właściwości – {{ defOf(block)?.displayName }}</h3>
      <form [formGroup]="form" class="panel-form">
        <ng-container *ngFor="let field of fields">
          <mat-form-field appearance="outline" *ngIf="field.type==='string'">
            <mat-label>{{ field.key }}</mat-label>
            <input matInput [formControlName]="field.key" />
          </mat-form-field>

          <mat-form-field appearance="outline" *ngIf="field.type==='select'">
            <mat-label>{{ field.key }}</mat-label>
            <mat-select [formControlName]="field.key">
              <mat-option *ngFor="let opt of field.options" [value]="opt">
                {{ opt }}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <!-- inne typy … -->
        </ng-container>
      </form>
    </ng-container>
  `,
  styles: [`.panel-form { display:flex; flex-direction:column; gap:12px; }`]
})
export class PropertiesPanelComponent implements OnInit, OnDestroy {
  private destroy = new Subject<void>();

  private store = inject(PageStore);
  private registry = inject(BlockRegistry);

  selected = this.store.selectedBlock;      // signal<string|null>
  defOf = (t: string) => this.registry.defOf(t);

  form = new FormGroup({});
  fields: { key: string; type: 'string'|'select'; options?: string[] }[] = [];

  ngOnInit() {
    // reaguj na zmianę zaznaczenia
    effect(() => {
      const blkId = this.selected();
      if (!blkId) { this.form.reset(); return; }

      const blk = this.store.page().blocks[blkId];
      const def = this.defOf(blk.selector);

      // buduj formularz na podstawie schematu Zod
      this.fields = buildFieldsFromZod(def?.schema);
      this.form = new FormGroup(Object.fromEntries(
        this.fields.map(f => [f.key, new FormControl(blk.props[f.key])])
      ));

      this.form.valueChanges
        .pipe(takeUntil(this.destroy))
        .subscribe(val => this.store.mutate(p => {
          p.blocks[blkId].props = { ...p.blocks[blkId].props, ...val };
        }));
    });
  }

  ngOnDestroy() { this.destroy.next(); }
}
