[Slides for this markdown](https://presentations.generalassemb.ly/61cffe6ef14a0d0f042a1e172959afb0)

# Mongoose Modeling: Embedded and Referenced

---

## Learning Objectives

SWBAT:

- Create embedded schemas for Mongoose models
- Add and remove embedded documents using Mongoose
- Use the Node console to perform CRUD operations

---

## Review

1. How do you insert a route parameter into an Express route?
2. How do you access the route parameter?

---

## Playground

Let's create a node project where we can experiment with mongoose.

----

## Embedded Documents

- Mongo supports array data types for documents
- Example: A user could have multiple addresses
- This is called an embedded document because each of the items items will have an _id field associated with it

---

```js
var joe = new User({
   name: "Joe Bookreader",
   addresses: [
                {
                  street: "123 Fake Street",
                  city: "Faketon",
                  state: "MA",
                  zip: "12345"
                },
                {
                  street: "1 Some Other Street",
                  city: "Boston",
                  state: "MA",
                  zip: "12345"
                }
              ]
})
```
 
---
 
## Mongoose Embedded Documents
 
- Mongoose supports enforcing schema for embedded documents

```js
# models/user.js

var mongoose = require('mongoose')

var addressSchema = new mongoose.Schema({
	street: String, 
	city: String,
	state: String,
	zip: Number
}) 

var userSchema = new mongoose.Schema({ 
	name: String,
	addresses: [addressSchema]
})

var User = mongoose.model("User", userSchema)
module.exports = User
```

---

## Working in the node console

- Just like we used `rails c` so we could run code in a console, we can run code in a node console as well. 
- Node does not automatically include our files for us like Rails though, so we have to require our files and setup our connections manually

---

## Working in the Node console

```js
var mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/embedded-docs")

var User = require('./models/user')

# Now create the user Joe from 2 slides ago here

joe.save()
```

* Or save these first few lines in a file and use the `.load` feature of the node REPL.

---

## Create and save embedded docs

```js
joe.addresses.push({
	street: '100 Main St',
	city: 'Los Angeles',
	state: 'CA',
	zip: 90007
})

joe.save()
```

---

## Read embedded docs

- Every embedded doc has an _id associated with it just like a standard document
- `joe.addresses.id(id_you_are_looking_for)`

---

## Remove embedded docs

```js
joe.addresses.id(id_you_are_looking_for).remove();
joe.save()
```

---

## Independent Practice

- Create a model Author with the attributes:
	- name -> String
	- age -> Number
	- books -> Array
		- title -> String
		- year -> Date
- Make sure the books array is an embedded document with its own schema

---

## Independent Practice: Part 2

- Create an author in the console with a name, age, and empty array of books
- Now on your own, in the console, insert 2 books into the author document we just created

--- 

## Referenced docs

Let's take this opportunity to practice reading docs.  Here is a link to the [mongoose documentation](http://mongoosejs.com/docs/populate.html) that is relevant to our topic.

---

## Additional Resources

- [Embedded Docs](http://mongoosejs.com/docs/subdocs.html)
