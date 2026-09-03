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

## Tabla de rangos (src/isr.js)

```js
const tabla = [
  { ls: 496.07,    CF: 0,        PE: 0.0192 },
  { ls: 4210.41,   CF: 9.52,     PE: 0.0640 },
  { ls: 7399.42,   CF: 247.24,   PE: 0.1088 },
  { ls: 8601.50,   CF: 694.21,   PE: 0.1600 },
  { ls: 10298.35,  CF: 786.54,   PE: 0.1792 },
  { ls: 20770.29,  CF: 1090.61,  PE: 0.2136 },
  { ls: 32736.83,  CF: 3327.42,  PE: 0.2352 },
  { ls: 62500.00,  CF: 6141.95,  PE: 0.3000 },
  { ls: 83333.33,  CF: 15070.90,  PE: 0.3200 },
  { ls: 250000.00, CF: 21737.51, PE: 0.3400 },
  { ls: null,      CF: 78404.23, PE: 0.3500 },
];
```

`CF` y `PE` son por rango; `li` se derive como `tabla[i-1].ls + 0.01` (con `li = 0.01` para el primer rango). `ls = null` indica último rango sin tope.

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

* Para actualizar la tabla por nueva reforma: editar `const tabla` en `src/isr.js` y añadir test en `tests/`.
* Considerar extraer `IMSS` y `O` a parámetros opcionales en versiones futuras para no hardcodear.
