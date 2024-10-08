const DEBUG = true;
var data = null;
var date = new Date();

var firstSel = document.getElementById("class-selector-element");
var secSel = document.getElementById("div-selector-element");

var class_list = null;

var state = -1

async function build() {
    document.getElementById("day-of-week").innerHTML += dateDict[date.getDay()];

    const res = await axios.get(DATA_LINK);
    data = res.data;

    if (DEBUG) console.log(data);
    state = data["state"];
    document.getElementById("state-h").innerHTML += stateDict[state];

    if (state == 1) return;

    class_list = data["class-reg"];
    
    class_list.forEach(element => {
        firstSel.innerHTML += `<option value="${element["name"]}">${element["name"]}</option>`
    });

    fullChange();
}

function updateCurrentSchedule() {
    if (state == 1) return;
    var nline = firstSel.value + "-" + secSel.value;
    
    let elem = document.getElementById("main-table");
    elem.innerHTML = "";

    let ovr = document.getElementById("selected-day").value;
    
    if (ovr == 0 && (date.getDay() == 0 || date.getDay() > data["schedule"][nline]["days"])) {
        elem.innerHTML = "!!!Выходной!!!";
    } else {
        let day = data["schedule"][nline]["0"][ovr == 0 ? date.getDay()-1 : ovr-1];
        for (var i = 0; i < 11; i++) {
            let tmp = day["pos"][i];
            let cls = tmp == undefined ? "" : data["cabin-reg"][tmp];
            cls = cls == undefined ? cls : cls[nline];
            elem.innerHTML += `<div style="position: absolute; top: ${i*8+8}%; width: 99%; height: 7%" class="sm-bordered">
                        <div style="position: absolute; width: 10%; height: 98%; text-align: center;" class="sm-bordered">${i}</div>
                        <div style="position: absolute; left: 10%; width: 80%; height: 98%" class="sm-bordered">${tmp == undefined ? "" : tmp}</div>
                        <div style="position: absolute; left: 90%; width: 10%; height: 98%; text-align: center;" class="sm-bordered">${cls == undefined ? "" : cls}</div>
                    </div>
            `;
        }
    }
}