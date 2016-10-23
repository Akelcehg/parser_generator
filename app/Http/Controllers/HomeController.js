'use strict'

const Page = use('App/Model/Page');
const fs = require('fs');

class HomeController {

  * index(request, response) {

    let webPage = new Page('https://auto.ria.com/auto_opel_insignia_15211193.html')

    const con = yield webPage.getPageContent()

    yield this.save(con)

    yield response.sendView('home/index')
  }

  *save(c) {
    fs.writeFile("test.txt", c, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  }

}

module.exports = HomeController;
