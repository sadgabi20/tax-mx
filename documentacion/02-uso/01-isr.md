## Firma

```js
import { calcularIsr } from 'tax-mx';

calcularIsr(salarioBase, desglosar = false, imprimir = false)
```

| Parámetro | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `salarioBase` | `number` | — | **Requerido.** Salario bruto mensual en MXN. Debe ser `>= 0.01` y de tipo `number` (no string). |
| `desglosar` | `boolean` | `false` | Si `true` e `imprimir=true`, imprime el desglose (límite, cuota, excedente, etc.). |
| `imprimir` | `boolean` | `false` | Si `true`, escribe en `console.log` el resultado. Si `false`, solo retorna el objeto (recomendado para uso programático). |

**Retorna** `Object` con 11 strings:

```ts
{
  limiteInf: string;          // "10298.36" - límite inferior del rango
  limiteSup: string;          // "20770.29" - límite superior ("" / "0.00" si último rango)
  excedente: string;           // "4701.64"  - SB - li
  porcientoExcedente: string;  // "0.2136"   - tasa del rango (4 decimales)
  retencionExcedente: string;  // "1004.27"  - E * PE
  porcientoIMSS: string;       // "0.0250"   - 2.5% fijo aprox.
  retencionIMSS: string;       // "375.00"   - SB * 0.025
  cuotaFija: string;           // "1090.61"  - cuota fija del rango
  otrasRetenciones: string;    // "50.00"    - fijo aprox. (bomberos etc.)
  salarioNeto: string;         // "12480.12" - SB - CF - RE - RIMSS - O
  totalRetenido: string;       // "2519.88"  - SB - SN
}
```

Todos con `toFixed(2)` excepto porcentajes con `toFixed(4)`.

## Ejemplos

### 1. Uso programático (recomendado)

```js
import { calcularIsr } from 'tax-mx';

const { salarioNeto, totalRetenido, cuotaFija } = calcularIsr(15000);
console.log(`Neto: ${salarioNeto}, Retenido: ${totalRetenido}`);
// Neto: 12480.12, Retenido: 2519.88
```

### 2. Con desglose en consola

```js
calcularIsr(15000, true, true);
// Límite gravable inferior: 10298.36
// Cuota fija: 1090.61
// Excedente sobre el límite inferior: $4701.64
// Porcentaje gravable sobre el excedente: 0.2136%
// Retención sobre el excedente: $1004.27
// Porcentaje por IMSS: aprox. 0.025%
// Retención por IMSS: $375.00
// Otras retenciones (bomberos, etc.): aprox. $50.00
//
// Impuestos retenidos: 2519.88
// Salario neto (libre): 12480.12
```

### 3. Validación y errores

```js
calcularIsr('15000'); // Error: Solo se pueden ingresar números al salario base para calcular el ISR
calcularIsr(0);       // Error: Solo se puede introducir un valor mayor o igual a 0.01 para calcular el ISR
calcularIsr(-100);    // mismo
```

Captura:

```js
try {
  calcularIsr(salario);
} catch (e) {
  console.error(e.message);
}
```

### 4. Lote

```js
const nominas = [8000, 15000, 30000, 80000];
const netos = nominas.map(s => ({
  bruto: s,
  neto: calcularIsr(s).salarioNeto
}));
```

## Notas importantes

* **No redondea la entrada:** pasa `Number` ya. Si vienes de `input` string, haz `Number(valor)` y valida `!isNaN`.
* **Tabla vigente:** la tabla interna corresponde a la tarifa mensual del Art. 96 LISR (ver `03-arquitectura/01-isr.md`). Si cambia la ley, debe actualizarse `src/isr.js`.
* **IMSS y otras retenciones son estimaciones fijas** (`0.025 * SB` y `50` MXN). No son cálculo oficial del IMSS ni incluyen subsidio al empleo.
* **Pureza:** `calcularIsr` no lee archivos ni hace fetch. `imprimir=true` es el único efecto secundario.