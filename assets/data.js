function get_data() {
    var res;
    res = axios.get("https://raw.githubusercontent.com/arnav7633/tej.js/main/tsconfig.json");
    return res;
}

