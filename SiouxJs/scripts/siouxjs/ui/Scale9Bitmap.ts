module siouxjs.ui {
    "use strict";

    export class Scale9Bitmap extends createjs.DisplayObject {

        public image: any; // Image or HTMLCanvasElement or HTMLVideoElement

        private _scale9Grid: createjs.Rectangle;
        private _drawWidth: number;
        private _drawHeight: number;
        private _appScaleTexture: number

        /**
         *   Cria imagens 9 grid
         *   
         *   @param {image} imageOrUri Image base para a imagem 9Grid
         *   @param {createjs.Rectangle} scale9Grid Grid que seré aplicado na imagem base. Atenção! A largura e Altura é o tamanho do segmento da imagem que ser� scalonavel.
         *   @param {boolean} bScaleTextura se for TRUE, ser� aplicado 1x, 2x, etc. na imagem
         */
        constructor(imageOrUri: any, scale9Grid: createjs.Rectangle, bScaleTextura: boolean = false) {
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
                this._scale9Grid = scale9Grid;
                this._appScaleTexture = 1;
            } else {
                this._scale9Grid = new createjs.Rectangle(scale9Grid.x * siouxjs.App.Settings.appScaleTexture, scale9Grid.y * siouxjs.App.Settings.appScaleTexture, scale9Grid.width * siouxjs.App.Settings.appScaleTexture, scale9Grid.height * siouxjs.App.Settings.appScaleTexture);
                this._appScaleTexture = siouxjs.App.Settings.appScaleTexture;
            }

            this._drawWidth = this.image.naturalWidth;
            this._drawHeight = this.image.naturalHeight;
        }

        /**
         * Changes the dimensions used the draw the ScaleBitmap.
         * 
         * @method setDrawSize
         * @param {Number} newWidth The new width of the drawn ScaleBitmap.
         * @param {Number} newHeight The new height of the drawn ScaleBitmap.
         */
        public setDrawSize(newWidth: number, newHeight: number) {
            this._drawWidth = newWidth;
            this._drawHeight = newHeight;

            this.setBounds(this.x, this.y, newWidth, newHeight);
        }

        /**
         * Desenha
         * 
         * @method draw
         * @param {CanvasRenderingContext2D} ctx 
         * @param {boolean} ignoreCache 
         */
        public draw(ctx: CanvasRenderingContext2D, ignoreCache?: boolean): boolean {
            //if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }

            var adjustVal = 0;

            if (this.stage.scaleX > 0 || this.stage.scaleY > 0) {
                adjustVal = 1;
            }
            var centerX = this._scale9Grid.width;
            var centerY = this._scale9Grid.height;
            if (centerX == 0) //vertical
            {
                if (centerY == 0) {
                    throw "One of scale9Grid width or height must be greater than zero.";
                }
                var imageWidth = this.image.width;
                var scale3Region1 = this._scale9Grid.y;
                var scale3Region3 = this.image.height - scale3Region1 - centerY;
                var oppositeEdgeScale = this._drawWidth / imageWidth;
                var scaledFirstRegion = scale3Region1 * oppositeEdgeScale;
                var scaledThirdRegion = scale3Region3 * oppositeEdgeScale;
                var scaledSecondRegion = this._drawHeight - scaledFirstRegion - scaledThirdRegion;

                ctx.drawImage(this.image, 0, 0, imageWidth, scale3Region1, 0, 0, this._drawWidth, scaledFirstRegion);
                ctx.drawImage(this.image, 0, scale3Region1, imageWidth, centerY, 0, scaledFirstRegion, this._drawWidth, scaledSecondRegion);
                ctx.drawImage(this.image, 0, scale3Region1 + centerY, imageWidth, scale3Region3, 0, scaledFirstRegion + scaledSecondRegion, this._drawWidth, scaledThirdRegion);
            }
            else if (centerY == 0) //horizontal
            {
                var imageHeight = this.image.height;
                scale3Region1 = this._scale9Grid.x;
                scale3Region3 = this.image.width - scale3Region1 - centerX;
                oppositeEdgeScale = this._drawHeight / this.image.height;
                scaledFirstRegion = scale3Region1 * oppositeEdgeScale;
                scaledThirdRegion = scale3Region3 * oppositeEdgeScale;
                scaledSecondRegion = this._drawWidth - scaledFirstRegion - scaledThirdRegion;

                ctx.drawImage(this.image, 0, 0, scale3Region1, imageHeight, 0, 0, scaledFirstRegion, this._drawHeight);
                ctx.drawImage(this.image, scale3Region1, 0, centerX, imageHeight, scaledFirstRegion, 0, scaledSecondRegion, this._drawHeight);
                ctx.drawImage(this.image, scale3Region1 + centerX, 0, scale3Region3, imageHeight, scaledFirstRegion + scaledSecondRegion, 0, scaledThirdRegion, this._drawHeight);
            }
            else {
                var left = this._scale9Grid.x;
                var top = this._scale9Grid.y;
                var right = this.image.width - centerX - left;
                var bottom = this.image.height - centerY - top;
                var scaledCenterX = this._drawWidth - left - right;
                var scaledCenterY = this._drawHeight - top - bottom;

                ctx.drawImage(this.image, 0, 0, left, top, 0, 0, left, top);
                ctx.drawImage(this.image, left, 0, centerX, top, left - adjustVal, 0, scaledCenterX, top);
                ctx.drawImage(this.image, left + centerX, 0, right, top, left + scaledCenterX - (adjustVal * 2), 0, right, top);

                ctx.drawImage(this.image, 0, top, left, centerY, 0, top - adjustVal, left, scaledCenterY);
                ctx.drawImage(this.image, left, top, centerX, centerY, left - adjustVal, top - adjustVal, scaledCenterX, scaledCenterY);
                ctx.drawImage(this.image, left + centerX, top, right, centerY, left + scaledCenterX - (adjustVal * 2), top - adjustVal, right, scaledCenterY);

                ctx.drawImage(this.image, 0, top + centerY, left, bottom, 0, top + scaledCenterY - (adjustVal * 2), left, bottom);
                ctx.drawImage(this.image, left, top + centerY, centerX, bottom, left - adjustVal, top + scaledCenterY - (adjustVal *2), scaledCenterX, bottom);
                ctx.drawImage(this.image, left + centerX, top + centerY, right, bottom, left + scaledCenterX - (adjustVal * 2), top + scaledCenterY - (adjustVal * 2), right, bottom);
            }

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