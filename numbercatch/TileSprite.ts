/// <reference path="references.ts" />

module Numbercatch {

    export class TileSprite extends Phaser.Sprite{

        coordinateX;
        coordinateY;


        public constructor(game, x, y, type) {
            super(game, x, y);
            Phaser.Sprite.call(this, game, x, y, type);
            this.anchor.setTo(.5,.5);


        }



    };
}

