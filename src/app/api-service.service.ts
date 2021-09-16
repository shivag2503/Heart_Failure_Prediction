import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpinnerService } from './spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class APIServiceService {


  URL = "https://beta.rstudioconnect.com/content/bad31afc-9ec4-45fe-9579-9c7690d8470a/predictions";

  constructor(private httpClient: HttpClient, private spinner: SpinnerService) { }

  public getPrediction(age: String, cp: String, ef: String, p: String, sc: String, ss: String, t: String, s: String, g: String, d: String,
    hbp: String, a: String) {
    return this.httpClient.get(this.URL+'?age='+age+'&cp='+cp+'&ef='+ef+'&p='+p+'&sc='+sc+'&ss='+ss+'&t='+t+'&s='+s+'&g='+g+'&d='+d+'&hbp='+hbp+'&a='+a);
  }
}
