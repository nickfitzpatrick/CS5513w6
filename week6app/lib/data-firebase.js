import app from "./firebase-app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";

const db = getFirestore(app);

// function returns names and ids for all json objects in array, sorted by name property
export async function getSortedList(){
    const snapshot = await getDocs( collection(db, "persons") );
    const jsonObj = snapshot.docs.map(
        ( document ) => (
            {
                id: document.id,
                ...document.data() //apends other fields in array
            }
        )
    );

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
export async function getAllIds(){
    const snapshot = await getDocs( collection(db, "persons") );
    const jsonObj = snapshot.docs.map(
        ( document ) => (
            {
                id: document.id
            }
        )
    );

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
    const docRef = doc(db, "persons", idRequested);
    const document = await getDoc(docRef);

    let objReturned;
    if(!document.exists) {
        objReturned = {};
    } else {
        objReturned = document.data();
    }

    return objReturned;
}