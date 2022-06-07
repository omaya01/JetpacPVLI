import Toroidal from "./entity_toroidal.js";

export default class Player extends Toroidal {
  
  constructor(scene, x, y, group, sprite) {
    super(scene, x, y, group,sprite);

    this.horizontalSpeed = 150;
    this.verticalSpeed=-50;
    this.isWalking=false;
    this.isJumping = false;

    this.createKeys();
    
    this.chargeAnimation();

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
    let jump = false;

    //movimiento
    if (this.keyW.isDown) {
      console.log()
      this.body.setVelocityY(this.verticalSpeed);
      if(!this.isJumping) {
        this.play('playerjetpack');
        this.isJumping = true;
      }
      jump = true;
      this.scene.sound.play('jet');
    }
    else if(this.isJumping) this.isJumping=false;

    if (this.keyA.isDown) {
      this.body.setVelocityX(-this.horizontalSpeed);
      if(!this.isWalking && !jump){
        this.play('playerWalk');
        this.isWalking=true;
      }
      this.flipX=true;
    }
    else if (this.keyD.isDown) {
      this.body.setVelocityX(this.horizontalSpeed);
      
      if(!this.isWalking && !jump){
        this.play('playerWalk');
        this.isWalking=true;
      }
      this.flipX=false;
    }
    else {
      this.isWalking=false;
      if(!jump){
        this.play('playerWalk')
        this.stop();
      }
      this.body.setVelocityX(0);
    }
  }

  updateFunction(){
    this.movementFunction();

    //disparo
    if(this.space.isDown && !this.lasershot){
      this.scene.createlaser(this.getLaserDir());
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

  canshotagain(){
    this.lasershot = false;
  }
  
  createKeys(){

    this.keyA=this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD=this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW=this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.space=this.scene. input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
  }

  igotfuel(){
    if(!this.fuelPicked){
      this.fuelImage.setVisible(true);
      this.fuelPicked=true;
    }
  }

  igotpieza(){
    if(!this.piezaPicked){
      this.piezaImage.setVisible(true);
      this.piezaPicked=true;
    }
  }

  resetmepos(){
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

  chargefuel(){
    if(this.fuelPicked===true){
      this.fuelImage.setVisible(false);
      this.fuelPicked=false;
      return true;
    }
    else return false;
  }

  addpieza(){
    if(this.piezaPicked===true){
      this.piezaImage.setVisible(false);
      this.piezaPicked=false;
      return true;
    }
    else return false;
  }

  getX(){return this.x;}
  getY(){return this.y;}

  getLaserDir(){
    if(this.flipX)return -1;
    else return 1;
  }
}

