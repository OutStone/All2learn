// getting the HTML code of a page containing the img we want and parsing it
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const { parse } = require('node-html-parser');
const EventEmitter = require('node:events');
const notifier = new EventEmitter();

getHTML = async (name) => {
    console.log("a")
    name = name.replace(' ', '+')
    var url = encodeURI('https://www.naturfoto.cz/vyhledat/?retezec_search=' + name + '&hledat.x=0&hledat.y=0&photoid=')
    var xhr  = new XMLHttpRequest()
    const options = {
        method: 'GET',
        url: url
    };

    console.log(options.url)
    console.log('\n')

      xhr.open(options.method, options.url);
      xhr.send(null);

      xhr.addEventListener('readystatechange', async function () {
        if (this.readyState === this.DONE) {

            const page = parse(this.responseText);

            const container = page.querySelector('.items') // najde div container s vsemi kartami s obrazky
            const imgs = container.getElementsByTagName('img')

            if (imgs.length == 0) { // nejsou zadne fotky - asi chyba ||| TODO: response with a error msg       
                console.warn("length: " + imgs.length);
                notifier.emit(name.replace('+', ' '),null)
                return;
            }

            const index = Math.floor(Math.random() * imgs.length) // vybere nahodne cislo odpovidajici indexu jedne z karet s infem a fotkou z naturFoto
            console.warn("chosen " + index + " of " + imgs.length)

            ImgSrc = parseAttrs(imgs[index].rawAttrs,"src")
            console.log(name + " a ten obrazek " + ImgSrc)
            notifier.emit(name.replace('+', ' '),ImgSrc)
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

module.exports = {getHTML,parseAttrs,notifier}