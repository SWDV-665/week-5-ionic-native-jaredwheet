import { Injectable } from '@angular/core';
import { GroceriesServiceService } from '../app/groceries-service.service'
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class InputDialogServiceService {

  constructor(public dataService: GroceriesServiceService, public alertController: AlertController) { }

  async showPrompt(item?, index?) {
    const alert = await this.alertController.create({
      header: item ? 'Edit item' : "Add Item",
      message: 'Update Grocery List',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Item',
          value: item ? item.name : null
        },
        {
          name: 'quantity',
          type: 'number',
          id: 'quantity-id',
          placeholder: 'Quantity',
          min: 0,
          max: 25,
          value: item ? item.quantity : null
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: item => {
            console.log('Confirm Ok', item);
            if (index !== undefined) {
              this.dataService.editItem(item, index)
            }
            else {
              this.dataService.addItem(item)
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
