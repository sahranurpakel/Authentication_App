module.exports.reCap = () => {
  const arr = "1234567890qwertyuıopğüasdfghjklşizxcvbnmöç";
  const reCap = new Array();

  for (var i = 0; i < 6; i++) {
    const number = Math.ceil(Math.random() * arr.length - 1);
    reCap.push(arr[number].toUpperCase());
  }
  return reCap;
};
