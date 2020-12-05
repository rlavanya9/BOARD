from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class User(db.Model):
    """A user."""
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(30), nullable=False)
    is_active = db.Column(db.Boolean, default=True)


    def __repr__(self):
        if self.is_active:      
            return f'<User: user = {self.user_id} email = {self.email}>'

class Project(db.Model):
    """A project."""
    __tablename__ = 'projects'

    project_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    proj_name = db.Column(db.String(30), unique=True, nullable=False)
    due_date = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

    user = db.relationship('User', backref='projects')

    def __repr__(self):
        return f'<Project: proj_name={self.proj_name} due_date={self.due_date}>'

class Label(db.Model):
    """Project Label"""
    __tablename__ = 'labels'

    label_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    label_name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    project_id = db.Column(db.Integer, db.ForeignKey('projects.project_id'))

    user = db.relationship('User', backref='labels')
    project = db.relationship('Project', backref='labels')

    def __repr__(self):
        return f'<Label: label_name={self.label_name}>'


class Favourite(db.Model):
    """Favourites"""
    __tablename__ = 'favourites'

    favs_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.project_id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

    user = db.relationship('User', backref='favourites')
    project = db.relationship('Project', backref='favourites')

    def __repr__(self):
        return f'<Favourite: favs_id={self.favs_id}>'

class Task(db.Model):
    """Tasks table"""
    __tablename__ = 'tasks'

    task_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    task_item = db.Column(db.String(50))
    project_id = db.Column(db.Integer, db.ForeignKey('projects.project_id'))
    is_active = db.Column(db.Boolean, default=True)
    order_id = db.Column(db.Integer)
    assignee = db.Column(db.String(30))

    project = db.relationship('Project', backref='tasks')

    def __repr__(self):
        return f'<Task: task_item={self.task_item} assignee={self.assignee} is_active={self.is_active}>'

class Collaborator(db.Model):
    """collaborator"""
    __tablename__ = 'collaborators'

    collab_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    project_id = db.Column(db.Integer, db.ForeignKey('projects.project_id'))

    user = db.relationship('User', backref='collaborators')
    project = db.relationship('Project', backref='collaborators')

    def __repr__(self):
        return f'<Collaborator: collab_id={self.collab_id}>'



def connect_to_db(flask_app, db_uri='postgresql:///mytodo', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')


if __name__ == '__main__':
    from server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    connect_to_db(app)