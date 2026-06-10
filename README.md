# Online Voting System

A web-based Online Voting System built using **HTML, CSS, and JavaScript** that allows students to securely vote for candidates while administrators manage elections, candidates, and view results in real time.

## Features

### Student Panel
- Student registration and login
- Secure authentication (LocalStorage-based)
- One student can vote only once
- Candidate selection interface
- Clean and interactive voting UI

### Admin Panel
- Admin registration and login
- Add new candidates with name, party, and image
- Delete candidates
- Paginated candidate management dashboard
- Protected admin access

### Results Dashboard
- Live vote counting
- Interactive line chart (Chart.js)
- Candidate ranking with percentage
- Winner/loser status display
- Paginated results view


## Tech Stack

- **HTML5** – Structure
- **CSS3** – Styling and UI design
- **JavaScript (Vanilla)** – Logic and functionality
- **LocalStorage** – Data persistence
- **Chart.js** – Result visualization

## How to Run the Project

1. Download or clone the repository:
   ```bash
   git clone https://github.com/your-username/online-voting-system.git
2. Open the project folder
3. Run student_auth.html or admin_auth.html in your browser
4. Start using the system


## Authentication Flow
- Students must register before voting
- Admins manage candidates and results
- LocalStorage is used for session handling and data storage


## Voting System Logic
- Each student can vote only once
- Votes are stored in browser LocalStorage
- Candidate votes are updated instantly
- Results page visualizes data using charts and tables


## Future Improvements
- Backend integration (Node.js / PHP / Django)
- Database support (MySQL / MongoDB)
- OTP/email verification
- Role-based authentication security upgrade
- Real-time voting updates (WebSockets)
 
## Author

**Muhammad Jawad**
Frontend Developer | Student Project


## License
This project is for educational purposes only.

---
