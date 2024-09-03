var DATA_LINK = "https://raw.githubusercontent.com/LeastDepressedDev/SchoolSchedule/master/data.json";

class AddresedData {
    key;
    val;

    constructor(key, val) {
        this.key = key;
        this.val = val;
    }
}

var stateDict = ["РАБОТАЕТ", "ОТКЛЮЧЕНО", "Тех. работы"];

function format(line) {
    var nl = line.replace('\n', '');
    if (line != nl) return format(nl);
    else return nl;
}

function revCD(line) {
    var arr = line.split(':');
    return arr[1] + ':' + arr[0];
}