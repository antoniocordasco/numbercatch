/// <reference path="references.ts" />

require.config({
    paths: {
        mathjs: 'vendor/mathjs/math'
    }
});
module Numbercatch {

    export class Game extends Phaser.Game{


        constructor() {
            super(1024, 768, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });



        }


        preload() {
            var gameScene = new GameScene();
            this.state.add("GameScene", gameScene);
        }
        create() {
            this.state.start("GameScene");
        }


    };
}



window['game'] = new Numbercatch.Game();

