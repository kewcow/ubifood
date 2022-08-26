import {serve} from './deps.ts';
import {home} from './router.ts';

const headers: any = (arch: string): object => {
  let type: {headers: any} = {
    headers:<object> {
      'Content-Type':<string> 'text/html',
      'Access-Control-Allow-Origin':<string> '*',
      'Access-Control-Allow-Headers':<string> '*',
    }
  }

  if (arch === 'css') type.headers['Content-Type']= 'text/css';
  if (arch === 'js') type.headers['Content-Type']= 'application/javascript';
  return type;
};

const handler = async (req: Request): Promise<Response> => {
  const pathname = new URL(req.url).pathname;
  const pattern: URLPattern = new URLPattern({pathname: '/food/:id', });
  const patternAdmin: URLPattern = new URLPattern({pathname: '/user/:id', });
  if (pathname === '/') return home();
  if (pathname === '/login') return home();
  if (pattern.test(req.url)) return home();
  if (patternAdmin.test(req.url)) return home();

  const css = await Deno.readFile(`${Deno.cwd()}/dist${pathname}`);
  if (pathname.split('.').at(-1) === 'css') return new Response(css, headers('css'));

  const js = await Deno.readFile(`${Deno.cwd()}/dist${pathname}`);
  return new Response(js, headers('js'));
}

const env = Deno.env.get('PORT');
const port = env ? Number(env) : 3500;

serve(handler, {port});
