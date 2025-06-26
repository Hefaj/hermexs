import {
  ZodTypeAny,
  ZodObject,
  ZodString,
  ZodNumber,
  ZodBoolean,
  ZodEnum,
  ZodNativeEnum,
  ZodArray,
  ZodOptional,
  ZodDefault,
  z,
} from 'zod';

/** Typ metadanych pojedynczego pola, zwracany przez buildFieldsFromZod */
export type FieldMeta =
  | { key: string; type: 'string' | 'text' | 'number' | 'switch'; required: boolean; default?: unknown }
  | { key: string; type: 'select'; options: string[]; required: boolean; default?: string }
  | { key: string; type: 'array-string'; required: boolean; default?: string[] };

/**
 * Zamienia ZodObject na listę opisów pól, prostą do wykorzystania w Property-Panelu.
 *
 * Obsługiwane typy:
 *   • ZodString (minLength>50 ⇒ 'text', inaczej 'string')
 *   • ZodNumber  → 'number'
 *   • ZodBoolean → 'switch'
 *   • ZodEnum / ZodNativeEnum → 'select' + options
 *   • ZodArray<ZodString>     → 'array-string'
 *
 *  Inne typy (Date, nested object, union, tuple …) pomija lub zgłasza warn,
 *  ale można je łatwo dodać w switchu.
 */
export function buildFieldsFromZod(schema: ZodObject<any>): FieldMeta[] {
  const shape = (schema as ZodObject<any>).shape;      // Record<string, ZodTypeAny>

  const unwrapOptional = (zod: ZodTypeAny): { type: ZodTypeAny; required: boolean } => {
    if (zod instanceof ZodOptional) return { type: zod.unwrap(), required: false };
    if (zod instanceof ZodDefault)   return { type: zod.removeDefault(), required: false };
    return { type: zod, required: true };
  };

  return Object.entries(shape).flatMap<FieldMeta>(([key, raw]) => {
    const { type: zod, required } = unwrapOptional(raw);

    /* ----------  string  ---------- */
    if (zod instanceof ZodString) {
      const isLong = zod._def.checks?.some(c => c.kind === 'min' && c.value >= 50);
      return [{ key, type: isLong ? 'text' : 'string', required }];
    }

    /* ----------  number  ---------- */
    if (zod instanceof ZodNumber) {
      return [{ key, type: 'number', required }];
    }

    /* ----------  boolean  ---------- */
    if (zod instanceof ZodBoolean) {
      return [{ key, type: 'switch', required }];
    }

    /* ----------  enum  ---------- */
    if (zod instanceof ZodEnum || zod instanceof ZodNativeEnum) {
      const opts = Object.values((zod as any).enum ?? zod.options);
      return [{ key, type: 'select', options: opts as string[], required }];
    }

    /* ----------  array<string>  ---------- */
    if (zod instanceof ZodArray && zod.element instanceof ZodString) {
      return [{ key, type: 'array-string', required }];
    }

    console.warn(`buildFieldsFromZod: pole „${key}” ma nieobsługiwany typ`, zod);
    return [];
  });
}
