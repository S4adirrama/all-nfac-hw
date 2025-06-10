const API_URL = "http://localhost:8000/projects/";

const form = document.getElementById("project-form");
const updateBtn = document.getElementById("update-btn");
const status = document.getElementById("status");

let currentProjectId = null;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("project-name").value;
  const description = document.getElementById("project-description").value;

  const payload = {
    name,
    description,
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    status.innerText = "Project created with ID: " + data.id;
    currentProjectId = data.id;
    updateBtn.disabled = false;
  } catch (err) {
    status.innerText = "Error creating project.";
    console.error(err);
  }
});

updateBtn.addEventListener("click", async () => {
  if (!currentProjectId) return;

  const name = document.getElementById("project-name").value;
  const description = document.getElementById("project-description").value;

  const payload = {
    name,
    description,
  };

  try {
    const res = await fetch(API_URL + currentProjectId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    status.innerText = "Project updated: " + data.name;
  } catch (err) {
    status.innerText = "Error updating project.";
    console.error(err);
  }
});
