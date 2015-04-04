/// <reference path="references.ts" />

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



new Numbercatch.Game();

