// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397705
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
var SiouxJs;
(function (SiouxJs) {
    "use strict";
    var Application;
    (function (Application) {
        var myapp;
        function initialize() {
            document.addEventListener('deviceready', onDeviceReady, false);
        }
        Application.initialize = initialize;
        function onDeviceReady() {
            // Handle the Cordova pause and resume events
            document.addEventListener('pause', onPause, false);
            document.addEventListener('resume', onResume, false);
            // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
            // adiciona handler para o click do back button do Android
            if (siouxjs.util.Browser.Android())
                document.addEventListener("backbutton", onBackKeyDown, false);
            myapp = new MyApp.MyApplication();
            siouxjs.initialize(myapp);
        }
        Application.onDeviceReady = onDeviceReady;
        function onPause() {
            // TODO: This application has been suspended. Save application state here.
            myapp.pause();
        }
        function onResume() {
            // TODO: This application has been reactivated. Restore application state here.
            myapp.resume();
        }
        function onBackKeyDown(e) {
            e.preventDefault();
            myapp.onBackKeyDown();
        }
    })(Application = SiouxJs.Application || (SiouxJs.Application = {}));
    window.onload = function () {
        Application.initialize();
    };
})(SiouxJs || (SiouxJs = {}));
// Platform specific overrides will be placed in the merges folder versions of this file 
/// <reference path="../typings/createjs/createjs.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MyApp;
(function (MyApp) {
    var Backgroud = (function (_super) {
        __extends(Backgroud, _super);
        function Backgroud() {
            _super.call(this);
            // BG
            var bg = new siouxjs.ui.SXBitmap(siouxjs.Assets['Backgroud'], true);
            bg.y = (siouxjs.App.Settings.appSizeGuide.height - bg.height) / 2;
            bg.x = (siouxjs.App.Settings.appSizeGuide.width - bg.width) / 2;
            this.addChild(bg);
        }
        return Backgroud;
    })(createjs.Container);
    MyApp.Backgroud = Backgroud;
})(MyApp || (MyApp = {}));
var MyApp;
(function (MyApp) {
    var Global = (function () {
        function Global() {
        }
        Global.isOnline = false;
        Global.isSFXVolumeOn = true;
        Global.isBGMVolumeOn = true;
        Global.isSkipDiceAnim = false;
        Global.isAutoDice = false;
        return Global;
    })();
})(MyApp || (MyApp = {}));
var siouxjs;
(function (siouxjs) {
    "use strict";
    var LoadingBase = (function (_super) {
        __extends(LoadingBase, _super);
        function LoadingBase() {
            _super.apply(this, arguments);
        }
        LoadingBase.prototype.onProgress = function (nProgress) {
            throw new Error("This method is abstract");
        };
        return LoadingBase;
    })(createjs.Container);
    siouxjs.LoadingBase = LoadingBase;
})(siouxjs || (siouxjs = {}));
/// <reference path="../siouxjs/display/loadingbase.ts" />
var MyApp;
(function (MyApp) {
    var Loading = (function (_super) {
        __extends(Loading, _super);
        function Loading() {
            _super.call(this);
            this._barraCarregando = new siouxjs.BarraPorcentagem(siouxjs.App.Settings.appSizeGuide.width * .8, 40, true);
            this.addChild(this._barraCarregando);
            this._barraCarregando.x = (siouxjs.App.Settings.appSizeGuide.width - this._barraCarregando.getBounds().width) * 0.5;
            this._barraCarregando.y = (siouxjs.App.Settings.appSizeGuide.height + 2 * siouxjs.App.Settings.appTopOffset) - 120;
            var lgSioux = new siouxjs.ui.SXBitmap(Config.sPathGlobal + 'assets/theme/@x/lgSioux.gif');
            lgSioux.visible = false;
            this.addChild(lgSioux);
            // Espera carregar para centralizar.
            var that = this;
            lgSioux.onLoad = function () {
                lgSioux.x = (siouxjs.App.Settings.appSizeGuide.width - lgSioux.width) * 0.5;
                lgSioux.y = that._barraCarregando.y - lgSioux.height - 20;
                lgSioux.visible = true;
            };
        }
        Loading.prototype.onProgress = function (nProgress) {
            this._barraCarregando.nPorcentagem = nProgress;
        };
        return Loading;
    })(siouxjs.LoadingBase);
    MyApp.Loading = Loading;
})(MyApp || (MyApp = {}));
/**
 * Provides the base Widget class...
 *
 * @module siouxjs
 */
var siouxjs;
(function (siouxjs) {
    "use strict";
    /**
     * Base class for an application
     *
     * @class Application
     * @constructor
     */
    var Application = (function () {
        function Application() {
            this._canvas = {};
            this.Settings = {
                appScale: 1,
                deviceSize: new createjs.Rectangle(),
                appSizeGuide: new createjs.Rectangle(),
                appLeftOffset: 0,
                appTopOffset: 0,
                appScaleTexture: 1,
                areaUtil: new createjs.Rectangle() // Area util, varia em função de estar utilizando mascara ou não.
            };
        }
        Object.defineProperty(Application.prototype, "canvas", {
            /**
             * Dictionary with all application's canvas
             *
             * @property canvas
             * @type {ICanvasMap}
             */
            get: function () {
                return this._canvas;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "popups", {
            /**
             * Manager of application's popups
             *
             * @property popups
             * @type {siouxjs.PopupManager}
             */
            get: function () {
                return this._popups;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "sceneManager", {
            /**
             * Manager of application's scenes
             *
             * @property sceneManager
             * @type {siouxjs.SceneManager}
             */
            get: function () {
                return this._sceneManager;
            },
            enumerable: true,
            configurable: true
        });
        Application.prototype.pause = function () {
        };
        Application.prototype.resume = function () {
        };
        Application.prototype.onBackKeyDown = function () {
        };
        Application.prototype.onBeforeLoad = function () {
            return null;
        };
        Application.prototype.onAfterLoad = function () {
            return;
        };
        Application.prototype.onReady = function () {
        };
        /**
         * Update all application's canvas
         *
         * @method update
         * @return none
         */
        Application.prototype.update = function () {
            for (var key in this._canvas) {
                this._canvas[key].update();
            }
        };
        /**
         * Add a canvas object to application
         *
         * @method setCanvas
         * @param pCanvas {Canvas} Canvas to be added
         * @return none
         */
        Application.prototype.setCanvas = function (pCanvas) {
            this._canvas[pCanvas.idCanvas] = pCanvas;
        };
        Application.prototype.resize = function () {
            var appSize = new createjs.Rectangle(); // Tamanho do App
            // ATENTION: Windows do not have devicePixelRatio defined. You must calculate it.
            if (window.devicePixelRatio === undefined) {
                window.devicePixelRatio = window.screen.deviceXDPI / window.screen.logicalXDPI;
            }
            this.Settings.appSizeGuide = Config.appSizeGuide;
            appSize = this.Settings.appSizeGuide.clone();
            this.Settings.deviceSize = new createjs.Rectangle(0, 0, window.innerWidth, window.innerHeight);
            this.Settings.appScale = 1;
            this.Settings.appLeftOffset = this.Settings.appTopOffset = 0;
            // if device is wider than GUI's aspect ratio, height determines scale
            if ((this.Settings.deviceSize.width / this.Settings.deviceSize.height) > (this.Settings.appSizeGuide.width / this.Settings.appSizeGuide.height)) {
                this.Settings.appScale = this.Settings.deviceSize.height / this.Settings.appSizeGuide.height;
                appSize.width = this.Settings.appSizeGuide.width * this.Settings.appScale;
                appSize.height = this.Settings.appSizeGuide.height * this.Settings.appScale;
                this.Settings.appLeftOffset = Math.round((this.Settings.deviceSize.width - appSize.width) / 2);
            }
            else {
                this.Settings.appScale = this.Settings.deviceSize.width / this.Settings.appSizeGuide.width;
                appSize.width = this.Settings.appSizeGuide.width * this.Settings.appScale;
                appSize.height = this.Settings.appSizeGuide.height * this.Settings.appScale;
                this.Settings.appTopOffset = Math.round((this.Settings.deviceSize.height - appSize.height) / 2);
            }
            // Sets variables with PixelRatio app.
            this.Settings.appLeftOffset = this.Settings.appLeftOffset * window.devicePixelRatio;
            this.Settings.appTopOffset = this.Settings.appTopOffset * window.devicePixelRatio;
            this.Settings.appScale = this.Settings.appScale * window.devicePixelRatio;
            this.Settings.deviceSize.width = this.Settings.deviceSize.width * window.devicePixelRatio;
            this.Settings.deviceSize.height = this.Settings.deviceSize.height * window.devicePixelRatio;
            for (var key in this._canvas) {
                this._canvas[key].doResize();
            }
            this.Settings.appLeftOffset = this.Settings.appLeftOffset / this.Settings.appScale;
            this.Settings.appTopOffset = this.Settings.appTopOffset / this.Settings.appScale;
            // Width
            var widthTotal = 0;
            var left = 0;
            // Height
            var heightTotal = 0;
            var top = 0;
            switch (Config.nAreaUtilTipo) {
                case 2 /* Max */:
                    // Width
                    var widthTotalDevice = this.Settings.appSizeGuide.width + (2 * this.Settings.appLeftOffset);
                    widthTotal = Math.min(widthTotalDevice, Config.nAreaUtilWidthMax);
                    left = (this.Settings.appSizeGuide.width - widthTotal) / 2;
                    // Height
                    var heightTotalDevice = this.Settings.appSizeGuide.height + (2 * this.Settings.appTopOffset);
                    heightTotal = Math.min(heightTotalDevice, Config.nAreaUtilHeightMax);
                    top = (this.Settings.appSizeGuide.height - heightTotal) / 2;
                    heightTotal = heightTotal + top;
                    break;
                case 1 /* Device */:
                    // Width
                    widthTotal = this.Settings.appSizeGuide.width + this.Settings.appLeftOffset;
                    left = -this.Settings.appLeftOffset;
                    // Height
                    heightTotal = this.Settings.appSizeGuide.height + this.Settings.appTopOffset;
                    top = -this.Settings.appTopOffset;
                    break;
                case 0 /* Guide */:
                default:
                    // Width
                    left = 0;
                    widthTotal = this.Settings.appSizeGuide.width;
                    // Height
                    top = 0;
                    heightTotal = this.Settings.appSizeGuide.height;
                    break;
            }
            this.Settings.areaUtil = new createjs.Rectangle(left, top, widthTotal, heightTotal);
            for (var i = 0; i < Config.aScaleTexture.length; i++) {
                this.Settings.appScaleTexture = Config.aScaleTexture[i];
                if (this.Settings.appScale <= Config.aScaleTexture[i]) {
                    break;
                }
            }
        };
        return Application;
    })();
    siouxjs.Application = Application;
})(siouxjs || (siouxjs = {}));
console.log("siouxjs.Application.ts");
/// <reference path="../siouxjs/Application.ts"/>
/// <reference path="backgroud.ts" />
var MyApp;
(function (MyApp) {
    var MyApplication = (function (_super) {
        __extends(MyApplication, _super);
        function MyApplication() {
            _super.call(this);
            this.setCanvas(new siouxjs.Canvas("background", 0));
            this.setCanvas(new siouxjs.Canvas("main"));
        }
        Object.defineProperty(MyApplication.prototype, "resources", {
            get: function () {
                return this._resources.Resources();
            },
            enumerable: true,
            configurable: true
        });
        MyApplication.prototype.pause = function () {
        };
        MyApplication.prototype.resume = function () {
        };
        MyApplication.prototype.onBackKeyDown = function () {
            if (this._sceneManager.currentScene != null)
                this._sceneManager.currentScene.onBackKeyDown();
        };
        MyApplication.prototype.onBeforeLoad = function () {
            var obj = new MyApp.Loading();
            this.canvas["main"].stage.addChild(obj);
            return obj;
        };
        MyApplication.prototype.onAfterLoad = function () {
            this.canvas["main"].stage.removeAllChildren();
            return;
        };
        MyApplication.prototype.onReady = function () {
            // BackGroud
            this.backgroud = new MyApp.Backgroud();
            this.canvas["background"].stage.addChild(this.backgroud);
            this.canvas["background"].update(true);
            // Controle de Telas
            this._sceneManager = new siouxjs.SceneManager();
            // Controle de Popup
            this._popups = new siouxjs.PopupManager();
            // Resources
            this._resources = new siouxjs.util.ResourceManager(enResource, ptResource);
            this._resources.setLanguage("pt");
            // Adiciona Layer no stage
            this.canvas['main'].stage.addChild(this._sceneManager, this.popups);
            // Muda a Tela
            this._sceneManager.changeScene(new MyApp.Scenes.MainMenu());
        };
        return MyApplication;
    })(siouxjs.Application);
    MyApp.MyApplication = MyApplication;
})(MyApp || (MyApp = {}));
console.log("myapp.MyApplication.ts");
/// <reference path="./Scene.ts" />
var siouxjs;
(function (siouxjs) {
    "use strict";
    var SceneManager = (function (_super) {
        __extends(SceneManager, _super);
        function SceneManager() {
            var _this = this;
            _super.call(this);
            this._isBusy = false;
            this.onChangeSceneComplete = function () {
                if (_this._outScene != null) {
                    _this._outScene.onEndLeaveScene();
                    _this.removeChild(_this._outScene);
                    _this._outScene = null;
                }
                _this._currentScene.onEndEnterScene();
                _this._isBusy = false;
            };
            this.includeScene = function () {
                _this._currentScene.visible = true;
                switch (_this._inTransition) {
                    case 1 /* Up */:
                        _this._currentScene.y = _this._currentScene.y - (siouxjs.App.Settings.appSizeGuide.height + 50);
                        createjs.Tween.get(_this._currentScene).to({ y: 0 }, _this._timeTransition).call(_this.onChangeSceneComplete);
                        break;
                    case 2 /* Down */:
                        _this._currentScene.y = _this._currentScene.y + (siouxjs.App.Settings.appSizeGuide.height + 50);
                        createjs.Tween.get(_this._currentScene).to({ y: 0 }, _this._timeTransition).call(_this.onChangeSceneComplete);
                        break;
                    case 3 /* Left */:
                        _this._currentScene.x = _this._currentScene.x - (siouxjs.App.Settings.appSizeGuide.width + 50);
                        createjs.Tween.get(_this._currentScene).to({ x: 0 }, _this._timeTransition).call(_this.onChangeSceneComplete);
                        break;
                    case 4 /* Right */:
                        _this._currentScene.x = _this._currentScene.x + (siouxjs.App.Settings.appSizeGuide.width + 50);
                        createjs.Tween.get(_this._currentScene).to({ x: 0 }, _this._timeTransition).call(_this.onChangeSceneComplete);
                        break;
                    case 6 /* Blank */:
                        _this.onChangeSceneComplete();
                        break;
                    default:
                        _this.onChangeSceneComplete();
                }
            };
        }
        Object.defineProperty(SceneManager.prototype, "currentScene", {
            get: function () {
                return this._currentScene;
            },
            enumerable: true,
            configurable: true
        });
        /*
            Executa a Transição de uma Tela
        */
        SceneManager.prototype.changeScene = function (toScene, inTransition, outTransition, timeTransition) {
            if (inTransition === void 0) { inTransition = 5 /* Cover */; }
            if (outTransition === void 0) { outTransition = 0 /* None */; }
            if (timeTransition === void 0) { timeTransition = 500; }
            // if the scene doesnt really changes, there is nothing to do
            if (toScene === this._currentScene) {
                return;
            }
            // if busy then returns
            if (this._isBusy) {
                return;
            }
            this._isBusy = true;
            this._inTransition = inTransition;
            this._outTransition = outTransition;
            this._timeTransition = timeTransition;
            this._outScene = this._currentScene;
            this._currentScene = toScene;
            this._currentScene.manager = this;
            this._currentScene.visible = false;
            this._currentScene.onBeginEnterScene();
            this.addChild(this._currentScene);
            this.removeScene();
        };
        SceneManager.prototype.removeScene = function () {
            // Elementos que Sai
            if (this._outScene) {
                this._outScene.visible = true;
                this._outScene.onBeginLeaveScene();
                switch (this._outTransition) {
                    case 1 /* Up */:
                        this._outScene.y = 0;
                        createjs.Tween.get(this._outScene).to({ y: (this._outScene.y - (siouxjs.App.Settings.appSizeGuide.height + 50)) }, this._timeTransition).call(this.includeScene);
                        break;
                    case 2 /* Down */:
                        this._outScene.y = 0;
                        createjs.Tween.get(this._outScene).to({ y: (this._outScene.y + (siouxjs.App.Settings.appSizeGuide.height + 50)) }, this._timeTransition).call(this.includeScene);
                        break;
                    case 3 /* Left */:
                        this._outScene.x = 0;
                        createjs.Tween.get(this._outScene).to({ x: (this._outScene.x - (siouxjs.App.Settings.appSizeGuide.width + 50)) }, this._timeTransition).call(this.includeScene);
                        break;
                    case 4 /* Right */:
                        this._outScene.x = 0;
                        createjs.Tween.get(this._outScene).to({ x: (this._outScene.x + (siouxjs.App.Settings.appSizeGuide.width + 50)) }, this._timeTransition).call(this.includeScene);
                        break;
                    case 6 /* Blank */:
                        this.includeScene();
                        break;
                    default:
                        this.includeScene();
                }
            }
            else {
                this.includeScene();
            }
        };
        return SceneManager;
    })(createjs.Container);
    siouxjs.SceneManager = SceneManager;
})(siouxjs || (siouxjs = {}));
console.log("siouxjs.SceneManager.ts");
/// <reference path="../../typings/createjs/createjs.d.ts" />
/// <reference path="./SceneManager.ts" />
var siouxjs;
(function (siouxjs) {
    "use strict";
    var Scene = (function (_super) {
        __extends(Scene, _super);
        function Scene() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(Scene.prototype, "manager", {
            get: function () {
                return this._manager;
            },
            set: function (value) {
                this._manager = value;
            },
            enumerable: true,
            configurable: true
        });
        Scene.prototype.onBeginEnterScene = function () {
        };
        Scene.prototype.onEndEnterScene = function () {
        };
        Scene.prototype.onBeginLeaveScene = function () {
        };
        Scene.prototype.onEndLeaveScene = function () {
        };
        Scene.prototype.onBackKeyDown = function () {
        };
        return Scene;
    })(createjs.Container);
    siouxjs.Scene = Scene;
})(siouxjs || (siouxjs = {}));
console.log("siouxjs.Scene.ts");
/// <reference path="../../siouxjs/display/scene.ts" />
var MyApp;
(function (MyApp) {
    var Scenes;
    (function (Scenes) {
        "use strict";
        var ButtonScene = (function (_super) {
            __extends(ButtonScene, _super);
            function ButtonScene() {
                _super.call(this);
                this.name = 'ButtonScene';
                // ### bt3GridTheme
                var bt3GridTheme = new siouxjs.ui.Scale3Button('Scale3Button-Theme');
                this.addChild(bt3GridTheme);
                // ### bt3GridCustomized
                var image;
                var image3;
                // StateOn
                image = siouxjs.Assets[Theme.Button9.imagemOn];
                image3 = new siouxjs.ui.Scale3Bitmap(new createjs.Bitmap(image).image, 20, 40);
                var bt3GridStateOn = new siouxjs.ui.Scale3ButtonState(image3, 'Scale3Button-Theme-ON', "26px Arial", "#000", new createjs.Rectangle(25, 10, 25, 20));
                // StateDown
                image = siouxjs.Assets[Theme.Button9.imagemDown];
                image3 = new siouxjs.ui.Scale3Bitmap(new createjs.Bitmap(image).image, 20, 40);
                var bt3GridStateDowwn = new siouxjs.ui.Scale3ButtonState(image3, 'Scale3Button-Theme-DOWN', "30px Arial", "#fff", new createjs.Rectangle(25, 5, 25, 20));
                // label can't be ''
                var bt3GridCustomized = new siouxjs.ui.Scale3Button('customize', true, bt3GridStateOn, bt3GridStateDowwn);
                siouxjs.util.DisplayObject.alignTop(bt3GridCustomized, 10, bt3GridTheme);
                this.addChild(bt3GridCustomized);
                // ### bt9GridTheme
                var bt9GridTheme = new siouxjs.ui.Scale9Button('Scale9Button-Theme');
                siouxjs.util.DisplayObject.alignTop(bt9GridTheme, 10, bt3GridCustomized);
                this.addChild(bt9GridTheme);
            }
            return ButtonScene;
        })(siouxjs.Scene);
        Scenes.ButtonScene = ButtonScene;
    })(Scenes = MyApp.Scenes || (MyApp.Scenes = {}));
})(MyApp || (MyApp = {}));
console.log('myapp.MainMenu.ts');
/// <reference path="../../siouxjs/display/scene.ts" />
var MyApp;
(function (MyApp) {
    var Scenes;
    (function (Scenes) {
        "use strict";
        var ComponetsScene = (function (_super) {
            __extends(ComponetsScene, _super);
            function ComponetsScene() {
                _super.call(this);
                this.name = 'ComponetsScene';
                var addItem = new siouxjs.ui.ItemAdd('icMoeda', 200);
                this.addChild(addItem);
            }
            return ComponetsScene;
        })(siouxjs.Scene);
        Scenes.ComponetsScene = ComponetsScene;
    })(Scenes = MyApp.Scenes || (MyApp.Scenes = {}));
})(MyApp || (MyApp = {}));
console.log('myapp.ComponetsScene.ts');
/// <reference path="../../siouxjs/display/scene.ts" />
var MyApp;
(function (MyApp) {
    var Scenes;
    (function (Scenes) {
        "use strict";
        var CoordinatesScene = (function (_super) {
            __extends(CoordinatesScene, _super);
            function CoordinatesScene() {
                _super.call(this);
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
            return CoordinatesScene;
        })(siouxjs.Scene);
        Scenes.CoordinatesScene = CoordinatesScene;
    })(Scenes = MyApp.Scenes || (MyApp.Scenes = {}));
})(MyApp || (MyApp = {}));
console.log('myapp.MainMenu.ts');
/// <reference path="../../siouxjs/display/scene.ts" />
var MyApp;
(function (MyApp) {
    var Scenes;
    (function (Scenes) {
        "use strict";
        var MainMenu = (function (_super) {
            __extends(MainMenu, _super);
            function MainMenu() {
                _super.call(this);
                this.name = 'MainMenu';
                // Test Imag
                var img = new siouxjs.ui.SXBitmap(siouxjs.Assets['icMoeda'], true);
                this.addChild(img);
                console.log(img.getBounds());
                var bt3Grid = new siouxjs.ui.Scale3Button('Button Screen');
                bt3Grid.y = 550;
                bt3Grid.x = (siouxjs.App.Settings.appSizeGuide.width - bt3Grid.getBounds().width) / 2;
                bt3Grid.onClick(this.onClickBt3Grid);
                this.addChild(bt3Grid);
                var btCoordinates = new siouxjs.ui.Scale3Button('Coordinates Screen');
                btCoordinates.y = 650;
                btCoordinates.x = (siouxjs.App.Settings.appSizeGuide.width - btCoordinates.getBounds().width) / 2;
                btCoordinates.onClick(this.onClickBtCoordinates);
                this.addChild(btCoordinates);
                var btComponets = new siouxjs.ui.Scale3Button('btComponets Screen');
                btComponets.y = 750;
                btComponets.x = (siouxjs.App.Settings.appSizeGuide.width - btComponets.getBounds().width) / 2;
                btComponets.onClick(this.onClickBtbtComponets);
                this.addChild(btComponets);
            }
            // Go to Button Screen
            MainMenu.prototype.onClickBt3Grid = function (event) {
                siouxjs.App.sceneManager.changeScene(new Scenes.ButtonScene());
            };
            // Go to Coordinates Screen
            MainMenu.prototype.onClickBtCoordinates = function (event) {
                siouxjs.App.sceneManager.changeScene(new Scenes.CoordinatesScene());
            };
            // Go to Coordinates Screen
            MainMenu.prototype.onClickBtbtComponets = function (event) {
                siouxjs.App.sceneManager.changeScene(new Scenes.ComponetsScene());
            };
            return MainMenu;
        })(siouxjs.Scene);
        Scenes.MainMenu = MainMenu;
    })(Scenes = MyApp.Scenes || (MyApp.Scenes = {}));
})(MyApp || (MyApp = {}));
console.log('myapp.MainMenu.ts');
var Config;
(function (Config) {
    Config.bDebug = true;
    // Tamanho do grid guia
    Config.appSizeGuide = new createjs.Rectangle(0, 0, 768, 1024);
    // Google Analytics
    Config.bGoogleAnalytics = false;
    Config.UAGoogleAnalytics = 'UA-00000000-0';
    Config.nFPS = 30;
    Config.timingMode = createjs.Ticker.RAF_SYNCHED;
    Config.sPathGlobal = '';
    Config.sVersion = 'v 0.01';
    // True se é para colocar uma mascara sobre as telas, deixando visivel apenas a área appSizeGuide
    Config.bMask = false;
    Config.nAreaUtilWidthMax = 768; // Só é usado quando o bMask é FALSE
    Config.nAreaUtilHeightMax = 1363; // Só é usado quando o bMask é FALSE
    (function (AREAUTIL) {
        AREAUTIL[AREAUTIL["Guide"] = 0] = "Guide";
        AREAUTIL[AREAUTIL["Device"] = 1] = "Device";
        AREAUTIL[AREAUTIL["Max"] = 2] = "Max";
    })(Config.AREAUTIL || (Config.AREAUTIL = {}));
    var AREAUTIL = Config.AREAUTIL;
    ;
    Config.nAreaUtilTipo = 2 /* Max */;
    // Orientação do celular
    Config.bCheckOrientation = false;
    Config.nOrientation = 2 /* Landscape */;
    // ScaleTexture: Utiliza para pegar as texturas do diretorio correto 1x, 2x, 3x, etc.
    // Configurar quais tem textura suportada, ordem do menor para o maior
    // ATENÇÃO! Precisa utilizar o push por segurançao, por que se usar Array(1) configura o tamanho do Array não 1 como primeiro elemento
    Config.aScaleTexture = Array();
    Config.aScaleTexture.push(2);
    //aScaleTexture.push(2);
    Config.manifestLoad = [
        { src: Config.sPathGlobal + 'assets/theme/@x/bt/bt9On.png', id: 'ThemeBt9On' },
        { src: Config.sPathGlobal + 'assets/theme/@x/bt/bt9Down.png', id: 'ThemeBt9Down' },
        { src: Config.sPathGlobal + 'assets/theme/@x/bt/bt9Over.png', id: 'ThemeBt9Over' },
        { src: Config.sPathGlobal + 'assets/theme/@x/bt/bt3On.png', id: 'ThemeBt3On' },
        { src: Config.sPathGlobal + 'assets/theme/@x/bt/bt3Down.png', id: 'ThemeBt3Down' },
        { src: Config.sPathGlobal + 'assets/theme/@x/bt/bt3Over.png', id: 'ThemeBt3Over' },
        { src: Config.sPathGlobal + 'assets/theme/@x/bgItem.png', id: 'ThemeBgItem' },
        { src: Config.sPathGlobal + 'assets/textures/@x/icons/icMoeda.png', id: 'icMoeda' },
        { src: Config.sPathGlobal + 'assets/textures/@x/buton/btAddOn.png', id: 'btAddOn' },
        { src: Config.sPathGlobal + 'assets/textures/@x/buton/btAddDown.png', id: 'btAddDown' },
        { src: Config.sPathGlobal + 'assets/textures/@x/Backgroud.jpg', id: 'Backgroud' },
    ];
})(Config || (Config = {}));
console.log('Config.ts');
var siouxjs;
(function (siouxjs) {
    var util;
    (function (util) {
        var ResourceManager = (function () {
            function ResourceManager() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                this._res = {};
                for (var i = 0; i < args.length; i++) {
                    this._res[args[i].language] = args[i];
                }
            }
            ResourceManager.prototype.setLanguage = function (lang) {
                this._lang = lang;
            };
            ResourceManager.prototype.Resources = function () {
                return this._res[this._lang];
            };
            return ResourceManager;
        })();
        util.ResourceManager = ResourceManager;
    })(util = siouxjs.util || (siouxjs.util = {}));
})(siouxjs || (siouxjs = {}));
/// <reference path="../../siouxjs/utils/resourcemanager.ts" />
var ptResource = {
    language: "pt",
    abertura: {
        texto1: "ESCOLHA UM MODO DE JOGO",
        texto2: "PARA COMEÇAR A SE DIVERTIR",
        btLocal: "MODO LOCAL",
        btOnline: "MODO ONLINE"
    },
    selecaoExercito: {
        titulo: "SELECIONE OS EXÉRCITOS PARA MONTAR SUA PARTIDA",
        exercito: "EXÉRCITO",
        jogador: "JOGADOR",
        cpu: "CPU",
        comecarJogo: "COMEÇAR JOGO"
    },
    play: {
        btEntrar: "Entrar"
    }
};
var enResource = {
    language: "en",
    abertura: {
        texto1: "CHOOSE A GAME MODE",
        texto2: "TO START HAVING FUN",
        btLocal: "LOCAL MODE",
        btOnline: "ONLINE MODE"
    },
    selecaoExercito: {
        titulo: "SELECT THE ARMS TO START THE GAME",
        exercito: "ARM",
        jogador: "PLAYER",
        cpu: "CPU",
        comecarJogo: "START GAME"
    },
    play: {
        btEntrar: "Enter"
    }
};
var Theme;
(function (Theme) {
    "use strict";
    var General;
    (function (General) {
        General.cor1 = "#2c0d47";
        General.cor2 = "#2c0d47";
        General.titulo = "bold 30px Arial";
        General.tituloCor1 = '#000000';
        General.texto = "15px Arial";
        General.textoCor1 = '#000000';
        General.labelBigFont = "24px Arial";
        General.labelBigColor = "#dddddd";
        General.labelMediumFont = "20px Arial";
        General.labelMediumColor = "#dddddd";
    })(General = Theme.General || (Theme.General = {}));
    var Button9;
    (function (Button9) {
        // On
        Button9.fontOn = "26px Arial";
        Button9.colorOn = "#dddddd";
        Button9.imagemOn = "ThemeBt9On";
        Button9.sizeOn = new createjs.Rectangle(15, 15, 200, 25);
        Button9.marginOn = new createjs.Rectangle(20, 10, 20, 20);
        // Down
        Button9.fontDown = "26px Arial";
        Button9.colorDown = "#dddddd";
        Button9.imagemDown = "ThemeBt9Down";
        Button9.sizeDown = new createjs.Rectangle(15, 15, 200, 25);
        Button9.marginDown = new createjs.Rectangle(20, 12, 20, 18);
        // Over
        Button9.fontOver = "26px Arial";
        Button9.colorOver = "#dddddd";
        Button9.imagemOver = "ThemeBt9Over";
        Button9.sizeOver = new createjs.Rectangle(15, 15, 200, 25);
        Button9.marginOver = new createjs.Rectangle(20, 12, 20, 18);
    })(Button9 = Theme.Button9 || (Theme.Button9 = {}));
    var Button3;
    (function (Button3) {
        // On
        Button3.fontOn = "26px Arial";
        Button3.colorOn = "#000";
        Button3.imagemOn = "ThemeBt3On";
        Button3.sizeOnX1 = 40;
        Button3.sizeOnX2 = 125;
        Button3.marginOn = new createjs.Rectangle(25, 10, 25, 20);
        // Down
        Button3.fontDown = "26px Arial";
        Button3.colorDown = "#fff";
        Button3.imagemDown = "ThemeBt3Down";
        Button3.sizeDownX1 = 40;
        Button3.sizeDownX2 = 125;
        Button3.marginDown = new createjs.Rectangle(25, 12, 25, 18);
        // Over
        Button3.fontOver = "26px Arial";
        Button3.colorOver = "#fff";
        Button3.imagemOver = "ThemeBt3On";
        Button3.sizeOverX1 = 40;
        Button3.sizeOverX2 = 125;
        Button3.marginOver = new createjs.Rectangle(25, 8, 25, 22);
    })(Button3 = Theme.Button3 || (Theme.Button3 = {}));
    var Popup;
    (function (Popup) {
        Popup.img9bg = "ThemeBgPopup";
        Popup.size9bg = new createjs.Rectangle(50, 50, 110, 40);
        Popup.largura = 500;
        Popup.altura = 300;
        // Box
        Popup.boxCor = "#000";
        Popup.boxAlpha = .8;
        // Titulo
        Popup.tituloMarginTop = 20;
        // Texto
        Popup.textoMargin = 40;
    })(Popup = Theme.Popup || (Theme.Popup = {}));
    var Ranking;
    (function (Ranking) {
        Ranking.img9bg = "ThemeBgPopup";
        Ranking.size9bg = new createjs.Rectangle(50, 50, 110, 40);
        Ranking.largura = 600;
        Ranking.altura = 740;
        Ranking.listX = 50;
        Ranking.listY = 150;
        Ranking.listLargura = 460;
        Ranking.listAltura = 530;
    })(Ranking = Theme.Ranking || (Theme.Ranking = {}));
    var Fader;
    (function (Fader) {
        Fader.color = "#000";
        Fader.alpha = .6;
    })(Fader = Theme.Fader || (Theme.Fader = {}));
})(Theme || (Theme = {}));
var Theme;
(function (Theme) {
    "use strict";
    var AddItem;
    (function (AddItem) {
        AddItem.bg = "ThemeBgItem";
        AddItem.bgN1 = 50; // Para i&A usar: 25;
        AddItem.bgN2 = 25;
        AddItem.btAddOn = "btAddOn";
        AddItem.btAddDown = "btAddDown";
        AddItem.font = "32px cubanoregular";
        AddItem.color = "#fff";
        AddItem.marginLeft = 15;
        AddItem.marginRight = 12; // Para i&A usar: 0;
        AddItem.marginText = 10;
    })(AddItem = Theme.AddItem || (Theme.AddItem = {}));
})(Theme || (Theme = {}));
/// <reference path="../typings/createjs/createjs.d.ts" />
var siouxjs;
(function (siouxjs) {
    "use strict";
    var Canvas = (function () {
        function Canvas(idCanvas, updatecount) {
            if (updatecount === void 0) { updatecount = -1; }
            this.idCanvas = idCanvas;
            var objCanvas = document.createElement("canvas");
            objCanvas.id = idCanvas;
            document.body.appendChild(objCanvas);
            objCanvas.style.zIndex = (Canvas.zIndex++ * 100).toString();
            this.updateCount = updatecount;
            var canvas = document.getElementById(this.idCanvas);
            //this._stage = new createjs.Stage(canvas);
            this._stage = new createjs.Stage(canvas);
            this.Touch = siouxjs.util.Browser.isMobile();
            this._stage.enableMouseOver(siouxjs.util.Browser.isMobile() ? 0 : Math.round(Config.nFPS / 3));
        }
        Object.defineProperty(Canvas.prototype, "updateCount", {
            get: function () {
                return Math.floor(this._nUpdate / Config.nFPS);
            },
            set: function (value) {
                this._nUpdate = value * Config.nFPS;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Canvas.prototype, "nextCanvas", {
            get: function () {
                return siouxjs.App.canvas[this._nextCanvas];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Canvas.prototype, "stage", {
            get: function () {
                return this._stage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Canvas.prototype, "Touch", {
            set: function (value) {
                if (value) {
                    createjs.Touch.enable(this._stage);
                }
                /*
                // uncomment this lines and a createjs error will occur
                else {
                    createjs.Touch.disable(this._stage);
                }
                */
            },
            enumerable: true,
            configurable: true
        });
        Canvas.prototype.update = function (bForce) {
            if (bForce === void 0) { bForce = false; }
            // force the update
            if (bForce) {
                this._stage.update();
                return;
            }
            // zero means no update must be done
            if (this._nUpdate === 0) {
                return;
            }
            // a negative number means always update
            if (this._nUpdate < 0) {
                this._stage.update();
                return;
            }
            // update while is greater than zero
            if (this._nUpdate-- > 0) {
                this._stage.update();
                return;
            }
        };
        Canvas.prototype.doResize = function () {
            this._stage.x = siouxjs.App.Settings.appLeftOffset;
            this._stage.y = siouxjs.App.Settings.appTopOffset;
            this._stage.scaleX = this._stage.scaleY = siouxjs.App.Settings.appScale;
            this._stage.canvas.width = siouxjs.App.Settings.deviceSize.width;
            this._stage.canvas.height = siouxjs.App.Settings.deviceSize.height;
            document.getElementById(this.idCanvas).style.width = (siouxjs.App.Settings.deviceSize.width / window.devicePixelRatio).toString() + "px";
            document.getElementById(this.idCanvas).style.height = (siouxjs.App.Settings.deviceSize.height / window.devicePixelRatio).toString() + "px";
            this.stage.update();
        };
        Canvas.prototype.mouseX = function () {
            return siouxjs.mouseX(this._stage);
        };
        Canvas.prototype.mouseY = function () {
            return siouxjs.mouseY(this._stage);
        };
        Canvas.zIndex = 1;
        return Canvas;
    })();
    siouxjs.Canvas = Canvas;
})(siouxjs || (siouxjs = {}));
/**
 * Provides the base Widget class...
 *
 * @module siouxjs
 */
var siouxjs;
(function (siouxjs) {
    "use strict";
    var _app;
    var _assets;
    Object.defineProperty(siouxjs, "App", {
        get: function () {
            return _app;
        }
    });
    Object.defineProperty(siouxjs, "Assets", {
        get: function () {
            return _assets;
        }
    });
    siouxjs.objOrientation;
    function initialize(myApp) {
        _app = myApp;
        _assets = _assets || {};
        // avoid scrolling
        document.addEventListener("touchstart", function () {
            return false;
        }, false);
        // do the first app resize
        _app.resize();
        // EnterFrame: tick event
        createjs.Ticker.setFPS(Config.nFPS);
        createjs.Ticker.timingMode = Config.timingMode;
        createjs.Ticker.on("tick", function (e) {
            _app.update();
        });
        doLoader();
        window.onresize = function () {
            _app.resize();
        };
    }
    siouxjs.initialize = initialize;
    function doLoader() {
        var loadQueue = new createjs.LoadQueue(false);
        var objLoad = _app.onBeforeLoad();
        loadQueue.on("error", function (e) {
            log("LOAD ERR" + e.message);
            logHtml("LOAD ERR" + e.message);
        });
        loadQueue.on("fileload", function (e) {
            _assets[e.item.id] = e.result;
        });
        loadQueue.on("complete", function (e) {
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
            }
            _app.onReady();
        });
        loadQueue.on("progress", function (e) {
            if (objLoad != null) {
                objLoad.onProgress(Math.round(e.progress * 100));
            }
        });
        for (var i = 0; i < Config.manifestLoad.length; i++) {
            Config.manifestLoad[i].src = Config.manifestLoad[i].src.replace("@x", _app.Settings.appScaleTexture + "x");
        }
        loadQueue.loadManifest(Config.manifestLoad);
    }
    function maskOnOff() {
        if (Config.bMask) {
            var mask = new createjs.Shape();
            mask.graphics.beginFill("#f00").drawRect(0, 0, _app.Settings.appSizeGuide.width, _app.Settings.appSizeGuide.height);
        }
    }
    function checkOrientation() {
        if (Config.bCheckOrientation && siouxjs.util.Browser.isMobile()) {
            siouxjs.objOrientation = new siouxjs.Orientation();
            // stage.addChild(this._objOrientation);
            siouxjs.objOrientation.checkOrientation();
        }
    }
    // Deprecated
    function GetAsset(id) {
        console.log("GetAsset() is deprecated... you must use the siouxjs.Asset[] property");
        return _assets[id];
    }
    siouxjs.GetAsset = GetAsset;
    function mouseY(pStage) {
        return (pStage.mouseY - pStage.y) / _app.Settings.appScale;
    }
    siouxjs.mouseY = mouseY;
    function mouseX(pStage) {
        return (pStage.mouseX - pStage.x) / _app.Settings.appScale;
    }
    siouxjs.mouseX = mouseX;
    function log(pMessage) {
        if (_app.canvas["debug"] != null) {
            var obj = new createjs.Text(pMessage);
            obj.y = _app.canvas["debug"].stage.children.length * 10;
            _app.canvas["debug"].stage.addChild(obj);
        }
    }
    siouxjs.log = log;
    function logHtml(pMessage) {
        var div = document.getElementById("divLog");
        div.innerHTML = pMessage + "<br>" + div.innerHTML;
    }
    siouxjs.logHtml = logHtml;
})(siouxjs || (siouxjs = {}));
console.log("siouxjs.ts");
var siouxjs;
(function (siouxjs) {
    "use strict";
})(siouxjs || (siouxjs = {}));
/// <reference path="../../typings/createjs/createjs.d.ts" />
var siouxjs;
(function (siouxjs) {
    "use strict";
    var BarraPorcentagem = (function (_super) {
        __extends(BarraPorcentagem, _super);
        function BarraPorcentagem(nLargura, nAltura, bBorda, bAnimacao) {
            if (bBorda === void 0) { bBorda = false; }
            if (bAnimacao === void 0) { bAnimacao = false; }
            _super.call(this);
            this._nPorcentagem = 0;
            // Thema
            this._sCor = Theme.General.cor2;
            this._sCorBorda = Theme.General.cor1;
            this._bAnimacao = bAnimacao;
            this._shape = new createjs.Shape();
            this._shape.graphics.beginFill(this._sCor).drawRect(0, 0, nLargura, nAltura);
            this.addChild(this._shape);
            if (bBorda) {
                var _shapeBorda = new createjs.Shape();
                _shapeBorda.graphics.beginStroke(this._sCorBorda).drawRect(0, 0, nLargura, nAltura);
                this.addChild(_shapeBorda);
            }
            this._shape.scaleX = this._nPorcentagem / 100;
            this.setBounds(this.x, this.y, nLargura, nAltura);
        }
        Object.defineProperty(BarraPorcentagem.prototype, "bAnimacao", {
            get: function () {
                return this._bAnimacao;
            },
            set: function (value) {
                this._bAnimacao = value;
            },
            enumerable: true,
            configurable: true
        });
        BarraPorcentagem.prototype.desenhar = function () {
            if (this._bAnimacao) {
                createjs.Tween.get(this._shape).to({ scaleX: this._nPorcentagem / 100 }, 1000);
            }
            else {
                this._shape.scaleX = this._nPorcentagem / 100;
            }
        };
        Object.defineProperty(BarraPorcentagem.prototype, "nPorcentagem", {
            get: function () {
                return this._nPorcentagem;
            },
            set: function (nPorcentagem) {
                this._nPorcentagem = nPorcentagem;
                this.desenhar();
            },
            enumerable: true,
            configurable: true
        });
        return BarraPorcentagem;
    })(createjs.Container);
    siouxjs.BarraPorcentagem = BarraPorcentagem;
})(siouxjs || (siouxjs = {}));
var siouxjs;
(function (siouxjs) {
    var GameObject = (function (_super) {
        __extends(GameObject, _super);
        function GameObject(spriteSheet, frameOrAnimation) {
            _super.call(this, spriteSheet, frameOrAnimation);
            this._isDrag = false;
        }
        Object.defineProperty(GameObject.prototype, "isDrag", {
            get: function () {
                return this._isDrag;
            },
            enumerable: true,
            configurable: true
        });
        GameObject.prototype.centerReg = function () {
            this.regX = this.getBounds().width / 2;
            this.regY = this.getBounds().height / 2;
        };
        // itpoCentralizacao, defini como será a centralização do Drag em relacao ao mouse:
        // zero = centraliza na coordenada zero do elemento
        // centro = centraliza objeto
        // livre = mantem a distacia entre o mouse e o elemento
        GameObject.prototype.startDrag = function (tipoCentralizacao) {
            if (tipoCentralizacao === void 0) { tipoCentralizacao = 'zero'; }
            if (!this._isDrag) {
                this.stage.addEventListener("stagemousemove", this.dragMove.bind(this));
                this._isDrag = true;
                switch (tipoCentralizacao) {
                    case 'centro':
                        this._dragPoint = new createjs.Point(this.getBounds().width / 2, this.getBounds().height / 2);
                        break;
                    case 'livre':
                        this._dragPoint = new createjs.Point(siouxjs.mouseX(this.stage) - this.x, siouxjs.mouseY(this.stage) - this.y);
                        break;
                    default:
                        this._dragPoint = new createjs.Point(0, 0);
                        break;
                }
            }
        };
        GameObject.prototype.dragMove = function () {
            this.x = siouxjs.mouseX(this.stage) - this._dragPoint.x;
            this.y = siouxjs.mouseY(this.stage) - this._dragPoint.y;
        };
        GameObject.prototype.stopDrag = function () {
            if (this._isDrag) {
                this.stage.removeEventListener("stagemousemove", this.dragMove.bind(this));
                this._isDrag = false;
            }
        };
        return GameObject;
    })(createjs.Sprite);
    siouxjs.GameObject = GameObject;
})(siouxjs || (siouxjs = {}));
var siouxjs;
(function (siouxjs) {
    "use strict";
    var PopupData = (function () {
        function PopupData(popup, transicao, duracao, center, positionX, positionY) {
            this.popup = popup;
            this.center = center;
            this.transicao = transicao;
            this.duracao = duracao;
            this.positionX = positionX;
            this.positionY = positionY;
        }
        return PopupData;
    })();
    siouxjs.PopupData = PopupData;
})(siouxjs || (siouxjs = {}));
/// <reference path="./PopupData.ts" />
/// <reference path="./Popup.ts" />
var siouxjs;
(function (siouxjs) {
    "use strict";
    var PopupManager = (function (_super) {
        __extends(PopupManager, _super);
        function PopupManager() {
            _super.call(this);
            this._box = new createjs.Shape();
            this.onOpenComplete = function () {
            };
            this._currentPopups = new Array();
            this._popupQueue = new Array();
            this._box.graphics.beginFill(Theme.Popup.boxCor).drawRect(siouxjs.App.Settings.areaUtil.x, siouxjs.App.Settings.areaUtil.y, siouxjs.App.Settings.areaUtil.width - siouxjs.App.Settings.areaUtil.x, siouxjs.App.Settings.areaUtil.height - siouxjs.App.Settings.areaUtil.y);
            this._box.alpha = Theme.Popup.boxAlpha;
            this._box.on("mousedown", this.blockMouse.bind(this));
            this._box.on("pressup", this.blockMouse.bind(this));
            this._box.visible = false;
            this.addChild(this._box);
        }
        PopupManager.prototype.blockMouse = function (e) {
            e.stopImmediatePropagation();
        };
        /*
            Executa a Transição de uma Tela
        */
        PopupManager.prototype.addPopup = function (popup, queue, transicao, duracao, center, positionX, positionY) {
            if (queue === void 0) { queue = false; }
            if (transicao === void 0) { transicao = 5 /* Cover */; }
            if (duracao === void 0) { duracao = 500; }
            if (center === void 0) { center = true; }
            if (positionX === void 0) { positionX = 0; }
            if (positionY === void 0) { positionY = 0; }
            var popupData = new siouxjs.PopupData(popup, transicao, duracao, center, positionX, positionY);
            popup.manager = this;
            if (queue && (this._popupQueue.length > 0 || this._currentPopups.length > 0)) {
                this._popupQueue.push(popupData);
            }
            else {
                this.openPopup(popupData);
            }
        };
        PopupManager.prototype.openPopup = function (popupData) {
            this._box.visible = true;
            this.removePopupFromQueue(popupData);
            this._currentPopups.push(popupData.popup);
            this.addChild(popupData.popup);
            popupData.popup.onOpen();
            this.popupAlign(popupData);
            this.popupTransition(popupData);
        };
        PopupManager.prototype.openNextPopup = function () {
            if (this._popupQueue.length === 0 || this._currentPopups.length !== 0) {
                return;
            }
            this.openPopup(this._popupQueue[0]);
        };
        /**
         * Remove and destroy a popup created by the PopupManager
         * @param	popup
         */
        PopupManager.prototype.removePopup = function (popup, bOpenNext) {
            if (popup === void 0) { popup = this._currentPopups[0]; }
            if (bOpenNext === void 0) { bOpenNext = true; }
            this._box.visible = false;
            popup.onClose();
            var indexPopup = this._currentPopups.indexOf(popup);
            if (indexPopup !== -1) {
                this._currentPopups.splice(indexPopup, 1);
            }
            this.removeChild(popup);
            if (bOpenNext) {
                this.openNextPopup();
            }
        };
        /**
         * Remove all popups, even the popups on queue
         */
        PopupManager.prototype.removeAll = function () {
            if (this._popupQueue.length > 0) {
                this._popupQueue.splice(0, this._popupQueue.length);
            }
            var i = 0;
            var length = this._currentPopups.length;
            for (; i < length; i++) {
                this.removePopup(this._currentPopups[0], false);
            }
        };
        PopupManager.prototype.removePopupFromQueue = function (popupData) {
            var indexPopup = this._popupQueue.indexOf(popupData);
            if (indexPopup !== -1) {
                this._popupQueue.splice(indexPopup, 1);
            }
        };
        PopupManager.prototype.popupAlign = function (popupData) {
            if (popupData.center) {
                popupData.popup.x = (siouxjs.App.Settings.appSizeGuide.width - popupData.popup.getBounds().width) * 0.5;
                popupData.popup.y = (siouxjs.App.Settings.appSizeGuide.height - popupData.popup.getBounds().height) * 0.5;
            }
            else {
                popupData.popup.x = popupData.positionX;
                popupData.popup.y = popupData.positionY;
            }
        };
        PopupManager.prototype.popupTransition = function (popupData) {
            if (popupData.transicao !== 6 /* Blank */) {
                var popup = popupData.popup;
                var toX = popup.x;
                var toY = popup.y;
                switch (popupData.transicao) {
                    case 1 /* Up */:
                        popup.y = -popup.getBounds().height;
                        break;
                    case 2 /* Down */:
                        popup.y = siouxjs.App.Settings.appSizeGuide.height;
                        break;
                    case 3 /* Left */:
                        popup.x = -popup.getBounds().width;
                        break;
                    case 4 /* Right */:
                        popup.x = siouxjs.App.Settings.appSizeGuide.width;
                        break;
                }
                createjs.Tween.get(popup).to({ y: toY, x: toX }, popupData.duracao).call(this.onOpenComplete);
            }
        };
        return PopupManager;
    })(createjs.Container);
    siouxjs.PopupManager = PopupManager;
})(siouxjs || (siouxjs = {}));
console.log("siouxjs.PopupManager.ts");
/// <reference path="../../../typings/createjs/createjs.d.ts" />
/// <reference path="./PopupManager.ts" />
var siouxjs;
(function (siouxjs) {
    "use strict";
    var Popup = (function (_super) {
        __extends(Popup, _super);
        function Popup() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(Popup.prototype, "manager", {
            get: function () {
                return this._manager;
            },
            set: function (value) {
                this._manager = value;
            },
            enumerable: true,
            configurable: true
        });
        Popup.prototype.onOpen = function () {
        };
        Popup.prototype.onClose = function () {
        };
        return Popup;
    })(createjs.Container);
    siouxjs.Popup = Popup;
})(siouxjs || (siouxjs = {}));
console.log("siouxjs.Popup.ts");
var siouxjs;
(function (siouxjs) {
    "use strict";
    var PopupAlert = (function (_super) {
        __extends(PopupAlert, _super);
        function PopupAlert(titulo, texto) {
            _super.call(this);
            // Imagem de Fundo
            var bt = siouxjs.Assets[Theme.Popup.img9bg];
            this._img9bg = new siouxjs.ui.Scale9Bitmap(new createjs.Bitmap(bt).image, Theme.Popup.size9bg);
            this._img9bg.setDrawSize(Theme.Popup.largura, Theme.Popup.altura);
            this._img9bg.x = 0;
            this._img9bg.y = 0;
            this.addChild(this._img9bg);
            // Button Jogar
            this._btOk = new siouxjs.ui.Scale9Button("OK");
            this.addChild(this._btOk);
            this._btOk.x = -this._btOk.getBounds().width * .5;
            this._btOk.x = (this._img9bg.getBounds().width - this._btOk.getBounds().width) * .5;
            ;
            this._btOk.y = this._img9bg.getBounds().height - this._btOk.getBounds().height - 30;
            this._btOk.onClick(this.btJogarClick.bind(this));
            // Título
            this._txTitulo = new createjs.Text(titulo, Theme.General.titulo, Theme.General.tituloCor1);
            this._txTitulo.textAlign = "center";
            this._txTitulo.x = this._img9bg.getBounds().width * .5;
            this._txTitulo.y = Theme.Popup.tituloMarginTop;
            this.addChild(this._txTitulo);
            // Texto
            this._txTexto = new createjs.Text(texto, Theme.General.texto, Theme.General.textoCor1);
            this._txTexto.textAlign = "center";
            this._txTexto.x = this._img9bg.getBounds().width * .5;
            this._txTexto.y = this._txTitulo.y + this._txTitulo.getBounds().height + Theme.Popup.textoMargin;
            this._txTexto.lineWidth = Theme.Popup.largura - Theme.Popup.textoMargin * 2;
            this.addChild(this._txTexto);
        }
        Object.defineProperty(PopupAlert.prototype, "txTitulo", {
            get: function () {
                return this._txTitulo;
            },
            set: function (value) {
                this._txTitulo = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PopupAlert.prototype, "txTexto", {
            get: function () {
                return this._txTexto;
            },
            set: function (value) {
                this._txTexto = value;
            },
            enumerable: true,
            configurable: true
        });
        PopupAlert.prototype.btJogarClick = function (event) {
            this.manager.removePopup();
        };
        PopupAlert.prototype.open = function () {
        };
        PopupAlert.prototype.close = function () {
        };
        return PopupAlert;
    })(siouxjs.Popup);
    siouxjs.PopupAlert = PopupAlert;
})(siouxjs || (siouxjs = {}));
var siouxjs;
(function (siouxjs) {
    var UIList = (function (_super) {
        __extends(UIList, _super);
        function UIList(fItemRenderer, dataProvider) {
            var _this = this;
            _super.call(this);
            this._bDrag = false;
            this.onMouseDown = function (e) {
                _this._bDrag = true;
                _this._nDiferencaMouseContainerY = _this._objContaner.y - siouxjs.mouseY(_this.stage);
            };
            this.onMouseUp = function (e) {
                _this._bDrag = false;
            };
            this._fItemRender = fItemRenderer;
            this._dataProvider = dataProvider;
            this._objContaner = new createjs.Container();
            this.addChild(this._objContaner);
            createjs.Ticker.on('tick', this.tick.bind(this));
            this.addEventListener("pressup", this.onMouseUp);
            this.addEventListener("mousedown", this.onMouseDown);
        }
        Object.defineProperty(UIList.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this._width = value;
                this.setDrawSize();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIList.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this._height = value;
                this.setDrawSize();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIList.prototype, "dataProvider", {
            get: function () {
                return this._dataProvider;
            },
            set: function (value) {
                this._dataProvider = value;
            },
            enumerable: true,
            configurable: true
        });
        UIList.prototype.setDrawSize = function () {
            if (this._width == undefined || this._height == undefined)
                return;
            // Mask
            this._objMask = new createjs.Shape();
            this._objMask.graphics.beginFill("#ffffff").drawRect(0, 0, this._width, this.height);
            this._objContaner.mask = this._objMask;
            // Lista de Itens
            this.itensList();
        };
        UIList.prototype.itensList = function () {
            if (this._height == undefined)
                return;
            this._aItemRender = new Array();
            var i = 0;
            do {
                var obj = this._fItemRender();
                obj.y = obj.getBounds().height * i;
                this._objContaner.addChild(obj);
                this._aItemRender.push(obj);
                this.itemUpdate(obj, i);
                i++;
            } while (obj.y < this._height);
            // Guarda a altura para futuros calculos
            this._nItemRenderAltura = obj.getBounds().height;
        };
        UIList.prototype.itensListUpdate = function () {
            // Primeira Posição
            var nItem = -Math.ceil(this._objContaner.y / this._nItemRenderAltura);
            var minY = nItem * this._nItemRenderAltura;
            // Verifica se mudou os itens
            if (this._nMinAnterioY == minY)
                return;
            // Ultima Posição
            var maxY = minY + this._nItemRenderAltura * (this._aItemRender.length - 1);
            // Pega Itens fora de vista
            var nItemFora = 0;
            for (var i = 0; i < this._aItemRender.length; i++) {
                if (this._aItemRender[i].y < minY || this._aItemRender[i].y > maxY) {
                    if (this._nMinAnterioY < minY) {
                        this._aItemRender[i].y = maxY + nItemFora * this._nItemRenderAltura;
                        this.itemUpdate(this._aItemRender[i], nItem + (this._aItemRender.length - 1) + nItemFora);
                        nItemFora--;
                    }
                    else {
                        this._aItemRender[i].y = minY + nItemFora * this._nItemRenderAltura;
                        this.itemUpdate(this._aItemRender[i], nItem + nItemFora);
                        nItemFora++;
                    }
                }
            }
            // Grava posição Min para verificar mudança; 
            this._nMinAnterioY = minY;
        };
        UIList.prototype.itemUpdate = function (objItem, nItem) {
            if (nItem < this._dataProvider.length && nItem >= 0) {
                objItem.update(nItem, this._dataProvider[nItem]);
            }
            else {
                objItem.update(nItem);
            }
        };
        // EnterFrame
        UIList.prototype.tick = function (e) {
            if (this._bDrag) {
                this._objContaner.y = siouxjs.mouseY(this.stage) + this._nDiferencaMouseContainerY;
                if (this._objContaner.y > 0) {
                    this._objContaner.y = 0;
                }
                if (this._objContaner.y < -(this._dataProvider.length * this._nItemRenderAltura) + this._height) {
                    this._objContaner.y = -(this._dataProvider.length * this._nItemRenderAltura) + this._height;
                }
                this.itensListUpdate();
            }
        };
        return UIList;
    })(createjs.Container);
    siouxjs.UIList = UIList;
})(siouxjs || (siouxjs = {}));
var siouxjs;
(function (siouxjs) {
    "use strict";
    // Classe do scroll 
    // TODO: Implementar scroll horizontal (atualmente só tem scroll vertical!)
    var UIScroll = (function (_super) {
        __extends(UIScroll, _super);
        // Função Construtor
        function UIScroll(obj) {
            var _this = this;
            _super.call(this);
            // Drags
            this._bDrag = false;
            // Evento de mouseDown
            this.onMouseDown = function (e) {
                _this._bDrag = true;
                _this._nDiferencaMouseContainerY = _this._objContainer.y - siouxjs.mouseY(_this.stage);
            };
            // Evento de mouseUp
            this.onMouseUp = function (e) {
                _this._bDrag = false;
            };
            // Cria um container
            this._objContainer = new createjs.Container();
            this._objContainer.addChild(obj);
            // Adiciona o container externa
            this.addChild(this._objContainer);
            // Evento de OnEnterFrame
            createjs.Ticker.addEventListener('tick', this.tick.bind(this));
        }
        Object.defineProperty(UIScroll.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this._width = value;
                this.setDrawSize();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIScroll.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this._height = value;
                this.setDrawSize();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIScroll.prototype, "sliderValue", {
            get: function () {
                return this._sliderValue;
            },
            set: function (newValue) {
                if (newValue != this._sliderValue) {
                    this._sliderValue = newValue;
                    //console.log("Value: " + this._sliderValue);
                    // Muda a posição do container
                    this._objContainer.y = (this._height - this._objContainer.getBounds().height) * this._sliderValue;
                    //console.log("ContainerY: " + this._objContainer.y);
                    // Muda a posição do slider
                    this.slider2.y = (this.sliderMaxY - this.sliderMinY) * this._sliderValue;
                }
            },
            enumerable: true,
            configurable: true
        });
        // Função chamada quando o jogador muda o size desse objeto
        UIScroll.prototype.setDrawSize = function () {
            var _this = this;
            if (this._width == undefined || this._height == undefined)
                return;
            // Mask
            this._objMask = new createjs.Shape();
            //this._objMask.graphics.beginFill("#ffffff").drawRect(0, 0, this._width, this.height);
            this._objMask.graphics.beginFill("#000").drawRect(0, 0, this._width, this.height);
            //this._objMask.addEventListener("pressup", this.onMouseUp);
            //this._objMask.addEventListener("mousedown", this.onMouseDown);
            this._objContainer.addEventListener("pressup", this.onMouseUp);
            this._objContainer.addEventListener("mousedown", this.onMouseDown);
            this._objContainer.hitArea = this._objMask;
            this._objContainer.mask = this._objMask;
            //this.addChildAt(this._objMask, 0);
            // Cria o fundo do slider
            var back2 = new siouxjs.ui.Scale9Bitmap(siouxjs.Assets["Instrucoes_ScrollBar"], new createjs.Rectangle(7, 8, 13, 462));
            back2.x = this.width + 10;
            back2.y = 0;
            back2.addEventListener("mousedown", function (e) { return _this.DragHandler(e); });
            back2.addEventListener("pressmove", function (e) { return _this.DragHandler(e); });
            back2.setDrawSize(21, 464);
            this.addChild(back2);
            this.slider2 = new siouxjs.ui.SXBitmap(siouxjs.Assets["Instrucoes_Slider"], true);
            this.slider2.x = this.width + 10;
            this.slider2.y = 0;
            this.addChild(this.slider2);
            // Configurando as variáveis
            this.sliderMinY = this.slider2.height / 2;
            this.sliderMaxY = this.height - this.slider2.height / 2;
            this.sliderWidth = 20;
            this.sliderHeight = this.slider2.height + 10;
            console.log("sliderMinY: " + this.sliderMinY);
            console.log("sliderMaxY: " + this.sliderMaxY);
        };
        // Evento de drag do slider
        UIScroll.prototype.DragHandler = function (evt) {
            // NOTE: Devemos colocar x0.5 se usamos uma imagem com o 2X
            // TODO: Melhorar!
            var val = evt.localY;
            //var val = evt.localY * 0.5;
            val = Math.max(this.sliderMinY, Math.min(this.sliderMaxY, val));
            if (this.sliderActualY == val) {
                return;
            }
            this.sliderActualY = val;
            console.log("-> " + this.sliderActualY);
            // Muda o valor do slider
            this.sliderValue = (this.sliderActualY - (this.slider2.height / 2)) / (this.sliderMaxY - this.sliderMinY);
        };
        // EnterFrame
        UIScroll.prototype.tick = function (e) {
            if (this._bDrag) {
                var newSliderValue = siouxjs.mouseY(this.stage) + this._nDiferencaMouseContainerY;
                if (newSliderValue > 0) {
                    newSliderValue = 0;
                }
                if (newSliderValue + this._objContainer.getBounds().height < this._height) {
                    newSliderValue = this._height - this._objContainer.getBounds().height;
                }
                // Muda o valor do slider transformando pra um número entre 0 e 1
                this.sliderValue = newSliderValue / (this._height - this._objContainer.getBounds().height);
            }
        };
        return UIScroll;
    })(createjs.Container);
    siouxjs.UIScroll = UIScroll;
})(siouxjs || (siouxjs = {}));
var siouxjs;
(function (siouxjs) {
    "use strict";
    var RankingItem = (function () {
        function RankingItem(sNome, nPonto) {
            this.sNome = sNome;
            this.nPonto = nPonto;
        }
        return RankingItem;
    })();
    siouxjs.RankingItem = RankingItem;
    var UIRanking = (function (_super) {
        __extends(UIRanking, _super);
        function UIRanking() {
            _super.call(this);
            // Imagem de Fundo
            var bg = siouxjs.Assets[Theme.Ranking.img9bg];
            this._img9bg = new siouxjs.ui.Scale9Bitmap(new createjs.Bitmap(bg).image, Theme.Ranking.size9bg);
            this._img9bg.setDrawSize(Theme.Ranking.largura, Theme.Ranking.altura);
            this.addChild(this._img9bg);
            // List
            var ranking = new Array();
            ranking.push(new RankingItem('Philippe', 100));
            ranking.push(new RankingItem('A', 100));
            ranking.push(new RankingItem('B', 100));
            ranking.push(new RankingItem('C', 100));
            ranking.push(new RankingItem('D', 100));
            ranking.push(new RankingItem('E', 100));
            ranking.push(new RankingItem('F', 100));
            ranking.push(new RankingItem('G', 100));
            ranking.push(new RankingItem('H', 100));
            ranking.push(new RankingItem('I', 100));
            ranking.push(new RankingItem('J', 100));
            ranking.push(new RankingItem('K', 100));
            ranking.push(new RankingItem('L', 100));
            this._objList = new siouxjs.UIList(this.itemRenderer, ranking);
            this._objList.x = Theme.Ranking.listX;
            this._objList.y = Theme.Ranking.listY;
            this._objList.width = Theme.Ranking.listLargura;
            this._objList.height = Theme.Ranking.listAltura;
            this.addChild(this._objList);
        }
        UIRanking.prototype.itemRenderer = function () {
            return new siouxjs.UIRankingItem();
        };
        return UIRanking;
    })(createjs.Container);
    siouxjs.UIRanking = UIRanking;
})(siouxjs || (siouxjs = {}));
var siouxjs;
(function (siouxjs) {
    var UIRankingItem = (function (_super) {
        __extends(UIRankingItem, _super);
        function UIRankingItem() {
            _super.call(this);
            var mask = new createjs.Shape();
            mask.graphics.beginFill("#f00").drawRect(0, 0, 200, 50);
            this.addChild(mask);
            this.setBounds(0, 0, 200, 50);
            this._label = new createjs.Text('', Theme.General.titulo, Theme.General.textoCor1);
            this.addChild(this._label);
        }
        UIRankingItem.prototype.update = function (nItem, obj) {
            if (obj === void 0) { obj = null; }
            if (obj != null) {
                this._label.text = nItem.toString() + ' ' + obj.sNome;
            }
            else {
                this._label.text = nItem.toString();
            }
        };
        return UIRankingItem;
    })(createjs.Container);
    siouxjs.UIRankingItem = UIRankingItem;
})(siouxjs || (siouxjs = {}));
var siouxjs;
(function (siouxjs) {
    var UIScrollingImageXY = (function (_super) {
        __extends(UIScrollingImageXY, _super);
        function UIScrollingImageXY(tile) {
            _super.call(this);
            this._tile = tile;
            // Configura Area que os Tile devem ocupar.
            this._recArea = new createjs.Rectangle();
            // Se não tem Mascara utilziza todo o stage, posicionando o Contender no canto esquerdo superior da tela
            if (Config.bMask) {
                this._recArea.x = 0;
                this._recArea.y = 0;
                this._recArea.width = siouxjs.App.Settings.appSizeGuide.width;
                this._recArea.height = siouxjs.App.Settings.appSizeGuide.height;
            }
            else {
                this._recArea.x = -siouxjs.App.Settings.appLeftOffset;
                this._recArea.y = -siouxjs.App.Settings.appTopOffset;
                this._recArea.width = (siouxjs.App.Settings.appLeftOffset * 2 + siouxjs.App.Settings.appSizeGuide.width);
                this._recArea.height = (siouxjs.App.Settings.appTopOffset * 2 + siouxjs.App.Settings.appSizeGuide.height);
            }
            this.x = this._recArea.x;
            this.y = this._recArea.y;
            this.itensTile();
        }
        UIScrollingImageXY.prototype.mover = function (x, y) {
            if (this.x > this._recArea.x) {
                this.x = this.x - this._tile.width + x;
            }
            else if (this.x < this._recArea.x - this._tile.width) {
                this.x = this.x + this._tile.width + x;
            }
            else {
                this.x = this.x + x;
            }
            if (this.y > this._recArea.y) {
                this.y = this.y - this._tile.height + y;
            }
            else if (this.y < this._recArea.y - this._tile.height) {
                this.y = this.y + this._tile.height + y;
            }
            else {
                this.y = this.y + y;
            }
        };
        UIScrollingImageXY.prototype.itensTile = function () {
            for (var lin = 0; lin < this._recArea.height / this._tile.height + 1; ++lin) {
                for (var col = 0; col < this._recArea.width / this._tile.width + 1; ++col) {
                    var newTile = new createjs.Bitmap(this._tile);
                    newTile.x = this._tile.width * col;
                    newTile.y = this._tile.width * lin;
                    this.addChild(newTile);
                }
            }
        };
        return UIScrollingImageXY;
    })(createjs.Container);
    siouxjs.UIScrollingImageXY = UIScrollingImageXY;
})(siouxjs || (siouxjs = {}));
var siouxjs;
(function (siouxjs) {
    var UIWorldParalax = (function (_super) {
        __extends(UIWorldParalax, _super);
        function UIWorldParalax(fTite, tileLargura, tileAltura) {
            _super.call(this);
            this._fTile = fTite;
            this._tileLargura = tileLargura;
            this._tileAltura = tileAltura;
            // Verifica se tem Mascara ou deve utilizar todo o stage
            if (!Config.bMask) {
                this.x = -siouxjs.App.Settings.appLeftOffset;
                this.y = -siouxjs.App.Settings.appTopOffset;
            }
            this.itensTile();
        }
        UIWorldParalax.prototype.mover = function (x, y) {
            this.x = this.x + x;
            this.y = this.y + y;
            this.itensTileUpdate();
        };
        UIWorldParalax.prototype.itensTile = function () {
            this._aTile = new Array();
            // While precisa ter um elemento a mais para tapar os burracos
            // Linha
            var lin = 0;
            do {
                this._aTile.push(new Array());
                // Coluna
                var col = 0;
                do {
                    var obj = this._fTile();
                    obj.x = this._tileLargura * col;
                    obj.y = this._tileAltura * lin;
                    this.addChild(obj);
                    this._aTile[lin].push(obj);
                    //this.itemUpdate(obj, i);
                    col++;
                } while (obj.x < siouxjs.App.Settings.appLeftOffset * 2 + siouxjs.App.Settings.appSizeGuide.width + this._tileLargura);
                lin++;
            } while (obj.y < siouxjs.App.Settings.appTopOffset * 2 + siouxjs.App.Settings.appSizeGuide.height);
        };
        UIWorldParalax.prototype.itensTileUpdate = function () {
            // Primeira Posição
            // Y
            var nItemY = -Math.ceil((this.y + siouxjs.App.Settings.appTopOffset) / this._tileAltura);
            var minY = nItemY * this._tileAltura;
            // X
            var nItemX = -Math.ceil((this.x + siouxjs.App.Settings.appLeftOffset) / this._tileLargura);
            var minX = nItemX * this._tileLargura;
            // Verifica se mudou os itens
            if (this._nMinAnterioY == minY && this._nMinAnterioX == minX)
                return;
            // Ultima Posição
            var maxY = minY + this._tileAltura * (this._aTile.length - 1);
            var maxX = minX + this._tileLargura * (this._aTile[0].length - 1);
            for (var lin = 0; lin < this._aTile.length; lin++) {
                for (var col = 0; col < this._aTile[lin].length; col++) {
                    // Y
                    if (this._aTile[lin][col].y < minY || this._aTile[lin][col].y > maxY) {
                        if (this._nMinAnterioY < minY) {
                            this._aTile[lin][col].y = maxY;
                            this._aTile[lin][col].tileUpdate(lin, col);
                        }
                        else {
                            this._aTile[lin][col].y = minY;
                            this._aTile[lin][col].tileUpdate(lin, col);
                        }
                    }
                    // X
                    if (this._aTile[lin][col].x < minX || this._aTile[lin][col].x > maxX) {
                        if (this._nMinAnterioX < minX) {
                            this._aTile[lin][col].x = maxX;
                            this._aTile[lin][col].tileUpdate(lin, col);
                        }
                        else {
                            this._aTile[lin][col].x = minX;
                            this._aTile[lin][col].tileUpdate(lin, col);
                        }
                    }
                }
            }
            // Grava posição Min para verificar mudança; 
            this._nMinAnterioY = minY;
            this._nMinAnterioX = minX;
        };
        return UIWorldParalax;
    })(createjs.Container);
    siouxjs.UIWorldParalax = UIWorldParalax;
})(siouxjs || (siouxjs = {}));
var siouxjs;
(function (siouxjs) {
    var defines;
    (function (defines) {
        "use strict";
        (function (Transition) {
            Transition[Transition["None"] = 0] = "None";
            Transition[Transition["Up"] = 1] = "Up";
            Transition[Transition["Down"] = 2] = "Down";
            Transition[Transition["Left"] = 3] = "Left";
            Transition[Transition["Right"] = 4] = "Right";
            Transition[Transition["Cover"] = 5] = "Cover";
            Transition[Transition["Blank"] = 6] = "Blank";
        })(defines.Transition || (defines.Transition = {}));
        var Transition = defines.Transition;
        ;
    })(defines = siouxjs.defines || (siouxjs.defines = {}));
})(siouxjs || (siouxjs = {}));
var siouxjs;
(function (siouxjs) {
    (function (OrientationTipo) {
        OrientationTipo[OrientationTipo["Portait"] = 1] = "Portait";
        OrientationTipo[OrientationTipo["Landscape"] = 2] = "Landscape";
    })(siouxjs.OrientationTipo || (siouxjs.OrientationTipo = {}));
    var OrientationTipo = siouxjs.OrientationTipo;
    ;
    var Orientation = (function (_super) {
        __extends(Orientation, _super);
        function Orientation() {
            var _this = this;
            _super.call(this);
            // Check Orientation
            this.tickOrientation = function (event) {
                if (_this.checkOrientation()) {
                    createjs.Ticker.removeEventListener('tick', _this.tickOrientation);
                    _this.visible = false;
                }
            };
            if (Config.nOrientation == 2 /* Landscape */) {
                this._imgOrientation = new createjs.Bitmap(Config.sPathGlobal + 'assets/theme/img/landscape.png');
            }
            else {
                this._imgOrientation = new createjs.Bitmap(Config.sPathGlobal + 'assets/theme/img/portait.png');
            }
            this.addChild(this._imgOrientation);
            var that = this; // para ter o objeto na função onload
            this._imgOrientation.image.onload = function () {
                that._imgOrientation.x = (siouxjs.App.Settings.appSizeGuide.width - this.width) * 0.5;
                that._imgOrientation.y = (siouxjs.App.Settings.appSizeGuide.height - this.height) * 0.5;
            };
            this.visible = false;
        }
        /*
        * retorna TRUE se estiver na posição correta e FALSE se não estiver colocando a msg para o usuário
        */
        Orientation.prototype.checkOrientation = function () {
            if (!this.testOrientation()) {
                this.visible = true;
                this.addEventListener('tick', this.tickOrientation);
                return false;
            }
            return true;
        };
        Orientation.prototype.testOrientation = function () {
            if (Config.nOrientation == 2 /* Landscape */) {
                if (window.innerHeight > window.innerWidth) {
                    return false;
                }
            }
            else {
                if (window.innerHeight < window.innerWidth) {
                    return false;
                }
            }
            return true;
        };
        return Orientation;
    })(createjs.Container);
    siouxjs.Orientation = Orientation;
})(siouxjs || (siouxjs = {}));
var siouxjs;
(function (siouxjs) {
    var ui;
    (function (ui) {
        "use strict";
        var Fader = (function (_super) {
            __extends(Fader, _super);
            function Fader(hasClickBlock, alpha) {
                if (hasClickBlock === void 0) { hasClickBlock = true; }
                if (alpha === void 0) { alpha = Theme.Fader.alpha; }
                _super.call(this);
                this.graphics.beginFill(Theme.Fader.color).drawRect(siouxjs.App.Settings.areaUtil.x, siouxjs.App.Settings.areaUtil.y, siouxjs.App.Settings.areaUtil.width, siouxjs.App.Settings.areaUtil.height);
                this.alpha = alpha;
                if (hasClickBlock)
                    this.on("click", function (e) {
                        e.stopImmediatePropagation();
                    });
            }
            return Fader;
        })(createjs.Shape);
    })(ui = siouxjs.ui || (siouxjs.ui = {}));
})(siouxjs || (siouxjs = {}));
var siouxjs;
(function (siouxjs) {
    var ui;
    (function (ui) {
        "use strict";
        var Scale3Bitmap = (function (_super) {
            __extends(Scale3Bitmap, _super);
            /**
             *   Cria imagens 9 grid
             *
             *   @param {image} imageOrUri Image base para a imagem 9Grid
             *   @param {number} nX1
             *   @param {number} nX2
             *   @param {boolean} bScaleTextura se for TRUE, ser� aplicado 1x, 2x, etc. na imagem
             */
            function Scale3Bitmap(imageOrUri, nX1, nX2, bScaleTextura) {
                if (bScaleTextura === void 0) { bScaleTextura = true; }
                _super.call(this);
                if (typeof imageOrUri === "string") {
                    this.image = new Image();
                    // ScaleTexture: Controle para pegar a imagem correta 1x, 2x, etc.
                    this.image.src = imageOrUri.replace("@x", siouxjs.App.Settings.appScaleTexture + "x");
                }
                else {
                    this.image = imageOrUri;
                }
                // ScaleTexture: Verifica se deve tratar 1x, 2x, etc.
                if (!bScaleTextura) {
                    this._nX1 = nX1;
                    this._nX2 = nX2;
                    this._appScaleTexture = 1;
                }
                else {
                    this._nX1 = nX1 * siouxjs.App.Settings.appScaleTexture;
                    this._nX2 = nX2 * siouxjs.App.Settings.appScaleTexture;
                    this._appScaleTexture = siouxjs.App.Settings.appScaleTexture;
                }
                this._drawWidth = this.image.naturalWidth / this._appScaleTexture;
                this._drawHeight = this.image.naturalHeight / this._appScaleTexture;
            }
            /**
             * Changes the dimensions used the draw the ScaleBitmap.
             *
             * @method setDrawSize
             * @param {Number} newWidth The new width of the drawn ScaleBitmap.
             * @param {Number} newHeight The new height of the drawn ScaleBitmap.
             */
            Scale3Bitmap.prototype.setDrawSize = function (newWidth) {
                this._drawWidth = newWidth;
                this.setBounds(this.x, this.y, newWidth, this._drawHeight);
            };
            /**
             * Desenha
             *
             * @method draw
             * @param {CanvasRenderingContext2D} ctx
             * @param {boolean} ignoreCache
             */
            Scale3Bitmap.prototype.draw = function (ctx, ignoreCache) {
                // if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }
                var adjustVal = 0;
                if (this.stage.scaleX > 0 || this.stage.scaleY > 0) {
                    adjustVal = 1;
                }
                var top = 0;
                var STtop = top / this._appScaleTexture;
                var bottom = this.image.naturalHeight;
                var STbottom = bottom / this._appScaleTexture;
                var centerX = this._nX2 - this._nX1;
                var left = this._nX1;
                var STleft = left / this._appScaleTexture;
                var right = this.image.naturalWidth - centerX - left;
                var STright = right / this._appScaleTexture;
                var scaledCenterX = this._drawWidth - STleft - STright;
                //ctx.drawImage(this.image, 0, 0, left, top, 0, 0, STleft, STtop);
                //ctx.drawImage(this.image, left, 0, centerX, top, STleft, 0, scaledCenterX, STtop);
                //ctx.drawImage(this.image, left + centerX, 0, right, top, STleft + scaledCenterX, 0, STright, STtop);
                ctx.drawImage(this.image, 0, top, left, bottom, 0, STtop, STleft, STbottom);
                ctx.drawImage(this.image, left, top, this._nX2, bottom, STleft - adjustVal, STtop, scaledCenterX, STbottom);
                ctx.drawImage(this.image, this._nX2, top, right, bottom, STleft + scaledCenterX - (adjustVal * 2), STtop, STright, STbottom);
                //ctx.drawImage(this.image, 0, top + centerY, left, bottom, 0, STtop + scaledCenterY, STleft, STbottom);
                //ctx.drawImage(this.image, left, top + centerY, centerX, bottom, STleft, STtop + scaledCenterY, scaledCenterX, STbottom);
                //ctx.drawImage(this.image, left + centerX, top + centerY, right, bottom, STleft + scaledCenterX, STtop + scaledCenterY, STright, STbottom);
                return true;
            };
            /**
             * Retorna o texto
             *
             * @method toString
             */
            Scale3Bitmap.prototype.toString = function () {
                return "[ScaleBitmap (name=" + this.name + ")]";
            };
            return Scale3Bitmap;
        })(createjs.DisplayObject);
        ui.Scale3Bitmap = Scale3Bitmap;
    })(ui = siouxjs.ui || (siouxjs.ui = {}));
})(siouxjs || (siouxjs = {}));
var siouxjs;
(function (siouxjs) {
    var ui;
    (function (ui) {
        "use strict";
        var Scale9Bitmap = (function (_super) {
            __extends(Scale9Bitmap, _super);
            /**
             *   Cria imagens 9 grid
             *
             *   @param {image} imageOrUri Image base para a imagem 9Grid
             *   @param {createjs.Rectangle} scale9Grid Grid que seré aplicado na imagem base. Atenção! A largura e Altura é o tamanho do segmento da imagem que ser� scalonavel.
             *   @param {boolean} bScaleTextura se for TRUE, ser� aplicado 1x, 2x, etc. na imagem
             */
            function Scale9Bitmap(imageOrUri, scale9Grid, bScaleTextura) {
                if (bScaleTextura === void 0) { bScaleTextura = false; }
                _super.call(this);
                if (typeof imageOrUri === "string") {
                    this.image = new Image();
                    // ScaleTexture: Controle para pegar a imagem correta 1x, 2x, etc.
                    this.image.src = imageOrUri.replace("@x", siouxjs.App.Settings.appScaleTexture + "x");
                }
                else {
                    this.image = imageOrUri;
                }
                // ScaleTexture: Verifica se deve tratar 1x, 2x, etc.
                if (!bScaleTextura) {
                    this._scale9Grid = scale9Grid;
                    this._appScaleTexture = 1;
                }
                else {
                    this._scale9Grid = new createjs.Rectangle(scale9Grid.x * siouxjs.App.Settings.appScaleTexture, scale9Grid.y * siouxjs.App.Settings.appScaleTexture, scale9Grid.width * siouxjs.App.Settings.appScaleTexture, scale9Grid.height * siouxjs.App.Settings.appScaleTexture);
                    this._appScaleTexture = siouxjs.App.Settings.appScaleTexture;
                }
                this._drawWidth = this.image.naturalWidth;
                this._drawHeight = this.image.naturalHeight;
            }
            /**
             * Changes the dimensions used the draw the ScaleBitmap.
             *
             * @method setDrawSize
             * @param {Number} newWidth The new width of the drawn ScaleBitmap.
             * @param {Number} newHeight The new height of the drawn ScaleBitmap.
             */
            Scale9Bitmap.prototype.setDrawSize = function (newWidth, newHeight) {
                this._drawWidth = newWidth;
                this._drawHeight = newHeight;
                this.setBounds(this.x, this.y, newWidth, newHeight);
            };
            /**
             * Desenha
             *
             * @method draw
             * @param {CanvasRenderingContext2D} ctx
             * @param {boolean} ignoreCache
             */
            Scale9Bitmap.prototype.draw = function (ctx, ignoreCache) {
                //if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }
                var adjustVal = 0;
                if (this.stage.scaleX > 0 || this.stage.scaleY > 0) {
                    adjustVal = 1;
                }
                var centerX = this._scale9Grid.width;
                var centerY = this._scale9Grid.height;
                if (centerX == 0) {
                    if (centerY == 0) {
                        throw "One of scale9Grid width or height must be greater than zero.";
                    }
                    var imageWidth = this.image.width;
                    var scale3Region1 = this._scale9Grid.y;
                    var scale3Region3 = this.image.height - scale3Region1 - centerY;
                    var oppositeEdgeScale = this._drawWidth / imageWidth;
                    var scaledFirstRegion = scale3Region1 * oppositeEdgeScale;
                    var scaledThirdRegion = scale3Region3 * oppositeEdgeScale;
                    var scaledSecondRegion = this._drawHeight - scaledFirstRegion - scaledThirdRegion;
                    ctx.drawImage(this.image, 0, 0, imageWidth, scale3Region1, 0, 0, this._drawWidth, scaledFirstRegion);
                    ctx.drawImage(this.image, 0, scale3Region1, imageWidth, centerY, 0, scaledFirstRegion, this._drawWidth, scaledSecondRegion);
                    ctx.drawImage(this.image, 0, scale3Region1 + centerY, imageWidth, scale3Region3, 0, scaledFirstRegion + scaledSecondRegion, this._drawWidth, scaledThirdRegion);
                }
                else if (centerY == 0) {
                    var imageHeight = this.image.height;
                    scale3Region1 = this._scale9Grid.x;
                    scale3Region3 = this.image.width - scale3Region1 - centerX;
                    oppositeEdgeScale = this._drawHeight / this.image.height;
                    scaledFirstRegion = scale3Region1 * oppositeEdgeScale;
                    scaledThirdRegion = scale3Region3 * oppositeEdgeScale;
                    scaledSecondRegion = this._drawWidth - scaledFirstRegion - scaledThirdRegion;
                    ctx.drawImage(this.image, 0, 0, scale3Region1, imageHeight, 0, 0, scaledFirstRegion, this._drawHeight);
                    ctx.drawImage(this.image, scale3Region1, 0, centerX, imageHeight, scaledFirstRegion, 0, scaledSecondRegion, this._drawHeight);
                    ctx.drawImage(this.image, scale3Region1 + centerX, 0, scale3Region3, imageHeight, scaledFirstRegion + scaledSecondRegion, 0, scaledThirdRegion, this._drawHeight);
                }
                else {
                    var left = this._scale9Grid.x;
                    var top = this._scale9Grid.y;
                    var right = this.image.width - centerX - left;
                    var bottom = this.image.height - centerY - top;
                    var scaledCenterX = this._drawWidth - left - right;
                    var scaledCenterY = this._drawHeight - top - bottom;
                    ctx.drawImage(this.image, 0, 0, left, top, 0, 0, left, top);
                    ctx.drawImage(this.image, left, 0, centerX, top, left - adjustVal, 0, scaledCenterX, top);
                    ctx.drawImage(this.image, left + centerX, 0, right, top, left + scaledCenterX - (adjustVal * 2), 0, right, top);
                    ctx.drawImage(this.image, 0, top, left, centerY, 0, top - adjustVal, left, scaledCenterY);
                    ctx.drawImage(this.image, left, top, centerX, centerY, left - adjustVal, top - adjustVal, scaledCenterX, scaledCenterY);
                    ctx.drawImage(this.image, left + centerX, top, right, centerY, left + scaledCenterX - (adjustVal * 2), top - adjustVal, right, scaledCenterY);
                    ctx.drawImage(this.image, 0, top + centerY, left, bottom, 0, top + scaledCenterY - (adjustVal * 2), left, bottom);
                    ctx.drawImage(this.image, left, top + centerY, centerX, bottom, left - adjustVal, top + scaledCenterY - (adjustVal * 2), scaledCenterX, bottom);
                    ctx.drawImage(this.image, left + centerX, top + centerY, right, bottom, left + scaledCenterX - (adjustVal * 2), top + scaledCenterY - (adjustVal * 2), right, bottom);
                }
                return true;
            };
            /**
             * Retorna o texto
             *
             * @method toString
             */
            Scale9Bitmap.prototype.toString = function () {
                return "[ScaleBitmap (name=" + this.name + ")]";
            };
            return Scale9Bitmap;
        })(createjs.DisplayObject);
        ui.Scale9Bitmap = Scale9Bitmap;
    })(ui = siouxjs.ui || (siouxjs.ui = {}));
})(siouxjs || (siouxjs = {}));
var siouxjs;
(function (siouxjs) {
    var ui;
    (function (ui) {
        "use strict";
        var SXBitmap = (function (_super) {
            __extends(SXBitmap, _super);
            function SXBitmap(imageOrUrl, bScaleTextura) {
                if (bScaleTextura === void 0) { bScaleTextura = true; }
                // ScaleTexture: muda o path para SCALEx correspondente
                if (typeof imageOrUrl === "string") {
                    imageOrUrl = imageOrUrl.replace("@x", siouxjs.App.Settings.appScaleTexture + "x");
                }
                _super.call(this, imageOrUrl);
                this._bScaleTextura = bScaleTextura;
                switch (typeof imageOrUrl) {
                    case "string":
                        //
                        this._bOnLoad = false;
                        this._bWidthSetBeforeOnLoad = this._bHeightSetBeforeOnLoad = false;
                        var that = this;
                        this.image.onload = function () {
                            // Trata WIDTH e HEIGHT separado por que pode ser sido configura apenas 1 destes itens
                            // Verifica se WIDTH foi setado antes do evento OnLoad
                            if (that._bWidthSetBeforeOnLoad) {
                                // Precisa configurar o Width da Imagem
                                that.widthDo();
                            }
                            else {
                                that.scaleTextureX = that.scaleX;
                            }
                            // Height foi setado antes do onLoad
                            if (that._bHeightSetBeforeOnLoad) {
                                that.heightDo();
                            }
                            else {
                                that.scaleTextureY = that.scaleY;
                            }
                            that._bOnLoad = true;
                            // Chama função onLoad que pode ser configura pelo usuário obj.onLoad
                            that.onLoad();
                        };
                        break;
                    default:
                        this.scaleTextureY = this.scaleY;
                        this.scaleTextureX = this.scaleX;
                        break;
                }
            }
            SXBitmap.prototype.onLoad = function () {
            };
            Object.defineProperty(SXBitmap.prototype, "width", {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    this._width = value;
                    // Flag para saber se foi configurado antes do ONLOAD da imagem
                    if (this._bOnLoad) {
                        this.widthDo();
                    }
                    else {
                        this._bWidthSetBeforeOnLoad = true;
                    }
                },
                enumerable: true,
                configurable: true
            });
            SXBitmap.prototype.widthDo = function () {
                this.scaleX = this._width / this.image.naturalWidth;
                this.setBounds(this.getBounds().x, this.getBounds().y, this._width, this._height);
            };
            Object.defineProperty(SXBitmap.prototype, "height", {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    this._height = value;
                    // Flag para saber se foi configurado antes do ONLOAD da imagem
                    if (this._bOnLoad) {
                        this.heightDo();
                    }
                    else {
                        this._bHeightSetBeforeOnLoad = true;
                    }
                },
                enumerable: true,
                configurable: true
            });
            SXBitmap.prototype.heightDo = function () {
                this.scaleY = this._height / this.image.naturalHeight;
                this.setBounds(this.getBounds().x, this.getBounds().y, this._width, this._height);
            };
            Object.defineProperty(SXBitmap.prototype, "scaleTextureX", {
                get: function () {
                    if (this._bScaleTextura) {
                        return this.scaleX * siouxjs.App.Settings.appScaleTexture;
                    }
                    else {
                        return this.scaleX;
                    }
                },
                set: function (value) {
                    if (this._bScaleTextura) {
                        this.scaleX = value / siouxjs.App.Settings.appScaleTexture;
                    }
                    else {
                        this.scaleX = value;
                    }
                    this._width = this.scaleX * this.image.naturalWidth;
                    this.setBounds(this.getBounds().x, this.getBounds().y, this._width, this._height);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SXBitmap.prototype, "scaleTextureY", {
                get: function () {
                    if (this._bScaleTextura) {
                        return this.scaleY * siouxjs.App.Settings.appScaleTexture;
                    }
                    else {
                        return this.scaleY;
                    }
                },
                set: function (value) {
                    if (this._bScaleTextura) {
                        this.scaleY = value / siouxjs.App.Settings.appScaleTexture;
                    }
                    else {
                        this.scaleY = value;
                    }
                    this._height = this.scaleY * this.image.naturalHeight;
                    this.setBounds(this.getBounds().x, this.getBounds().y, this._width, this._height);
                },
                enumerable: true,
                configurable: true
            });
            return SXBitmap;
        })(createjs.Bitmap);
        ui.SXBitmap = SXBitmap;
    })(ui = siouxjs.ui || (siouxjs.ui = {}));
})(siouxjs || (siouxjs = {}));
var siouxjs;
(function (siouxjs) {
    var ui;
    (function (ui) {
        "use strict";
        var Button = (function (_super) {
            __extends(Button, _super);
            function Button() {
                var _this = this;
                _super.call(this);
                this.nState = 0;
                this.mouseChildren = false;
                this.on("mousedown", function (e) {
                    _this.mousedown(e);
                });
                this.on("pressup", function (e) {
                    _this.pressup(e);
                });
                this.on("click", function (e) {
                    _this.click(e);
                });
            }
            Button.prototype.mousedown = function (event) {
                if (this._isSelected) {
                    return;
                }
                this.nState = 1;
                this.state();
            };
            Button.prototype.pressup = function (event) {
                if (this._isSelected) {
                    return;
                }
                this.nState = 0;
                this.state();
            };
            Button.prototype.click = function (event) {
                if (this._onClick) {
                    this._onClick(event);
                }
            };
            Object.defineProperty(Button.prototype, "isSelected", {
                get: function () {
                    return this._isSelected;
                },
                set: function (value) {
                    this._isSelected = value;
                    if (this._isSelected) {
                        this.nState = 1;
                    }
                    else {
                        this.nState = 0;
                    }
                    this.state();
                },
                enumerable: true,
                configurable: true
            });
            Button.prototype.onClick = function (listener) {
                this._onClick = listener;
            };
            Button.prototype.state = function () {
            };
            return Button;
        })(createjs.Container);
        ui.Button = Button;
    })(ui = siouxjs.ui || (siouxjs.ui = {}));
})(siouxjs || (siouxjs = {}));
var siouxjs;
(function (siouxjs) {
    var ui;
    (function (ui) {
        "use strict";
        var ImageButton = (function (_super) {
            __extends(ImageButton, _super);
            function ImageButton(imageOn, imageDown, imageOver, bScaleTextura) {
                if (imageDown === void 0) { imageDown = null; }
                if (imageOver === void 0) { imageOver = null; }
                if (bScaleTextura === void 0) { bScaleTextura = true; }
                _super.call(this);
                this._objStateOn = imageOn;
                this.addChild(this._objStateOn);
                if (imageDown != null) {
                    this._objStateDown = imageDown;
                    this.addChild(this._objStateDown);
                }
                if (imageOver != null) {
                    this._objStateOver = imageOver;
                    this.addChild(this._objStateOver);
                }
                // HitArea - for better performance
                this._objHitArea = new createjs.Shape();
                if (bScaleTextura) {
                    this._appScaleTexture = siouxjs.App.Settings.appScaleTexture;
                }
                else {
                    this._appScaleTexture = 1;
                }
                this._objHitArea.graphics.beginFill("#000").drawRect(0, 0, this._objStateOn.image.naturalWidth / siouxjs.App.Settings.appScaleTexture, this._objStateOn.image.naturalHeight / siouxjs.App.Settings.appScaleTexture);
                this.setBounds(0, 0, this._objStateOn.image.naturalWidth / siouxjs.App.Settings.appScaleTexture, this._objStateOn.image.naturalHeight / siouxjs.App.Settings.appScaleTexture);
                this.hitArea = this._objHitArea;
                this.state();
            }
            Object.defineProperty(ImageButton.prototype, "objHitArea", {
                get: function () {
                    return this._objHitArea;
                },
                set: function (value) {
                    this._objHitArea = value;
                },
                enumerable: true,
                configurable: true
            });
            ImageButton.prototype.state = function () {
                this._objStateOn.visible = false;
                if (this._objStateDown) {
                    this._objStateDown.visible = false;
                }
                if (this._objStateOver) {
                    this._objStateOver.visible = false;
                }
                switch (this.nState) {
                    case 1:
                        if (this._objStateDown) {
                            this._objStateDown.visible = true;
                        }
                        break;
                    case 2:
                        if (this._objStateOver) {
                            this._objStateOver.visible = true;
                        }
                        break;
                    default:
                        this._objStateOn.visible = true;
                }
            };
            return ImageButton;
        })(ui.Button);
        ui.ImageButton = ImageButton;
    })(ui = siouxjs.ui || (siouxjs.ui = {}));
})(siouxjs || (siouxjs = {}));
var siouxjs;
(function (siouxjs) {
    var ui;
    (function (ui) {
        "use strict";
        var Scale3Button = (function (_super) {
            __extends(Scale3Button, _super);
            //constructor(image3: Scale3Bitmap, label: string, font: string, color: string, marginText: createjs.Rectangle, bScaleTextura: boolean = true) {
            function Scale3Button(label, bScaleTextura, stateOn, stateDown, stateOver) {
                if (bScaleTextura === void 0) { bScaleTextura = true; }
                _super.call(this);
                if (label == '') {
                    alert('Scale3Button: miss label');
                    label = 'miss label';
                }
                this._bScaleTextura = bScaleTextura;
                var image;
                var image3;
                // ON
                if (stateOn == null) {
                    image = siouxjs.Assets[Theme.Button3.imagemOn];
                    image3 = new ui.Scale3Bitmap(new createjs.Bitmap(image).image, Theme.Button3.sizeOnX1, Theme.Button3.sizeOnX2, this._bScaleTextura);
                    this._objStateOn = new ui.Scale3ButtonState(image3, label, Theme.Button3.fontOn, Theme.Button3.colorOn, Theme.Button3.marginOn, this._bScaleTextura);
                }
                else {
                    this._objStateOn = stateOn;
                }
                // DOWN
                if (stateDown == null) {
                    image = siouxjs.Assets[Theme.Button3.imagemDown];
                    image3 = new ui.Scale3Bitmap(new createjs.Bitmap(image).image, Theme.Button3.sizeDownX1, Theme.Button3.sizeDownX2, this._bScaleTextura);
                    this._objStateDown = new ui.Scale3ButtonState(image3, label, Theme.Button3.fontDown, Theme.Button3.colorDown, Theme.Button3.marginDown, this._bScaleTextura);
                }
                else {
                    this._objStateDown = stateDown;
                }
                // DOWN
                if (!siouxjs.util.Browser.isMobile()) {
                    if (stateOver == null) {
                        image = siouxjs.Assets[Theme.Button3.imagemOver];
                        image3 = new ui.Scale3Bitmap(new createjs.Bitmap(image).image, Theme.Button3.sizeDownX1, Theme.Button3.sizeDownX2, this._bScaleTextura);
                        this._objStateOver = new ui.Scale3ButtonState(image3, label, Theme.Button3.fontOver, Theme.Button3.colorOver, Theme.Button3.marginOver, this._bScaleTextura);
                    }
                    else {
                        this._objStateOver = stateOver;
                    }
                    this.addChild(this._objStateOn, this._objStateDown, this._objStateOver);
                }
                else {
                    this.addChild(this._objStateOn, this._objStateDown);
                }
                this.state();
                this.updateHitArea();
            }
            Object.defineProperty(Scale3Button.prototype, "objHitArea", {
                get: function () {
                    return this._objHitArea;
                },
                set: function (value) {
                    this._objHitArea = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scale3Button.prototype, "label", {
                get: function () {
                    return this._label;
                },
                set: function (value) {
                    this._label = value;
                    this._objStateOn.label = this._label;
                    this._objStateDown.label = this._label;
                    if (!siouxjs.util.Browser.isMobile()) {
                    }
                    this.updateHitArea();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scale3Button.prototype, "width", {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    this._width = value;
                    this._objStateOn.width = this._width;
                    this._objStateDown.width = this._width;
                    if (this._objStateOver != null) {
                        this._objStateOver.width = this._width;
                    }
                    this.updateHitArea();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scale3Button.prototype, "objStateOn", {
                get: function () {
                    return this._objStateOn;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scale3Button.prototype, "objStateDown", {
                get: function () {
                    return this._objStateDown;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scale3Button.prototype, "objStateOver", {
                get: function () {
                    return this._objStateOver;
                },
                enumerable: true,
                configurable: true
            });
            Scale3Button.prototype.state = function () {
                this._objStateOn.visible = false;
                this._objStateDown.visible = false;
                if (this._objStateOver != null) {
                    this._objStateOver.visible = false;
                }
                switch (this.nState) {
                    case 1:
                        this._objStateDown.visible = true;
                        break;
                    case 2:
                        if (this._objStateOver != null) {
                            this._objStateOver.visible = true;
                        }
                        break;
                    default:
                        this._objStateOn.visible = true;
                }
            };
            Scale3Button.prototype.updateHitArea = function () {
                // HitArea - for better performance
                this._objHitArea = new createjs.Shape();
                this._objHitArea.graphics.beginFill("#000").drawRect(0, 0, this._objStateOn.getBounds().width, this._objStateOn.getBounds().height);
                this.hitArea = this._objHitArea;
            };
            return Scale3Button;
        })(ui.Button);
        ui.Scale3Button = Scale3Button;
    })(ui = siouxjs.ui || (siouxjs.ui = {}));
})(siouxjs || (siouxjs = {}));
var siouxjs;
(function (siouxjs) {
    var ui;
    (function (ui) {
        "use strict";
        var Scale3ButtonState = (function (_super) {
            __extends(Scale3ButtonState, _super);
            //Scale3Bitmap : constructor(imageOrUri: any, nX1:number, nX2:number, bScaleTextura: boolean = false) {
            function Scale3ButtonState(image3, label, font, color, marginText, bScaleTextura) {
                if (bScaleTextura === void 0) { bScaleTextura = true; }
                _super.call(this);
                this._bScaleTextura = bScaleTextura;
                // Imagem
                this._image = image3;
                // Margem
                this._margin = marginText;
                // Texto
                this._objText = new createjs.Text(label, font, color);
                this.addChild(this._image, this._objText);
                this.drawObjects();
            }
            Object.defineProperty(Scale3ButtonState.prototype, "image", {
                get: function () {
                    return this._image;
                },
                set: function (value) {
                    this._image = value;
                    this.drawObjects();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scale3ButtonState.prototype, "margin", {
                get: function () {
                    return this._margin;
                },
                set: function (value) {
                    this._margin = value;
                    this.drawObjects();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scale3ButtonState.prototype, "objText", {
                get: function () {
                    return this._objText;
                },
                set: function (value) {
                    this._objText = value;
                    this.drawObjects();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scale3ButtonState.prototype, "label", {
                set: function (value) {
                    this._objText.text = value;
                    this.drawObjects();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scale3ButtonState.prototype, "width", {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    this._width = value;
                    this.drawObjects();
                },
                enumerable: true,
                configurable: true
            });
            Scale3ButtonState.prototype.drawObjects = function () {
                // Largura
                var largura = 0;
                if (this._width === undefined || this._width === 0) {
                    largura = this._objText.getBounds().width + this._margin.x + this._margin.width;
                }
                else {
                    largura = this._width;
                }
                this._objText.y = this._margin.y;
                this._objText.x = this._margin.x;
                this._image.setDrawSize(largura);
                //this.cache(0, 0, largura, );
            };
            return Scale3ButtonState;
        })(createjs.Container);
        ui.Scale3ButtonState = Scale3ButtonState;
    })(ui = siouxjs.ui || (siouxjs.ui = {}));
})(siouxjs || (siouxjs = {}));
var siouxjs;
(function (siouxjs) {
    var ui;
    (function (ui) {
        "use strict";
        var Scale9Button = (function (_super) {
            __extends(Scale9Button, _super);
            function Scale9Button(label, bScaleTextura, image9On, marginOn, image9Down, marginDown, image9Over, marginOver) {
                if (bScaleTextura === void 0) { bScaleTextura = true; }
                _super.call(this);
                this._bScaleTextura = bScaleTextura;
                // Criar Scale9Bitmap ON
                if (image9On == null) {
                    var image = siouxjs.Assets[Theme.Button9.imagemOn];
                    var size = Theme.Button9.sizeOn;
                    image9On = new ui.Scale9Bitmap(new createjs.Bitmap(image).image, size, this._bScaleTextura);
                }
                if (marginOn == null) {
                    var margin = Theme.Button9.marginOn;
                }
                this._objStateOn = new ui.Scale9ButtonState(image9On, margin, Theme.Button9.fontOn, Theme.Button9.colorOn, this._bScaleTextura);
                // Criar Scale9Bitmap DOWN
                if (image9Down == null) {
                    image = siouxjs.Assets[Theme.Button9.imagemDown];
                    size = Theme.Button9.sizeDown;
                    image9Down = new ui.Scale9Bitmap(new createjs.Bitmap(image).image, size, this._bScaleTextura);
                }
                if (marginDown == null) {
                    margin = Theme.Button9.marginDown;
                }
                this._objStateDown = new ui.Scale9ButtonState(image9Down, margin, Theme.Button9.fontDown, Theme.Button9.colorDown, this._bScaleTextura);
                // Imagem Over apenas para Desktop
                if (!siouxjs.util.Browser.isMobile()) {
                    // Criar Scale9Bitmap ON
                    if (image9Over == null) {
                        image = siouxjs.Assets[Theme.Button9.imagemOver];
                        size = Theme.Button9.sizeOver;
                        image9Over = new ui.Scale9Bitmap(new createjs.Bitmap(image).image, size, this._bScaleTextura);
                    }
                    if (marginOver == null) {
                        margin = Theme.Button9.marginOver;
                    }
                    this._objStateOver = new ui.Scale9ButtonState(image9Over, margin, Theme.Button9.fontOver, Theme.Button9.colorOver, this._bScaleTextura);
                    this.addChild(this._objStateOn, this._objStateDown, this._objStateOver);
                }
                else {
                    this.addChild(this._objStateOn, this._objStateDown);
                }
                this.label = label;
                this.state();
                this.updateHitArea();
            }
            Object.defineProperty(Scale9Button.prototype, "objHitArea", {
                get: function () {
                    return this._objHitArea;
                },
                set: function (value) {
                    this._objHitArea = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scale9Button.prototype, "label", {
                get: function () {
                    return this._label;
                },
                set: function (value) {
                    this._label = value;
                    this._objStateOn.label = this._label;
                    this._objStateDown.label = this._label;
                    if (!siouxjs.util.Browser.isMobile()) {
                        this._objStateOver.label = this._label;
                    }
                    this.updateHitArea();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scale9Button.prototype, "width", {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    this._width = value;
                    this._objStateOn.width = this._width;
                    this._objStateDown.width = this._width;
                    if (this._objStateOver != null) {
                        this._objStateOver.width = this._width;
                    }
                    this.updateHitArea();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scale9Button.prototype, "height", {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    this._height = value;
                    this._objStateOn.height = this._height;
                    this._objStateDown.height = this._height;
                    if (this._objStateOver != null) {
                        this._objStateOver.height = this._height;
                    }
                    this.updateHitArea();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scale9Button.prototype, "textAlign", {
                set: function (value) {
                    this._textAlign = value;
                    this._objStateOn.textAlign = this._textAlign;
                    this._objStateDown.textAlign = this._textAlign;
                    if (this._objStateOver != null) {
                        this._objStateOver.textAlign = this._textAlign;
                    }
                    this.updateHitArea();
                },
                enumerable: true,
                configurable: true
            });
            Scale9Button.prototype.setIcone = function (value, x, y) {
                this._objStateOn.setIcone(value.clone(), x, y);
                this._objStateDown.setIcone(value.clone(), x, y);
                if (this._objStateOver != null) {
                    this._objStateOver.setIcone(value.clone(), x, y);
                }
                this.updateHitArea();
            };
            Object.defineProperty(Scale9Button.prototype, "objStateOn", {
                get: function () {
                    return this._objStateOn;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scale9Button.prototype, "objStateDown", {
                get: function () {
                    return this._objStateDown;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scale9Button.prototype, "objStateOver", {
                get: function () {
                    return this._objStateOver;
                },
                enumerable: true,
                configurable: true
            });
            Scale9Button.prototype.state = function () {
                this._objStateOn.visible = false;
                this._objStateDown.visible = false;
                if (this._objStateOver != null) {
                    this._objStateOver.visible = false;
                }
                switch (this.nState) {
                    case 1:
                        this._objStateDown.visible = true;
                        break;
                    case 2:
                        if (this._objStateOver != null) {
                            this._objStateOver.visible = true;
                        }
                        break;
                    default:
                        this._objStateOn.visible = true;
                }
            };
            Scale9Button.prototype.updateHitArea = function () {
                // HitArea - for better performance
                this._objHitArea = new createjs.Shape();
                this._objHitArea.graphics.beginFill("#000").drawRect(0, 0, this._objStateOn.getBounds().width, this._objStateOn.getBounds().height);
                this.hitArea = this._objHitArea;
            };
            return Scale9Button;
        })(ui.Button);
        ui.Scale9Button = Scale9Button;
    })(ui = siouxjs.ui || (siouxjs.ui = {}));
})(siouxjs || (siouxjs = {}));
var siouxjs;
(function (siouxjs) {
    var ui;
    (function (ui) {
        "use strict";
        var Scale9ButtonState = (function (_super) {
            __extends(Scale9ButtonState, _super);
            function Scale9ButtonState(image9, margin, font, color, bScaleTextura) {
                if (bScaleTextura === void 0) { bScaleTextura = true; }
                _super.call(this);
                this._bScaleTextura = bScaleTextura;
                // Imagem
                this._image = image9;
                // Margem
                this._margin = margin;
                // Texto
                this._objText = new createjs.Text("", font, color);
                this.addChild(this._image, this._objText);
            }
            Object.defineProperty(Scale9ButtonState.prototype, "image", {
                get: function () {
                    return this._image;
                },
                set: function (value) {
                    this._image = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scale9ButtonState.prototype, "margin", {
                get: function () {
                    return this._margin;
                },
                set: function (value) {
                    this._margin = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scale9ButtonState.prototype, "objText", {
                get: function () {
                    return this._objText;
                },
                set: function (value) {
                    this._objText = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scale9ButtonState.prototype, "label", {
                set: function (value) {
                    this._objText.text = value;
                    this.drawObjects();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scale9ButtonState.prototype, "image9", {
                set: function (value) {
                    this._image = value;
                    this.drawObjects();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scale9ButtonState.prototype, "width", {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    this._width = value;
                    this.drawObjects();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scale9ButtonState.prototype, "height", {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    this._height = value;
                    this.drawObjects();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scale9ButtonState.prototype, "textAlign", {
                set: function (value) {
                    this._textAlign = value;
                    this.drawObjects();
                },
                enumerable: true,
                configurable: true
            });
            Scale9ButtonState.prototype.setIcone = function (value, x, y) {
                // Icone
                this._icone = value;
                this.addChild(this._icone);
                this._icone.x = x;
                this._icone.y = y;
            };
            Object.defineProperty(Scale9ButtonState.prototype, "icone", {
                get: function () {
                    return this._icone;
                },
                enumerable: true,
                configurable: true
            });
            Scale9ButtonState.prototype.drawObjects = function () {
                // Largura
                var largura = 0;
                if (this._width === undefined || this._width === 0) {
                    largura = this._objText.getBounds().width + this._margin.x + this._margin.width;
                }
                else {
                    largura = this._width;
                }
                // Altura
                var altura = 0;
                if (this._height === undefined || this._height === 0) {
                    altura = this._objText.getBounds().height + this._margin.y + this._margin.height;
                    this._objText.y = this._margin.y;
                }
                else {
                    altura = this._height;
                    this._objText.y = this._margin.y + this._height / 2 - this._objText.getBounds().height / 2;
                }
                switch (this._textAlign) {
                    case "center":
                        this._objText.x = this._margin.x + largura / 2 - this._objText.getBounds().width / 2;
                        break;
                    case "right":
                        this._objText.x = largura - this._margin.width - this._objText.getBounds().width;
                        break;
                    default:
                        this._objText.x = this._margin.x;
                }
                this._image.setDrawSize(largura, altura);
            };
            return Scale9ButtonState;
        })(createjs.Container);
        ui.Scale9ButtonState = Scale9ButtonState;
    })(ui = siouxjs.ui || (siouxjs.ui = {}));
})(siouxjs || (siouxjs = {}));
var siouxjs;
(function (siouxjs) {
    var ui;
    (function (ui) {
        var ItemAdd = (function (_super) {
            __extends(ItemAdd, _super);
            function ItemAdd(sIcon, width) {
                if (sIcon === void 0) { sIcon = ''; }
                if (width === void 0) { width = 200; }
                _super.call(this);
                this._width = width;
                // Bg
                this._bg = new siouxjs.ui.Scale3Bitmap(siouxjs.Assets[Theme.AddItem.bg], Theme.AddItem.bgN1, Theme.AddItem.bgN2);
                this.addChild(this._bg);
                // Icon
                if (sIcon != '') {
                    this._icon = new siouxjs.ui.SXBitmap(siouxjs.Assets[sIcon], true);
                    this.addChild(this._icon);
                }
                // Text
                this._text = new createjs.Text('0', Theme.AddItem.font, Theme.AddItem.color);
                this._text.textAlign = "right";
                this.addChild(this._text);
                // Bt Add
                this._btAdd = new siouxjs.ui.ImageButton(new siouxjs.ui.SXBitmap(siouxjs.Assets[Theme.AddItem.btAddOn], true), new siouxjs.ui.SXBitmap(siouxjs.Assets[Theme.AddItem.btAddDown], true));
                //btMais.onClick(this.openPopupMoedas.bind(this));
                this.addChild(this._btAdd);
                this.position();
            }
            ItemAdd.prototype.onClickAdd = function (listener) {
                this._btAdd.onClick(listener);
            };
            ItemAdd.prototype.position = function () {
                this._bg.setDrawSize(this._width);
                // Icon
                this._icon.y = (this._bg.getBounds().height - this._icon.getBounds().height) / 2;
                this._icon.x = Theme.AddItem.marginLeft;
                // Bt Add
                this._btAdd.x = this._bg.getBounds().width - this._btAdd.getBounds().width - Theme.AddItem.marginRight;
                this._btAdd.y = (this._bg.getBounds().height - this._btAdd.getBounds().height) / 2;
                //Text
                this._text.x = this._btAdd.x - Theme.AddItem.marginText;
                this._text.y = (this._bg.getBounds().height - this._text.getBounds().height) / 2;
            };
            return ItemAdd;
        })(createjs.Container);
        ui.ItemAdd = ItemAdd;
    })(ui = siouxjs.ui || (siouxjs.ui = {}));
})(siouxjs || (siouxjs = {}));
var siouxjs;
(function (siouxjs) {
    var util;
    (function (util) {
        "use strict";
        var Browser = (function () {
            function Browser() {
            }
            Browser.Android = function () {
                return navigator.userAgent.match(/Android/i) != null;
            };
            Browser.iOS = function () {
                if (navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i)) {
                    return true;
                }
                else {
                    return false;
                }
            };
            Browser.BlackBerry = function () {
                return navigator.userAgent.match(/BlackBerry/i) != null;
            };
            Browser.Opera = function () {
                return navigator.userAgent.match(/Opera Mini/i) != null;
            };
            Browser.Windows = function () {
                return navigator.userAgent.match(/IEMobile/i) != null;
            };
            Browser.isMobile = function () {
                if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
                    return true;
                }
                else {
                    return false;
                }
            };
            return Browser;
        })();
        util.Browser = Browser;
    })(util = siouxjs.util || (siouxjs.util = {}));
})(siouxjs || (siouxjs = {}));
var siouxjs;
(function (siouxjs) {
    "use strict";
    var util;
    (function (util) {
        var Collection;
        (function (Collection) {
            function ShuffleList(o) {
                if (o != null && o.length > 0) {
                    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
                        ;
                }
                return o;
            }
            Collection.ShuffleList = ShuffleList;
            function RemoveFromList(obj, list) {
                var index;
                while ((index = list.indexOf(obj)) !== -1) {
                    list.splice(index, 1);
                }
            }
            Collection.RemoveFromList = RemoveFromList;
            function RemoveAll(list) {
                while (list.length > 0) {
                    list.pop();
                }
            }
            Collection.RemoveAll = RemoveAll;
        })(Collection = util.Collection || (util.Collection = {}));
    })(util || (util = {}));
})(siouxjs || (siouxjs = {}));
var siouxjs;
(function (siouxjs) {
    var util;
    (function (util) {
        var DisplayObject = (function () {
            function DisplayObject() {
            }
            DisplayObject.distancia = function (obj1, obj2) {
                return Math.sqrt(Math.pow(obj2.x - obj1.x, 2) + Math.pow(obj2.y - obj1.y, 2));
            };
            DisplayObject.alignRight = function (obj, margin, fromObj) {
                if (fromObj) {
                    obj.x = fromObj.x - obj.getBounds().width - margin;
                }
                else {
                    obj.x = siouxjs.App.Settings.areaUtil.x + siouxjs.App.Settings.areaUtil.width - (obj.getBounds().width * obj.scaleX) - margin;
                }
            };
            DisplayObject.alignLeft = function (obj, margin, fromObj) {
                if (fromObj) {
                    obj.x = fromObj.x + fromObj.getBounds().width + margin;
                }
                else {
                    obj.x = siouxjs.App.Settings.areaUtil.x + margin;
                }
            };
            DisplayObject.alignTop = function (obj, margin, fromObj) {
                if (fromObj) {
                    obj.y = fromObj.y + fromObj.getBounds().height + margin;
                }
                else {
                    obj.y = siouxjs.App.Settings.areaUtil.y + margin;
                }
            };
            DisplayObject.alignBottom = function (obj, margin, fromObj) {
                if (fromObj) {
                    obj.y = fromObj.y - obj.getBounds().height - margin;
                }
                else {
                    obj.y = siouxjs.App.Settings.areaUtil.height - (obj.getBounds().height * obj.scaleY) - margin;
                }
            };
            return DisplayObject;
        })();
        util.DisplayObject = DisplayObject;
    })(util = siouxjs.util || (siouxjs.util = {}));
})(siouxjs || (siouxjs = {}));
var siouxjs;
(function (siouxjs) {
    var util;
    (function (util) {
        var Format = (function () {
            function Format() {
            }
            /*
            Formata um texto com um tamanho minimo de caracter
            ex: 001, 002, 010
            */
            Format.lengthItem = function (s, lenMin, item) {
                if (item === void 0) { item = '0'; }
                var r = s;
                while (r.length < lenMin) {
                    r = item + r;
                }
                return r;
            };
            return Format;
        })();
        util.Format = Format;
    })(util = siouxjs.util || (siouxjs.util = {}));
})(siouxjs || (siouxjs = {}));
var siouxjs;
(function (siouxjs) {
    var util;
    (function (util) {
        var GameObjects = (function () {
            function GameObjects() {
            }
            GameObjects.distancia = function (obj1, obj2) {
                return Math.sqrt(Math.pow(obj2.x - obj1.x, 2) + Math.pow(obj2.y - obj1.y, 2));
            };
            return GameObjects;
        })();
        util.GameObjects = GameObjects;
    })(util = siouxjs.util || (siouxjs.util = {}));
})(siouxjs || (siouxjs = {}));
var siouxjs;
(function (siouxjs) {
    var util;
    (function (util) {
        "use strict";
        var Geral = (function () {
            function Geral() {
            }
            Geral.arrayShuffle = function (o) {
                for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
                    ;
                return o;
            };
            return Geral;
        })();
        util.Geral = Geral;
    })(util = siouxjs.util || (siouxjs.util = {}));
})(siouxjs || (siouxjs = {}));
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}
//# sourceMappingURL=appBundle.js.map