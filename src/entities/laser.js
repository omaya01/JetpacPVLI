
export default class Laser extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y,dir,group) {
      super(scene, x, y, 'laser');
      group.add(this);
      this.scene.add.existing(this);
  
      this.scene.physics.add.existing(this);
      
      this.speedX = 200;
      this.body.velocity.set(this.speedX*dir, 0);
      this.body.setAllowGravity(false);
      
      this.toroide = false;

      this.scene.time.delayedCall(500,this.destroy,[],this);
    }
    
    preUpdate(t,dt) {
      // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
      // no se podrá ejecutar la animación del sprite. 
      super.preUpdate(t,dt);
       
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