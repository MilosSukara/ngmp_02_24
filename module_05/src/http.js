
export function respond(res, data = undefined, status = 200) {
  res.statusCode = status;
  if (data != undefined) {
    res.write(JSON.stringify(data, null, 2));
  }
  res.end();
}

export function notFound(res, message = "") {
  res.statusCode = 404;
  res.write(JSON.stringify({ 
    data: null,
    error: message 
  }, null, 2))
  res.end();
}