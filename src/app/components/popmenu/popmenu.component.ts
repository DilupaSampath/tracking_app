import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'popmenu',
  templateUrl: './popmenu.component.html',
  styleUrls: ['./popmenu.component.scss']
})
export class PopmenuComponent implements OnInit {
  openMenu: Boolean = false;
page="about";
  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  togglePopupMenu() {
    return this.openMenu = !this.openMenu;
  }

}
