const http = require("http");
const server = http.createServer();
const fs = require("fs");
const path = require("path");

//serverを作る、その中で色々操作する
server.on("request", (req, res) => {
  //console.log(req);
  //Home的な
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><h1>Hello Node!</h1></head>");
    res.write(`<body>`);
    res.write(`<div><a href="/read-message">read-message</a></div>`);
    res.write(`<div><a href="/write-message">write-message</a></div>`);
    res.write(`</body>`);

    res.write("</html>");
    res.end();
  }

  //__dirnameで直接そのファイルにいく
  const filePath = path.join(__dirname, "message.txt");

  if (req.url === "/read-message" && req.method === "GET") {
    fs.readFile(filePath, (err, content) => {
      if (err) {
        //Error
        console.log("エラーだよおおお！");
        res.end();
      } else {
        //Success
        //responseオブジェクトのメソッドで、ヘッダー情報をレスポンスに書き出すものです。
        //第１引数にはステータスコードを指定し、第２引数にヘッダー情報を連想配列でまとめたものを指定します。
        //なので、"text/plain"とすると
        //これはレスポンスとして返送するコンテンツの種類を示すヘッダー情報で、
        //これにより「このコンテンツは標準テキストである」ということがクライアントに伝えられます。
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(content, "utf8");
      }
    });
  }

  if (req.url === "/write-message" && req.method === "GET") {
    res.write(`
    <html>
        <head>
            <title>Send a message</title>
        </head>
        <body>
            <form action="/write-message" method="POST">
                <input type="text" name="message" placeholder="Enter your message">
                <button type="submit">Submit</button>
            </form>
        </body>
    </html>
`);
    res.end();
  }

  //write-messageがPOSTメソッドの時
  if (req.url === "/write-message" && req.method === "POST") {
    const body = [];

    //dataイベント
    //クライアントからデータを受け取ると発生するイベント
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    //entイベント
    //データの受け取りが完了すると発生するイベント(全てデータを受け取った後なので引数は指定しない)
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      // console.log(parsedBody);
      const message = parsedBody.split("=")[1];

      //   fs.writeFile("message.ext", message, (err) => {
      fs.writeFile("message.txt", message, (err) => {
        if (err) throw err;
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
});

//serverを聞く
server.on("listening", () => {
  console.log("Listening on port 8000");
});

//8000のポートを開くよ
server.listen(8000);
