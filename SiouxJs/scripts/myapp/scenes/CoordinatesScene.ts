/// <reference path="../../siouxjs/display/scene.ts" />

module MyApp.Scenes {
    "use strict";

    export class CoordinatesScene extends siouxjs.Scene {

        
        constructor() {
            super();

            this.name = 'CoordinatesScene';

            var areaUtilXY = new createjs.Text("areaUtil.x,y", "35px Arial", "#ffffff");
            areaUtilXY.x = siouxjs.App.Settings.areaUtil.x;
            areaUtilXY.y = siouxjs.App.Settings.areaUtil.y;
            this.addChild(areaUtilXY);
            
            var appSizeGuideXY = new createjs.Text("appSizeGuide.x,y", "35px Arial", "#ffffff");
            appSizeGuideXY.x = siouxjs.App.Settings.appSizeGuide.x;
            appSizeGuideXY.y = siouxjs.App.Settings.appSizeGuide.y;
            this.addChild(appSizeGuideXY);

            var appSizeGuideWH = new createjs.Text("appSizeGuide.width,height", "35px Arial", "#ffffff");
            appSizeGuideWH.textAlign = "right";
            appSizeGuideWH.x = siouxjs.App.Settings.appSizeGuide.width;
            appSizeGuideWH.y = siouxjs.App.Settings.appSizeGuide.height - appSizeGuideWH.getBounds().height;
            this.addChild(appSizeGuideWH);

            var areaUtilWH = new createjs.Text("areaUtil.width,height", "35px Arial", "#ffffff");
            areaUtilWH.textAlign = "right";
            areaUtilWH.x = siouxjs.App.Settings.areaUtil.width;
            areaUtilWH.y = siouxjs.App.Settings.areaUtil.height - areaUtilWH.getBounds().height;
            this.addChild(areaUtilWH);
        }

    }
}
console.log('myapp.MainMenu.ts');