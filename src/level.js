import Platform from './entities/platform.js';
import Player from './entities/player.js';
import Fuel from './entities/fuel.js';
import Spaceship from './entities/spaceship.js';
import Meteor from './entities/meteor.js';
import Laser from './entities/laser.js';
import Diamante from './entities/diamante.js';
import ShipPart from './entities/shippart.js';
import Seta from './aliens/seta.js';
import Halcon from './aliens/halcon.js';
import Pompa from './aliens/pompa.js';
import Explosion from './entities/explosion.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'level' });{
      this.nivel;
      this.combustible;
      this.alienRatio;
      this.vidas;
      this.puntuacion;
    }
  }
  init(data){
    this.nivel = data.nivel;
    this.combustible = data.combustible;
    this.alienRatio = data.aliens;
    this.vidas = data.vidas;
    this.puntuacion = data.puntuacion;
  }
  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    this.creaFisicas();
    this.vidastext = this.add.text(10,10, "Lives: " + this.vidas).setScale(0.8);
    this.puntuaciontext = this.add.text(150,10,"Score: " + this.puntuacion).setScale(0.8);
    this.player = new Player(this, 125, 0);
    
    this.spaceship = new Spaceship(this,200,180, this.combustible);
    this.createPlatfoms();
    this.createshippart();

    let meteMeteoro = this.time.addEvent({ delay: 2000, callback: this.createmeteor, callbackScope: this, loop: true });
    let diamante = this.time.addEvent({delay: 10000,callback:this.creatediamond,callbackScope:this,loop:true});
    let alienspawn = this.time.addEvent({delay:this.alienRatio*1000,callback:this.createaliens,callbackScope:this,loop:true});

  }

  creaFisicas(){
    //grupos de fisicas
    this.lasergroup = this.add.group();
    this.terrain = this.add.group();
    this.meteorgroup = this.add.group();
    this.drops = this.add.group();
    this.aliengroup = this.add.group();
    this.groupvacio = this.add.group(); //grupo para los obejtos toroidales que no tengan colisiones
      
    //creacion de fisicas
    this.physics.add.collider(this.lasergroup, this.terrain, this.destroyonlythyself, function name(params) {}, this);
    this.physics.add.collider(this.lasergroup, this.meteorgroup, this.destroythyself, function name(params) {}, this);
    this.physics.add.collider(this.lasergroup, this.aliengroup,this.destroythyself,function name(params){},this);
    this.physics.add.collider(this.meteorgroup, this.terrain, this.destroyonlythyself, function name(params) {}, this);
    this.physics.add.collider(this.aliengroup, this.terrain);
    this.physics.add.collider(this.drops, this.terrain);
  }

  destroyonlythyself(obj1){
    obj1.destroy();
    this.sound.play('impact');
    let explosion = new Explosion(this,obj1.x,obj1.y);
  }
  destroythyself(obj1,obj2){
    obj1.destroy();
    obj2.destroy();
    this.modscore(+25);
    this.sound.play('explosion');
  }

  createmeteor(){
    let meteorX = Math.floor(Math.random() * (250 - 10 + 1) + 10);
new Meteor(this, meteorX, -10,this.meteorgroup);
  }

  createaliens(){
    if(this.nivel === 1){
      let setaX = Math.floor(Math.random() * (250 - 10 + 1) + 10);
      new Seta(this, setaX, -10,this.aliengroup,'seta');
    }
    else if(this.nivel === 2){
      let halconX = Math.floor(Math.random() * (250 - 10 + 1) + 10);
      new Halcon(this,0,halconX,this.groupvacio,'halcon');
    }
    else if(this.nivel === 3){
      let pompaX = Math.floor(Math.random() * (250 - 10 + 1) + 10);
      new Pompa(this,pompaX,1,this.aliengroup,'pompa');
    }
  }

  creatediamond(){
    let diamondX = Math.floor(Math.random() * (250 - 10 + 1) + 10);
    new Diamante(this, diamondX, 0, this.drops,'diamond');
  }

  createshippart(){
    let partX = Math.floor(Math.random() * (250 - 10 + 1) + 10);
    new ShipPart(this,partX,-10,this.drops,'shippart');
  }

createFuel(){
  let fuelX = Math.floor(Math.random() * (250 - 10 + 1) + 10);
  let fuelY =  Math.floor(Math.random() * (180 - 10 + 1) + 10);
  new Fuel(this,fuelX,fuelY, this.drops,'fuel');
}

  createPlatfoms(){
      new Platform(this,129,188, 20, this.terrain); //suelo

      //plataformas
      let firstY, secondY, thirdY;
      if(this.nivel === 1){
firstY = 100; secondY = 50; thirdY = 120;
      }
      else if(this.nivel === 2){
firstY = 50; secondY = 120; thirdY = 100;
      }
      else if(this.nivel === 3){
firstY = 120; secondY = 100; thirdY = 50;
      }
      new Platform(this,115,firstY,2, this.terrain);
      new Platform(this,40,secondY,2, this.terrain);
      new Platform(this,230,thirdY,2, this.terrain);
    
  }

  playergotfuel(){
    this.player.igotfuel();
  }
  playergotpieza(){
    this.player.igotpieza();
  }

  playergothit(){
    this.sound.play('death');
    this.vidas--;
    this.vidastext.text = "Lives: " + this.vidas;
    return this.vidas === 0;
  }
 
  chargefuel(){
    if(this.player.chargefuel()){
      this.spaceship.addfuel();
      this.createFuel();
      this.modscore(+100);
      this.sound.play('drop');
    }
  }

  addpieza(){
    if(this.player.addpieza()){
      this.spaceship.addpart();
      if(!this.spaceship.getrepaired())this.createshippart();
      else this.createFuel();
      this.modscore(+25);
      this.sound.play('drop');
    }
  }

  createlaser(dir){
    let laser = new Laser(this,this.player.getX(),this.player.getY(),dir,this.lasergroup);
  }

  modscore(mod){
    this.puntuacion += mod;
    this.puntuaciontext.text = "Score: " + this.puntuacion;
  }

  end(victory){
    this.sound.stopAll();
    if(victory){
      if(this.nivel < 3){
        this.sound.play('win');
        this.scene.start('level',{nivel:this.nivel+1, combustible:this.combustible+1, aliens: this.alienRatio-1, vidas:this.vidas, puntuacion:this.puntuacion});
      }
      else{
        this.sound.play('win');
        this.scene.start('finalmenu',{vic:true,score:this.puntuacion});
      }
    }
    else{
      this.sound.play('lose');
      this.scene.start('finalmenu',{vic:false,score:this.puntuacion});
    }
  }

  removeplayer(){
    this.player.destroy();
  }
}


