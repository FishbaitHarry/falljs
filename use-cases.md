# Use Cases

The following example applications are supposed to be very easy to create using
this library. Example code will be provided and default configuration should be
able to handle it out of the box.

## Middle-of-chain Microservice

Web application that accepts REST-like requests for a single kind of resource,
sends two or more REST-like requests to other services to gather data, then
merges this data, transforms it into correct format and sends a response to the
original caller.

## Persistent Resource Provider

Web application that accepts REST-like requests to GET, PUT, POST and DELETE
a single type of resource (like Users or Todos) and uses a built-in database
adapter to abstract the persistence.

## Full-stack Real-time "Todo MVC"

Web application that handles HTML requests by serving a page that shows a list
of todos (or any other kind of resource), allows the user to add/edit/delete
these resources and to see changes done by other uses in real-time. It should
not be clear which parts of the application are run on the server/client.
