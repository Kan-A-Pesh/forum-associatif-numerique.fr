const http = require("http");
const https = require("https");

const server = http.createServer((req, res) => {
    try {
        const uri = new URL(req.url, "http://localhost");
        let urlParam = uri.searchParams.get("url");
        if (!urlParam) {
            throw "URL parameter is required";
        }

        if (urlParam.startsWith("/_next/static")) {
            urlParam = "https://forum-associatif-numerique.fr" + urlParam;
        }

        console.log(urlParam);

        // Fetch image from URL and send it to the client
        https.get(urlParam, (response) => {
            res.writeHead(response.statusCode, response.headers);
            response.pipe(res);

            response.on("end", () => {
                res.end();
            });
        });
    } catch (e) {
        res.write("Error: " + e);
        res.end();
    }
});

server.listen(54320, () => {
    console.log("Server is running...");
});
