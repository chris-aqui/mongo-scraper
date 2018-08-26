const makeData = function() {
  const d = new Data();
  const formattedDate = "";

  formattedDate += (d.getMonth() + 1) +" ";
  formattedDate += d.getDate() + "_";
  formattedDate += d.getFullYear();
  return formattedDate;
}
module.exports = makeData;