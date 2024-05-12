import { Component, OnInit } from '@angular/core';
import { HomeInvolvement } from '../../involvement/home.involvement';
import { involvement } from '../../involvement/api.involvement';
import { ProductService } from '../../service/product.service';
import { response } from 'express';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor (private productsevice : ProductService) {}
  ImageLogo : string = involvement.logo;
  nameUser: string = '';
  listProduct!: any;
  ngOnInit(): void {
    this.nameUser = HomeInvolvement.LoadNameUser();  
  }
}

