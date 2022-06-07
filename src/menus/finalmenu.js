
 export default class FinalMenu extends Phaser.Scene {

   

    constructor(){
        super({ key: 'finalmenu' });
        {
            this.score;
            this.vic;
        };
    }

    init(data){
        this.vic = data.vic;
        this.score = data.score;
    }

    preload(){

        if(this.vic) this.add.text(this.scale.width/8,this.scale.height/3, "VICTORY!!!!");
        else this.add.text(this.scale.width/8,this.scale.height/3,"DEFEAT!!!!");

        this.add.text(this.scale.width/8,this.scale.height/2,"Final Score:  " + this.score);

        this.ok=this.add.image(this.scale.width/2,this.scale.height/1.3,'continue').setInteractive().setScale(0.5);
        
    }
    create(){
        this.ok.on('pointerdown', function (event) { 
            this.scene.start('menu');
          }, this);
    }


}