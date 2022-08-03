const { Handler } = require('./Handler');

const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('koa2-cors');

const app = new Koa();
const handler = new Handler();
const Router = require('koa-router');

const router = new Router();
const port = process.env.PORT || 7040;
const server = http.createServer(app.callback());

app.use(koaBody({
  urlencoded: true,
  multipart: true,
  json: true,
}));

app.use(cors({
  origin: '*',
  exposeHeaders: ['application/json', 'image/png'],
  maxAge: 15000,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
}));

app.use(async (ctx, next) => {
  const origin = ctx.request.get('Origin');
  if (!origin) {
    return await next();
  }
  const headers = { 'Access-Control-Allow-Origin': '*' };

  if (ctx.request.method !== 'OPTIONS') {
    ctx.response.set({ ...headers });
    try {
      return await next();
    } catch (e) {
      e.headers = { ...e.headers, ...headers };
      throw e;
    }
  }

  if (ctx.request.get('Access-Control-Request-Method')) {
    ctx.response.set({
      ...headers,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
    });

    if (ctx.request.get('Access-Control-Request-Headers')) {
      ctx.response.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    }

    ctx.response.status = 204;
  }
});

router.get('/bascket', async (ctx, next) => {
  ctx.response.body = handler.content;
});

router.get('/image', async (ctx, next) => {
  ctx.response.type = 'image/jpg';
  ctx.response.body = handler.image;
});

app.use(router.routes());
app.use(router.allowedMethods());

server.listen(port);
