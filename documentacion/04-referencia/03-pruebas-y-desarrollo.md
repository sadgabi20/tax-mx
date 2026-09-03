## Suite de pruebas

Framework: **Node.js nativo** (`node:test`, `node:assert/strict`), sin dependencias externas.

### Estructura

```
tests/
  isr.test.js              # suite principal + CLI interactivo
  fixtures/basic/isr.js    # helper testIsr(salario, desglosar, imprimir)
src/
  isr.js                   # calcularIsr()
  index.js                 # re-export
```

### Comandos

```bash
npm test                              # node --test "tests/**/*.test.js"
node --test "tests/**/*.test.js"      # directo
node --test --watch "tests/**/*.test.js" # watch (Node 20+)
```

Los tests solo se registran cuando `process.execArgv` contiene `--test` (evita mezclar salida de `node:test` con el CLI interactivo).

### Tests actuales (`tests/isr.test.js`)

* Calcula ISR para 15000 sin lanzar errores y verifica tipos `string`.
* Valida que salario sea `number` (rechaza string).
* Valida `>= 0.01` (rechaza 0 y negativos).
* Verifica defaults `calcularIsr(15000)` === `calcularIsr(15000,false,false)`.
* `testIsr` no lanza.

### CLI interactivo (no es test automatizado)

```bash
node tests/isr.test.js              # prompt TTY: salario, imprimir (S/n), desglosar (S/n)
node tests/isr.test.js 20000        # usa 20000 sin prompt por salario (aun sin TTY)
```

* Con TTY: `readline/promises` con `question()`. Valida `^\d+(\.\d+)?$`, default 15000 si vacío, parsea `S/s/si/sí` como true.
* Sin TTY (CI, pipe, opencode): no se cuelga; respeta `argv[2]` si es numérico, si no fallback 15000 con mensaje.
* Bajo `npm test`: no hace prompt (`isTestRun` detectado).

## Desarrollo local

```bash
git clone https://github.com/sadgabi20/tax-mx.git
cd tax-mx
npm install
npm test
node tests/isr.test.js 15000
```

## Guía para contribuir

1. **Nueva tabla / reforma:** actualiza `const tabla` en `src/isr.js`, documenta fuente DOF en `documentacion/03-arquitectura/01-isr.md` y `04-referencia/02-conformidad.md`, añade test con valor esperado.
2. **Nuevo impuesto / régimen:** crea `src/<impuesto>.js`, exporta en `src/index.js`, añade suite `tests/<impuesto>.test.js`.
3. **Convenciones:** ESM, `export function`, JSDoc, sin dependencias, mensajes de error en español (consistente con actual).
4. **Commits:** mensajes concisos en español o inglés, referencia a issue si aplica.
5. **No romper `imprimir=false` por defecto:** los cálculos puros no deben loguear.

## Debugging

```bash
node --test --test-reporter=spec "tests/**/*.test.js"  # reporter detallado
node --inspect --test "tests/**/*.test.js"              # inspector
```

## Publicación

* `.npmignore` excluye `tests/` y `.git*`.
* `package.json` `exports` expone `tax-mx` y `tax-mx/src`.
* Antes de `npm publish`: `npm test`, actualizar `CHANGELOG` y `documentacion/`.