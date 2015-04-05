/// <reference path="references.ts" />

module Numbercatch {

    export class Cell extends Phaser.Group{
        content = false;
        gameScene;

        public constructor(gameScene, content) {
            super(gameScene);
            this.gameScene = gameScene;



            var cellImage = new Phaser.Sprite(gameScene, 0, 0, 'cell');
            cellImage.scale.x = .2;
            cellImage.scale.y = .2;
            cellImage.anchor.x = .5;
            cellImage.anchor.y = .5;
            this.add(cellImage);


            if(content) {
                this.setContent(content);
            }
        }

        public setContent(content) {
            this.content = content;
            var txt = this.gameScene.add.text(0, 0, content, { font: "32px Arial", fill: "#ff0044", align: "center" });
            txt.anchor.setTo(.5,.5);
            this.add(txt);
        }




    }

}