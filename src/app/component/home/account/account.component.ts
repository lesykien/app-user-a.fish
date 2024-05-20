import { Component, NgZone, OnInit } from '@angular/core';
import { OrderService } from '../../../service/order.service';
import { Router } from '@angular/router';
import { AccountService } from '../../../service/account.service';
import { userModel } from '../../../model/user.model';
import { user } from '../../../involvement/user.involvement';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private ngZone: NgZone,
    private router: Router,
    private accountService: AccountService
  ) {}
  list: number[] = [1, 1, 1, 1, 1];
  openCart1: boolean = true;
  countItem: number = 0;
  userId: userModel = user.Convert();

  ngOnInit(): void {
    this.LoadPage();
  }

  LoadPage() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      let id: number = Number(localStorage.getItem('idUser'));
      if (!id) {
        this.ngZone.run(() => {
          this.router.navigate(['/']);
        });
        return;
      }
      this.orderService.countItem(id).subscribe((response) => {
        this.countItem = response.code;
      });

      this.GetUserById(id);
    }
  }

  GetUserById(id: number) {
    this.accountService.getData(id).subscribe((response) => {
      this.userId = response;
    });
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
