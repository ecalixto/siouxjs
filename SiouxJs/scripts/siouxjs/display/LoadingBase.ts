module siouxjs {
    "use strict";

    export class LoadingBase extends createjs.Container {

        public onProgress(nProgress: number): void {
            throw new Error("This method is abstract");
        }
    }
}
