import { parseRequestBody } from "./body-parser.js";
import { db } from "./db.js"
import url from 'url';
import { notFound as nf, respond } from "./http.js"

const MAX_AGE = 3600;
const notFound = (res) => nf(res, "User not found!");

export function getUsers(req, res) {
  const users = db.users.all();
  res.setHeader("Cache-Control", `public, max-age=${MAX_AGE}`);
  respond(res, {
    users: users.map(user => ({
      ...user,
      links: {
        hobbies: `/api/users/${user.id}/hobbies`
      }
    })),
  });
}

export function getUser(req, res) {
  const reqURL = url.parse(req.url, true).pathname;
  const id = reqURL.replace('/api/users/', '');
  const user = db.users.get(id);
  if (user == undefined) {
    notFound(res);
    return;
  }
  res.setHeader("Cache-Control", `private, max-age=${MAX_AGE}`);
  respond(res, {
    user: {
      ...user,
      links: {
        hobbies: `/api/users/${user.id}/hobbies`
      }
    }
  });
}


export async function createUser(req, res) {
  const body = await parseRequestBody(req);
  const user = db.users.create({ name: body?.name, email: body?.email, hobbies: body?.hobbies ?? [] });
  respond(res, { user }, 201);
}

export function deleteUser(req, res) {
  const reqURL = url.parse(req.url, true).pathname;
  const id = reqURL.replace('/api/users/', '');
  const isDeleted = db.users.delete(id);
  if (!isDeleted) {
    notFound(res);
    return;
  }
  respond(res, undefined, 204);
}

export function getHobbies(req, res) {
  const reqURL = url.parse(req.url, true).pathname;
  const id = reqURL.replace('/api/users/', '').replace('/hobbies', '');
  const user = db.users.get(id);
  if (user == undefined) {
    notFound(res);
    return;
  }
  res.setHeader("Cache-Control", `private, max-age=${MAX_AGE}`);
  respond(res, {
    hobbies: user?.hobbies,
    links: {
      user: `/api/users/${user.id}`
    }
  });
}

export async function patchHobbies(req, res) {
  const reqURL = url.parse(req.url, true).pathname;
  const id = reqURL.replace('/api/users/', '').replace('/hobbies', '');
  const user = db.users.get(id);
  if (user == undefined) {
    notFound(res);
    return;
  }
  const oldHobbies = user?.hobbies ?? [];
  const newHobbies = (await parseRequestBody(req))?.hobbies ?? [];
  const hobbies = [...new Set([...oldHobbies, ...newHobbies])];
  const updatedUser = db.users.update(id, {
    ...user,
    hobbies
  });
  respond(res, { user: updatedUser });
}