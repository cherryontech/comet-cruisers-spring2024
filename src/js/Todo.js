import React, { useState } from 'react';

const Todo = () => {
  // get saved list from storage & convert to json
  let storedLists = localStorage.getItem('todo_lists');
  let lists = JSON.parse(storedLists);
  //default json for empty storage
  let default_lists = [
    {
      list_name: '',
      tasks: [
        {
          checked: false,
          task_name: ''
        }
      ]
    }
  ];

  if (!storedLists) {
    localStorage.setItem('todo_lists', JSON.stringify(default_lists));
    lists = default_lists;
  } else {
    console.log(lists);
  }
  // init lists state
  const [listsState, setListsState] = useState(lists);

  //html
  return (
    <div>
      <p> This is the todo list area</p>
      <form className="todolists">
        {listsState.map((l, ind) => (
          <div key={l.list_name} className="list-wrapper">
            <input type="text" value={l.list_name} placeholder="enter list name"></input>
            {l.tasks.map((task) => (
              <div key={task.task_name} className="task-wrapper">
                <input
                  className="task-input"
                  type="checkbox"
                  name="task_check"
                  checked={task.checked}></input>
                <input type="text" value={task.task_name} placeholder="enter task name"></input>
              </div>
            ))}
          </div>
        ))}
      </form>
    </div>
  );
};

export default Todo;
