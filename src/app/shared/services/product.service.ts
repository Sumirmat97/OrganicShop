import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from 'shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products').snapshotChanges()
    .pipe(
      map( products => {
        return products.map(product => {
          const value: Product =
            ({ key: product.payload.key,
              title: product.payload.val()['title'],
              price: product.payload.val()['price'],
              category: product.payload.val()['category'],
              imageUrl: product.payload.val()['imageUrl']
            });
          return value;
        });
      }));
  }

  getProduct(productId) {
    return this.db.object('/products/' + productId).snapshotChanges()
      .pipe(
          map( product => {
            return ({ key: product.payload.key,
                      title: product.payload.val()['title'],
                      price: product.payload.val()['price'],
                      category: product.payload.val()['category'],
                      imageUrl: product.payload.val()['imageUrl']
                    });
            })
        );
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
