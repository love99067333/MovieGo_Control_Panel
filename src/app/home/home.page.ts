import { Component, ɵɵresolveBody } from '@angular/core';
import { ProviderService } from '../service/provider.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private service: ProviderService,private storage : Storage) {
    this.checklogin()
   }
  username: any
  password: any

  logined:boolean=false;

  name="";

  login() {
    console.log(this.username + this.password)
    let body = new FormData;
    body.append('username', this.username);
    body.append('password', this.password);
    this.service.login(body).subscribe(res => {
      this.storage.set('token',res.toString()).then(val=>{

        this.checklogin()
      });
      
      
    })

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
          this.name=res['name']
        }
      })
    })
  }


}
