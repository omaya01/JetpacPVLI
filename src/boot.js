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
    //// Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    this.load.setPath('assets/sprites/');
    this.load.image('platform', 'tileset.png');
    //this.load.image('base', 'base.png');
    this.load.image('fuel', 'fuel.png');
    this.load.image('player', 'jetpac.png');
    this.load.image('spaceship','spaceship.png');
    //this.load.image('wallpaper','wallpaper.jpg');
    //this.load.image('gun','gancho.png');
    this.load.image('easy','facil.png');
    this.load.image('medium','medio.png');
    this.load.image('hard','dificil.png');
    //this.load.image('menuWallpaper','menuWallpaper.jpg');
    this.load.spritesheet('playerAnimation','jetpac.png', { frameWidth: 17, frameHeight: 24 });
    this.load.spritesheet('meteorAnimation','meteor.png', { frameWidth: 16, frameHeight: 14 });
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.scene.start('menu');
  }
}