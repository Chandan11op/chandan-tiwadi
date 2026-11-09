/**
 * Cloudflare Pages Edge Middleware
 * 
 * Intercepts requests at Cloudflare Edge to enforce:
 * 1. Canonical non-www domain with HTTP 301 Permanent Redirect
 * 2. Permanent 301 redirect for /index.html -> /
 * 3. HTTP Strict-Transport-Security (HSTS) headers
 * 4. HTTP Link rel="canonical" headers
 */
export async function onRequest(context) {
  const url = new URL(context.request.url);

  // 1. Enforce canonical non-www hostname
  if (url.hostname.startsWith('www.')) {
    const canonicalHost = url.hostname.replace(/^www\./, '');
    const targetUrl = `https://${canonicalHost}${url.pathname}${url.search}`;
    return Response.redirect(targetUrl, 301);
  }

  // 2. Canonicalize /index.html to /
  if (url.pathname === '/index.html') {
    const targetUrl = `${url.origin}/${url.search}`;
    return Response.redirect(targetUrl, 301);
  }

  // 3. Process the request
  const response = await context.next();

  // 4. Inject canonical Link and security headers on HTML responses
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('text/html')) {
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Link', '<https://chandan-tiwadi.pages.dev/>; rel="canonical"');
    newHeaders.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    newHeaders.set('X-Content-Type-Options', 'nosniff');
    newHeaders.set('X-Frame-Options', 'SAMEORIGIN');
    newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  }

  return response;
}
