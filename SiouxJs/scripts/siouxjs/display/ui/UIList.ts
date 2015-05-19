module siouxjs {
    export class UIList extends createjs.Container {

        private _width: number;
        get width(): number {
            return this._width
        }
        set width(value: number) {
            this._width = value;
            this.setDrawSize();
        }

        private _height: number;
        get height(): number {
            return this._height
        }
        set height(value: number) {
            this._height = value;
            this.setDrawSize();
        }

        private _dataProvider: Array<any>;
        get dataProvider(): Array<any> {
            return this._dataProvider
        }
        set dataProvider(value: Array<any>) {
            this._dataProvider = value
        }

        private _objMask: createjs.Shape;

        private _fItemRender: Function;
        private _aItemRender: Array<any>;
        private _nItemRenderAltura: number;
        private _nMinAnterioY: number;
        private _objContaner: createjs.Container;

        private _bDrag: boolean = false;
        private _nDiferencaMouseContainerY: number;

        constructor(fItemRenderer: Function, dataProvider: Array<any>) {
            super();

            this._fItemRender = fItemRenderer;
            this._dataProvider = dataProvider

            this._objContaner = new createjs.Container();
            this.addChild(this._objContaner);

            createjs.Ticker.on('tick', this.tick.bind(this));

            this.addEventListener("pressup", this.onMouseUp);

            this.addEventListener("mousedown", this.onMouseDown);
        }

        private setDrawSize(): void {

            if (this._width == undefined || this._height == undefined) return

            // Mask
            this._objMask = new createjs.Shape();
            this._objMask.graphics.beginFill("#ffffff").drawRect(0, 0, this._width, this.height);
            this._objContaner.mask = this._objMask;

            // Lista de Itens
            this.itensList();
        }

        private itensList(): void {
            if (this._height == undefined) return

            this._aItemRender = new Array();

            var i: number = 0;

            // While precisa ter um elemento a mais para tapar os burracos
            do {
                var obj: any = this._fItemRender();
                obj.y = obj.getBounds().height * i;
                this._objContaner.addChild(obj);
                this._aItemRender.push(obj);
                this.itemUpdate(obj, i);
                i++;
            } while (obj.y < this._height)

            // Guarda a altura para futuros calculos
            this._nItemRenderAltura = obj.getBounds().height;

        }

        private itensListUpdate(): void {

            // Primeira Posição
            var nItem = - Math.ceil(this._objContaner.y / this._nItemRenderAltura);
            var minY = nItem * this._nItemRenderAltura;

            // Verifica se mudou os itens
            if (this._nMinAnterioY == minY) return

            // Ultima Posição
            var maxY = minY + this._nItemRenderAltura * (this._aItemRender.length - 1);

            // Pega Itens fora de vista
            var nItemFora: number = 0;
            for (var i = 0; i < this._aItemRender.length; i++) {
                if (this._aItemRender[i].y < minY || this._aItemRender[i].y > maxY) {
                    if (this._nMinAnterioY < minY) {
                        this._aItemRender[i].y = maxY + nItemFora * this._nItemRenderAltura;
                        this.itemUpdate(this._aItemRender[i], nItem + (this._aItemRender.length - 1) + nItemFora);
                        nItemFora--;
                    } else {
                        this._aItemRender[i].y = minY + nItemFora * this._nItemRenderAltura;
                        this.itemUpdate(this._aItemRender[i], nItem + nItemFora);
                        nItemFora++;
                    }
                }
            }

            // Grava posição Min para verificar mudança; 
            this._nMinAnterioY = minY;
        }

        private itemUpdate(objItem: any, nItem: number): void {
            if (nItem < this._dataProvider.length && nItem >= 0) {
                objItem.update(nItem, this._dataProvider[nItem]);
            } else {
                objItem.update(nItem);
            }
        }

        private onMouseDown = (e: createjs.MouseEvent): void => {
            this._bDrag = true;
            this._nDiferencaMouseContainerY = this._objContaner.y - siouxjs.mouseY(this.stage);
        };

        private onMouseUp = (e: createjs.MouseEvent): void => {
            this._bDrag = false;
        };

        // EnterFrame
        private tick(e: createjs.TickerEvent): void {
            if (this._bDrag) {
                this._objContaner.y = siouxjs.mouseY(this.stage) + this._nDiferencaMouseContainerY;
                if (this._objContaner.y > 0) {
                    this._objContaner.y = 0;
                }
                if (this._objContaner.y < - (this._dataProvider.length * this._nItemRenderAltura) + this._height) {
                    this._objContaner.y = - (this._dataProvider.length * this._nItemRenderAltura) + this._height;
                }
                this.itensListUpdate();
            }
        }
    }
}