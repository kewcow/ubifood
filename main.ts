import {serve} from './deps.ts';
import {home} from './router.ts';

const handler = async (req: Request): Promise<Response> => {
  const pathname = new URL(req.url).pathname;
  if (pathname === '/') return home();
  const file = await Deno.readFile(`${Deno.cwd()}/dist${pathname}`);
  return new Response(file);
}

const env = Deno.env.get('PORT');
const port = env ? Number(env) : 3500;

serve(handler, {port});
