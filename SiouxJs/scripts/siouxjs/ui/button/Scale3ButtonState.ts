module siouxjs.ui {
    "use strict";

    export class Scale3ButtonState extends createjs.Container {

        private _image: Scale3Bitmap;
        private _margin: createjs.Rectangle;
        private _objText: createjs.Text;

        private _bScaleTextura: boolean;

        private _width: number;
        private _height: number;


        //Scale3Bitmap : constructor(imageOrUri: any, nX1:number, nX2:number, bScaleTextura: boolean = false) {
        constructor(image3: Scale3Bitmap, label:string, font: string, color: string, marginText: createjs.Rectangle, bScaleTextura: boolean = true) {
            super();

            this._bScaleTextura = bScaleTextura;

            // Imagem
            this._image = image3;

            // Margem
            this._margin = marginText;

            // Texto
            this._objText = new createjs.Text(label, font, color);

            this.addChild(this._image, this._objText);

            this.drawObjects();
        }

        public get image(): Scale3Bitmap {
            return this._image;
        }
        public set image(value: Scale3Bitmap) {
            this._image = value;
            this.drawObjects();
        }

        public get margin(): createjs.Rectangle {
            return this._margin;
        }
        public set margin(value: createjs.Rectangle) {
            this._margin = value;
            this.drawObjects();
        }

        public get objText(): createjs.Text {
            return this._objText;
        }
        public set objText(value: createjs.Text) {
            this._objText = value;
            this.drawObjects();
        }

        public set label(value: string) {
            this._objText.text = value;
            this.drawObjects();
        }

        public get width(): number {
            return this._width;
        }

        public set width(value: number) {
            this._width = value;
            this.drawObjects();
        }

        private drawObjects() {

           // Largura
            var largura: number = 0;
            if (this._width === undefined || this._width === 0) {
                largura = this._objText.getBounds().width + this._margin.x + this._margin.width;
            } else {
                largura = this._width;
            }

            this._objText.y = this._margin.y;
            this._objText.x = this._margin.x;

            this._image.setDrawSize(largura);

            //this.cache(0, 0, largura, );
        }
    }
}
