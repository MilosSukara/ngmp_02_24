import { createServer } from 'http';
import url from 'url';
import { createUser, deleteUser, getUsers, getUser, getHobbies, patchHobbies } from './user-controller.js';
import { notFound } from './http.js';

const PORT = 8000;

const server = createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const reqURL = url.parse(req.url, true).pathname;
  switch (req.method) {
    case "GET": {
      if (reqURL == "/api/users") {
        getUsers(req, res);
        return;
      }
      if (reqURL.startsWith('/api/users/') && reqURL.endsWith('/hobbies')) {
        getHobbies(req, res);
        return;
      }
      if (reqURL.startsWith('/api/users/')) {
        getUser(req, res);
        return;
      }
    };
    case "POST": {
      if (reqURL == "/api/users") {
        await createUser(req, res);
        return;
      }
    };
    case "PATCH": {
      if (reqURL.startsWith('/api/users/') && reqURL.endsWith('/hobbies')) {
        await patchHobbies(req, res);
        return;
      }
    };
    case "DELETE": {
      if (reqURL.startsWith('/api/users/')) {
        deleteUser(req, res);
        return;  
      }
    };
  }
  notFound(res, "Route not found!");
});

server.listen(PORT, () => {
  console.log('Server is running on port 8000.');
});