class Cube {

    constructor() {
        
        this.cube = [
                        ['X', 'X', 'X', 'X', 'X', 'B', 'X', 'X', 'X', 'X'],  //B
                        ['X', 'X', 'X', 'X', 'X', 'R', 'X', 'X', 'X', 'X'],  //L
                        ['X', 'X', 'X', 'X', 'X', 'W', 'X', 'X', 'X', 'X'],  //D
                        ['X', 'X', 'X', 'X', 'X', 'O', 'X', 'X', 'X', 'X'],  //R
                        ['X', 'X', 'X', 'X', 'X', 'Y', 'X', 'X', 'X', 'X'],  //U
                        ['X', 'X', 'X', 'X', 'X', 'G', 'X', 'X', 'X', 'X']   //F
                    ];
    }

    doU() {
        var tmp = this.cube[4][2];
        this.cube[4][2] = this.cube[4][6];
        this.cube[4][6] = this.cube[4][8];
        this.cube[4][8] = this.cube[4][4];
        this.cube[4][4] = tmp;

        tmp = this.cube[0][2];
        this.cube[0][2] = this.cube[1][4];
        this.cube[1][4] = this.cube[5][8];
        this.cube[5][8] = this.cube[3][6];
        this.cube[3][6] = tmp;
    }
    
    doU2() {
        doU();
        doU();
    }
    
    doUp() {
        doU();
        doU();
        doU();
    }

    doR() {

        var tmp = this.cube[3][6];
        this.cube[3][6] = this.cube[3][8];
        this.cube[3][8] = this.cube[3][4];
        this.cube[3][4] = this.cube[3][2];
        this.cube[3][2] = tmp;

        tmp = this.cube[4][4];
        this.cube[4][4] = this.cube[5][6];
        this.cube[5][6] = this.cube[2][6];
        this.cube[2][6] = this.cube[0][6];
        this.cube[0][6] = tmp;

    }
    
    doR2() {
        doR();
        doR();
    }
    
    doRp() {
        doR();
        doR();
        doR();
    }

    doD() {

        var tmp = this.cube[2][6];
        this.cube[2][6] = this.cube[2][8];
        this.cube[2][8] = this.cube[2][4];
        this.cube[2][4] = this.cube[2][2];
        this.cube[2][2] = tmp;

        tmp = this.cube[3][4];
        this.cube[3][4] = this.cube[5][2];
        this.cube[5][2] = this.cube[1][6];
        this.cube[1][6] = this.cube[0][8];
        this.cube[0][8] = tmp;

    }
    
    doD2() {
        doD();
        doD();
    }
    
    doDp() {
        doD();
        doD();
        doD();
    }

    doL() {

        var tmp = this.cube[1][4];
        this.cube[1][4] = this.cube[1][2];
        this.cube[1][2] = this.cube[1][6]
        this.cube[1][6] = this.cube[1][8];
        this.cube[1][8] = tmp;

        tmp = this.cube[4][6];
        this.cube[4][6] = this.cube[0][4];
        this.cube[0][4] = this.cube[2][4];
        this.cube[2][4] = this.cube[5][4];
        this.cube[5][4] = tmp;

    }
    
    doL2() {
        doL();
        doL();
    }
    
    doLp() {
        doL();
        doL();
        doL();
    }

    doF() {

        var tmp = this.cube[5][8];
        this.cube[5][8] = this.cube[5][4];
        this.cube[5][4] = this.cube[5][2];
        this.cube[5][2] = this.cube[5][6];
        this.cube[5][6] = tmp;

        tmp = this.cube[4][8];
        this.cube[4][8] = this.cube[1][8];
        this.cube[1][8] = this.cube[2][8];
        this.cube[2][8] = this.cube[3][8];
        this.cube[3][8] = tmp;

    }
    
    doF2() {
        doF();
        doF();
    }
    
    doFp() {
        doF();
        doF();
        doF();
    }

    doB() {

        var tmp = this.cube[0][2]
        this.cube[0][2] = this.cube[0][6];
        this.cube[0][6] = this.cube[0][8];
        this.cube[0][8] = this.cube[0][4];
        this.cube[0][4] = tmp;

        tmp = this.cube[4][2]
        this.cube[4][2] = this.cube[3][2];
        this.cube[3][2] = this.cube[2][2];
        this.cube[2][2] = this.cube[1][2];
        this.cube[1][2] = tmp;

    }
    
    doB2() {
        doB();
        doB();
    }
    
    doBp() {
        doB();
        doB();
        doB();
    }

    setFace(face, cubie, color) {
        this.cube[face- 1][cubie] = color;
    }

    setFace(cubecode, color) {
        
        switch (cubecode) {
            case "FUC": this.cube[5][8] = color; break;
            case "FL":  this.cube[5][4] = color; break;
            case "FR":  this.cube[5][6] = color; break;
            case "FDC": this.cube[5][2] = color; break;
            case "LUC": this.cube[1][4] = color; break;
            case "LL":  this.cube[1][2] = color; break;
            case "LR":  this.cube[1][8] = color; break;
            case "LDC": this.cube[1][6] = color; break;
            case "RUC": this.cube[3][6] = color; break;
            case "RL":  this.cube[3][8] = color; break;
            case "RR":  this.cube[3][2] = color; break;
            case "RDC": this.cube[3][4] = color; break;
            case "BUC": this.cube[0][2] = color; break;
            case "BL":  this.cube[0][6] = color; break;
            case "BR":  this.cube[0][4] = color; break;
            case "BDC": this.cube[0][8] = color; break;
            case "UUC": this.cube[4][2] = color; break;
            case "UL":  this.cube[4][6] = color; break;
            case "UR":  this.cube[4][4] = color; break;
            case "UDC": this.cube[4][8] = color; break;
            case "DUC": this.cube[2][8] = color; break;
            case "DL":  this.cube[2][4] = color; break;
            case "DR":  this.cube[2][6] = color; break;
            case "DDC": this.cube[2][2] = color; break;

        }
    }

    getFace(cubecode) {
        
        switch (cubecode) {
            case "FUC": return this.cube[5][8]; break;
            case "FL":  return this.cube[5][4]; break;
            case "FR":  return this.cube[5][6]; break;
            case "FDC": return this.cube[5][2]; break;
            case "FC":  return this.cube[5][5]; break;            
            case "LUC": return this.cube[1][4]; break;
            case "LL":  return this.cube[1][2]; break;
            case "LR":  return this.cube[1][8]; break;
            case "LDC": return this.cube[1][6]; break;
            case "LC":  return this.cube[1][5]; break;            
            case "RUC": return this.cube[3][6]; break;
            case "RL":  return this.cube[3][8]; break;
            case "RR":  return this.cube[3][2]; break;
            case "RDC": return this.cube[3][4]; break;
            case "RC":  return this.cube[3][5]; break;            
            case "BUC": return this.cube[0][2]; break;
            case "BL":  return this.cube[0][6]; break;
            case "BR":  return this.cube[0][4]; break;
            case "BDC": return this.cube[0][8]; break;
            case "BC":  return this.cube[0][5]; break;            
            case "UUC": return this.cube[4][2]; break;
            case "UL":  return this.cube[4][6]; break;
            case "UR":  return this.cube[4][4]; break;
            case "UDC": return this.cube[4][8]; break;
            case "UC":  return this.cube[4][5]; break;            
            case "DUC": return this.cube[2][8]; break;
            case "DL":  return this.cube[2][4]; break;
            case "DR":  return this.cube[2][6]; break;
            case "DDC": return this.cube[2][2]; break;
            case "DC":  return this.cube[2][5]; break;            

        }
    }

    getPlacedCubies() {

        var placedCubies = 0;

        if (this.cube[2][2] == 'W' && this.cube[0][8] == 'B') {
            placedCubies = placedCubies + 1;
        }
        if (this.cube[2][4] == 'W' && this.cube[1][6] == 'R') {
            placedCubies = placedCubies + 1;
        }

        if (this.cube[2][8] == 'W' && this.cube[5][2] == 'G') {
            placedCubies = placedCubies + 1;
        }

        if (this.cube[2][6] == 'W' && this.cube[3][4] == 'O') {
            placedCubies = placedCubies + 1;
        }

        return placedCubies;
    }

    isCrossOK() {

        return (   this.cube[2][2] == 'W'
                && this.cube[2][4] == 'W'
                && this.cube[2][8] == 'W'
                && this.cube[2][6] == 'W'
                && this.cube[0][8] == 'B'
                && this.cube[1][6] == 'R'
                && this.cube[5][2] == 'G'
                && this.cube[3][4] == 'O');

    }
    
}