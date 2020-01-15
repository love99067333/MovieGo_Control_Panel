import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../service/provider.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.page.html',
  styleUrls: ['./cinema.page.scss'],
})
export class CinemaPage implements OnInit {

  cinemas: any;
  constructor(private service: ProviderService, private storage: Storage, public toastController: ToastController) {
    this.get_movie();
    this.get_cinemas();
    this.checklogin();
  }

  month: any = [];

  ngOnInit() {
    
  }
  form = { movie: "", year: "", month: "", date: "" };
  price = { student: 0, kid: 0, adult: 0 }//票價
  theater: string=""

  addcinemas: boolean = false;
  date: any = "";
  time: any = "";
  times: Array<string> = [];
  select_time: boolean = false;


  cinemas_data: any

  logined: boolean = false;

  caution: string;
  add() {
    this.addcinemas = true;
  }
  add_confirm() {
    let body = new FormData;
    if ((this.price.student == 0 && this.price.kid == 0 && this.price.adult) || this.theater == "" || this.times.length == 0 || this.date == "" || this.form.movie == "") {
      this.caution = '尚未完成表格'
      console.log('尚未完成表格')
    }
    else {
      this.storage.get('token').then(val => {
        body.append('token', val);
        body.append('movie', this.form.movie);
        body.append('year', this.form.year);
        body.append('month', this.form.month);
        body.append('date', this.form.date);

        body.append('student_price', this.price.student.toString());
        body.append('kid_price', this.price.kid.toString());
        body.append('adult_price', this.price.adult.toString());

        body.append('time', JSON.stringify(this.times));

        body.append('theater', this.theater)

        this.service.new_cinemas(body).subscribe(res => {
          console.log(res)
          if (res.toString() == "ok") {
            this.addcinemas = false;
            this.cleanform();
            this.get_cinemas();
          }
        })
        //body.append()

      })
    }
  }
  cleanform() {
    this.form.movie = "";
    this.form.year = "";
    this.form.month = "";
    this.form.date = "";
    this.date = ""
    this.price.student = 0
    this.price.kid = 0
    this.price.adult = 0
    this.caution = ""
    this.theater = ""
    this.time = ""
    this.times.splice(0, this.times.length)

  }
  add_cancel() {
    this.cleanform()
    this.addcinemas = false;
  }
  get_movie() {
    let body = new FormData;
    this.service.get_movie(body).subscribe(res => {
      console.log(res);
      this.cinemas = res;
    })
  }
  get_cinemas() {
    let body = new FormData;
    this.storage.get('token').then(val => {
      body.append('token', val)
      this.service.get_cinemas(body).subscribe(res => {
        console.log(res);
        this.cinemas_data = res;
      })
    })

  }
  test() {
    console.log(this.form.movie)
  }
  async select() {
    console.log(this.time)
    console.log(this.time[11] + this.time[12])
    let t = this.time[11] + this.time[12] + this.time[14] + this.time[15]
    let exist: boolean = false;
    for (let x = 0; x < this.times.length; x++) {
      if (this.times[x] == t) {
        exist = true
        const toast = await this.toastController.create({
          message: '時間已存在',
          duration: 2000
        });
        toast.present();
      }
    }
    if (!exist) {
      this.times.push(t)
    }
  }
  add_time() {
    this.select_time = true;
  }
  delete_time(t) {
    for (let x = 0; x < this.times.length; x++) {
      if (this.times[x] == t) {
        this.times.splice(x, 1);
      }
    }
  }

  pick_date() {
    console.log(this.date);
    this.form.year = this.date[0] + this.date[1] + this.date[2] + this.date[3]
    this.form.month = this.date[5] + this.date[6]
    this.form.date = this.date[8] + this.date[9]
    console.log(this.form)


  }
  checklogin() {
    this.storage.get('token').then(val => {
      let body = new FormData;
      console.log(val)
      body.append('token', val)
      this.service.checklogin(body).subscribe(res => {
        console.log(res['login'])
        if (res['login'] == 'ok') {
          this.logined = true;
        }
      })
    })
  }
}
