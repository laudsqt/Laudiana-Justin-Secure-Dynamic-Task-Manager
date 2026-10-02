import { createTaskId, getSampleTasks } from "./data.js";
import {
    isBlank,
    showValidationMessage,
    clearValidationMessage
} from "./utils.js";
import { updateTaskCounts as updateCountsDisplay } from "./display.js";

const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const loadSamplesBtn = document.querySelector("#loadSamplesBtn");
const taskList = document.querySelector("#taskList");
const taskMessage = document.querySelector("#taskMessage");
const totalCount = document.querySelector("#totalCount");
const pendingCount = document.querySelector("#pendingCount");
const completedCount = document.querySelector("#completedCount");

export function createTaskElement(taskText, taskId) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    taskItem.dataset.taskId = taskId;
    taskItem.dataset.state = "pending";

    const textSpan = document.createElement("span");
    textSpan.classList.add("task-text");
    textSpan.textContent = taskText;

    const completeButton = document.createElement("button");
    completeButton.type = "button";
    completeButton.classList.add("complete-btn");
    completeButton.textContent = "Complete";

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.classList.add("edit-btn");
    editButton.textContent = "Edit";

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.classList.add("remove-btn");
    removeButton.textContent = "Remove";

    taskItem.append(textSpan, completeButton, editButton, removeButton);
    return taskItem;
}

export function addTask(taskText) {
    if (isBlank(taskText)) {
        showValidationMessage(taskMessage, "Task cannot be empty");
        return;
    }

    const taskItem = createTaskElement(taskText.trim(), createTaskId());
    taskList.append(taskItem);
    taskInput.value = "";
    clearValidationMessage(taskMessage);
    updateTaskCounts();
    taskInput.focus();
}

export function toggleTaskComplete(taskItem) {
    taskItem.classList.toggle("completed");

    const isCompleted = taskItem.classList.contains("completed");
    taskItem.dataset.state = isCompleted ? "completed" : "pending";

    updateTaskCounts();
}

export function beginTaskEdit(taskItem) {
    const textSpan = taskItem.querySelector(".task-text");
    const editButton = taskItem.querySelector(".edit-btn");

    if (!textSpan || !editButton) {
        return;
    }

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.classList.add("edit-input");
    editInput.value = textSpan.textContent;

    textSpan.replaceWith(editInput);
    editButton.textContent = "Save";
    editInput.focus();
    editInput.select();
}

export function saveTaskEdit(taskItem) {
    const editInput = taskItem.querySelector(".edit-input");
    const editButton = taskItem.querySelector(".edit-btn");

    if (!editInput || !editButton) {
        return;
    }

    if (isBlank(editInput.value)) {
        showValidationMessage(taskMessage, "Task cannot be empty");
        editInput.focus();
        return;
    }

    const textSpan = document.createElement("span");
    textSpan.classList.add("task-text");
    textSpan.textContent = editInput.value.trim();

    editInput.replaceWith(textSpan);
    editButton.textContent = "Edit";
    clearValidationMessage(taskMessage);
}

export function removeTask(taskItem) {
    taskItem.remove();
    updateTaskCounts();
    clearValidationMessage(taskMessage);
}

export function updateTaskCounts() {
    updateCountsDisplay(
        taskList,
        totalCount,
        pendingCount,
        completedCount
    );
}

export function handleTaskListClick(event) {
    const actionButton = event.target;

    if (!(actionButton instanceof Element)) {
        return;
    }

    const taskItem = actionButton.closest(".task-item");
    if (!taskItem) {
        return;
    }

    if (actionButton.matches(".complete-btn")) {
        toggleTaskComplete(taskItem);
        return;
    }

    if (actionButton.matches(".edit-btn")) {
        if (actionButton.textContent === "Save") {
            saveTaskEdit(taskItem);
        } else {
            beginTaskEdit(taskItem);
        }
        return;
    }

    if (actionButton.matches(".remove-btn")) {
        removeTask(taskItem);
    }
}

export function loadSampleTasks() {
    const fragment = document.createDocumentFragment();

    getSampleTasks().forEach((taskText) => {
        const taskItem = createTaskElement(taskText, createTaskId());
        fragment.append(taskItem);
    });

    taskList.append(fragment);
    clearValidationMessage(taskMessage);
    updateTaskCounts();
}

addTaskBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addTask(taskInput.value);
});

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask(taskInput.value);
    }
});

loadSamplesBtn.addEventListener("click", loadSampleTasks);
taskList.addEventListener("click", handleTaskListClick);

updateTaskCounts();
