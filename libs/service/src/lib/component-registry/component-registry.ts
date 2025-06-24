import { Injectable, Type } from '@angular/core';
import { ComponentMetadata, RegisteredComponent } from '@h-core/model';

@Injectable({ providedIn: 'root' })
export class ComponentRegistryService {
  private registry: Map<string, RegisteredComponent> = new Map();

  /**
   * Registers a component with its metadata.
   * @param component - Angular component class
   * @param metadata - Configuration for palette and property panel
   */
  registerComponent<T>(component: Type<T>, metadata: ComponentMetadata<T>): void {
    if (this.registry.has(metadata.selector)) {
      console.warn(`[ComponentRegistry] Overwriting existing component for selector "${metadata.selector}".`);
    }
    this.registry.set(metadata.selector, { component, metadata });
  }

  /**
   * Returns all registered components in insertion order.
   * Used to populate the palette sidebar.
   */
  getAll(): ComponentMetadata[] {
    return Array.from(this.registry.values()).map(r => r.metadata);
  }

  /**
   * Look up the Angular component class by its selector.
   * @param selector - CSS selector string
   */
  getComponentBySelector(selector: string): Type<any> | undefined {
    return this.registry.get(selector)?.component;
  }

  /**
   * Look up the metadata by component selector.
   * @param selector - CSS selector string
   */
  getMetadataBySelector(selector: string): ComponentMetadata | undefined {
    return this.registry.get(selector)?.metadata;
  }

  /**
   * Clears the registry. Useful for tests or hot reloading.
   */
  clear(): void {
    this.registry.clear();
  }
}
