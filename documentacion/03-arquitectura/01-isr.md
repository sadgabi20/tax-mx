## Fuente legal

Artículo 96 de la Ley del Impuesto sobre la Renta (LISR), página 130 del PDF oficial de la Cámara de Diputados: https://www.diputados.gob.mx/LeyesBiblio/pdf/LISR.pdf

Tabla de tarifa mensual aplicable a pagos provisionales (reforma 1 de abril de 2024).

## Fórmulas

### ISR

```
E   = SB - li
RE  = E × PE
ISR = CF + RE
```

Donde:

* `SB`: Salario Base (bruto mensual)
* `li`: Límite inferior del rango en que cae `SB`
* `ls`: Límite superior del rango
* `E`: Excedente sobre el límite inferior
* `PE`: Porcentaje aplicable al excedente (tasa)
* `CF`: Cuota fija del rango
* `RE`: Retención sobre el excedente

### Salario neto (estimación `tax-mx`)

```
RIMSS = SB × 0.025
SN    = SB - ISR - RIMSS - O
TN    = SB - SN
```

* `RIMSS`: Retención por IMSS, **2.5% aprox.** (constante `IMSS = 0.025`)
* `O`: Otras retenciones fijas, **$50 MXN aprox.** (bomberos, etc.)
* `SN`: Salario neto (libre)
* `TN`: Total retenido

> Estas dos últimas son **estimaciones** de la librería, no cálculo oficial IMSS/SAT. Ver `04-referencia/02-conformidad.md`.

## Tablas de rangos (`tablas/retenciones.json` → `src/tablas.js` → `src/isr.js`)

Las tablas de retenciones viven como fuente de verdad en `tablas/retenciones.json` y se re-exportan vía `src/tablas.js` / `tablas/index.js` para permitir `import` sin `with`.

`tablas/retenciones.json`:

```json
{
  "resico": {
    "mensual": [
      {"ls": 25000.00, "tasa": 0.0100},
      {"ls": 50000.00, "tasa": 0.0110},
      // ...
    ],
    "anual": [
      {"ls": 300000.00, "tasa": 0.0100},
      // ...
    ]
  },
  "isr": [
    { "ls": 496.07, "CF": 0, "PE": 0.0192 },
    // ...
  ]
}
```

Uso:

```js
import tablas from 'tax-mx/tablas/retenciones.json' with { type: 'json' };
import tablas from 'tax-mx/tablas';
import { isr } from 'tax-mx/src/tablas.js';
import { tablas } from 'tax-mx';
```

En `src/isr.js`:

```js
import tablas from './tablas.js';
const tabla = tablas.isr;
```

Para ISR, `CF` y `PE` son por rango; `li` se derive como `tabla[i-1].ls + 0.01` (con `li = 0.01` para el primer rango). `ls = null` indica último rango sin límite superior.

Para RESICO, `tasa` es la tasa de aportación por rango.

## Flujo del algoritmo (src/isr.js)

1. **Validación:** `typeof salarioBase !== 'number'` y `SB < 0.01` lanzan `Error`.
2. **Búsqueda de rango:** `for` sobre `tabla`
   * `li = 0.01` si `i===0`, si no `tabla[i-1].ls + 0.01`
   * Si `rango.ls === null` → último rango, se usa directo.
   * Si `SB > li && SB <= rango.ls` → rango encontrado, `ajustarCfPeLs(CF, PE, ls)` y `break`.
3. **Cálculo:** `E = SB - li`, `RE = E * PE`, `RIMSS = SB * 0.025`, `SN = SB - CF - RE - RIMSS - 50`, `TN = SB - SN`.
4. **Salida:** si `imprimir` → `console.log` (y desglose si `desglosar`). Retorna objeto con `toFixed(2/4)`.

Complejidad `O(n)` con `n=11` (constante).

## Ejemplo trazado (SB = 15000)

* Rango: `li = 10298.36` (10298.35+0.01), `ls = 20770.29`, `CF=1090.61`, `PE=0.2136`
* `E = 15000 - 10298.36 = 4701.64`
* `RE = 4701.64 * 0.2136 = 1004.27`
* `RIMSS = 15000 * 0.025 = 375.00`
* `SN = 15000 - 1090.61 - 1004.27 - 375 - 50 = 12480.12`
* `TN = 2519.88`

Coincide con `calcularIsr(15000, true, true)`.

## Decisiones de implementación

* **Strings con toFixed:** se retorna `string` para preservar formato monetario y evitar errores de coma flotante en presentación. El consumidor puede hacer `Number(r.salarioNeto)` si necesita número.
* **Logs opcionales:** separados del cómputo para mantener pureza; `imprimir=false` por defecto.
* **Sin subsidio al empleo:** no se resta subsidio; a futuro se parametrizará.

## Mantenibilidad

* Para actualizar la tabla por nueva reforma: editar `tablas/retenciones.json` (fuente de verdad) y `src/tablas.js` la re-exporta; `src/isr.js` la consume como `tablas.isr`. Añadir test en `tests/`.
* Considerar extraer `IMSS` y `O` a parámetros opcionales en versiones futuras para no hardcodear.
