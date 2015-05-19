module siouxjs.util {

    export class DisplayObject {

        static distancia(obj1: createjs.DisplayObject, obj2: createjs.DisplayObject): number {
            return Math.sqrt(Math.pow(obj2.x - obj1.x, 2) + Math.pow(obj2.y - obj1.y, 2));
        }
        static alignRight(obj: createjs.DisplayObject, margin: number, fromObj?: createjs.DisplayObject): void {
            if (fromObj) {
                obj.x = fromObj.x - obj.getBounds().width - margin;
            } else {
                obj.x = siouxjs.App.Settings.areaUtil.x + siouxjs.App.Settings.areaUtil.width - (obj.getBounds().width * obj.scaleX) - margin;
            }
        }
        static alignLeft(obj: createjs.DisplayObject, margin: number, fromObj?: createjs.DisplayObject): void {
            if (fromObj) {
                obj.x = fromObj.x + fromObj.getBounds().width + margin;
            } else {
                obj.x = siouxjs.App.Settings.areaUtil.x + margin;
            }
        }

        static alignTop(obj: createjs.DisplayObject, margin: number, fromObj?: createjs.DisplayObject): void {
            if (fromObj) {
                obj.y = fromObj.y + fromObj.getBounds().height + margin;
            } else {
                obj.y = siouxjs.App.Settings.areaUtil.y + margin;
            }
        }

        static alignBottom(obj: createjs.DisplayObject, margin: number, fromObj?: createjs.DisplayObject): void {
            if (fromObj) {
                obj.y = fromObj.y - obj.getBounds().height - margin;
            } else {
                obj.y = siouxjs.App.Settings.areaUtil.height - (obj.getBounds().height * obj.scaleY) - margin;
            }
        }
    }
} 