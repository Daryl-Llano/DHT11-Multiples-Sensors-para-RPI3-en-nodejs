# DHT11-Lectura de Multiples Sensores en RPI3 
(Beta 1)

- Código NODEJS que permite leer múltiples sensores de temperatura y humedad DHT11 o DHT22 en RPI3.
- Posee control de error de valores incorrectos enviados por sensor.
- Puede leer y mostrar datos en consola o
- Puede leer y enviar a la nube (dweet.io) para ser mostrado en web (freeboard.io)

#Uso
sudo nodejs appSensoresMultiples.js

#Problemas Detectados
- Sensores no entregan mediciones confiables el 100% de sus respuestas
- Ejemplos encontrados solo entregan conexión de 1 sensor en GPIO 4. El problema se genera al intentar leer más de un sensor con las librerías disponibles para el DHT11.

#Solución Propuesta
- Control de múltiples sensores DHT11 al mismo tiempo.
- Parámetro de control de lecturas que permite seleccionar la cantidad máxima de peticiones de información a los sensores.
- Parámetro de control de lecturas Válidas por sensor antes de aceptar medición.
- Variable LOG que permite mostrar los datos leídos por consola o permite  grabar o enviar la información a la nube.
- Permite generar una acción (cambiar valor a una variable) de acuerdo al control de T° y H recibidos en cada sensor

Nota: Este código controla 4 sensores DHT11 y fue testeado en una RPI3.

#Ejemplo de Salida 
ejemplo_Freeboard-appMultiplesSensores.png

#Referencias
1.- Para lectura de sensor DHT11 (single o múltiples): https://github.com/momenso/node-dht-sensor

2.- Para publicación en la nube: www.moisesandre.com.br/sensor
