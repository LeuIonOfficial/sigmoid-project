# Sigmoid Final Project

Our blog website leverages cutting-edge artificial intelligence to generate engaging and insightful posts, offering readers fresh and unique content daily. By integrating AI, we ensure a diverse range of topics and perspectives, tailored to captivate and inform our audience.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

```
python==4.2.11
Django==3.9.6
Node.js==20.0.0
npm==10.5.x
```

### Installing

A step-by-step series of examples that tell you how to get a development environment running.

### Setting up the Backend (Django)

```bash
# Clone the repository
git clone https://github.com/LeuIonOfficial/sigmoid-project.git
cd sigmoid-project/backend

# Start the development server and run docker image
docker-compose up
# Development server should starting at http://0.0.0.0:8000/
```

### Setting up the Frontend (React)

```bash
# Navigate to the frontend directory
cd python-sigmoid/frontend

# Install dependencies
npm install  # or 'yarn install' if you're using yarn

# Start the development server
npm start  # or 'yarn start' if you're using yarn

# Development server should starting at http://localhost:5173/
```

### How to use this app
1. Firstly you shoud register an account: http://localhost:5173/register
2. Then you can login with your user: http://localhost:5173/login
3. You will be redirected at the main page: http://localhost:5173/u/dashboard
4. On dashboard you have 3 [Post, Authors and Create Post] tabs and the right sidebar with all posts
5. On the [Post] tab you can edit, delete and read the post
6. On the [Authors] tab you can see all authors, and if you click on one of them on the right sidebar you will see all his posts
7. On the [Create Post] tab you can create a post. Also here is the feature with integrated AI. You can ask ai for a content for your article. When you will recieve response from the AI it will autocomplete the description of the article.

### Thank you and have a nice day!