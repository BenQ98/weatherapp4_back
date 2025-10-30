// function checkBody(body, keys) {
//   for (const key of keys) {
//     if (!body[key] || body[key] === '') {
//       return false;
//     }
//   }
//   return true;
// }
function checkBody(body, keys) {
  let isValid = true;

  for (const field of keys) {
    if(!body[field] || body[field] === "" ) {
      isValid = false;
    }
  }
  return isValid;
}


module.exports = { checkBody };