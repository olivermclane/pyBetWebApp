# pyBetWebApp by Oliver Mclane

This project combines a React frontend with a Django backend to create a betting application.

## Prerequisites

- Node.js and npm (https://nodejs.org/)
- Python 3.x (https://www.python.org/)
- A code editor or IDE (e.g., VS Code, PyCharm)
- A virtual environment tool (recommended: `venv` or `virtualenv`)

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/olivermclane/PyBetWebApp
```

## Install dependencies:

1. React frontend:

```bash
cd bet-app-frontend
npm install
```

2. Django backend:

   a. Create a virtual environment:
   
   ```bash
   cd SportOdds
   python3 -m venv venv  # Or use virtualenv
   source venv/bin/activate  # Or activate.bat on Windows
   ``` 
   b. Installing Dependencies
   ```bash
   pip install -r requirements.txt
   ```
3. Backend (Django) Setup

   In SportOdds/bet/settings.py, update the DATABASES dictionary with your database information or use a local SQL_Lite DB (cache) preconfigured.

     a. Run migrations:
     
      ```bash
     cd SportOdds
     python manage.py migrate
     ```
     
     b. Create superuser (optional): **THIS WILL BE USED IN Django Admin SECTION**
     ```bash
     python manage.py createsuperuser
     ```
    
     
     c. Updating .env file, create a .env file and follow the format:
     ```python
     ODDS_API_KEY = '{API_KEY}'
     ```
     
     d. Start the Django development server:
     
     ```bash
     python manage.py runserver
     ```

4. Frontend (React) Setup
 
   a. Start the React development server:
   
   ```Bash
   cd bet-app-frontend
   npm start
   ```

## Running the Application
Access the Django development server, typically at [http://127.0.0.1:8000/](http://127.0.0.1:8000/).
Access the React frontend, typically at [http://127.0.0.1:3000/](http://127.0.0.1:3000/)(or the port specified in your package.json).

## Additional Notes
If you encounter any issues, double-check the installation steps and refer to the project's documentation or seek help from me.
I hope this is helpful! Please let me know if you have any other questions.

## Django Admin
For using Django admin, navigate to [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin), login using the super user to explore different aspects of the admin page, currently set up, you can view the database storing sport,events,user information. 

## Sources

For my source for this assignment, it was quite hard to pin point all my sources for code, but the main sources where:

https://github.com/

https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react

https://www.django-rest-framework.org/

https://docs.djangoproject.com/en/5.0/

https://legacy.reactjs.org/docs/getting-started.html

https://tailwindcss.com/
