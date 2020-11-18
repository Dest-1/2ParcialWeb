import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = false;

  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void {

  this.cargando = true;
  this.heroesService.obtenerHeroes().subscribe( resp => {this.heroes = resp; this.cargando = false;
  });

  }

  borrarHeroe( id: string, nombre: string, i: number ) {

    Swal.fire({
      title: '¿Esta Seguro?',
      text: `Desea borrar a ${ nombre }`,
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true
    }).then ( resp => {

      if ( resp.value){

        this.heroesService.borrarHeroe( id ).subscribe();
        this.heroes.splice( i, 1 );
      }

    });

  }

  eliminar( heroe: HeroeModel ) {
    this.heroesService.borrarHeroe( heroe.id ).subscribe();
    this.heroesService.obtenerHeroes();
  }

}
