import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../../redux/slices/taskSlice';

const MyWork = () => {
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading tasks...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>My Work</h2>
      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id || task._id} className="task-item">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyWork;