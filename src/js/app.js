import Puller from './Puller';

if (navigator.serviceWorker) {
  window.addEventListener('load', async () => {
    try {
      if (navigator.serviceWorker) {
        await navigator.serviceWorker.register(
          'service.worker.js',
          {
            scope: './',
          },
        );
        console.log('sw registered');
      }
    } catch (e) {
      console.log(e);
    }
  });
}

const puller = new Puller();
puller.pullPageContent();
