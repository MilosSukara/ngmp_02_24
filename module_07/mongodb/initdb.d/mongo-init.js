db = db.getSiblingDB('ngmp');

db.createUser({
  user: 'ngmp_user',
  pwd: 'ngmp_pass',
  roles: [{
    role: 'readWrite',
    db: 'ngmp'
  }],
});
db.createCollection("users");
db.createCollection("products");
db.createCollection("carts");
db.createCollection("orders");

db.products.insertMany([
  {
    _id: "5c293ad0-19d0-41ee-baa3-4c648f9f7697",
    title: "Book",
    description: "Interesting book",
    price: 200
  },
  {
    _id: "5c293ad0-19d0-41ee-baa3-4c648f9f7612",
    title: "Pen",
    description: "Cute pen",
    price: 30
  },
]);

db.users.insertMany([
  {
    _id: '0fe36d16-49bc-4aab-a227-f84df899a6aa',
    name: "Admin",
  },
  {
    _id: '0fe36d16-49bc-4aab-a227-f84df899a6bb',
    name: "Empty Cart",
  },
  {
    _id: '0fe36d16-49bc-4aab-a227-f84df899a6cc',
    name: "No Cart",
  },
  {
    _id: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
    name: "John Doe",
  }
]);

db.carts.insertMany([
  {
    _id: "0c2eb723-9cb3-4510-96a6-9510135a2999",
    isDeleted: false,
    userId: "0fe36d16-49bc-4aab-a227-f84df899a6aa",
    items: [
      {
        product:
        {
          _id: "5c293ad0-19d0-41ee-baa3-4c648f9f7697",
          title: "Book",
          description: "Interesting book",
          price: 200
        },
        count: 2
      },
      {
        product:
        {
          _id: "5c293ad0-19d0-41ee-baa3-4c648f9f7612",
          title: "Pen",
          description: "Cute pen",
          price: 30
        },
        count: 2,
      }
    ]
  },
  {
    _id: "0c2eb723-9cb3-4510-96a6-9510135a2998",
    isDeleted: false,
    userId: "0fe36d16-49bc-4aab-a227-f84df899a6bb",
    items: []
  },
]);