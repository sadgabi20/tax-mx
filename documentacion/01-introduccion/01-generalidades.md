## ¿Qué es `tax-mx`?

`tax-mx` es una **calculadora de impuestos para México** distribuida como librería ESM para Node.js (tipo: `module`). Provee funciones puras que, dado un salario base, devuelven el cálculo de retenciones conforme a la legislación fiscal vigente.

Estado actual **v0.0.1**: enfoque inicial en **ISR para personas físicas (sueldos y salarios)** bajo el **artículo 96 LISR**. Diseñada para ser pequeña, sin dependencias y auditable.

> Actualizada según la última reforma a la LISR del **1 de abril de 2024**.

## ¿Para qué sirve?

* **Aplicaciones de nómina / RRHH:** estimar salario neto a partir de salario bruto.
* **Simuladores y calculadoras:** ofrecer al usuario final una proyección rápida de retenciones.
* **Backend / scripts:** automatizar cálculos en lote sin depender de servicios externos.
* **Educación y auditoría:** entender cómo se aplica la tabla de tarifas del ISR paso a paso.

## ¿Para qué *no* sirve?

* No es asesoría fiscal ni sustituye a un contador. No contempla estímulos fiscales ni gravables extraordinarios.
* No cubre todos los regímenes (por ahora solo sueldos). Ver [A futuro](#a-futuro).
* No hace timbrado, no genera CFDI ni interactúa con el SAT.

## Principios de diseño

* **Transparencia:** algoritmos documentados y trazables a la fuente legal (ver `03-arquitectura/01-isr.md`).
* **Pureza:** `calcularIsr()` es una función pura — mismos inputs, mismos outputs, sin I/O salvo `imprimir` opcional.
* **Sin dependencias:** solo Node.js estándar. Instalación mínima.
* **ESM moderno:** `import { calcularIsr } from 'tax-mx'`.

## Estado del proyecto

| Área | Estado |
|------|--------|
| ISR sueldos y salarios (Art. 96) | ✅ Implementado |
| IMSS (2.5% aprox.) y otras retenciones ($50 MXN) | ✅ Estimación fija incluida |
| Otros regímenes, anual, subsidio al empleo | 🔜 A futuro |

## A futuro

Conforme avance el proyecto se planea implementar otros regímenes fiscales y utilidades (cálculo anual, subsidio al empleo, tablas históricas, ISR por honorarios, RESICO, etc.). Las contribuciones son bienvenidas — ver `04-referencia/03-pruebas-y-desarrollo.md`.