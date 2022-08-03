import { ajax } from 'rxjs/ajax';

export default class API {
  constructor(url) {
    this.url = url;
    this.contentTypeHeader = { 'Content-Type': 'application/json' };
  }

  check() {
    return ajax({
      url: `${this.url}/bascket`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },

    });
  }

  static getImage() {
    return ajax({
      url: 'http://localhost:7040/image',
      method: 'GET',
      responseType: 'blob',
      headers: {
        'Content-Type': 'image/jpg',
      },
    });
  }
}
