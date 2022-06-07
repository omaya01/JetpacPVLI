
export default class Meteor extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y,group) {
      super(scene, x, y, 'meteor');
      this.scene.add.existing(this);
  
      //Le mete físicas al objeto
      group.add(this);
      this.scene.physics.add.existing(this);
      
      this.speedX = 50;
      this.speedY = 100;
      this.body.velocity.set(this.speedX, this.speedY);
      this.body.setAllowGravity(false);

      this.toroide = false;
      this.chargeAnimation();
      this.play('meteorfalls');
    }
    
    chargeAnimation(){
      this.playerAnimation=this.anims.create({
        key: 'meteorfalls',
        frames: this.anims.generateFrameNumbers('meteorAnimation', { frames: [ 0,1 ] }),
          frameRate: 8 ,
          repeat: -1,
        });
  
    }
    preUpdate(t,dt) {
      // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
      // no se podrá ejecutar la animación del sprite. 
      super.preUpdate(t,dt);
       if (this.scene.physics.overlap(this.scene.player, this)) {

         if(!this.scene.player.getinvul()){
          if(this.scene.playergothit()) this.scene.end(false);
          else this.scene.player.resetmepos();
         }
         
         this.destroy();
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
    }

  }