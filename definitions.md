# Definitions

Rough draft of terminology used in the project.

## Container

Object that can register multiple factories, which provide several types of
products. It can then handle requests for products by delegating those requests
to appropriate factories and providing them with dependencies.

## Scope

Container that can cache products and delegate product requests to another
scope (parent scope) if it can't handle them.

## Factory

Function that defines what kind of product it can create and what kind of
dependencies it needs to be able to create that product. Returns the product.

## Product

Object that has been created as a result of request to the container, created
by a factory function. Can usually be cached.
