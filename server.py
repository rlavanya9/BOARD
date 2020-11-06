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



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')