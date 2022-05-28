/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'boot' });
  }

  /**
   * Carga de los assets del juego
   */
  preload() {
    this.load.audio('pick','assets/sounds/pick.wav');
    this.load.audio('drop','assets/sounds/drop.wav');
    this.load.audio('explosion','assets/sounds/explosion.wav');
    this.load.audio('win','assets/sounds/win.wav');
    this.load.audio('lose','assets/sounds/lose.wav');
    this.load.audio('death','assets/sounds/death.wav');
    this.load.audio('laser','assets/sounds/laser.wav');
    this.load.audio('impact','assets/sounds/impact.wav');
    this.load.audio('bubble','assets/sounds/bubble.wav');
    this.load.audio('hawk','assets/sounds/hawk.wav');
    this.load.audio('moosh','assets/sounds/moosh.wav');
    this.load.audio('jet','assets/sounds/jet.wav');
    //// Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    this.load.setPath('assets/sprites/');
    this.load.image('platform', 'tileset.png');
    this.load.image('meteor', 'meteor_base.png');
    this.load.image('fuel', 'fuel.png');
    this.load.image('laser','laser.png');
    this.load.image('diamond','diamond.png');
    this.load.image('player', 'jetpac_base.png');
    this.load.image('spaceship','spaceship.png');
    this.load.image('shippart','shippart.png');
    this.load.image('seta', 'seta_base.png');
    this.load.image('pompa','pompa_base.png');
    this.load.image('halcon', 'halcon.png');

    this.load.image('easy','facil.png');
    this.load.image('medium','medio.png');
    this.load.image('hard','dificil.png');
    this.load.image('continue','continue.png');

    this.load.spritesheet('playerAnimation','jetpac.png', { frameWidth: 17, frameHeight: 24 });
    this.load.spritesheet('meteorAnimation','meteor.png', { frameWidth: 16, frameHeight: 14 });
    this.load.spritesheet('setaAnimation','seta.png', { frameWidth: 16, frameHeight: 14 });
    this.load.spritesheet('pompaAnimation','pompa.png',{ frameWidth: 16, frameHeight: 16 });
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.scene.start('menu');
  }
}