
 export default class Explosion extends Phaser.GameObjects.Sprite {

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