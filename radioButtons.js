class RadioButton {
    constructor(xp,  yp,  s,  b,  d,  m, o,  tL) {
        this.x = xp;
        this.y = yp;
        this.size = s;
        this.dotSize = this.size - this.size / 3;
        this.miTitulo = tL;

        this.baseGray = b;
        this.dotGray = d;
        this.others = o;
        this.me = m;

        this.checked = false;
        this.encima  = false;
    } // end constructor

    // Updates the boolean value press, returns true or false
    press(xRaton, yRaton) {
        if (dist(this.x, this.y, xRaton, yRaton) < this.size / 2) {
            this.checked = !this.checked;
            for (let i = 0; i < this.others.length; i++) {
                if (i !== this.me) {
                    this.others[i].checked = false;
                }
            }
            return true;
        } else {
            return false;
        }
    }

    // Draws the element to the display window
    display() {
        if (dist(this.x, this.y, mouseX, mouseY) < this.size / 2) this.encima = true;
        else this.encima = false;

        noStroke();
        if (this.encima) {
            fill(225,128,62);
        }else{
            fill(this.baseGray);
        }
        ellipse(this.x, this.y, this.size, this.size);
        if (this.checked === true) {
            fill(this.dotGray);
            ellipse(this.x, this.y, this.dotSize, this.dotSize);

            textAlign(CENTER);
            textSize(14);
            text(this.miTitulo,this.x,this.y+this.size+2);
            textAlign(LEFT);
        }else{
            fill(255);
            textAlign(CENTER);
            textSize(12);
            text(this.miTitulo,this.x,this.y+this.size+2);
            textAlign(LEFT);
        }
    }  // end display

} // end class