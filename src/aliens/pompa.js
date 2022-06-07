import Alien from "./alien.js";

export default class Pompa extends Alien {

    constructor(scene, x, y,group,sprite) {
      super(scene, x, y, group,sprite);

      let aux = Math.floor(Math.random() * (3 - 0)) + 0;
      if(aux === 0) this.setTint(0xff0000);
      else if(aux === 1) this.setTint(0x00ff00);
      else this.setTint(0x0000ff);


      this.body.setAllowGravity(false);
      this.body.setBounce(1,1);
      this.body.setCircle(8);
      
      this.body.velocity.set(75, 75);
      this.auxVelX = this.body.velocity.x;
      this.auxVelY = this.body.velocity.y;
      
      this.chargeAnimation();
      this.play('pompawalks');
    }

    chargeAnimation(){
      this.playerAnimation=this.anims.create({
        key: 'pompawalks',
        frames: this.anims.generateFrameNumbers('pompaAnimation', { frames: [ 0,1 ] }),
          frameRate: 8 ,
          repeat: -1,
        });
  
    }

    alienFunction(){
      if(this.auxVelX !== this.body.velocity.x || this.auxVelY !== this.body.velocity.y) {
        this.scene.sound.play('bubble');
        this.auxVelX = this.body.velocity.x;
        this.auxVelY=this.body.velocity.y;
      }

       if(this.y <= 0)this.body.velocity.set(this.body.velocity.x, -this.body.velocity.y);
    }
  }