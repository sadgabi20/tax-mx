## ¿Es `tax-mx` oficial del SAT?

No. Es una librería comunitaria MIT que implementa la fórmula del artículo 96 LISR. No tiene afiliación con el SAT ni garantiza validez legal para declaraciones. Úsala como **estimación** y valida con un contador.

## ¿Qué salario debo pasar? ¿Bruto o neto? ¿Mensual?

`salarioBase` es el **salario bruto mensual** (antes de retenciones), en MXN, como `number`. No pases strings (`"15000"` lanza error) ni valores diarios. Para quincena, pasa el mensual y divide después si necesitas.

## ¿Por qué devuelve strings y no numbers?

Para preservar formato monetario (`toFixed(2)`) y evitar sorpresas de punto flotante en UI. Convierte con `Number(r.salarioNeto)` si necesitas operar.

```js
const neto = Number(calcularIsr(15000).salarioNeto); // 12480.12
```

## ¿Incluye subsidio al empleo?

No en v0.0.1. El cálculo es `ISR = CF + RE` sin subsidio. Está en planeación.

## ¿Por qué IMSS es 2.5% y $50 fijos?

Son **estimaciones** simplificadas de la librería (`RIMSS = SB * 0.025`, `O = 50`). El IMSS real depende de UMA, prima de riesgo, etc. Ver [02-conformidad.md](./02-conformidad.md). A futuro se parametrizarán.

## ¿Cómo manejo decimales y redondeo?

La librería usa `toFixed(2)` para dinero y `toFixed(4)` para tasas. Si necesitas otro redondeo, hazlo sobre el `Number` retornado.

## Me da `Solo se pueden ingresar números`

Pasaste string, `undefined` o `NaN`. Asegúrate:

```js
const sb = Number(input.trim());
if (isNaN(sb)) throw new Error('...');
calcularIsr(sb);
```

## ¿Funciona en frontend (navegador)?

Sí, es ESM puro sin `fs` ni `readline` en la librería. El `readline` solo está en `tests/isr.test.js` para CLI interactivo.

```js
import { calcularIsr } from 'tax-mx';
```

Con bundlers (Vite, Next) funciona directo. No requiere polyfills.

## ¿Cómo reporto un error de cálculo?

Abre un issue con: salario usado, resultado obtenido, resultado esperado (fuente SAT o tabla DOF), y versión de `tax-mx`. Si es reforma nueva, indica DOF y fecha.

## ¿Puedo usarlo para nómina real?

Con precaución y validación profesional. Recomendado solo para **estimaciones y simuladores** hasta que cubra subsidio y se audite contra casos oficiales SAT.

## ¿Dónde está la documentación completa?

Ruta sugerida: `¿Qué es? → ¿Cómo lo uso? → ¿Cómo funciona? → ¿Ayuda?`

* `01-introduccion/01-generalidades.md`
* `01-introduccion/02-empezando.md`
* `02-uso/01-isr.md`
* `03-arquitectura/01-isr.md`
* Esta FAQ, conformidad y guía de pruebas en `04-referencia/`.
