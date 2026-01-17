# Smart Resume Advisor

Smart Resume Advisor is a full-stack application that analyzes resumes against job descriptions and provides a match score along with matched and missing skills.

---

## 🚀 Features

- Resume and job description comparison
- Skill extraction and normalization
- Match score calculation
- Categorized matched and missing skills
- Simple React-based UI for interaction
- REST API backend built with Spring Boot

---

## 🛠 Tech Stack

### Backend
- Java 17
- Spring Boot
- REST APIs
- JPA / Hibernate
- H2 Database (can be switched to MySQL)

### Frontend
- React
- Vite
- Axios
- Basic CSS

---

## ⚙️ How It Works

1. User enters resume text and job description
2. Backend extracts skills using keyword matching
3. Skills are normalized and compared
4. A match score is calculated
5. Results are displayed in the UI

---

## ▶️ How to Run Locally

### Backend and Frontend
```bash
cd smart-resume-advisor
./mvnw spring-boot:run

---

###Backend runs on:
http://localhost:8080

---

###Frontend
cd frontend/smart-resume-advisor-frontend
npm install
npm run dev

---

###Frontend runs on:
http://localhost:5173
