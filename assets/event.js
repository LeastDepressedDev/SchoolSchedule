firstSel.onchange = () => fullChange();
function fullChange() {
    secSel.innerHTML = "";
    class_list.forEach(element => {
        if (element["name"] == firstSel.value) {
            element["divs"].forEach(etwo => {
                secSel.innerHTML += `<option value="${etwo}">${etwo}</option>`
            });
            return;
        }
    });
    updateCurrentSchedule();
}
document.getElementById("selected-day").onchange = () => updateCurrentSchedule();
secSel.onchange = () => updateCurrentSchedule();