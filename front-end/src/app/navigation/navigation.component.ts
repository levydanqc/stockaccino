import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  // stocks = [
  //   {
  //     "Nom": "Apple",
  //     "Code": "AAPL"
  //   },
  //   {
  //     "Nom": "Apple",
  //     "Code": "AAPL"
  //   }
  // ];

  constructor() { }

  ngOnInit(): void {
  }


  // stocks = request.fetch(urlApi).getAll()



}
