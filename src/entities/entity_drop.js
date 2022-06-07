
export default class Drop extends Phaser.GameObjects.Sprite {
  
    constructor(scene, x, y,group,sprite) {
      super(scene, x, y, sprite);
      
      group.add(this);
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
    }

    preUpdate(t,dt) {
      super.preUpdate(t,dt);
        
      if (this.scene.physics.overlap(this.scene.player, this)) {
          this.overlapFunction();
       }

    }

    overlapFunction(){

    }
  }