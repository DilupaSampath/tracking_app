import { Component, OnInit } from '@angular/core';
import { MainServicesService } from '../main-services.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  trainData:any[];
 
  constructor(public _MainServicesService:MainServicesService) { }

  ngOnInit() {
    this.getAllTrains();
  }
  getAllTrains(){
    this._MainServicesService.get(`train/getAll`).subscribe(data=>{
      console.log(data);
      this.trainData=data.data;
    });
  }
}
