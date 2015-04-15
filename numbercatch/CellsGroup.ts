/// <reference path="references.ts" />

module Numbercatch {

    export class CellsGroup extends Phaser.Group{

        private leftCells = [];
        private rightCells = [];

        public constructor(gameScene, leftCellContents, rightCellContents) {
            super(gameScene);

            var tmp = 0;
            for(var k in leftCellContents) {
                var cell = new Cell(gameScene, leftCellContents[k]);

                cell.x = tmp;
                tmp += cell.width;
                this.add(cell);
                this.leftCells[this.leftCells.length] = cell;
            }

            var cell = new Cell(gameScene, '=');
            cell.x = tmp;
            tmp += cell.width;
            this.add(cell);

            for(var k in rightCellContents) {
                var cell = new Cell(gameScene, rightCellContents[k]);

                cell.x = tmp;
                tmp += cell.width;
                this.add(cell);
                this.rightCells[this.rightCells.length] = cell;
            }
        }

        fillFirstEmptyCell(content) {
            for(var k in this.leftCells) {
                if(!this.leftCells[k].content) {
                    this.leftCells[k].setContent(content);
                    return;
                }
            }
        }

        isEquationComplete() {
            for(var k in this.leftCells) {
                if(!this.leftCells[k].content) {
                    return false;
                }
            }
            return true;
        }

        getEquationString(equationPart) {
            var ret = '';
            if(equationPart == 'left') {
                for(var k in this.leftCells) {
                    if(this.leftCells[k].content) {
                        ret += this.leftCells[k].content;
                    }
                }
            } else if(equationPart == 'right') {
                for(var k in this.rightCells) {
                    if(this.rightCells[k].content) {
                        ret += this.rightCells[k].content;
                    }
                }
            }
            return ret;
        }
    }
}