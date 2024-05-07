import { Component, OnInit } from '@angular/core';
import { HomeInvolvement } from '../../involvement/home.involvement';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  nameUser: string = '';
  ngOnInit(): void {
    this.nameUser = HomeInvolvement.LoadNameUser();   
  }
}

