import Toroidal from "./entity_toroidal.js";

export default class Laser extends Toroidal {

    constructor(scene, x, y,group,sprite) {
      super(scene, x, y, group,sprite);
      
      this.speedX = 200;
      this.body.velocity.set(this.speedX*this.scene.player.getLaserDir(), 0);
      this.body.setAllowGravity(false);

      this.scene.time.delayedCall(500,this.destroy,[],this);
    }



  }