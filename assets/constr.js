const DEBUG = false;

const dimension = {
    width: 140,
    height: 60
}

function genCell(x, y, content) {
    var cell = document.createElement("div");
    cell.setAttribute("class", "tablable");
    cell.setAttribute("id", `cell_${x}:${y}`);
    cell.setAttribute("style", `position: absolute; left: ${dimension.width*x}px; top: ${dimension.height*y}px; width: ${dimension.width}px; height: ${dimension.height}px;`)
    cell.innerHTML = `<span style="position: relative; top: ${dimension.height/3}px;">${content}</span>`;

    return cell;
}

async function build() {
    var dats = new Map();

    const res = await axios.get("https://raw.githubusercontent.com/Sirtage/Fizra/master/raw.data");

    if (DEBUG) console.log(res);

    var arr = format(res.data).split(';');
    for(var i = 0; i < arr.length; i++) {
        if (arr[i].startsWith('##') || arr[i].length <= 2) continue;
        var ln = arr[i].split('@');
        dats.set(ln[0], ln[1]);
    }

    var teams = [];
    var TABLE = document.getElementById("main_score_table");

    if (DEBUG) console.log(dats);

    dats.forEach((v, k) => {
        if (k.startsWith("team_")) teams.push([parseInt(k.substring(5)), k]);
        if (k.startsWith("score_")) {
            var pos = k.substring(6).split(':');
            pos = [parseInt(pos[0]), parseInt(pos[1])];
            TABLE.appendChild(genCell(pos[0], pos[1], v));
            TABLE.appendChild(genCell(pos[1], pos[0], revCD(v)));
        }
    });

    TABLE.setAttribute("style", `position: absolute; left: 3%; top: 5%; width: ${dimension.width+dimension.width*teams.length}px; height: ${dimension.height+dimension.height*teams.length}px;`);
    TABLE.appendChild(genCell(0, 0, "Команды"));

    teams.sort((a, b) => a[0] - b[0]);


    for (var i = 1; i < teams.length+1; i++) {
        TABLE.appendChild(genCell(i, 0, dats.get(teams[i-1][1])));
    }

    for (var i = 1; i < teams.length+1; i++) {
        TABLE.appendChild(genCell(0, i, dats.get(teams[i-1][1])));
    }

    for (var i = 1; i < teams.length+1; i++) {
        for (var j = 1; j < teams.length+1; j++) {
            if (document.getElementById(`cell_${i}:${j}`) == null) TABLE.appendChild(genCell(i, j, "-"));
        }
    }
}