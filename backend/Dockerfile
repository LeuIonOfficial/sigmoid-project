# Use the official Python image from the Docker Hub
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Create and set the working directory
WORKDIR /code

# Install system dependencies
RUN apt-get update && apt-get install -y netcat-traditional && apt-get clean

# Install Python dependencies
COPY requirements.txt /code/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy the project
COPY . /code/

# Run the application
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.base.api.wsgi:application"]
