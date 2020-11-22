"""Server for todo app."""
from flask import Flask, render_template, request, flash, session, redirect,jsonify
from model import connect_to_db
import crud
from jinja2 import * # StrictUndefined

app = Flask(__name__)
app.secret_key = "dfsghj"
app.jinja_env.undefined = StrictUndefined
app.config['PRESERVE_CONTEXT_ON_EXCEPTION'] = True

@app.route('/')
def welcome_page():
    """Show the application's homepage."""

    return render_template('base.html')

@app.route('/signup', methods=["POST"])
def register_user():
    """add new user"""
    data = request.get_json()

    print(data)

    email = data['email']
    password = data['password']

    existing_user = crud.check_user(email)


    if existing_user:
        return jsonify("Email already in use, cannot create account.")
    else:
        new_user = crud.add_user(email,password)
        return jsonify("Account created! please log in")



@app.route('/login', methods=["POST"])
def login_user():
    """Log a new user into the site"""

    data = request.get_json()

    print(data)
    
    email = data['email']
    password = data['password']
    print(crud.check_user(email))
    print(crud.validate_user(email, password))
    if crud.check_user(email):
        
        is_valid = crud.validate_user(email, password)
        if is_valid:
            # return jsonify("Logged in successfully")
              return jsonify(email)  
        else:
            return jsonify("Email and password do not match, please check your login and try again or create an account.")
    else:
        return jsonify("Email is not in our system, Please create a new account.")
    
    
@app.route('/projdet', methods=["POST"])
def project_detail():
    """add project details to DB"""

    data = request.get_json()

    print(data)
    # add details to project table
    pname = data['proj_name']
    # due_date = data['due_date']
    # lname = data['label_name']
    email = data['email']
    # fav = data['favourite']
    is_Complete = data.get('isComplete')
    if is_Complete == True:
        is_active = False
    else:
        is_active = True

    order_id =data['order_id']
    assignee = data['assignee']
    items = data['task_item']

    # add details to project table
    # user_id = crud.get_user_id(email)
    # new_proj = crud.add_project(pname,due_date,user_id)

    

    # add details to label table
    proj_id = crud.get_proj_id(pname)
    # new_label = crud.add_label(lname, user_id, proj_id)

    # add details to task table
    new_tasks = crud.add_task(items, proj_id, is_active, order_id, assignee)

    # add details to favourites table
    # if fav == True:
    #     new_fav = crud.add_favourites(proj_id, user_id)
    
    return jsonify(email)

@app.route('/tproj.json', methods=["POST"])
def today_project():
    """view today's projects"""
    data = request.get_json()
    print(data)
    
    email = data['email']
    today = crud.display_today_project(email)
    print(today)
    proj_name = ''
    today_dict = {}
    for element in today:
        proj_name = element[0]
        task_item = element[1]
        if proj_name in today_dict:
            today_dict[proj_name].append(task_item)
        else:
            today_dict[proj_name] = [task_item]
    return jsonify([today_dict])

# @app.route('/pastdue')
# def upcome_proj():
#     """view all the upcoming projects"""

#     upcoming = crud.past_due()
#     return jsonify(upcoming)

# @app.route('/favs')
# def fav_tasks():

#     favs = crud.display_favourite()
#     return jsonify(favs)

# @app.route('/uproj')
# def upcome_proj():
#     """view all the upcoming projects"""

#     upcoming = crud.display_upcoming_project()
#     return jsonify(upcoming)

# @app.route('/favs')
# def fav_tasks():

#     favs = crud.display_favourite()
#     return jsonify(favs)

# @app.route('/dislabel',methods=["POST"])
# def labl_tasks():
#      """view label projects"""
    
#     # data = request.get_json()
#     # print(data)
#     # email = data['email']
#     label = crud.display_labels(email)
#     print(today)
#     # proj_name = ''
#     # today_dict = {}
#     # for element in today:
#     #     proj_name = element[0]
#     #     task_item = element[1]
#     #     if proj_name in today_dict:
#     #         today_dict[proj_name].append(task_item)
#     #     else:
#     #         today_dict[proj_name] = [task_item]
#     return jsonify(label)

# @app.route('/assignee')
# def assign_tasks():

#     assign = crud.display_tasks_by_assignee()
#     return jsonify(assign)



if __name__ == '__main__':
    connect_to_db(app)
    app.run(debug=True, host='0.0.0.0')