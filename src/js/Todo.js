import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable } from './StrictMode';
import Collapsible from 'react-collapsible';
import Tasks from './Tasks';
import { FaTrash } from 'react-icons/fa';

const Todo = () => {
  // default json for empty storage
  const default_lists = {
    lists: [
      {
        list_name: '',
        list_id: uuidv4(),
        isExpanded: true,
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

  // init lists state, if empty use default lists
  const [listsState, setListsState] = useState(
    () => JSON.parse(localStorage.getItem('todo_lists')) || default_lists
  );

  // auto saves the todo list for every changed made, aka state persists
  useEffect(() => {
    localStorage.setItem('todo_lists', JSON.stringify(listsState));
  }, [listsState]);

  const onListChange = (e, list_id) => {
    // get info on event target
    const { name, value } = e.target;
    // make temp object of lists
    const lists = [...listsState.lists];
    const listIndex = lists.findIndex((x) => x.list_id === list_id);
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
      isExpanded: true,
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

  const reorder = (list, startIndex, endIndex) => {
    // this is for the drag and drop
    const result = Array.from(list);
    // removes item from array
    const [removed] = result.splice(startIndex, 1);
    // moves item to designated index
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (e) => {
    if (!e.destination) {
      return;
    }
    if (e.type === 'droppableList') {
      // drag logic for lists
      const lists = [...listsState.lists];
      const sortedList = reorder(lists, e.source.index, e.destination.index);
      setListsState({ lists: sortedList });
    } else if (e.type.includes('droppableTask')) {
      // drag logic for the nested tasks in the list
      // get id of the list through type attribute
      const parent_id = e.type.split('_')[1];
      const lists = [...listsState.lists];
      const listIndex = lists.findIndex((x) => x.list_id === parent_id);
      const tasks = lists[listIndex].tasks;
      const sortedTasks = reorder(tasks, e.source.index, e.destination.index);
      // replace tasks at that list with new one
      lists[listIndex] = {
        ...listsState.lists[listIndex],
        tasks: sortedTasks
      };
      setListsState({ lists });
    }
  };
  const onCollapseClick = (index) => {
    const lists = [...listsState.lists];
    const collapseBool = lists[index].isExpanded;
    lists[index] = {
      ...listsState.lists[index],
      isExpanded: !collapseBool
    };
    setListsState({ lists });
  };

  return (
    <div className="todo-list todolist-area">
      <p className="todo-main-title bg-custom-burnt-orange text-white text-center max-w-[200px] min-h-[40px] text-2xl p-2 m-5">
        To Do
      </p>

      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable droppableId="dropListId" type="droppableList">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {listsState.lists.map((list, index) => (
                <Draggable key={list.list_id} draggableId={list.list_id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="list-wrapper">
                      <div className="list-title-wrapper flex-wrap">
                        <input
                          className="list-name bg-custom-cream placeholder:text-custom-burnt-orange min-w-[255px]"
                          type="text"
                          name="list_name"
                          value={list.list_name}
                          title={list.list_name}
                          placeholder="Enter list name"
                          onChange={(event) => {
                            onListChange(event, list.list_id);
                          }}></input>
                        <button
                          className="float-right mt-1 mr-2"
                          title="delete list"
                          onClick={() => {
                            deleteList(list.list_id);
                          }}>
                          <FaTrash style={{ color: '#0E8992' }} />
                        </button>
                        <Collapsible
                          className="tutorial-expand"
                          trigger="expand"
                          triggerWhenOpen="collapse"
                          open={list.isExpanded}
                          handleTriggerClick={() => {
                            onCollapseClick(index);
                          }}>
                          <Tasks
                            listsState={listsState}
                            setListsState={setListsState}
                            list={list}></Tasks>
                          <button
                            className="tutorial-add-task"
                            onClick={() => {
                              addTask(list.list_id);
                            }}>
                            + enter tasks, notes, ideas
                          </button>
                        </Collapsible>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>

      <button className="btn btn-primary hover ml-8" onClick={addList}>
        Add List
      </button>
    </div>
  );
};

export default Todo;
