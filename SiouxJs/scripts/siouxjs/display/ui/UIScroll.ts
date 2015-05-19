module siouxjs {
    "use strict";

    // Classe do scroll 
    // TODO: Implementar scroll horizontal (atualmente só tem scroll vertical!)
    export class UIScroll extends createjs.Container {

        // Propriedade da Largura do componente
        private _width: number;
        get width(): number {
            return this._width;
        }
        set width(value: number) {
            this._width = value;
            this.setDrawSize();
        }

        // Propriedade da altura do componente
        private _height: number;
        get height(): number {
            return this._height;
        }
        set height(value: number) {
            this._height = value;
            this.setDrawSize();
        }

        // Máscara
        private _objMask: createjs.Shape;

        // Container interno
        private _objContainer: createjs.Container;

        // Drags
        private _bDrag: boolean = false;
        private _nDiferencaMouseContainerY: number;

        // Variáveis do slider
        private sliderMinY: number;
        private sliderMaxY: number;
        private sliderWidth: number;
        private sliderHeight: number;
        private sliderActualY: number;

        // O slider da barra
        private slider: createjs.Shape;
        private slider2: ui.SXBitmap;

        // Propriedade do valor do slider
        private _sliderValue: number;
        get sliderValue(): number {
            return this._sliderValue;
        }
        set sliderValue(newValue: number) {

            if (newValue != this._sliderValue) {
                this._sliderValue = newValue;
                //console.log("Value: " + this._sliderValue);

                // Muda a posição do container
                this._objContainer.y = (this._height - this._objContainer.getBounds().height) * this._sliderValue;
                //console.log("ContainerY: " + this._objContainer.y);

                // Muda a posição do slider
                this.slider2.y = (this.sliderMaxY - this.sliderMinY) * this._sliderValue;
                //console.log("SliderY: " + this.slider.y);
            }
        }


        // Função Construtor
        constructor(obj: createjs.DisplayObject) {
            super();

            // Cria um container
            this._objContainer = new createjs.Container();
            this._objContainer.addChild(obj);

            // Adiciona o container externa
            this.addChild(this._objContainer);

            // Evento de OnEnterFrame
            createjs.Ticker.addEventListener('tick', this.tick.bind(this));
        }


        // Função chamada quando o jogador muda o size desse objeto
        private setDrawSize(): void {

            if (this._width == undefined || this._height == undefined) return;

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
            var back2 = new ui.Scale9Bitmap(<HTMLImageElement> siouxjs.Assets["Instrucoes_ScrollBar"], new createjs.Rectangle(7, 8, 13, 462));
            back2.x = this.width + 10;
            back2.y = 0;
            back2.addEventListener("mousedown", (e: createjs.MouseEvent) => this.DragHandler(e));
            back2.addEventListener("pressmove", (e: createjs.MouseEvent) => this.DragHandler(e));
            back2.setDrawSize(21, 464);
            this.addChild(back2);

            this.slider2 = new ui.SXBitmap(<HTMLImageElement> siouxjs.Assets["Instrucoes_Slider"], true);
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
        }


        // Evento de mouseDown
        private onMouseDown = (e: createjs.MouseEvent): void => {
            this._bDrag = true;
            this._nDiferencaMouseContainerY = this._objContainer.y - siouxjs.mouseY(this.stage);
        };


        // Evento de mouseUp
        private onMouseUp = (e: createjs.MouseEvent): void => {
            this._bDrag = false;
        };


        // Evento de drag do slider
        private DragHandler(evt: createjs.MouseEvent) {

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
        }



        // EnterFrame
        private tick(e: createjs.TickerEvent): void {
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
        }
    }
}