import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  
  transactions = [{id:1, name:'Achat de 3.5 parts de Tesla Inc.', style: 'buy'}, {id:2, name:'Vente de 0.5 parts de Google.', style: 'sell'},
  {id:3, name:'Achat de 6 parts de Tesla Inc.', style: 'buy'}, {id:4, name:'Achat de 1.5 parts de Google.', style: 'buy'},
  {id:5, name:'Achat de 15.3 parts de Nsim Tech.', style: 'buy'}, {id:6, name:'Vente de 4.5 parts de Nvidia.', style: 'sell'},
  {id:7, name:'Vente de 3.5 parts de Tesla Inc.', style: 'sell'}, {id:8, name:'Achat de 2.5 parts de Meta.', style: 'buy'}];

  constructor() { }

  ngOnInit(): void {
  }

}
