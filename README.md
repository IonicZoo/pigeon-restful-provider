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
      pigeon_debug: true,
      pigeon_loader: true,
      pigeon_alert: true,
      pigeon_host: 'https://randomuser.me',
      pigeon_status: {404: ['Ops', '404 - Not found']}
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
