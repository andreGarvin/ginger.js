/**
* @typedef {document} appDOM
* This is the DOM that the getElementById() returns back to ginger class
* after the constructor has been intialized
*/

/**
 * @typedef {(node|object)} nodeObject
 * This is the node that is return after creation from the document API methods
 * giving you access to the its protoyes and properties
 */

/**
* @typedef {object} eventObj
* This is a modified event object of the event object that is passed
* through the event listeners on the DOM.
*/

/**
* @typedef {object} nodeObj
* This is my version a nodeObj, a very slimed down version of the {nodeObject}
* holding properties attributes, text, parentNode, tagName, childern
*/

/**
 * @typedef {array} arrayOfNodes
 * This is a array of {nodeObject} \s.
 */

/**
 * @typedef {(string|nodeObject|arrayOfNodes)} context
 * This is the content that is given it can be string, a {nodeObject} , or {nodeArray} .
 */


/**
 * @function
 * This function takes the event passed from a 'addEventListener' triggered on
 * DOM and modifies the peices wanted from that event Object.
 * @param {eventObj} eventObj Descrtiptin in the typedef of 'eventObj'
 * @returns {eventObj}
 */
function returnEventObj( eventObj ) {
      // creatign default event props in 'newEventObj'
      let newEventObj = {
          altKey: eventObj.altKey,
          crtlKey: eventObj.ctrlKey,
          shiftKey: eventObj.shiftKey,

          srcElement: eventObj.srcElement,
          defaultPrevented: eventObj.defaultPrevented,

          path: eventObj.path.slice(0, -1),
          type: eventObj.type[0] !== 'k' ? eventObj.type : 'keypress'
      }

      switch ( newEventObj.type ) {
        case 'click':
                newEventObj.fromElement = eventObj.fromElement
                newEventObj.button = eventObj.button
                newEventObj.clientCoordinates = {
                  x: eventObj.clientX,
                  y: eventObj.clientY
                }
              break
        case 'keypress':
                newEventObj.key = eventObj.key
                newEventObj.keyCode = eventObj.keyCode
              break
      }
      return newEventObj
}

// these are two small fucnions that help aroudn the code base to reduce repetive code
const isEmptyObj = ( obj ) => Object.keys( obj ).length === 0 ? true : false;
const isObject = ( dataType ) => typeof dataType === 'object' && !Array.isArray(dataType) ? true : false

/**
  * @classdesc This is a the ginger class that maniputes the element on the DOM,
  * given a element id that targets that element as a application DOM.
  * Allowing to manipulate other lements on the the {appDOM}
  * @param {string} appId This is string of the id selector
  * @class
 */
function idk( appId ) {
    // this the actual DOM of the web page
    this.document = document

    this.location = window.location

    // This is the elements DOM or 'nodeObj'
        // - if the appId was not given then check if for a HTML element/node call 'app'
    this.appDOM = appId === undefined ? this.document.querySelector('app') : this.document.getElementById(appId.slice(1))

    if ( this.appDOM !== null ) {

        /**
         * This fucntion Evalutes the node Obj that was passed and attaching
         * that props and data to the node
         * @param {string} propName The key on the {nodeObj} and name of the attribute
         * @param {nodeObject} node This is the node that is being passed to add
         * added attributes to
         * @param {(object|string)} propValue This is the value of the value of the propName
         * of the property from the {nodeObj} is could be ethier a object or string
         * @function
         */
        function evalNodeObj( node, propName, propValue ) {
              // gets the this.appDOM passed to the fucntion because 'this'
              // is not bind the class idk
              let appDOM = Array.from( arguments ).slice(-1)[0]
              switch ( propName ) {
                  // appends text to the node
                  case 'text':
                        // add the node context as a node text
                        nodeContext = this.document.createTextNode(propValue);
                        // apppend that context to the 'newNode'
                        node.appendChild(nodeContext);
                      break
                  // sets the attributes to the node
                  case 'attributes':
                      return appDOM.setAttributes(node, propValue)
                  // sets the styles of the node and gets the propValue of the
                  // style object and concatinates the key with its value to the styleStr
                  case 'style':
                          var styleStr = '';
                          for (var s in propValue) {
                              styleStr += `${s}: ${propValue[s]};`
                          }
                        return appDOM.setAttributes(node, { style: styleStr })
              }
        }

        /**
         * idk it thought it would be usful I guess, it takes a {context}
         * This method sets the context to the web app's title
         * @param {context} context This descibed in the context typedef
         */
        this.title = ( context ) => this.document.title = context;

        /**
         * Dispite have the longest turtils I have ever done; This method returns a
         * boolean value weather or not the element of the query string or {nodeObject}
         * is inside the {appDOM}
         * @param {(string|nodeObject)} el This is a query selector of HTML
         * element or a {nodeObject}
         * @returns {boolean}
         */
        this.inAppDOM = ( el ) => typeof el === 'string' ? this.appDOM.querySelectorAll(el).length > 0 ? true : false : el.parentNode !== null ? true : false

        /**
         * This method returns back the first element found on the {appDOM} or
         * the specfic element query slected on the {appDOM}
         * @param {string} el This is a query selector of HTML element
         * @returns {nodeObject}
         */
        this.getElement = function( el ) {
              try {
                  return this.appDOM.querySelector(el)
              } catch (e) {
                  throw new Error(`idk.js: ${ el }${ el.class ? el.class : el.id ? el.id : ''  } is a undefined element on your your appDOM.`)
              }
        }

        /**
         * This method returns back the parent of the HTML element/node or
         * query string selected if is node not have a parent it returns back
         * the nodes parentNode value
         * @param {(string|nodeObject)} el This is a query selector of HTML element
         * @returns {nodeObject}
         */
        this.getParentNode = function( el ) {
            try {
                // if the 'parentNode' value is null then return the nodes 'parentNode' value
                return this.appDOM.querySelector(el).parentNode || el.parentNode
            } catch (e) {
                throw new Error(`idk.js: ${ el }${ el.class ? el.class : el.id ? el.id : ''  } is a undefined element on your your appDOM.`)
            }
        }

        /**
         * This method creates a HTML elemnet or a custom tag and returns back
         * that element/ {nodeObject} and sets any atrributes if given a {nodeObj}
         * and appends/injects whatever the {context} that was given.
         * @param {string} nodeName name of the desired node/HTML element
         * @param {(string|context)} context This is described in the typedef of context
         * @param {nodeObj} nodeObj This is descirbed in the typedef of {nodeObj}
         * @returns {nodeObject}
         */
        this.createElement = function( nodeName, context, nodeObj ) {
            if ( nodeName ) {

                // creates the node element that is empty with no childern or parent node
                let newNode = this.document.createElement(nodeName)

                // checks if a context was given, if the undefined a nodeObj was replaced as the context
                if ( context !== undefined ) {

                    if ( typeof context === 'string' ) {
                        // add the node context as a node text
                        nodeContext = this.document.createTextNode(context);
                        // apppend that context to the 'newNode'
                        newNode.appendChild(nodeContext);

                        // if a nodeObj was given assign all the props from the attributes
                        // prop to the new node
                        if ( nodeObj !== undefined && ( nodeObj.attributes !== undefined && !isEmptyObj( nodeObj.attributes ) ) ) {
                            this.setAttributes(newNode, nodeObj.attributes)
                        }
                        return newNode
                    } else if ( Array.isArray(context) ) {
                        // if the context is a nodeArray
                        Array.prototype.forEach.call(context, node => {
                            newNode.appendChild(node)
                        })
                        return newNode
                    } else if ( isObject(context) ) {
                        nodeObj = context
                        for (let prop in nodeObj) {
                            if ( nodeObj[prop] !== undefined ) {
                                evalNodeObj(newNode, prop, nodeObj[prop])
                            }
                        }
                    }
                }
                // if there was no nodeName given then return undefined elese return the newNode
                return nodeName === undefined ? undefined : newNode
            }
        }

        /**
         * This method sets the attributes from the {nodeObj} referred to as
         * 'attributeObj' to the HTMl/node or query string given of {nodeObject} that was
         * passed to this method
         * @param {(string|nodeObject)} el This is a query selector of HTML
         * element
         * @param {nodeObj} attributeObj A reflect of the {nodeObj} ojbject
         * descibed in the typeof
         */
        this.setAttributes = function( el, attributeObj ) {
            if ( el !== undefined && attributeObj !== undefined ) {
                /*
                  if the el is a string return pass the query string into the
                  querySelectorAll() to get all 'nodeObjects' / elements on the
                  appDOM or return back the the el placed inside of a array.
                */
                let nodeQuerys = typeof el === 'string' ? this.document.querySelectorAll(el) : [el]
                // iterates over all the nodes in the nodeQuerys array and sets
                // the attributes from attributeObj given to each node in the appDOM
                Array.prototype.forEach.call(nodeQuerys, node => {
                    for (var i in attributeObj) {
                        // pass the the style object to the eval evalNodeObj
                        if ( i === 'style' && isObject( attributeObj[i] ) ) {
                            evalNodeObj(node, i, attributeObj[i])
                        } else {
                            node.setAttribute(i, attributeObj[i])
                        }
                    }
                })
            } else {
                throw new Error(`idk.js: ${ attributeObj === undefined ? 'Must provide a target element to set Attribute' : '' }.`)
            }
        }

        /**
         * This method returns a object of all the attributes on a certain HTML
         * element or {nodeObject}
         * @param {(string|nodeObject)} el This is a query selector of HTML element
         * @returns {object}
         */
        this.getAttributes = function( el ) {
            // if the el was a query string then pass that into querySelector
            // if not then it must be a nodeObject and just assign that to el
            el = typeof el === 'string' ? this.appDOM.querySelector(el) : el,
                attributes = {};
            Array.prototype.forEach.call(el.attributes, prop => {
                attributes[prop.name] = prop.value;
            })
            return attributes
        }

        /**
         * This method apppends a node to the {appDOM} or creates and appends a
         * HTML element/node/{nodeObject} to the {appDOM}
         * @param {(string|nodeObject)} el This is a query selector of HTML element or a {nodeObject}
         * @param {context} context This is described in the typedef of context
         * @return {appDOM}
         */
        this.appendToDOM = function( el, context ) {
            if ( Array.isArray( el ) || Array.isArray( context ) ) {
                // is the context is a array/nodeArray then use that as the nodes or the el that is array/nodeArray
                Array.prototype.forEach.call(Array.isArray(context) ? context : el, node => {
                    /*
                        if 'el' is a nodeObject then append to that node to the appDOM
                        else if 'el' is a string pass 'el' to appendToDOM() and the node
                        and it that not ture append to the appDOM
                    */
                    return isObject(el) && !Array.isArray(el) ? el.appendChild(node) : typeof el === 'string' ? this.appendToDOM(el, node) : this.appendToDOM(node)
                })
                return
            } else if ( isObject(el) ) {
                  // if el is nodeObject
                  if ( context === undefined ) {
                      return this.appDOM.appendChild(el)
                  } else {
                      // if the createElement was given a constructorObj
                      const constructorObj = Array.from( arguments ).slice(-1)[0]

                      if ( this.inAppDOM(el) || constructorObj.type === 'constructor' ) {
                          return el.appendChild(context)
                      } else {
                          throw new Error(`idk.js: ${ el }${ el.class ? el.class : el.id ? el.id : ''  } is a undefined element on your your appDOM.`)
                      }
                  }
            } else {
                  let parentNode, nodeName;
                  el = el.split(' ').length > 1 ? el.split(' ') : el

                  // checks to see if the query string was given a 'parentNode' name
                  if ( Array.isArray( el ) ) {
                      // ex: [ 'div.container', 'div#first', 'p' ]
                      parentNode = el.slice(-2, -1)[0] // 'div#first'

                      // if the 'parentNode' was found in the 'appDOM'
                      if ( this.inAppDOM(parentNode) ) {
                          let childName = el.slice(-1)[0]

                          // creates the element if the element and appens to the 'parnetNode' or the 'appDOM'
                          this.appendToDOM(
                              this.createElement(childName, context, {
                                  parentNode: this.document.querySelector(parentNode).localName || this.appDOM.localName
                              })
                          )
                      } else {
                          throw new Error(`idk.js: ${ el }${ el.class ? el.class : el.id ? el.id : ''  } is a undefined element on your your appDOM.`)
                      }
                  } else {
                      // if the el was string that had no parentNode

                      // check if  el is a string of body or the 'appId' name pass
                      // 'this.appDOM' in a array or check get all the elements on the 'appDOM'
                      var nodeQuerys = el === 'body' || el === appId ? [this.appDOM] : this.appDOM.querySelectorAll(el)

                      if ( nodeQuerys.length !== 0 ) {
                          // appends the context to all the nodes that were found and matche query string
                          Array.prototype.forEach.call(nodeQuerys, node => {
                                if ( isObject(context) ) {
                                    node.appendChild(context)
                                } else {
                                    node.appendChild(this.document.createTextNode(context))
                                }
                          })
                      } else {
                          // if some data was given append it to the appDOM
                          if ( el !== undefined && context === undefined ) {
                              this.appDOM.appendChild(
                                  this.document.createTextNode(el)
                              )
                          } else {
                              throw new Error(`idk.js: ${ el }${ el.class ? el.class : el.id ? el.id : ''  } is a undefined element on your your appDOM.`)
                          }
                      }
                  }
            }
        }

        /**
         * This method inserts text into a HTML element/ node
         * @param {(string|nodeObject)} el This is a query selector of HTML element
         * @param {(string|number)} context the context can be a string or a number
         */
        this.insertText = function( el, context ) {
              el = typeof el === 'string' ? this.appDOM.querySelectorAll(el) : [el]
              if ( typeof context === 'string' || typeof context === 'number' ) {
                  Array.prototype.forEach.call(el, node => {
                      node.innerHTML = context;
                  })
              } else {
                  throw new Error(`idk.js: This method takes data type of string, given context is of type ${ typeof context }`)
              }
        }

        /**
         * This method is catches keypresses events
         * @param {string} elementName The name of the HTML element
         * @param {function} handler This the callback return back from the method
         * @return {function}
         */
        this.onKeyPress = function( elementName, handler ) {
            let elements = this.appDOM.querySelectorAll(elementName)
            Array.prototype.forEach.call(elements, node => {
                  // check if the node event is a keypress
                  node.addEventListener('keypress', e => {
                      // get the event Object that was passed from the callback
                      e = returnEventObj(e)
                      // return new event object
                      return handler(e)
                  })
            })
        }

        /**
         * This method is catches keyup presses events
         * @param {string} elementName The name of the HTML element
         * @param {function} handler This the callback return back from the method
         * @return {function}
         */
        this.onKeyPressUp = function( elementName, handler ) {
            let elements = this.appDOM.querySelectorAll(elementName)
            Array.prototype.forEach.call(elements, node => {
                  // check if the node event is a keyup
                  node.addEventListener('keyup', e => {
                      // get the event Object that was passed from the callback
                      e = returnEventObj(e)
                      // return new event object
                      return handler(e)
                  })
            })
        }

        /**
         * This method is catches keydown presses events
         * @param {string} elementName The name of the HTML element
         * @param {function} handler This the callback return back from the method
         * @return {function}
         */
        this.onKeyPressDown = function( elementName, handler ) {
            let elements = this.appDOM.querySelectorAll(elementName)
            Array.prototype.forEach.call(elements, node => {
                  // check if the node event is a keydown
                  node.addEventListener('keydown', e => {
                      // get the event Object that was passed from the callback
                      e = returnEventObj(e)
                      // return new event object
                      return handler(e)
                  })
            })
        }

        /**
         * This method is like switch to trigger to different functions when clicked like a click
         * @param {string} trgEl
         * @param {function} func1
         * @param {function} func2
         * @return {function}
         */
        this.switch = function( trgEl, func1, func2 ) {
            var clicked = false;

            this.click(trgEl, e => {
                  if ( clicked === true ) {
                      clicked = false;
                      return func2( e )
                  }
                  clicked = true;
                  return func1( e )
            })
        }

        this.router = function(route, render) {
            const routerObj = {
                path: window.location.pathname,
                host: window.location.host,
                port: window.location.port,
                proto: window.location.protocal,
                pathVariable: {},
                params: {},
                getPathVaiables: function() {},
                getParams: function() {
                    let params = window.location.search

                    console.log( params )
                }
            }
            routerObj.getParams()

            // if (route === routerObj.path) {
            //     if (render.toString().split(' ').includes('return')) {
            //       this.insertToDOM(this.appDOM, render(routerObj))
            //     }
            //     return render(routerObj)
            // }
            // else if (route.split(':'))
        }


        /**
         * This method contsructs a a custom element or a HTML structure,
         * this is almost liek beuilding a component but not really, it is a
         * very ugly way of doing it
         * @param {(string|nodeObject)} elementName This is a HTML element/node or query string
         * @param {nodeObj} nodeObj This is descibed in the nodeObj
         */
        this.constructElement = function(elementName, nodeObj) {
              if ( typeof elementName === 'string' ) {
                  const constructedNode = this.createElement(elementName, nodeObj === undefined ? undefined : { attributes: nodeObj.attributes } )
                  for (let prop in nodeObj) {
                        if  ( prop !== 'attributes' ) {
                            switch ( prop ) {
                                 case 'childern':
                                        if ( isObject(nodeObj[prop]) ) {
                                            for (let c in nodeObj[prop]) {
                                                this.appendToDOM(constructedNode,
                                                    this.createElement(c,nodeObj[prop][c]),
                                                    { type: 'constructor', data: nodeObj[prop] }
                                                )
                                            }
                                        } else if ( Array.isArray(nodeObj[prop]) ) {
                                            for(let c in nodeObj[prop]) {
                                                this.appendToDOM(constructedNode,
                                                    nodeObj[prop][c],
                                                    { type: 'constructor', data: nodeObj[prop] }
                                                )
                                            }
                                        }
                                      break
                                 default:
                                       this.appendToDOM(constructedNode,
                                           this.createElement(prop, nodeObj[prop]),
                                           { type: 'constructor', data: nodeObj[prop] }
                                       )
                                     break
                            }
                        }
                  }

                  this.appendToDOM(constructedNode)
              } else {
                 throw new Error(`ikd.js: Element could not bre construcuted check you nodeObject for any errors.`)
              }
        }

        /**
         * This method is a click handler that returns a callback passing back the event Object
         * @param {(string|nodeObject)} el This is a query selector of HTML element
         * @param {function} handler This the callback return back from the method
         * @return {function}
         */
        this.click = function( el, handler ) {
            let elements = isObject(el) ? el : this.appDOM.querySelectorAll(el)
            Array.prototype.forEach.call(elements, node => {
                  // check if the node event is a keydown
                  node.addEventListener('click', e => {
                       // get the event Object that was passed from the callback
                       e = returnEventObj(e)
                       // return new event object
                       return handler(e)
                  })
            })
        }

        /**
         * This method displays or hides the HTML elements or nodes on the appDOM
         * deppening on the 'action'
         * @param {(string|nodeObject)} el This is a query selector of HTML element or a node Object
         * @param {string} action
         */
        this.display = function( el, action ) {
            let elements = isObject(el) && !Array.isArray(el) ? el : this.appDOM.querySelectorAll(el)
            Array.prototype.forEach.call(elements, node => {
                return node.style.display = action === undefined ? '' : 'none'
            })
        }

        /**
         * This method transfers to another website or opens the wbesite in another tab
         * @param {string} url a regular url
         * @param {string} action This is a argument determines weather to open in the same tab or different tab
         */
        this.goTo = function(url, action) {
            try{
                window.open(url, action === 'new-tab' ? '_blank' : '_self')
            } catch (e) {
                throw new Error(e)
            }
        }

        /**
         * This method gets the value of given input feild nodeObject or query string
         * @param {(string|nodeObject)} el This is a query selector of HTML element or a node Object
         * @param {string} context This is the string passed to this method
         * @return {string}
         */
        this.val = function( el, context ) {
            let elements = isObject(el) ? el : this.appDOM.querySelectorAll(el)
            if ( context !== undefined && context !== null ) {
                // sets the value of all the input feild to the gven context
                Array.prototype.forEach.call(elements, node => {
                    node.value = context.toString()
                })
            } else {
                // returns back the last input feilds value
                return elements[elements.length - 1].value
            }
        }

        /**
         * This ethod makes a HTTP GET request to API's using the native API
         * fetch to make the calls and return a callabck of the data and the
         * status of the API call.
         * @param {string} url A regualr url to a API or server returning JSON
         * @param {function} callback the fucntion returned once the request is
         * finished async
         * @return {function}
         */
        this.fetch = function( url, callback ) {
            const respObj = {};

            fetch(url)
                .then(resp => {
                    respObj.url = resp.url
                    respObj.type = resp.type
                    respObj.statusCode = resp.status
                    respObj.statusText = resp.statusText ? resp.statusText : 'ok'

                    resp.json()
                        .then(respJSON => {
                            respObj.data = respJSON
                            return callback( respObj )
                        })
                        .catch(() => {
                            return callback( respObj )
                        })
                })
                .catch(err => {
                    respObj.err = err
                    return callback( respObj )
                })
        }

        /**
         * This method allows two way data binding between a node/HTML element
         * on any keypress the data from the input fileds value will be inserted
         * into the HTML element or node
         * such as a p, h1-6, li, etc with a input feild.
         * @param {(string|nodeObject)} trgInput This can be either a query string or nodeObject
         * @param {(string|nodeObject)} trgEl This can be either a query string or nodeObject
         */
        this.bindInputToElement = function( trgInput, trgEl ) {
            this.onKeyPressUp(trgInput, e => {
                this.insertText(trgEl, this.val(trgInput))
            })
            this.onKeyPress(trgInput, e => {
                this.insertText(trgEl, this.val(trgInput))
            })
            this.onKeyPressDown(trgInput, e => {
                this.insertText(trgEl, this.val(trgInput))
            })
        }

        /**
         * This method inserts a given context to a certain element or node in the appDOM
         * @param {(string|nodeObject)} el This is a query selector of HTML element or a node Object
         * @param {context} context This is described in the typedef of context
         */
        this.insertToDOM = function( el, context ) {
              if ( Array.isArray( el ) || Array.isArray( context ) ) {
                  if ( typeof el === 'string' ) {
                      var nodeQuerys = el === 'body' || el === appId ? [this.appDOM] : this.appDOM.querySelectorAll(el)

                      if ( nodeQuerys.length !== 0 ) {
                          Array.prototype.forEach.call(nodeQuerys, node => {
                              if ( typeof context !== 'object' ) {
                                  node.innerHTML = context
                              } else {
                                  node.innerHTML = ''
                                  this.appendToDOM(node, context)
                              }
                          })
                      } else {
                          throw new Error(`idk.js: ${ el }${ el.class ? el.class : el.id ? el.id : ''  } is a undefined element on your your appDOM.`)
                      }
                      return
                } else if ( !Array.isArray(el) ) {
                      el.innerHTML = '';
                } else {
                      this.appDOM.innerHTML = '';
                }

                nodeArray = Array.isArray( context ) ? context : el;
                Array.prototype.forEach.call(nodeArray, node => {
                    return !Array.isArray(el) ? this.appendToDOM(el, node) : this.appDOM.appendChild(node)
                })
            } else if ( isObject(el) ) {
                  if ( context === undefined ) {
                      this.appDOM.innerHTML = ''
                      this.appDOM.appendChild(el)
                  } else {
                      if ( this.inAppDOM(el) ) {
                          if ( isObject(context) ) {
                              el.innerHTML = ''
                              this.appendToDOM(el, context)
                          } else {
                              el.innerHTML = context
                          }
                      } else {
                          throw new Error(`idk.js: ${ el }${ el.class ? el.class : el.id ? el.id : ''  } is a undefined element on your your appDOM.`)
                      }
                  }
            } else {
                  let parentNode, nodeName;
                  splitStrEl = el.split(' ').length > 1 ? el.split(' ') : el

                  if ( Array.isArray( splitStrEl ) ) {
                      // ex: [ 'div.container', 'div#first', 'p' ]
                      parentNode = el.slice(-2, -1)[0] // 'div#first'
                      if ( this.inAppDOM(parentNode) ) {
                          this.insertToDOM(
                              this.createElement(el.slice(-1)[0], context, {
                                  parentNode: this.document.querySelector(parentNode).localName || this.appDOM.localName
                              })
                          )
                      } else {
                          throw new Error(`idk.js: Element ${ parentNode } does not exist in your appDOM.`)
                      }
                  } else if ( typeof el === 'string' ) {
                      var nodeQuerys = el === 'body' || el === appId ? [this.appDOM] : this.appDOM.querySelectorAll(el)

                      if ( nodeQuerys.length !== 0 ) {
                          Array.prototype.forEach.call(nodeQuerys, node => {
                              if ( isObject(context) ) {
                                  node.innerHTML = context
                              } else {
                                  node.innerHTML = ''
                                  this.appendToDOM(node, context)
                              }
                          })
                      } else {
                          if ( el !== undefined && context === undefined ) {
                              this.appDOM.innerHTML = el
                          } else {
                              throw new Error(`idk.js: ${ el }${ el.class ? el.class : el.id ? el.id : ''  } is a undefined element on your your appDOM.`)
                          }
                      }
                      return
                }
            }
        }

    } else {
        return new Error(`idk.js: id '${ appId }' does not exist.`)
    }
}
