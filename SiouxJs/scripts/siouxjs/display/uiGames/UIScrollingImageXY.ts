module siouxjs {
    export class UIScrollingImageXY extends createjs.Container {

        private _tile: HTMLImageElement;
        private _recArea: createjs.Rectangle;

        constructor(tile: HTMLImageElement) {
            super();

            this._tile = tile;

            // Configura Area que os Tile devem ocupar.

            this._recArea = new createjs.Rectangle();
            // Se não tem Mascara utilziza todo o stage, posicionando o Contender no canto esquerdo superior da tela
            if (Config.bMask) {
                this._recArea.x = 0;
                this._recArea.y = 0;

                this._recArea.width = siouxjs.App.Settings.appSizeGuide.width;
                this._recArea.height = siouxjs.App.Settings.appSizeGuide.height;
            } else {
                this._recArea.x = - siouxjs.App.Settings.appLeftOffset;
                this._recArea.y = - siouxjs.App.Settings.appTopOffset;

                this._recArea.width = (siouxjs.App.Settings.appLeftOffset * 2 + siouxjs.App.Settings.appSizeGuide.width);
                this._recArea.height = (siouxjs.App.Settings.appTopOffset * 2 + siouxjs.App.Settings.appSizeGuide.height);
            }
            this.x = this._recArea.x;
            this.y = this._recArea.y;

            this.itensTile();
        }

        public mover(x: number, y: number): void {

            if (this.x > this._recArea.x) {
                this.x = this.x - this._tile.width + x;
            } else if (this.x < this._recArea.x - this._tile.width) {
                this.x = this.x + this._tile.width + x;
            } else {
                this.x = this.x + x;
            }

            if (this.y > this._recArea.y) {
                this.y = this.y - this._tile.height + y;
            } else if (this.y < this._recArea.y - this._tile.height) {
                this.y = this.y + this._tile.height + y;
            } else {
                this.y = this.y + y;
            }
        }

        private itensTile(): void {

            for (var lin = 0; lin < this._recArea.height / this._tile.height + 1; ++lin) {
                for (var col = 0; col < this._recArea.width / this._tile.width + 1; ++col) {

                    var newTile: createjs.Bitmap = new createjs.Bitmap(this._tile);
                    newTile.x = this._tile.width * col;
                    newTile.y = this._tile.width * lin;
                    this.addChild(newTile);

                }
            }
        }
    }
}