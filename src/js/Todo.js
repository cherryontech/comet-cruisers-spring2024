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
      }
    ]
  };

  if (!storedLists) {
    localStorage.setItem('todo_lists', JSON.stringify(default_lists));
    lists = default_lists;
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
        ...listsState.lists[indL].tasks[indT],
        [name]: checked
      };
    }
    setListsState({ lists });
  };

  const addList = () => {
    const lists = [...listsState.lists];
    lists.push({
      list_name: '',
      tasks: [{ task_name: '', checked: false }]
    });
    setListsState({ lists });
  };

  const addTask = (indL) => {
    const lists = [...listsState.lists];
    lists[indL].tasks.push({ task_name: '', checked: false });
    setListsState({ lists });
  };

  const deleteList = (indL) => {
    const lists = [...listsState.lists];
    lists.splice(indL, 1);
    setListsState({ lists });
  };

  const deleteTask = (indL, indT) => {
    const lists = [...listsState.lists];
    lists[indL].tasks.splice(indT, 1);
    setListsState({ lists });
  };

  const handleFormSubmit = (e) => {
    // prevents form submitting to itself
    e.preventDefault();
    // saves to local storage
    localStorage.setItem('todo_lists', JSON.stringify(listsState));
  };

  //html
  return (
    <div>
      <p> This is the todo list area</p>

      <form className="todolists" onSubmit={handleFormSubmit}>
        <button onClick={addList}>Add List</button>
        <br />
        <br />
        {listsState.lists.map((list, indL) => (
          <div key={indL} className="list-wrapper">
            <input
              type="text"
              name="list_name"
              value={list.list_name}
              placeholder="Enter list name"
              indexlist={indL}
              onChange={onListChange}></input>
            <br />
            <button
              onClick={(event) => {
                event.preventDefault();
                deleteList(indL);
              }}>
              Delete List
            </button>
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
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    deleteTask(indL, indT);
                  }}>
                  Delete Task
                </button>
              </div>
            ))}
            <button
              onClick={(event) => {
                event.preventDefault();
                addTask(indL);
              }}>
              Add Task
            </button>
            <br />
            <br />
          </div>
        ))}
        <button type="submit">Save</button>
      </form>
      <p> This is the end of the todo list area</p>
    </div>
  );
};

export default Todo;
