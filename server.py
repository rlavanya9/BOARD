from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def welcome_page():
    """Show the application's homepage."""

    return render_template('welcome.html')

@app.route('/home')
def home_page():
    """Show the application's homepage."""

    return render_template('homepage.html')

@app.route('/signin')
def sign_in():
    """Show the application's homepage."""

    return render_template('signin.html')

@app.route('/todo')
def to_do():
    """Show the application's homepage."""

    return render_template('todo.html')

@app.route('/vproject')
def view_project():
    """Show the application's homepage."""

    return render_template('viewproject.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')