/// <reference path="references.ts" />

module Numbercatch {
    export class Ghost extends Being{
        coordinateX;
        coordinateY;

        public constructor(game, x, y, gameScene) {
            super(game, x, y, gameScene);
            this.beingType = Being.BEING_TYPE_GHOST;

            Phaser.Sprite.call(this, game, 0, 0, 'ghost1');
            this.anchor.setTo(.5,.5);



            var timer = this.game.time.create(false);
            timer.add(500, this.moveInRandomDirection, this);
            timer.start();
        }

        moveInRandomDirection() {
            var currentTile = this.gameScene.getTile(this.coordinateX, this.coordinateY);
            var nextTile = false;

            while(!nextTile) {
                var directionNames = [];
            //    console.log(this.coordinateX + ' | ' + this.coordinateY);
                var adiacentTilesCoordinates = currentTile.getCloseTilesCoordinates();
                for(var k in adiacentTilesCoordinates) {
                    directionNames[directionNames.length] = k;
                }
                var rnd = Math.floor(Math.random() * directionNames.length);
                var rndCoordinates = adiacentTilesCoordinates[directionNames[rnd]];
                nextTile = this.gameScene.getTile(rndCoordinates.x, rndCoordinates.y);
            }

            this.gameScene.attemptMoveBeingTo(rndCoordinates.x, rndCoordinates.y, false, this);

            var timer = this.game.time.create(false);
            timer.add(200 + Math.floor(Math.random() * 1200), this.moveInRandomDirection, this);
            timer.start();
        }


    };
}

