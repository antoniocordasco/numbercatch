/// <reference path="references.ts" />

module Numbercatch {
    export class Ghost extends Being{

        nextTile;

        public constructor(game, x, y, gameScene) {
            super(game, x, y, gameScene);
            this.beingType = Being.BEING_TYPE_GHOST;

            Phaser.Sprite.call(this, game, 0, 0, 'ghost1');
            this.anchor.setTo(.5,.5);



            var timer = this.game.time.create(false);
            timer.add(500, this.moveInRandomDirection, this);
            timer.start();
        }

        setNextMoveTile() {
            var currentTile = this.gameScene.getTile(this.coordinateX, this.coordinateY);


            var nextTile = null;

            while(!nextTile) {
                var directionNames = [];
                //    console.log(this.coordinateX + ' | ' + this.coordinateY);
                var adiacentTilesCoordinates = currentTile.getCloseTilesCoordinates();
                for (var k in adiacentTilesCoordinates) {
                    directionNames[directionNames.length] = k;
                }
                var rnd = Math.floor(Math.random() * directionNames.length);
                var rndCoordinates = adiacentTilesCoordinates[directionNames[rnd]];
                nextTile = this.gameScene.getTile(rndCoordinates.x, rndCoordinates.y);
            }
            this.nextTile = nextTile;

            nextTile.children[0].loadTexture('ghostNextTile');

        }

        moveInRandomDirection() {


            this.gameScene.attemptMoveBeingTo(this.nextTile.coordinateX, this.nextTile.coordinateY, false, this);
            this.nextTile.children[0].loadTexture('floor');
            this.setNextMoveTile();

            var timer = this.game.time.create(false);
            timer.add(400 + Math.floor(Math.random() * 2400), this.moveInRandomDirection, this);
            timer.start();
        }


    };
}

