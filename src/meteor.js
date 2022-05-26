
export default class Meteor extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y,terrain) {
      super(scene, x, y, '');
      this.scene.add.existing(this);
  
      //Le mete físicas al objeto
      this.scene.physics.add.existing(this);
      terrain.forEach(element => {
        this.scene.physics.add.collider(this,element,this.destroymeself, function name(params) {}, this);
      });
      
      this.speedX = 100;
      this.speedY = 10;
      this.setDirection();
      this.body.velocity.set(this.speedX*this.direction1, this.speedY);
      
      this.toroide = false;
      this.chargeAnimation();
      this.play('meteorfalls');
    }
    
    chargeAnimation(){
      this.playerAnimation=this.anims.create({
        key: 'meteorfalls',
        frames: this.anims.generateFrameNumbers('meteorAnimation', { frames: [ 0,1,2,3 ] }),
          frameRate: 8 ,
          repeat: -1,
        });
  
    }

    setDirection(){

      //Establezco direcciones para que cada pelota vaya hacia un lugar
      this.direction1 =(Phaser.Math.Between(-10, 10));
      this.direction1/=10;
    }

    destroymeself(){
      this.destroy();
     // this.scene.sound.play('explosion');
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