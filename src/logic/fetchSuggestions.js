import axios from "axios";

function fetchSuggestions(url,endpoint,keyPositions,srcObj,propName,idField='id',other="1"){
 axios.get(url + endpoint)
     .then(function (response) {
         let data = response.data;
         let suggestData = []

         data.map((option, i) => {
             suggestData.push({
                 id: option[idField],
                 data: [],
                 other: '1'
             })
             for (var key in option) {
                 if (option.hasOwnProperty(key)) {
                     if(key in keyPositions){
                        suggestData[suggestData.length - 1]['data'].splice(keyPositions[key],0,[key, option[key]]);
                     }
                     else{
                         suggestData[suggestData.length - 1]['data'].push([key, option[key]]);
                     }
                 }
             }
         })
         
         console.log(suggestData);
         srcObj.setState({
             [propName+"Loaded"]: true,
             [propName+"SuggestData"]: suggestData,
             response
         });
     })
     .catch(function (error) {
         // handle error
         srcObj.setState({
             [propName + "Loaded"]: false,
             error
         });
         console.log(error);
     })
     .then(function () {
         // always executed
     });
 }

export default fetchSuggestions;
