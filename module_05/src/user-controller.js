import { parseRequestBody } from "./body-parser.js";
import { db } from "./db.js"
import url from 'url';
import { notFound as nf, respond } from "./http.js"

const MAX_AGE = 3600;
const notFound = (res, id) => nf(res, `User with ${id} doesn't exist`);

export function getUsers(req, res) {
  const users = db.users.all();
  res.setHeader("Cache-Control", `public, max-age=${MAX_AGE}`);
  respond(res, {
    data: users.map(user => ({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      links: {
        self: `/api/users/${user.id}`,
        hobbies: `/api/users/${user.id}/hobbies`
      },
    })),
    error: null,
  });
}

export function getUser(req, res) {
  const reqURL = url.parse(req.url, true).pathname;
  const id = reqURL.replace('/api/users/', '');
  const user = db.users.get(id);
  if (user == undefined) {
    notFound(res, id);
    return;
  }
  res.setHeader("Cache-Control", `private, max-age=${MAX_AGE}`);
  respond(res, {
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      links: {
        self: `/api/users/${user.id}`,
        hobbies: `/api/users/${user.id}/hobbies`
      },
    },
    error: null,
  });
}


export async function createUser(req, res) {
  const body = await parseRequestBody(req);
  const user = db.users.create({ name: body?.name, email: body?.email, hobbies: body?.hobbies ?? [] });
  const data = {
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      links: {
        self: `/api/users/${user.id}`,
        hobbies: `/api/users/${user.id}/hobbies`
      },
    },
    error: null,
  }
  respond(res, data, 201);
}

export function deleteUser(req, res) {
  const reqURL = url.parse(req.url, true).pathname;
  const id = reqURL.replace('/api/users/', '');
  const isDeleted = db.users.delete(id);
  if (!isDeleted) {
    notFound(res, id);
    return;
  }
  respond(res, {
    data: {
      success: true,
    },
    error: null
  }, 200);
}

export function getHobbies(req, res) {
  const reqURL = url.parse(req.url, true).pathname;
  const id = reqURL.replace('/api/users/', '').replace('/hobbies', '');
  const user = db.users.get(id);
  if (user == undefined) {
    notFound(res, id);
    return;
  }
  res.setHeader("Cache-Control", `private, max-age=${MAX_AGE}`);
  respond(res, {
    data: {
      hobbies: user?.hobbies,
      links: {
        self: `/api/users/${user.id}/hobbies`,
        user: `/api/users/${user.id}`
      }
    },
    error: null
  });
}

export async function patchHobbies(req, res) {
  const reqURL = url.parse(req.url, true).pathname;
  const id = reqURL.replace('/api/users/', '').replace('/hobbies', '');
  const user = db.users.get(id);
  if (user == undefined) {
    notFound(res, id);
    return;
  }
  const oldHobbies = user?.hobbies ?? [];
  const newHobbies = (await parseRequestBody(req))?.hobbies ?? [];
  const hobbies = [...new Set([...oldHobbies, ...newHobbies])];
  const updatedUser = db.users.update(id, {
    ...user,
    hobbies
  });
  respond(res, {
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      links: {
        self: `/api/users/${user.id}`,
        hobbies: `/api/users/${user.id}/hobbies`
      },
    },
    error: null
  });
}