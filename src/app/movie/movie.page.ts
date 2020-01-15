import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ProviderService } from '../service/provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {

  constructor(private storage: Storage, private service: ProviderService, private route: Router) {
    this.get();
  }
  addmovie: boolean = false;
  years: any = [];
  month: any = [];
  day: any = [];
  caution:any;
  combine_success:any
  ngOnInit() {
    for (let x = 0; x < 120; x++) {
      this.years[x] = x + 1900;
    }
    console.log(this.years);
    for (let x = 0; x < 12; x++) {
      this.month[x] = x + 1;
    }
    for (let x = 0; x < 31; x++) {
      this.day[x] = x + 1;
    }
  }
  date_caution: string;
  date_ok: boolean = true;

  myDate: any;
  rating: any;
  name: any;

  form = { name: "", year: "", month: "", date: "", type: "" }

  movies: any
  add() {
    this.addmovie = true;
  }
  add_confirm() {
    let body = new FormData;
    if (this.date_ok) {
      this.storage.get('token').then(val => {
        console.log("update")
        body.append('token', val);
        body.append('name', this.name);
        body.append('type', this.form.type);
        body.append('rating', this.rating);
        body.append('year', this.form.year);
        body.append('month', this.form.month);
        body.append('date', this.form.date);
        this.service.new_movie(body).subscribe(res => {
          console.log(res);
          if(res.toString()=="ok"){
            this.get()
            this.addmovie = false;
          }
        })
      })
    }

  }
  add_cancel() {
    this.addmovie = false;
  }
  get() {
    let body = new FormData
    this.storage.get('token').then(val => {
      body.append('token', val)
      this.service.get_movie(body).subscribe(res => {
        console.log(res);
        if (res.toString() != "error") {
          this.movies = res
          console.log(this.movies)
        }
      })
    })
  }
  edit(number) {
    this.route.navigateByUrl('/movie/' + number)
  }
  showdate(ev) {
    console.log(this.myDate)
    console.log(ev)
  }
  test() {
    console.log(this.rating)
  }
  checkdate() {
    let y = parseInt(this.form.year);
    let m = parseInt(this.form.month);
    let d = parseInt(this.form.date);
    /*
        if (y < 2019) {
          this.date_ok = false;
        }
        else if (d < 1 || d >31) {
          console.log(this.date_ok)
          this.date_ok = false;
          console.log(this.date_ok)
        }
        else if ((m == 2) && d > 28) {
          
          this.date_ok = false;
          
        }
        else if ((m == 4 || m == 6 || m == 9 || m == 11) && (d > 30)) {
          
          this.date_ok = false;
          
        }
        console.log(this.date_ok)
        if (this.date_ok) {
          this.date_caution = "錯誤日期"
        }
        else{
          this.date_caution = ""
        }*/
  }
}
