import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../service/provider.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private services: ProviderService, private route: Router,private storage : Storage,private service:ProviderService,public toastController: ToastController) {
    this.checklogin();
   }
  logout_approve: boolean = false;
  success: boolean = false;

  logined:boolean=false;
  ngOnInit() {
  }
  loggout() {
    this.logout_approve = true;
  }
  loggout_cancel() {
    this.logout_approve = false;
  }

  loggout_confirm() {
    this.success = true;
  }

  logout() {
    //clear token in Storage
    //console.log(val);
    //this.services.logout();



    this.services.logout();
    this.route.navigate(['home']);

    this.logout_approve = false;
    this.success = false;

  }
  go_as(){

  }
  go_cp(){

  }
  

  async go_test() {
    //(this.url + this.username);
    const toast = await this.toastController.create({
      message: '此頁面功能僅供參考，',
      duration: 5000
    });
    toast.present();
  }


  checklogin(){
    this.storage.get('token').then(val=>{
      let body =new FormData;
      console.log(val)
      body.append('token',val)
      this.service.checklogin(body).subscribe(res=>{
        console.log(res['login'])
        if(res['login'] =='ok'){
          this.logined=true;
        }
      })
    })
  }

}
