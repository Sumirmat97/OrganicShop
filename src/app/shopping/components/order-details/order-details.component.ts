import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderId: string;
  order: Order = null;

  constructor(route: ActivatedRoute, orderService: OrderService) {
    this.orderId = route.snapshot.paramMap.get('id');
    if (this.orderId) {
      orderService.getOrder(this.orderId).pipe(take(1)).subscribe(order => this.order = order);
    }
  }

  ngOnInit(): void {
  }

}
