import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService} from '../groceries-service.service'
import {InputDialogServiceService} from '../input-dialog-service.service'
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
  title = "Grocery List";

  loadItems(){
    return this.dataService.getItems()
  }

  async removeItem(item, index) {
    console.log("Removing Item - ", item, index)
    
    const toast = await this.toastController.create({
      message: 'Removed Grocery Item - ' + item.name,
      duration: 2000
    });
    toast.present();
    this.dataService.removeItem(index)
  }
  
  async shareItem(item, index) {
    console.log("Sharing Item - ", item, index)
    
    const toast = await this.toastController.create({
      message: 'Shared Grocery Item - ' + item.name,
      duration: 2000
    });
    toast.present();
    
    let message = "Grocery Item - Name : " + item.name + " - Quantity" + item.quantity
    let subject = "Shared via Groceries App"
    
    this.socialSharing.share(message, subject).then(() => {
      // Sharing via email is possible
      console.log("Shared Successfully")
    }).catch(() => {
      // Sharing via email is not possible
      console.error("Error while sharing ", Error)
    });
  }

  async editItem(item, index) {
    console.log("Editing - ", item, index)
    
    const toast = await this.toastController.create({
      message: 'Editing Grocery Item - ' + item.name,
      duration: 2000
    });
    toast.present();
    this.inputDialogService.showPrompt(item,index)
    
  }

  async addItem(){
    console.log("Adding Item")
    this.inputDialogService.showPrompt()
  }



  constructor(public toastController: ToastController, public alertController: AlertController, public dataService: GroceriesServiceService, public inputDialogService: InputDialogServiceService, public socialSharing: SocialSharing) { }

}
