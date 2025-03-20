"use client"

import React from "react"
import SearchBar from "../components/SearchBar"
import TaskCard from "../components/TaskCard" // Assuming we're using the TaskCard from the previous example

// Example data
const tasksData = [
  {
    id: "task-1",
    title: "Implement Basic API & WebSocket Communication",
    description: "Create a simple /chat API endpoint. Set up WebSocket for real-time messaging",
    isCompleted: false,
    tags: [
      { id: "tag-1", name: "Overdue", type: "overdue" },
      { id: "tag-2", name: "Urgent", type: "urgent" },
    ],
  },
  {
    id: "task-2",
    title: "Design User Interface",
    description: "Create wireframes and mockups for the main dashboard",
    isCompleted: false,
    tags: [{ id: "tag-3", name: "Important", type: "important" }],
  },
]

export default function TasksPage() {
  const [tasks, setTasks] = React.useState(tasksData)
  const [filteredTasks, setFilteredTasks] = React.useState(tasksData)

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredTasks(tasks)
      return
    }

    const filtered = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query.toLowerCase()) ||
        task.description.toLowerCase().includes(query.toLowerCase()),
    )
    setFilteredTasks(filtered)
  }

  const handleToggleComplete = (taskId: string) => {
    const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task))
    setTasks(updatedTasks)
    setFilteredTasks(updatedTasks)
  }

  return (
    <div className="p-4 bg-gray-50">
      <SearchBar onSearch={handleSearch} />

      <div className="w-full mx-auto mt-6 space-y-4">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            isCompleted={task.isCompleted}
            tags={task.tags}
            onToggleComplete={handleToggleComplete}
          />
        ))}

        {filteredTasks.length === 0 && (
          <div className="text-center py-8 text-gray-500">No tasks found matching your search</div>
        )}
      </div>
    </div>
  )
}

