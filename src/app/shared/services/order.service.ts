import { Order } from 'shared/models/order';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    const result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/orders').snapshotChanges()
      .pipe(map(orders => {
        return orders.map(o => {
          const key = o.payload.key;
          const order = o.payload.val();
          return {key, order};
        });
      }));
  }

  getOrder(orderId: string) {
    return this.db.object('/orders/' + orderId).snapshotChanges().
      pipe(map(o => {
        const order: Order = new Order(
          o.payload.val()['userId'],
          o.payload.val()['shipping'],
          null,
          o.payload.val()['datePlaced'],
          o.payload.val()['items'],
        );
        return order;
      }));
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders',  ref => {
      return ref.orderByChild('userId').equalTo(userId);
    }).snapshotChanges()
      .pipe(map(orders => {
        return orders.map(o => {
          const key = o.payload.key;
          const order = o.payload.val();
          return {key, order};
        });
      }));
  }
}
