import http from "node:http";

const listenPort = Number(process.env.VENUE_MONOSASHI_PREVIEW_PORT ?? 4178);
const targetPort = Number(process.env.VENUE_MONOSASHI_TARGET_PORT ?? 4179);

const server = http.createServer((request, response) => {
  const upstream = http.request(
    {
      hostname: "::1",
      port: targetPort,
      method: request.method,
      path: request.url,
      headers: {
        ...request.headers,
        host: `localhost:${targetPort}`,
      },
    },
    (upstreamResponse) => {
      response.writeHead(
        upstreamResponse.statusCode ?? 502,
        upstreamResponse.headers,
      );
      upstreamResponse.pipe(response);
    },
  );

  upstream.on("error", (error) => {
    response.writeHead(502, { "content-type": "text/plain; charset=utf-8" });
    response.end(`Local preview upstream error: ${error.message}\n`);
  });

  request.pipe(upstream);
});

server.listen(listenPort, "127.0.0.1", () => {
  console.log(`Venue Monosashi preview: http://127.0.0.1:${listenPort}/`);
});
