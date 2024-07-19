import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FaPlus, FaCheck, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { GrSearch } from 'react-icons/gr';
import { Createtask, DeleteTaskById, GetAllTask, UpdateTaskById } from '../api/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-toastify/dist/ReactToastify.css';

export const Task = () => {
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [copyTasks, setCopyTasks] = useState([]);
    const [updateTask, setUpdateTask] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleTask = () => {
        if (updateTask && input) {
            // Update API
            console.log(`Update API`);
            handleUpdateTask(updateTask._id, input, updateTask.isDone);
            setInput('');
        } else if (updateTask == null && input) {
            console.log(`Insert API`);
            handleAddTask();
            setInput('');
        }
    };

    useEffect(() => {
        if (updateTask) {
            setInput(updateTask.taskname);
        }
    }, [updateTask]);

    const handleAddTask = async () => {
        if (!input.trim()) {
            toast.error('Task cannot be empty.');
            return;
        }

        const obj = {
            taskname: input,
            isDone: false,
        };
        try {
            const data = await Createtask(obj);
            if (data) {
                toast.success('Task added successfully!');
                console.log(data);
            } else {
                toast.error('Failed to add task.');
            }
            setInput('');
            fetchAllTask();
        } catch (error) {
            toast.error(`Error saving data: ${error.message}`);
            console.log('Error saving data:', error);
        }
    };

    const fetchAllTask = async () => {
        try {
            const data = await GetAllTask();
            console.log('Fetched tasks:', data);
            if (Array.isArray(data.Result)) {
                setTasks(data.Result);
                setCopyTasks(data.Result);
            } else {
                console.error('Data is not an array:', data);
                setTasks([]);
                setCopyTasks([]);
            }
        } catch (error) {
            toast.error(`Error fetching data: ${error.message}`);
            console.log('Error fetching data:', error);
            setTasks([]);
            setCopyTasks([]);
        }
    };

    useEffect(() => {
        fetchAllTask();
    }, []);

    const handleDeleteTask = async (id) => {
        const checkDelete = window.confirm('Are you sure?');
        if (checkDelete) {
            try {
                const deletedata = await DeleteTaskById(id);
                if (deletedata) {
                    toast.success('Task deleted successfully!');
                    console.log(deletedata);
                } else {
                    toast.error('Failed to delete task.');
                }
                fetchAllTask();
            } catch (error) {
                toast.error(`Error fetching data: ${error.message}`);
                console.log('Error fetching data:', error);
            }
        }
    };

    const handleCheckAndUncheck = async (id, isDone) => {
        const reqBody = { isDone: !isDone };
        try {
            const updatecheckdata = await UpdateTaskById(id, reqBody);
            if (updatecheckdata) {
                toast.success('Task updated successfully!');
                console.log(updatecheckdata);
            } else {
                toast.error('Failed to update task.');
            }
            fetchAllTask();
        } catch (error) {
            toast.error(`Error fetching data: ${error.message}`);
            console.log('Error fetching data:', error);
        }
    };

    const handleUpdateTask = async (id, taskname, isDone) => {
        const reqBody = { taskname, isDone };
        try {
            const updatecheckdata = await UpdateTaskById(id, reqBody);
            if (updatecheckdata) {
                toast.success('Task updated successfully!');
                console.log(updatecheckdata);
            } else {
                toast.error('Failed to update task.');
            }
            fetchAllTask();
        } catch (error) {
            toast.error(`Error fetching data: ${error.message}`);
            console.log('Error fetching data:', error);
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (term.trim()) {
            const filteredTasks = copyTasks.filter(task =>
                task.taskname.toLowerCase().includes(term.toLowerCase())
            );
            setTasks(filteredTasks);
        } else {
            setTasks(copyTasks);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center w-50 m-auto mt-5">
            <h2 className="mb-4">Task-Manager</h2>

            <div className="d-flex justify-content-between align-items-center mb-4 w-100">
                <div className="input-group flex-grow-1 me-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="form-control me-1"
                        placeholder="Add A New Task"
                    />
                    <button onClick={handleTask} className="btn btn-success btn-sm me-2">
                        <FaPlus className="m-2" />
                    </button>
                </div>

                <div className="input-group flex-grow-1">
                    <span className="input-group-text">
                        <GrSearch />
                    </span>
                    <input
                        onChange={handleSearch}
                        value={searchTerm}
                        type="text"
                        className="form-control"
                        placeholder="Search Tasks"
                    />
                </div>
            </div>

            {/* List of items */}
            <div className="d-flex flex-column w-100">
                {Array.isArray(tasks) && tasks.length > 0 ? (
                    tasks.map((items, index) => (
                        <div key={index} className="m-2 p-2 border bg-light w-100 rounded-4 d-flex justify-content-between align-items-center">
                            <span className={items.isDone ? "text-decoration-line-through" : ""}>{items.taskname}</span>
                            <div>
                                <button
                                    onClick={() => handleCheckAndUncheck(items._id, items.isDone)}
                                    type="button" className="btn btn-success btn-sm me-2">
                                    <FaCheck />
                                </button>
                                <button
                                    onClick={() => setUpdateTask(items)}
                                    type="button" className="btn btn-primary btn-sm me-2">
                                    <FaPencilAlt />
                                </button>
                                <button
                                    onClick={() => handleDeleteTask(items._id)}
                                    type="button" className="btn btn-danger btn-sm me-2">
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p
                        style={{
                            color: 'red',
                            fontSize: '24px',
                            textAlign: 'center',
                            width: '100%',
                        }}
                        className="mb-4"
                    >
                        No tasks available.
                    </p>
                )}
            </div>

            {/* Toastify */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
            />
        </div>
    );
};

export default Task;
