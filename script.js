const updateRatio = () => {
    const value = document.getElementById("input").value;
    evol = 100 - value;
    document.getElementById('ratio').innerText = `${value}/${evol}`;
}
document.getElementById("input").addEventListener("change", updateRatio);
document.getElementById("button").addEventListener("click", submit);
document.getElementById("randomize").addEventListener("click", randomize);
function randomize(){
    const arr = [];
    for(let i = 0; i <= 100; i += 10){
        arr.push(i);
    }
    const random = Math.floor(Math.random() * arr.length);
    document.getElementById("input").value = arr[random];
    updateRatio();
}
function submit(){
    document.querySelector('.check').classList.remove('visible');
    let requests =
        [{id: '955273', type: 'maintenance'},
        {id: '955267', type: 'evol'}];
    const maintenance = requests.find(e => e.type === 'maintenance');
    const evol = requests.find(e => e.type === 'evol');
    const x = (new Date()).getTimezoneOffset() * 60000;
    const date = new Date(Date.now());
    if (document.getElementById('yesterday').checked){
        let prev = 1;
        if(date.getDay() === 1){
            prev = 3
        }
        date.setDate(date.getDate() - prev);
    }
    const dateArr = (new Date(date - x)).toISOString().slice(0,-1).split('T')[0].split('-');
    const year = dateArr[0];
    const month = dateArr[1];
    const day = dateArr[2];
    maintenance.value = parseInt(document.getElementById('input').value);
    evol.value = 100 - parseInt(maintenance.value);
    if (evol.value === 0){
        requests.pop();
    }
    else if (maintenance.value === 0){
        requests.shift();
    }
    const promises = [];
    for(req of requests){
        promises.push(fetch(`https://project.ivalua.com/page/prj/time_feed_req?&ts_login_id=${config.userId}&lead_id=8571&request_id=${req.id}&c_workplace=&c_idtasktype=2&with_header=Y`, {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "content-type": "application/x-www-form-urlencoded",
            },
            "body": `with_header=Y&actiontype=&c_idworktime_del=&c_idworktime_mod=&uidate_c_workdate=${day}%2F${month}%2F${year}&c_workdate=${year}-${month}-${day}&lead_id=8571&old_lead_id=8571+&request_id=${req.id}&c_idtasktype=2&c_workplace=&perc_work=${req.value}&c_comment=&enregistrer=submit`,
            "method": "POST",
            "mode": "no-cors",
            "credentials": "include"}));
    }
    Promise.all(promises).then(() => {
        document.querySelector('.check').classList.add('visible');
    })
}
function getBranchStatus() {
    const branches = [180, 178, 176, 174, 172];
    const promises = []
    branches
        .forEach(e => promises.push(fetch(`https://project.ivalua.com/page/chg/branch_manage?branch_code=buyer_V8_${e}_D351364_branch`)
        .then(res => res.text())
        .then(d => {            
            const isLock = $(d).find('.table-fields .fa-lock').length === 1;
            return {
                branch: e,
                status: isLock ? 'lock' : 'open'
            }
        })));
        debugger
    Promise.all(promises).then(values => {
        console.log(values)
    })    
}