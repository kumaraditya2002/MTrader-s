
let url = 'https://kumaraditya2002.github.io/Test-repo/views/db.json';
let url2="https://raw.githubusercontent.com/kumaraditya2002/test-backend/master/public/data.json";
let btns = document.getElementsByClassName('btnmy');
let t1=document.getElementById('t1');
let t2=document.getElementById('t2');
let t3=document.getElementById('t3');


let btn2021 = document.getElementById('2021');
Array.from(btns).forEach(item => {
    item.addEventListener('click', e => {
        let headings = document.getElementById('theading');
        let main = document.getElementById('mainc');
        main.style.display = "none";
        t1.style.display = "table";
        t2.style.display = "none";
        t3.style.display = "none";
        document.getElementById('tit').innerText = item.innerText;
        fetch(url).then(res => {
            return res.json();
        }).then(data => {
            let arr = data[item.innerText];
            let hstr = `<tr>`;
            for (let titles in arr[0]) {
                hstr += `<th scope="col">${titles}</th>`
            }
            hstr += `</tr>`
            headings.innerHTML = hstr;
            let body = document.getElementById('tbody');
            let html = ``;
            arr.forEach(element => {
                html += `<tr>`;
                for (let title in element) {
                    // console.log(element);
                    html += `<td>${element[title]}</td>`;
                }
                html += `</tr>`;
            });
            body.innerHTML = html;
        }).catch(err => console.log(err));
    });
});


let prtablehead = document.getElementById('prtablehead');
let sum = document.getElementById('sumbody');
let prtablebody = document.getElementById('prtablebody');

btn2021.addEventListener('click',()=>{
    let main = document.getElementById('mainc');
    main.style.display = "none";
    t2.style.display = "table";
    t1.style.display = "none";
    t3.style.display = "table";
    fetch(url2).then(res=>res.json())
    .then(data=>{
        let arr=data["Main_Table"];
        let hstr=`<tr>`;
        for (const key in arr[0]) {
            hstr += `<th>${key}</th>`;
        }
        hstr += `</tr>`;
        prtablehead.innerHTML=hstr;
        let html=``;
        let sum1=0,sum2=0;
        arr.forEach((element,i)=>{
            if(i<=arr.length-2){
                html += `<tr>
                            <td>${element.Month}</td>
                            <td>${element.Date}</td>
                            <td>${element.Day}</td>
                            <td>${element["Amount Invested"]}</td>
                            <td>${element["P/L(Target)"]}</td>
                            <td>${element["P/L(Actual)"]}</td>
                            <td>${element.Remarks}</td>
                        </tr>`
                sum1 += +element["P/L(Target)"];
                sum2 += +element["P/L(Actual)"];
            }
        })
        html += `<tr>
                    <th colspan="4" >Total</th>
                    <th style="background-color: springgreen; color: white;">${sum1}</th>
                    <th style="background-color: springgreen; color: white;">${sum2}</th>
                </tr>`
        prtablebody.innerHTML = html;
        
        let str = `<tr><th colspan="2" style="background-color: seagreen; color: seashell; text-transform: uppercase;">Performance report 2021 summary</th></tr>`;
        for (const key in arr[arr.length-1]) {
            str += `<tr>
                        <th>${key}</th>
                        <td>${arr[arr.length-1][key]}</td>
                    </tr>`
        }
        sum.innerHTML = str;
        
    });
})


