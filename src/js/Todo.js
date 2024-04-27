import React, { useState } from "react";

const Todo = () => {
    // get saved list from storage & convert to json
    let storedLists = localStorage.getItetm('todo_lists');
    let lists = JSON.parse(storedLists);
    //default json for empty storage
    let default_lists  = {
        lists: [{
            list_name: 'enter list name',
            tasks: [{
                checked: false,
                task_name: 'enter to_do'
            }]
        }]
    }
    
    if (!storedLists){
        localStorage.setItem('todo_lists', JSON.stringify(default_list))
    } else {

    }

}