/**
* @typedef {DOM} appDOM
* This is the DOM that the getElementById() returns back to ginger class
* after the constructor has been intialized
*/

/**
 * @typedef {object} nodeObject
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
 * @typedef {(string|nodeObject|nodeObj|arrayOfNodes)} context
 * This is the contentx
 */


/**
 * @function
 * This function takes the event passed from a 'addEventListener' triggered on
 * DOM and modifies the peices wanted from that event Object.
 * @param {eventObj} eventObj Descrtiptin in the typedef of 'eventObj'
 * @returns {eventObj}
 */
function returnEventObj( eventObj ) {
      let newEventObj = {
          altKey: eventObj.altKey,
          crtlKey: eventObj.ctrlKey,
          shiftKey: eventObj.shiftKey,

          srcElement: eventObj.srcElement,
          defaultPrevented: eventObj.defaultPrevented,

          path: eventObj.path,
          type: eventObj.type
      }

      switch ( eventObj.type ) {
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


/**
 * @function
 * Returns a boolean value of weather a object is empty or not.
 * @param {object} obj a object
 * @returns {boolean}
 */
const isEmptyObj = ( obj ) => Object.keys( obj ).length === 0 ? true : false;

/**
  * @classdesc This is a the ginger class that maniputes the element on the DOM,
  * given a element id that targets that element as a application DOM.
  * Allowing to manipulate other lements on the the {appDOM}
  * @param {string} appId This is string of the id selector
  * @class
 */
function ginger( appId ) {
    // this the actual DOM of the web page
    this.document = document
    /**
     * This is the elements DOM or {nodeObj}
     */
    this.appDOM = this.document.getElementById(appId.slice(1))

    // checks if the appDOM exist on the DOM
    if ( this.appDOM !== null ) {

          /**
           * Evaluets the node Obj that was passed and attaching that props and data to the node
           * @param {string} propName
           * @param {nodeObject} node
           * @param {nodeObj} object
           */
          function evalNodeObj( propName, node, nodeObj ) {
                switch ( propName ) {
                    case 'text':
                        // add the node context as a node text
                        nodeContext = this.document.createTextNode(nodeObj[propName]);
                        // apppend that context to the 'newNode'
                        node.appendChild(nodeContext);

                        break
                    case 'attributes':
                        new ginger(appId).setAttributes(node, nodeObj.attributes)

                        break
                }
          }

        /**
         * This is assigns the {context} to the title element of the webpages {DOM}
         * @param {context} context This description on context is described on
         * the typdef
         */
        this.title = ( context ) => this.document.title = context;

        /**
         * Dispate the longest tutils I have ven don this is method returns a
         * boolean value wather the element of the query string or {nodeObject}
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
        this.getElement =  function( el ) {
              try {
                  return this.appDOM.querySelector(el)
              } catch (e) {
                  throw new Error(`ginger.js: Element <${ el }> is out of ${ appId } scope.`)
              }
        }

        /**
         * Returns back the parent of the element query string selected on the
         * {appDOM} or a {nodeObject}
         * @param {(string|nodeObject)} el This is a query selector of HTML element
         * @returns {nodeObject}
         */
        this.getParentNode = function( el ) {
            try {
                return this.appDOM.querySelector(el).parentNode || el.parentNode
            } catch (e) {
                throw new Error(`ginger.js: Element <${ el }> is out of ${ appId } scope.`)
            }
        }

        /**
         * This method creates a HTML elemnet or a custom tag and returns back
         * that element/ {nodeObject} and sets any atrributes if given a {nodeObj}
         * and appends/injects whateve the {context} that was given.
         * @param {string} nodeName name of the desired node/HTML element
         * @param {(string|context)} context This is described in the typedef of {context}
         * @param {nodeObj} nodeObj This is descirbed in the typedef of {nodeObj}
         * @returns {nodeObject}
         */
        this.createElement = function( nodeName, context, nodeObj ) {
            // creates the node element that is empty with no childern or parent node
            let newNode = this.document.createElement(nodeName)

            // checks if a context was given in not or a nodeObj
            // was replaced as the conext
            if ( context !== undefined ) {

                if ( typeof context === 'string' ) {
                    // add the node context as a node text
                    nodeContext = this.document.createTextNode(context);
                    // apppend that context to the 'newNode'
                    newNode.appendChild(nodeContext);

                    // if a nodeObj was given assign all the props from the attributes
                    // prop to the new node
                    if ( ( nodeObj !== undefined ) && nodeObj.attributes !== undefined && !isEmptyObj( nodeObj.attributes ) ) {
                        this.setAttributes(newNode, nodeObj.attributes)
                    }
                    return newNode
                } else if ( Array.isArray(context) ) {
                    // if the context is a nodeArray
                    Array.prototype.forEach.call(context, node => {
                        newNode.appendChild(node)
                    })
                    return newNode
                } else if ( typeof context === 'object' ) {
                    nodeObj = context
                    for (let e in nodeObj) {
                        if ( nodeObj[e] !== undefined ) {
                            evalNodeObj(e, newNode, nodeObj)
                        }
                    }
                }
            }
            return nodeName === undefined ? undefined : newNode
        }

        /**
         * This methods sets the attributes from the {nodeObj} referred to as
         * 'attributeObj' to the element query string of {nodeObject} that was
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
                        node.setAttribute(i, attributeObj[i])
                    }
                })
            } else {
                throw new Error(`ginger.js: ${ attributeObj === undefined ? 'Must provide a target element to set Attribute' : '' }.`)
            }
        }

        /**
         * This method returns a object of all the attributes on a certain HTML
         * element or {nodeObject}
         * @param {(string|nodeObject)} el This is a query selector of HTML element
         * @returns {object}
         */
        this.getAttributes = function( el ) {
            el = typeof el === 'string' ? this.appDOM.querySelector(el) : el,
                attributes = {};
            Array.prototype.forEach.call(el.attributes, i => {
                attributes[i.name] = i.value;
            })
            return attributes
        }

        /**
         * This method apppends a node to the {appDOM} or creates and appends a
         * HTML element/node/{nodeObject} to the {appDOM}
         * @param {(string|nodeObject)} el
         * @param {(string|context)} context
         * @return {appDOM}
         */
        this.appendToDOM = function( el, context ) {
            if ( Array.isArray( el ) || Array.isArray( context ) ) {
                // is the context is a array/nodeArray then use that as the nodes or the el that is array/nodeArray
                Array.prototype.forEach.call(Array.isArray( context ) ? context : el, i => {
                    // if 'el' is a nodeObject then append to that node to the appDOM else append to the appDOM
                    return typeof el === 'object' ? el.appendChild(i) : this.appendToDOM(i)
                })
            } else if ( ( el !== undefined && typeof el === 'object' ) && context === undefined ) {
                  return this.appDOM.appendChild(el)
            } else if ( typeof el === 'object' && context !== undefined ) {
                return this.appendToDOM(el.appendChild(context))
            } else {
                  let parentNode, nodeName;
                  el = el.split(' ').length > 1 ? el.split(' ') : el

                  if ( Array.isArray( el ) ) {
                      // ex: [ 'div.container', 'div#first', 'p' ]
                      parentNode = el.slice(-2, -1)[0] // 'div#first'
                      if ( this.document.querySelector(parentNode) !== null ) {
                          app.appendToDOM(
                              newNode = this.createElement(el.slice(-1)[0], context, {
                                  parentNode: this.document.querySelector(parentNode).localName || this.appDOM.localName
                              })
                          )
                      } else {
                          throw new Error(`ginger.js: element ${ parentNode } does not exist in your appDOM.`)
                      }
                  } else {
                      var nodeQuerys = el === 'body' || el === appId ? [this.appDOM] : this.appDOM.querySelectorAll(el)

                      if ( typeof el === 'string' && context !== undefined ) {
                          if ( nodeQuerys.length !== 0 ) {
                              if ( ![ 'div', 'span', 'ul', 'header', 'article' ].includes(el) ) {
                                  return this.appDOM.appendChild(this.createElement(el, context))
                              }
                              Array.prototype.forEach.call(nodeQuerys, node => {
                                  if ( typeof context !== 'object' ) {
                                      return node.appendChild(this.document.createTextNode(context))
                                  } else {
                                      return node.appendChild( context )
                                  }
                              })
                          } else {
                              throw new Error(`ginger.js: ${ el } is a undefined element on your your appDOM.`)
                          }
                      }
                  }
            }
        }

        /**
         * This method inserts text into a node element
         * @param {(string|nodeObject)} el
         * @param {string} context
         */
        this.insertText = function( el, context ) {
            el = this.appDOM.querySelectorAll(el) || el
            if ( typeof context === 'string' ) {
                Array.prototype.forEach.call(el, node => {
                    node.innerHTML = context;
                })
            } else {
                throw new Error(`ginger.js: This method takes data type of string, given context is of type ${ typeof context }`)
            }
        }


        this.onKeyPress = function( elementName, handler ) {
            let elements = this.appDOM.querySelectorAll(elementName)
            Array.prototype.forEach.call(elements, node => {
                  node.addEventListener('keypress', e => {
                      e = returnEventObj(e)
                      return handler(e)
                  })
            })
        }

        this.onKeyPressUp = function( elementName, handler ) {
            let elements = this.appDOM.querySelectorAll(elementName)
            Array.prototype.forEach.call(elements, node => {
                  node.addEventListener('keyup', e => {
                      e = returnEventObj(e)
                      return handler(e)
                  })
            })
        }

        this.onKeyPressDown = function( elementName, handler ) {
            let elements = this.appDOM.querySelectorAll(elementName)
            Array.prototype.forEach.call(elements, node => {
                  node.addEventListener('keydown', e => {
                      e = returnEventObj(e)
                      return handler(e)
                  })
            })
        }

        this.switch = function( trgEl, func1, func2 ) {
            var clicked = false;

            this.click(trgEl, e => {
                  console.log( clicked )
                  if ( clicked === true ) {
                      clicked = false;
                      return func2( e )
                  }
                  clicked = true;
                  return func1( e )
            })
        }

        this.click = function( elementName, handler ) {
            let elements = this.appDOM.querySelectorAll(elementName)
            Array.prototype.forEach.call(elements, node => {
                  node.addEventListener('click', e => {
                       e = returnEventObj(e)
                       return handler(e)
                  })
            })
        }

        this.display = function( el, action ) {
            let elements = this.appDOM.querySelectorAll(el)
            Array.prototype.forEach.call(elements, node => {
                 return node.style.display = action === undefined ? '' : 'none'
            })
        }

        this.goTo = function(url, action) {
            try{
                window.open(url, action === 'new-tab' ? '_blank' : '_self')
            } catch (e) {
                return new Error(e)
            }
        }

        this.val = function( el, context ) {
            let elements = this.appDOM.querySelectorAll(el)
            if ( context ) {
                Array.prototype.forEach.call(elements, node => {
                    return node.value = context
                })
            } else {
                return elements[elements.length - 1].value
            }
        }

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
                    return callback( err )
                })
        }

        this.bindInputToElement = function( trgInput, trgEl ) {
            this.onKeyPressUp(trgInput, e => {
                this.insertText(trgEl, this.val(trgInput))
            })
            this.onKeyPressDown(trgInput, e => {
                this.insertText(trgEl, this.val(trgInput))
            })
        }

    } else {
        return new Error(`ginger.js: id '${ appId }' does not exist.`)
    }
}







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
