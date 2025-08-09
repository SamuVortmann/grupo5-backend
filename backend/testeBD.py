from flask import Flask
import psycopg2 as ps

# Correção da string de conexão
conn = ps.connect(
    dbname="visux_pi",
    user="bruno",
    password="admin",
    host="localhost",  # ou o IP do servidor PostgreSQL
    port="5432"
)

cur = conn.cursor()

# cur.execute('INSERT INTO tRegiao (id, regiao) VALUES (%s, %s)', (2, "Piratuba"))
# cur.execute('DELETE FROM tRegiao WHERE id = 2')
conn.commit()

cur.execute("SELECT * FROM empresa")
records = cur.fetchall()

busca = 1

app = Flask(__name__)
app.debug = True

@app.route("/")
def index():
    
    
    return f"<h1>Olá mundo</h1>"


