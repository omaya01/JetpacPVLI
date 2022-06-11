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


export default class Level extends Phaser.Scene {

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

  preload(){
    this.load.image('tile', '../assets/sprites/tileset.png');

    if(this.nivel === 1) this.load.tilemapTiledJSON('map1','../assets/map/nivel1.json');
    else if(this.nivel===2) this.load.tilemapTiledJSON('map2','../assets/map/nivel2.json');
    else if(this.nivel===3) this.load.tilemapTiledJSON('map3','../assets/map/nivel3.json');
  }

  create() {
    //crea mapa
    let map = this.make.tilemap({key:'map'+this.nivel, tileWidth:8,tileHeight:8});
    let tileset = map.addTilesetImage('tileset', 'tile');
    this.layer = map.createLayer('layer1',tileset);
    map.setCollision([ 1,2,3 ]);

    //fisicas
    this.creaFisicas();

    //textos
    this.vidastext = this.add.text(this.scale.height/16,this.scale.height/16, "Lives: " + this.vidas).setScale(0.8);
    this.puntuaciontext = this.add.text(this.scale.width/1.7,this.scale.height/16,"Score: " + this.puntuacion).setScale(0.8);

    //entidades
    this.player = new Player(this, this.scale.width/2, 0, this.groupvacio, 'player');
    this.physics.add.collider(this.player,this.layer); // colisiones entre player y el mapa
    this.spaceship = new Spaceship(this,this.scale.width/1.25,this.scale.height-8, this.combustible);
    this.createshippart();

    //timers en loop
    let meteMeteoro = this.time.addEvent({ delay: 2000, callback: this.createmeteor, callbackScope: this, loop: true });
    let diamante = this.time.addEvent({delay: 10000,callback:this.creatediamond,callbackScope:this,loop:true});
    let alienspawn = this.time.addEvent({delay:this.alienRatio*1000,callback:this.createaliens,callbackScope:this,loop:true});

  }

  creaFisicas(){
    //grupos de fisicas
    this.lasergroup = this.add.group();
    this.meteorgroup = this.add.group();
    this.drops = this.add.group();
    this.aliengroup = this.add.group();
    this.groupvacio = this.add.group(); //grupo para los obejtos toroidales que no tengan colisiones
      
    //creacion de fisicas
    this.physics.add.collider(this.lasergroup, this.layer, this.destroyonlythyself, function name(params) {return true;}, this);
    this.physics.add.collider(this.lasergroup, this.meteorgroup, this.destroythyself, function name(params) {return true;}, this);
    this.physics.add.collider(this.lasergroup, this.aliengroup,this.destroythyself,function name(params){return true;},this);
    this.physics.add.collider(this.meteorgroup, this.layer, this.destroyonlythyself, function name(params) {return true;},this);
    this.physics.add.collider(this.aliengroup, this.layer);
    this.physics.add.collider(this.drops, this.layer);
  }

  //metodos para callback de fisicas
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
  //

  //creacion de enemigos
  createmeteor(){ //meteoros
    let meteorX = Math.floor(Math.random() * (this.scale.width-10 - 10 + 1) + 10);
    new Meteor(this, meteorX, -10,this.meteorgroup,'meteor');
  }
  createaliens(){ //aliens dependiendo del nivel
    if(this.nivel === 1){
      let setaX = Math.floor(Math.random() * (this.scale.width-10 - 10 + 1) + 10);
      new Seta(this, setaX, -10,this.aliengroup,'seta');
    }
    else if(this.nivel === 2){
      let halconX = Math.floor(Math.random() * (this.scale.width-10 - 10 + 1) + 10);
      new Halcon(this,0,halconX,this.groupvacio,'halcon');
    }
    else if(this.nivel === 3){
      let pompaX = Math.floor(Math.random() * (this.scale.width-10 - 10 + 1) + 10);
      new Pompa(this,pompaX,1,this.aliengroup,'pompa');
    }
  }
  //

  //creacion de drops
  creatediamond(){
    let diamondX = Math.floor(Math.random() * (this.scale.width-10 - 10 + 1) + 10);
    new Diamante(this, diamondX, 0, this.drops,'diamond');
  }
  createshippart(){
    let partX = Math.floor(Math.random() * (this.scale.width-10 - 10 + 1) + 10);
    new ShipPart(this,partX,-10,this.drops,'shippart');
  }
  createFuel(){
    let fuelX = Math.floor(Math.random() * (this.scale.width-10 - 10 + 1) + 10);
    new Fuel(this,fuelX,-10, this.drops,'fuel');
  }
  //

  //player related
  playergothit(){
    this.sound.play('death');
    this.vidas--;
    this.vidastext.text = "Lives: " + this.vidas;
    return this.vidas === 0;
  }
  removeplayer(){
    this.player.destroy();
  }
  createlaser(){
    let laser = new Laser(this,this.player.getX(),this.player.getY(),this.lasergroup,'laser');
  }
  //

  //nave related
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
  //


  modscore(mod){ //modificacion de la score
    this.puntuacion += mod;
    this.puntuaciontext.text = "Score: " + this.puntuacion;
  }

  end(victory){ //paso a la siguiente escena dependiendo de ciertos parametros
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

 
}


