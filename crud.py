"""CRUD operations."""
from model import db, User, Project, Label, Favourite, Task, Collaborator, connect_to_db
from datetime import datetime

def add_user(email, password):

    user = User(email=email, password=password)

    db.session.add(user)
    db.session.commit()

    return user

def display_user():

    return User.query.all()

def get_user_by_email(email):
    """query for the details of a user"""

    # return User.query.get(user_id)
    return User.query.filter_by(email = email).one()
    # return q1

def get_user_id(email):
    """query for the details of a user"""

    # return User.query.get(user_id)
    # return User.query(User.user_id).filter_by(email = email).one()
    # return q1
    return db.session.query(User.user_id).filter((User.email == email)&(User.is_active == 't')).one()

def check_user(email):

    return User.query.filter(User.email == email).first()

def validate_user(email, password):
    
    user = User.query.filter(User.email == email).first()
    if not user:
        return False
    else:
        return user.password == password

def add_project(proj_name, due_date, user_id):

    project = Project(proj_name=proj_name, due_date=due_date, user_id=user_id)

    db.session.add(project)
    db.session.commit()

    return project

def display_project(project_name):

    return Project.query.filter_by(project_name=project_name).one()

def get_proj_id(project_name):

    # return Project.query(Project.project_id).filter_by(project_name=project_name).one()
    return db.session.query(Project.project_id).filter(Project.proj_name == project_name).one()

def display_today_project(email):
    
    now = datetime.now()
    user_id = db.session.query(User.user_id).filter((User.email == email)&(User.is_active == 't')).one()
    return db.session.query(Project.proj_name, Task.task_item).filter((Project.project_id == Task.project_id)&(Project.due_date <= now)&
    (Project.user_id == user_id) & (Task.is_active == 't') ). all()
    # return Project.query.filter(Project.due_date <= now).all()

def display_upcoming_project(email):

    now = datetime.now()
    user_id = db.session.query(User.user_id).filter((User.email == email)&(User.is_active == 't')).one()
    return db.session.query(Project.proj_name, Task.task_item).filter((Project.project_id == Task.project_id)&(Project.due_date > now)&
    (Project.user_id == user_id) & (Task.is_active == 't') ). all()

def past_due(email):

    now = datetime.now()
    user_id = db.session.query(User.user_id).filter((User.email == email)&(User.is_active == 't')).one()
    return db.session.query(Project.proj_name, Task.task_item).filter((Project.project_id == Task.project_id)&(Project.due_date < now)&
    (Project.user_id == user_id) & (Task.is_active == 't') ). all()


def add_label(label_name, user_id, project_id):

    label = Label(label_name=label_name, user_id=user_id, project_id=project_id)

    db.session.add(label)
    db.session.commit()

    return label

def display_labels(email):
    user_id = db.session.query(User.user_id).filter((User.email == email)&(User.is_active == 't')).one()
    return db.session.query(Label.label_name, Project.Task.task_item).filter((Label.user_id == user_id) & (Label.project_id == Project.project_id)&
    (Project.project_id == Project.Task.project_id) & (Project.Task.is_active == 't')).all()
    # return Label.query.filter(Label.user_id==user_id).all()


def add_favourites(project_id, user_id):

    favourite = Favourite(project_id=project_id, user_id=user_id)

    db.session.add(favourite)
    db.session.commit()

    return favourite

def display_favourite(user_id):

    return Favourite.query.filter_by(user_id=user_id).all()


def add_task(task_item, project_id, is_active, order_id, assignee):
    
    task = Task(task_item=task_item, project_id=project_id, is_active=is_active, order_id=order_id, assignee=assignee)

    db.session.add(task)
    db.session.commit()

    return task

def display_tasks_by_proj_id(project_id):

    return Task.query.filter_by(project_id=project_id).all()


def display_tasks_by_assignee(assignee):

    return Task.query.filter_by(assignee=assignee).all()


def add_collaborator(user_id, project_id):

    collaborator = Collaborator(user_id=user_id, project_id=project_id)

    db.session.add(collaborator)
    db.session.commit()

    return collaborator

def display_collab(collab_id):

    return Collaborator.query.filter_by(collab_id=collab_id).one()


if __name__ == '__main__':
    from server import app
    connect_to_db(app)