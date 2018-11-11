"use strict";
// set order constiables here - for order a-z and 0-9 (ids)
let order, orderAZ;
const todoFunctions = {
  
  // generate id - increments by 1 for each new item
  generateId: (function() {
    let idCounter;
    // starting from no items
    if (!(localStorage.getItem('todos'))){
      idCounter = 0;
    }
    // starting from x items saved in localStorage
    else {
      let countIndex = localStorage.getItem('todos');
      idCounter = countIndex.length-1
    }
    function incrementCounter() {
      return (idCounter += 1);
    }
    return incrementCounter;
  })(),

  // create a copy of the todos array
  cloneArrayOfObjects: function(todos) {
    return todos.map(function(todo) {
      // send to localStorage
      if (!(localStorage.getItem('todos'))){
        localStorage.setItem('todos', JSON.stringify(todos));
      }
      return JSON.parse(JSON.stringify(todo));
    });
  },

  // this will take a description, then convert it to an object
  createTodo: function(str){
    return {id:todoFunctions.generateId(), description: str, done: false}
  },

  // create a new item and push to the end of the array
  addTodo: function(todos, newItem) {
    const newTodo = this.createTodo(newItem);
    return this.cloneArrayOfObjects(todos).concat(newTodo);
  },

  // delete an item
  deleteTodo: function(todos, idToDelete) {
    return this.cloneArrayOfObjects(todos).filter(todo => todo.id !== idToDelete)
  },

  // mark an item, based on its id
  markTodo: function(todos, idToMark) {
    return this.cloneArrayOfObjects(todos).map(todo => {

      // todo = clicked AND already checked done, remove done
      if(todo.id == idToMark && todo.done == true){
        return {...todo, done: false}
      }
      // todo = clicked OR already checked done, add done
      else if(todo.id == idToMark || todo.done == true){
        return {...todo, done: true}
      }
      // else, must be false
      else {
        return {...todo, done: false}
      }
    })
  },

  
  // sort by ID
  sortFunction: function(todos) {
    // this function feeds in to sortTodos - keep it pure hopefully
    // - sort by ID
    order = !order;
    return this.cloneArrayOfObjects(todos).sort(function(a, b) {
      // first flip of order
      if (order) {
        return b.id - a.id;
      }
      // second flip
      else {
        return a.id - b.id;
      }
      
    });
  },
  sortTodos: function(todos, sortFunction) {
    const sortedTodos = this.sortFunction(todos);
    return this.cloneArrayOfObjects(sortedTodos);
  },

  
  // sort a to z
  // - 0 to 9 comes first, then a-z
  sortFunctionAZ: function(todos) {
    orderAZ = !orderAZ;
    return this.cloneArrayOfObjects(todos).sort(function(a, b) {
      // first flip of order
      if (orderAZ) {
        return (a.description < b.description) ? 1 : -1;
      }
      // second flip of order
      else {
        return (b.description < a.description) ? 1 : -1;
      }      
    });
  },
  sortAtoZ: function(todos) {
    const sortedTodos = this.sortFunctionAZ(todos);
    return this.cloneArrayOfObjects(sortedTodos);
  }
};

// For running code in the browser and with node.js (for testing purposes)
// http://www.matteoagosti.com/blog/2013/02/24/writing-javascript-modules-for-both-browser-and-node/
// if (typeof module !== "undefined") {
//   module.exports = todoFunctions;
// }