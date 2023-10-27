import { Component } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(public carritoService: CarritoService) {}
}
