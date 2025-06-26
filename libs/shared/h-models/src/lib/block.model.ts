import { JsonObject } from '@angular-devkit/core';
import { Type } from '@angular/core';

export interface BlockInstance {
  /** Unikalny identyfikator (crypto.randomUUID()). */
  id: string;
  /** Unikalny selector bloku */
  selector: string;
  /** Właściwości stworzone w Panelu Properties. */
  props: JsonObject;
  /** Mapowanie gniazd na listę dzieci (kolejność ważna). */
  children?: Record<string, string[]>;
}

export interface BlockDefinition {
  /** Typ bloku – klucz w registry */
  selector: string;
  /** Przyjazna nazwa widoczna w palecie */
  displayName: string;
  /** Nazwa ikony Material (np. "tab", "view_agenda"). */
  icon: string;
  /** Statyczna lista gniazd LUB pusta – wówczas blok sam dodaje sloty dyn. */
  slots: string[];
  /** Zod schema potrzebna do walidacji i generowania formularza. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: any;
  /** Lazy import komponentu renderującego blok. */
  lazyImport: () => Promise<Type<unknown>>;
}