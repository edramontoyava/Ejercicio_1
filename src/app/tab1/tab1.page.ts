import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { CarritoService } from '../services/carrito.service';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public products: Product[] = [];
  selectedFilter: string = 'all';

  carrito: { nombre: string; precio: number; cantidad: number; precioTotal: number }[] = [];
  totalGeneral: number = 0;


  constructor(private carritoService: CarritoService,
              private alertController: AlertController,
              private database:FirestoreService,
              private router:Router) {
    
  }
  ngOnInit() {
    this.getresult();
  }

  getresult(){
    this.database.getCollection<Product>("Products").subscribe(res =>{
      this.products=res;
    })
  }

  navegarAjustes() {
    this.router.navigate(['/ajustes']);
  }

  getBadgeColor(productType: string): string {
    switch (productType) {
      case 'Abarrotes':
        return 'primary';
      case 'Frutas y verduras':
        return 'warning';
      case 'Farmacia':
        return 'danger';
      case 'Limpieza':
        return 'medium';
      default:
        return 'dark';
    }
  }

  get filteredProducts() {
    if (this.selectedFilter === 'all') {
      return this.products;
    } else {
      return this.products.filter(product => product.type === this.selectedFilter);
    }
  }

  async addToCart(product: Product, quantityInput: any) {
    const quantity = parseInt(quantityInput.value, 10);
  
    if (quantity > 0) {
      for (let i = 0; i < quantity; i++) {
        this.carritoService.agregarAlCarrito(product);
      }

      this.carritoService.cantidadElementosCarrito += quantity;
      
      const alert = await this.alertController.create({
        header: 'Producto Agregado',
        message: `${product.name} se ha agregado al carrito (unidades: ${quantity}).`,
        buttons: ['OK']
      });
  
      await alert.present();

      quantityInput.value = "1";
    }
  }
  
  
  
  
}
