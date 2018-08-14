const http = require("http");
const url = require("url");
const query = require("querystring");
let pageList = require("./mypage.js").page;
//当前请求第几页
let currentPage = 0;
// 每页的包含的个数
let pageSize = 3;
//服务监听端口号
const port = 8888;
http.createServer((req, res) => {
    let options = query.parse(url.parse(req.url).query);
    console.log(options);
    let responseList = getResData(options.page, options.size);
    res.setHeader("Content-Type", "text/json");
    res.end(`${options.cb}(${JSON.stringify(responseList)})`);
}).listen(port, () => {
    console.log(`端口${port}的服务器已启动`)
})

let getResData = (page = currentPage, size = pageSize) => {
    let List = [];
    for (let i = 0; i < size; i++) {
        console.log(pageList[page * size + i + 1]);
        List[i] = JSON.parse(JSON.stringify(pageList[page * size + i]));
    }
    console.log(List);
    return List;
}