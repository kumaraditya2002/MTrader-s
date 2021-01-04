let mrq = document.getElementById("mq");
fetch("https://bloomberg-market-and-financial-news.p.rapidapi.com/news/list-by-region?id=asia-home-v3", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "fc81ec58a0mshc49440c93582faap11afd1jsnb442aacddcee",
		"x-rapidapi-host": "bloomberg-market-and-financial-news.p.rapidapi.com"
	}
})
.then(response => response.json())
.then(data=>{
    console.log(data.modules)
    let hstr="";
    data.modules.forEach(element => {
        if(element.stories.length>0)
        {
            element.stories.forEach(e=>{
                hstr += `<a href="${e.longURL}" target=_blank id="mqc">${e.title}</a><img src="http://www.neccoal.co.in/images/New.gif" />`+`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
            })
        }
    });
    mrq.innerHTML=hstr;
})
.catch(err => {
	console.error(err);
});
