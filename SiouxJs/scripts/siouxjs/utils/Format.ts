module siouxjs.util {

	export class Format {
		
		/*
		Formata um texto com um tamanho minimo de caracter
		ex: 001, 002, 010
		*/
		static lengthItem(s: string, lenMin: number, item: string = '0'): string {
			var r: string = s;
			while (r.length < lenMin) {
				r = item + r;
			}
			return r
		}
	}
} 