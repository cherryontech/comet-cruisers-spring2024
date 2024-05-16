import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable } from './StrictMode';

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
                  className="task-wrapper">
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
