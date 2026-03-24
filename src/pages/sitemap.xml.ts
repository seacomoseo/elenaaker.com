export async function GET() {
  const content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://elenaaker.com</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://elenaaker.com"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://elenaaker.com/en"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://elenaaker.com"/>
  </url>
  <url>
    <loc>https://elenaaker.com/en</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://elenaaker.com"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://elenaaker.com/en"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://elenaaker.com"/>
  </url>
</urlset>`;
  
  return new Response(content, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
}
