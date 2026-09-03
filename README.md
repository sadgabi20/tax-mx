# tax-mx

Calculadora de impuestos para México.

Actualizada según la última reforma a la LISR del 1 de abril del 2024. ESM, sin dependencias.

> La información proporcionada no toma en cuenta posibles estímulos fiscales o gravables extraordinarios.

## Instalación

```bash
npm install tax-mx
```

## Uso rápido

```js
import { calcularIsr } from 'tax-mx';

const { salarioNeto, totalRetenido } = calcularIsr(15000);
console.log(salarioNeto);    // "12480.12"
console.log(totalRetenido);  // "2519.88"
```

## Scripts

```bash
npm test                  # node --test "tests/**/*.test.js"
node tests/isr.test.js    # CLI interactivo (prompt) o `node tests/isr.test.js 20000`
```

## Desarrollo

Se planea implementar otros regímenes fiscales y utilidades conforme avance el proyecto.

## Licencia

MIT — ver [LICENSE](LICENSE).
