# BOARD 
BOARD is a platform/tool that can be used to categorize and organise tasks. 
This is something that is universal and can be used by people from all walks of life.
 
It helps us keep track of things so we don’t miss them and our day is more organized.
It’s an Indispensable tool both in business and in personal life.
 
In Board, users can create Projects and add tasks to projects. Projects help you organize your tasks into separate lists.Just listing out and organizing your tasks can be a huge relief when you’re feeling overwhelmed.

Users can add new projects/tasks, edit/delete and mark complete the tasks.

Users can also favorite projects to keep the most important tasks close at hand.it helps you separate your highest impact tasks from the everyday noise.

Board lets users assign labels to projects to categorize what type of work it is.
you could filter tasks based on the specific people you need to follow up with. It is a useful way of segmenting tasks, so you can easily see only the tasks that you can realistically work on based on the context or situation that you’re in. You can quickly view all tasks with the same label 

Users have the option to give a due date to the projects. So important, yet so easy to forget. you can make sure you never miss a thing by adding due dates.

Your today and upcoming views let you see all of your tasks across all of your projects that are due today, this week, or any week in the future.Your upcoming makes it easy to plan your week ahead of time.

Board supports collaboration,It allows the user to add other BOARD users  as collaborators to projects so that multiple users can add/edit/remove/complete tasks in a project.
<br>

# Contents
* [Features](#features)
* [Technologies & Stack](#techstack)
* [Set-up & Installation](#installation)
* [About the Developer](#aboutme)

## <a name="features"></a> Features

About Us - A quick intro
<br>
<br>
![](gifs/aboutus.gif)
<br>

Sign Up Page that includes validations
<br>
<br>
![](gifs/signup.gif)
<br>

Login and Home Page
<br>
<br>
![](gifs/login_n_home.gif)
<br>

Add a New Project, give a Label name, assign due date, add to favourites
<br>
<br>
![](gifs/add_project.gif)
<br>

Edit Tasks
<br>
<br>
![](gifs/edit_tasks.gif)
<br>

Add a Collaborator and assign due dates
<br>
<br>
![](gifs/add_collab.gif)
<br>

Shared with me
<br>
<br>
![](gifs/shared_with_me.gif)
<br>

Board for all projects that are past due
<br>
<br>
![](gifs/past_due.jpeg)
<br>

Board for all projects that are upcoming
<br>
<br>
![](gifs/upcoming.jpeg)
<br>

Board for all favorite Projects
<br>
<br>
![](gifs/Favorite.jpeg)
<br>

Board for all projects with Labels
<br>
<br>
![](gifs/Label.jpeg)
<br>

## <a name="techstack"></a> Technologies and Stack
**Backend:**
Python, Flask, SQLAlchemy, PostgreSQL <br>
**Frontend:**
React, Javascript, jQuery, Babel, Bootstrap, Google Fonts, HTML5, CSS, Styled Components <br>

## <a name="installation"></a> Set-up & Installation
Install a code editor such as [VS code](https://code.visualstudio.com/download) or [Sublime Text](https://www.sublimetext.com/).<br>
Install [Python3](https://www.python.org/downloads/mac-osx/)<br>
Install [pip](https://pip.pypa.io/en/stable/installing/), the package installer for Python <br>
Install [postgreSQL](https://www.postgresql.org/) for the relational database.<br>


Clone or fork repository:
```
$ git clone https://github.com/rlavanya9/BOARD.git
```
Create and activate a virtual environment inside the BOARD directory:
```
$ virtualenv env
$ source env/bin/activate
```
Install dependencies:
```
$ pip3 install -r requirements.txt
```
Store these keys in a file named 'secrets.sh' <br> 
```
$ source secrets.sh
```
With PostgreSQL, create the BOARD database
```
$ createdb mytodo
```
Create all tables and relations in the database and seed all data:
```
$ python3 seed_database.py
```
Run the app from the command line:
```
$ python3 server.py
```

## <a name="aboutme"></a> About the Developer

Lavanya was a Mainframe Technology Lead at Morgan Stanley where she was responsible for developing and maintaining applications for the Wealth and Asset management Division. Prior to that, she developed Billing and Commission modules for Guardian Life Insurance.  She has her B.S. in Computer Science Engineering and over 10 years of experience in the Software industry. She is also a Certified Scrum Master. Having gained knowledge and expertise in backend/mainframe technology, she wanted to pursue more progressive, flexible languages like Python and JavaScript and to gain hands-on experience working on them. She's looking forward to an exciting career building innovative and robust applications. She can be found on [LinkedIn](https://www.linkedin.com/in/lavanya-rangaswamy/) and on [Github](https://github.com/rlavanya9).