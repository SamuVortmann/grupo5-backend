from flask import Flask, render_template, request, url_for


app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route('/projects/')
def projects():
    return 'The project page'


@app.route('/login', methods=['GET', 'POST'])
def login():
    return render_template('login.html')

@app.route('/registro/empresas', methods=['GET', 'POST'])
def registrarEmpresa():
    return render_template('login.html')

@app.route('/registro/funcionarios', methods=['GET', 'POST'])
def registrarFuncionarios():
    
    return render_template('login.html')

