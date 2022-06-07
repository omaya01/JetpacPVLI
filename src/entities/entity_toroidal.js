
export default class Toroidal extends Phaser.GameObjects.Sprite {
  
    constructor(scene, x, y,group,sprite) {
        super(scene, x, y, sprite);
        group.add(this);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.toroide = false;
    }
    
    preUpdate(t,dt) {
        super.preUpdate(t,dt);
        this.toroideFunction();
        this.updateFunction();
    }

    toroideFunction(){
        if(!this.toroide && this.x > 260){
            this.x=0;
            this.toroide=true;
        }
        else if(!this.toroide && this.x < -5){
            this.x=250;
            this.toroide=true;
        }
        else if(this.toroide && this.x > 0) this.toroide=false;
    }

    updateFunction(){

    }

  }