import axios from "axios";

function fetchSuggestions(value, src, endpoint, keyPositions, propName, srcObj, idField = 'id', other = "1") {
    let _this = srcObj;
    if (value.length < _this.state.minQueryLength) {
        _this.setState({ [propName + 'SuggestData']: [] });
    } else {
        _this.props.src.rest.get(endpoint + value)
            .then(function (response) {
                let data = response.data.results;
                let suggestData = []
                //console.log(keyPositions);
                //console.log("keyPositions");
                data.map((option, i) => {
                    suggestData.push({
                        id: option[idField],
                        data: [],
                        other: '1'
                    })
                    //console.log(option);
                    for (var key in option) {
                        if (option.hasOwnProperty(key)) {

                            var found = false;
                            Object.keys(keyPositions).map(el =>  {
                                if(el === key){
                                    suggestData[suggestData.length - 1]['data'].splice(keyPositions[key], 0, [key, option[key]]);
                                }
                            })
                            !found && suggestData[suggestData.length - 1]['data'].push([key, option[key]]);
                            
                        }
                    }
                })

                //console.log(suggestData);
                _this.setState({
                    [propName + "Loaded"]: true,
                    [propName + (propName ? "S" : 's')+"uggestData"]: suggestData,
                    response
                });
            })
            .catch(function (error) {
                // handle error
                _this.setState({
                    error
                });
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }
}
export default fetchSuggestions;
