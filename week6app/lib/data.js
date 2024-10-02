// all the utility funtions to read data 

import fs from 'fs';
import path from 'path';



// get filepath to data directory
const dataDir = path.join(process.cwd(), 'data');

// Refactored: Load json file into json array object
function loadJson(fileName) {
    //get file path to json file
    const filePath = path.join(dataDir, fileName);
    //load json file contents
    const jsonString = fs.readFileSync(filePath,'utf-8');
    //convert string from file into json array object
    return JSON.parse(jsonString);
}

// function returns names and ids for all json objects in array, sorted by name property
export function getSortedList(){
    const jsonObj = loadJson('persons.json')

    //sort json array by name property
    jsonObj.sort(
        function(a,b) {
            return a.name.localeCompare(b.name);
        }
    );

    //use map() or array to extract just id + name properties into new array of object values
    return jsonObj.map(
        function(item) {
            return {
                id: item.id.toString(),
                name: item.name
            };
        }
    );
}



// function returns ids for all json objects in array
export function getAllIds(){
    const jsonObj = loadJson('persons.json')

    //use map() or array to extract just id + name properties into new array of object values
    return jsonObj.map(
        function(item) {
            return {
                params: {
                    id: item.id.toString()
                }
            };
        }
    );
}



// Function return all of the properties for a single object with matching id value
export async function getData(idRequested) {
    // load the first json file (persons.json)
    const jsonObj = loadJson('persons.json');

    // find object value in array that has matching id
    const objMatch = jsonObj.filter(
        function(obj) {
          return obj.id.toString() === idRequested;
        }
    );
    
    // extract object value in filtered array if any
    let objReturned;
    if (objMatch.length > 0) {
        objReturned = objMatch[0];
    } else {
        objReturned = {};
    }

    // New Code here to handle second json file
    const personalData = await getPersoanlData(objReturned.name);

    // Use Object.assign() to merge objReturned (holding the persons.json data) 
    // with personalData (holding the personlinfo.json data)
    // found Oject.assign() @ https://www.codecademy.com/resources/docs/javascript/objects/assign
    objReturned = Object.assign(objReturned, personalData);
    return objReturned;
}




export async function getPersoanlData(nameRequested){
    const jsonObj = loadJson('personalinfo.json')

    // find object value in array that has matching name
    const objMatch = jsonObj.filter(
        function(obj) {
            return obj.name === nameRequested;
        }
    );

    // extract object value in filtered array if any
    let objReturned;
    if (objMatch.length > 0) {
        objReturned = objMatch[0];
    } else {
        objReturned = {};
    }

    return objReturned;
}