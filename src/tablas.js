import tablas from '../tablas/retenciones.json' with { type: 'json' };

/**
 * Tablas de retenciones vigentes (LISR Art. 96, reforma 2024-04-01).
 * Re-exporta el contenido de `tablas/retenciones.json` para uso programático sin necesidad de `with { type: 'json' }`.
 *
 * @example
 * import { isr, tablas } from 'tax-mx/src/tablas.js';
 * import tablas from 'tax-mx/src/tablas.js';
 */
export const isr = tablas.isr;
export const retenciones = tablas;
export default tablas;
