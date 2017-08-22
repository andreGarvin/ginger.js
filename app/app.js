const app = new ginger('#app')

/*
  var elements = [
      <p id='0'>sleep</p>,
      <p id='1'>eat</p>,
      <p id='2'>code</p>
  ]
*/
var div = app.createElement('div')
app.appendToDOM(div)
var items = ['sleep', 'eat', 'code' ]
// items.forEach((item, i) => {
//     app.appendToDOM('div',
//         app.createElement('p', item, {
//             attributes: {
//                 id: i
//             }
//         })
//     )
// })
app.appendToDOM(div, app.createElement('p', 'hello, world!'))




// // this is changing the title of the browser tab window
// app.title('ginger.js')
//
//   // this is inserting text into a HTML element
// app.insertText('h1#one', 'Hello, World!')
//
// // this has a time out and inserts something into a html element
// setTimeout(() => app.insertText('h1', 'This is a ginger.js!'), 3000)
//
// // click handler
// app.click('button', e => {
//     // eventObj
//     console.log('event object: ', e )
//
//     // remove display in app view
//     app.display('h1#one', 'none')
//
//     // set time out to add back the elements display in app view
//     setTimeout(() => app.display('h1'), 3300)
// })
//
// // key press handler
// app.onKeyPress('input', e => {
//     // getting the input elements value
//     const inputValue = app.val('input')
//
//     // checkoit if the key equals the enter key
//     if (e.key === 'Enter' && inputValue.length !== 0) {
//         // logging to the console the value from the input feild
//         console.log( inputValue )
//     }
// })
//
// // making async HTTP request to a API
// app.fetch('https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC', resp => {
//     console.log( resp )
// })
//
// app.insertText('div p', 'This is a message')
//
// // setting a atribute to HTML element
// app.setAttribute('div p', {
//     id: 'message'
// })
//
// // this is a click handler with a switxh functionality
// app.switch('.btn',
//     e => app.display('#message', 'none'),
//     e => app.display('#message')
// )
//
// // two way data binding between a inpuit feild and a HTML element
// app.bindInputToElement('input', 'h1')

// app.constructElement('ul', {
//     attributes: {
//         class: 'todo-items-container'
//     },
//     p: 'hello, world'
//     childern: {
//         li: TODOITEMS.map(( todo, i ) => {
//               return {
//                   attributes: {
//                       id: i,
//                       class: 'todo-item'
//                   },
//                   text: todo
//               }
//         })
//     }
// })

// <ul class='todo-item-container'>
//     <li id='1' class='todo-item'>Sleep</li>
// </ul>

// var todoItems = [ 'make a TODO app with ginger.js' ];
//
// app.insertText('#itemsCount', todoItems.length)
//
//
// // todoItems = todoItems.forEach(i => app.append('ul #TODO-item li', i) )
// //
// // app.onKeyPressDown('input', e => {
// //     const inputVlaue = app.val('input')
// //     if ( e.key === 'Enter' && inputVlaue.length ) {
// //         app.append('ul #TODO-item li', inputVlaue)
// //     }
// // })
//
// app.append('#TODO-item li', 'sleep', {
//     attribute: {
//         id: 2
//     },
//     parentNode: '#TODO-items'
// })
//
//
// async app.constructElement('div', {
//       p: {
//           text: 'Hello, world',
//           attributes: {
//               id: 'message',
//               class: 'para'
//           }
//       },
//       img: {
//           atrributes: {
//               src: 'https://www.google.com/someimage.jpg',
//               class: 'img firstOne'
//           }
//       },
//       div: {
//           attributes: {
//               id: 'todoItems'
//           },
//           childern: {
//               ul: await TODO.map(i => app.createElement('li', i))
//           }
//     },
//     button: {
//         onEvent: {
//             onClick: function() {
//                 alert('nsnjdjnknjsanjk')
//             }
//         },
//         text: 'click me!'
//     }
// })


// if ( nodeObj.parentNode !== undefined ) {
//     return nodeObj.parentNode.appendChild(newNode)
// } else {
//     return this.appDOM.appendChild(newNode)
// }

// if ( ['ul', 'ol' ].includes( el.toLowerCase() ) ) {
//     return this.createElement('li', context, this.appDOM.querySelectorAll(el) || this.appDOM)
// } else if ( [ 'div', 'span' ].includes( el.toLowerCase() ) ) {
//     return this.createElement(el, context)
// }

// else {
//
//     if ( context === undefined && el !== undefined ) {
//         context = el
//         return this.appDOM.appendChild(this.document.createTextNode(context))
//     } else {
//
//         if ( this.appDOM.querySelectorAll(el).length !== 0 ) {
//             Array.prototype.forEach.call(document.querySelectorAll(el), node => {
//                 try {
//                     node.appendChild(context)
//                 } catch (e) {
//                     node.appendChild(this.createElement(el, context))
//                 }
//             })
//         } else {
//             // this.createElement(el, context)
//         }
//     }
// }
