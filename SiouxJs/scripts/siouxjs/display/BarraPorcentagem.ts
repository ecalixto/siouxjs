/// <reference path="../../typings/createjs/createjs.d.ts" />
module siouxjs {
    "use strict";

    export class BarraPorcentagem extends createjs.Container {

        private _nPorcentagem: number = 0;
        private _shape: createjs.Shape;

        private _bAnimacao: boolean;
        get bAnimacao(): boolean {
            return this._bAnimacao;
        }
        set bAnimacao(value: boolean) {
            this._bAnimacao = value;
        }

        // Thema
        private _sCor: string = Theme.General.cor2;
        private _sCorBorda: string = Theme.General.cor1;

        constructor(nLargura: number, nAltura: number, bBorda: boolean = false, bAnimacao: boolean = false) {

            super();

            this._bAnimacao = bAnimacao;

            this._shape = new createjs.Shape();
            this._shape.graphics.beginFill(this._sCor).drawRect(0, 0, nLargura, nAltura);
            this.addChild(this._shape);


            if (bBorda) {
                var _shapeBorda: createjs.Shape = new createjs.Shape();
                _shapeBorda.graphics.beginStroke(this._sCorBorda).drawRect(0, 0, nLargura, nAltura);
                this.addChild(_shapeBorda);
            }

            this._shape.scaleX = this._nPorcentagem / 100;

            this.setBounds(this.x, this.y, nLargura, nAltura);
        }

        private desenhar(): void {
            if (this._bAnimacao) {
                createjs.Tween.get(this._shape).to({ scaleX: this._nPorcentagem / 100 }, 1000);
            } else {
                this._shape.scaleX = this._nPorcentagem / 100;
            }
        }

        public get nPorcentagem(): number {
            return this._nPorcentagem;
        }

        public set nPorcentagem(nPorcentagem: number) {
            this._nPorcentagem = nPorcentagem;

            this.desenhar();
        }

    }
}