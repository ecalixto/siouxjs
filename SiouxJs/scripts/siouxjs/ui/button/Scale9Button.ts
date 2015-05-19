module siouxjs.ui {
    "use strict";

    export class Scale9Button extends Button {

        private _objStateOn: Scale9ButtonState;
        private _objStateDown: Scale9ButtonState;
        private _objStateOver: Scale9ButtonState;
        
        private _label: string;
        private _textAlign: string;
        private _width: number;
        private _height: number;

        private _bScaleTextura: boolean;

        private _objHitArea: createjs.Shape;
        public set objHitArea(value: createjs.Shape) {
            this._objHitArea = value;
        }
        public get objHitArea(): createjs.Shape {
            return this._objHitArea;
        }

        constructor(label: string, bScaleTextura: boolean = true, image9On?: Scale9Bitmap, marginOn?: createjs.Rectangle, image9Down?: Scale9Bitmap, marginDown?: createjs.Rectangle, image9Over?: Scale9Bitmap, marginOver?: createjs.Rectangle) {
            super();

            this._bScaleTextura = bScaleTextura;

            // Criar Scale9Bitmap ON
            if (image9On == null) {
                var image = <HTMLImageElement> siouxjs.Assets[Theme.Button9.imagemOn];
                var size: createjs.Rectangle = Theme.Button9.sizeOn;
                image9On = new Scale9Bitmap(new createjs.Bitmap(image).image, size, this._bScaleTextura);
            }
            if (marginOn == null) {
                var margin: createjs.Rectangle = Theme.Button9.marginOn;
            }
            this._objStateOn = new Scale9ButtonState(image9On, margin, Theme.Button9.fontOn, Theme.Button9.colorOn,this._bScaleTextura);

            // Criar Scale9Bitmap DOWN
            if (image9Down == null) {
                image = <HTMLImageElement> siouxjs.Assets[Theme.Button9.imagemDown];
                size = Theme.Button9.sizeDown;
                image9Down = new Scale9Bitmap(new createjs.Bitmap(image).image, size, this._bScaleTextura);
            }
            if (marginDown == null) {
                margin = Theme.Button9.marginDown;
            }
            this._objStateDown = new Scale9ButtonState(image9Down, margin, Theme.Button9.fontDown, Theme.Button9.colorDown, this._bScaleTextura);

            // Imagem Over apenas para Desktop
            if (!util.Browser.isMobile()) {
                // Criar Scale9Bitmap ON
                if (image9Over == null) {
                    image = <HTMLImageElement> siouxjs.Assets[Theme.Button9.imagemOver];
                    size = Theme.Button9.sizeOver;
                    image9Over = new Scale9Bitmap(new createjs.Bitmap(image).image, size, this._bScaleTextura);
                }
                if (marginOver == null) {
                    margin = Theme.Button9.marginOver;
                }
                this._objStateOver = new Scale9ButtonState(image9Over, margin, Theme.Button9.fontOver, Theme.Button9.colorOver, this._bScaleTextura);

                this.addChild(this._objStateOn, this._objStateDown, this._objStateOver);
            } else {
                this.addChild(this._objStateOn, this._objStateDown);
            }

            this.label = label;

            this.state();

            this.updateHitArea();

        }

        public get label(): string {
            return this._label;
        }
        public set label(value: string) {
            this._label = value;
            this._objStateOn.label = this._label;
            this._objStateDown.label = this._label;
            if (!util.Browser.isMobile()) {
                this._objStateOver.label = this._label;
            }

            this.updateHitArea();
        }

        public get width(): number {
            return this._width;
        }

        public set width(value: number) {
            this._width = value;

            this._objStateOn.width = this._width;
            this._objStateDown.width = this._width;
            if (this._objStateOver != null) {
                this._objStateOver.width = this._width;
            }

            this.updateHitArea();
        }

        public get height(): number {
            return this._height;
        }

        public set height(value: number) {
            this._height = value;

            this._objStateOn.height = this._height;
            this._objStateDown.height = this._height;
            if (this._objStateOver != null) {
                this._objStateOver.height = this._height;
            }

            this.updateHitArea();
        }

        public set textAlign(value: string) {
            this._textAlign = value;

            this._objStateOn.textAlign = this._textAlign;
            this._objStateDown.textAlign = this._textAlign;
            if (this._objStateOver != null) {
                this._objStateOver.textAlign = this._textAlign;
            }

            this.updateHitArea();
        }

        public setIcone(value: SXBitmap, x: number, y: number) {
            this._objStateOn.setIcone (value.clone(),x,y);
            this._objStateDown.setIcone(value.clone(), x, y);
            if (this._objStateOver != null) {
                this._objStateOver.setIcone(value.clone(), x, y);
            }

            this.updateHitArea();
        }

        public get objStateOn(): Scale9ButtonState {
            return this._objStateOn;
        }
        public get objStateDown(): Scale9ButtonState {
            return this._objStateDown;
        }
        public get objStateOver(): Scale9ButtonState {
            return this._objStateOver;
        }

        public state(): void {
            this._objStateOn.visible = false;
            this._objStateDown.visible = false;
            if (this._objStateOver != null) {
                this._objStateOver.visible = false;
            }

            switch (this.nState) {
                case 1: // Down
                    this._objStateDown.visible = true;
                    break;
                case 2: // Over
                    if (this._objStateOver != null) {
                        this._objStateOver.visible = true;
                    }
                    break;
                default: // Normal
                   this._objStateOn.visible = true;
            }
        }

        private updateHitArea(): void {
            // HitArea - for better performance
            this._objHitArea = new createjs.Shape();
            this._objHitArea.graphics.beginFill("#000").drawRect(0, 0, this._objStateOn.getBounds().width, this._objStateOn.getBounds().height);
            this.hitArea = this._objHitArea;
        }
    }
}
