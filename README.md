# Secure Dynamic Task Manager

Laboratory Activity #2 — ITP10 Event-Driven Programming

## Required structure

- `index.html`
- `css/style.css`
- `js/app.js`

Additional JavaScript modules are included to satisfy the modular-organization rubric:
- `js/data.js`
- `js/utils.js`
- `js/display.js`

## Required features implemented

- Empty task list and 0/0/0 initial counts
- Dynamic task creation with `createElement()` and `textContent`
- Unique `task-*` IDs and `data-state`
- Complete / Edit / Save / Remove actions
- One delegated click listener on `#taskList`
- `closest(".task-item")` traversal
- Validation message: `Task cannot be empty`
- Safe handling of HTML-like task text
- `DocumentFragment` for the three required sample tasks
- DOM-based summary counts
- No `innerHTML`, `insertAdjacentHTML()`, `document.write()`, or inline `onclick`

## Required sample tasks

1. Review DOM selectors
2. Practice createElement
3. Study event delegation

## Run

Open `index.html` through a local web server. Because the project uses ES modules, a local server is recommended instead of opening the file directly with `file://`.

## Submission checklist

Before submission, test the activity according to the laboratory handout, including the blank-task validation, HTML-like text safety, complete/edit/remove behavior, sample loading, counts, and browser console.
