module siouxjs {
    export enum OrientationTipo { Portait = 1, Landscape = 2 };

    export class Orientation extends createjs.Container {

        private _imgOrientation: createjs.Bitmap;

        constructor() {
            super();

            if (Config.nOrientation == OrientationTipo.Landscape) {
                this._imgOrientation = new createjs.Bitmap(Config.sPathGlobal + 'assets/theme/img/landscape.png');
            } else {
                this._imgOrientation = new createjs.Bitmap(Config.sPathGlobal + 'assets/theme/img/portait.png');
            }
            this.addChild(this._imgOrientation);

            var that = this; // para ter o objeto na função onload

            this._imgOrientation.image.onload = function () {
                that._imgOrientation.x = (siouxjs.App.Settings.appSizeGuide.width - this.width) * 0.5;
                that._imgOrientation.y = (siouxjs.App.Settings.appSizeGuide.height - this.height) * 0.5;
            }

            this.visible = false;

        }

        /*
        * retorna TRUE se estiver na posição correta e FALSE se não estiver colocando a msg para o usuário
        */
        public checkOrientation(): boolean {

            if (!this.testOrientation()) {

                this.visible = true;

                this.addEventListener('tick', this.tickOrientation);

                return false
            }

            return true
        }

        private testOrientation(): boolean {

            if (Config.nOrientation == OrientationTipo.Landscape) {
                if (window.innerHeight > window.innerWidth) {
                    return false
                }
            } else {
                if (window.innerHeight < window.innerWidth) {
                    return false
                }
            }
            return true
        }

        // Check Orientation
        private tickOrientation = (event): void => {

            if (this.checkOrientation()) {
                createjs.Ticker.removeEventListener('tick', this.tickOrientation);

                this.visible = false;
            }
        }
    }
}