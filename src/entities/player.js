import Toroidal from "./entity_toroidal.js";

export default class Player extends Toroidal {
  
  constructor(scene, x, y, group, sprite) {
    super(scene, x, y, group,sprite);

    //velocidades y control de movimiento
    this.horizontalSpeed = 150;
    this.verticalSpeed=-50;
    this.isWalking=false;
    this.inAir = false;

    //keys de input
    this.createKeys();
    
    //animaciones
    this.chargeAnimation();

    //control de laser
    this.lasershot = false;

    //reset de pos
    this.resetX = x;
    this.resetY = y;
    this.invul = false;

    //fuel
    this.fuelImage = this.scene.add.image(this.x, this.y - 20, 'fuel').setVisible(false);
    this.fuelPicked = false;

    //pieza
    this.piezaImage = this.scene.add.image(this.x,this.y-20,'shippart').setVisible(false);
    this.piezaPicked = false;
  }

  chargeAnimation(){
    this.playerAnimation=this.anims.create({
      key: 'playerWalk',
      frames: this.anims.generateFrameNumbers('playerAnimation', { frames: [ 4,5,6,7 ] }),
        frameRate: 8 ,
        repeat: -1,
      });

      this.jetpackAnimation=this.anims.create({
        key: 'playerjetpack',
        frames: this.anims.generateFrameNumbers('playerAnimation',{frames:[0,1,2,3]}),
        frameRate: 8 ,
        repeat: -1,
      });

  }

  movementFunction(){
    let jetused = false;

    //movimiento vertical
    if (this.keyW.isDown) {
      this.body.setVelocityY(this.verticalSpeed);
      if(!this.inAir) {
        this.play('playerjetpack');
        this.inAir = true;
      }
      jetused = true;
      this.scene.sound.play('jet');
    }
    else if(this.inAir) this.inAir=false;

    //movimiento horizontal
    if (this.keyA.isDown) {
      this.body.setVelocityX(-this.horizontalSpeed);
      if(!this.isWalking && !jetused){
        this.play('playerWalk');
        this.isWalking=true;
      }
      this.flipX=true;
    }
    else if (this.keyD.isDown) {
      this.body.setVelocityX(this.horizontalSpeed);
      
      if(!this.isWalking && !jetused){
        this.play('playerWalk');
        this.isWalking=true;
      }
      this.flipX=false;
    }
    else {
      this.isWalking=false;
      if(!jetused){
        this.play('playerWalk')
        this.stop();
      }
      this.body.setVelocityX(0);
    }
  }

  updateFunction(){
    //movimiento
    this.movementFunction();

    //disparo
    if(this.space.isDown && !this.lasershot){
      this.scene.createlaser();
      this.scene.sound.play('laser');
      this.lasershot = true;
      this.scene.time.delayedCall(500,this.canshotagain,[],this);
    }

    //reposicionamiento de las imagenes invisibles
    this.fuelImage.x=this.x;
      this.fuelImage.y=this.y-20;
      this.piezaImage.x=this.x;
      this.piezaImage.y=this.y-20;
  }

  canshotagain(){ //se usa para un delayed call
    this.lasershot = false;
  }
  
  createKeys(){

    this.keyA=this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD=this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW=this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.space=this.scene. input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
  }

  gotfuel(){
    if(!this.fuelPicked){
      this.fuelImage.setVisible(true);
      this.fuelPicked=true;
    }
  }

  gotpieza(){
    if(!this.piezaPicked){
      this.piezaImage.setVisible(true);
      this.piezaPicked=true;
    }
  }

  resetmepos(){ //resetea posicion y pone invul se llama cuando se recibe da??o
    this.x = this.resetX;
    this.y = this.resetY;
    this.invul = true;

    this.setTint(0xed0cbc);

    this.scene.time.delayedCall(2000,this.resetinvul,[],this);
  }

  resetinvul(){ 
    this.invul=false;
    this.clearTint();
  }

  getinvul(){
    return this.invul;
  }

  chargefuel(){ //true si est?? recogido
    if(this.fuelPicked===true){
      this.fuelImage.setVisible(false);
      this.fuelPicked=false;
      return true;
    }
    else return false;
  }

  addpieza(){ //true si est?? recogida
    if(this.piezaPicked===true){
      this.piezaImage.setVisible(false);
      this.piezaPicked=false;
      return true;
    }
    else return false;
  }

  getX(){return this.x;}
  getY(){return this.y;}

  getLaserDir(){ //devuelve la direcci??n a la que se est?? mirando
    if(this.flipX)return -1;
    else return 1;
  }
}

