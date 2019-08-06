import firebase from "./Firestore"

const places = firebase.database().ref("/users/0/data");

findBlankIndex(phrase){
  var arr = [];
  var count = 0;
  for (var i = 0; i<phrase.length-2; i++)
  {
    if (phrase.charAt(i) === ' ')
      count++;
    if (phrase.charAt(i) === ' ' && count === 1)
    {
      arr.push(parseFloat(phrase.substring(6, i)))
      arr.push(parseFloat(phrase.substring(i+1, phrase.length)))
      break;
    }
  }
  return arr;
}
for (var i = 0; i<100; i++)
{
let addDoc = db.collection('place').add({
  name: places[i][10],
  lat: findBlankIndex(places[i][8])[1],
  long: findBlankIndex(places[i](8))[0]
})
}
