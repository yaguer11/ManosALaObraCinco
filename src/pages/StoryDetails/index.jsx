import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskFormDialog from "../../components/TaskFormDialog";
import Task from "../../components/Task";
import styles from "../StoryDetails/StoryDetails.module.scss";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import {
  fetchStory,
  fetchTasksByStory,
  createOrUpdateTask,
  deleteTask,
} from "../../services/api";
import Loader from "../../components/Loader";

function StoryDetails() {
  const { storyId } = useParams();
  const [story, setStory] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchStory(storyId)
      .then((data) => setStory(data))
      .catch((error) => console.error("Error fetching story:", error));
    fetchTasksByStory(storyId)
      .then((data) => {
        setTasks(data.data);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, [storyId]);

  const handleAddTask = () => {
    setCurrentTask(null);
    setIsDialogOpen(true);
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setIsDialogOpen(true);
  };

  const handleSubmitTask = (taskData) => {
    setIsLoading(true);
    createOrUpdateTask(taskData, currentTask?._id, storyId)
      .then((data) => {
        setTasks((prev) => {
          if (currentTask) {
            return prev.map((task) =>
              task._id === currentTask._id ? { ...task, ...data.task } : task
            );
          }
          return [...prev, data.task];
        });
        setIsDialogOpen(false);
      })
      .catch((error) => console.error("Error saving task:", error))
      .finally(() => setIsLoading(false));
  };

  const handleDeleteTask = (task) => {
    setCurrentTask(task);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteTask = () => {
    setIsLoading(true);
    deleteTask(currentTask._id)
      .then(() => {
        setTasks((prev) => prev.filter((task) => task._id !== currentTask._id));
        setIsDeleteDialogOpen(false);
      })
      .catch((error) => console.error("Error deleting task:", error))
      .finally(() => setIsLoading(false));
  };

  if (!story)
    return (
      <div>
        <Loader />
      </div>
    );

  return (
    <div className={styles.container}>
      <h1 className={styles.name}>{story.name}</h1>
      <p className={styles.description}>{story.description}</p>
      <button onClick={handleAddTask} className={styles.addTaskButton}>
        <IoMdAdd className={styles.logo} />
        Agregar
      </button>
      <div className={styles.taskList}>
        {tasks?.map(
          (task) =>
            task?.name && (
              <Task
                key={task._id}
                texto={task.name}
                onEditar={() => handleEditTask(task)}
                onEliminar={() => handleDeleteTask(task)}
              />
            )
        )}
      </div>
      <TaskFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmitTask}
        initialData={currentTask}
        isLoading={isLoading}
      />
      {isDeleteDialogOpen && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialogContent}>
            <h2>Eliminar</h2>
            <p>
              ¿Estás seguro de que deseas eliminar la tarea &quot;
              {currentTask?.name}&quot;?
            </p>
            <div className={styles.buttons}>
              <button
                className={styles.cancelar}
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                <RxCross2 />
                Cancelar
              </button>
              <button
                className={styles.eliminar}
                onClick={confirmDeleteTask}
                disabled={isLoading}
              >
                <MdDelete />
                {isLoading ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StoryDetails;
