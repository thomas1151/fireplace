function keyifyToJSON(keys) {
    let obj = {};
    keys.map(el => {
        console.log(el);
        let segs = el.split(".");
        segs.forEach((seg, i) => {
            console.log(seg);
            console.log(i);
        });
    });
}
export default keyifyToJSON;