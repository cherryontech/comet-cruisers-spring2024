import React, { useState } from 'react';

const Todo = () => {
  // get saved list from storage & convert to json
  let storedLists = localStorage.getItem('todo_lists');
  let lists = JSON.parse(storedLists);
  //default json for empty storage
  let default_lists = {
    lists: [
      {
        list_name: '',
        tasks: [
          {
            checked: false,
            task_name: ''
          }
        ]
      },
      {
        list_name: 'test 2nd',
        tasks: [
          {
            checked: true,
            task_name: 'test task'
          },
          {
            checked: false,
            task_name: 'test task'
          }
        ]
      }
    ]
  };

  if (!storedLists) {
    localStorage.setItem('todo_lists', JSON.stringify(default_lists));
    lists = default_lists;
  } else {
    console.log(lists);
  }
  // init lists state
  const [listsState, setListsState] = useState(lists);

  const onListChange = (e) => {
    const { name, value } = e.target;
    const indL = e.target.getAttribute('indexlist');
    console.log(indL);

    const lists = [...listsState.lists];
    lists[indL] = {
      // keep info to the specific list
      ...listsState.lists[indL],
      //set new info
      [name]: value
    };
    setListsState({ lists });
  };
  const onTaskChange = (e) => {
    const { name, value, checked } = e.target;
    const indL = e.target.getAttribute('indexlist');
    const indT = e.target.getAttribute('indextask');

    const lists = [...listsState.lists];
    if (name == 'task_name') {
      lists[indL].tasks[indT] = {
        // keep info to the specific set
        ...listsState.lists[indL].tasks[indT],
        //set new info
        [name]: value
      };
    } else {
      lists[indL].tasks[indT] = {
        // keep info to the specific set
        ...listsState.lists[indL].tasks[indT],
        //set new info
        [name]: checked
      };
    }
    setListsState({ lists });
  };

  //html
  return (
    <div>
      <p> This is the todo list area</p>

      <form className="todolists">
        {listsState.lists.map((list, indL) => (
          <div key={indL} className="list-wrapper">
            <input
              type="text"
              name="list_name"
              value={list.list_name}
              placeholder="Enter list name"
              indexlist={indL}
              onChange={onListChange}></input>
            {list.tasks.map((task, indT) => (
              <div key={indT} className="task-wrapper">
                <input
                  className="task-input"
                  type="checkbox"
                  name="checked"
                  checked={task.checked}
                  indexlist={indL}
                  indextask={indT}
                  onChange={onTaskChange}></input>
                <input
                  type="text"
                  name="task_name"
                  value={task.task_name}
                  placeholder="Enter task name"
                  indexlist={indL}
                  indextask={indT}
                  onChange={onTaskChange}></input>
              </div>
            ))}
          </div>
        ))}
      </form>
    </div>
  );
};

export default Todo;
