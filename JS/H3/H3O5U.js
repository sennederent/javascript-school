
/*  **********************************************************
    **                BEGIN klasse Speler                   **
    ********************************************************** */


class Speler {
  constructor(n) {
    this.naam = n;
    this.resterendeBeurten = null;
  }

  kiesLetter() {
    // kies een letter

    if (key >= 'a' && key <= 'z') {
      spel.controleerInvoer();
    }
  }
}
/*  **********************************************************
    **      EINDE klasse Speler   BEGIN klasse Galgje       **
    ********************************************************** */


class Galgje {
  constructor(s,b) {
    this.speler = s;
    this.maximaalAantalBeurten = 10;
    this.speler.resterendeBeurten = this.maximaalAantalBeurten;
    this.beeldjes = b;
    this.woordenLijst = new Array('een','twee','drie','vier','vijf','zes');
    this.woord = this.woordenLijst[floor(random(0,this.woordenLijst.length))];
    this.letters = [];
    this.geraden = [];
    this.pogingen = [];
    this.maakRijLetters();
  }

  maakRijLetters() {
    for (var l = 0;l < this.woord.length;l++) {
      this.letters.push(this.woord.substr(l,1));
      this.geraden.push(false);
    }
  }

  controleerInvoer() {
    // mag deze invoer?

    if (this.speler.resterendeBeurten > 0 && !this.woordIsGeraden()) {
      this.verwerkInvoer();
      this.teken();
    }
  }

  verwerkInvoer() {
    // verwerk de invoer
    var letterIsAlGeprobeerd = false;
    for (var g = 0; g < this.pogingen.length; g++) {
      if (this.pogingen[g] == key) {
        letterIsAlGeprobeerd = true;
      }
    }
    if (!letterIsAlGeprobeerd) {
      this.pogingen.push(key);
      var letterZitInWoord = false;
      for (var l = 0;l < this.letters.length;l++) {
        if (this.letters[l] == key) {
          letterZitInWoord = true;
          this.geraden[l] = true;
        }
      }
      if (!letterZitInWoord) {
        this.speler.resterendeBeurten--;
      }
    }
  }

  woordIsGeraden() {
    var geraden = true;
    for (var b = 0;b < this.geraden.length;b++) {
      if (!this.geraden[b]) {
        geraden = false;
      }
    }
    return geraden;
  }

  teken() {
    // teken de speltoestand

    push();
    background('lightcyan');
    noStroke();
    textFont("Courier");
    textSize(40);
    textAlign(CENTER,CENTER);
    var tekst = "";
    for (var l = 0;l < this.letters.length;l++) {
      if (this.geraden[l]) {
        tekst += this.letters[l]+" ";
      }
      else
      {
        tekst += "_ ";
      }
    }
    tekst=tekst.substr(0,tekst.length-1);
    text(tekst,12,0,canvas.width,70);

    var pogingtekst = "";
    for (var p = 0; p < this.pogingen.length;p++) {
      pogingtekst += this.pogingen[p]+" ";
    }
    textSize(25);
    text(pogingtekst,12,350,canvas.width,70);

    image(this.beeldjes[this.maximaalAantalBeurten - this.speler.resterendeBeurten],(canvas.width-300) / 2,75,300,300);
    textSize(80);
    if (this.speler.resterendeBeurten == 0) {
      fill('red');
      text("VERLOREN :(",0,0,canvas.width,300);
    }
    if (this.woordIsGeraden()) {
      fill('green');
      text("Goed gedaan, "+this.speler.naam,0,100,canvas.width,300);
    }
    else {
      fill('orange');
      text(speler.resterendeBeurten,canvas.width - 50,canvas.height - 50);
    }
    pop();
  }
}
/*  **********************************************************
    **      EINDE klasse Galgje   BEGIN hoofdprogramma      **
    ********************************************************** */


var beeldjes = [];
var aantalBeeldjes = 11;

function preload() {
  for (var b = 0;b < aantalBeeldjes;b++) {
    nieuw_beeldje = loadImage("images/Galgje/galgje("+b+").jpg");
    beeldjes.push(nieuw_beeldje);
  }
}

function setup() {
  // initialisatie

  var myCanvas = createCanvas(700,400);
  canvas = myCanvas; // zoomfix
  myCanvas.parent('processing');
  noLoop();
  speler = new Speler('Vincent');
  spel = new Galgje(speler,beeldjes);
  spel.teken();
}

function keyTyped() {
  spel.speler.kiesLetter();
  if (spel.woordIsGeraden() || spel.speler.resterendeBeurten == 0) {
    if (keyCode == 32) {
      setup();
    }
  }
}
/*  **********************************************************
    **               EINDE hoofdprogramma                   **
    ********************************************************** */