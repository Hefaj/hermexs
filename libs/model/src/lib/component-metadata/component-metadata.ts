import { Type } from '@angular/core';
/**
 * Describes the metadata needed by the visual editor for a component.
 */
export interface ComponentMetadata<T = any> {
  /** CSS selector of the component (e.g. 'h-menu') */
  selector: string;
  /** Display name shown in the palette */
  displayName: string;
  /** Icon name (e.g. material icon key) */
  icon?: string;
  /** Array of input definitions for dynamic property panel */
  inputs?: Array<{
    /** @Input() property name */
    name: keyof T & string;
    /** Label for the form field */
    label: string;
    /** JSON Schema fragment describing the value */
    schema?: any;
    /** Default value to initialize the input */
    defaultValue?: any;
  }>;
}

/**
 * Internal container tying a component to its metadata.
 */
export interface RegisteredComponent {
  component: Type<any>;
  metadata: ComponentMetadata;
}