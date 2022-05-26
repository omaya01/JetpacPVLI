/**
 * Clase para los objetos estrella que el jugador ha de recoger
 * Una estrella aparece sobre una base. Cuando el jugador la recoge, se crea
 * una nueva estrella en otra posición, si el juego no ha terminado.
 * @extends Phaser.GameObjects.Sprite
 */
 export default class Spaceship extends Phaser.GameObjects.Sprite {

    /**
     * Constructor de Star
     * @param {Sceme} scene Escena en la que aparece la estrella
     * @param {Base} base Objeto base sobre el que se va a dibujar la estrella
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     */
    constructor(scene, x, y, fuelneeded) {
      super(scene, x, y, 'spaceship');
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this, true);

      this.fuelcharged = 0; this.fuelneeded = fuelneeded;
      this.fueltext = this.scene.add.text(this.x - 10,this.y-40, this.fuelcharged + "/" + this.fuelneeded).setScale(0.8);
    }

    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */
    preUpdate() {
      // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
      // no se podrá ejecutar la animación del sprite.
      super.preUpdate();
      if (this.scene.physics.overlap(this.scene.player, this)) {
        this.scene.chargefuel();
      }
    }

    addfuel(){
      this.fuelcharged+=1;
      this.fueltext.text =  this.fuelcharged + "/" + this.fuelneeded;
this.scene.sound.play('drop');
      if(this.fuelcharged === this.fuelneeded) this.scene.end(true);
    }
  }