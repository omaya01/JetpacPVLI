
 export default class Menu extends Phaser.Scene {

   

    constructor(){
        super({ key: 'menu' });
        {

        };
    }

    preload(){
        this.easy=this.add.image(this.scale.width/2,this.scale.height/4,'easy').setInteractive().setScale(0.5);
        this.medium=this.add.image(this.scale.width/2,this.scale.height/2,'medium').setInteractive().setScale(0.5);
        this.hard=this.add.image(this.scale.width/2,this.scale.height/1.3,'hard').setInteractive().setScale(0.5);
    }
    create(){ //botones de los niveles
        this.easy.on('pointerdown', function (event) { 
            this.scene.start('level',{nivel:1, combustible:1, aliens: 3, vidas:3, puntuacion:0});
          }, this);
        this.medium.on('pointerdown', function (event) { 
            
            this.scene.start('level',{nivel:2, combustible:2, aliens: 2, vidas:3, puntuacion:0});
          }, this);
        this.hard.on('pointerdown', function (event) { 
            this.scene.start('level',{nivel:3, combustible:3, aliens: 1, vidas:3, puntuacion:0});
          }, this);
    }


}