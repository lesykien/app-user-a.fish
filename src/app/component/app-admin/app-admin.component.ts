import { Component, NgZone, OnInit } from '@angular/core';
import { involvement } from '../../involvement/api.involvement';
import { product } from '../../model/products.model';
import { ProductService } from '../../service/product.service';
import { response } from 'express';
import { AccountService } from '../../service/account.service';
import { NavigationEnd, Router } from '@angular/router';
import { admin } from '../../involvement/admin.involvement';
import { NativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-app-admin',
  templateUrl: './app-admin.component.html',
  styleUrl: './app-admin.component.scss',
})
export class AppAdminComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private accountService: AccountService,
    private ngZone: NgZone,
    private router: Router
  ) {}
  ImageLogo: string = involvement.logo;

  titleMain: string = '';

  ngOnInit(): void {
    this.LoadingPage();
    this.IsChangesTitle();
  }

  IsChangesTitle() {
    this.titleMain = admin.FilterTitle(this.router.url);
    
    this.router.events.subscribe((envent) => {
      if (envent instanceof NavigationEnd) {
        this.titleMain = admin.FilterTitle(this.router.url);
      }
    });

  }

  LoadingPage() {
    let id: number = Number(localStorage.getItem('idUser'));
    if (!id) {
      this.ngZone.run(() => {
        this.router.navigate(['/']);
      });
      return;
    }
    this.accountService.getData(id).subscribe((response) => {
      this.IsRoles(response.role);
    });
  }
  IsRoles(role: boolean) {
    if (!role) {
      this.ngZone.run(() => {
        this.router.navigate(['/']);
      });
      return;
    }
  }
  Logout() {
    let id: number = Number(localStorage.getItem('idUser'));
    if (!id) return;
    this.accountService.removeItemToken(id).subscribe((response) => {
      if (response.code == 200) {
        localStorage.removeItem('idUser');
        window.location.reload();
      }
    });
  }
}
