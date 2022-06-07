import Drop from "./entity_drop.js";

export default class Diamante extends Drop {
  
    constructor(scene, x, y,group,sprite) {
      super(scene, x, y, group,sprite);
    }

    overlapFunction(){
      this.scene.modscore(+500);
      this.scene.sound.play('pick');
      this.destroy();
    }
  }