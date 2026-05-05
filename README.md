# 🚀 Developer Productivity MVP

A simple MVP that helps developers **understand their performance metrics, interpret what they mean, and take actionable steps to improve**.

---

## 🎯 Problem

Developers often see metrics like **lead time, cycle time, or bug rate**, but these numbers alone don’t explain:

* Whether performance is good or bad
* What is causing issues
* What actions should be taken

👉 This project solves that gap by adding a **reasoning layer** on top of raw metrics.

---

## 💡 Solution

This MVP transforms:

> **Metrics → Insights → Actions**

* 📊 Shows key productivity metrics
* 🧠 Explains what those metrics mean
* 🎯 Suggests practical next steps
* 🤖 (Optional) AI-generated summary

---

## 🧭 User Journey

```text
Open Dashboard → Select Developer & Month → Get Report →
View Metrics → Read Insights → Take Action → AI Summary
```

👉 Simple, focused, and easy to understand.

---

## 🖥️ Features

### 👤 Developer View (Primary)

* Select developer and month
* View metrics:

  * Lead Time
  * Cycle Time
  * Bug Rate
  * Deployment Frequency
  * PR Throughput
* Get:

  * Insights (interpretation)
  * Actions (next steps)
  * AI summary (optional)

---

### 👨‍💼 Manager View (Optional)

* View aggregated team metrics:

  * Average lead time
  * Average cycle time
  * Bug rate
  * Total deployments
  * Total PRs

---

## 📊 Metrics Explained

| Metric               | Meaning                             |
| -------------------- | ----------------------------------- |
| Lead Time            | Time from PR creation to deployment |
| Cycle Time           | Time from work start to completion  |
| Bug Rate             | Bugs per completed work             |
| Deployment Frequency | Number of deployments               |
| PR Throughput        | Number of merged PRs                |

---

## 🧠 Insights Engine

* Rule-based logic maps metrics → meaning → actions
* Ensures **deterministic and explainable output**
* Always provides at least **one actionable suggestion**

---

## 🤖 AI Integration (Optional)

* Uses NVIDIA API for short summaries
* Converts structured insights into readable feedback

### ✅ Design Principle:

* AI is **optional**
* System works **without AI**
* Fallback ensures reliability

---

## ⚙️ Tech Stack

* **Frontend:** React.js
* **Backend:** Node.js
* **Data Source:** Excel → JSON pipeline
* **AI:** NVIDIA API (optional)

---

## 🧪 How to Run

### 1. Clone repo

```bash
git clone <your-repo-link>
cd developer-productivity-mvp
```

### 2. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 3. Run backend

```bash
cd backend
node server.js
```

### 4. Run frontend

```bash
cd frontend
npm start
```

---

## 🔐 Environment Variables (Optional AI)

Create `.env` in backend:

```env
NVIDIA_API_KEY=your_api_key_here
```

---

## 🎥 Demo

👉 Video walkthrough: *(Add Google Drive link)*
👉 Miro board: *(Add link)*

---

## 🧠 Design Decisions

* Focused on **Individual Contributor (IC)** first
* Kept UI **simple and readable**
* Avoided over-engineering
* Prioritized **clarity over complexity**

---

## 📈 Future Improvements

* Add charts for trends
* Historical comparisons
* Team-level benchmarking
* Better UI styling

---

## 🤖 AI Usage Note

AI was used for:

* Debugging assistance
* Architecture suggestions
* Optional summary generation

All core logic (metrics, insights, actions) is:

* Implemented manually
* Fully understood

---

## 🏁 Conclusion

This MVP demonstrates:

* Clear problem understanding
* Strong product thinking
* Actionable insights (not just metrics)
* Responsible AI usage

---

### ⭐ Key Idea

> **Helping developers improve, not just track performance**
