
export function respond(res, data = undefined, status = 200) {
  if (data !== undefined) {
    res.write(JSON.stringify(data, null, 2));
  }
  res.statusCode = status;
  res.end();
}

export function notFound(res, message = "") {
  res.statusCode = 404;
  res.write(JSON.stringify({ message }, null, 2))
  res.end();
}