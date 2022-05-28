
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

    /**
     * Crea lo que se ve en el menú: fondo y objetos.
     */
    preload(){

        if(this.vic) this.add.text(this.scale.width/2-100,this.scale.height-150, "VICTORY!!!!");
        else this.add.text(this.scale.width/2-100,this.scale.height-150,"DEFEAT!!!!");

        this.add.text(this.scale.width/2-100,this.scale.height-100,"Final Score:  " + this.score);

        this.ok=this.add.image(this.scale.width/2,this.scale.height-50,'continue').setInteractive().setScale(0.5);
        
    }
    create(){
        this.ok.on('pointerdown', function (event) { 
            this.scene.start('menu');
          }, this);
    }


}