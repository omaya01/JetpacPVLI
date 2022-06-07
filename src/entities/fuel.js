import Drop from "./entity_drop.js";

export default class Fuel extends Drop {
  
    constructor(scene, x, y,group,sprite) {
      super(scene, x, y, group,sprite);
    }

    overlapFunction(){
      this.scene.playergotfuel();
      this.scene.sound.play('pick');
      this.destroy();
    }
  }