import { Component } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController } from '@ionic/angular';

// Modals
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SearchFilterPage } from '../../pages/modal/search-filter/search-filter.page';
import { ImagePage } from './../modal/image/image.page';
// Call notifications test by Popover and Custom Component.
import { NotificationsComponent } from './../../components/notifications/notifications.component';
import { MainServicesService } from '../main-services.service';

@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss']
})
export class HomeResultsPage {

  status:boolean=true;
  searchKey = '';
  currentTrain = '123 Test Street';
  themeCover = 'https://cdn.dribbble.com/users/1514097/screenshots/3216203/location_animation.gif';
  geoLocationArray=[];
  responseData : any; 
  languageSelected: any;
  trainSelected:any;
  trainS:any;
  trainData:any[];
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public _MainServicesService:MainServicesService,
    private geolocation: Geolocation
  ) {
this.getAllTrains();

  }
  setLanguage(event) {
    let me=this;
    console.log(event.target.value);
    this._MainServicesService.setId(event.target.value);
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
//   [{
//     "type": "Point",
//     "coordinates": [
//         80.02864122390747,
//         7.131958239203191
//     ]
// }]
  trackingStatus(status:number){
if(status==0){
this.themeCover='https://cdn.dribbble.com/users/1514097/screenshots/3216203/location_animation.gif';
this.storeLocationData();
}else if(status==1){
  this.themeCover="https://cdn.dribbble.com/users/599768/screenshots/3033137/map-icon-train-station.gif";
}else if(status==2){
  this.themeCover="https://cdn.dribbble.com/users/599768/screenshots/3032027/map-icon-bar.gif";
}else if(status==3){
  this.themeCover="https://cdn.dribbble.com/users/330174/screenshots/2695600/comp_2.gif";
  this._MainServicesService.postLocationData();
  setTimeout(() => { 
    this.themeCover='https://cdn.dribbble.com/users/1514097/screenshots/3216203/location_animation.gif';
  }, 6200);
}
  }
  getAllTrains(){
    this._MainServicesService.get(`train/getAll`).subscribe(data=>{
      console.log(data);
      this.trainData=data.data;
    });
  }
  settings() {
    this.navCtrl.navigateForward('settings');
  }

setId(){
  console.log(this.trainSelected);
  // this._MainServicesService.setId(id);
}

storeLocationData(){
  this.trainS  = "sdsdsd";
  let watch = this.geolocation.watchPosition()
  .subscribe((resp) => {
    if(resp.coords.longitude != undefined){
    let lastLon =resp.coords.longitude;
    let lastLat =resp.coords.latitude;
    this._MainServicesService.storeGeoLocations(
      {
        "type": "Point",
        "coordinates": [
          resp.coords.longitude,
          resp.coords.latitude
        ]
    }
      );
  }
  
  });
  // for(let i=0;i<i+2;i++){
  //   if(!this.status){
  //     i=-100;
  //     this._MainServicesService.postLocationData();
  //   }else{
  //      let watch = this.geolocation.watchPosition();

  //     // this._MainServicesService.storeGeoLocations(currentLocation);
  //       }
  //   }
  
}
postLocationData(){
  this._MainServicesService.postLocationData();
  }

  async alertLocation() {
    const changeLocation = await this.alertCtrl.create({
      header: 'Tracking Settings',
      message: 'Current Tracking Time 2s',
      inputs: [
        {
          name: 'location',
          placeholder: 'Enter new tracking time',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Update',
          handler: async (data) => {
            console.log('Change clicked', data);
            this.currentTrain = data.location;
            const toast = await this.toastCtrl.create({
              message: 'Tracking time was change successfully',
              duration: 3000,
              position: 'top',
              closeButtonText: 'OK',
              showCloseButton: true
            });

            toast.present();
          }
        }
      ]
    });
    changeLocation.present();
  }

  async searchFilter () {
    const modal = await this.modalCtrl.create({
      component: SearchFilterPage
    });
    return await modal.present();
  }

  async presentImage(image: any) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      componentProps: { value: image }
    });
    return await modal.present();
  }

  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }

}
