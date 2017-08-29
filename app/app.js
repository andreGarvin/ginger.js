const app = new idk()


app.router({
    '/': app.createElement('h1', `query: ${ app.appRoutes.params.q }`),
    '/about': app.createElement('p', 'This is testing the router for idk.js')
})
// todo list app
// app.title('idk.js')
// var todoItems = [
//   'eat',
//   'sleep',
//   'code'
// ]
//
// function addNewItem( input ) {
//   if ( input.length > 0 ) {
//     todoItems.push( input )
//     showTodoItems()
//   }
// }
//
// function showTodoItems() {
//   let nodeArray = todoItems.map((item, i) => {
//     return app.createElement('li', item, {
//       attributes: {
//         id: i,
//         class: 'todoItem'
//       }
//     })
//   })
//
//   app.insertText('#itemsCount', todoItems.length)
//   app.insertToDOM('#TODOitem', nodeArray)
// }
// showTodoItems()
//
// app.onKeyPressDown('input', e => {
//   if ( e.key === 'Enter' ) {
//     addNewItem( app.val('input') )
//     app.val('input', '')
//   }
// })

/*

// More things you can do with idk.js

app.bindInputToElement('input', '#search')

var nodeArray = ['h1', 'h2', 'h3'].map((nodeName, i) => {
    return app.createElement(nodeName, {
              attributes: {
                id: i,
                class: 'node'
              },
              text: `This is a <${ nodeName }> tag.`
        })
})
app.appendToDOM(nodeArray)

var h1 = app.createElement('h1', 'Hello, World!')
var h2 = app.createElement('h2', 'Goodbye World.')
app.appendToDOM([h1, h2])

// creates a div node => <div></div>
var div = app.createElement('div', {
    attributes: {
        id: 'sandbox'
    }
})

// appends to the elements DOM
    // <div id='#app'>
    //     <div></div>
    // </div>
app.appendToDOM(div)

// creates a nodeArray
    // var elements = [
    //     <p id='0'>sleep</p>,
    //     <p id='1'>eat</p>,
    //     <p id='2'>code</p>
    // ]

var items = ['sleep', 'eat', 'code' ]
var nodeArray = items.map((item, i) => {
    return app.createElement('p', item, {
        attributes: {
            id: i
        }
    })
})

// appends this nodeArray to the div on the appDOM
app.appendToDOM(div, nodeArray)


app.appendToDOM('div',
    app.createElement('p', {
        attributes: {
            id: 'i'
        },
        text: 'hello, world'
    })
)

// or
var items = ['sleep', 'eat', 'code' ]
items.forEach((item, i) => {
      app.appendToDOM('#app p',{
          attributes: {
              id: i
          },
          text: item
      })
})


// this is changing the title of the browser tab window
app.title('idk.js')

// this is inserting text into a HTML element
app.insertText('h1#one', 'Hello, World!')

// this has a time out and inserts something into a html element
setTimeout(() => app.insertText('h1', 'This is a idk.js!'), 3000)

// click handler
app.click('button', e => {
    // eventObj
    console.log('event object: ', e )

    // remove display in app view
    app.display('h1#one', 'none')

    // set time out to add back the elements display in app view
    setTimeout(() => app.display('h1'), 3300)
})

// key press handler
app.onKeyPress('input', e => {
    // getting the input elements value
    const inputValue = app.val('input')

    // checkoit if the key equals the enter key
    if (e.key === 'Enter' && inputValue.length !== 0) {
        // logging to the console the value from the input feild
        console.log( inputValue )
    }
})

// making async HTTP request to a API
app.fetch('https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC', resp => {
    console.log( resp )
})

// setting a atribute to HTML element
app.setAttributes('div p', {
    id: 'message'
})

// this is a click handler with a switxh functionality
app.switch('.btn',
    e => app.display('#message', 'none'),
    e => app.display('#message')
)

// two way data binding between a inpuit feild and a HTML element
app.bindInputToElement('input', 'h1')


// purely experimental might remove it
app.constructElement('div', {
    attributes: {
        class: 'todo-items-container',
        style: {
            'background-color': 'red',
            color: 'white'
        }
    },
    p: {
        attributes: {
            style: {
                color: 'blue'
            },
        },
        text: 'hello, world'
    },
    img: {
        attributes: {
            style: {
                height: '200px'
            },
            src: 'http://kids.nationalgeographic.com/content/dam/kids/photos/animals/Mammals/A-G/giant-panda-eating.ngsversion.1411231575277.adapt.1900.1.jpg'
        }
    },
    childern: {
        ul: ['code', 'sleep', 'code'].map((item, i) => {
            return app.createElement('li', {
                attributes: {
                    id: i
                },
                text: item
            })
        })
    }
})
*/
