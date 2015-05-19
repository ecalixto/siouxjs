module siouxjs.ui {
    "use strict";

    export class Scale3Bitmap extends createjs.DisplayObject {

        private _nX1: number;
        private _nX2: number;
        private _drawWidth: number;
        private _drawHeight: number;
        private _appScaleTexture: number;

        public image: any; // Image or HTMLCanvasElement or HTMLVideoElement

        /**
         *   Cria imagens 9 grid
         *   
         *   @param {image} imageOrUri Image base para a imagem 9Grid
         *   @param {number} nX1 
         *   @param {number} nX2 
         *   @param {boolean} bScaleTextura se for TRUE, ser� aplicado 1x, 2x, etc. na imagem
         */
        constructor(imageOrUri: any, nX1:number, nX2:number, bScaleTextura: boolean = true) {
            super();

            if (typeof imageOrUri === "string") {
                this.image = new Image();
                // ScaleTexture: Controle para pegar a imagem correta 1x, 2x, etc.
                this.image.src = imageOrUri.replace("@x", siouxjs.App.Settings.appScaleTexture + "x");
            } else {
                this.image = imageOrUri;
            }

            // ScaleTexture: Verifica se deve tratar 1x, 2x, etc.
            if (!bScaleTextura) {
                this._nX1 = nX1;
                this._nX2 = nX2;
                this._appScaleTexture = 1;
            } else {
                this._nX1 = nX1 * siouxjs.App.Settings.appScaleTexture
                this._nX2 = nX2 * siouxjs.App.Settings.appScaleTexture
                this._appScaleTexture = siouxjs.App.Settings.appScaleTexture;
            }

            this._drawWidth = this.image.naturalWidth / this._appScaleTexture;
            this._drawHeight = this.image.naturalHeight / this._appScaleTexture;
        }

        /**
         * Changes the dimensions used the draw the ScaleBitmap.
         * 
         * @method setDrawSize
         * @param {Number} newWidth The new width of the drawn ScaleBitmap.
         * @param {Number} newHeight The new height of the drawn ScaleBitmap.
         */
        public setDrawSize(newWidth: number) {
            this._drawWidth = newWidth;

            this.setBounds(this.x, this.y, newWidth, this._drawHeight);
        }

        /**
         * Desenha
         * 
         * @method draw
         * @param {CanvasRenderingContext2D} ctx 
         * @param {boolean} ignoreCache 
         */
        public draw(ctx: CanvasRenderingContext2D, ignoreCache?: boolean): boolean {
            // if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }

            var adjustVal = 0;

            if (this.stage.scaleX > 0 || this.stage.scaleY > 0) {
                adjustVal = 1;
            }
            var top = 0;
            var STtop = top / this._appScaleTexture;

            var bottom = this.image.naturalHeight;
            var STbottom = bottom / this._appScaleTexture;

            var centerX = this._nX2 - this._nX1;
            
            var left = this._nX1;
            var STleft = left / this._appScaleTexture;

            
            var right = this.image.naturalWidth - centerX - left;
            var STright = right / this._appScaleTexture;
            
            var scaledCenterX = this._drawWidth - STleft - STright;

            //ctx.drawImage(this.image, 0, 0, left, top, 0, 0, STleft, STtop);
            //ctx.drawImage(this.image, left, 0, centerX, top, STleft, 0, scaledCenterX, STtop);
            //ctx.drawImage(this.image, left + centerX, 0, right, top, STleft + scaledCenterX, 0, STright, STtop);

            ctx.drawImage(this.image, 0, top, left, bottom, 0, STtop, STleft, STbottom);
            ctx.drawImage(this.image, left, top, this._nX2, bottom, STleft - adjustVal, STtop, scaledCenterX, STbottom);
            ctx.drawImage(this.image, this._nX2, top, right, bottom, STleft + scaledCenterX - (adjustVal*2), STtop, STright, STbottom);

            //ctx.drawImage(this.image, 0, top + centerY, left, bottom, 0, STtop + scaledCenterY, STleft, STbottom);
            //ctx.drawImage(this.image, left, top + centerY, centerX, bottom, STleft, STtop + scaledCenterY, scaledCenterX, STbottom);
            //ctx.drawImage(this.image, left + centerX, top + centerY, right, bottom, STleft + scaledCenterX, STtop + scaledCenterY, STright, STbottom);

            return true;
        }

        /**
         * Retorna o texto
         * 
         * @method toString
         */
        public toString(): string {
            return "[ScaleBitmap (name=" + this.name + ")]";
        }
    }
}