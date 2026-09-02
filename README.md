## tax-mx

Calculadora de impuestos para México.

Actualizada según la última reforma a la LISR del 1 de abril del 2024.

La información proporcionada no toma en cuenta posibles estímulos fiscales o gravables extraordinarios.

## Algoritmos

El cálculo del ISR se basa en el **[artículo 96 de la LISR (página 130)](https://www.diputados.gob.mx/LeyesBiblio/pdf/LISR.pdf)**:

$$E = SB - li$$

$$RE = E \times PE$$

$$ISR = CF + RE$$

donde:
- $SB$: Salario Base
- $li$: Límite inferior del rango
- $E$: Excedente sobre el límite inferior
- $PE$: Porcentaje aplicable al excedente
- $CF$: Cuota fija del rango

### Salario Neto

$$RIMSS = SB \times 0.025$$

$$SN = SB - ISR - RIMSS - O$$

donde:
- $RIMSS$: Retención por IMSS (2.5% aprox.)
- $O$: Otras retenciones ($50 MXN aprox.)
- $SN$: Salario Neto (libre)

## A futuro

Se planea implementar otros regímenes físcales y utilidades conforme avance el proyecto.