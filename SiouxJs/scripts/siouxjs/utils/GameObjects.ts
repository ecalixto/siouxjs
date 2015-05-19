module siouxjs.util {

	export class GameObjects {
		
		static distancia(obj1: GameObject, obj2: GameObject): number {
			return Math.sqrt(Math.pow(obj2.x - obj1.x, 2) + Math.pow(obj2.y - obj1.y, 2));
		}
	}
} 