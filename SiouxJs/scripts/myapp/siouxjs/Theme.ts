module Theme {
    "use strict";

    export module General {

        export var cor1: string = "#2c0d47";
        export var cor2: string = "#2c0d47";

        export var titulo: string = "bold 30px Arial";
        export var tituloCor1: string = '#000000';

        export var texto: string = "15px Arial";
        export var textoCor1: string = '#000000';

        export var labelBigFont: string = "24px Arial";
        export var labelBigColor: string = "#dddddd";

        export var labelMediumFont: string = "20px Arial";
        export var labelMediumColor: string = "#dddddd";
    }

    export module Button9 {
        // On
        export var fontOn: string = "26px Arial";
        export var colorOn: string = "#dddddd";
        export var imagemOn: string = "ThemeBt9On";
        export var sizeOn: createjs.Rectangle = new createjs.Rectangle(15, 15, 200, 25);
        export var marginOn: createjs.Rectangle = new createjs.Rectangle(20, 10, 20, 20);

        // Down
        export var fontDown: string = "26px Arial";
        export var colorDown: string = "#dddddd";
        export var imagemDown: string = "ThemeBt9Down";
        export var sizeDown: createjs.Rectangle = new createjs.Rectangle(15, 15, 200, 25);
        export var marginDown: createjs.Rectangle = new createjs.Rectangle(20, 12, 20, 18);

        // Over
        export var fontOver: string = "26px Arial";
        export var colorOver: string = "#dddddd";
        export var imagemOver: string = "ThemeBt9Over";
        export var sizeOver: createjs.Rectangle = new createjs.Rectangle(15, 15, 200, 25);
        export var marginOver: createjs.Rectangle = new createjs.Rectangle(20, 12, 20, 18);

    }

    export module Button3 {
        // On
        export var fontOn: string = "26px Arial";
        export var colorOn: string = "#000";
        export var imagemOn: string = "ThemeBt3On";
        export var sizeOnX1: number = 40;
        export var sizeOnX2: number = 125;
        export var marginOn: createjs.Rectangle = new createjs.Rectangle(25, 10, 25, 20);

        // Down
        export var fontDown: string = "26px Arial";
        export var colorDown: string = "#fff";
        export var imagemDown: string = "ThemeBt3Down";
        export var sizeDownX1: number = 40;
        export var sizeDownX2: number = 125;
        export var marginDown: createjs.Rectangle = new createjs.Rectangle(25, 12, 25, 18);

        // Over
        export var fontOver: string = "26px Arial";
        export var colorOver: string = "#fff";
        export var imagemOver: string = "ThemeBt3On";
        export var sizeOverX1: number = 40;
        export var sizeOverX2: number = 125;
        export var marginOver: createjs.Rectangle = new createjs.Rectangle(25, 8, 25, 22);
    }

    export module Popup {
        export var img9bg: string = "ThemeBgPopup";
        export var size9bg: createjs.Rectangle = new createjs.Rectangle(50, 50, 110, 40);
        export var largura: number = 500;
        export var altura: number = 300;

        // Box
        export var boxCor: string = "#000";
        export var boxAlpha: number = .8;

        // Titulo
        export var tituloMarginTop: number = 20;

        // Texto
        export var textoMargin: number = 40;
    }

    export module Ranking {
        export var img9bg: string = "ThemeBgPopup";
        export var size9bg: createjs.Rectangle = new createjs.Rectangle(50, 50, 110, 40);
        export var largura: number = 600;
        export var altura: number = 740;

        export var listX: number = 50;
        export var listY: number = 150;
        export var listLargura: number = 460;
        export var listAltura: number = 530;
    }

    export module Fader {
        export var color: string = "#000";
        export var alpha: number = .6;
    }
}