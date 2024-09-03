const DEBUG = true;
var data = null;

var firstSel = document.getElementById("class-selector-element");
var secSel = document.getElementById("div-selector-element");

var class_list = null;

async function build() {
    const res = await axios.get(DATA_LINK);
    data = res.data;

    if (DEBUG) console.log(data);

    class_list = data["class-reg"];
    
    class_list.forEach(element => {
        firstSel.innerHTML += `<option value="${element["name"]}">${element["name"]}</option>`
    });

    fullChange();
}

function updateCurrentSchedule() {
    var nline = firstSel.value + "-" + secSel.value;
    
    data["schedule"][nline];
}