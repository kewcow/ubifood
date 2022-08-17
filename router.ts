const home = async (): Promise<Response> => {
  const file = await Deno.readFile(`./dist/index.html`);
  return new Response(file)
}

export {
  home
}
