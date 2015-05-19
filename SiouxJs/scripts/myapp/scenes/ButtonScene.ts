/// <reference path="../../siouxjs/display/scene.ts" />

module MyApp.Scenes {
    "use strict";

    export class ButtonScene extends siouxjs.Scene {

        
        constructor() {
            super();

            this.name = 'ButtonScene';

            // ### bt3GridTheme
            var bt3GridTheme: siouxjs.ui.Scale3Button = new siouxjs.ui.Scale3Button('Scale3Button-Theme');
            this.addChild(bt3GridTheme);
            
            // ### bt3GridCustomized
            var image: HTMLImageElement;
            var image3: siouxjs.ui.Scale3Bitmap;

            // StateOn
            image = <HTMLImageElement> siouxjs.Assets[Theme.Button9.imagemOn];
            image3 = new siouxjs.ui.Scale3Bitmap(new createjs.Bitmap(image).image, 20, 40);
            var bt3GridStateOn: siouxjs.ui.Scale3ButtonState = new siouxjs.ui.Scale3ButtonState(image3, 'Scale3Button-Theme-ON', "26px Arial", "#000", new createjs.Rectangle(25, 10, 25, 20));

            // StateDown
            image = <HTMLImageElement> siouxjs.Assets[Theme.Button9.imagemDown];
            image3 = new siouxjs.ui.Scale3Bitmap(new createjs.Bitmap(image).image, 20, 40);
            var bt3GridStateDowwn: siouxjs.ui.Scale3ButtonState = new siouxjs.ui.Scale3ButtonState(image3, 'Scale3Button-Theme-DOWN', "30px Arial", "#fff", new createjs.Rectangle(25, 5, 25, 20));

            // label can't be ''
            var bt3GridCustomized: siouxjs.ui.Scale3Button = new siouxjs.ui.Scale3Button('customize', true, bt3GridStateOn, bt3GridStateDowwn);
            siouxjs.util.DisplayObject.alignTop(bt3GridCustomized, 10, bt3GridTheme);
            this.addChild(bt3GridCustomized);

            // ### bt9GridTheme
            var bt9GridTheme: siouxjs.ui.Scale9Button = new siouxjs.ui.Scale9Button('Scale9Button-Theme');
            siouxjs.util.DisplayObject.alignTop(bt9GridTheme, 10, bt3GridCustomized);
            this.addChild(bt9GridTheme);
            

        }

    }
}
console.log('myapp.MainMenu.ts');