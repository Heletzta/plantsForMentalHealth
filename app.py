from flask import Flask, render_template
from flask import redirect
from flask import request
import json
import os
import ssl
import requests
import mysql.connector


app = Flask(__name__)

@app.route('/')
def hello_world():
        return 'Hello, World!'

@app.route('/echo', methods=['POST'])
def post():
    print(request.is_json)
    content = request.get_json()
    print(content['message'])
    response = {'reply' : content['message']}
    return response

#@app.route('/accessDB', methods=['POST'])
#def seeUser():
#    content = request.get_json()
#    id = content['id']

def connect():
    cnx = mysql.connector.connect(
        user="tami",
        password="lac00caracha!Yay",
        host="localhost",
        database="myDB",
        connection_timeout=10000
    ) 
    return cnx

@app.route('/checkPassword', methods=['GET'])
def checkPassword():
    cnx = connect()
    cursor = cnx.cursor()
    #print(request.args.get('username'))
    #print(request.args.get('password'))
    query = f'SELECT userID, userPassword FROM users WHERE username = "{request.args.get('username')}";'
    cursor.execute(query)
    content = cursor.fetchall()
    password = content[0][1]
    id = content[0][0]
    if request.args.get('password') == password:
        print("id: ", id)
        return f'{id}'
    return "False"

# returns the name of the specified user!
@app.route('/getUser', methods=['GET'])
def getUser():
    """
    Establish the database connection.
    """
    cnx = connect()
    cursor = cnx.cursor()
    query = f'SELECT firstName, lastName FROM users WHERE userID = {request.args.get('id')};'
    cursor.execute(query)
    records = cursor.fetchall()
    name = records[0][0] + " " + records[0][1]
    cursor.close
    return name

@app.route('/Home')
def home():
   return render_template('Home.html')

@app.route('/Login')
def login():
   return render_template('login2.html')


# fetches the last run data, make take a while
@app.route('/getberkeleyEventsFetch', methods=['GET'])
def getBerkeleyEventsFetch():
  params = {
    'api_key': 'tW5orKdv337w',
  }
  r = requests.get(
      'https://www.parsehub.com/api/v2/projects/tRqEuG1uEwNX/last_ready_run/data',
      params=params)
  return render_template('Events.html', events=json.loads(r.text)['Titles'])


# uses the already fetched data and render it -- USE THIS ONE MAINLY
@app.route('/getberkeleyEventsStored', methods=['GET'])
def getBerkeleyEventsStored():
  with open('tmp/events.json', 'r', encoding="utf-8") as f:
    return render_template('Events.html', events=json.loads(f.read())['Titles'])


@app.route('/getURL', methods=['GET'])
def getURL():
    with open('tmp/events.json', 'r', encoding="utf-8") as f:
        return redirect(json.loads(f.read())['Titles'][0]['url'], code=302)



print("STARTED PYTHON WEBSERVICE")

if __name__ == '__main__':
    app.run(host = '0.0.0.0', port=5000)

# web browser makes a request to the server. Server makes a request to SQL. SQL returns the response to the server
# web server responds to the client