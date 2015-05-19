module siouxjs.ui {
    export class ItemAdd extends createjs.Container {

        private _bg: siouxjs.ui.Scale3Bitmap;
        private _icon: siouxjs.ui.SXBitmap;
        private _text: createjs.Text;
        private _btAdd: siouxjs.ui.ImageButton;
        private _width: number;

        constructor(sIcon:string ='', width:number = 200) {
            super();
            
            this._width = width;

            // Bg
            this._bg = new siouxjs.ui.Scale3Bitmap(<HTMLImageElement> siouxjs.Assets[Theme.AddItem.bg], Theme.AddItem.bgN1, Theme.AddItem.bgN2);
            this.addChild(this._bg);

            // Icon
            if (sIcon != '') {
                this._icon = new siouxjs.ui.SXBitmap(<HTMLImageElement> siouxjs.Assets[sIcon], true);
                this.addChild(this._icon);
            }

            // Text
            this._text = new createjs.Text('0', Theme.AddItem.font, Theme.AddItem.color);
            this._text.textAlign = "right";
            this.addChild(this._text);

            // Bt Add
            this._btAdd = new siouxjs.ui.ImageButton(
                new siouxjs.ui.SXBitmap(<HTMLImageElement> siouxjs.Assets[Theme.AddItem.btAddOn], true),
                new siouxjs.ui.SXBitmap(<HTMLImageElement> siouxjs.Assets[Theme.AddItem.btAddDown], true)
                );
                //btMais.onClick(this.openPopupMoedas.bind(this));
            this.addChild(this._btAdd);

            this.position();

        }

        public onClickAdd(listener: (eventObj: Object) => void) {
            this._btAdd.onClick(listener);
        }

        private position(): void {

            this._bg.setDrawSize(this._width);

            // Icon
            this._icon.y = (this._bg.getBounds().height - this._icon.getBounds().height) / 2;
            this._icon.x = Theme.AddItem.marginLeft

            // Bt Add
            this._btAdd.x = this._bg.getBounds().width - this._btAdd.getBounds().width - Theme.AddItem.marginRight;
            this._btAdd.y = (this._bg.getBounds().height - this._btAdd.getBounds().height) / 2;

            //Text
            this._text.x = this._btAdd.x - Theme.AddItem.marginText;
            this._text.y = (this._bg.getBounds().height - this._text.getBounds().height) / 2;
        }

    }
} 