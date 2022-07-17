let mapaCR;
let minLon, maxLon, minLat, maxLat, miAncho, miAlto;

let tablaDeDatos;
let lasEstaciones = [];

let misRadioBotones = [];
let nombreBotones = [];
let numButtons = 7;

let escena = 0;

function preload() {
    mapaCR = loadJSON("data/crSinIslaDelCoco.json");
    tablaDeDatos = loadTable('data/imagenesEstaciones.csv', 'csv', 'header');
    console.log(" ");
} // end of preload() -----------------------------------------------------------



function setup() {
    createCanvas(1600, 800);

    // CARGANDO EL MAPA DE CR  ----------------------
    console.log(" ");
    console.log("pais: " + mapaCR.country);
    console.log("cantidad de poligonos: " + mapaCR.poligonos.length);
    console.log("cantidad de puntos en el primer poligono" + mapaCR.poligonos[0].length);
    console.log("punto 3 del primer polígono: " + mapaCR.poligonos[0][3]);
    console.log(" ");

    minLon = 2000;
    maxLon = -2000;
    minLat = 2000;
    maxLat = -2000;

    for (let pol=0; pol < mapaCR.poligonos.length; pol++) {
        for (let pnt=0; pnt < mapaCR.poligonos[pol].length; pnt++) {
            let lon = mapaCR.poligonos[pol][pnt][0];
            let lat = mapaCR.poligonos[pol][pnt][1];

            if(lon < minLon) minLon = lon;
            if(lat < minLat) minLat = lat;
            if(lon > maxLon) maxLon = lon;
            if(lat > maxLat) maxLat = lat;
        }
    }
    miAncho = maxLon - minLon;
    miAlto = maxLat - minLat;

    console.log("minLon: " + minLon + "   maxLon: " + maxLon + "   minLat: " + minLat + "   maxLat: " + maxLat  );
    console.log("miAncho: " + miAncho + "   miAlto: " + miAlto);




    // CARGANDO DATOS  --------------------------------
    let i = 0;
    let estacionMientras;

    let currentName = "Nan";
    let previusName = "";

    // aquí se generan los objetos que contienen las estaciones
    for (let myRow of tablaDeDatos.rows) {
        currentName = myRow.get('nomEstacion');
        if (currentName !== previusName) {
            estacionMientras = new Estacion();
            estacionMientras.nombre = currentName;
            estacionMientras.numero = myRow.get('numEstacion');
            estacionMientras.region = myRow.get('region');
            estacionMientras.subRegion = myRow.get('subRegion');

            estacionMientras.latitud = myRow.get('latitud');
            estacionMientras.longitud = myRow.get('longitud');

            let pixelAhora = calculePixelesApartirDeCoordenadas (estacionMientras.longitud, estacionMientras.latitud);
            estacionMientras.miX = pixelAhora.x;
            estacionMientras.miY = pixelAhora.y;

            // the currentCountry is push in array
            lasEstaciones[i] = estacionMientras;
            i++;
        }
        previusName = currentName;
    }
    console.log("cantidad de estaciones:" + lasEstaciones.length );
    console.log(" ");


    // this loop is to fill the spaces of the years in each country
    for (let c = 0; c < lasEstaciones.length; c++) { // for all countries
        let nombreDeEstacionActual = lasEstaciones[c].nombre;
        let indiceDeFoto = 0;
        for (let myRow of tablaDeDatos.rows) { // if is the same country fill the year
            let nombreDeEstacionEnTabla = myRow.get('nomEstacion');
            if(nombreDeEstacionEnTabla===nombreDeEstacionActual){

                if(indiceDeFoto === 0){
                    let rutaDeImagen = "data/graficosEstaciones/" + nombreDeEstacionActual + "_dia.png";
                    lasEstaciones[c].imagenDia = loadImage(rutaDeImagen);
                    //console.log("# estación: " + myRow.get('numEstacion') +"   rutaDeImagen: "+ rutaDeImagen);
                    indiceDeFoto++;
                }

                if(indiceDeFoto === 1){
                    let nombreImagenHisto = "data/graficosEstaciones/" + nombreDeEstacionActual + "_histo.png";
                    lasEstaciones[c].imagenHisto = loadImage(nombreImagenHisto);
                    indiceDeFoto++;
                }

                if(indiceDeFoto === 2){
                    let nombreImagenHora = "data/graficosEstaciones/" + nombreDeEstacionActual + "_hora.png";
                    lasEstaciones[c].imagenHora = loadImage(nombreImagenHora);
                    indiceDeFoto++;
                }

                if(indiceDeFoto === 3){
                    let nombreImagenMes = "data/graficosEstaciones/" + nombreDeEstacionActual + "_mes.png";
                    lasEstaciones[c].imagenMes = loadImage(nombreImagenMes);
                    indiceDeFoto++;
                }

                if(indiceDeFoto === 4){
                    let nombreImagenRose = "data/graficosEstaciones/" + nombreDeEstacionActual + "_rose.png";
                    lasEstaciones[c].imagenRose = loadImage(nombreImagenRose);
                    indiceDeFoto++;
                }

                if(indiceDeFoto === 5){
                    let nombreImagenTotal = "data/graficosEstaciones/" + nombreDeEstacionActual + "_total.png";
                    lasEstaciones[c].imagenTotal = loadImage(nombreImagenTotal);
                    indiceDeFoto++;
                }
            } // cambio de estacion
        }
    }

    // BOTONES  --------------------------------
    nombreBotones =  ["varios","hora", "dia","mes","rose","total","histo"];
    let xInicial = 900;
    let tamano = 20;
    let distanciaEntreBotones = 50;
    for (let i = 0; i < numButtons; i++) {
        let x = xInicial + i * (tamano+distanciaEntreBotones);
        misRadioBotones[i] = new RadioButton(x, 30, tamano, color(255), color(255,255,0), i, misRadioBotones, nombreBotones[i]);
        //console.log("nombre actual:" + nombreBotones[i] );
    }

} // end of setup() -----------------------------------------------------------





function draw() {
    background(51);

    fill(255);
    rect(750,60,700,700);

    // dibujando el mapa de CR
    noFill();
    stroke(200,200,0);
    strokeWeight (1);
    for (let pol=0; pol < mapaCR.poligonos.length; pol++) {
        // dibujando cada poligono del pais
        beginShape();
        for (let pnt=0; pnt < mapaCR.poligonos[pol].length; pnt++) {
            let lon = mapaCR.poligonos[pol][pnt][0];
            let lat = mapaCR.poligonos[pol][pnt][1];
            let pixelAhora = calculePixelesApartirDeCoordenadas (lon, lat);
            vertex(pixelAhora.x, pixelAhora.y);
        }
        endShape(CLOSE);
    }


    //DIBUJANDO ESTACIONES ---------------------------
    for (let i = 0; i < lasEstaciones.length; i++) {
        lasEstaciones[i].display(escena);
    }


    // BOTONES  -------------------------------------
    for (let i = 0; i < misRadioBotones.length; i++) {
        misRadioBotones[i].display();
    }

    escena = 0;
    for (let i = 0; i < numButtons; i++) {
        if (misRadioBotones[i].checked) escena = i;
    }


    // MICELANEOS  -------------------------------------
    noStroke();
    fill (200);
    textSize(18);
    text("Características del Recurso Eólico de Costa RIca", 20,40);
    textSize(12);
    text("frameRate:   " + Math.round(frameRate()), 20, height-20);
    text("mouseX: " + mouseX + "  mouseY: " + mouseY, 20, height-40);
    text("escena: " + escena, 20, height-60);
} // end draw -----------------------------------------------------------



function mouseReleased(){
    for (let i = 0; i < lasEstaciones.length; i++) {
        lasEstaciones[i].releasedOverMe();
    }

    for (let i = 0; i < misRadioBotones.length; i++) {
        misRadioBotones[i].press(mouseX, mouseY);
    }
}






function calculePixelesApartirDeCoordenadas (lon, lat) {
    let lonPix = map (lon, -86, -83, 0, height*3/4) +30;
    let latPix = map (lat, 8, 12, height, 0) -75;
    return createVector(lonPix, latPix);
}