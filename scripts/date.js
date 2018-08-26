let makeData = function() {
  let d = new Date();
  let formattedDate = "";

  formattedDate += (d.getMonth() + 1) +" ";
  formattedDate += d.getDate() + "_";
  formattedDate += d.getFullYear();
  return formattedDate;
}
module.exports = makeData;