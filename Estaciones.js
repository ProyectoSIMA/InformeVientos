class Estacion {
    constructor ( ){
        this.nombre = "NaN";
        this.numero = 0;
        this.region = "NaN";
        this.subRegion = "NaN";
        this.latitud = 0;
        this.longitud = 0;
        this.miX = 0;
        this.miY = 0;

        this.imagenDia;
        this.imagenHisto;
        this.imagenHora;
        this.imagenMes;
        this.imagenRose;
        this.imagenTotal;

        this.estaEncima = false;
        this.seleccionada = false;
        this.radio = 10;
    }


    display (escena) {
        let distancia = dist(mouseX, mouseY, this.miX, this.miY);
        this.estaEncima = distancia < this.radio;

        noStroke();
        if (this.estaEncima) fill(200, 100,100);
        else  fill(200);

        ellipse(this.miX, this.miY, this.radio, this.radio);

        if (this.estaEncima) {
            fill (200);
            text(this.nombre, this.miX, this.miY -30);
            text(this.subRegion, this.miX, this.miY -15);
            //["varios","hora", "dia","mes","rose","total","histo"];
            switch (escena) {
                case 0:
                    image(this.imagenDia, 750, 90, 350,350);
                    image(this.imagenHisto, 1100, 90, 350,350);
                    image(this.imagenRose, 750, 410, 350,250);  // 605,454
                    image(this.imagenTotal, 1100, 410, 350,350);
                    break;
                case 1:
                    image(this.imagenHora, 750, 90, 700,700);
                    break;
                case 2:
                    image(this.imagenDia, 750, 90, 700,700);
                    break;
                case 3:
                    image(this.imagenMes, 750, 90, 700,700);  // 605,450
                    break;
                case 4:
                    image(this.imagenRose, 750, 90, 700,525);
                    break;
                case 5:
                    image(this.imagenTotal, 750, 90, 700,700);
                    break;
                case 6:
                    image(this.imagenHisto, 750, 90, 700,700);
                    break;
            } // end switch()




        }


        // seleccionado
        if (this.seleccionada) {
            noFill();
            stroke (200, 100,100 );
            strokeWeight (2);
            ellipse (this.miX, this.miY, this.radio*2, this.radio*2);

            noStroke();
            fill (200);
            text(this.nombre, this.miX, this.miY -30);
            text(this.subRegion, this.miX, this.miY -15);
        }

    } // end of display


    releasedOverMe () {
        if (this.estaEncima) this.seleccionada = !this.seleccionada;
    }

}  // end of class