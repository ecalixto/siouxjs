/// <reference path="../../siouxjs/display/scene.ts" />

module MyApp.Scenes {
    "use strict";

    export class ComponetsScene extends siouxjs.Scene {

        
        constructor() {
            super();

            this.name = 'ComponetsScene';

            var addItem: siouxjs.ui.ItemAdd = new siouxjs.ui.ItemAdd('icMoeda', 200);
            this.addChild(addItem);
        }

    }
}
console.log('myapp.ComponetsScene.ts');