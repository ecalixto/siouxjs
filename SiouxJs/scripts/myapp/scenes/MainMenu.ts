/// <reference path="../../siouxjs/display/scene.ts" />

module MyApp.Scenes {
    "use strict";

    export class MainMenu extends siouxjs.Scene {

        
        constructor() {
            super();

            this.name = 'MainMenu';


            // Test Imag
            var img: siouxjs.ui.SXBitmap = new siouxjs.ui.SXBitmap(siouxjs.Assets['icMoeda'], true);
            this.addChild(img);
            console.log(img.getBounds())
           
            var bt3Grid: siouxjs.ui.Scale3Button = new siouxjs.ui.Scale3Button('Button Screen');
            bt3Grid.y = 550;
            bt3Grid.x = (siouxjs.App.Settings.appSizeGuide.width - bt3Grid.getBounds().width) /2;
            bt3Grid.onClick(this.onClickBt3Grid);
            this.addChild(bt3Grid);

            var btCoordinates: siouxjs.ui.Scale3Button = new siouxjs.ui.Scale3Button('Coordinates Screen');
            btCoordinates.y = 650;
            btCoordinates.x = (siouxjs.App.Settings.appSizeGuide.width - btCoordinates.getBounds().width) / 2;
            btCoordinates.onClick(this.onClickBtCoordinates);
            this.addChild(btCoordinates);

            var btComponets: siouxjs.ui.Scale3Button = new siouxjs.ui.Scale3Button('btComponets Screen');
            btComponets.y = 750;
            btComponets.x = (siouxjs.App.Settings.appSizeGuide.width - btComponets.getBounds().width) / 2;
            btComponets.onClick(this.onClickBtbtComponets);
            this.addChild(btComponets);
        }

        // Go to Button Screen
        private onClickBt3Grid(event): void {
            siouxjs.App.sceneManager.changeScene(new ButtonScene());
        }

        // Go to Coordinates Screen
        private onClickBtCoordinates(event): void {
            siouxjs.App.sceneManager.changeScene(new CoordinatesScene());
        }

        // Go to Coordinates Screen
        private onClickBtbtComponets(event): void {
            siouxjs.App.sceneManager.changeScene(new ComponetsScene());
        }


    }
}
console.log('myapp.MainMenu.ts');