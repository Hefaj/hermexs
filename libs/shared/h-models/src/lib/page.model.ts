import { BlockInstance } from './block.model';

/**
 * Jeden kompletny ekran (page) w Creatorze/ERP-ie.
 */
export interface Page {
  /** Identyfikator (UUID) strony – wygodne przy autosave i backendzie. */
  id: string;

  /**
   * Słownik wszystkich bloków występujących na stronie.
   *   klucz   – id bloku (string, UUID)
   *   wartość – BlockInstance (props + mapy slotów)
   */
  blocks: Record<string, BlockInstance>;

  /**
   * Mapowanie slot->lista ids dzieci.
   *   "root"      – tablica id bloków na najwyższym poziomie strony
   *   "tab-0"…    – tablice id dla slotów poszczególnych Tabsów
   *   "section-1" – dowolne inne sloty zależne od typu bloku
   *
   * Jeżeli slot nie istnieje w obiekcie, uznajemy, że jest pusty.
   */
  children: Record<string, string[]>;

  /** (opcjonalnie) dodatkowe metadane */
  title?: string;
  lastModified?: string;   // ISO date
}
