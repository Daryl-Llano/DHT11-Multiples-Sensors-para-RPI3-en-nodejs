//****************************************************************************
//*** Lectura de Multiples Sensores DHT-11				   ***
//*** Utilizando las rutinas de lectura de "node-dht-sensor                ***
//*** (basado en el trabajo de https://github.com/momenso/node-dht-sensor) ***
//***									   *** 
//*** Desarrollado por: P. LLano en Mayo-2016                              ***
//****************************************************************************

var sensorLib = require("node-dht-sensor");
var dweetClient = require("node-dweetio");

// Create Dweet.io client
var dweetio = new dweetClient();

var muestraLog = true;
var vTotalSensores = 0;     //total de sensores a controlar

var TiempoActual = {
	Fecha: function(){
		var hoy = new Date();
		var dd = hoy.getDate();
		var MM = hoy.getMonth()+1;
		var yyyy = hoy.getFullYear();
		if(dd<10) {
    			dd='0'+dd
		} 

		if(MM<10) {
    			MM='0'+ MM
		} 
		return (dd + "/" + MM + "/" + yyyy);
	},
	Hora: function(){
		var hoy = new Date(); 
		HH = +hoy.getHours();
		mm = hoy.getMinutes();
		if(HH<10) {
                        HH='0'+HH
                }

                if(mm<10) {
                        mm='0'+ mm
                }

		return (HH + ":" + mm);
	},
	sleep: function(miliseconds) {
        	var currentTime = new Date().getTime();
        	while (currentTime + miliseconds >= new Date().getTime()) {
        	}
        	return
    	}
};
var sensor = {
    sensors: [ {name: "Sensor 1", type: 11, pin: 4, Leido:0, Ciclos:0, TempAct:0, HumAct:0, TempFinal:0, HumFinal:0}, 
		{name: "Sensor 2", type: 11, pin: 5, Leido:0, Ciclos:0, TempAct:0, HumAct:0, TempFinal:0, HumFinal:0},
		{name: "Sensor 3", type: 11, pin: 6, Leido:0, Ciclos:0, TempAct:0, HumAct:0, TempFinal:0, HumFinal:0},
		{name: "Sensor 4", type: 11, pin: 7, Leido:0, Ciclos:0, TempAct:0, HumAct:0, TempFinal:0, HumFinal:0},
	     ],
    initialize: function () {
	var vInitialize = "0" 
        console.log("Inicializando Sensores"); 

	for (var a in this.sensors) {

if (muestraLog) {
		console.log("Inicializando " + this.sensors[a].name + "(n° " + a + ")");
}
        	if (sensorLib.initialize(this.sensors[a].type, this.sensors[a].pin) !=  true) {
			vInitialize = vInitialize + this.sensors[a].name + ".  ";
		} else {
			vTotalSensores +=1;
		}
	};
	return vInitialize;
    },
    read: function() {
	var vLecturasValidas = 1;   //validaciones de lecturas correctas que deseas obtener
	var vMaxLecturas = 25;	   //numero de ciclos de lectura m�ximos que deseas hacer (evitar loop eterno en caso de error de sensor)

if (muestraLog) {
                console.log("vLecturasValidas: " + vLecturasValidas + ", vMaxLecturas:" + vMaxLecturas);
}

	for (var i=0; i < vMaxLecturas; i++) 
	{
           for (var a in this.sensors) 
	   {

if (muestraLog) {
                console.log("Lectura: " + (i+1) + ", Sensor:" + a);
}

		if ((this.sensors[a].Leido==0) || (this.sensors[a].Leido==1 && this.sensors[a].Ciclos < vLecturasValidas)){
			//*** mientras no tengas la cantidad de lecturas válidas del sensor - lee datos ***

			if (sensorLib.initialize(this.sensors[a].type, this.sensors[a].pin) != true) {
                        	vInitialize = vInitialize + vSensorName + ". ";
                	}

                	var b = sensorLib.readSpec(this.sensors[a].type, this.sensors[a].pin);
                	var vSensorType = this.sensors[a].type;
                	var vSensorName = this.sensors[a].name;
                	var vSensorPin = this.sensors[a].Pin

			if (this.sensors[a].Ciclos < vLecturasValidas) {
                       		this.sensors[a].TempAct = b.temperature.toFixed(0);
                       		this.sensors[a].HumAct = b.humidity.toFixed(0);
				if (b.isValid && (b.errors == 0)) {
					//*** Validación primaria enviada por sensor         ***
					//*** si sensor indica que la lectura no posee error ***

					if (((this.sensors[a].TempFinal - this.sensors[a].TempAct) <= 0) && (this.sensors[a].HumAct <= 100)) {
						//*** Validacion secundaria				    ***
						//*** si es primera lectura válida y si la humedad es <=100 ***
                        			this.sensors[a].Leido  = 1;
						this.sensors[a].Ciclos += 1;
                               			this.sensors[a].TempFinal = this.sensors[a].TempAct;
						this.sensors[a].HumFinal = this.sensors[a].HumAct;
 						
						if (a == 0){  //si sensor leido es Sensor 1 *** por ejem.: living ***
	               					if (this.sensors[a].TempFinal >= 25) {
               	                				var EXT2 = 1
                       					} else {
                               					var EXT2 = 0
							}
                       				}
						else if (a == 1){  //si sensor leído es Sensor 2 *** por ejem.: antejardin ***
               		                        	if (this.sensors[a].TempFinal >= 23) {
                               					var EXT1 = 1
                                               		} else {
                                                       		var EXT1 = 0
                                               		}
                                       		}
                                        	else if (a == 2){  //si sensor leído es sensor 3 *** por ejem.: baño ***
                                                	if ((this.sensors[a].HumFinal >= 73) || (this.sensors[a].TempFinal > (2 + this.sensors[0].TempFinal))) {
                                                        	var EXT3 = 1
                                                	} else {
                                                        	var EXT3 = 0
                                                	}
                                        	}
					 	else if (a == 3){  //si sensor leído es Sensor 4 *** por ejem.: dormitorio ***
                                                	if (this.sensors[a].TempFinal >= 27) {
                                                        	var EXT4 = 1
                                                	} else {
                                                        	var EXT4 = 0
                                                	}
                                        	}
                              		}
				}
               		}
		}
		if (a == (vTotalSensores -1)) {
			//*** si se ha leído todos los sensores ***

			if (( this.sensors[0].Leido + this.sensors[1].Leido + this.sensors[2].Leido + this.sensors[3].Leido)  == 4){
				//*** si tiene al menos 1 lectura positiva en cada uno de los sensores.    ***
				//*** si no ingresa, al menos 1 sensor ha entregado solo lecturas erroneas ***

				if (((this.sensors[0].Ciclos + this.sensors[1].Ciclos + this.sensors[2].Ciclos + this.sensors[3].Ciclos)  >= (vLecturasValidas * 4)) || (i == vMaxLecturas -1)) {
					//*** Envia la información cuando:                                                    ***
					//*** 1.- Las lecturas han cumplido con el mínimo establecido de ciclos válidos       ***
					//*** 2.- No se cumple con el mínimo, pero, se alcanza el total de ciclos de lectura  ***
					//***     con al menos 1 lectura correcta por sensor				      ***

					if (muestraLog) {
						console.log("Envio: " + TiempoActual.Fecha() + " " + TiempoActual.Hora())
						console.log("intento: " + (i+1) + " / Ciclos Validos  S1: " + this.sensors[0].Ciclos + 
								" - S2: " + this.sensors[1].Ciclos +
								"  - S3: " + this.sensors[2].Ciclos +
								"  - S4: " + this.sensors[3].Ciclos);

		        	      		console.log("Valores: " + 
                			      		"TS1: " + this.sensors[0].TempFinal  + "C, " +
                      					"HS1: " + this.sensors[0].HumFinal + "%  " +
                      					"TS2: " + this.sensors[1].TempFinal  + "C, " +
                      					"HS2: " + this.sensors[1].HumFinal + "%  " +
                      					"TS3: " + this.sensors[2].TempFinal  + "C, " +
               	       					"HS3: " + this.sensors[2].HumFinal + "%  " +
	                      				"TS4: " + this.sensors[3].TempFinal  + "C, " +
        	              				"HS4: " + this.sensors[3].HumFinal + "%  " +
                	      			"EXT1: " + EXT1 + ", " +
                      				"EXT2: " + EXT2 + ", " +
                      				"EXT3: " + EXT3 + ", " +
                      				"EXT4: " + EXT4 );
					} else {
						//*** envio o grabo información resultante ***
						//*** en este ejemplo se envian datos a dweet.io para despues ser mostrados en freeboard.io ***

     						dweetio.dweet({tempS1: this.sensors[0].TempFinal, humS1: this.sensors[0].HumFinal, 
								tempS2: this.sensors[1].TempFinal, humS2: this.sensors[1].HumFinal, 
								tempS3: this.sensors[2].TempFinal, humS3: this.sensors[2].HumFinal, 
								tempS4: this.sensors[3].TempFinal, humS4: this.sensors[3].HumFinal, 
								Ext1: EXT1, Ext2: EXT2, Ext3: EXT3, Ext4: EXT4,
								FechaEnvio: TiempoActual.Fecha(), HoraEnvio: TiempoActual.Hora()},
								function(err, dweet){
								//console.log(dweet.thing); // The generated name
   		    						//console.log(dweet.content); // The content of the dweet
    		    						//console.log(dweet.created); // The create date of the dweet
								console.log("dweet enviado: " + TiempoActual.Fecha() + " " + TiempoActual.Hora());
								});
					}
					i = vMaxLecturas + 1;  //*** fuerza salida de ciclo de lecturas
		    		};
			};
		};
	   }
	}
    }
};

var vInitializeSensor = sensor.initialize()
var v1seg = 1000;
var v1min = 1000 * 60;

	if (vInitializeSensor != "0") {
		console.warn('Falla al inicializar ' + vInitializeSensor);
	} else {
        for (var v=0; v < 1; v++){
		var tInicio_Medicion = TiempoActual.Fecha() + " " + TiempoActual.Hora()
		console.log("Iniciando Lecturas: " + tInicio_Medicion);
		sensor.read();
// 		TiempoActual.sleep(v1min);
		
	}
}
