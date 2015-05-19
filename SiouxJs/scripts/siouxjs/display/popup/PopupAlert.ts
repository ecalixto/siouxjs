module siouxjs {
    "use strict";

    export class PopupAlert extends Popup {

        private _img9bg: ui.Scale9Bitmap;
        private _btOk: ui.Scale9Button;

        private _txTitulo: createjs.Text;
        get txTitulo(): createjs.Text {
            return this._txTitulo;
        }
        set txTitulo(value: createjs.Text) {
            this._txTitulo = value;
        }

        private _txTexto: createjs.Text;
        get txTexto(): createjs.Text {
            return this._txTexto;
        }
        set txTexto(value: createjs.Text) {
            this._txTexto = value;
        }

        constructor(titulo: string, texto: string) {
            super();

            // Imagem de Fundo
            var bt = <HTMLImageElement> siouxjs.Assets[Theme.Popup.img9bg];
            this._img9bg = new ui.Scale9Bitmap(new createjs.Bitmap(bt).image, Theme.Popup.size9bg);
            this._img9bg.setDrawSize(Theme.Popup.largura, Theme.Popup.altura);
            this._img9bg.x = 0;
            this._img9bg.y = 0;
            this.addChild(this._img9bg);

            // Button Jogar
            this._btOk = new ui.Scale9Button("OK");
            this.addChild(this._btOk);
            this._btOk.x = - this._btOk.getBounds().width * .5;
            this._btOk.x = (this._img9bg.getBounds().width - this._btOk.getBounds().width) * .5;;
            this._btOk.y = this._img9bg.getBounds().height - this._btOk.getBounds().height - 30;
            this._btOk.onClick(this.btJogarClick.bind(this));

            // Título
            this._txTitulo = new createjs.Text(titulo, Theme.General.titulo, Theme.General.tituloCor1);
            this._txTitulo.textAlign = "center";
            this._txTitulo.x = this._img9bg.getBounds().width * .5;
            this._txTitulo.y = Theme.Popup.tituloMarginTop;
            this.addChild(this._txTitulo);

            // Texto
            this._txTexto = new createjs.Text(texto, Theme.General.texto, Theme.General.textoCor1);
            this._txTexto.textAlign = "center";
            this._txTexto.x = this._img9bg.getBounds().width * .5;
            this._txTexto.y = this._txTitulo.y + this._txTitulo.getBounds().height + Theme.Popup.textoMargin;
            this._txTexto.lineWidth = Theme.Popup.largura - Theme.Popup.textoMargin * 2;
            this.addChild(this._txTexto);

        }

        private btJogarClick(event:MouseEvent): void {
            this.manager.removePopup();
        }

        public open(): void {
        }

        public close(): void {
        }

    }
}