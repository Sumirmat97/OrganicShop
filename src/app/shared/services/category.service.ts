import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('/categories', ref => {
        return ref.orderByChild('name');
      }
    ).snapshotChanges()
    .pipe(
      map( categories => {
          return categories.map(category => {
            const key = category.payload.key;
            const name = category.payload.val()['name'];
            return {key, name};
        });
    }));
  }
}
