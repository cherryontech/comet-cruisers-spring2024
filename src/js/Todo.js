import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Todo = () => {
  // get saved list from storage & convert to json
  let storedLists = JSON.parse(localStorage.getItem('todo_lists'));
  let lists = storedLists;
  // default json for empty storage
  let default_lists = {
    lists: [
      {
        list_name: '',
        list_id: uuidv4(),
        tasks: [
          {
            checked: false,
            task_name: '',
            task_id: uuidv4()
          }
        ]
      }
    ]
  };

  if (!storedLists) {
    // if there is no store info save default into local storage
    localStorage.setItem('todo_lists', JSON.stringify(default_lists));
    // set default to current lists
    lists = default_lists;
  }

  // init lists state
  const [listsState, setListsState] = useState(lists);

  const onListChange = (e, list_id) => {
    // get info on event target
    const { name, value } = e.target;
    // make temp object of lists
    const lists = [...listsState.lists];
    let listIndex = lists.findIndex((x) => x.list_id === list_id);
    // edit that specific event
    lists[listIndex] = {
      ...listsState.lists[listIndex],
      [name]: value
    };
    // change listState to the temp list
    setListsState({ lists });
  };

  const onTaskChange = (e, list_id, task_id) => {
    const { name, value, checked } = e.target;
    const lists = [...listsState.lists];
    const listIndex = lists.findIndex((x) => x.list_id === list_id);
    const taskIndex = lists[listIndex].tasks.findIndex((x) => x.task_id === task_id);

    // if statement bc task_name and checked look at diffreent attributes
    if (name == 'task_name') {
      lists[listIndex].tasks[taskIndex] = {
        ...listsState.lists[listIndex].tasks[taskIndex],
        [name]: value
      };
    } else {
      lists[listIndex].tasks[taskIndex] = {
        ...listsState.lists[listIndex].tasks[taskIndex],
        [name]: checked
      };
    }
    setListsState({ lists });
  };

  const addList = () => {
    const lists = [...listsState.lists];
    lists.push({
      list_name: '',
      list_id: uuidv4(),
      tasks: [{ task_name: '', checked: false, task_id: uuidv4() }]
    });
    setListsState({ lists });
  };

  const addTask = (list_id) => {
    const lists = [...listsState.lists];
    const listIndex = lists.findIndex((x) => x.list_id === list_id);
    lists[listIndex].tasks.push({
      task_name: '',
      checked: false,
      task_id: uuidv4()
    });
    setListsState({ lists });
  };

  const deleteList = (list_id) => {
    const lists = [...listsState.lists];
    const index = lists.findIndex((x) => x.list_id === list_id);
    lists.splice(index, 1);
    setListsState({ lists });
  };

  const deleteTask = (list_id, task_id) => {
    const lists = [...listsState.lists];
    const listIndex = lists.findIndex((x) => x.list_id === list_id);
    const taskIndex = lists[listIndex].tasks.findIndex((x) => x.task_id === task_id);
    lists[listIndex].tasks.splice(taskIndex, 1);
    setListsState({ lists });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // saves to local storage
    localStorage.setItem('todo_lists', JSON.stringify(listsState));
  };

  // window.addEventListener('beforeunload', () => {
  //   // auto save when going to other site (does nt work within site routes)
  //   localStorage.setItem('todo_lists', JSON.stringify(listsState));
  // });

  //html
  return (
    <div>
      <p> This is the todo list area</p>

      <form className="todolists" onSubmit={handleFormSubmit}>
        <button onClick={addList}>Add List</button>
        <br />
        <br />
        {listsState.lists.map((list) => (
          <div key={list.list_id} className="list-wrapper">
            <input
              type="text"
              name="list_name"
              value={list.list_name}
              placeholder="Enter list name"
              onChange={(event) => {
                onListChange(event, list.list_id);
              }}></input>
            <br />
            <button
              onClick={() => {
                deleteList(list.list_id);
              }}>
              Delete List
            </button>
            {list.tasks.map((task) => (
              <div key={task.task_id} className="task-wrapper">
                <input
                  className="task-input"
                  type="checkbox"
                  name="checked"
                  checked={task.checked}
                  onChange={(event) => {
                    onTaskChange(event, list.list_id, task.task_id);
                  }}></input>
                <input
                  type="text"
                  name="task_name"
                  value={task.task_name}
                  placeholder="Enter task name"
                  onChange={(event) => {
                    onTaskChange(event, list.list_id, task.task_id);
                  }}></input>
                <button
                  onClick={() => {
                    deleteTask(list.list_id, task.task_id);
                  }}>
                  Delete Task
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                addTask(list.list_id);
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
