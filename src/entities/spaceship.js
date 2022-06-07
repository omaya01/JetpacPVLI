
 export default class Spaceship extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, fuelneeded) {
      super(scene, x, y, 'spaceship_base');

      //fisicas
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      this.body.setAllowGravity(false);

      //variables de control de fuel y piezas
      this.repaired = false; this.piezasneeded = 3; this.actualpiezas = 0;
      this.fuelcharged = 0; this.fuelneeded = fuelneeded;

      //textos
      this.fueltext = this.scene.add.text(this.x - 10,this.y-55, "").setScale(0.8);
      this.shipparttext = this.scene.add.text(this.x - 10, this.y-55,this.actualpiezas + "/" + this.piezasneeded).setScale(0.8);
    }

    preUpdate() {
      super.preUpdate();
      if (this.scene.physics.overlap(this.scene.player, this)) {
        if(this.repaired) this.scene.chargefuel();
        else this.scene.addpieza();
      }
    }

    addfuel(){
      this.fuelcharged+=1;
      this.fueltext.text =  this.fuelcharged + "/" + this.fuelneeded;
this.scene.sound.play('drop');
      if(this.fuelcharged === this.fuelneeded){
        this.spaceshipfull();
        this.fueltext.text="";
      }
    }

    addpart(){
      this.actualpiezas +=1;
      this.shipparttext.text = this.actualpiezas + "/" + this.piezasneeded;
      if(this.actualpiezas===this.piezasneeded){
        this.repaired=true;
        this.fueltext.text = this.fuelcharged + "/" + this.fuelneeded;
        this.shipparttext.text = "";
      }

     this.buildship();
    }

    buildship(){ //cambio de texturas de la nave
      if(this.actualpiezas===1){
        this.setTexture('spaceship1');
        this.setPosition(this.x,this.y-4); //porque la primera textura es solo la mitad (considerando posición)
        this.body.setSize(16,16*this.actualpiezas);
      }
      else if(this.actualpiezas===2) {
        this.setTexture('spaceship2');
        this.setPosition(this.x,this.y-8);
        this.body.setSize(16,16*this.actualpiezas);
      }
      else if(this.actualpiezas===3) {
        this.setTexture('spaceship3');
        this.setPosition(this.x,this.y-8);
        this.body.setSize(16,16*this.actualpiezas);
      }
    }

    getrepaired(){return this.repaired;}

    spaceshipfull(){ // en caso de llenarse la nave 
      this.scene.time.delayedCall(3000,this.endlevel,[],this);
      this.naveAnimation=this.anims.create({
          key: 'spaceshipUp',
          frames: this.anims.generateFrameNumbers('spaceshipAnimation', { frames: [ 0,1 ] }), 
            frameRate: 8 ,
            repeat: -1,
          });

      this.play('spaceshipUp'); //no se playea no se por que

      this.body.velocity.set(0, -50);

      this.scene.removeplayer();
    }

    endlevel(){this.scene.end(true);} //se usa para una delayed call

   
  }