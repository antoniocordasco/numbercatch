/// <reference path="references.ts" />

module Numbercatch {

    export class Tile extends Phaser.Group{
        content;
        coordinateX;
        coordinateY;
        public tileImage;

        public static scaleMultiplier = .3;

        public constructor(game, content) {
            super(game);
            this.content = content;

            this.tileImage = new TileSprite(game, 0, 0);
            this.add(this.tileImage);

            this.tileImage.inputEnabled = true;
            this.tileImage.events.onInputDown.add(() => {
                game.moveCharacterTo(this.coordinateX, this.coordinateY);
            }, this);

            if(content) {
                var bmpText = game.add.text(0, 0, this.content, { font: "65px Arial", fill: "#ff0044", align: "center" });
                bmpText.anchor.setTo(.5,.5);
                this.add(bmpText);
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
        }

        public getPositionFromCoordinates(x, y) {
            return {'x': x*this.width*1.5 + ((y%2 == 0) ? (this.width/2) : (this.width/2)*2.5), 'y': (y +1)*(this.height/2)};
        }

        getCloseTileCoordinates(direction) {
            var ret = {};
            if(direction == 'top') {
                ret = {'x': this.coordinateX, 'y': this.coordinateY-2};
            } else if(direction == 'topRight') {
                var tmp = ((this.coordinateX%2 == 0) ? 0 : 1);
                ret = {'x': this.coordinateX+tmp, 'y': this.coordinateY-1};
            } else if(direction == 'bottomRight') {
                var tmp = ((this.coordinateX%2 == 0) ? 0 : 1);
                ret = {'x': this.coordinateX+tmp, 'y': this.coordinateY+1};
            } else if(direction == 'bottom') {
                ret = {'x': this.coordinateX, 'y': this.coordinateY+2};
            } else if(direction == 'bottomLeft') {
                var tmp = ((this.coordinateX%2 == 0) ? -1 : 0);
                ret = {'x': this.coordinateX+tmp, 'y': this.coordinateY-1};
            } else if(direction == 'topLeft') {
                var tmp = ((this.coordinateX%2 == 0) ? -1 : 0);
                ret = {'x': this.coordinateX+tmp, 'y': this.coordinateY+1};
            }
            return ret;
        }




        public setContent(c) {
            this.content = c;
        }
        public getContent() {
            return this.content;
        }



    };
}

