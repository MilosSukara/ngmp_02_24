import { WithTime } from "./src/with_time.mjs";

const fetchFromUrl = (url, cb) => fetch(url)
  .then(res => res.json())
  .then(function (data) {
    cb(null, data);
  })
  .catch(function (err) {
    cb(err, null)
  });



const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

withTime.on('error', (err) => console.error(err));

withTime.execute(fetchFromUrl, 'https://jsonplaceholder.typicode.com/posts/1');

console.log(withTime.rawListeners("end"));