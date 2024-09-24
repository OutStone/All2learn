// getting the HTML code of a page containing the img we want and parsing it
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const { parse } = require('node-html-parser');

getHTML = (url) => {
    var xhr  = new XMLHttpRequest()
    const options = {
        method: 'GET',
        url: url
    };

      xhr.open(options.method, options.url);
      xhr.send(null);

      xhr.addEventListener('readystatechange', async function () {
        if (this.readyState === this.DONE) {

            const page = parse(this.responseText);

            const container = page.querySelector('.items') // najde div container s vsemi kartami s obrazky
            const imgs = container.getElementsByTagName('img')

            if (imgs.length == 0) { // nejsou zadne fotky - asi chyba ||| TODO: response with a error msg       
                console.warn("length: " + imgs.length);
                return;
            }

            const index = Math.floor(Math.random() * imgs.length) // vybere nahodne cislo odpovidajici indexu jedne z karet s infem a fotkou z naturFoto
            console.warn("chosen " + index + " of " + imgs.length)

            ImgSrc = parseAttrs(imgs[index].rawAttrs,"src")
            console.log(ImgSrc)
        }
      })
}

parseAttrs = (str, param) => { // parses a value of a specific attribute
	param += '=';

    var position = str.indexOf(param);
    position += param.length;

    Q_marks = str.at(position);

    endPoint = str.indexOf( Q_marks, position+1 );

    result = str.slice(position+1,endPoint);
    return result;
}

module.exports = {getHTML,parseAttrs}