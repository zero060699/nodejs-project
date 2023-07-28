/**
 * https://xuanduy1412.wordpress.com/2009/11/21/cac-ma-loi-html-request/
 * https://viblo.asia/p/tim-hieu-ve-http-status-code-lA7GKwx5GKZQ
 */
error422 = (res, jsonMessage) => {
  return res.status(422).json(jsonMessage);
};

error400 = (res, jsonMessage) => {
  return res.status(400).json(jsonMessage);
};

error404 = (res, jsonMessage) => {
  return res.status(404).json(jsonMessage);
};

error401 = (res, jsonMessage) => {
  return res.status(401).json(jsonMessage);
};

error500 = (res) => {
  return res.status(500).json({
    message: "url error",
    totalResult: 0,
    data: null,
  });
};
success = (res, dataArray, size) => {
  return res.status(200).json({
    data: dataArray,
    totalPages: Math.floor(Math.floor(dataArray.length / size) + 1),
  });
};
Pagesuccess = (res, dataArray, size, count) => {
  return res.status(200).json({
    data: dataArray,
    totalPages: Math.floor(Math.floor(count / size) + 1),
  });
};
getsuccess = (res, dataArray) => {
  return res.status(200).json({
    data: dataArray,
  });
};
ResponseMessage = (res, code, message, dataArray) => {
  return res.status(parseInt(code)).json({
    message: message,
    data: dataArray,
    code: code,
  });
};

ResponseMessageCheck = (res, code, message, data) => {
  let dataArr = [];
  if (Array.isArray(data)) {
    dataArr = data;
  } else {
    dataArr.push(data);
  }
  return res.status(parseInt(code)).json({
    message: message,
    code: code,
    data: data,
  });
};

success200 = (res, jsonMessage) => {
  return res.status(200).json(jsonMessage);
};

module.exports = {
  error422,
  error400,
  error401,
  error404,
  error500,
  success200,
  success,
  getsuccess,
  Pagesuccess,
  ResponseMessage,
  ResponseMessageCheck,
};
