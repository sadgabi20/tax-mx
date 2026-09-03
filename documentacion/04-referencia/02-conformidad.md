## Alcance

`tax-mx` v0.0.1 implementa **exclusivamente** la tarifa del **artículo 96 LISR** para retenciones provisionales mensuales de ISR por sueldos y salarios, conforme a la reforma del **1 de abril de 2024**.

Fuente primaria:

* **LISR, Art. 96, Tarifa mensual** — PDF oficial Cámara de Diputados, p. 130: https://www.diputados.gob.mx/LeyesBiblio/pdf/LISR.pdf
* Debe contrastarse con el **Anexo 8 de la Resolución Miscelánea Fiscal** y tablas publicadas en el DOF para el ejercicio vigente.

## Qué sí cumple

* Fórmula `ISR = CF + (SB - li) * PE` aplicada por rango.
* Tabla de 11 rangos con `ls`, `CF`, `PE` vigentes a 2024-04-01 (ver `src/isr.js`).
* Validación de entrada `SB >= 0.01`.

## Qué no cumple / limitaciones (importante)

* **Sin estímulos fiscales ni gravables extraordinarios.** La propia librería advierte: no contempla estímulos. No incluye subsidio al empleo (vigente hasta 2024 y reformas posteriores), ni ajustes por ISR anual.
* **IMSS 2.5% y Otras retenciones $50 MXN son estimaciones fijas de la librería**, no cálculo oficial IMSS (que usa UMA, cuotas obrero-patronales, prima de riesgo, etc.). Solo sirven para aproximar salario neto en simuladores.
* **Solo sueldos y salarios.** No cubre honorarios, RESICO, arrendamiento, actividad empresarial, dividendos, etc.
* **Solo cálculo mensual provisional.** No hace cálculo anual ni ajuste de cierre.
* **Sin actualización automática.** Si el SAT publica nueva tarifa, la librería queda desactualizada hasta release manual.

## Recomendaciones de uso responsable

1. **Validación cruzada:** compara resultados contra el calculador del SAT o tablas DOF antes de uso en producción.
2. **Aviso al usuario:** muestra disclaimer en UI que es estimación.
3. **Auditoría:** para nómina real, que un contador valide el caso.
4. **Versionado:** fija la versión de `tax-mx` en `package.json` y documenta con qué tarifa fue calculada la nómina (ej. `tax-mx@0.0.1 — LISR 2024-04-01`).

## Roadmap de conformidad

* [ ] Parametrizar `IMSS` y `O` o eliminarlos del core y dejar solo ISR puro.
* [ ] Añadir subsidio al empleo (tabla vigente).
* [ ] Tablas históricas por año y selector de ejercicio.
* [ ] Tests contra casos oficiales SAT publicados.
* [ ] Generar `CHANGELOG` con referencia DOF por cada cambio de tabla.

## Deslindamiento de responsabilidades

> La información proporcionada no toma en cuenta posibles estímulos fiscales o gravables extraordinarios. Esta librería se distribuye **AS IS** bajo licencia MIT sin garantía. No constituye asesoría fiscal. El usuario es responsable de verificar conformidad con la legislación vigente.

## Cómo contribuir a conformidad

Si detectas desactualización o errata, abre PR o issue con fuente DOF y link, y añade caso de prueba en `tests/`.

