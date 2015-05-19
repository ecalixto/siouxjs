module siouxjs.ui {
    "use strict";

    export class SXBitmap extends createjs.Bitmap {

        private _width: number;
        private _bWidthSetBeforeOnLoad: boolean
        private _height: number;
        private _bHeightSetBeforeOnLoad: boolean

        private _bOnLoad: boolean; // True quando OnLoad já foi distarado

        private _bScaleTextura: boolean;

        /*
            bScaleTextura - setar para TRUE se é para utilizar 1x, 2x
        */
        constructor(imageOrUrl: HTMLImageElement, bScaleTextura?: boolean);
        constructor(imageOrUrl: HTMLCanvasElement, bScaleTextura?: boolean);
        constructor(imageOrUrl: HTMLVideoElement, bScaleTextura?: boolean);
        constructor(imageOrUrl: string, bScaleTextura?: boolean);
        constructor(imageOrUrl: any, bScaleTextura: boolean = true) {

            // ScaleTexture: muda o path para SCALEx correspondente
            if (typeof imageOrUrl === "string") {
                imageOrUrl = imageOrUrl.replace("@x", siouxjs.App.Settings.appScaleTexture + "x");
            }

            super(imageOrUrl);

            this._bScaleTextura = bScaleTextura;

            switch (typeof imageOrUrl) {
                case "string":
                    //
                    this._bOnLoad = false;
                    this._bWidthSetBeforeOnLoad = this._bHeightSetBeforeOnLoad = false;

                    var that = this;
                    this.image.onload = function () {

                        // Trata WIDTH e HEIGHT separado por que pode ser sido configura apenas 1 destes itens

                        // Verifica se WIDTH foi setado antes do evento OnLoad
                        if (that._bWidthSetBeforeOnLoad) {
                            // Precisa configurar o Width da Imagem
                            that.widthDo();
                        } else {
                            that.scaleTextureX = that.scaleX;
                        }

                        // Height foi setado antes do onLoad
                        if (that._bHeightSetBeforeOnLoad) {
                            that.heightDo();
                        } else {
                            that.scaleTextureY = that.scaleY;
                        }

                        that._bOnLoad = true;

                        // Chama função onLoad que pode ser configura pelo usuário obj.onLoad
                        that.onLoad();
                    };
                    break;

                default:
                    this.scaleTextureY = this.scaleY;
                    this.scaleTextureX = this.scaleX;

                    break;


            }
        }

        public onLoad(): void {
        }

        get width(): number {
            return this._width;
        }
        set width(value: number) {
            this._width = value;

            // Flag para saber se foi configurado antes do ONLOAD da imagem
            if (this._bOnLoad) {
                this.widthDo();
            } else {
                this._bWidthSetBeforeOnLoad = true;
            }
        }
        private widthDo(): void {
            this.scaleX = this._width / this.image.naturalWidth;

            this.setBounds(this.getBounds().x, this.getBounds().y, this._width, this._height);
        }

        get height(): number {
             return this._height;
        }
        set height(value: number) {
            this._height = value;

            // Flag para saber se foi configurado antes do ONLOAD da imagem
            if (this._bOnLoad) {
                this.heightDo();
            } else {
                this._bHeightSetBeforeOnLoad = true;
            }

        }
        private heightDo(): void {
            this.scaleY = this._height / this.image.naturalHeight;

            this.setBounds(this.getBounds().x, this.getBounds().y, this._width, this._height);
        }

        public set scaleTextureX(value: number) {
            if (this._bScaleTextura) {
                this.scaleX = value / siouxjs.App.Settings.appScaleTexture;
            } else {
                this.scaleX = value;
            }
            this._width = this.scaleX * this.image.naturalWidth;

            this.setBounds(this.getBounds().x, this.getBounds().y, this._width, this._height);
        }
        public get scaleTextureX(): number {
            if (this._bScaleTextura) {
                return this.scaleX * siouxjs.App.Settings.appScaleTexture;
            } else {
                return this.scaleX;
            }
        }

        public set scaleTextureY(value: number) {
            if (this._bScaleTextura) {
                this.scaleY = value / siouxjs.App.Settings.appScaleTexture;
            } else {
                this.scaleY = value;
            }

            this._height = this.scaleY * this.image.naturalHeight;

            this.setBounds(this.getBounds().x, this.getBounds().y, this._width, this._height);
        }
        public get scaleTextureY(): number {
            if (this._bScaleTextura) {
                return this.scaleY * siouxjs.App.Settings.appScaleTexture;
            } else {
                return this.scaleY;
            }
        }
    }
}