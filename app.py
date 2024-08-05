from flask import Flask, render_template, session
from flask import redirect
from flask import request
import json
import os
import ssl
import requests
import mysql.connector
from cryptography.fernet import Fernet



app = Flask(__name__)
app.secret_key = "hello"


def connect():
    cnx = mysql.connector.connect(
        user="tami",
        password="lac00caracha!Yay",
        host="localhost",
        database="myDB",
        connection_timeout=10000
    ) 
    return cnx


def getKey():
    cnx = connect()
    cursor = cnx.cursor()
    query = f'SELECT keyNum FROM keyNum;'
    cursor.execute(query)
    content = cursor.fetchall()    
    #print(content[0][0])
    if not content:
        key = Fernet.generate_key()
        insert = f'insert into keyNum (keyNum) values ("{key.decode()}")'
        cursor.execute(insert)
        cnx.commit()
        cursor.close
        return key
    cursor.close
    return content[0][0]

key = getKey()
fernet = Fernet(key)
#print(key)



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



@app.route('/createAccountMethod', methods = ['POST'])
def createAccountMethod():
    
    cnx = connect()
    cursor = cnx.cursor()
    #print("hello!")
    firstname = request.form['Firstname']
    #print(firstname)
    lastname = request.form['Lastname']
    #print(lastname)
    username = request.form['usernameCreate']
    #print(username)
    password = request.form['passwordCreate']
    email = request.form['Email']
    encryptedPassword = fernet.encrypt(password.encode()).decode()
    #encryptedPassword = "'" + encryptedPassword + "'"
    query = f'insert into users (firstName, lastName, email, username, userPassword, adminOrNot) values ("{firstname}", "{lastname}", "{email}", "{username}", "{encryptedPassword}", false);'
    cursor.execute(query)
    cnx.commit()
    cursor.close
    return render_template('login2.html', e='3')
    
    # STOPPED HEREEE


@app.route('/checkPassword', methods=['POST'])
def checkPassword():
    cnx = connect()
    cursor = cnx.cursor()
    #print(request.form['username'])
    #print(request.form['password'])
    username = request.form['username']
    query = f'SELECT userID, userPassword FROM users WHERE username = "{username}";'
    cursor.execute(query)
    content = cursor.fetchall()
    cursor.close
    #print(content)
    if not content:
        return render_template('login2.html', e='2')
    #print(type(content[0][1]))
    #print(content[0][1].encode())
    #print("decoded: ", fernet.decrypt(content[0][1].encode()).decode())
    #print("user password: ", request.form['password'])
    id = content[0][0]
    if request.form['password'] == fernet.decrypt(content[0][1].encode()).decode():
        session['userID'] = id # unique to everyone that logs in to the application
        return home()
    return render_template('login2.html', e='1')


@app.route('/logout_user', methods = ['GET', 'POST'])
def logout_user():
    session.pop('userID', None)
    return render_template('login2.html')

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
    userID = None
    if session['userID']:
        userID = session['userID']
    return render_template('Home.html')

@app.route('/Login')
def login():
   return render_template('login2.html')

@app.route('/Garden')
def Garden():
   return render_template('Garden.html')

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
    
    #app.config['SESSION_TYPE'] = 'filesystem'
    app.run(host = '0.0.0.0', port=5000)

    
    

# web browser makes a request to the server. Server makes a request to SQL. SQL returns the response to the server
# web server responds to the client


"""

Open the command prompt
Navigate to the bin folder
Run the command mysql -u root -p
Enter your password


create database myDB;
"""
