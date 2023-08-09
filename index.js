setTimeout(main, 1)

function redact(){
    console.log("a")
    document.getElementById("btn1").click()
}

function main(){
    const img = document.createElement("img")
    img.src = "https://tesseract.projectnaptha.com/img/eng_bw.png"
    canvas = document.getElementById("imgdiv")
    ctx = canvas.getContext("2d")
    
    img.onload = () => {
        canvas.height = img.height
        canvas.width = img.width
        ctx.clearRect(0, 0, img.width, img.height);
        ctx.drawImage(img, 0, 0, img.width, img.height)
    }
    imageData = []

    async function getImageData(src){
        var options = { logger: m => console.log(m) };
        var data = await Tesseract.recognize(src, "eng", options);
        return data;
    }
    
    async function data(list){
        dataList = []
        list = [list]
        var myData = await getImageData(img.src)
        myData = myData.data
        imageWords = myData.words
        console.log(imageWords)
        wordsLen = imageWords.length
        for (var i = 0; i < wordsLen; i++){
            text = imageWords[i].text
            if (list.includes(text)){
                dataList.push(imageWords[i])
            }
        }
        console.log(dataList)
        for (var i = 0; i < dataList.length; i++){
            x0 = dataList[i].bbox.x0
            x1 = dataList[i].bbox.x1
            y0 = dataList[i].bbox.y0
            y1 = dataList[i].bbox.y1
            w = Math.abs(x1 - x0)
            h = Math.abs(y1 - y0)
            console.log(x0, y0, x1, y1)
            ctx.fillStyle = "pink"
            ctx.fillRect(x0, y0, w, h)
        }
    }

    btn = document.getElementById("redactbtn")
    btn.onclick = evt1

    function evt1(){
        input = document.getElementById("tesseractwords")
        word = input.value
        data(word)
        input.value = ""
    }
}

