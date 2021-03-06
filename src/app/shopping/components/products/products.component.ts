import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { ProductService } from 'shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/product';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService) {

  }

  async ngOnInit() {
    this.cart$ = (await this.shoppingCartService.getCart());
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll()
    .pipe(switchMap(p => {
      this.products = p;
      return this.route.queryParamMap;
    }))
    .subscribe( params => {
      this.category = params.get('category');
      this.applyFilter();
    });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
        this.products.filter(p => p.category === this.category) :
        this.products;
  }

}
