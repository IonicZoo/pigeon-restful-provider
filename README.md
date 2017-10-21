[![npm](https://img.shields.io/npm/v/@ioniczoo/pigeon-restful-provider.svg)](https://www.npmjs.com/package/@ioniczoo/pigeon-restful-provider)
[![npm](https://img.shields.io/npm/dt/@ioniczoo/pigeon-restful-provider.svg)](https://www.npmjs.com/package/@ioniczoo/pigeon-restful-provider)
[![npm](https://img.shields.io/npm/l/@ioniczoo/pigeon-restful-provider.svg?style=flat-square)](https://www.npmjs.com/package/@ioniczoo/pigeon-restful-provider)

<img src="https://gitlab.com/IonicZoo/pigeon-restful-provider/raw/master/img.png" width="20%" height="auto" alt="pigeon" title="pigeon">

# Pigeon Restful Provider

HTTP Service Provider for Ionic


## Install

```bash
npm install @ioniczoo/pigeon-restful-provider --save
```

## Import to `app.module.ts`

```ts
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { RestfulProvider } from '@ioniczoo/pigeon-restful-provider';

import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    RestfulProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
```

## Example

```ts
import { RestfulProvider } from '@ioniczoo/pigeon-restful-provider';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(private restful: RestfulProvider) {
    this.restful.request('get', '/api').subscribe(data => {
      console.log(data);
    }, err => {
        console.log(err);
    })
  }
}


```

## Author

[André Argôlo](https://argolo.gitlab.io)

## Contribute

[Create issues and request pull-request.](https://gitlab.com/IonicZoo/pigeon-restful-provider/blob/master/CONTRIBUTING.md)

## License

[GNU General Public License v3.0](https://gitlab.com/IonicZoo/pigeon-restful-provider/blob/master/LICENSE)
