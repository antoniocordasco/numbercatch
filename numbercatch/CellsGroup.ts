/// <reference path="references.ts" />

module Numbercatch {

    export class CellsGroup extends Phaser.Group{

        private leftCells = [];
        private result;

        public constructor(gameScene, cellContents, result) {
            super(gameScene);
            this.result = result;


            var tmp = 0;
            for(var k in cellContents) {
                var cell = new Cell(gameScene, cellContents[k]);

                cell.x = tmp;
                tmp += cell.width;
                this.add(cell);
                this.leftCells[this.leftCells.length] = cell;
            }


            var cell = new Cell(gameScene, '=');
            cell.x = tmp;
            tmp += cell.width;
            this.add(cell);


            var cell = new Cell(gameScene, result);
            cell.x = tmp;
            tmp += cell.width;
            this.add(cell);

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

        getEquationLeftString() {

            var ret = '';
            for(var k in this.leftCells) {
                if(this.leftCells[k].content) {
                    ret += this.leftCells[k].content;
                }
            }
            return ret;
        }


        getExpectedResult() {

            return this.result;
        }

    }

}