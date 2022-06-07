import Alien from "./alien.js";

export default class Halcon extends Alien {
  
    constructor(scene, x, y, group, sprite) {
      super(scene, x, y, group, sprite);

      let aux = Math.floor(Math.random() * (2 - 0)) + 0;
      if(aux === 0) this.setTint(0xff0000);
      else this.setTint(0x00ff00);

      this.body.setAllowGravity(false);
      
      this.body.velocity.set(160, 0);

      this.scene.sound.play('hawk',{loop:true});
    }
  }