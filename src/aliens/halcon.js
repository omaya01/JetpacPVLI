
export default class Halcon extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y) {
      super(scene, x, y, 'halcon');

      let aux = Math.floor(Math.random() * (2 - 0)) + 0;
      if(aux === 0) this.setTint(0xff0000);
      else this.setTint(0x00ff00);

      //Le mete físicas al objeto
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);

      this.body.setAllowGravity(false);
      
      this.body.velocity.set(160, 0);
      
      this.toroide = false;

      this.scene.sound.play('hawk',{loop:true});
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