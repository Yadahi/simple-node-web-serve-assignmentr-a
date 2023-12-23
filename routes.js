const url = require("url");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  console.log(url, method);

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Enter username</title><head>");
    res.write(
      '<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString("utf-8");
      const message = parsedBody.split("=")[1];
      console.log(message);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }
  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<ul><li>User 1</li></ul>");
    res.write("</html>");
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<h1>Page not found</h1>");
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;
