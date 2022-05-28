import Boot from './boot.js';
import Menu from './menus/Menu.js';
import Level from './level.js';
import FinalMenu from './menus/finalmenu.js'

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
        scene: [ Boot, Menu , Level , FinalMenu],
        physics:{
            default: 'arcade',
            arcade:{
                gravity: {y:400},
                debug:false
            }
        }
    };

    new Phaser.Game(config);
};