import Platform from './platform.js';
import Player from './player.js';
import Coin from './coin.js';
import Spaceship from './spaceship.js';
import Meteor from './meteor.js';
import Laser from './laser.js';

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
      this.combustible;
      this.meteorRatio;
      this.vidas;
    }
  }
  init(data){
    this.combustible = data.combustible;
    this.meteorRatio = data.meteoros;
    this.vidas = data.vidas;
  }
  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    this.creaFisicas();
    
    console.log(this.combustible);
    this.player = new Player(this, 125, 0);
    this.vidastext = this.add.text(10,10, "Lives: " + this.vidas).setScale(0.8);

    this.fuel;
    this.spaceship = new Spaceship(this,200,160, this.combustible);
    this.createPlatfoms();
    this.createFuel();

    let meteMeteoro = this.time.addEvent({ delay: this.meteorRatio * 1000, callback: this.createmeteor, callbackScope: this, loop: true });
  }

  creaFisicas(){
    //grupos de fisicas
    this.lasergroup = this.add.group();
    this.terrain = this.add.group();
    this.meteorgroup = this.add.group();
      
    //creacion de fisicas
    this.physics.add.collider(this.lasergroup, this.terrain, this.destroyonlythyself, function name(params) {}, this);
    this.physics.add.collider(this.lasergroup, this.meteorgroup, this.destroythyself, function name(params) {}, this);
    this.physics.add.collider(this.meteorgroup, this.terrain, this.destroyonlythyself, function name(params) {}, this);
  }

  destroyonlythyself(obj1){
    obj1.destroy();
  }
  destroythyself(obj1,obj2){
    obj1.destroy();
    obj2.destroy();
  }

  createmeteor(){
    let meteorX = Math.floor(Math.random() * (250 - 10 + 1) + 10);
new Meteor(this, meteorX, -10,this.meteorgroup);
  }

createFuel(){
  let fuelX = Math.floor(Math.random() * (250 - 10 + 1) + 10);
  let fuelY =  Math.floor(Math.random() * (180 - 10 + 1) + 10);
  this.fuel = new Coin(this,fuelX,fuelY, this.terrain.children.entries);
}

  createPlatfoms(){
      new Platform(this,129,188, 20, this.terrain); //suelo

      //plataformas
      new Platform(this,115,120,2, this.terrain);
      new Platform(this,40,100,2, this.terrain);
      new Platform(this,230,50,2, this.terrain);
    
  }

  playergotfuel(){
    this.player.igotfuel();
  }

  playergothit(){
    this.vidas--;
    this.vidastext.text = "Lives: " + this.vidas;
    return this.vidas === 0;
  }
 
  chargefuel(){
    if(this.player.chargefuel()){
      this.spaceship.addfuel();
      this.createFuel();
    }
  }

  createlaser(dir){
    let laser = new Laser(this,this.player.getX(),this.player.getY(),dir,this.lasergroup);
  }

  end(victory){
    if(victory){
this.sound.play('win');
    }else{
this.sound.play('lose');
    }
    this.scene.start('menu');
  }
}


