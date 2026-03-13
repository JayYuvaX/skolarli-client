# Skolarli Assessment Client

## Overview

This project is the frontend for a mini online assessment interface.
Users can start a test, answer multiple-choice questions, navigate between questions, and view their final results after submitting.

The application fetches questions from the backend API and stores user answers temporarily using localStorage.

## Features

## Features

* Start the assessment from a landing page
* Fetch and display questions dynamically from the backend API
* Navigate between questions using Next and Previous buttons
* Question palette to quickly jump to any question
* Answers are automatically saved using localStorage
* Confirmation before submitting the assessment
* Prevent submission if no questions are answered
* Countdown timer for the assessment
  
* Result summary showing:
  * Total questions
  * Answered questions
  * Unanswered questions
  * Correct answers
  * Wrong answers
* Review section to compare selected answers with correct answers
* Home button to return to the landing page and clear stored answers
* Responsive user interface built with Tailwind CSS


## Tech Stack

* HTML
* Tailwind CSS
* JavaScript
* jQuery
* Fetch API

## Live Demo

Frontend: https://skolarli.vercel.app/

Backend API: https://skolarli-server.onrender.com

## Project Structure

index.html → Landing page
assessment.html → Question interface
summary.html → Result summary page

## How to Run Locally

1. Clone the repository

git clone https://github.com/JayYuvaX/skolarli-client.git

2. Open the project folder

cd skolarli-client

3. Run using a local server

If using VS Code:
Install Live Server extension

Right click index.html → Open with Live Server

4. The application will run on

http://127.0.0.1:5500

## API Endpoint

The frontend fetches questions from:

https://skolarli-server.onrender.com/api/questions

## Author

Jayanth
