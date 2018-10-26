import { Injectable } from '@angular/core';

import { Config } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

/**
 * Pigeon Restful Provider
 *
 * HTTP Service Provider for Ionic
 */
@Injectable()
export class RestfulProvider {

  /**
   * Request Method HTTP
   *
   * ``` js
   *
   * console.log('Run');
   *
   * restful: Restful = Restful();
   * restful.request('get', '/api/1.0/user')
   *   .then((data) => { console.log(data); })
   *   .catch((data) => { console.log(data); });
   *
   * console.log('Or');
   *
   * let data: Promise = restful.request('get', '/api/1.0/user');
   * ```
   *
   * @param  {HttpClient}              http        provider http
   * @param  {Config}            config      provider http
   * @param  {AlertController}   alertCtrl   controller alert
   * @param  {LoadingController} loadingCtrl controller loading
   */
  constructor(
    private http: HttpClient,
    private config: Config,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) { }


  /**
   * Request Method HTTP
   *
   * ``` js
   * restful.request('get', '/api/1.0/user')
   *   .then((data) => { console.log(data); })
   *   .catch((data) => { console.log(data); });
   * ```
   *
   * @param  {string}      method  http    method
   * @param  {string}      url     server  url
   * @param  {any}         body    request body
   * @param  {HttpParams}  params  request params
   * @param  {HttpHeaders} headers request headers
   * @return {Promise}
   */
  public request(
    method: string,
    url: string,
    body?: any,
    params: HttpParams = new HttpParams({}),
    headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })) {

    return new Promise((success, error) => {
      const debug: string = this.config.get('pigeon_debug') || false;
      const host: string = this.config.get('pigeon_host') || '';
      let loader: any = this.loadingCtrl.create({});

      if (this.config.get('pigeon_loader')) loader.present();

      this.http.request(method, host + url, {
        body: JSON.stringify(body),
        headers: headers,
        params: params
      }).subscribe((data: any) => {
        loader.dismiss();
        if (debug) console.info(data);
        success(data);
      }, (data: any) => {
        loader.dismiss();
        if (debug) console.error(data);
        if (this.config.get('pigeon_alert')) this.errorMessage(data);
        error(data);
      });
    });

  }


  /**
   * Alert
   *
   * ``` js
   * restful.request('get', '/api/1.0/user')
   *   .then((data) => { console.log(data); })
   *   .catch((data) => { console.log(data); });
   * ```
   *
   * @param  {string} title    alert title
   * @param  {string} subTitle alert subtitle
   * @return {void}
   */
  private alert(
    title: string,
    subTitle: string): void {
    this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      enableBackdropDismiss: false,
      buttons: [{
        text: 'OK',
        role: 'ok'
      }]
    }).present();
  }


  /**
   * Default Message Error
   *
   * ``` js
   * restful.request('get', '/api/1.0/user')
   *   .then((data) => { console.log(data); })
   *   .catch((data) => { console.log(data); });
   * ```
   *
   * @param {any}   error http error return
   * @return {void}
   */
  private errorMessage(
    error: any): void {
    const status_http: string = this.config.get('pigeon_status');

    if (status_http && status_http[error.status] !== undefined) {
      this.alert(status_http[error.status][0], status_http[error.status][1]);
    } else {
      this.alert(error.status, error.error);
    }
  }
}
