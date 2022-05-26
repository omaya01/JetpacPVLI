import Boot from './Boot.js';
import Menu from './Menu.js';
import Level from './level.js';

window.onload = ()=>{

    const config = {
        type: Phaser.AUTO,
        scale: {
            width: 256,
            height: 192,
            zoom: 3,
            autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY
        },
        pixelArt: true,
        scene: [ Boot, Menu , Level],
        physics:{
            default: 'arcade',
            arcade:{
                gravity: {y:400},
                debug:true
            }
        }
    };

    new Phaser.Game(config);
};