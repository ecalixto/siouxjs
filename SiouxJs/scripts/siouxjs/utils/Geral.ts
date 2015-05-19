﻿module siouxjs.util {
    "use strict";

    export class Geral {

        static arrayShuffle(o: Array<any>): Array<any> {
            for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }
    }
} 