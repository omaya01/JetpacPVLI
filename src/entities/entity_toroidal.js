
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
        if(!this.toroide && this.x > this.scene.scale.width + 5){ //añado 5 para que sea un poco menos brusco el cambio de sitio y se note fluido
            this.x=-3; // de nuevo es para hacerlo menos brusco
            this.toroide=true;
        }
        else if(!this.toroide && this.x < -5){ //siempre va a ser -5 independientemente del tamaño del canvas
            this.x=this.scene.scale.width;
            this.toroide=true;
        }
        else if(this.toroide && this.x >= -3) this.toroide=false; // este valor tiene que ser el mismo de salida por el lado izquierdo
    }

    updateFunction(){

    }

  }