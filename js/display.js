// Display module: summary calculations.
export function updateTaskCounts(taskList, totalElement, pendingElement, completedElement) {
    const taskItems = [...taskList.querySelectorAll(".task-item")];
    const total = taskItems.length;
    const completed = taskItems.filter(
        (taskItem) => taskItem.dataset.state === "completed"
    ).length;
    const pending = taskItems.filter(
        (taskItem) => taskItem.dataset.state === "pending"
    ).length;

    totalElement.textContent = String(total);
    pendingElement.textContent = String(pending);
    completedElement.textContent = String(completed);
}
