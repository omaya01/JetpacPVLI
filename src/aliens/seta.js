import Alien from "../entities/entity_toroidal.js";

export default class Seta extends Alien {
  
    constructor(scene, x, y,group,sprite) {
      super(scene, x, y, group,sprite);

      this.setTint(0xff0000);
      
      this.body.velocity.set(25, 0);

      this.chargeAnimation();
      this.play('setawalks');

      this.scene.sound.play('moosh',{loop:true});
    }

    chargeAnimation(){
      this.playerAnimation=this.anims.create({
        key: 'setawalks',
        frames: this.anims.generateFrameNumbers('setaAnimation', { frames: [ 0,1 ] }),
          frameRate: 8 ,
          repeat: -1,
        });
  
    }
  }