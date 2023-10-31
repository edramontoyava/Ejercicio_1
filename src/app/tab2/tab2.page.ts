import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { ProductSold } from '../models/shopping.model';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  productos: ProductSold[] = [];
  cantidadElementosCarrito: number = 0;
  constructor(public carritoService: CarritoService,
              private interaction:InteractionService) {}

  
  cambiarCantidad(item: { nombre: string; precio: number; cantidad: number; precioTotal: number; foto: string }, nuevaCantidad: number) {
   
    this.carritoService.cambiarCantidad(item, nuevaCantidad);
  }

  eliminarDelCarrito(nombreProducto: string) {
    
    this.carritoService.eliminarDelCarrito(nombreProducto);
  }

  realizarCompra() {
    const fechaHora = new Date().toLocaleString();
    const productos = this.carritoService.carrito.map(item => ({
      name: item.nombre,
      amount: item.cantidad,
      price: item.precio
    }));
    const totalCompra = this.carritoService.totalGeneral;
    
    this.carritoService.agregarCompra(fechaHora, productos, totalCompra);

    this.carritoService.carrito = []; 
    this.carritoService.actualizarTotalGeneral(); 
    this.productos = []; 
    this.interaction.presentToast("Compra exitosa");
  }
}
