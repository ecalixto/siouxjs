module Config {
        export var bDebug: boolean = true;

        // Tamanho do grid guia
        export var appSizeGuide = new createjs.Rectangle(0, 0, 768, 1024);

        // Google Analytics
        export var bGoogleAnalytics: boolean = false;
        export var UAGoogleAnalytics = 'UA-00000000-0';

        export var nFPS: number = 30;
        export var timingMode = createjs.Ticker.RAF_SYNCHED;
        export var sPathGlobal: string = '';
        export var sVersion: string = 'v 0.01';

        // True se é para colocar uma mascara sobre as telas, deixando visivel apenas a área appSizeGuide
        export var bMask: boolean = false;
        export var nAreaUtilWidthMax = 768; // Só é usado quando o bMask é FALSE
        export var nAreaUtilHeightMax = 1363; // Só é usado quando o bMask é FALSE
        export enum AREAUTIL { Guide = 0, Device = 1, Max = 2 };
        export var nAreaUtilTipo: number = AREAUTIL.Max;

        // Orientação do celular
        export var bCheckOrientation: boolean = false;
        export var nOrientation: number = siouxjs.OrientationTipo.Landscape;

        // ScaleTexture: Utiliza para pegar as texturas do diretorio correto 1x, 2x, 3x, etc.
        // Configurar quais tem textura suportada, ordem do menor para o maior
        // ATENÇÃO! Precisa utilizar o push por segurançao, por que se usar Array(1) configura o tamanho do Array não 1 como primeiro elemento
        export var aScaleTexture: Array<number> = Array();
        aScaleTexture.push(2);
        //aScaleTexture.push(2);

        export var manifestLoad: any[] =
            [
                // Theme.Button9
                { src: sPathGlobal + 'assets/theme/@x/bt/bt9On.png', id: 'ThemeBt9On' },
                { src: sPathGlobal + 'assets/theme/@x/bt/bt9Down.png', id: 'ThemeBt9Down' },
                { src: sPathGlobal + 'assets/theme/@x/bt/bt9Over.png', id: 'ThemeBt9Over' },

                // Theme.Button3
                { src: sPathGlobal + 'assets/theme/@x/bt/bt3On.png', id: 'ThemeBt3On' },
                { src: sPathGlobal + 'assets/theme/@x/bt/bt3Down.png', id: 'ThemeBt3Down' },
                { src: sPathGlobal + 'assets/theme/@x/bt/bt3Over.png', id: 'ThemeBt3Over' },

                //Theme.Item
                { src: sPathGlobal + 'assets/theme/@x/bgItem.png', id: 'ThemeBgItem' },

                // Icons
                { src: sPathGlobal + 'assets/textures/@x/icons/icMoeda.png', id: 'icMoeda' },

                // Button
                { src: sPathGlobal + 'assets/textures/@x/buton/btAddOn.png', id: 'btAddOn' },
                { src: sPathGlobal + 'assets/textures/@x/buton/btAddDown.png', id: 'btAddDown' },

                // backgroud
                { src: sPathGlobal + 'assets/textures/@x/Backgroud.jpg', id: 'Backgroud' },

            ];
}
console.log('Config.ts');