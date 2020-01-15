import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient,private storage:Storage) { }

  //url = "http://120.117.8.29/gomovie/";
  url = "http://127.0.0.1/gomovie/";
  login(body: any) {
    //http://localhost/mphp/userdata/login.php
    //if get fail return fail
    //else get token return success

    return this.http.post(this.url + 'userdata/login.php', body)

  }
  checklogin(body:any){
    return this.http.post(this.url + 'userdata/checktoken.php', body)
  }
  logout(){
    this.storage.remove('token');
  }

  getemployee(body){
    return this.http.post(this.url + 'employee/get.php', body)
  }
  newemployee(body){
    
    return this.http.post(this.url + 'employee/new.php', body)
  }
  delete_employee(body){
    return this.http.post(this.url + 'employee/delete.php', body)
  }

  new_movie(body){
    return this.http.post(this.url + 'movie/new.php', body)
  }
  get_movie(body){
    
    return this.http.post(this.url + 'movie/get.php', body)
  }
  new_cinemas(body){
    
    return this.http.post(this.url + 'cinemas/new.php', body)
  }
  get_cinemas(body){
    
    return this.http.post(this.url + 'cinemas/get.php', body)
  }
}

