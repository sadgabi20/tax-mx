import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { testIsr } from './fixtures/basic/isr.js';
import { calcularIsr } from '../src/index.js';

const isTestRun = process.execArgv.some(a => a.includes('--test'));

if (isTestRun) {
describe('calcularIsr', () => {
    test('calcula ISR para salario base 15000 sin lanzar errores', () => {
        const result = calcularIsr(15000, false, false);
        assert.ok(result);
        assert.equal(typeof result.salarioNeto, 'string');
        assert.equal(typeof result.totalRetenido, 'string');
    });

    test('valida que salario sea número', () => {
        assert.throws(() => calcularIsr('15000'), /Solo se pueden ingresar números/);
    });

    test('valida salario mínimo >= 0.01', () => {
        assert.throws(() => calcularIsr(0), /mayor o igual a 0.01/);
        assert.throws(() => calcularIsr(-100), /mayor o igual a 0.01/);
    });

    test('usa defaults correctos cuando se pasan booleanos', () => {
        const r1 = calcularIsr(15000);
        const r2 = calcularIsr(15000, false, false);
        assert.deepEqual(r1, r2);
    });

    test('testIsr fixture no lanza', () => {
        assert.doesNotThrow(() => testIsr(15000, false, false));
    });
});
}

async function iniciarTest() {
    if (!input.isTTY || !output.isTTY) {
        console.log('Entrada no interactiva detectada — no se puede promptar.');
        console.log('Use: node tests/isr.test.js <salario>  o ejecute en terminal interactiva.');

        const argSalario = process.argv[2];
        let salarioBase = 15000;
        if (argSalario && !argSalario.startsWith('--')) {
            if (!/^\d+(\.\d+)?$/.test(argSalario.trim())) {
                console.error('Solo se pueden ingresar números');
                return;
            }
            salarioBase = Number(argSalario.trim());
            console.log(`Usando salario base de argumento: ${salarioBase}`);
        } else {
            console.log('Ejecutando con valores por defecto (15000) sin prompt...');
        }

        testIsr(salarioBase, true, true);
        return;
    }

    const rl = readline.createInterface({ input, output });

    try {
        const argSalario = process.argv[2];
        let salarioInput;
        if (argSalario && !argSalario.startsWith('--')) {
            salarioInput = argSalario;
            console.log(`Usando salario base de argumento: ${salarioInput}`);
        } else {
            salarioInput = await rl.question('Ingrese un salario base (15000): ');
        }

        let salarioBase;
        if (salarioInput.trim() === '') salarioBase = 15000;
        else if (!/^\d+(\.\d+)?$/.test(salarioInput.trim())) throw new Error('Solo se pueden ingresar números');
        else salarioBase = Number(salarioInput.trim());

        let imprimir = await rl.question('¿Desea imprimir los logs de las pruebas? (S/n): ');
        imprimir = imprimir.trim().toLowerCase();
        const imprimirLogs = imprimir === '' || imprimir === 's' || imprimir === 'si' || imprimir === 'sí';

        let desglosar = await rl.question('¿Desea desglosar los logs de las pruebas? (S/n): ');
        desglosar = desglosar.trim().toLowerCase();
        const desglosarLogs = desglosar === '' || desglosar === 's' || desglosar === 'si' || desglosar === 'sí';

        testIsr(salarioBase, desglosarLogs, imprimirLogs);
    } catch (err) {
        console.error('Ocurrió un error durante la prueba de cálculo de ISR:', err.message);
    } finally {
        rl.close();
    }
}

let isMain = false;
try {
    if (typeof import.meta.main !== 'undefined') {
        isMain = import.meta.main;
    } else {
        const thisUrl = import.meta.url;
        const entryUrl = process.argv[1] ? pathToFileURL(process.argv[1]).href : '';
        isMain = thisUrl === entryUrl;
    }
} catch { /* ignore */ }

if (isMain && !isTestRun) {
    iniciarTest();
}
