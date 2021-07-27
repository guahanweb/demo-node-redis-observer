# DEMO: Node.js + Redis (observer)

Oberserver and relay for demonstrating round-trip information parsing and
translation through redis. With the listeners in this application, we can
subscribe to Redis events, do any aggregation needed to tell a story, then
publish events back into redis for the client to pick up.

**NOTE:** the intent of this layer is to show data flow *without* the app
layer connecting to this instance at all. All data flow to the backend
service should come from Redis alone.

## Getting up and running

If you wish to run this layer independently from the full stack, it is
assumed you already have a Redis image running locally on port 6379.

```sh
# clone the repo
git clone git@github.com:guahanweb/demo-node-redis-observer.git observer
cd observer

# install dependencies and run
npm install
npm run start:dev
```
