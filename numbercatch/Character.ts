/// <reference path="references.ts" />

module Numbercatch {
    export class Character extends Being{
        coordinateX;
        coordinateY;

        public constructor(game, x, y, gameScene) {
            super(game, x, y, gameScene);
            this.beingType = Being.BEING_TYPE_CHARACTER;

            Phaser.Sprite.call(this, game, 0, 0, 'character1');
            this.anchor.setTo(.5,.5);
        }


    };
}

