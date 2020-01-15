import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ProviderService } from '../service/provider.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  username: string = "";
  password: string = "";
  c_password: string = "";
  caution: string = "";
  afteradd: boolean = false; //新增完出現的確認畫面
  constructor(private router: ActivatedRoute, private storage: Storage, private service: ProviderService) {
    this.router.queryParams.subscribe(params => {
      this.get();
      this.checklogin()
    })
  }

  ngOnInit() {
  }
  addaccount: boolean = false;
  deleteaccount: boolean = false;
  delete_username: string = "";//要刪除的帳號

  combine_success:boolean
  account: any;

  logined:boolean=false;
  get() {
    let body = new FormData;
    this.storage.get('token').then(val => {
      body.append('token', val)
      this.service.getemployee(body).subscribe(res => {
        console.log(res)
        this.account = res;
      })
    })
  }
  add() {
    this.username = "";
    this.password = "";
    this.c_password = "";
    this.caution = "";
    this.addaccount = true;
    this.afteradd = false;

  }
  add_confirm() {
    this.caution = "新增中...請稍後..."
    if (this.password !== this.c_password) {
      this.caution = "請確認密碼是否相同";
    }
    else if (this.username.length == 0) {
      this.caution = "帳號不可為空";
    }
    else {
      this.storage.get('token').then(val => {
        let body = new FormData;
        body.append('token', val)
        body.append('username', this.username);
        body.append('password', this.password);
        this.service.newemployee(body).subscribe(res => {
          console.log(res);
          if (res.toString() == 'ok') {
            this.caution = "新增成功！";
            this.afteradd = true;
          }
          else if (res.toString() == 'no') {
            this.caution = "帳號已存在。";
          }
          else {
            this.caution = "發生錯誤，請重新嘗試。";
          }
        })
      })
    }
  }
  after() {
    this.addaccount = false;
    this.get();
  }
  add_cancel() {
    this.addaccount = false;
    this.get();
  }

  delete(id) {
    console.log("delete:" + id)
    this.delete_username = id;
    this.deleteaccount = true;

  }
  delete_confirm() {
    let body = new FormData;
    this.storage.get('token').then(val=>{
      body.append('token',val);
      body.append('username',this.delete_username);
      if(this.delete_username!==""){
        this.service.delete_employee(body).subscribe(res=>{
          console.log(res)
          this.deleteaccount = false;
          this.get();
        })
      }
      else{
        //如果錯誤時

      }
    })
  }
  delete_cancel() {
    this.delete_username = "";
    this.deleteaccount = false;
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
