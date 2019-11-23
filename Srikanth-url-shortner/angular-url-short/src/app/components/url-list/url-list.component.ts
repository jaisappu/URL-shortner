import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-url-list',
  templateUrl: './url-list.component.html',
  styleUrls: ['./url-list.component.css']
})
export class UrlListComponent implements OnInit {
  urls: any[] = [];
  constructor(private httpSrv: HttpService) { }

  ngOnInit() {
    this.loadUrls();
  }

  async loadUrls() {
    console.log('Calling');

    try {
      this.urls = await this.httpSrv.getAll().then((res: any) => res.data);
      console.log(this.urls);

    } catch (err) {
      console.error(err);
    }
  }



  openLink(url) {
    // this.copyToClipboard();
    window.open(url.longUrl, '_blank');
  }
}
