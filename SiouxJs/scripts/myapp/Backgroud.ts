/// <reference path="../typings/createjs/createjs.d.ts" />

module MyApp {

    export class Backgroud extends createjs.Container {

        private image: any;

        constructor() {
            super();

            // BG
            var bg = new siouxjs.ui.SXBitmap(<HTMLImageElement> siouxjs.Assets['Backgroud'], true);
            bg.y = (siouxjs.App.Settings.appSizeGuide.height - bg.height) / 2;
            bg.x = (siouxjs.App.Settings.appSizeGuide.width - bg.width) / 2;
            this.addChild(bg);

        }
    }
}
