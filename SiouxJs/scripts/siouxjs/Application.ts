/**
 * Provides the base Widget class...
 *
 * @module siouxjs
 */
module siouxjs {
    "use strict";

    /**
     * Base class for an application
     *
     * @class Application
     * @constructor
     */
    export class Application {

        private _canvas: ICanvasMap = {};
        protected _popups: siouxjs.PopupManager;
        protected _sceneManager: siouxjs.SceneManager;

        /**
         * Dictionary with all application's canvas
         *
         * @property canvas
         * @type {ICanvasMap}
         */
        get canvas(): ICanvasMap {
            return this._canvas;
        }

        /**
         * Manager of application's popups
         *
         * @property popups
         * @type {siouxjs.PopupManager}
         */
        get popups(): siouxjs.PopupManager {
            return this._popups;
        }

        /**
         * Manager of application's scenes
         *
         * @property sceneManager
         * @type {siouxjs.SceneManager}
         */
        get sceneManager(): siouxjs.SceneManager {
            return this._sceneManager;
        }
        
        public Settings = {
            appScale: 1,
            deviceSize: new createjs.Rectangle(), // Tamanho do Device
            appSizeGuide: new createjs.Rectangle(), // Tamanho Original do App
            appLeftOffset: 0,
            appTopOffset: 0,
            appScaleTexture: 1,
            areaUtil: new createjs.Rectangle() // Area util, varia em função de estar utilizando mascara ou não.
        };

        pause(): void {
        }

        resume(): void {
        }
        onBackKeyDown(): void {
        }

        onBeforeLoad(): LoadingBase {
            return null;

        }

        onAfterLoad(): void {
            return;
        }

        onReady(): void {
        }

        /**
         * Update all application's canvas
         *
         * @method update
         * @return none
         */
        public update(): void {
            for (var key in this._canvas) {
                this._canvas[key].update();
            }
        }

        /**
         * Add a canvas object to application
         *
         * @method setCanvas
         * @param pCanvas {Canvas} Canvas to be added
         * @return none
         */
        protected setCanvas(pCanvas: Canvas): void {
            this._canvas[pCanvas.idCanvas] = pCanvas;
        }

        public resize(): void {
            var appSize: createjs.Rectangle = new createjs.Rectangle(); // Tamanho do App

            // ATENTION: Windows do not have devicePixelRatio defined. You must calculate it.
            if (window.devicePixelRatio === undefined) {
                window.devicePixelRatio = window.screen.deviceXDPI / window.screen.logicalXDPI;
            }
            this.Settings.appSizeGuide = Config.appSizeGuide;
            appSize = this.Settings.appSizeGuide.clone();
            this.Settings.deviceSize = new createjs.Rectangle(0, 0, window.innerWidth, window.innerHeight);

            this.Settings.appScale = 1;
            this.Settings.appLeftOffset = this.Settings.appTopOffset = 0;

            // if device is wider than GUI's aspect ratio, height determines scale
            if ((this.Settings.deviceSize.width / this.Settings.deviceSize.height) > (this.Settings.appSizeGuide.width / this.Settings.appSizeGuide.height)) {
                this.Settings.appScale = this.Settings.deviceSize.height / this.Settings.appSizeGuide.height;
                appSize.width = this.Settings.appSizeGuide.width * this.Settings.appScale;
                appSize.height = this.Settings.appSizeGuide.height * this.Settings.appScale;
                this.Settings.appLeftOffset = Math.round((this.Settings.deviceSize.width - appSize.width) / 2);
            } else { // if device is taller than GUI's aspect ratio, width determines scale
                this.Settings.appScale = this.Settings.deviceSize.width / this.Settings.appSizeGuide.width;
                appSize.width = this.Settings.appSizeGuide.width * this.Settings.appScale;
                appSize.height = this.Settings.appSizeGuide.height * this.Settings.appScale;
                this.Settings.appTopOffset = Math.round((this.Settings.deviceSize.height - appSize.height) / 2);
            }

            // Sets variables with PixelRatio app.
            this.Settings.appLeftOffset = this.Settings.appLeftOffset * window.devicePixelRatio;
            this.Settings.appTopOffset = this.Settings.appTopOffset * window.devicePixelRatio;
            this.Settings.appScale = this.Settings.appScale * window.devicePixelRatio;
            this.Settings.deviceSize.width = this.Settings.deviceSize.width * window.devicePixelRatio;
            this.Settings.deviceSize.height = this.Settings.deviceSize.height * window.devicePixelRatio;

            for (var key in this._canvas) {
                this._canvas[key].doResize();
            }

            this.Settings.appLeftOffset = this.Settings.appLeftOffset / this.Settings.appScale;
            this.Settings.appTopOffset = this.Settings.appTopOffset / this.Settings.appScale;

            // Width
            var widthTotal: number = 0;
            var left: number = 0;
            // Height
            var heightTotal: number = 0;
            var top: number = 0;


            switch (Config.nAreaUtilTipo) {
                case Config.AREAUTIL.Max:
                    // Width
                    var widthTotalDevice: number = this.Settings.appSizeGuide.width + (2 * this.Settings.appLeftOffset);
                    widthTotal = Math.min(widthTotalDevice, Config.nAreaUtilWidthMax);
                    left = (this.Settings.appSizeGuide.width - widthTotal) / 2;
                    // Height
                    var heightTotalDevice: number = this.Settings.appSizeGuide.height + (2 * this.Settings.appTopOffset);
                    heightTotal = Math.min(heightTotalDevice, Config.nAreaUtilHeightMax);
                    top = (this.Settings.appSizeGuide.height - heightTotal) / 2;
                    heightTotal = heightTotal + top;
                    break;
                case Config.AREAUTIL.Device:
                    // Width
                    widthTotal = this.Settings.appSizeGuide.width + this.Settings.appLeftOffset;
                    left = - this.Settings.appLeftOffset;
                    // Height
                    heightTotal = this.Settings.appSizeGuide.height + this.Settings.appTopOffset;
                    top = - this.Settings.appTopOffset;
                    break;
                case Config.AREAUTIL.Guide:
                default:
                    // Width
                    left = 0;
                    widthTotal = this.Settings.appSizeGuide.width;
                    // Height
                    top = 0;
                    heightTotal = this.Settings.appSizeGuide.height;
                    break;
            }

            this.Settings.areaUtil = new createjs.Rectangle(left, top, widthTotal, heightTotal);

            // Fator para pegar a imagem certa
            for (var i: number = 0; i < Config.aScaleTexture.length; i++) {
                this.Settings.appScaleTexture = Config.aScaleTexture[i];

                if (this.Settings.appScale <= Config.aScaleTexture[i]) {
                    break;
                }
            }
        }
    }
}
console.log("siouxjs.Application.ts");