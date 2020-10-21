import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(private itemsMap: { [key: string]: ShoppingCartItem }) {
      this.itemsMap = this.itemsMap || {};
      for (const productId of Object.keys(itemsMap)) {
        const item = this.itemsMap[productId];
        this.items.push(new ShoppingCartItem({ ...item, key: productId }));
      }
    }

  getQuantity(product: Product) {
    const item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }

  get totalPrice() {
    let totalPrice = 0;
    for (const item of this.items)
      totalPrice += item.totalPrice;
    return totalPrice;
  }

  get totalItemCount() {
      let count = 0;
      for (const productId in this.itemsMap)
        count += this.itemsMap[productId].quantity;
      return count;
  }
}
