import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss'],
})
export class AjustesComponent  implements OnInit {

  data:Product ={
      name: "",
      photo: "",
      price: 0,
      type: "",
      description:"",
      id:"",
  }

  constructor(private database: FirestoreService,
              private interaction:InteractionService) { }

  ngOnInit() {
    
  }

  addproduct(){
    this.interaction.presentLoading('Guardando...')
    const path='Products'
    const id = this.database.getId();
    this.data.id=id;
    this.database.createDoc(this.data,path,id).then(()=>{
      this.interaction.closeLoading();
      this.interaction.presentToast("Guardado con exito")
    })   
  }
}
