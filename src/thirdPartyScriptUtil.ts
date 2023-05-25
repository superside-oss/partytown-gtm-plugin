/**
 * IMPORTANT:
 * `isUrlAllowed` and `resolveThirdParties` should be "self-contained". They shouldn't reference code outside
 * the function bodies. The reason for this is that we call `.toString()` on those functions later on when
 * creating `partytownResolveUrl`.
 */
type PartytownUrlResolver = (url: URL, location: Location) => URL | undefined | null;

export function isUrlAllowed(url: URL) {
  const WHITELISTED_DOMAINS = [
    'www.google-analytics.com',
    'www.googleadservices.com'
  ];

  const WHITELISTED_DOMAINS_CHECK_FN = [
    (url: URL) => url.host === 'www.googletagmanager.com' && url.pathname.startsWith('/debug'),
  ];

  return (
    WHITELISTED_DOMAINS.some((domain) => url.host.endsWith(domain)) ||
    WHITELISTED_DOMAINS_CHECK_FN.some((fn) => fn(url))
  );
}

export function resolveThirdParties(url: URL) {
  if (isUrlAllowed(url)) {
    const proxyUrl = new URL(`${location.origin}/api/third-party`);

    proxyUrl.searchParams.append('forward', url.href);

    return proxyUrl;
  }

  return url;
}

// eslint-disable-next-line no-new-func
export const partytownResolveUrl = new Function(
  'url',
  'location',
  `${isUrlAllowed.toString()};var resolve = ${resolveThirdParties.toString()};return resolve(url)`
) as PartytownUrlResolver;
