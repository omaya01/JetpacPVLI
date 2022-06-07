
export default class Platform extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y, enlarge, group) {
    super(scene, x, y, 'platform');
    
    group.add(this);
    if(enlarge!==0) this.setScale(enlarge,1);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    this.scene.physics.add.collider(this,this.scene.player);
  }

}
 