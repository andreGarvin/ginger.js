## IDK.JS
A small stupid JavaScript framework I made for out of boredom.

```html
<body>
    <div id='app'></div>
</body>
```

```js
const app = new idk('#app')
/*
    If you do not pass a query selector
    then it checks for the <app> element
    tag
*/

// creates h1 h2 node element
var h1 = app.createElement('h1', 'Hello, World!')
var h2 = app.createElement('h2', 'Goodbye World.')
// appends to the to app DOM
app.appendToDOM([h1, h2])


// this has a time out and inserts something into a html element
    // creates a p tag element and appends to the DOM if one is not foudn on the DOM
setTimeout(() => app.insertText('p', 'This is a idk.js!'), 3000)

// setting a atribute to HTML element
app.setAttributes('div p', {
    id: 'message'
})

// a component like function
app.contructElement('hello-world' {
    attributes: {
        id: 'banner message'
    },
    text: 'Hello, World',
    img: {
        style: {
            height: '200px'
        },
        src: 'http://kids.nationalgeographic.com/content/dam/kids/photos/animals/Mammals/A-G/giant-panda-eating.ngsversion.1411231575277.adapt.1900.1.jpg'
    }
})
```

# Why did I make it ?
I made this framework/library because I was very curious on how to make a libray like jquery but some cool react-ish like component stuff. Also I wa tried of playing persona 5 for while.

### Checkout out the `app/` directory to do a playgorund for idk.js

# Documenatation
The doumentation is in the code but I will probably make a github page for the project and the documentation when I ahve the chance.

# Contributing ?
I invite everyone to contribute to this project and I am very open to new ideas and thoughts in who the projects works/looks. So send a PR about anything related to the project and also make the fucntion names funny when you create them lol.