from flask import Flask, render_template, request, url_for, session
import env, time

app = Flask(__name__)
app.config.from_object(env)

@app.route("/")
def index():
    return render_template('index.html')

@app.route('/projects/')
def projects():
    return 'The project page'

@app.route('/login/')
@app.route('/login/<values>', methods=['GET', 'POST'])
def login():
    return render_template('login.html')

@app.route('/registro/empresas', methods=['GET', 'POST'])
def registrarEmpresa():
    return render_template('cadastroEmpresa.html')

@app.route('/registro/funcionario', methods=['GET', 'POST'])
@app.route('/registro/funcionarios', methods=['GET', 'POST'])
def registrarFuncionarios():
    return render_template('cadastroFuncionario.html')


# daqui pra baixo é apenas com validação!
@app.route('/mapa')
def mapa():

    versao = int(time.time())
    return render_template('mapa.html', API_KEY=app.config['API_MAPS'], versao=versao)

@app.route('/notificacoes')
def notificacoes():
    return render_template('notificacoes.html')

@app.route('/historico')
@app.route('/historico/<poste>')
def historico(poste=1):
    return render_template('historico.html', poste=poste)

