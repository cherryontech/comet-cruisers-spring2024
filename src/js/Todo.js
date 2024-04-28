import React from 'react';

const Todo = () => {
  // init lists state
  //const [listsState, setListsState] = useState();

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
  } else {
    lists;
  }

  //html
  return (
    <div>
      <p> This is the todo list area</p>
    </div>
  );
};

export default Todo;
