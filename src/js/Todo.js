import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable } from './StrictMode';

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // saves to local storage
    localStorage.setItem('todo_lists', JSON.stringify(listsState));
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    // removes item from array
    const [removed] = result.splice(startIndex, 1);
    // moves item to designated index
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (e) => {
    console.log(e);
    if (!e.destination) {
      return;
    }
    const lists = [...listsState.lists];
    const sorted = reorder(lists, e.source.index, e.destination.index);
    console.log(sorted);
    setListsState({ lists: sorted });
  };

  // window.addEventListener('beforeunload', () => {
  //   // auto save when going to other site (does nt work within site routes)
  //   localStorage.setItem('todo_lists', JSON.stringify(listsState));
  // });

  //html
  return (
    <div>
      <p> This is the todo list area</p>
      <DragDropContext onDragEnd={onDragEnd}>
        <button onClick={addList}>Add List</button>
        <StrictModeDroppable droppableId="Table">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <div>
                {listsState.lists.map((list, index) => (
                  <Draggable
                    key={list.list_id}
                    draggableId={list.list_id}
                    index={index}
                    className="list-wrapper">
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
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
                        <Task
                          listsState={listsState}
                          setListsState={setListsState}
                          list={list}></Task>
                        <button
                          onClick={() => {
                            addTask(list.list_id);
                          }}>
                          Add Task
                        </button>
                        <br />
                        <br />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </StrictModeDroppable>
        <button onClick={handleFormSubmit}>Save</button>
      </DragDropContext>

      <p> This is the end of the todo list area</p>
    </div>
  );
};

const Task = ({ listsState, setListsState, list }) => {
  const deleteTask = (list_id, task_id) => {
    const lists = [...listsState.lists];
    const listIndex = lists.findIndex((x) => x.list_id === list_id);
    const taskIndex = lists[listIndex].tasks.findIndex((x) => x.task_id === task_id);
    lists[listIndex].tasks.splice(taskIndex, 1);
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
  return (
    <div>
      <div>
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
      </div>
    </div>
  );
};

export default Todo;
