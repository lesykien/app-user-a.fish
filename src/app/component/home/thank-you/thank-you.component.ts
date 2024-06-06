import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../service/order.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.scss',
})
export class ThankYouComponent implements OnInit {
  constructor(
    private pramaster: ActivatedRoute,
    private router: Router,
    private order: OrderService
  ) {}
  ngOnInit(): void {
    this.LoadPage();
  }

  LoadPage() {
    let id: number = this.pramaster.snapshot.params['id'];
    console.log(id);
  }
}
