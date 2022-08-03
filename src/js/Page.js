import { from } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import API from './API';

export default class Page {
  static pageBody() {
    const body = document.querySelector('body');

    const page = document.createElement('div');
    page.className = 'page';
    body.append(page);

    const pageHeader = document.createElement('header');
    pageHeader.className = 'page-header';
    page.append(pageHeader);

    const pageContent = document.createElement('div');
    pageContent.className = 'page-content';
    page.append(pageContent);

    const pageContentMain = document.createElement('main');
    pageContentMain.className = 'page-content-main';
    pageContent.append(pageContentMain);

    const pageContentAside = document.createElement('aside');
    pageContentAside.className = 'page-content-aside';
    pageContent.append(pageContentAside);

    const pageFooter = document.createElement('footer');
    pageFooter.className = 'page-footer';
    page.append(pageFooter);
  }

  static fillHeader(item) {
    const pageHeader = document.querySelector('.page-header');

    const header = document.createElement('h1');
    header.className = 'widget-page-h1';
    header.textContent = item;
    pageHeader.append(header);
  }

  static fillMain(item) {
    const pageContentMain = document.querySelector('.page-content-main');

    const mainTopic = document.createElement('div');
    mainTopic.className = 'main-topic';
    pageContentMain.append(mainTopic);

    ajax({
      url: 'http://localhost:7040/image',
      method: 'GET',
      responseType: 'blob',
      headers: {
        'Content-Type': 'image/jpg',
      },
    })
      .subscribe({
        next: (data) => {
          const mainTopicImg = document.createElement('img');
          mainTopicImg.src = URL.createObjectURL(data.response);
          mainTopicImg.className = 'main-topic-img';
          mainTopic.prepend(mainTopicImg);
        },
        error: (err) => console.log(err),
      });

    const mainTopicContentWrapper = document.createElement('div');
    mainTopicContentWrapper.className = 'main-topic-content-wrapper';
    mainTopic.append(mainTopicContentWrapper);

    const mainTopicContentHeader = document.createElement('header');
    mainTopicContentHeader.className = 'main-topic-content-header';
    mainTopicContentHeader.textContent = item.header;
    mainTopicContentWrapper.append(mainTopicContentHeader);

    const mainTopicContentDate = document.createElement('p');
    mainTopicContentDate.className = 'main-topic-content-date';
    mainTopicContentDate.textContent = item.date;
    mainTopicContentWrapper.append(mainTopicContentDate);

    const mainTopicContentPreview = document.createElement('p');
    mainTopicContentPreview.className = 'main-topic-content-preview';
    mainTopicContentPreview.textContent = item.content;
    mainTopicContentWrapper.append(mainTopicContentPreview);
  }

  static fillAside(item) {
    const pageContentAside = document.querySelector('.page-content-aside');

    const asideTopic = document.createElement('div');
    asideTopic.className = 'aside-topic';
    pageContentAside.append(asideTopic);

    const asideTopicImg = document.createElement('img');
    asideTopicImg.className = 'aside-topic-img';

    const apiPromise = API.getImage();
    from(apiPromise).subscribe({
      next: (result) => {
        asideTopicImg.setAttribute('src', URL.createObjectURL(result.response));
        asideTopic.prepend(asideTopicImg);
      },
      error: (err) => console.log(err),
    });

    const asideTopicContentWrapper = document.createElement('div');
    asideTopicContentWrapper.className = 'aside-topic-content-wrapper';
    asideTopic.append(asideTopicContentWrapper);

    const asideTopicContentHeader = document.createElement('header');
    asideTopicContentHeader.className = 'aside-topic-content-header';
    asideTopicContentHeader.textContent = item.header;
    asideTopicContentWrapper.append(asideTopicContentHeader);

    const asideTopicContentDate = document.createElement('p');
    asideTopicContentDate.className = 'aside-topic-content-date';
    asideTopicContentDate.textContent = item.date;
    asideTopicContentWrapper.append(asideTopicContentDate);

    const asideTopicContentPreview = document.createElement('p');
    asideTopicContentPreview.className = 'aside-topic-content-preview';
    asideTopicContentPreview.textContent = item.content;
    asideTopicContentWrapper.append(asideTopicContentPreview);
  }

  static fillFooter(item) {
    const PageFooter = document.querySelector('.page-footer');

    const footerContent = document.createElement('p');
    footerContent.className = 'page-footer-content';
    footerContent.textContent = item;
    PageFooter.append(footerContent);
  }
}
