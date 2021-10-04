export interface Params {
  [key: string]: string;
}

export async function getRequest<T>(
  urlString: string,
  params: Params = {}
): Promise<T> {
  const url = new URL(urlString);

  for (const param of Object.entries(params)) {
    url.searchParams.append(...param);
  }

  const res = await fetch(url.href);
  if (res.ok) {
    return await res.json();
  }

  throw Error(res.statusText);
}
