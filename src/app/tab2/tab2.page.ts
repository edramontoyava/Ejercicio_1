import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  cantidadElementosCarrito: number = 0;
  constructor(public carritoService: CarritoService) {}

  
  cambiarCantidad(item: { nombre: string; precio: number; cantidad: number; precioTotal: number; foto: string }, nuevaCantidad: number) {
   
    this.carritoService.cambiarCantidad(item, nuevaCantidad);
  }

  eliminarDelCarrito(nombreProducto: string) {
    
    this.carritoService.eliminarDelCarrito(nombreProducto);
  }
}
