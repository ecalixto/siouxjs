/// <reference path="../siouxjs/display/loadingbase.ts" />
module MyApp {
    export class Loading extends siouxjs.LoadingBase {

        private _barraCarregando: siouxjs.BarraPorcentagem;

        constructor() {
            super();

            this._barraCarregando = new siouxjs.BarraPorcentagem(siouxjs.App.Settings.appSizeGuide.width * .8, 40, true);
            this.addChild(this._barraCarregando);
            this._barraCarregando.x = (siouxjs.App.Settings.appSizeGuide.width - this._barraCarregando.getBounds().width) * 0.5;
            this._barraCarregando.y = (siouxjs.App.Settings.appSizeGuide.height + 2 * siouxjs.App.Settings.appTopOffset) - 120;

            var lgSioux = new siouxjs.ui.SXBitmap(Config.sPathGlobal + 'assets/theme/@x/lgSioux.gif');
            lgSioux.visible = false;
            this.addChild(lgSioux);

            // Espera carregar para centralizar.
            var that = this;
            lgSioux.onLoad = function (): void {
                lgSioux.x = (siouxjs.App.Settings.appSizeGuide.width - lgSioux.width) * 0.5;
                lgSioux.y = that._barraCarregando.y - lgSioux.height - 20;
                lgSioux.visible = true;
            }
        }

        public onProgress(nProgress: number): void {
            this._barraCarregando.nPorcentagem = nProgress;
        }

    }
}
