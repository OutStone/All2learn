var nextBtn,showBtn,name,img

function loaded() {
    nextBtn = document.getElementById('next')
    showBtn = document.getElementById('show')
    name = document.getElementById('name')
    var img = document.getElementById('img')
    const url = window.location.href
    const itemID =  url.slice( url.lastIndexOf('/') +1, url.length )

    httpGetAsync('/DBwork'+itemID)
}

function httpGetAsync(Url) {
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = () => { 
        if (xml.readyState == 4 && xml.status == 200) {
            var List = JSON.parse(xml.responseText)
            console.log(List)
            var ListOfNulls = []
            for (var i=0; i<List.length; i++) {
                if (List[i].url == null) { 
                    ListOfNulls.push(List[i])
                    List = List[i].splice(i,1)
                }
            }
            console.log(ListOfNulls)
            console.log(List)
            next()
            
        }
    }
    alert("sending")
    xml.open("GET", Url, true); // true for asynchronous 
    xml.send(null);
}

function show() {
name.innerHTML = List[0].name
name.classList = ''

nextBtn.classList = ''

showBtn .classList = 'hide'
}

function next() {
    list.shift()
    img.src = List[0].url
    name.innerHTML = List[0].name
    name.classList = 'hide'
    
    nextBtn.classList = 'hide'
    
    showBtn .classList = ''
}