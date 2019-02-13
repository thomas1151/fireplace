// returns a new object with the values at each key mapped using mapFn(value)
function objectMap(object, mapFn) {
    return Object.keys(object).reduce(function (result, key) {
        result =  result.push(mapFn(key,object[key]))
        console.log(result);
        return result
    }, {})
}

export default objectMap;