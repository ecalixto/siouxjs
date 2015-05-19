/**
 * Provides the base Widget class...
 *
 * @module siouxjs
 */
module siouxjs {
    "use strict";

    var _app: Application;
    var _assets;

    export declare var App: Application;
    Object.defineProperty(siouxjs, "App", {
        get: function () { return _app; }
    });
    export declare var Assets: Application;
    Object.defineProperty(siouxjs, "Assets", {
        get: function () { return _assets; }
    });

    export var objOrientation: Orientation;

    export function initialize<T extends Application>(myApp: T) {

        _app = myApp;

        _assets = _assets || {};

        // avoid scrolling
        document.addEventListener(
            "touchstart",
            function () { return false; },
            false
            );

        // do the first app resize
        _app.resize();

        // EnterFrame: tick event
        createjs.Ticker.setFPS(Config.nFPS);
        createjs.Ticker.timingMode = Config.timingMode;
        createjs.Ticker.on("tick",(e: createjs.Event) => {
            _app.update();
        });

        doLoader();

        window.onresize = function () {
            _app.resize();
        };
    }

    function doLoader(): void {

        var loadQueue: createjs.LoadQueue = new createjs.LoadQueue(false);

        var objLoad: LoadingBase = _app.onBeforeLoad();

        loadQueue.on("error",(e: createjs.ErrorEvent) => {
            log("LOAD ERR" + e.message);
            logHtml("LOAD ERR" + e.message);
        });

        loadQueue.on("fileload",(e: createjs.Event) => {
            _assets[e.item.id] = e.result;
        });

        loadQueue.on("complete", (e: createjs.Event) => {

            _app.onAfterLoad();
            objLoad = null;

            maskOnOff();

            // Check Orientation se o COnfig.bCheckOrientation = true
            checkOrientation();

            if (Config.sVersion !== "") {
                var txtVersao = new createjs.Text(Config.sVersion + "(x" + _app.Settings.appScaleTexture + ")", "15px Arial", "#000000");
                txtVersao.textAlign = "right";
                txtVersao.x = _app.Settings.appSizeGuide.width;
                txtVersao.y = _app.Settings.appSizeGuide.height - txtVersao.getMeasuredHeight() - 3;
                // stage.addChild(txtVersao);
            }

            _app.onReady();
        });
        loadQueue.on("progress",(e: createjs.Event) => {
            if (objLoad != null) { objLoad.onProgress(Math.round(e.progress * 100)); }
        });

        // Fator 
        for (var i: number = 0; i < Config.manifestLoad.length; i++) {
            Config.manifestLoad[i].src = Config.manifestLoad[i].src.replace("@x", _app.Settings.appScaleTexture + "x");
        }

        loadQueue.loadManifest(Config.manifestLoad);
    }

    function maskOnOff(): void {
        if (Config.bMask) {
            var mask = new createjs.Shape();
            mask.graphics.beginFill("#f00").drawRect(0, 0, _app.Settings.appSizeGuide.width, _app.Settings.appSizeGuide.height);
            // telas.mask = mask;
            // popups.mask = mask;
            // this.stage.addChild(mask);
        }
    }
    function checkOrientation(): void {
        if (Config.bCheckOrientation && util.Browser.isMobile()) {
            objOrientation = new Orientation();
            // stage.addChild(this._objOrientation);
            objOrientation.checkOrientation();
        }
    }

    // Deprecated
    export function GetAsset(id: string): Object {
        console.log("GetAsset() is deprecated... you must use the siouxjs.Asset[] property");
        return _assets[id];
    }


    export function mouseY(pStage:createjs.Stage): number {
        return (pStage.mouseY - pStage.y) / _app.Settings.appScale;
    }
    export function mouseX(pStage: createjs.Stage): number {
        return (pStage.mouseX - pStage.x) / _app.Settings.appScale;
    }

    export function log(pMessage: string): void {
        if (_app.canvas["debug"] != null) {
            var obj = new createjs.Text(pMessage);
            obj.y = _app.canvas["debug"].stage.children.length * 10;
            _app.canvas["debug"].stage.addChild(obj);
        }
    }
    export function logHtml(pMessage: string) {
        var div = document.getElementById("divLog");
        div.innerHTML = pMessage + "<br>" + div.innerHTML;
    }
}
console.log("siouxjs.ts");