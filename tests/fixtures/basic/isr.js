import {calcularIsr} from '../../../src/index.js'

export function testIsr(salarioBase = 15000, desglosar = true, imprimir = true) {
    console.log('Prueba de cálculo de ISR');
    calcularIsr(salarioBase, desglosar, imprimir);
}