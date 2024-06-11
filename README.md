# 🖥️ Online Judge Platform

An online judge platform hosting coding problems and challenges. Users solve a series of coding problems. First he has to begin with registration for his accound, user can register as admin or user(member). During problem solving, they submit their solutions through the platform. Once submitted, these solutions are evaluated against hidden test cases by the platform. Based on the results of these tests, user solution submission is assigned verdict. The platform provides the infrastructure to manage and execute the DSA coding problems, ensuring fair and impartial evaluation.

## 🌟 Features

- **User Authentication and Role-Based Authorization**: Secure login and role-based access.
- **User Dashboard**: Personalized dashboard for participants.
- **Problem Creation and Management Service**: Admins can create and manage problems.
- **Submission Service**: Participants can submit their solutions.
- **Multiple Languages and Themes**: Support for various coding languages and IDE themes.
- **Interactive Coding Workspace**: Real-time coding environment.
- **Problem Filters**: Search problems based on tags.
- **Validations**: Ensuring the correctness of passwords and code.
- **Optimized Queries**: Faster response times and reduced bandwidth consumption.

## 🛠️ Tech Stack

- **Core**:
  - React
  - MongoDB
  - Node.js (Express)
- **Libraries**:
  - ShadCN
  - TailwindCSS
  - react-hook-form
  - zod
  - zustand

## 🎨 Platform Visuals

![Landing page](https://github.com/DeveHk/OJ-Project-MERN/blob/main/Assets/Landing.png?raw=true)
![Landing page](https://github.com/DeveHk/OJ-Project-MERN/blob/main/Assets/Landing.png?raw=true)
![Landing page](https://github.com/DeveHk/OJ-Project-MERN/blob/main/Assets/Landing.png?raw=true)

## 🔄 Workflow

### User:
1. User logs in or registers.
2. User navigates through problem lists, participates in contests, solves problems.
3. User chooses a problem to solve.
4. User submits code.
5. Backend evaluates the code against test cases.
6. Submissions are stored and can be accessed later.

### Admin:
1. Admin logs in or registers.
2. Admin navigates through the dashboard.
3. Admin can create and edit problems.
4. Admin can change the status and test cases for the problems.
5. Admin can host a contest and see results [Coming Soon].

## 🚀 Deployment

- **Backend**: Containerized and deployed to AWS EC2.

## 🔧 Working On

- Validating user email.
- Features to host coding contests and ladders.
- Enhancements to the user dashboard.

## 🌐 Future Scope

- **AI-Based RAG Model**: Assist users with an AI-based model that embeds problems and user solutions. Using an LLM model, generate natural language responses to help users learn better and solve problems more efficiently.



