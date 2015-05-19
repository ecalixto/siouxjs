module siouxjs.ui {
    "use strict";

    export class Scale9ButtonState extends createjs.Container {

        private _image: Scale9Bitmap;
        private _margin: createjs.Rectangle;
        private _objText: createjs.Text;
        private _textAlign: string;

        private _icone: createjs.Bitmap;

        private _bScaleTextura: boolean;

        private _width: number;
        private _height: number;

        constructor(image9: Scale9Bitmap, margin: createjs.Rectangle, font:string, color:string, bScaleTextura: boolean = true) {
            super();

            this._bScaleTextura = bScaleTextura;

            // Imagem
            this._image = image9;

            // Margem
            this._margin = margin;

            // Texto
            this._objText = new createjs.Text("", font, color );

            this.addChild(this._image, this._objText);
        }

        public get image(): Scale9Bitmap {
            return this._image;
        }
        public set image(value: Scale9Bitmap) {
            this._image = value;
        }

        public get margin(): createjs.Rectangle {
            return this._margin;
        }
        public set margin(value: createjs.Rectangle) {
            this._margin = value;
        }
        public get objText(): createjs.Text {
            return this._objText;
        }
        public set objText(value: createjs.Text) {
            this._objText = value;
        }
        public set label(value: string) {
            this._objText.text = value;
            this.drawObjects();
        }
        public set image9(value: Scale9Bitmap) {
            this._image = value;
            this.drawObjects();
        }

        public get width(): number {
            return this._width;
        }

        public set width(value: number) {
            this._width = value;
            this.drawObjects();
        }
        public get height(): number {
            return this._width;
        }

        public set height(value: number) {
            this._height = value;

            this.drawObjects();
        }

        public set textAlign(value: string) {
            this._textAlign = value;

            this.drawObjects();
        }

		    public setIcone(value: createjs.Bitmap, x: number, y:number) {
		        // Icone
		        this._icone = value;
		        this.addChild(this._icone);
		        this._icone.x = x;
		        this._icone.y = y;
		    }
		    public get icone(): createjs.Bitmap {
		        return this._icone;
		    }

        private drawObjects() {
           // Largura
            var largura: number = 0;
            if (this._width === undefined || this._width === 0) {
                largura = this._objText.getBounds().width + this._margin.x + this._margin.width;
            } else {
                largura = this._width;
            }
            // Altura
            var altura: number = 0;
            if (this._height === undefined || this._height === 0) {
                altura = this._objText.getBounds().height + this._margin.y + this._margin.height;
                this._objText.y = this._margin.y;
            } else {
                altura = this._height;
                this._objText.y = this._margin.y + this._height / 2 - this._objText.getBounds().height / 2;
            }

            // Texto
            switch (this._textAlign) {
                case "center":
                    this._objText.x = this._margin.x + largura / 2 - this._objText.getBounds().width / 2;
                    break;
                case "right":
                    this._objText.x = largura - this._margin.width - this._objText.getBounds().width;
                    break;
                default: // Left
                    this._objText.x = this._margin.x;
            }

            this._image.setDrawSize(largura, altura);
        }
    }
}
