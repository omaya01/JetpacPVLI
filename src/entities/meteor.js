import Alien from "../aliens/alien.js";

export default class Meteor extends Alien {
  
    constructor(scene, x, y, group, sprite) {
      super(scene, x, y, group, sprite);

      this.speedX = 50;
      this.speedY = 100;
      this.body.velocity.set(this.speedX, this.speedY);
      this.body.setAllowGravity(false);

      this.chargeAnimation();
      this.play('meteorfalls');
    }
    
    chargeAnimation(){
      this.playerAnimation=this.anims.create({
        key: 'meteorfalls',
        frames: this.anims.generateFrameNumbers('meteorAnimation', { frames: [ 0,1 ] }),
          frameRate: 8 ,
          repeat: -1,
        });
  
    }

  }