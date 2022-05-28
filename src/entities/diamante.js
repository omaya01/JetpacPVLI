
export default class Diamante extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y,group) {
      super(scene, x, y, 'diamond');
      //Le mete físicas al objeto
      group.add(this);
      this.scene.add.existing(this);
      
      this.scene.physics.add.existing(this);
      
      this.body.velocity.set(0, 0);
      
      this.toroide = false;
    }

    preUpdate(t,dt) {
      // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
      // no se podrá ejecutar la animación del sprite. 
      super.preUpdate(t,dt);
        
      if (this.scene.physics.overlap(this.scene.player, this)) {
          this.scene.modscore(+500);
          this.scene.sound.play('pick');
this.destroy();
       }

    }
  }