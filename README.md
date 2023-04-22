# TDD: Kata Word Wrap

>**NOTA**: Kata realizada en el curso [Testing Sostenible con TypeScript](https://curso.testingsostenible.com/).

## Enunciado

 Kata propuesta por Robert C. Martin para trabajar con la prioridad de la premisa de transformación es la kata "word wrap". 
 Se trata, básicamente, de desarrollar el algoritmo que implementan muchos editores de texto como Notepad ++ o gedit, 
 donde las líneas de texto que no caben en el ancho de la ventana se parten en más líneas más cortas para que el texto pueda leerse en el mismo ancho. 

 El objetivo es ir desarrollando con TDD y aplicando la premisa de prioridad de transformación sin ser estrictos en los pasos pero sí en el orden. 

 Desarrollar la función _wordWrap_ que consta de dos parámetros: el primero, el texto, y el segundo, el ancho de columna. 
 
 ### Reflexión sobre la lista de ejemplos previos al desarrollo
 
 En el primer ejemplo, la función recibe un texto corto menor que el ancho de columna, por lo tanto, no necesita añadir un salto de línea. 
 El siguiente, es un texto que debemos partir una vez, luego tenemos una palabra más larga que se debe partir más veces. 
 Otros ejemplos más complejos en los que los espacios tienen preferencia sobre el ancho de columna. Por ejemplo, si tenemos un espacio en la posición 3 y una columna en la posición 4, partiremos por ese espacio. 
 Por último, manejaremos los casos especiales: cuando recibimos un texto nulo la función debe devolver un texto vacío y en caso de recibir una columna con un número negativo debe lanzar una excepción, ya que no están permitidas tamaños de columnas negativas.

- wordWrap('',5) ⇒ ''
- wordWrap('hello',5) ⇒ 'hello'
- wordWrap('longword',4) ⇒ 'long\nword'
- wordWrap('reallylongword',4) ⇒ 'real\nlylo\nngwo\nrd'
- wordWrap('abc def',4) ⇒ 'abc\ndef' 
- wordWrap('abc def ghi',4) ⇒ 'abc\ndef\nghi'
- wordWrap(' abcdf',4) ⇒ '\nabcd\nf'
- wordWrap(null,5) ⇒ ''
- wordWrap('hello',-5) ⇒ throw exception

## Principio de prioridad de transformación por Robert C. Martin

Pasos para conseguir la generalización de un código que soluciona un problema usando TDD:

1.  **{} ⇒ nil**: de no haber código a devolver nulo.
2.  **nil ⇒ constant**: de nulo a devolver un valor literal.
3.  **constant ⇒ constant+**: de un valor literal simple a uno más complejo.
4.  **constant ⇒ scalar**: de un valor literal a una variable.
5.  **statement ⇒ statements**: añadir más líneas de código sin condicionales.
6.  **unconditional ⇒ if**: introducir un condicional
7.  **scalar ⇒ array**: de variable simple a colección.
8.  **array ⇒ container**: de colección a contenedor.
9.  **statement ⇒ recursion**: introducir recursión.
10. **if ⇒ while**: convertir condicional en bucle.
11. **expression ⇒ function**: reemplazar expresión con llamada a función.
12. **variable ⇒ assignment**: mutar el valor de una variable.

## Preparación entorno (Typescript + Jest):

1.- Clonar la plantilla only-typescript

	- https://github.com/softwarecrafters-io/only-typescript.git

2.- Instalar dependicias npm

	- npm install

2.- Instalar jest

	- npm i -D jest ts-jest @types/jest

3.- Configurar jest

	- npx ts-jest config:init

4.- Añadir configuración de Jest (cobertura de tests)
        
	verbose: true,
    collectCoverage: true,
    coverageDirectory: "./coverage",
    coverageThreshold: {
        global:{
          statements: 50,
        branches: 50,
        functions: 50,
        lines: 50
        }
    } 

5.- Añadir configuración al fichero de npm para lanzar jest

    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
