toJsonWithData = (message, totalResult, totalPage, data) => {
  return {
    message: message,
    totalResult: totalResult,
    totalPage: totalPage,
    data: data,
  };
};

toJsonWithData = (message, data, totalPage, totalResult) => {
  let dataArr = [];

  if (Array.isArray(data)) {
    dataArr = data;
  } else {
    dataArr.push(data);
  }
  let totalResultItem;
  if (totalResult) {
    totalResultItem = totalResult;
  } else {
    totalResultItem = dataArr.length;
  }
  return {
    message: message,
    totalResult: totalResultItem,
    totalPage: totalPage,
    data: dataArr,
  };
};

jsondata = (message) => {
  return {
    message: message,
  };
};

jsonassignpage = (code, message, totalResult, totalPage, data) => {
  return {
    code: code,
    message: message,
    totalResult: totalResult,
    totalPage: totalPage,
    data: data,
  };
};

jsonassignpage = (code, message, data, totalPage) => {
  let dataArr = [];

  if (Array.isArray(data)) {
    dataArr = data;
  } else {
    dataArr.push(data);
  }

  return {
    code: code,
    message: message,
    // totalResult: dataArr.length,
    totalPage: totalPage,
    data: data,
  };
};

// Hiển thị danh sách chờ xử lý kịch bản

updateJsonAssignPage = (code, message, data, totalPage, value) => {
  // var dataArr = [];
  // if (Array.isArray(data)) {
  //   dataArr = data;
  // } else {
  //   dataArr.push(data);
  // }
  let datatest = {
    // value: dataArr,
    totalResult: data.length,
    totalPage: totalPage,
  };

  const test = data.map((e) => {
    return Object.assign(e, datatest);
  });

  return {
    code: code,
    message: message,
    data: test,
  };
};

jsonassign = (code, message, data, totalPage, totalResult) => {
  let totalResultItem;
  if (totalResult) {
    totalResultItem = totalResult;
  } else {
    totalResultItem = data.length;
  }
  return {
    code: code,
    message: message,
    data: {
      values: data,
      totalItems: totalResultItem,
      totalPage: totalPage,
    },
  };
};

jsonassigns = (code, message, data) => {
  return {
    code: code,
    message: message,
    data: data,
  };
};

jsonconfig = (data) => {
  return {
    data: data,
  };
};

jsonNoData = (message) => {
  return {
    message: message,
    totalResult: 0,
    totalPage: 0,
    data: null,
  };
};

module.exports = {
  toJsonWithData,
  jsonNoData,
  jsondata,
  jsonassign,
  jsonassignpage,
  updateJsonAssignPage,
  jsonassigns,
  jsonconfig,
};
