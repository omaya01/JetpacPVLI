
 export default class Menu extends Phaser.Scene {

   

    constructor(){
        super({ key: 'menu' });
        {

        };
    }

    /**
     * Crea lo que se ve en el menú: fondo y objetos.
     */
    preload(){

        //this.add.image(0, this.scale.height, 'menuWallpaper')
        //.setOrigin(0, 1);
        this.easy=this.add.image(this.scale.width/2,this.scale.height-150,'easy').setInteractive().setScale(0.5);
        this.medium=this.add.image(this.scale.width/2,this.scale.height-100,'medium').setInteractive().setScale(0.5);
        this.hard=this.add.image(this.scale.width/2,this.scale.height-50,'hard').setInteractive().setScale(0.5);
        
    }
    create(){
        this.easy.on('pointerdown', function (event) { 
            this.scene.start('level',{combustible:2, meteoros: 2});
          }, this);
        this.medium.on('pointerdown', function (event) { 
            
            this.scene.start('level',{combustible:3, meteoros: 1});
          }, this);
        this.hard.on('pointerdown', function (event) { 
            this.scene.start('level',{combustible:5, meteoros: 0.5});
          }, this);
    }


}