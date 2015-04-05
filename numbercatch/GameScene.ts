/// <reference path="references.ts" />

module Numbercatch {
    export class GameScene extends Phaser.State{
        private tiles;
        public cells;

        private beings = [];


        preload() {
            this.load.image('cell', 'assets/images/cell.png');
            this.load.image('tile', 'assets/images/hexagon.png');
            this.load.image('character1', 'assets/images/character1.png');
            this.load.image('ghost1', 'assets/images/ghost1.png');

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

            this.beings[0] = new Character(this, 0, 0, this);
            this.attemptMoveBeingTo(3, 3, false, this.getCharacter());

            this.beings[1] = new Ghost(this, 0, 0, this);
            this.beings[2] = new Ghost(this, 0, 0, this);
            this.beings[3] = new Ghost(this, 0, 0, this);
            this.attemptMoveBeingTo(2, 5, false, this.beings[1]);
            this.attemptMoveBeingTo(4, 7, false, this.beings[2]);
            this.attemptMoveBeingTo(1, 1, false, this.beings[3]);




            this.cells = new CellsGroup(this, ['2', '+', false, '+', '5', '-', false], 10);
            this.cells.x = 100;
            this.cells.y = 500;

            this.add.existing(this.cells);


        }

        public grabElement(x, y) {
            var content = this.tiles[x][y].getContent();
            this.tiles[x][y].setContent(false);
            this.cells.fillFirstEmptyCell(content);
            if(this.cells.isEquationComplete()) {

                var cells = this.cells;

                require(['mathjs'], function (math) {
                    // use math.js
                    if(math.eval(cells.getEquationLeftString()) == cells.getExpectedResult()) {
                        alert('you win!');
                    } else {
                        alert('try again');
                    }
                });


            }
        }


        public attemptMoveBeingTo(x, y, checkAdiacent, being) {

            console.log(being);
            if(checkAdiacent) {
                var oldX = parseInt(being.coordinateX);
                var oldY = parseInt(being.coordinateY);
            } else {
                var oldX = -1;
                var oldY = -1;
            }


            if(!checkAdiacent || this.tiles[oldX][oldY].isAdiacent(x, y)) {
                this.tiles[x][y].addCharacter(being);
                return true;
            } else if(x == oldX && y == oldY) {
                this.grabElement(x, y); // if you click on the same tile the character is on, then you don't move but you grab the element from it
            }
            return false;
        }

        public getCharacter() {
            for(var k in this.beings) {
                if(this.beings[k].beingType == Being.BEING_TYPE_CHARACTER) {
                    return this.beings[k];
                }
            }
            return false;
        }

        public getTile(x, y) {
            return (typeof this.tiles[x] != 'undefined' && typeof this.tiles[x][y] != 'undefined') ? this.tiles[x][y] : false;
        }
    }
}