# School Payment Dashboard - Frontend

## **Project Overview**
This is the **frontend** for the School Payment Dashboard project.  
Built with **React**, it communicates with the backend API to manage user authentication, payments, and transaction data.

---

## **Technologies Used**
- React.js  
- Axios (for API calls)  
- React Router (for routing)  
- CSS / SCSS for styling  
- Deployed on Netlify / Vercel

---

## **Setup Instructions**

### 1. Clone Repository
```bash
git clone https://github.com/<your-username>/frontend-repo.git
cd frontend
````

### 2. Install Dependencies

```bash
npm install
```

### 3. API Configuration

Axios is already configured to connect to the backend:

import axios from "axios";

const api = axios.create({
  baseURL: "https://edviron-school-payment-dashboard-backend.onrender.com/api 
});

export default api;


No .env file is needed since the base URL is already hardcoded.

### 4. Run Locally

```bash
npm start
```

* Runs on [http://localhost:3000](http://localhost:3000)

---

## **Pages & Functionality**

| Page               | Description                           |
| ------------------ | ------------------------------------- |
| Login              | User login with JWT authentication    |
| Dashboard          | Overview of transactions and payments |
| SchoolTransactions | View transactions by school           |
| StatusCheck        | Check payment status of an order      |
| TransactionDetails | Detailed info of a transaction        |
| Create Payment     | Initiate a new payment                |

---

## **Screenshots**

**Login Page**
<img width="1837" height="889" alt="image" src="https://github.com/user-attachments/assets/b707cc0a-f2c7-4527-bd84-f7512b025e49" />
<img width="1762" height="780" alt="image" src="https://github.com/user-attachments/assets/110aed41-73fe-4b15-9c9c-a31a32d50867" />


**Dashboard**
<img width="1919" height="989" alt="image" src="https://github.com/user-attachments/assets/997faa5d-26b7-4f13-b9b4-e0bda65b60dc" />
<img width="1919" height="583" alt="image" src="https://github.com/user-attachments/assets/d5d16642-e190-41e9-b355-df5b47058ba0" />
<img width="1919" height="573" alt="image" src="https://github.com/user-attachments/assets/90e4f8c6-c9ba-4ba6-900e-d2adcd7a495c" />


**School Transactions**
<img width="1919" height="597" alt="image" src="https://github.com/user-attachments/assets/ec3ba776-efda-416e-8ae1-7eb0fae8711f" />
<img width="1919" height="990" alt="image" src="https://github.com/user-attachments/assets/0f061c85-c536-4edd-bdd8-b9179517f773" />


**Transaction Details**
<img width="1919" height="577" alt="image" src="https://github.com/user-attachments/assets/d3989bcf-b4cc-4a99-9236-acc9061b524a" />
<img width="1919" height="486" alt="image" src="https://github.com/user-attachments/assets/f5bfaf4f-6730-4214-9333-f46bd26c9c88" />



**Analytics**
<img width="1919" height="964" alt="image" src="https://github.com/user-attachments/assets/167ac9fe-fa08-4e83-9573-af8c532da33e" />




