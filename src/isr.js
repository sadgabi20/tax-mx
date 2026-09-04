import tablas from './tablas.js';

/**
 * 
 * @param {number} salarioBase 
 * @param {boolean} desglosar 
 * @param {boolean} imprimir 
 * @returns {{
 * limiteInf: number,
 * limiteSup: number,
 * excedente: number,
 * porcientoExcedente: number,
 * retencionExcedente: number,
 * porcientoIMSS: number,
 * retencionIMSS: number,
 * cuotaFija: number,
 * otrasRetenciones: number,
 * salarioNeto: number,
 * totalRetenido: number
 * }}
 */
export function calcularIsr(salarioBase, desglosar = false, imprimir = false) {
    try {
        let SB = salarioBase;

        if (typeof salarioBase != 'number') throw new Error('Solo se pueden ingresar números al salario base para calcular el ISR');

        let li = 0;
        let ls = 0;
        let PE = 0;
        let CF = 0;
        const IMSS = 0.025;
        const O = 50;

        function ajustarCfPeLs(nuevoCF, nuevoPE, nuevoLs) {
            PE = nuevoPE;
            CF = nuevoCF;
            ls = nuevoLs;
        }

        if (SB < 0.01) throw new Error('Solo se puede introducir un valor mayor o igual a 0.01 para calcular el ISR');

        const tabla = tablas.isr;

        for (let i = 0; i < tabla.length; i++) {
            const rango = tabla[i];

            if (i === 0) {
                li = 0.01;
            } else {
                li = tabla[i - 1].ls + 0.01;
            }

            if (!rango.ls) {
                ajustarCfPeLs(rango.CF, rango.PE, rango.ls);
                break;
            }

            if (SB > li && SB <= rango.ls) {
                ajustarCfPeLs(rango.CF, rango.PE, rango.ls);
                break;
            }
        }

        const E = SB - li;
        const RE = E * PE;
        const RIMSS = SB * IMSS;
        const SN = SB - CF - RE - RIMSS - O;
        const TN = SB - SN;

        if (imprimir) {
            if (desglosar) {
                console.log(`Límite gravable inferior: ${li.toFixed(2)}`);
                console.log(`Cuota fija: ${CF.toFixed(2)}`);
                console.log(`Excedente sobre el límite inferior: $${E.toFixed(2)}`);
                console.log(`Porcentaje gravable sobre el excedente: ${PE}%`);
                console.log(`Retención sobre el excedente: $${RE.toFixed(2)}`);
                console.log(`Porcentaje por IMSS: aprox. ${IMSS}%`);
                console.log(`Retención por IMSS: $${RIMSS.toFixed(2)}`);
                console.log(`Otras retenciones (bomberos, etc.): aprox. $${O.toFixed(2)}`);
            }

            console.log(`\nImpuestos retenidos: ${(TN).toFixed(2)}`);
            console.log(`Salario neto (libre): ${SN.toFixed(2)}`);
        }

        return {
            limiteInf: li.toFixed(2),
            limiteSup: ls.toFixed(2),
            excedente: E.toFixed(2),
            porcientoExcedente: PE.toFixed(4),
            retencionExcedente: RE.toFixed(2),
            porcientoIMSS: IMSS.toFixed(4),
            retencionIMSS: RIMSS.toFixed(2),
            cuotaFija: CF.toFixed(2),
            otrasRetenciones: O.toFixed(2),
            salarioNeto: SN.toFixed(2),
            totalRetenido: TN.toFixed(2)
        }
    } catch (err) {
        throw new Error(err.message)
    }
}