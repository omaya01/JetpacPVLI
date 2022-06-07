/**
 * Clase para los objetos estrella que el jugador ha de recoger
 * Una estrella aparece sobre una base. Cuando el jugador la recoge, se crea
 * una nueva estrella en otra posición, si el juego no ha terminado.
 * @extends Phaser.GameObjects.Sprite
 */
 export default class Explosion extends Phaser.GameObjects.Sprite {

    /**
     * Constructor de Star
     * @param {Sceme} scene Escena en la que aparece la estrella
     * @param {Base} base Objeto base sobre el que se va a dibujar la estrella
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     */
    constructor(scene, x, y) {
      super(scene, x, y, 'explosion_base');
      this.scene.add.existing(this);

      this.animation=this.anims.create({
        key: 'explodes',
        frames: this.anims.generateFrameNumbers('explosionAnimation', { frames: [ 0,1,2 ] }),
          frameRate: 8 ,
          repeat: 0,
          hideOnComplete: true,
        });
        this.play('explodes');

        this.scene.time.delayedCall(1000,this.destroy,[],this);
    }
  }