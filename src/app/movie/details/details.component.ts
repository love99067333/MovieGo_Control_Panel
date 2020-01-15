import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProviderService } from 'src/app/service/provider.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  constructor(private route : ActivatedRoute,private service : ProviderService) { }
  number: any;
  ngOnInit() {
    this.number = this.route.snapshot.paramMap.get('id');
  }
  get(){
    let body = new FormData
    
  }

}
