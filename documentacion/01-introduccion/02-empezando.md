## Requisitos

* **Node.js >= 18** (recomendado 20+). El paquete es ESM (`"type": "module"`).
* Gestor de paquetes: `npm`, `pnpm` o `yarn`.

## Instalación

```bash
npm install tax-mx
# o
pnpm add tax-mx
# o
yarn add tax-mx
```

Desde fuente:

```bash
git clone https://github.com/sadgabi20/tax-mx.git
cd tax-mx
npm install
```

## Uso mínimo (3 líneas)

```js
import { calcularIsr } from 'tax-mx';

const r = calcularIsr(15000);
console.log(r.salarioNeto);      // "12480.12"
console.log(r.totalRetenido);    // "2519.88"
```

Import alternativo:

```js
import { calcularIsr } from 'tax-mx/src/index.js';
```

## Scripts disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| `test` | `npm test` | Ejecuta `node --test "tests/**/*.test.js"` |
| `interactive` | `node tests/isr.test.js` | CLI con prompts (ver abajo) |

## CLI interactivo (pruebas manuales)

No es parte de la API pública, pero útil para probar rápido:

```bash
node tests/isr.test.js              # prompt: salario, imprimir, desglosar
node tests/isr.test.js 20000        # usa 20000 sin prompt por salario
echo 18000 | node tests/isr.test.js # no-TTY: usa 15000 por defecto
```

Comportamiento:

* Con TTY: pregunta salario (default `15000`), si imprimir (`S/n`) y si desglosar (`S/n`).
* Sin TTY (CI / pipe): no se cuelga; respeta `argv[2]` si es numérico, si no usa `15000`.
* Bajo `npm test`: no hace prompt, solo corre asserts.

## Qué devuelve

`calcularIsr` siempre devuelve el mismo objeto (strings con 2-4 decimales):

```js
{
  limiteInf: '10298.36',
  limiteSup: '20770.29',
  excedente: '4701.64',
  porcientoExcedente: '0.2136',
  retencionExcedente: '1004.27',
  porcientoIMSS: '0.0250',
  retencionIMSS: '375.00',
  cuotaFija: '1090.61',
  otrasRetenciones: '50.00',
  salarioNeto: '12480.12',
  totalRetenido: '2519.88'
}
```