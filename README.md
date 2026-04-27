# Smart Campus Portal

I built Smart Campus Portal as a web-based campus maintenance management system designed to make issue reporting and resolution easier across a college campus. The core idea is simple: students report problems, admins review them, and staff members handle the actual fixes through role-based dashboards.

---

## What it does

Smart Campus Portal helps different campus users work together in one system:

- **Students** can submit maintenance issues and track their status.
- **Admins** can review reported issues and approve or deny them.
- **Staff** can view assigned tasks and mark issues as fixed once resolved.

This creates a cleaner workflow for handling campus problems like broken equipment, infrastructure complaints, or maintenance requests.

---

## Why I built it

Campus maintenance is often slowed down by scattered communication and unclear ownership. I wanted to build something that gives each role a clear responsibility and makes the full reporting process more transparent, from complaint submission to final resolution.

---

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Deployment / DevOps:** GitHub, Netlify, Render, Docker

---

## How it works

### 1. Issue reporting
Students log in to the portal and submit campus-related issues through the interface.

### 2. Admin review
Admins access their dashboard to approve or deny submitted reports before they move forward.

### 3. Staff action
Once an issue is approved, staff members can view assigned problems and update them after the fix is completed.

### 4. Status tracking
Students can monitor the progress of the issue they reported instead of relying on manual follow-up.

---

## Project Structure

```text
smart-campus-portal/
|
+-- frontend/
|   +-- login.html
|   +-- dashboard.html
|   +-- style.css
|   +-- script.js
|
+-- backend/
|   +-- server.js
|   +-- package.json
|   +-- Dockerfile
|
+-- README.md
```

---

## How to run it

```bash
# Clone the repository
git clone https://github.com/yourusername/smart-campus-portal.git

# Move into the backend folder
cd smart-campus-portal/backend

# Install dependencies
npm install

# Start the server
node server.js
```

After starting the backend, open `frontend/login.html` in your browser to access the portal.

---

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/issues` | Fetch all reported issues |
| POST | `/issues` | Submit a new issue |
| PUT | `/issues/:id` | Update an existing issue |
| DELETE | `/issues` | Delete issue data |

---

## Docker Setup

```bash
docker build -t smart-campus-backend .
docker run -p 3000:3000 smart-campus-backend
```

---

## Future Enhancements

- Add database integration for persistent issue storage
- Implement authentication and secure role-based access
- Add notifications for status updates and approvals
- Build analytics for issue trends and maintenance performance

---

## Final Note

Smart Campus Portal is a simple but practical full-stack project that shows how role-based workflows can be applied to real campus operations. It can be extended further into a more complete maintenance platform with authentication, a database, and smarter reporting tools.
