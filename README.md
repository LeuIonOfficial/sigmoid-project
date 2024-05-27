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

# Create a virtual environment and activate it
python -m venv venv
source venv/bin/activate  # For Windows use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start the development server
python manage.py runserver
```

### Setting up the Frontend (React)

```bash
# Navigate to the frontend directory
cd python-sigmoid/frontend

# Install dependencies
npm install  # or 'yarn install' if you're using yarn

# Start the development server
npm start  # or 'yarn start' if you're using yarn
```
