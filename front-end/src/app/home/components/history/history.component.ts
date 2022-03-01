import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  
  transactions = [{id:1, name:'Achat de 3.5 parts de Tesla Inc.'}, {id:2, name:'Vente de 0.5 parts de Google.'},
  {id:3, name:'Achat de 3.5 parts de Tesla Inc.'}, {id:4, name:'Achat de 0.5 parts de Google.'},
  {id:1, name:'Achat de 3.5 parts de Tesla Inc.'}, {id:2, name:'Vente de 4.5 parts de Nvidia.'},
  {id:1, name:'Vente de 3.5 parts de Tesla Inc.'}, {id:2, name:'Achat de 0.5 parts de Google.'}];

  constructor() { }

  ngOnInit(): void {
  }

}
