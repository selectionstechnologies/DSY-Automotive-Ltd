import { Writable } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';

export { staticRoutes } from './routes';
export { SITE_URL } from './data/site';

// Renders one URL to HTML, waiting for lazy pages to load
export function render(url) {
  return new Promise((resolve, reject) => {
    const helmetContext = {};
    let html = '';
    const sink = new Writable({
      write(chunk, _enc, cb) {
        html += chunk.toString();
        cb();
      },
      final(cb) {
        const { helmet } = helmetContext;
        const head = ['title', 'meta', 'link', 'script'].map((k) => helmet[k].toString()).join('\n    ');
        resolve({ html, head });
        cb();
      },
    });

    const { pipe } = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>,
      {
        onAllReady() {
          pipe(sink);
        },
        onShellError: reject,
        onError(err) {
          console.error(`Render error on ${url}:`, err);
        },
      }
    );
  });
}
