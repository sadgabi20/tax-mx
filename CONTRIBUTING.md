# Contribuir a `tax-mx`

`tax-mx` es una librería de Node orientada al cálculo de obligaciones y miscelánea fiscal en México.

## Involúcrate

Existen diferentes maneras de apoyar el desarrollo y mantenimiento de `tax-mx` además de solo escribir código:

- Utilizando `tax-mx`. Sigues las instrucciones proporcionadas en [[Empezando](documentacion/01-introduccion/02-empezando.md)]. ¿Algo no funciona como esperabas? Repórtalo abriendo un [issue](#reportando-nuevos-errores).
- Revisa los issues abiertos. Una buena forma de iniciar es buscar issues con la etiqueta **[good first issue](https://github.com/sadgabi20/tax-mx/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22)**. Proporciona soluciones, pregunta por aclaraciones o realiza sugerencias.
- Si encuentras un issue que te gustaría arreglar o implementar, abre una [pull request](#pull-requests).

### Triage de issues y pull requests

Una buena forma de contribuir al proyecto es ayudando a realizar el triage de issues y pull requests.

- Solicita aclaraciones si crees que el issue no provee los detalles necesarios para resolverlo
- Marca issues abandonados o que deberían ser cerrados
- Solicita planes de testeo y revisa código

## Bugs (errores)

`tax-mx` usa [GitHub Issues](https://github.com/sadgabi20/tax-mx/issues) para los errores públicos. Si planeas reportar un problema, revisa los issues por si alguien ya ha abierto un issue sobre este. Si estás seguro de que se trata de un nuevo bug no reportado, puedes generar un [reporte de error](#reportando-nuevos-errores).

Si ves algo que te gustaría ver implementado, crea una [solicitud de implementación](https://github.com/sadgabi20/tax-mx/issues/new?template=solicitar_implementación.yml).

### Reportando nuevos errores

Cuando [abras un issue](https://github.com/sadgabi20/tax-mx/issues/new/choose), siempre asegúrate de rellenar el formulario **¡Este paso es muy importante!** De no hacerlo, puede que tu issue no sea administrado en tiempo y forma. De ser así, no lo tomes personal; abre un nuevo issue una vez hayas conseguido toda la información necesaria para rellenar el issue.

- **Un issue, un bug:** Por favor reporta un solo error por cada issue.
- **Proporciona pasos para la reproducción:** Enlista todos los pasos necesarios para lograr la reproducción del error. La persona leyendo tu reporte de error debería ser capaz de reproducir el error con un esfuerzo mínimo.

## Pull requests

### Proponiendo un cambio

Si te gustaría solicitar una implementación o mejora pero aún no has pensado en abrir una pull request (PR), también puedes generar una issue usando la plantilla de [solicitud de implementación](https://github.com/sadgabi20/tax-mx/issues/new?template=solicitar_implementación.yml).

Si solo estás solucionando un error, puedes simplemente hacer una PR sin más, pero es recomendado que generes un issue detallando lo que estás arreglando. Esto es útil en caso de que no se acepten tus cambios pero se quiera hacer seguimiento del issue especificado.

PRs pequeñas son más fáciles de revisar y más probables de aprobar para merge (fusión).

### Creando una rama (branch)

Bifurca (fork) el [repositorio](https://github.com/sadgabi20/tax-mx) y crea una nueva rama basada en `main`.

### Pruebas

Un buen plan de pruebas contiene los comandos exactos que ejecutaste y sus salidas (outputs) y proporciona capturas de pantalla o vídeos si el PR cambia de UI.

- Si cambiaste de APIs, actualiza la documentación.

#### Escribiendo pruebas

Todas las pruebas se encuentran en la carpeta `tests/`.

#### Corriendo pruebas

Para correr pruebas, ejecuta `npm test`.

#### Convenciones de código

- `snake_case` para nombres de variables internas y métodos.
- `camelCase` para nombres de variables públicas y métodos.
- Documenta funciones públicas con JSDoc.

### Enviando tus PRs

Por favor asegúrate de cumplir con lo siguiente al enviar una PR:

1. Si aplica, describe tu **plan de pruebas** en la descripción de tu PR. Asegúrate de probar tus cambios.
2. Asegúrate de que tus pruebas pasan (`npm test`)

Todas las PRs deben ser abiertas en base a la rama `main`. Asegúrate de que tu PR hace una sola cosa; de no ser así, por favor divídela.

#### Cambios que rompen compatibilidad (breaking changes)

Al añadir un braking change, sigue este formato en tu PR:

```
### Nuevo braking change aquí

- **A quién afecta**:
- **Como migrar**:
- **Por qué hacer este breaking change**:
- **Severidad (número de personas afectadas x esfuerzo)**:
```

## Licencia

Al contribuir a `tax-mx`, accedes a que tus contribuciones serán usadas bajo su [licencia MIT](https://github.com/sadgabi20/tax-mx/blob/main/LICENSE).