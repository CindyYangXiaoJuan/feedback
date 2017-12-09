const express = require('express');
const comment = require('./common.js');
const bodyParser = require('body-parser');
const app = express();
//配置使用body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//开放静态资源
app.use('/node_modules/', express.static('./node_modules/'));
//加载模板引擎
app.engine('html', require('express-art-template'));

app.get('/', (req, res) => {
  comment.findAll( (err, comments) => {
    if (err) return console.log("读取失败");
    // console.log(comments);
    res.render("index.html", {
      // Ecmascript 6 键,值 相同 允许只写一个
      comments
    });
  });
});
app.get('/post', (req, res) => {
  res.render("post.html");
});
app.post('/post', (req, res) => {
  const body = req.body;
  if (!body.name || !body.name.length || !body.content || !body.content.length) {
    return res.send("name invalid");
  }
  comment.save(body, err => {
    if (err) res.send('500 Esrver Error');
    //重定向
    res.redirect('/');
  })
});
app.listen(3000, () => console.log('express running...'));