import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, delay } from 'rxjs/operators';
import { HeroeModel } from '../models/heroe.model';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crud-heroes-19792.firebaseio.com';

  constructor( private http: HttpClient ) { }

  crearHeroe( heroe: HeroeModel ){

      return this.http.post(`${ this.url }/heroes.json`, heroe)
      .pipe(
        map((resp: any) => {
          heroe.id = resp.name;
          return heroe;
        })
        );
  }

  actualizarHeroe( heroe: HeroeModel ){

  const heroeTemp = {
    ...heroe
  };

  delete heroeTemp.id;

  return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`, heroeTemp);

  }

  borrarHeroe( id: string ){

    return this.http.delete(`${ this.url }/heroes/${ id }.json`);

  }

  obtenerHeroe( id: string ){

    return this.http.get(`${ this.url }/heroes/${ id }.json`);

  }

  obtenerHeroes(){
    return this.http.get(`${ this.url }/heroes.json`).pipe(
      map( this.arregloHeroes ), delay(1000)
    );
  }

  arregloHeroes(heroesObj: object){

    const heroes: HeroeModel[] = [];

    console.log(heroesObj);
    Object.keys( heroesObj ).forEach( key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push( heroe );
    });

    return heroes;

    if ( heroesObj === null ) { return []; }

  }

}
