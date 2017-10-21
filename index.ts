import { AlertController, LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

declare const APP_WS: string;
declare const APP_WS_CODE: Array<Array<string>>;
declare const DEBUG: boolean;

/**
 * Pombo Restful Provider
 *
 * HTTP Service Provider for Ionic
 */
@Injectable()
export class RestfulProvider {

  /**
   * Request Method HTTP
   *
   * ``` js
   * restful = Restful();
   *
   * ```
   *
   * @param  {Http}              http        provider http
   * @param  {LoadingController} loadingCtrl controller loading
   * @param  {AlertController}   alertCtrl   controller alert
   */
  constructor(
    private http: Http,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) { }

  /**
   * Request Method HTTP
   *
   * ``` js
   * restful.request('get', '/api/v1.0/post', (data) => {alert('success')}, (data) => {alert('error')});
   *
   * ```
   *
   * @param  {string}    method  http method
   * @param  {string}    url     server url
   * @param  {Object}    data    request data
   * @param  {any}       success success function
   * @param  {any}       error   error function
   * @return {void}
   */
  request(method: string, url: string, data: Object = {}, success: any = false, error: any = false): void {
    let loader = this.loadingCtrl.create({});

    loader.present();
    this.http[method](APP_WS + url, JSON.stringify(data), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    }).map(response => response.json()).subscribe(data => {
      if (DEBUG) console.info(data)
      if (success) success(data);
      loader.dismiss();
    },
      err => {
        if (DEBUG) console.error(err)
        if (error) error(err);
        else this.errorMessage(err);
        loader.dismiss();
      });
  }

  /**

   */

  /**
   * Default Message Error
   *
   * ``` js
   * restful.request('get', '/api/v1.0/post', (data) => {alert('success')}, (err) => {restful.errorMessage(err)});
   *
   * ```
   *
   * @param {any} err http error return
   * @return {void}
   */
  errorMessage(err: any): void {
    if (err.type == 2 || err.type == 3) {
      if (APP_WS_CODE[err.status] !== undefined) {
        this.alert(APP_WS_CODE[err.status][0], APP_WS_CODE[err.status][1]);
      } else {
        this.alert('Ops!', err.statusText)
      }
    }
  }

  /**
   * Alert
   *
   * ``` js
   * restful.request('get', '/api/v1.0/post', (data) => {restful.alert('Success', 'Ehhh')});
   *
   * ```
   *
   * @param  {string} title    alert title
   * @param  {string} subTitle alert subtitle
   * @param  {any}    func     success function
   * @param  {any}    data     success return data
   * @return {void}
   */
  alert(title: string, subTitle: string, func: any = false, data?:any): void {
    this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      enableBackdropDismiss: false,
      buttons: [{
        text: 'OK',
        role: 'ok',
        handler: () => {
          if (func) func(data)
        }
      }
      ]
    }).present();
  }
}
