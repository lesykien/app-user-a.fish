import { Component, NgZone, OnInit } from '@angular/core';
import { involvement } from '../../involvement/api.involvement';
import { product } from '../../model/products.model';
import { ProductService } from '../../service/product.service';
import { response } from 'express';
import { AccountService } from '../../service/account.service';
import { Router } from '@angular/router';

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

  ngOnInit(): void {
    this.LoadingPage();
  }

  LoadingPage() {
    let id: number = Number(sessionStorage.getItem('idUser'));
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
    let id: number = Number(sessionStorage.getItem('idUser'));
    if (!id) return;
    this.accountService.removeItemToken(id).subscribe((response) => {
      if (response.code == 200) {
        sessionStorage.removeItem('idUser');
        window.location.reload();
      }
    });
  }
}
