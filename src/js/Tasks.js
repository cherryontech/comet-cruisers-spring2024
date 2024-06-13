import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable } from './StrictMode';
import { FaTrash } from 'react-icons/fa';

const Tasks = ({ listsState, setListsState, list }) => {
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

    // if statement bc task_name and checked look at different attributes
    if (name == 'checked') {
      lists[listIndex].tasks[taskIndex] = {
        ...listsState.lists[listIndex].tasks[taskIndex],
        [name]: checked
      };
    } else {
      lists[listIndex].tasks[taskIndex] = {
        ...listsState.lists[listIndex].tasks[taskIndex],
        [name]: value
      };
    }
    setListsState({ lists });
  };
  return (
    <StrictModeDroppable
      droppableId={`dropTaskId_${list.list_id}`}
      type={`droppableTask_${list.list_id}`}>
      {(provided) => (
        <div ref={provided.innerRef}>
          {list.tasks.map((task, index) => (
            <Draggable key={task.task_id} draggableId={task.task_id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  title={task.task_name}
                  className="task-wrapper mr-0 hover:border-custom-burnt-orange border-[1px]">
                  <input
                    className="task-check"
                    type="checkbox"
                    name="checked"
                    tabIndex={0}
                    checked={task.checked}
                    onChange={(event) => {
                      onTaskChange(event, list.list_id, task.task_id);
                    }}></input>
                  <input
                    className="task-name bg-custom-yellow pl-2 placeholder:text-custom-teal-base min-w-[215px]"
                    type="text"
                    name="task_name"
                    value={task.task_name}
                    placeholder="Enter task name"
                    maxLength={24}
                    onChange={(event) => {
                      onTaskChange(event, list.list_id, task.task_id);
                    }}></input>
                  <button
                    className="float-right mt-1 mr-2"
                    title="delete task"
                    onClick={() => {
                      deleteTask(list.list_id, task.task_id);
                    }}>
                    <FaTrash style={{ color: '#0E8992' }} />
                  </button>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </StrictModeDroppable>
  );
};

export default Tasks;
