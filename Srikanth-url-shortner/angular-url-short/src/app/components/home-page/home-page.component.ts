import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  url: any;
  longUrl: string;
  urlCode: string;
  isRequired: boolean;
  isUrlCodeValid: boolean;
  regex = /[/_]/g;
  msg = '';

  // baseUrl: string = environment.hostV1;
  constructor(private httpSrv: HttpService) { }

  ngOnInit() {
  }

  async onSubmit() {
    this.msg = null;
    if (!this.longUrl) {
      return this.isRequired = true;
    }
    this.isRequired = false;
    this.isUrlCodeValid = false;


    if (this.urlCode) {
      const found = this.urlCode.match(this.regex).join();
      if (found) {
        this.msg = 'Invalid url code';
        return this.isUrlCodeValid = true;
      }
    }


    try {

      if (this.urlCode) {
        const obj = await this.httpSrv.get(this.urlCode).then((res: any) => res.data);
        if (obj) {
          this.msg = 'This Url code already used';
          return this.isUrlCodeValid = true;
        } else {
          this.saveUrl();
          this.isUrlCodeValid = false;
        }
      } else {
        this.saveUrl();
      }
    } catch (err) {
      console.error(err);
    }
  }

  openLink() {
    // this.copyToClipboard();
    window.open(this.url.longUrl, '_blank');
  }

  async saveUrl() {
    const data = { longUrl: this.longUrl, urlCode: this.urlCode };
    const result: any = await this.httpSrv.create(data).then((res: any) => res.data);
    if (result) {
      this.url = result;
      this.longUrl = null;
      this.urlCode = null;
    }
  }


  copyToClipboard() {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (this.url.shortUrl));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }
}
