import { isUrlAllowed } from '@superside-oss/partytown-gtm/util';

const PASS_THROUGH_HEADERS = [
  'content-type',
  'cache-control',
  'pragma',
  'expires',
  'date',
  'x-gtm-versionid',
  'content-security-policy',
  'x-xss-protection',
  'x-frame-options',
  'x-content-type-options'
];

function parseUrl(url: any): URL | null {
  try {
    return new URL(url);
  } catch (err) {}

  return null;
}

async function getResponse(maybeUrl: string | null) {
  if (!maybeUrl) {
    throw new Error('URL is not set');
  }

  const url = parseUrl(decodeURIComponent(maybeUrl));

  if (!(url && isUrlAllowed(url))) {
    throw new Error('URL is not on the whitelist');
  }

  const response = await fetch(url);

  if (response.status >= 400) {
    throw new Error('Invalid response status code');
  }

  const data = await response.text();
  const headers: { [key: string]: string } = {};

  PASS_THROUGH_HEADERS.forEach((headerName) => {
    const headerValue = response.headers.get(headerName);

    if (headerValue) {
      headers[headerName] = headerValue;
    }
  });

  return new Response(data, {
    status: response.status,
    headers
  })
}

export async function GET(req: Request) {
  const originalUrl = new URL(req.url);
  const forwardUrl = originalUrl.searchParams.get('forward');

  try {
    const response = await getResponse(forwardUrl);

    return response;
  } catch (err) {
    return new Response('Not found', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
}
