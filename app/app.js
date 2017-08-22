const app = new ginger('#app')


// creates a div node => <div></div>
var div = app.createElement('div', {
    attributes: {
        id: 'sandbox'
    }
})

// appends to the elements DOM
/*
    <div id='#app'>
        <div></div>
    </div>
*/
app.appendToDOM(div)

// creates a nodeArray
/*
    var elements = [
        <p id='0'>sleep</p>,
        <p id='1'>eat</p>,
        <p id='2'>code</p>
    ]
*/
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
// var items = ['sleep', 'eat', 'code' ]
// items.forEach((item, i) => {
// })




// this is changing the title of the browser tab window
app.title('ginger.js')

// this is inserting text into a HTML element
app.insertText('h1#one', 'Hello, World!')

// this has a time out and inserts something into a html element
setTimeout(() => app.insertText('h1', 'This is a ginger.js!'), 3000)

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
