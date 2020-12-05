"""CRUD operations."""
from model import db, User, Project, Label, Favourite, Task, Collaborator, connect_to_db
# from datetime import datetime
import datetime

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

    return db.session.query(Project.project_id).filter(Project.proj_name==project_name).first()

def get_proj_id(project_name):

    # return Project.query(Project.project_id).filter_by(project_name=project_name).one()
    return db.session.query(Project.project_id).filter(Project.proj_name == project_name).one()

def display_all_project(email,project_name):
    
    # now = datetime.now()
    user_id = db.session.query(User.user_id).filter((User.email == email)&(User.is_active == 't')).one()
    user_all = db.session.query(Project.proj_name, Task.task_id,Task.task_item).filter((Project.project_id == Task.project_id)&(Project.proj_name == project_name)&
    (Project.user_id == user_id) & (Task.is_active == 't') ). all()
    if not user_all:
        proj_id_proj = db.session.query(Project.project_id).filter(Project.proj_name == project_name).first()
        collab_proj_id = db.session.query(Collaborator.project_id).filter(Collaborator.user_id == user_id).all()
        for proj in collab_proj_id:
            if proj == proj_id_proj:
                collab_all = db.session.query(Project.proj_name, Task.task_id,Task.task_item).filter((Project.project_id == proj) & (Task.project_id == proj)& (Task.is_active == 't') ). all()
                return collab_all
    else:
        return user_all       

def display_card_project(email):
    
    # now = datetime.now()
    user_id = db.session.query(User.user_id).filter((User.email == email)&(User.is_active == 't')).one()
    
    user_proj = db.session.query(Project.proj_name, Task.task_item).filter((Project.project_id == Task.project_id)&
    (Project.user_id == user_id) & (Task.is_active == 't') ). all()

    collab_proj_id = db.session.query(Collaborator.project_id).filter(Collaborator.user_id == user_id).all()
    print(collab_proj_id)
    
    if collab_proj_id:
        for proj in collab_proj_id:

            collab_projs = db.session.query(Project.proj_name, Task.task_item).filter((Project.project_id == proj)& (Task.project_id == proj) & (Task.is_active == 't') ). all()
            print(collab_projs)    
    
        user_proj.extend(collab_projs)

    print(user_proj)
 

    return user_proj 

def display_home_project(email):
    
    # now = datetime.now()
    user_id = db.session.query(User.user_id).filter((User.email == email)&(User.is_active == 't')).one()
    
    user_proj = db.session.query(Project.proj_name, Task.task_item).filter((Project.project_id == Task.project_id)&
    (Project.user_id == user_id) & (Task.is_active == 't') ). all()

    # collab_proj_id = db.session.query(Collaborator.project_id).filter(Collaborator.user_id == user_id).all()
    # print(collab_proj_id)
    
    # if collab_proj_id:
    #     for proj in collab_proj_id:

    #         collab_projs = db.session.query(Project.proj_name, Task.task_item).filter((Project.project_id == proj)& (Task.project_id == proj) & (Task.is_active == 't') ). all()
    #         print(collab_projs)    
    
    #     user_proj.extend(collab_projs)

    # print(user_proj)
 

    return user_proj 
    

def display_today_project(email):
    
    now = datetime.date.today()
    print('today date')
    print(now)
    user_id = db.session.query(User.user_id).filter((User.email == email)&(User.is_active == 't')).one()
    user_today = db.session.query(Project.proj_name, Task.task_item).filter((Project.project_id == Task.project_id)&(Project.due_date == now)&
    (Project.user_id == user_id) & (Task.is_active == 't') ). all()
    
    collab_proj_id = db.session.query(Collaborator.project_id).filter(Collaborator.user_id == user_id).all()
    print(collab_proj_id)
    
    if collab_proj_id:
        for proj in collab_proj_id:

            collab_projs = db.session.query(Project.proj_name, Task.task_item).filter((Project.project_id == proj)& (Task.project_id == proj) & (Project.due_date == now)& (Task.is_active == 't') ). all()
            print(collab_projs)    
    
        user_today.extend(collab_projs)

    print(user_today)
    # else:
    #     user_collab_proj = user_proj

    return user_today 

def display_upcoming_project(email):

    # now = datetime.now()
    now = datetime.date.today()
    user_id = db.session.query(User.user_id).filter((User.email == email)&(User.is_active == 't')).one()
    user_up = db.session.query(Project.proj_name, Task.task_item).filter((Project.project_id == Task.project_id)&(Project.due_date > now)&
    (Project.user_id == user_id) & (Task.is_active == 't') ). all()

    collab_proj_id = db.session.query(Collaborator.project_id).filter(Collaborator.user_id == user_id).all()
    print(collab_proj_id)
    
    if collab_proj_id:
        for proj in collab_proj_id:

            collab_projs = db.session.query(Project.proj_name, Task.task_item).filter((Project.project_id == proj)& (Task.project_id == proj) & (Project.due_date > now)& (Task.is_active == 't') ). all()
            print(collab_projs)    
    
        user_up.extend(collab_projs)

    print(user_up)
    # else:
    #     user_collab_proj = user_proj

    return user_up 

def past_due(email):

    # now = datetime.now()
    now = datetime.date.today()
    user_id = db.session.query(User.user_id).filter((User.email == email)&(User.is_active == 't')).one()
    user_past = db.session.query(Project.proj_name, Task.task_item).filter((Project.project_id == Task.project_id)&(Project.due_date < now)&
    (Project.user_id == user_id) & (Task.is_active == 't') ). all()

    collab_proj_id = db.session.query(Collaborator.project_id).filter(Collaborator.user_id == user_id).all()
    print(collab_proj_id)
    
    if collab_proj_id:
        for proj in collab_proj_id:

            collab_projs = db.session.query(Project.proj_name, Task.task_item).filter((Project.project_id == proj)& (Task.project_id == proj) & (Project.due_date < now)& (Task.is_active == 't') ). all()
            print(collab_projs)    
    
        user_past.extend(collab_projs)

    print(user_past)
    # else:
    #     user_collab_proj = user_proj

    return user_past


def add_label(label_name, user_id, project_id):

    label = Label(label_name=label_name, user_id=user_id, project_id=project_id)

    db.session.add(label)
    db.session.commit()

    return label

def display_labels(email):
    user_id = db.session.query(User.user_id).filter((User.email == email)&(User.is_active == 't')).one()
    user_label = db.session.query(Label.label_name, Task.task_item).filter((Label.user_id == user_id) & (Label.project_id == Project.project_id)&
    (Project.project_id == Task.project_id) & (Task.is_active == 't')).all()
    
    collab_proj_id = db.session.query(Collaborator.project_id).filter(Collaborator.user_id == user_id).all()
    print(collab_proj_id)
    
    if collab_proj_id:
        for proj in collab_proj_id:

            collab_projs = db.session.query(Label.label_name, Task.task_item).filter((Label.project_id == proj)&
                           (Project.project_id == proj)& (Task.project_id == proj) & (Task.is_active == 't')).all()
            
            print(collab_projs)    
    
        user_label.extend(collab_projs)

    print(user_label)
    # else:
    #     user_collab_proj = user_proj

    return user_label 


def add_favourites(project_id, user_id):

    favourite = Favourite(project_id=project_id, user_id=user_id)

    db.session.add(favourite)
    db.session.commit()

    return favourite

def display_favourite(email):

    user_id = db.session.query(User.user_id).filter((User.email == email)&(User.is_active == 't')).one()
    user_favs = db.session.query(Project.proj_name, Task.task_item).filter((Favourite.project_id == Project.project_id) & (Favourite.user_id == user_id) &
    (Project.user_id == user_id) & (Project.project_id == Task.project_id) & (Task.is_active == 't')).all()

    collab_proj_id = db.session.query(Collaborator.project_id).filter(Collaborator.user_id == user_id).all()
    print(collab_proj_id)
    
    if collab_proj_id:
        for proj in collab_proj_id:

            collab_projs = db.session.query(Project.proj_name, Task.task_item).filter((Favourite.project_id == proj)&
                           (Project.project_id == proj)& (Task.project_id == proj) & (Task.is_active == 't')).all()
            
            print(collab_projs)    
    
        user_favs.extend(collab_projs)

    print(user_favs)
   

    return user_favs 


def add_task(task_item, project_id, is_active, order_id, assignee):
    
    task = Task(task_item=task_item, project_id=project_id, is_active=is_active, order_id=order_id, assignee=assignee)

    db.session.add(task)
    db.session.commit()

    return task

def edit_task(email, assignee, order_id, proj_name, task_item):

    user_id = db.session.query(User.user_id).filter((User.email == email)&(User.is_active == 't')).one()
    proj_id = db.session.query(Project.project_id).filter((Project.proj_name == proj_name)&(Project.user_id == user_id)).first()   

    
    if proj_id:
        etask = Task.query.filter((Task.task_id == order_id) & (Task.project_id == proj_id)).first()
        etask.task_item = task_item
        db.session.commit()
    else: 
        collab_proj_id = db.session.query(Collaborator.project_id).filter(Collaborator.user_id == user_id).all()
        proj_id_proj = db.session.query(Project.project_id).filter(Project.proj_name == proj_name).first()
        print(proj_id_proj)

        for proj in collab_proj_id:
            if proj == proj_id_proj:
                    etask = Task.query.filter((Task.task_id == order_id) & (Task.project_id == proj)).first()
                    print(etask)
                    etask.task_item = task_item
                    db.session.commit()


def edit_new_task(email, assignee, order_id, proj_name, task_item):

    user_id = db.session.query(User.user_id).filter((User.email == email)&(User.is_active == 't')).one()
    proj_id = db.session.query(Project.project_id).filter((Project.proj_name == proj_name)&(Project.user_id == user_id)).one()    
    # task = Task(task_item=task_item, project_id=project_id, order_id=order_id, assignee=assignee)
    # tsk_id = db.session.query(Task.task_id).filter((Task.task_item == task_item)&(Project.proj_name == proj_name)).first()
    entask = Task.query.filter((Task.order_id == order_id) & (Task.project_id == proj_id)).first()
    entask.task_item = task_item
    
    db.session.commit()
    
def remove_task(email, assignee, order_id, proj_name):

    user_id = db.session.query(User.user_id).filter((User.email == email)&(User.is_active == 't')).one()
    proj_id = db.session.query(Project.project_id).filter((Project.proj_name == proj_name)&(Project.user_id == user_id)).first()

    if proj_id:    
        rtask = Task.query.filter((Task.task_id == order_id) & (Task.project_id == proj_id)).one()
        db.session.delete(rtask)    
        db.session.commit()
    else:
        collab_proj_id = db.session.query(Collaborator.project_id).filter(Collaborator.user_id == user_id).all()
        proj_id_proj = db.session.query(Project.project_id).filter(Project.proj_name == proj_name).first()
        print(proj_id_proj)

        for proj in collab_proj_id:
            if proj == proj_id_proj:
                    rtask = Task.query.filter((Task.task_id == order_id) & (Task.project_id == proj)).one()
                    db.session.delete(rtask)    
                    db.session.commit()


def remove_new_task(email, assignee, order_id, proj_name):

    user_id = db.session.query(User.user_id).filter((User.email == email)&(User.is_active == 't')).one()
    proj_id = db.session.query(Project.project_id).filter((Project.proj_name == proj_name)&(Project.user_id == user_id)).one()    
    # task = Task(task_item=task_item, project_id=project_id, order_id=order_id, assignee=assignee)
    rntask = Task.query.filter((Task.order_id == order_id) & (Task.project_id == proj_id)).one()
    db.session.delete(rntask)    
    db.session.commit()

def complete_task(email, assignee, order_id, proj_name, is_active):

    user_id = db.session.query(User.user_id).filter((User.email == email)&(User.is_active == 't')).one()
    proj_id = db.session.query(Project.project_id).filter((Project.proj_name == proj_name)&(Project.user_id == user_id)).first()    
    # task = Task(task_item=task_item, project_id=project_id, order_id=order_id, assignee=assignee)
    if proj_id: 
        ctask = Task.query.filter((Task.task_id == order_id) & (Task.project_id == proj_id)).first()
        ctask.is_active = is_active
        db.session.commit()
    else:
        collab_proj_id = db.session.query(Collaborator.project_id).filter(Collaborator.user_id == user_id).all()
        proj_id_proj = db.session.query(Project.project_id).filter(Project.proj_name == proj_name).first()
        print(proj_id_proj)

        for proj in collab_proj_id:
            if proj == proj_id_proj:
                ctask = Task.query.filter((Task.task_id == order_id) & (Task.project_id == proj)).first()
                ctask.is_active = is_active
                db.session.commit()

    
def complete_new_task(email, assignee, order_id, proj_name, is_active):

    user_id = db.session.query(User.user_id).filter((User.email == email)&(User.is_active == 't')).one()
    proj_id = db.session.query(Project.project_id).filter((Project.proj_name == proj_name)&(Project.user_id == user_id)).one()    
    # task = Task(task_item=task_item, project_id=project_id, order_id=order_id, assignee=assignee)
    cntask = Task.query.filter((Task.order_id == order_id) & (Task.project_id == proj_id)).first()
    cntask.is_active = is_active
    
    db.session.commit()


def display_tasks_by_proj_id(project_id):

    return Task.query.filter_by(project_id=project_id).all()


def display_tasks_by_assignee(assignee):

    return Task.query.filter_by(assignee=assignee).all()


def add_collaborator(user_id, project_id):

    collaborator = Collaborator(user_id=user_id, project_id=project_id)

    db.session.add(collaborator)
    db.session.commit()

    return collaborator

def display_shared_project(email):

    user_id = db.session.query(User.user_id).filter((User.email == email)&(User.is_active == 't')).one()
    collab_proj_id = db.session.query(Collaborator.project_id).filter(Collaborator.user_id == user_id).all()
    print(collab_proj_id)
    
    if collab_proj_id:
        for proj in collab_proj_id:

            collab_projs = db.session.query(Project.proj_name, Task.task_item).filter((Project.project_id == proj)& (Task.project_id == proj) & (Task.is_active == 't') ). all()
            print(collab_projs)    
    
        return collab_projs


if __name__ == '__main__':
    from server import app
    connect_to_db(app)