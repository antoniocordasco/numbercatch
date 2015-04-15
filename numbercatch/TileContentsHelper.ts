/// <reference path="references.ts" />

module Numbercatch {

    export class TileContentsHelper {

        private static ops = ['+', '-', '*', '/'];


        public static getContentsArray(width, height) {

            var safe = 0; // this is just to prevent infinite loops, even if ideally they shouldn't happen

            var ret =[];
            for(var i=0; i<width; i++) {
                ret[i] = [];
                for(var ii=0; ii<height; ii++) {
                    ret[i][ii] = false;
                }
            }

            var allElems = TileContentsHelper.getAllElementsArray(width, height);

            for(var i=0; i<allElems.length; i++) {
                var rPos = TileContentsHelper.getRandonPos(width, height);
                while(ret[rPos.x][rPos.y] && safe<10000) {
                    safe++;
                    rPos = TileContentsHelper.getRandonPos(width, height);
                }
                ret[rPos.x][rPos.y] = allElems[i];
            }
            return ret;
        }

        public static getRandonPos(width, height) {
            return {'x': Math.floor((Math.random() * width-1) + 1), 'y': Math.floor((Math.random() * height-1) + 1)};
        }

        private static getRandomNumber() {
            return Math.floor(Math.random() * 10);
        }
        private static getRandomOp() {
            return TileContentsHelper.ops[Math.floor((Math.random() * 3) + 1)];
        }
        private static getAllElementsArray(width, height) {
            var total = width*height;

            var nNumbers = Math.ceil(total * .3);
            var nOps = Math.ceil(total * .15);
            var nWalls = Math.ceil(total * .2);

            var ret = [];
            for(var i=0; i<nNumbers; i++) {
                ret[ret.length] = TileContentsHelper.getRandomNumber();
            }
            for(var i=0; i<nOps; i++) {
                ret[ret.length] = TileContentsHelper.getRandomOp();
            }
            for(var i=0; i<nWalls; i++) {
                ret[ret.length] = '#'; // # marks a wall
            }
            return ret;
        }
    };
}

