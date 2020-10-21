import { ShoppingCart } from './shopping-cart';
export class Order {
    datePlaced: number;
    items: any[];

    constructor(public userId: string, public shipping: any, shoppingCart?: ShoppingCart, datePlaced?: number, items?: any[]) {
        this.datePlaced = datePlaced || new Date().getTime();

        if (shoppingCart) {
          this.items = shoppingCart.items.map(i => {
            return {
              product: {
                title: i.title,
                imageUrl: i.imageUrl,
                price: i.price
              },
              quantity: i.quantity,
              totalPrice: i.totalPrice
            };
          });
        } else {
          this.items = items;
        }
    }

    getTotalPrice() {
      let totalPrice = 0;
      for (const item of this.items)
        totalPrice += item.totalPrice;
      return totalPrice;
    }
}
