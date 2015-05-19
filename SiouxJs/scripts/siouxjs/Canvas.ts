/// <reference path="../typings/createjs/createjs.d.ts" />

module siouxjs {
    "use strict";

    export class Canvas {

        public static zIndex: number = 1;
        public static lastCanvas: string;

        private _nextCanvas: string;
        private _stage: createjs.Stage;
        private _nUpdate: number;

        get updateCount(): number {
            return Math.floor(this._nUpdate / Config.nFPS);
        }
        set updateCount(value: number) {
            this._nUpdate = value * Config.nFPS;
        }

        get nextCanvas(): Canvas {
            return siouxjs.App.canvas[this._nextCanvas];
        }

        get stage(): createjs.Stage {
            return this._stage;
        }

        set Touch(value: boolean) {
            if (value) {
                createjs.Touch.enable(this._stage);
            }
            /*
            // uncomment this lines and a createjs error will occur
            else {
                createjs.Touch.disable(this._stage);
            }
            */
        }

        constructor(public idCanvas: string, updatecount: number = -1) {

            var objCanvas = document.createElement("canvas");
            objCanvas.id = idCanvas;
            document.body.appendChild(objCanvas);

            objCanvas.style.zIndex = (Canvas.zIndex++ * 100).toString();

            this.updateCount = updatecount;
            var canvas = document.getElementById(this.idCanvas);
            //this._stage = new createjs.Stage(canvas);
            this._stage = new createjs.Stage(<HTMLCanvasElement>canvas);

            this.Touch = util.Browser.isMobile();
            this._stage.enableMouseOver(util.Browser.isMobile() ? 0 : Math.round(Config.nFPS / 3));
        }

        public update(bForce: boolean = false): void {

            // force the update
            if (bForce) {
                this._stage.update();
                return;
            }

            // zero means no update must be done
            if (this._nUpdate === 0) {
                return;
            }

            // a negative number means always update
            if (this._nUpdate < 0) {
                this._stage.update();
                return;
            }

            // update while is greater than zero
            if (this._nUpdate-- > 0) {
                this._stage.update();
                return;
            }
        }
 
        public doResize(): void {
            this._stage.x = siouxjs.App.Settings.appLeftOffset;
            this._stage.y = siouxjs.App.Settings.appTopOffset;

            this._stage.scaleX = this._stage.scaleY = siouxjs.App.Settings.appScale;

            this._stage.canvas.width = siouxjs.App.Settings.deviceSize.width;
            this._stage.canvas.height = siouxjs.App.Settings.deviceSize.height;

            document.getElementById(this.idCanvas).style.width = (siouxjs.App.Settings.deviceSize.width / window.devicePixelRatio).toString() + "px";
            document.getElementById(this.idCanvas).style.height = (siouxjs.App.Settings.deviceSize.height / window.devicePixelRatio).toString() + "px";
            this.stage.update();
        }

        public mouseX(): number {
            return siouxjs.mouseX(this._stage);
        }
        public mouseY(): number {
            return siouxjs.mouseY(this._stage);
        }
    }
}
