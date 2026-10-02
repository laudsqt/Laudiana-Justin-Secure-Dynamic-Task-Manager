// Data module: task IDs and required sample task data.
let nextTaskNumber = 1;

export function createTaskId() {
    const id = `task-${nextTaskNumber}`;
    nextTaskNumber += 1;
    return id;
}

export function getSampleTasks() {
    return [
        "Review DOM selectors",
        "Practice createElement",
        "Study event delegation"
    ];
}
