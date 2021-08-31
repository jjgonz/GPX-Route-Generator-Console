var sortWith2OPT = require("./2opt");
var sortWithKNearest = require("./knearest");

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const generateGPX = (sortedArray) => `
${sortedArray
  .map((p) => {
    const [lat, lon] = p.split(",");
    return `${+lat},${+lon}`;
  })
  .join("\n")}`;

const GetGPXFile = (contents, type, interactionsCount = 1) => {
  const coordsArray = contents.split("\n").filter(onlyUnique);

  let sortedArray;

  switch (type) {
    case "2OPT":
      sortedArray = sortWith2OPT(coordsArray, interactionsCount);
      break;

    case "KN":
      sortedArray = sortWithKNearest(coordsArray);
      break;

    default:
      sortedArray = coordsArray.map((coords) => {
        const [lat, lon] = coords.split(",");
        return `${lat},${lon}`;
      });
  }

  return generateGPX(sortedArray);
};

module.exports = GetGPXFile;
