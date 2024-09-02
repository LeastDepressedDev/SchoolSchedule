const DEBUG = true;

async function build() {
    const res = await axios.get("https://raw.githubusercontent.com/Sirtage/Fizra/master/raw.data");

    let data = JSON.parse(res.data);

    if (DEBUG) console.log(data);

}