const headers: any = (arch: string): object => {
  let type: {headers: any} = {
    headers:<object> {
      'Content-Type':<string> 'text/html',
      'Access-Control-Allow-Origin':<string> '*',
      'Access-Control-Allow-Headers':<string> '*',
    }
  }

  if (arch === 'json') type.headers['Content-Type']= 'application/json';
  if (arch === 'html') type.headers['Content-Type']= 'text/html';

  return type;
};

const home = async (): Promise<Response> => {
  const file = await Deno.readFile(`./dist/index.html`);
  return new Response(file, headers())
}

export {
  home
}
