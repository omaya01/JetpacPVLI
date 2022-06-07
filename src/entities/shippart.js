import Drop from "./entity_drop.js";

export default class ShipPart extends Drop {
  
    constructor(scene, x, y,group,sprite) {
      super(scene, x, y, group,sprite);
    }

    overlapFunction(){
      this.scene.player.gotpieza();
      this.scene.sound.play('pick');
      this.destroy();
    }
  }