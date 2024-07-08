import React, { useState } from "react";

// Define the Task interface
interface Task {
  id: number;
  content: string;
}

// Define the KanbanBoard component
const KanbanBoard: React.FC = () => {
  const [backlog, setBacklog] = useState<Task[]>([]);
  const [inProgress, setInProgress] = useState<Task[]>([]);
  const [completed, setCompleted] = useState<Task[]>([]);
  const [newTicket, setNewTicket] = useState<string>("");

  const handleAddTicket = () => {
    if (newTicket.trim() !== "") {
      setBacklog([...backlog, { id: Date.now(), content: newTicket }]);
      setNewTicket("");
    }
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    task: string,
    sourceColumn: string
  ) => {
    e.dataTransfer?.setData("task", task);
    e.dataTransfer?.setData("sourceColumn", sourceColumn);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetColumn: string
  ) => {
    e.preventDefault();
    const task = e.dataTransfer?.getData("task") || "";
    const sourceColumn = e.dataTransfer?.getData("sourceColumn") || "";

    if (targetColumn !== sourceColumn) {
      switch (targetColumn) {
        case "Backlog":
          setBacklog([...backlog, { id: Date.now(), content: task }]);
          break;
        case "InProgress":
          setInProgress([...inProgress, { id: Date.now(), content: task }]);
          break;
        case "Completed":
          setCompleted([...completed, { id: Date.now(), content: task }]);
          break;
        default:
          break;
      }

      switch (sourceColumn) {
        case "Backlog":
          setBacklog(backlog.filter((t) => t.content !== task));
          break;
        case "InProgress":
          setInProgress(inProgress.filter((t) => t.content !== task));
          break;
        case "Completed":
          setCompleted(completed.filter((t) => t.content !== task));
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      <div className=" bg-gradient-to-b from-orange-100 to-green-200 mt-5   ">
        <div className="flex items-center justify-center p-2.5">
          <input
            type="text"
            value={newTicket}
            onChange={(e) => setNewTicket(e.target.value)}
            placeholder="Enter new ticket"
            className="mr-2.5 px-2 py-1 rounded-md border border-gray-300 flex-grow"
          />
          <button
            onClick={handleAddTicket}
            className="px-4 py-1 rounded-md bg-blue-500 text-white cursor-pointer hover:bg-blue-700"
          >
            Add Ticket
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2.5 p-2.5">
          {/* Backlog column */}
          <Column
            title="Backlog"
            tasks={backlog}
            onDrop={(e) => handleDrop(e, "Backlog")}
            onDragStart={handleDragStart}
          />

          {/* In Progress column */}
          <Column
            title="InProgress"
            tasks={inProgress}
            onDrop={(e) => handleDrop(e, "InProgress")}
            onDragStart={handleDragStart}
          />

          {/* Completed column */}
          <Column
            title="Completed"
            tasks={completed}
            onDrop={(e) => handleDrop(e, "Completed")}
            onDragStart={handleDragStart}
          />
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className=" flex items-center flex-col">
        <p className="italic font-serif text-red-600">
          add your text & use drag and drop functionality after completion of
          work
        </p>
      </div>
    </>
  );
};

// Define the Column component
interface ColumnProps {
  title: string;
  tasks: Task[];
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    task: string,
    sourceColumn: string
  ) => void;
}

const Column: React.FC<ColumnProps> = ({
  title,
  tasks,
  onDrop,
  onDragStart,
}) => {
  return (
    <div
      className="bg-gray-200 rounded-lg p-2.5 cursor-move"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <h3 className="text-center">{title}</h3>
      {tasks.map((task, index) => (
        <div
          key={index}
          className="bg-white rounded-md mb-2 px-2 py-1 cursor-move"
          draggable
          onDragStart={(e) => onDragStart(e, task.content, title)}
        >
          {task.content}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
