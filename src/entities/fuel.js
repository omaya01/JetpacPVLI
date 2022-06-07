import Drop from "./entity_drop.js";

export default class Fuel extends Drop {
  
    constructor(scene, x, y,group,sprite) {
      super(scene, x, y, group,sprite);
    }

    overlapFunction(){
      this.scene.player.gotfuel();
      this.scene.sound.play('pick');
      this.destroy();
    }
  }