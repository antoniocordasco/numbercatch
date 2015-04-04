/// <reference path="references.ts" />

module Numbercatch {

    export class TileSprite extends Phaser.Sprite{

        coordinateX;
        coordinateY;


        public constructor(game, x, y) {
            super(game, x, y);
            Phaser.Sprite.call(this, game, x, y, 'tile');
            this.anchor.setTo(.5,.5);


        }



    };
}

