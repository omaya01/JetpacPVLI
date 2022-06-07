
export default class Boot extends Phaser.Scene {

  constructor() {
    super({ key: 'boot' });
  }

  preload() {
    //audios
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
    //

    this.load.setPath('assets/sprites/');

    //imagenes
    this.load.image('platform', 'tileset.png');
    this.load.image('meteor', 'meteor_base.png');
    this.load.image('explosion_base','explosion_base.png');
    this.load.image('fuel', 'fuel.png');
    this.load.image('laser','laser.png');
    this.load.image('diamond','diamond.png');
    this.load.image('player', 'jetpac_base.png');
    this.load.image('spaceship_base','spaceship_base.png');
    this.load.image('spaceship1','spaceship_part_1.png');
    this.load.image('spaceship2','spaceship_part_2.png');
    this.load.image('spaceship3','spaceship_part_3.png');
    this.load.image('shippart','shippart.png');
    this.load.image('seta', 'seta_base.png');
    this.load.image('pompa','pompa_base.png');
    this.load.image('halcon', 'halcon.png');

    this.load.image('easy','facil.png');
    this.load.image('medium','medio.png');
    this.load.image('hard','dificil.png');
    this.load.image('continue','continue.png');
    //

    //animaciones
    this.load.spritesheet('spaceshipAnimation','spaceship_anim.png',{frameWidth:16, frameHeight:63 })
    this.load.spritesheet('playerAnimation','jetpac.png', { frameWidth: 17, frameHeight: 24 });
    this.load.spritesheet('meteorAnimation','meteor.png', { frameWidth: 16, frameHeight: 14 });
    this.load.spritesheet('explosionAnimation','explosion.png',{frameWidth:24,frameHeight:17});
    this.load.spritesheet('setaAnimation','seta.png', { frameWidth: 16, frameHeight: 14 });
    this.load.spritesheet('pompaAnimation','pompa.png',{ frameWidth: 16, frameHeight: 16 });
    //
  }

  create() {
    this.scene.start('menu');
  }
}