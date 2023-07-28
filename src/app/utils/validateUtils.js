const moment = require("moment");

class validateUtils {
  // kiem tra data Boolean
  IsBoolean = (x) => typeof x == "boolean";

  CheckBoolean = (value, _searchData) => {
    var searchData = _searchData.toLowerCase();
    if (value) {
      if (
        searchData == "t" ||
        searchData == "r" ||
        searchData == "u" ||
        searchData == "e" ||
        searchData == "tr" ||
        searchData == "ru" ||
        searchData == "ue" ||
        searchData == "tru" ||
        searchData == "rue" ||
        searchData == "true"
      ) {
        return true;
      }
    } else {
      if (
        searchData == "f" ||
        searchData == "a" ||
        searchData == "l" ||
        searchData == "s" ||
        searchData == "e" ||
        searchData == "fa" ||
        searchData == "al" ||
        searchData == "ls" ||
        searchData == "se" ||
        searchData == "fal" ||
        searchData == "als" ||
        searchData == "lse" ||
        searchData == "fals" ||
        searchData == "alse" ||
        searchData == "false"
      ) {
        return true;
      }
    }
    return false;
  };

  //Kiểm tra data không  rỗng
  CheckIsNotEmpty = (x) => {
    if (
      x == "" ||
      x == [] ||
      x == undefined ||
      x == null ||
      JSON.stringify(x) === "{}"
    ) {
      return false;
    } else return true;
  };

  CheckString = (value, searchData) => {
    if (typeof value !== "string") {
      return;
    }
    return value.includes(searchData);
  };
  // kiểm tra định dạng timestamp
  IsTimeStamp = (key) => !(moment(key).format("YYYY") == 1970);
  // // kiểm tra đối với key dạng number
  CheckNumber = (value, searchData) => {
    if (!value || typeof value !== "number" || this.IsTimeStamp(value)) {
      return;
    }
    return this.CheckString(value.toString(), searchData);
  };
  CheckArray = (value, search) => {
    if (!Array.isArray(value) || !value.length) {
      return;
    }
    for (const item of value) {
      const type = typeof item;
      switch (type) {
        case "string":
          if (this.CheckString(item, search)) {
            return true;
          }
          break;
        default:
          break;
      }
    }
    return;
  };
  CheckObject = (values, search) => {
    if (!values || typeof values !== "object" || !Object.keys(values).length) {
      return;
    }
    for (const key in values) {
      if (Object.hasOwnProperty.call(values, key)) {
        const value = values[key];
        // if (!value || this.IsBoolean(value)) {
        //   continue;
        // }
        switch (typeof value) {
          case "string":
            if (this.CheckString(value, search)) {
              return true;
            }
            break;
          case "number":
            if (this.CheckNumber(value, search)) {
              return true;
            }
            break;
          case "array":
            if (this.CheckArray(value, search)) {
              return true;
            }
            break;
          case "object":
            if (this.CheckObject(value, search)) {
              return true;
            }
            break;
          case "boolean":
            if (this.CheckBoolean(value, search)) {
              return true;
            }
            break;
          default:
            break;
        }
      }
    }
    return;
  };
}

module.exports = new validateUtils();
