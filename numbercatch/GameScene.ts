/// <reference path="references.ts" />

module Numbercatch {
    export class GameScene extends Phaser.State{
        private tiles;
        public cells;

        private beings = [];
        public matrixWidth = 9;
        public matrixHeight = 13;


        preload() {
            this.load.image('cell', 'assets/images/cell.png');
            this.load.image('floor', 'assets/images/hexagon.png');
            this.load.image('wall', 'assets/images/hexagon2.png');
            this.load.image('character1', 'assets/images/character1.png');
            this.load.image('ghost1', 'assets/images/ghost1.png');

        }


        create() {
            this.stage.backgroundColor = '#eeeeee';


            var contents = TileContentsHelper.getContentsArray(this.matrixWidth, this.matrixHeight);

            this.tiles = [];
            for (var i=0; i<this.matrixWidth; i++) {
                this.tiles[i] = [];

                for (var ii=0; ii<this.matrixHeight; ii++) {
                    if(contents[i][ii] != '#') {
                        var tile = new Tile(this, contents[i][ii], Tile.TILE_TYPE_FLOOR);
                    } else {
                        var tile = new Tile(this, '', Tile.TILE_TYPE_WALL);
                    }
                    tile.setCoordinatesAndPosition(i, ii);

                    this.add.existing(tile);
                    this.tiles[i][ii] = tile;
                }
            }


            this.generateAndPlaceBeings(1, Being.BEING_TYPE_CHARACTER);
            this.generateAndPlaceBeings(3, Being.BEING_TYPE_GHOST);

            this.cells = new CellsGroup(this, ['2', '+', false, '+', '5', '-', false], ['10']);
            this.cells.x = 100;
            this.cells.y = 500;

            this.add.existing(this.cells);
        }

        // creates a few ghosts and places them on floor tiles
        private generateAndPlaceBeings(numberOfBeings, beingType) {
            for(var i=0; i<numberOfBeings; i++) {
                var pos = {'x': -1, 'y': -1};
                while(pos.x<0 || pos.y<0 || this.getTile(pos.x, pos.y).tileType != Tile.TILE_TYPE_FLOOR) {
                    var pos = TileContentsHelper.getRandonPos(this.matrixWidth, this.matrixHeight);
                }
                if(beingType == Being.BEING_TYPE_GHOST) {
                    this.beings[this.beings.length] = new Ghost(this, 0, 0, this);
                } else {
                    this.beings[this.beings.length] = new Character(this, 0, 0, this);
                }
                this.attemptMoveBeingTo(pos.x, pos.y, false, this.beings[this.beings.length-1]);
            }
        }



        public grabElement(x, y) {
            var content = this.tiles[x][y].getContent();
            this.tiles[x][y].setContent(false);
            this.cells.fillFirstEmptyCell(content);
            if(this.cells.isEquationComplete()) {

                var cells = this.cells;

                require(['mathjs'], function (math) {
                    // use math.js
                    if(math.eval(cells.getEquationString('left')) == math.eval(cells.getEquationString('right'))) {
                        alert('you win!');
                    } else {
                        alert('try again');
                    }
                });


            }
        }


        public attemptMoveBeingTo(x, y, checkAdiacent, being) {

        //    console.log(being);
            if(checkAdiacent) {
                var oldX = parseInt(being.coordinateX);
                var oldY = parseInt(being.coordinateY);
            } else {
                var oldX = -1;
                var oldY = -1;
            }


            if(!checkAdiacent || this.tiles[oldX][oldY].isAdiacent(x, y)) {
                if(this.tiles[x][y].tileType == Tile.TILE_TYPE_FLOOR) {
                    this.tiles[x][y].addCharacter(being);
                    return true;
                }
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
        public getGhosts() {
            var ret = [];
            for(var k in this.beings) {
                if(this.beings[k].beingType == Being.BEING_TYPE_GHOST) {
                    ret[ret.length] = this.beings[k];
                }
            }
            return ret;
        }

        public getTile(x, y) {
            return (typeof this.tiles[x] != 'undefined' && typeof this.tiles[x][y] != 'undefined') ? this.tiles[x][y] : false;
        }
    }
}