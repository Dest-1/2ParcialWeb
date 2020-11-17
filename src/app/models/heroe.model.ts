export class HeroeModel{
    id: string;
    nombre: string;
    poder: string;
    arma: string;
    vivo: boolean;

    constructor(){
        this.vivo = true;
    }

}