# Personal Todo List
## A continuation of todo list project from Week 2 of Founders and Coders :white_check_mark:

- Stripped out all testing stuff (previously executed with Tape)
- Added [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) so you don't lose todo items on browser refresh
- Extended sort functionality to sort items alphabetically
- Tweaked css to make it easier to use:
    - fixed header on form / footer
    - strike/line through checked off items
    - adjusted padding to take up less space on small screens
- Converted to ES6
- Removed autocomplete on text input (autocomplete dropdown took up a lot of screen space)

![Austin Powers todo list](http://i.imgur.com/osRGl.jpg)

### Future Goals :soccer:

- Use a database to store information in, rather than localStorage
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), and [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) may be the best way of retrieving information from a database. [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker) may be a good way to cache data.
