import { Injectable, signal, computed } from '@angular/core';
import { BlockDefinition } from '@h-models';

@Injectable({ providedIn: 'root' })
export class BlockRegistry {
  private readonly _defs = signal<BlockDefinition[]>([]);

  /** Publiczny readonly widok definicji (Signals API). */
  readonly definitions = computed(() => this._defs());

  register(def: BlockDefinition): void {
    this._defs.update(list => [...list, def]);
  }

  registerMany(defs: BlockDefinition[]): void {
    this._defs.update(list => [...list, ...defs]);
  }

  /** Pobiera definicję wg typu bloku. */
  defOf(selector: string): BlockDefinition | undefined {
    return this._defs().find(d => d.selector === selector);
  }
}
