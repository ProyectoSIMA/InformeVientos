/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2019
 */

class Button {
    constructor ( _x,_y, _sZ, _tl ){
        this.myX = _x;
        this.myY = _y;
        this.mySize = _sZ;
        this.myTitle = _tl;
        this.myColor = color(155, 255, 155, 90);
        this.myOverMeColor = color(255, 255, 155, 80);
        this.myStrokeColor = color(255, 255, 155);
        this.mouseOverMe = false;
        this.selected = false;
        this.myTextSize = 18;
    }

    display () {
        fill(255);
        noStroke();
        textSize(this.myTextSize);
        text(this.myTitle, this.myX, this.myY + this.mySize + this.myTextSize + 2);

        this.mouseOverMe = mouseX > this.myX  && mouseX < this.myX + this.mySize &&
            mouseY > this.myY  && mouseY < this.myY + this.mySize ;

        fill(this.myColor);
        if (this.mouseOverMe) fill(this.myOverMeColor);

        strokeWeight(1);
        stroke(this.myStrokeColor);
        rect(this.myX, this.myY, this.mySize, this.mySize);

        if (this.mouseOverMe){
            fill(255);
            noStroke();
            textAlign(LEFT);
        }

        if(this.selected){
            strokeWeight(1);
            noFill();
            stroke(this.myStrokeColor);
            rect(this.myX-2, this.myY-2, this.mySize + 4, this.mySize + 4);
        }


    } // end of display



    releasedOverMe () {
        if (this.mouseOverMe) this.selected = !this.selected;
    }

} // end of class