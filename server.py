"""Server for todo app."""
from flask import Flask, render_template, request, flash, session, redirect,jsonify
from model import connect_to_db
import crud
from jinja2 import * # StrictUndefined

app = Flask(__name__)
app.secret_key = "dfsghj"
app.jinja_env.undefined = StrictUndefined
app.config['PRESERVE_CONTEXT_ON_EXCEPTION'] = True

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def welcome_page(path):
    """Show the application's homepage."""

    return render_template('base.html')

@app.route('/signup', methods=["POST"])
def register_user():
    """add new user"""
    data = request.get_json()

    print(data)

    email = data['email']
    password = data['password']
    confirmpswd = data['confirmpswd']
    if ((email != '') and (password != '') and (confirmpswd == password)) :
        existing_user = crud.check_user(email)


        if existing_user:
            return jsonify("Email already in use, cannot create account.")
        else:
            new_user = crud.add_user(email,password)
            return jsonify("Account created! please log in")
    else:
        return jsonify("Enter valid email and password")


@app.route('/login', methods=["POST"])
def login_user():
    """Log a new user into the site"""

    data = request.get_json()

    print(data)
    
    email = data['email']
    password = data['password']
    # print(crud.check_user(email))
    # print(crud.validate_user(email, password))
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
    due_date = data['due_date']
    lname = data['label_name']
    email = data['email']
    fav = data['favourite']
    is_Complete = data.get('isComplete')
    if is_Complete == True:
        is_active = False
    else:
        is_active = True

    order_id =data['order_id']
    
    assignee = data.get('assignee', None) # collaborator steps
    
    items = data['task_item']

    proj_exists = crud.display_project(pname)
    print(proj_exists)
    
    if proj_exists:
        # add details to task table
        proj_id = crud.get_proj_id(pname)
        new_tasks = crud.add_task(items, proj_id, is_active, order_id, assignee)
    else:    
        # add details to project table
        user_id = crud.get_user_id(email)
        new_proj = crud.add_project(pname,due_date,user_id)
            
        # add details to label table
        proj_id = crud.get_proj_id(pname)
        new_label = crud.add_label(lname, user_id, proj_id)

        # add details to favourites table
        if fav == True:
            new_fav = crud.add_favourites(proj_id, user_id)

        # add details to task table
        new_tasks = crud.add_task(items, proj_id, is_active, order_id, assignee)

        #add details to assignee table - collaborator steps
        if assignee:
            assign_id = crud.get_user_id(assignee)
            new_assign = crud.add_collaborator(assign_id,proj_id)

    return jsonify(email)

@app.route('/allproj.json', methods=["POST"])
# @app.route('/allproj.json')
def all_project():
    """view all projects"""
    data = request.get_json()
    print(data)
    
    email = data['email']  
    project_name = data['proj_name']
    # email = 'test03@test.tst'
    # project_name = 'trader joes'    
    allproj = crud.display_all_project(email,project_name)
    print(allproj)
    proj_name = ''
    allproj_dict = {}
    for element in allproj:
        proj_name = element[0]
        task_dict = dict()
        task_dict["id"] = element[1]
        task_dict["text"] = element[2]
        if proj_name in allproj_dict:
            tasks = allproj_dict[proj_name]
            tasks.append(task_dict)
        else:
            allproj_dict[proj_name] = [task_dict]
    return jsonify([allproj_dict])

@app.route('/eproj.json', methods=["POST"])
def edit_project():
    """view today's projects"""
    data = request.get_json()
    print(data)
    email = data['email']
    assignee = data['assignee']
    order_id = data['order_id']
    # is_Complete = data['is_Complete']
    proj_name = data['proj_name']
    task_item = data['task_item']
    edit = crud.edit_task(email, assignee, order_id, proj_name, task_item)
    # print(edit)
    return jsonify(email)

@app.route('/enewproj.json', methods=["POST"])
def edit_new_project():
    """view new projects"""
    data = request.get_json()
    print(data)
    email = data['email']
    assignee = data['assignee']
    order_id = data['order_id']
    # is_Complete = data['is_Complete']
    proj_name = data['proj_name']
    task_item = data['task_item']
    editnew = crud.edit_new_task(email, assignee, order_id, proj_name, task_item)
    # print(edit)
    return jsonify(email)

@app.route('/rproj.json', methods=["POST"])
def remove_project():
    """view today's projects"""
    data = request.get_json()
    print(data)
    email = data['email']
    assignee = data['assignee']
    order_id = data['order_id']
    # is_Complete = data['is_Complete']
    proj_name = data['proj_name']
    remove = crud.remove_task(email, assignee, order_id, proj_name)
    return jsonify(email)

@app.route('/rnewproj.json', methods=["POST"])
def remove_new_project():
    """view today's projects"""
    data = request.get_json()
    print(data)
    email = data['email']
    assignee = data['assignee']
    order_id = data['order_id']
    # is_Complete = data['is_Complete']
    proj_name = data['proj_name']
    removenew = crud.remove_new_task(email, assignee, order_id, proj_name)
    return jsonify(email)

@app.route('/cproj.json', methods=["POST"])
def complete_project():
    """view today's projects"""
    data = request.get_json()
    print(data)
    email = data['email']
    assignee = data['assignee']
    order_id = data['order_id']
    # is_Complete = data['is_Complete']
    is_Complete = data.get('isComplete')
    if is_Complete == True:
        is_active = False
    else:
        is_active = True
    print('*********isComplete*******')
    print(is_active)
    proj_name = data['proj_name']
    compl = crud.complete_task(email, assignee, order_id, proj_name, is_active)
    return jsonify(email)

@app.route('/cnewproj.json', methods=["POST"])
def complete_new_project():
    """view today's projects"""
    data = request.get_json()
    print(data)
    email = data['email']
    assignee = data['assignee']
    order_id = data['order_id']
    # is_Complete = data['is_Complete']
    is_Complete = data.get('isComplete')
    if is_Complete == True:
        is_active = False
    else:
        is_active = True
    print('*********isComplete*******')
    print(is_active)
    proj_name = data['proj_name']
    complnew = crud.complete_new_task(email, assignee, order_id, proj_name, is_active)
    return jsonify(email)

@app.route('/cardproj.json', methods=["POST"])
def card_project():
    """view today's projects"""
    data = request.get_json()
    print(data)
    
    email = data['email']
    allcards = crud.display_card_project(email)
    print(allcards)
    proj_name = ''
    allcard_dict = {}
    for element in allcards:
        proj_name = element[0]
        task_item = element[1]
        if proj_name in allcard_dict:
            allcard_dict[proj_name].append(task_item)
        else:
            allcard_dict[proj_name] = [task_item]
    return jsonify([allcard_dict])


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
   
@app.route('/pastdue.json', methods=["POST"])
def past_proj():
    """view all the past due projects"""

    data = request.get_json()
    print(data)
    
    email = data['email']
    past_proj = crud.past_due(email)
    print(past_proj)
    proj_name = ''
    past_dict = {}
    for element in past_proj:
        proj_name = element[0]
        task_item = element[1]
        if proj_name in past_dict:
            past_dict[proj_name].append(task_item)
        else:
            past_dict[proj_name] = [task_item]
    return jsonify([past_dict])


@app.route('/upproj.json', methods=["POST"])
def upcome_proj():
    """view all the upcoming projects"""

    data = request.get_json()
    print(data)
    
    email = data['email']
    up_proj = crud.display_upcoming_project(email)
    print(up_proj)
    proj_name = ''
    up_dict = {}
    for element in up_proj:
        proj_name = element[0]
        task_item = element[1]
        if proj_name in up_dict:
            up_dict[proj_name].append(task_item)
        else:
            up_dict[proj_name] = [task_item]
    return jsonify([up_dict])


@app.route('/favs.json',methods=["POST"])
def fav_tasks():
    data = request.get_json()
    print(data)
    
    email = data['email']
    favs = crud.display_favourite(email)
    print(favs)
    proj_name = ''
    fav_dict = {}
    for element in favs:
        proj_name = element[0]
        task_item = element[1]
        if proj_name in fav_dict:
            fav_dict[proj_name].append(task_item)
        else:
            fav_dict[proj_name] = [task_item]
    return jsonify([fav_dict])

@app.route('/label.json',methods=["POST"])
def labl_tasks():

    """view label projects"""
    data = request.get_json()
    print(data)
    
    email = data['email']
    label = crud.display_labels(email)
    print(label)
    proj_name = ''
    label_dict = {}
    for element in label:
        proj_name = element[0]
        task_item = element[1]
        if proj_name in label_dict:
            label_dict[proj_name].append(task_item)
        else:
            label_dict[proj_name] = [task_item]
    return jsonify([label_dict])
    

@app.route('/shared.json', methods=["POST"])
def shared_project():
    """view shared projects"""
    data = request.get_json()
    print(data)
    
    email = data['email']
    shared = crud.display_shared_project(email)
    print(shared)
    proj_name = ''
    shared_dict = {}
    for element in shared:
        proj_name = element[0]
        task_item = element[1]
        if proj_name in shared_dict:
            shared_dict[proj_name].append(task_item)
        else:
            shared_dict[proj_name] = [task_item]
    return jsonify([shared_dict])



if __name__ == '__main__':
    connect_to_db(app)
    app.run(debug=True, host='0.0.0.0')