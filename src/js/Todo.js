import React, { useState } from 'react';

const Todo = () => {
  // get saved list from storage & convert to json
  let storedLists = localStorage.getItem('todo_lists');
  let lists = JSON.parse(storedLists);
  //default json for empty storage
  let default_lists = [
    {
      list_name: 'enter list name',
      tasks: [
        {
          checked: false,
          task_name: 'enter to_do'
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
          <div className="list-wrapper">
            <div>{l.list_name}</div>
            {l.tasks.map((task) => (
              <div>
                <input
                  className="task-input"
                  type="checkbox"
                  name="task_check"
                  checked={task.checked}></input>
                <input value={task.task_name}></input>
              </div>
            ))}
          </div>
        ))}
      </form>
    </div>
  );
};

export default Todo;
