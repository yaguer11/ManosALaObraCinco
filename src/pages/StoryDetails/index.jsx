import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskFormDialog from "../../components/TaskFormDialog";
import Task from "../../components/Task";
import styles from "../StoryDetails/StoryDetails.module.scss";
import Alert from "../../components/Alert";
import {
  fetchTasksByStory,
  createOrUpdateTask,
  deleteTask,
} from "../../services/tasks";
import DeleteDialog from "../../components/DeleteDialog";
import AddButton from "../../components/AddButton";
import { fetchStoryDetails } from "../../services/stories";
import Loader from "../../components/Loader";

function StoryDetails() {
  const { storyId } = useParams();
  const [story, setStory] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const showAlert = (message, type) => {
    setAlert({ visible: true, message, type });
    setTimeout(
      () => setAlert({ visible: false, message: "", type: "success" }),
      3000
    ); // Ocultar después de 3 segundos
  };

  useEffect(() => {
    fetchStoryDetails(storyId)
      .then((data) => setStory(data))
      .catch((error) =>
        showAlert("Error al recuperar storia: " + error.message, "error")
      );
    fetchTasksByStory(storyId)
      .then((data) => {
        setTasks(data.data);
      })
      .catch((error) =>
        showAlert("Error al recuperar tareas: " + error.message, "error")
      );
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
    const action = currentTask ? "actualizada" : "creada";

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
        showAlert(`Tarea ${action}`, currentTask ? "info" : "success");
        setIsDialogOpen(false);
      })
      .catch((error) =>
        showAlert("Error al guardar tarea: " + error.message, "error")
      )
      .finally(() => setIsLoading(false));
  };

  const handleDeleteTask = (task) => {
    setCurrentTask(task);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const confirmDeleteTask = () => {
    setIsLoading(true);
    deleteTask(currentTask._id)
      .then(() => {
        setTasks((prev) => prev.filter((task) => task._id !== currentTask._id));
        showAlert("Tarea eliminada", "error");
        setIsDeleteDialogOpen(false);
      })
      .catch((error) =>
        showAlert("Error al eliminar tarea: " + error.message, "error")
      )
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
      <AddButton onClick={handleAddTask} text="Agregar tarea" />
      <div className={styles.taskList}>
        {tasks?.map(
          (task) =>
            task?.name && (
              <Task
                key={task._id}
                name={task.name}
                description={task.description}
                createdAt={task.createdAt}
                dueDate={task.dueDate}
                done={task.done}
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
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onConfirm={confirmDeleteTask}
        message="¿Estás seguro de que deseas eliminar esta tarea?"
      />
      {alert.visible && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ visible: false })}
        />
      )}
    </div>
  );
}

export default StoryDetails;
