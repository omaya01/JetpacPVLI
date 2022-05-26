import Platform from './platform.js';
import Player from './player.js';
import Coin from './coin.js';
import Spaceship from './spaceship.js';
import Meteor from './meteor.js';

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
    }
  }
  init(data){
    this.combustible = data.combustible;
    this.meteorRatio = data.meteoros;
  }
  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    console.log(this.combustible);
    this.player = new Player(this, 125, 0);
    this.fuel;
    this.spaceship = new Spaceship(this,200,160, this.combustible);
    this.createPlatfoms();
    this.createFuel();

    let meteMeteoro = this.time.addEvent({ delay: this.meteorRatio * 1000, callback: this.createmeteor, callbackScope: this, loop: true });
  }

  createmeteor(){
    let meteorX = Math.floor(Math.random() * (250 - 10 + 1) + 10);
new Meteor(this, meteorX, -10,this.terrain.children.entries);
  }

createFuel(){
  let fuelX = Math.floor(Math.random() * (250 - 10 + 1) + 10);
  let fuelY =  Math.floor(Math.random() * (180 - 10 + 1) + 10);
  this.fuel = new Coin(this,fuelX,fuelY, this.terrain.children.entries);
}

  createPlatfoms(){
    this.terrain = this.add.group();
      new Platform(this,129,188, 20, this.terrain); //suelo

      //plataformas
      new Platform(this,115,120,2, this.terrain);
      new Platform(this,40,100,2, this.terrain);
      new Platform(this,230,50,2, this.terrain);
    
  }

  playergotfuel(){
    this.player.igotfuel();
  }
 
  chargefuel(){
    if(this.player.chargefuel()){
      this.spaceship.addfuel();
      this.createFuel();
    }
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


