import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

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
      this.data.name = '';
      this.data.price =0;
      this.data.description = '';
      this.data.type = '';
      this.data.photo = '';
      this.interaction.presentToast("Guardado con exito")
    })   
  }
}
