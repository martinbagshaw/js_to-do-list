"use strict";
// keep everything hidden from rest of app with an IIFE
(function() {
    // This is the dom node where we will keep our todo
    const container = document.getElementById('todo-container');
    const addTodoForm = document.getElementById('add-todo');
  
    let stateDefault = [
      { id: -3, description: 'first todo sample', done: false },
      { id: -2, description: 'second todo sample', done: false },
      { id: -1, description: 'third todo sample', done: false },
    ]; // this is our initial todoList

    let state = JSON.parse(localStorage.getItem('todos')) || stateDefault;
  
    // This function takes a todo, it returns the DOM node representing that todo
    const createTodoNode = function(todo) {
      
      // create list item
      const todoNode = document.createElement('li');

      // add description
      const childNode = document.createElement('span');
      childNode.textContent = todo.description;
      todoNode.appendChild(childNode);

     
      // add markTodo button
      const markButtonNode = document.createElement('button');
      markButtonNode.textContent = '✔';
      markButtonNode.setAttribute('class', 'mark');
      markButtonNode.setAttribute('aria-label', 'checked button');

      // mark checked off items
      if(todo.done){
        markButtonNode.classList.add('checked-off');
        todoNode.classList.add('checked-off');
      }

      // mark button click
      markButtonNode.addEventListener('click', function(event) {
        const newState = todoFunctions.markTodo(state, todo.id);
        update(newState);
      });
      todoNode.appendChild(markButtonNode);

      
      // this adds the delete button
      const deleteButtonNode = document.createElement('button');
      deleteButtonNode.textContent = "X";
      deleteButtonNode.setAttribute('class', 'delete');
      deleteButtonNode.setAttribute('aria-label', 'delete button');
      
      // delete button click
      deleteButtonNode.addEventListener('click', function(event) {
        const newState = todoFunctions.deleteTodo(state, todo.id);
        update(newState);
      });
      todoNode.appendChild(deleteButtonNode);
  
      return todoNode;
    };
  
    // bind create todo form
    if (addTodoForm) {
      addTodoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const description = event.target.getElementsByTagName('input')[0].value;
        // description must be 1 character long minimum
        if(description.length<1) return false;  
        // add to do item to list
        const newTodo = todoFunctions.addTodo(state, description);
        const newState = [...newTodo];
        update(newState);
        // reset form
        addTodoForm.reset();
      });
    }



    // add sort buttons (added in DOM, without js)
    // - sort by id (order entered)
    const zeroToNine = document.getElementById('sort-0-to-9');
    zeroToNine.addEventListener('click', function(event) {
      const newState = todoFunctions.sortTodos(state);
      update(newState);
      zeroToNine.classList.toggle('reverse');
    });

    // - need to sort by description a-z
    const aToz = document.getElementById('sort-a-to-z');
    aToz.addEventListener('click', function(event) {
      const newState = todoFunctions.sortAtoZ(state);
      update(newState);
      aToz.classList.toggle('reverse');
    });
  



    // you should not need to change this function
    // - update localStorage stuff here
    const update = function(newState) {
      state = newState;
      localStorage.setItem('todos', JSON.stringify(state));
      renderState(state);
    };
  
    // you do not need to change this function
    const renderState = function(state) {
      const todoListNode = document.createElement('ul');
      state.forEach(function(todo) {
        todoListNode.appendChild(createTodoNode(todo));
      });
      // you may want to add a class for css
      container.replaceChild(todoListNode, container.firstChild);
    };
  
    if (container) renderState(state);
  })();
  
