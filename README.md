🧾 Smart Expense Tracker. 

A modern, intuitive, and powerful expense‑tracking application designed to help users take full control of their financial life — built with clean architecture, scalable backend, and beautiful UI.

🔗 Live Demo
https://smart-expense-tracker-chi-five.vercel.app/
* Before Starting the live demo from above link make sure backend is online by opening the following link first:(Don't worry even if this doesn't load anything, just make sure it is online!)
https://smart-expense-tracker-bakend.onrender.com/
* For checking out the website please use these credentials(Just making sure that DB is not getting Overloaded!! :) ) :
* Email: test1@gmail.com
* Password: 123456

📌 Features

* ✅ Add, Edit, Delete Expenses
* ✅ Categorize Your Spending (Food, Travel, Bills, etc.)
* ✅ Visual Analytics Dashboard
* ✅ Daily / Monthly Expense Insights
* ✅ Secure Authentication
* ✅ Modern UI / UX for smooth experience
* ✅ Fully responsive across devices
* ✅ Clean, scalable code structure


🎯 Purpose of the Project

Smart Expense Tracker helps individuals:
* Track their daily spending
* Understand financial patterns
* Maintain budgeting discipline
* Achieve long‑term savings goals

This project is built with clean design patterns and reusable components — ideal for learning or production use.

🛠️ Tech Stack
Backend:
* Java
* Spring Boot
* Spring Data JPA
* Hibernate
* JWT Authentication
* REST APIs
  
Frontend:
* React
* TailwindCSS
* HTML / CSS
* Chart.js or Recharts for visual analytics

Database:
* PostrgreSQL (Render Cloud Database)

⚙️ Configuration

Environment variables used for secure deployment:

```properties
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DATABASE_USERNAME}
spring.datasource.password=${DATABASE_PASSWORD}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect

server.port=${PORT:8080}
```


🚀 Deployment
* Hosted Frontend on Vercel with Backend Connection
* Hosted Backend on Render using PostgreSQl
* Uses environment variables for secure configuration

  
🌟 How It Works


* User signs up and logs in
* They add expenses with title, amount, category & date
* Backend stores the data securely
* Dashboard visualizes spending trends
* Users can edit or delete transactions anytime

🌟 Screenshots
![IMG_0018](https://github.com/user-attachments/assets/097ce01a-1f74-4cbc-b3e6-668262726dca)

![IMG_0017](https://github.com/user-attachments/assets/35c34e7a-737d-49d2-b47c-1ffaa373f7a1)


📬 Contact

Feel free to connect with me for any queries or collaboration!

⭐ If you like this project, don’t forget to star the repository!
