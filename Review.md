# Review Questions

## What is Node.js?
A runtime environment that lets us use JS beyond the browser, such as in writing servers.

## What is Express?
Express is a framework that works with Node.js, providing routing and middleware functionality.

## Mention two parts of Express that you learned about this week.
1. Routing, i.e. breaking up the application into parts based on the route.
2. Middleware, including both custom middleware and third-party middleware like cors, morgan, and helmet.

## What is Middleware?
Middleware are functions that have access to the request and response bodies. It can make changes to these bodies, halt the request/response cycle, and execute code or push to the next middleware function.

## What is a Resource?
Everything! Resources are the pieces of data in a database that can be managed with an API. 

## What can the API return to help clients know if a request was successful?
HTTP Status Codes. The specific code depends on the request, but successful codes are generally found in the 200 block.

## How can we partition our application into sub-applications?
By type, by feature, or by a hybrid of the two (type then feature or feature then type).

## What is express.json() and why do we need it?
It's a built-in middleware that allows us to parse content from JSON in request bodies. We also need it to be able to opt-in to other pieces of middleware. 