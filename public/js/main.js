var url2 = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=15deb215901a48a3b66437aacca7219c";
let mrq = document.getElementById("mq");
fetch(url2).then(res => res.json())
.then(data=>{
    let hstr="";
    data.articles.forEach(element => {
        if(element.title.split('-').length==2)
            hstr += `<a href="${element.url}" target=_blank id="mqc">${element.title.split('-')[0]}</a><img src="http://www.neccoal.co.in/images/New.gif" />`+`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
        
    });
    mrq.innerHTML=hstr;
}).catch(err=>console.log(err));