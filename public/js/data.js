var sp = document.getElementById('sPrice');
var srch = document.getElementsByClassName('date');
var heading = document.getElementById('heading');
var s1 = document.getElementById('s1');
var sl = document.getElementById('sl');
var s2 = document.getElementById('s2');
var s3 = document.getElementById('s3');
var bu = document.getElementById('buy');
var sel = document.getElementById('sell');
var tot = document.getElementById('total');
const form = document.getElementById('main_form');

function totsum(){
    let price = document.getElementsByClassName('price');
    let sum=0;
    Array.from(price).forEach(element=>{
        sum += +element.innerText;
    })
    if(sum<0)
    {
        tot.style.backgroundColor="red";
        tot.innerText=`Total P&L = ${sum} Rs`;
    }
    else if(sum>=0)
    {
        tot.style.backgroundColor="green";
        tot.innerText=`Total P&L = ${sum} Rs`;
    }
}
form.addEventListener('submit', registerUser);
async function registerUser(event) {
    event.preventDefault();
    const date = new Date().toISOString().slice(0, 10);
    const index = s1.value;
    const lotVal = +sl.value;
    const lot = `LOT ${lotVal}`;
    const ratio = s2.value;
    const stPrice = +sp.value;
    const buy = +bu.value;
    const sell = +sel.value;
    let price;
    if(index === "NIFTY")
        price = ((sell-buy)*lotVal*75).toFixed(2);
    if(index === "BANK NIFTY")
        price = ((sell-buy)*lotVal*75).toFixed(2);
    const result = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            date,
            index,
            lot,
            ratio,
            stPrice,
            buy,
            sell,
            price
        })
    }).then(res => res.json());
    if (result.status === 'error1')
        alert(result.error1);
    else if (result.status === 'error2')
        alert(result.error2);
    else if(result.status ==="ok")
        location.reload();
}
async function deleteEntry(id) {
    const result = await fetch('/delete', {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id
        })
    }).then(res=>res.json())
    if(result.status==="ok")    
        location.reload();
}

s3.addEventListener('input',(e)=>{
    e.preventDefault();
    let sum=0;
    let month = +s3.value; 
    let dataArr = srch;
    Array.from(dataArr).forEach((element,i) => {
        let m = +element.innerText.split('-')[1];
        if(month===0){
            location.reload();
        }
        else if(month !== m)
            document.getElementById(i+1).style.display = "none";
        else if(month === m)
            document.getElementById(i+1).style.display = "table-row";
    });
    let price = document.getElementsByClassName('price');
    Array.from(price).forEach(element=>{
        if(element.parentNode.style.display!=="none")
            sum += +element.innerText;
    });
    if(sum<0){
        tot.innerText = `Total P&L = ${sum} Rs`;
        tot.style.backgroundColor ="red";
    }
    else if(sum>=0){
        tot.innerText = `Total P&L = ${sum} Rs`;
        tot.style.backgroundColor ="green";
    }
});

totsum();








