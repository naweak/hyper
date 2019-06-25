const ejs = require('ejs')
const fs = require('fs')
const meta = require('./methods')

ejs.renderFile("index.ejs", {meta}, null, (err, str) => {
  if (err) {
    console.log(err)
    process.exit()
  }
  fs.writeFile('index.html', str, (err) => {
    if (err) throw err;
    console.log('index.html has been saved!');
  })
})
