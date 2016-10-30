'use strict'

const phantom = require('phantom')

class Page {

  constructor(page_url) {
    this.page_url = page_url;
    this.page_content = null;
  }

  getUrl() {
    return this.page_url
  }

  getContent() {
    return this.page_content
  }

  * getPageContent() {

    let sitepage;
    let phInstance;
    let that = this;

    return phantom.create()
      .then(instance => {
        phInstance = instance;
        return instance.createPage();
      })
      .then(page => {
        sitepage = page;
        return page.open(this.page_url);
      })
      .then(status => {
        console.log(status);
        return sitepage.property('content');
      })
      .then(content => {
        sitepage.close();
        phInstance.exit();
        that.page_content = content
        return true
      })
      .catch(error => {
        console.log(error);
        phInstance.exit();
      });

  }


}

module.exports = Page
