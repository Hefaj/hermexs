import { Injectable, signal, computed } from '@angular/core';
import { JsonObject } from '@angular-devkit/core';
import { BlockInstance, Page } from '@h-models';

export interface PageState {
  blocks: Record<string, BlockInstance>; // słownik wszystkich bloków
  root: string[];                        // kolejność bloków w korzeniu
}

const initialState: PageState = { blocks: {}, root: [] };

@Injectable({ providedIn: 'root' })
export class PageStore {
    private readonly _state = signal<PageState>(initialState);
    // --- signals ---
    private readonly _page = signal<Page>({
        id: crypto.randomUUID(),
        blocks: {},
        children: { root: [] },
    });
    page = this._page.asReadonly();

    private readonly _selectedBlock = signal<string | null>(null);
    /** Id aktualnie wybranego bloku (lub null). */
    selectedBlock = this._selectedBlock.asReadonly();

    /** Ustaw zaznaczenie (łapiesz w Canvasie lub Drop-Slot). */
    select(id: string | null) {
        this._selectedBlock.set(id);
    }

    readonly state        = computed(() => this._state());
    readonly rootBlocks   = computed(() => this._state().root.map(id => this._state().blocks[id]));

    // --- history ---
    private readonly history = signal<Page[]>([]);
    private readonly future  = signal<Page[]>([]);

    // ─── Mutacje ────────────────────────────────────────────────
    mutate(m: (draft: Page) => void) {
        // snapshot przed zmianą
        this.history.update(h => [...h, structuredClone(this._page())]);
        this.future.set([]);

        const next = structuredClone(this._page());
        m(next);
        this._page.set(next);
        // autosave co 3 s debounced
        this.scheduleSave();
    }

    undo() {
        const h = this.history();
        if (!h.length) return;
        this.future.update(f => [this._page(), ...f]);
        this._page.set(h[h.length - 1]);
        this.history.set(h.slice(0, -1));
    }

    redo() {
        const f = this.future();
        if (!f.length) return;
        this.history.update(h => [...h, this._page()]);
        this._page.set(f[0]);
        this.future.set(f.slice(1));
    }

    addBlock(slotId: string, index: number, instance: BlockInstance): void {
        this._state.update(s => {
        const blocks = { ...s.blocks, [instance.id]: instance };
        const list   = this._getSlotArray(s, slotId);
        const upd    = [...list.slice(0, index), instance.id, ...list.slice(index)];
        return this._cloneWithSlot(s, slotId, upd, blocks);
        });
    }

    moveBlock(blockId: string, fromSlot: string, toSlot: string, newIdx: number): void {
        this._state.update(s => {
        const fromArr = [...this._getSlotArray(s, fromSlot)];
        const toArr   = (fromSlot === toSlot) ? fromArr : [...this._getSlotArray(s, toSlot)];
        const oldIdx  = fromArr.indexOf(blockId);
        if (oldIdx === -1) return s;

        fromArr.splice(oldIdx, 1);
        toArr.splice(newIdx, 0, blockId);

        let st = this._cloneWithSlot(s, fromSlot, fromArr);
        st = this._cloneWithSlot(st, toSlot, toArr);
        return st;
        });
    }

    patchProps(id: string, patch: Partial<JsonObject>): void {
        this._state.update(s => {
        const blk = s.blocks[id];
        if (!blk) return s;
        const mergedProps = { ...blk.props, ...patch };
        // Remove undefined values to satisfy JsonObject type
        const filteredProps = Object.fromEntries(
            Object.entries(mergedProps).filter(([_, v]) => v !== undefined)
        ) as JsonObject;
        const upd: BlockInstance = { ...blk, props: filteredProps };
        return { ...s, blocks: { ...s.blocks, [id]: upd } };
        });
    }

    removeBlock(id: string, parentSlot = 'root'): void {
        this._state.update(s => {
        const { [id]: _, ...rest } = s.blocks;
        const list = this._getSlotArray(s, parentSlot).filter(bid => bid !== id);
        return this._cloneWithSlot(s, parentSlot, list, rest);
        });
    }

    serialize(): string               { return JSON.stringify(this._state(), null, 2); }
    hydrate(json: string): void       { this._state.set(JSON.parse(json)); }

    // ─── Helpers ────────────────────────────────────────────────

    private _getSlotArray(s: PageState, slot: string): string[] {
        if (slot === 'root') return s.root;
        const owner = Object.values(s.blocks).find(b => b.children && slot in b.children);
        return owner?.children?.[slot] ?? [];
    }

    private _cloneWithSlot(
        s: PageState,
        slot: string,
        updated: string[],
        blocks: Record<string, BlockInstance> = s.blocks
    ): PageState {
        if (slot === 'root') return { ...s, blocks, root: updated };

        const [ownId, own] = Object.entries(blocks).find(([, b]) => b.children && slot in b.children) ?? [] as any;
        if (!own) return s;
        const newOwner: BlockInstance = { ...own, children: { ...own.children, [slot]: updated } };
        return { ...s, blocks: { ...blocks, [ownId]: newOwner } };
    }

    /* ---------- autosave ---------- */
    private saveTimer?: any;
    private scheduleSave() {
        clearTimeout(this.saveTimer);
        this.saveTimer = setTimeout(() => {
        /* call API */ console.log('autosave', this._page());
        }, 3000);
    }
}