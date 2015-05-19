/// <reference path="../../siouxjs/utils/resourcemanager.ts" />

interface Resource extends siouxjs.util.IResource {
    abertura: {
        texto1: string;
        texto2: string;
        btLocal: string;
        btOnline: string;
    };
    selecaoExercito: {
        titulo: string;
        exercito: string;
        jogador: string;
        cpu: string;
        comecarJogo: string;
    };
    play: {
        btEntrar: string;
    };
}

var ptResource: Resource = {
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
}

var enResource: Resource = {
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
    },    play: {
        btEntrar: "Enter"
    }
}
