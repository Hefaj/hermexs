import {
  Component,
  Input,
  OnInit,
  ViewContainerRef,
  Injector,
  Type,
  signal,
  inject,
} from '@angular/core';
import { BlockInstance } from '@h-models';
import { BlockRegistry } from '../block-registry.service';

@Component({
  selector: 'h-block-host',
  standalone: true,
  template: '<ng-template #vc></ng-template>',
})
export class BlockHostComponent implements OnInit {
  @Input({ required: true }) instance!: BlockInstance;

  private readonly propsSig  = signal(this.instance.props);
  private readonly childrenSig = signal(this.instance.children ?? {});


  private vcr = inject(ViewContainerRef);
  private registry = inject(BlockRegistry);

  async ngOnInit(): Promise<void> {
    const def = this.registry.defOf(this.instance.selector);
    if (!def) {
      console.error('Unknown block selector', this.instance.selector);
      return;
    }

    const comp: Type<unknown> = await def.lazyImport();

    this.vcr.createComponent(comp, {
      injector: Injector.create({
        providers: [
          { provide: 'blockInstance', useValue: this.instance },
          { provide: 'blockProps',    useValue: this.propsSig },
          { provide: 'blockChildren', useValue: this.childrenSig },
        ],
      }),
    });
  }
}