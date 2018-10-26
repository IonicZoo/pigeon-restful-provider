[![npm](https://img.shields.io/npm/v/@ioniczoo/pigeon-restful-provider.svg)](https://www.npmjs.com/package/@ioniczoo/pigeon-restful-provider)
[![npm](https://img.shields.io/npm/dt/@ioniczoo/pigeon-restful-provider.svg)](https://www.npmjs.com/package/@ioniczoo/pigeon-restful-provider)
[![npm](https://img.shields.io/npm/l/@ioniczoo/pigeon-restful-provider.svg?style=flat-square)](https://www.npmjs.com/package/@ioniczoo/pigeon-restful-provider)

<img src="https://gitlab.com/IonicZoo/pigeon-restful-provider/raw/master/img.png" width="20%" height="auto" alt="pigeon" title="pigeon">

# Pigeon Restful Provider

HTTP Service Provider for Ionic: Our skillful mail pigeon will help you carry out REST requests. Our Pigeon is a RESTful Provider.


## Install

```bash
npm install @ioniczoo/pigeon-restful-provider --save
```

## Import `HttpClientModule` and  'RestfulProvider' to  `app.module.ts`

```ts
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpClientModule } from '@angular/common/http';
import { RestfulProvider } from '@ioniczoo/pigeon-restful-provider';

import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      pigeon_debug: true, // Enable Debug
      pigeon_loader: true, // Enable Loading
      pigeon_alert: true, // Enable Error Alert
      pigeon_host: 'https://randomuser.me', // Add Host
      pigeon_status: { // Add Custom Message
        404: ['Ops', '404 - Not found']
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    RestfulProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
```

## Example

```ts
...
import { RestfulProvider } from '@ioniczoo/pigeon-restful-provider';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(private restful: RestfulProvider) {

    /**
    * @param  {string}      method  http    method
    * @param  {string}      url     server  url
    * @param  {any}         body    request body
    * @param  {HttpParams}  params  request params
    * @param  {HttpHeaders} headers request headers
    */
    this.restful.request('get', '/api/?results=10')
      .then((data) => { console.log(data); })
      .catch((data) => { console.log(data); });
  }
}


```

## Author

[André Argôlo](https://argolo.gitlab.io)

## Contribute

[Create issues and request pull-request.](https://gitlab.com/IonicZoo/pigeon-restful-provider/blob/master/CONTRIBUTING.md)

## License

[GNU General Public License v3.0](https://gitlab.com/IonicZoo/pigeon-restful-provider/blob/master/LICENSE)
