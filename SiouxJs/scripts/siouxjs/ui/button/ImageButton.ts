module siouxjs.ui {
    "use strict";

    export class ImageButton extends Button {

        private _appScaleTexture: number;
        private _objStateOn: createjs.Bitmap;
        private _objStateDown: createjs.Bitmap;
        private _objStateOver: createjs.Bitmap;

        private _objHitArea: createjs.Shape;
        public set objHitArea(value: createjs.Shape) {
            this._objHitArea = value;
        }
        public get objHitArea(): createjs.Shape {
            return this._objHitArea;
        }

        constructor(imageOn: createjs.Bitmap, imageDown: createjs.Bitmap = null, imageOver: createjs.Bitmap = null, bScaleTextura: boolean = true) {
            super();

            this._objStateOn = imageOn;
            this.addChild(this._objStateOn);

            if (imageDown != null) {
                this._objStateDown = imageDown;
                this.addChild(this._objStateDown);
            }
            if (imageOver != null) {
                this._objStateOver = imageOver;
                this.addChild(this._objStateOver);
            }

            // HitArea - for better performance
            this._objHitArea = new createjs.Shape();
            if (bScaleTextura) {
                this._appScaleTexture = siouxjs.App.Settings.appScaleTexture;
            } else {
                this._appScaleTexture = 1;
            }

            this._objHitArea.graphics.beginFill("#000").drawRect(0, 0, this._objStateOn.image.naturalWidth / siouxjs.App.Settings.appScaleTexture, this._objStateOn.image.naturalHeight / siouxjs.App.Settings.appScaleTexture);
            this.setBounds(0, 0, this._objStateOn.image.naturalWidth / siouxjs.App.Settings.appScaleTexture, this._objStateOn.image.naturalHeight / siouxjs.App.Settings.appScaleTexture);

            this.hitArea = this._objHitArea;

            this.state();
        }

        public state(): void {
            this._objStateOn.visible = false;
            if (this._objStateDown) {
                this._objStateDown.visible = false;
            }
            if (this._objStateOver) {
                this._objStateOver.visible = false;
            }
            switch (this.nState) {
                case 1: // Down
                    if (this._objStateDown) {
                        this._objStateDown.visible = true;
                    }
                    break;
                case 2: // Over
                    if (this._objStateOver) {
                        this._objStateOver.visible = true;
                    }
                    break;
                default: // Normal
                    this._objStateOn.visible = true;
            }
        }
    }
}