
export default class Pompa extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y,group) {
      super(scene, x, y, '');
      //Le mete físicas al objeto
      group.add(this);
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);

      this.body.setAllowGravity(false);
      this.body.setBounce(1,1);
      this.body.setCircle(15);
      
      this.body.velocity.set(75, 75);
      
      this.toroide = false;
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

      if(this.y <= 0)this.body.velocity.set(this.body.velocity.x, -this.body.velocity.y);
    }
  }