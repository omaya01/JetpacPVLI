import Toroidal from "../entities/entity_toroidal.js";

export default class Alien extends Toroidal {
  
    constructor(scene, x, y,group,sprite) {
      super(scene, x, y, group,sprite);
    }

    alienFunction(){

    }

    updateFunction(){
        this.alienFunction();

         if (this.scene.physics.overlap(this.scene.player, this)) {

         if(!this.scene.player.getinvul()){
         if(this.scene.playergothit()) this.scene.end(false);
         else this.scene.player.resetmepos();
         }
        
         this.destroy();
          }
    }
  }