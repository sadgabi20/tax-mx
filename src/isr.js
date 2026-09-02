const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');

/**
 * 
 * @param {number} salarioBase 
 * @param {boolean} desglosar 
 * @param {boolean} log 
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
export function main(salarioBase, desglosar = false, log = false) {
    const rl = readline.createInterface({ input, output });

    try {
        let SB = salarioBase;
        let desglosar = desglosar;

        if (!/^\d+(\.\d+)?$/.test(SB)) throw new Error('Solo se pueden ingresar números');

        SB = Number(SB);

        let li = 0;
        let PE = 0;
        let CF = 0;
        const IMSS = 0.025;
        const O = 50;

        function ajustarCFyPE(newCF, newPE) {
            PE = newPE;
            CF = newCF;
        }

        if (SB < 0.01) throw new Error('Solo se puede introducir un valor mayor o igual a 0.01');

        const tabla = [
            { ls: 496.07, CF: 0, PE: 0.0192 },
            { ls: 4210.41, CF: 9.52, PE: 0.0640 },
            { ls: 7399.42, CF: 247.24, PE: 0.1088 },
            { ls: 8601.50, CF: 694.21, PE: 0.1600 },
            { ls: 10298.35, CF: 786.54, PE: 0.1792 },
            { ls: 20770.29, CF: 1090.61, PE: 0.2136 },
            { ls: 32736.83, CF: 3327.42, PE: 0.2352 },
            { ls: 62500.00, CF: 6141.95, PE: 0.3000 },
            { ls: 83333.33, CF: 1570.90, PE: 0.3200 },
            { ls: 250000.00, CF: 21737.51, PE: 0.3400 },
            { ls: null, CF: 78404.23, PE: 0.3500 }
        ];

        for (let i = 0; i < tabla.length; i++) {
            const rango = tabla[i];

            if (i === 0) {
                li = 0.01;
            } else {
                li = tabla[i - 1].ls + 0.01;
            }

            if (!rango.ls) {
                ajustarCFyPE(rango.CF, rango.PE);
                break;
            }

            if (SB > li && SB <= rango.ls) {
                ajustarCFyPE(rango.CF, rango.PE);
                break;
            }
        }

        const E = SB - li;
        const RE = E * PE;
        const RIMSS = SB * IMSS;
        const SN = SB - CF - RE - RIMSS - O;

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

        console.log(`\nImpuestos retenidos: ${(SB - SN).toFixed(2)}`);
        console.log(`Salario neto (libre): ${SN.toFixed(2)}`);

        return { limiteInf, limiteSup, excedente, porcientoExcedente, retencionExcedente, porcientoIMSS, retencionIMSS, cuotaFija, otrasRetenciones, salarioNeto, totalRetenido }
    } catch (err) {
        throw new Error(err.message)
    } finally {
        rl.close();
    }
}