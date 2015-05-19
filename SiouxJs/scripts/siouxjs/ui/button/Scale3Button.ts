module siouxjs.ui {
    "use strict";

    export class Scale3Button extends Button {

        private _objStateOn: Scale3ButtonState;
        private _objStateDown: Scale3ButtonState;
        private _objStateOver: Scale3ButtonState;
        
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


        //constructor(image3: Scale3Bitmap, label: string, font: string, color: string, marginText: createjs.Rectangle, bScaleTextura: boolean = true) {


        constructor(label: string, bScaleTextura: boolean = true, stateOn?: Scale3ButtonState, stateDown?: Scale3ButtonState, stateOver?: Scale3ButtonState) {
            super();

            if (label == '') {
                alert('Scale3Button: miss label');
                label = 'miss label';
            }

            this._bScaleTextura = bScaleTextura;

            var image : HTMLImageElement;
            var image3: Scale3Bitmap;

            // ON
            if (stateOn == null) {
                image = <HTMLImageElement> siouxjs.Assets[Theme.Button3.imagemOn];
                image3 = new Scale3Bitmap(new createjs.Bitmap(image).image, Theme.Button3.sizeOnX1, Theme.Button3.sizeOnX2, this._bScaleTextura);

                this._objStateOn = new Scale3ButtonState(image3, label, Theme.Button3.fontOn, Theme.Button3.colorOn, Theme.Button3.marginOn, this._bScaleTextura);
            } else {
                this._objStateOn = stateOn;
            }

            // DOWN
            if (stateDown == null) {

                image = <HTMLImageElement> siouxjs.Assets[Theme.Button3.imagemDown];
                image3 = new Scale3Bitmap(new createjs.Bitmap(image).image, Theme.Button3.sizeDownX1, Theme.Button3.sizeDownX2, this._bScaleTextura);

                this._objStateDown = new Scale3ButtonState(image3, label, Theme.Button3.fontDown, Theme.Button3.colorDown, Theme.Button3.marginDown, this._bScaleTextura);
            } else {
                this._objStateDown = stateDown;
            }

            // DOWN
            if (!util.Browser.isMobile()) {
                if (stateOver == null) {
                    image = <HTMLImageElement> siouxjs.Assets[Theme.Button3.imagemOver];
                    image3 = new Scale3Bitmap(new createjs.Bitmap(image).image, Theme.Button3.sizeDownX1, Theme.Button3.sizeDownX2, this._bScaleTextura);

                    this._objStateOver = new Scale3ButtonState(image3, label, Theme.Button3.fontOver, Theme.Button3.colorOver, Theme.Button3.marginOver, this._bScaleTextura);
                } else {
                    this._objStateOver = stateOver;
                }

                this.addChild(this._objStateOn, this._objStateDown, this._objStateOver);
            } else {
                this.addChild(this._objStateOn, this._objStateDown);
            }

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
                //this._objStateOver.label = this._label;
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

        public get objStateOn(): Scale3ButtonState {
            return this._objStateOn;
        }
        public get objStateDown(): Scale3ButtonState {
            return this._objStateDown;
        }
        public get objStateOver(): Scale3ButtonState {
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
