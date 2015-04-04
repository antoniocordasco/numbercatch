/// <reference path="references.ts" />

module Numbercatch {
    export class GameScene extends Phaser.State{
        public tiles;
        private character;

        preload() {
            this.load.image('box', 'assets/images/wood-box.jpg');
            this.load.image('tile', 'assets/images/hexagon.png');
            this.load.image('character1', 'assets/images/character1.png');

        }


        create() {
            this.stage.backgroundColor = '#eeeeee';
            var width = 8;
            var height = 12;

            var contents = TileContentsHelper.getContentsArray(width, height);

            this.tiles = [];
            for (var i=0; i<width; i++) {
                this.tiles[i] = [];

                for (var ii=0; ii<height; ii++) {
                    var tile = new Tile(this, contents[i][ii]);
                    tile.setCoordinatesAndPosition(i, ii);

                    this.add.existing(tile);
                    this.tiles[i][ii] = tile;
                }
            }

            this.character = new Character(this, 0, 0);
            this.tiles[4][4].addCharacter(this.character);
        }

        public moveCharacterTo(x, y) {
            this.tiles[x][y].addCharacter(this.character);
        }
    }
}