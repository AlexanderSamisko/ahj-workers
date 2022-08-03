import { from } from 'rxjs';
import API from './API';
import Page from './Page';

export default class Puller {
  constructor() {
    this.api = new API('http://localhost:7040');
  }

  pullPageContent() {
    const apiPromise = this.api.check();
    from(apiPromise).subscribe({

      next: (result) => {
        const page = document.querySelector('.page');
        if (page) {
          page.remove();
        }
        Page.pageBody();
        Page.fillHeader(result.response.header);
        Page.fillMain(result.response.main);
        Page.fillAside(result.response.aside);
        Page.fillFooter(result.response.footer);
      },
      error: (err) => {
        console.log('Что-то со связью');
      },
    });
  }
}
