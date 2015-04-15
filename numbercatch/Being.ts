/// <reference path="references.ts" />

module Numbercatch {
    export class Being extends Phaser.Sprite{
        coordinateX;
        coordinateY;
        static BEING_TYPE_GHOST = 'ghost';
        static BEING_TYPE_CHARACTER = 'character';
        beingType;
        gameScene;

        public constructor(game, x, y, gameScene) {
            super(game, x, y);
            this.gameScene = gameScene;

        }


        setCoordinates(x, y) {
            this.coordinateX = x;
            this.coordinateY = y;
            if(this.checkCollisions()) {
                console.log('collision!');
            }
        }

        checkCollisions() {
            if(this.beingType == Being.BEING_TYPE_CHARACTER) {
                var ghosts = this.gameScene.getGhosts();
                for(var k in ghosts) {
                   if(this.collidesWith(ghosts[k])) {
                        return true;
                   }
                }
            } else if(this.beingType == Being.BEING_TYPE_GHOST) {
                var character = this.gameScene.getCharacter();
                if(this.collidesWith(character)) {
                    return true;
                }
            }
            return false;
        }

        collidesWith(being) {
            return (this.coordinateX == being.coordinateX && this.coordinateY == being.coordinateY);
        }


    };
}

