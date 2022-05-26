
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
  constructor(scene, x, y) {
    super(scene, x, y, '');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.speed = 150;
    this.jumpSpeed=-50;
    this.createKeys();
    this.isWalking=false;
    this.chargeAnimation();
    //this.loadSounds();

    this.fuelgotted = this.scene.add.image(this.x, this.y - 20, 'fuel').setVisible(false);
    this.toroide = false;
    this.igotted = false;
  }
  chargeAnimation(){
    this.playerAnimation=this.anims.create({
      key: 'playerWalk',
      frames: this.anims.generateFrameNumbers('playerAnimation', { frames: [ 4,5,6,7 ] }),
        frameRate: 8 ,
        repeat: -1,
      });

  }
  loadSounds(){
    const soundConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    };
    this.jump=this.scene.sound.add("jumpSound",soundConfig);
  }
  preUpdate(t,dt) {
    super.preUpdate(t,dt);

    if (this.space.isDown) {
      console.log()
      this.body.setVelocityY(this.jumpSpeed);
      //this.jump.play();
    }
    if (this.cursors.left.isDown) {
      this.body.setVelocityX(-this.speed);
      if(!this.isWalking){
        this.play('playerWalk');
        this.isWalking=true;
      }
      this.flipX=true;
    }
    else if (this.cursors.right.isDown) {
      this.body.setVelocityX(this.speed);
      
      if(!this.isWalking){
        this.play('playerWalk');
        this.isWalking=true;
      }
      this.flipX=false;
    }
    else {
      this.isWalking=false;
      this.play('playerWalk')
      this.stop();
      this.body.setVelocityX(0);
    }
    

    if(!this.toroide && this.x > 260){
      this.x=0;
      this.toroide=true;
    }
    else if(!this.toroide && this.x < -5){
      this.x=250;
      this.toroide=true;
    }
    else if(this.toroide && this.x > 0) this.toroide=false;

    this.fuelgotted.x=this.x;
      this.fuelgotted.y=this.y-20;
  }
  
  createKeys(){

    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.space=this.scene. input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
  }

  igotfuel(){
    if(!this.igotted){
      this.fuelgotted.setVisible(true);
      this.igotted=true;
    }
  }

  chargefuel(){
    if(this.igotted===true){
      this.fuelgotted.setVisible(false);
      this.igotted=false;
      return true;
    }
    else return false;
  }
}

