module siouxjs.ui {
    "use strict";

    class Fader extends createjs.Shape {

        constructor(hasClickBlock: boolean = true, alpha: number = Theme.Fader.alpha) {
            super();
            this.graphics
                .beginFill(Theme.Fader.color)
                .drawRect(siouxjs.App.Settings.areaUtil.x, siouxjs.App.Settings.areaUtil.y, siouxjs.App.Settings.areaUtil.width, siouxjs.App.Settings.areaUtil.height);
            this.alpha = alpha;
            if (hasClickBlock)
                this.on("click",(e: MouseEvent) => { e.stopImmediatePropagation(); });
        }
    }
}