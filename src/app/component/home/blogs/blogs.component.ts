import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent implements OnInit {
  list: number[] = [1, 1, 1, 1,1,1,1,1,1];

  ngOnInit(): void {}
}
