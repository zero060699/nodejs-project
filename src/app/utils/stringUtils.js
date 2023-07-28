String.prototype.allReplace = function (obj) {
  var retStr = this;
  for (var x in obj) {
    retStr = retStr.replace(new RegExp(x, "g"), obj[x]);
  }
  return retStr;
};

String.prototype.allReplaceId = function (obj) {
  var retStr = this;
  var indexPieChartTop10TagsAlert = 0;
  var indexBarChartTop10TagsCase = 0;
  var indexPieChartTop10ObsCount = 0;
  var indexPolarAreaChartStatisticCase = 0;

  for (var x in obj) {
    retStr = retStr.replace(new RegExp(x, "g"), function () {
      if (x == "{pieChartTop10TagsAlert}") {
        indexPieChartTop10TagsAlert++;
        return (
          obj[x].slice(0, 12) + indexPieChartTop10TagsAlert + obj[x].slice(12)
        );
      } else if (x == "{barChartTop10TagsCase}") {
        indexBarChartTop10TagsCase++;
        return (
          obj[x].slice(0, 12) + indexBarChartTop10TagsCase + obj[x].slice(12)
        );
      } else if (x == "{pieChartTop10ObsCount}") {
        indexPieChartTop10ObsCount++;
        return (
          obj[x].slice(0, 12) + indexPieChartTop10ObsCount + obj[x].slice(12)
        );
      } else if (x == "{polarAreaChartStatisticCase}") {
        indexPolarAreaChartStatisticCase++;
        return (
          obj[x].slice(0, 12) +
          indexPolarAreaChartStatisticCase +
          obj[x].slice(12)
        );
      } else {
        return obj[x];
      }
    });
  }
  var indexString =
    indexPieChartTop10TagsAlert +
    "/" +
    indexBarChartTop10TagsCase +
    "/" +
    indexPieChartTop10ObsCount +
    "/" +
    indexPolarAreaChartStatisticCase;
  return indexString + retStr;
};

String.prototype.replaceAt = function (index, replacement) {
  if (index >= this.length) {
    return this.valueOf();
  }

  return this.substring(0, index) + replacement + this.substring(index + 1);
};
stringReplaceAll = (string, obj) => {
  let result = "";
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  keys.forEach((key, index) => {
    if (string.includes(key)) {
      const regex = new RegExp(key, "i");
      result = string.replace(regex, values[index]);
    }
  });
  return result;
};
var replacer = function (string, ArrValues) {
  try {
    const findAllIndex = [];
    for (let index = 0; index < string.length; index++) {
      if (string[index] === "$") {
        findAllIndex.push(index);
      }
    }
    findAllIndex.forEach((_, index) => {
      const indexOf = string.indexOf("$");
      string = string.replaceAt(indexOf, "");
    });
    return string;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  stringReplaceAll,
  String,
  replacer,
};
