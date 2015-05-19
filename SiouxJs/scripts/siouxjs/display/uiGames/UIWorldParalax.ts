module siouxjs {
    interface ITileWorlParalax extends createjs.DisplayObject {

        tileUpdate(lin: number, col: number): void;

    }

    export class UIWorldParalax extends createjs.Container {

        private _aTile: Array<any>;
        private _tileLargura: number;
        private _tileAltura: number;

        private _nMinAnterioY: number;
        private _nMinAnterioX: number;

        private _fTile: Function;

        constructor(fTite: Function, tileLargura: number, tileAltura: number) {
            super();

            this._fTile = fTite
            this._tileLargura = tileLargura
            this._tileAltura = tileAltura

            // Verifica se tem Mascara ou deve utilizar todo o stage
            if (!Config.bMask) {
                this.x = - siouxjs.App.Settings.appLeftOffset;
                this.y = - siouxjs.App.Settings.appTopOffset;
            }

            this.itensTile();
        }

        public mover(x: number, y: number): void {

            this.x = this.x + x;
            this.y = this.y + y;

            this.itensTileUpdate();
        }

        private itensTile(): void {

            this._aTile = new Array();

            // While precisa ter um elemento a mais para tapar os burracos

            // Linha
            var lin: number = 0;
            do {
                this._aTile.push(new Array());
                // Coluna
                var col: number = 0;
                do {
                    var obj: any = this._fTile();
                    obj.x = this._tileLargura * col;
                    obj.y = this._tileAltura * lin;
                    this.addChild(obj);
                    this._aTile[lin].push(obj);
                    //this.itemUpdate(obj, i);
                    col++;
                } while (obj.x < siouxjs.App.Settings.appLeftOffset * 2 + siouxjs.App.Settings.appSizeGuide.width + this._tileLargura)
                lin++;
            } while (obj.y < siouxjs.App.Settings.appTopOffset * 2 + siouxjs.App.Settings.appSizeGuide.height)
        }

        private itensTileUpdate(): void {

            // Primeira Posição
            // Y
            var nItemY = - Math.ceil((this.y + siouxjs.App.Settings.appTopOffset) / this._tileAltura);
            var minY = nItemY * this._tileAltura;
            // X
            var nItemX = - Math.ceil((this.x + siouxjs.App.Settings.appLeftOffset) / this._tileLargura);
            var minX = nItemX * this._tileLargura;

            // Verifica se mudou os itens
            if (this._nMinAnterioY == minY && this._nMinAnterioX == minX) return

            // Ultima Posição
            var maxY = minY + this._tileAltura * (this._aTile.length - 1);
            var maxX = minX + this._tileLargura * (this._aTile[0].length - 1);

            // Pega Itens fora de vista
            for (var lin = 0; lin < this._aTile.length; lin++) {

                for (var col = 0; col < this._aTile[lin].length; col++) {

                    // Y
                    if (this._aTile[lin][col].y < minY || this._aTile[lin][col].y > maxY) {
                        if (this._nMinAnterioY < minY) {
                            this._aTile[lin][col].y = maxY;
                            this._aTile[lin][col].tileUpdate(lin, col);
                        } else {
                            this._aTile[lin][col].y = minY;
                            this._aTile[lin][col].tileUpdate(lin, col);
                        }
                    }
                    // X
                    if (this._aTile[lin][col].x < minX || this._aTile[lin][col].x > maxX) {
                        if (this._nMinAnterioX < minX) {
                            this._aTile[lin][col].x = maxX;
                            this._aTile[lin][col].tileUpdate(lin, col);
                        } else {
                            this._aTile[lin][col].x = minX;
                            this._aTile[lin][col].tileUpdate(lin, col);
                        }
                    }
                }
            }

            // Grava posição Min para verificar mudança; 
            this._nMinAnterioY = minY;
            this._nMinAnterioX = minX;
        }
    }
}