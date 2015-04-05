/// <reference path="references.ts" />

module Numbercatch {

    export class Tile extends Phaser.Group{
        content;
        bmpText;
        coordinateX;
        coordinateY;
        public tileImage;

        public static scaleMultiplier = .3;

        public constructor(gameScene, content) {
            super(gameScene);
            this.content = content;

            this.tileImage = new TileSprite(gameScene, 0, 0);
            this.add(this.tileImage);

            this.tileImage.inputEnabled = true;
            this.tileImage.events.onInputDown.add(() => {
                gameScene.attemptMoveBeingTo(this.coordinateX, this.coordinateY, true, gameScene.getCharacter());
            }, this);

            if(content) {
                this.bmpText = gameScene.add.text(0, 0, this.content, { font: "65px Arial", fill: "#ff0044", align: "center" });
                this.bmpText.anchor.setTo(.5,.5);
                this.add(this.bmpText);
            }

            this.scale.x = Tile.scaleMultiplier;
            this.scale.y = Tile.scaleMultiplier;
        }

        setCoordinatesAndPosition(x, y) {
            this.coordinateX = x;
            this.coordinateY = y;
            var pos = this.getPositionFromCoordinates(x, y);
            this.x = pos.x;
            this.y = pos.y;
        }

        public addCharacter(character) {
            this.add(character);
            character.setCoordinates(this.coordinateX, this.coordinateY);
        }

        public getPositionFromCoordinates(x, y) {
            return {'x': x*this.width*1.5 + ((y%2 == 0) ? (this.width/2) : (this.width/2)*2.5), 'y': (y +1)*(this.height/2)};
        }

        getCloseTileCoordinates(direction) {
            var ret = this.getCloseTilesCoordinates();

            if(ret[direction]) {
                return ret[direction];
            } else {
                return false;
            }
        }

        getCloseTilesCoordinates() {
            var ret = [];
            ret['top'] = {'x': this.coordinateX, 'y': this.coordinateY-2};
            ret['bottom'] = {'x': this.coordinateX, 'y': this.coordinateY+2};

            if(this.coordinateX%2 == 0 && this.coordinateY%2 == 0) {
                ret['topRight'] = {'x': this.coordinateX, 'y': this.coordinateY-1};
                ret['bottomRight'] = {'x': this.coordinateX, 'y': this.coordinateY+1};
                ret['bottomLeft'] = {'x': this.coordinateX-1, 'y': this.coordinateY+1};
                ret['topLeft'] = {'x': this.coordinateX-1, 'y': this.coordinateY-1};
            } else if(this.coordinateX%2 == 0 && this.coordinateY%2 == 1) {
                ret['topRight'] = {'x': this.coordinateX+1, 'y': this.coordinateY-1};
                ret['bottomRight'] = {'x': this.coordinateX+1, 'y': this.coordinateY+1};
                ret['bottomLeft'] = {'x': this.coordinateX, 'y': this.coordinateY+1};
                ret['topLeft'] = {'x': this.coordinateX, 'y': this.coordinateY-1};
            } else if(this.coordinateX%2 == 1 && this.coordinateY%2 == 0) {
                ret['topRight'] = {'x': this.coordinateX, 'y': this.coordinateY-1};
                ret['bottomRight'] = {'x': this.coordinateX, 'y': this.coordinateY+1};
                ret['bottomLeft'] = {'x': this.coordinateX-1, 'y': this.coordinateY+1};
                ret['topLeft'] = {'x': this.coordinateX-1, 'y': this.coordinateY-1};
            } else if(this.coordinateX%2 == 1 && this.coordinateY%2 == 1) {
                ret['topRight'] = {'x': this.coordinateX+1, 'y': this.coordinateY-1};
                ret['bottomRight'] = {'x': this.coordinateX+1, 'y': this.coordinateY+1};
                ret['bottomLeft'] = {'x': this.coordinateX, 'y': this.coordinateY+1};
                ret['topLeft'] = {'x': this.coordinateX, 'y': this.coordinateY-1};
            }
            return ret;
        }

        isAdiacent(x, y) {
            var ret = this.getCloseTilesCoordinates();
            console.log('x:'+x + ', y:' + y)
            for(var key in ret) {
                if(ret[key].x == x && ret[key].y == y) {
                    return true;
                }
            }
            return false;
        }




        public setContent(c) {
            this.content = c;
            if(c) {
                this.bmpText.text = c;
            } else {
                this.bmpText.text = '';
            }
        }
        public getContent() {
            return this.content;
        }



    };
}

