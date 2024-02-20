class AddresedData {
    key;
    val;

    constructor(key, val) {
        this.key = key;
        this.val = val;
    }
}

function format(line) {
    var nl = line.replace('\n', '');
    if (line != nl) return format(nl);
    else return nl;
}

function revCD(line) {
    var arr = line.split(':');
    return arr[1] + ':' + arr[0];
}