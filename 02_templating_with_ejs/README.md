# Views in Express

### Objectives
*After this lesson, students will be able to:*

- Create and render views in an Express application
- Explain the differences and similarities between the syntax of ERB and EJS
- Render partials and iterate over data in views

##Roadmap
* Views in Express - Intro
* Setting up our app to use EJS - Codealong
* Let's add an index!
* Change our index to render a view
* Set up your form - Independent Practice
* Add the form to index.ejs
* Create function
* Independent Practice
* Conclusion

## Views in Express - Intro (5 mins)

A lot of times, if we're looking to get a prototype up and running, we'll want to use a templating engine. Using Express out of the box, the view engine is Jade - an engine very similar to haml that relies on white space.  But if you're not familiar with haml - as we're not - EJS is another alternative that's easy to set up and comparable to the embedded ruby (ERB) we've used in Rails.

Since, we have an app that's build out - for the most part - let’s focus on how to add views using EJS, include partials and passing data to our views.  We will be using the candies app as our starter code.  The only thing I have added is a basic stylesheet and required the path module plus static assets like we did in a previous lesson.

## Setting up our app to use EJS - Codealong (10 mins)

First, let's add `ejs` to our project:

```bash
npm install ejs --save
```

Now, let's take a look at our `server.js` file and add the following in our configuration section:

```javascript
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
```

Let's look at a few things going on here: `path` is a core Node module dealing with paths.  In our example, we've added the path.join() method. For us, this normalizes all the arguments into a path string which will help when we use the `dirname` global and a file or folder.  After adding this, our app's view folder will look like:  `/Users/your_username/your_projects_folder/app/views`

It won't check for an existing path but it will transform the path string.

The second app.set() tells Express to use the ejs templating engine. This allows you to embed JavaScript to work with data with conditionals in your views.  For example, choosing not to render partials if a user is already logged in. The file path to your view files now will be `.ejs`

The middle line requires the `ejs` module in our app for files it encounters with the `.ejs` file extension.

Since we're ready to use `.ejs` now, let's set up our file structure to make sure our application can call the files properly. Create the following folder:

```
mkdir views

```

We will be placing all of our templates in this folder, since that is where we told express to look.

## Let's add an index!

First, lets create a candies folder inside our views folder and then create index.ejs inside of that:

```bash
mkdir views/candies
touch views/candies/index.ejs
```

Now lets fill in our index ejs template.  Create your usual html skeleton and let's add a title and bring in some stylesheets:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Candy App</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="stylesheets/main.css" />
  </head>
```

Again, even though this is an `.ejs` file we're able to write html because we've set up our app to use the ejs templating engine, which can render HTML with embedded JavaScript.

Now, we're going to do two things.  First, because we're assuming we're at the `/candies` endpoint, we'll have the `candies` object with all of our candies and the associated attributes.  So let's iterate over that object with JavaScript.  Just like you would in Ruby, you specify that what's being read is JavaScript with opening and closing `<% %>`, if you want the code to execute; `<%= %>` if you want the code to execute and render on the browser.  

Inside the body, let's show all of our candies, with the name and color:

```html
	<body>
	  <h1>
	    <a target="_blank" href="https://www.youtube.com/watch?v=mKli0y-Xr-Q">Candy Shoppe</a>
	  </h1>
	  <div class="container">
	  <% for(var i=0; i< candies.length; i++) {  %>
	    <ul>
	      <li><b>Name : </b> <%= candies[i].name %></li>
	      <li><b>Color : </b> <%= candies[i].color %></li>
	    </ul>
	  <% } %>
	  </div>
	</body>
</html>
```

## Change our index to render a view

Now that we have an index page, time to make our application render views instead of json.

Let's make our index function respond with an ejs template instead of json.:

**In our controllers/candies.js:**

```javascript
function index(req, res) {
  res.render('candies/index', {candies: candies});
}
```

Notice, we must pass the view an object containing our candies so we can access them in the view.

Check your browser, you should now be seeing a list of candies.

## Set up your form - Independent Practice (10 mins)

Ok, you've done this before.  Set up your form real quick using pure HTML in `candies/form.ejs` with:

- A header that says "Create Candy!"
- A form with a POST method that submits to the `/candies` endpoint
- Two inputs for name and color that have `form-control classes` and placeholders

  - These two inputs should be wrapped in their own divs both having a class `form-group col-md-4`

- A submit button with a type of `submit` and a value of `Submit`

  - This input should be wrapped a div with a `form-group col-md-4` class

## Add the form to index.ejs

Now, just like Rails, we can use partials within our layout.ejs page.  The method is `include` instead of `render`, though:

```html
...
	<hr>
	<div class="container">
		<% include ./form %>
	</div>
...
```

Now you're `layout.ejs` page should look like this:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Candy App</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="stylesheets/main.css" />
  </head>
  <body>
    <h1>
      <a target="_blank" href="https://www.youtube.com/watch?v=mKli0y-Xr-Q">Candy Shoppe</a>
    </h1>
    <div class="container">
    <% for(var i=0; i< candies.length; i++) {  %>
      <ul>
        <li><b>Name : </b> <%= candies[i].name %></li>
        <li><b>Color : </b> <%= candies[i].color %></li>
      </ul>
    <% } %>
    </div>
    <hr>
    <div class="container">
      <% include ./form %>
    </div>
  </body>
</html>

```


## Create function

Change your controller to respond to the POST request from the form by redirecting to the candies index.  If you want to get fancy, try and figure out how to add the right id to the candy before you add it to the candies array.


## Independent Practice

Expand on this application by doing the following:

- Create a footer as a separate partial and render it in the index.ejs file
  - In the footer add in "Candies ©"
- Add an update link with the to each candy on your `/candies` page
- Allow users to update information about their candy
- Allow users to delete their candy

Use these [docs](http://www.embeddedjs.com/getting_started.html).
To make a form do a patch, put or delete, you will need [method-override](https://www.npmjs.com/package/method-override)



## Conclusion (5 mins)
- Describe how `ejs` compares to `erb`.
- Describe how to configure your Express app to use `ejs`.
- Identify some `ejs`-specific syntax used to use different partials.
