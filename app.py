from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# MySQL connection configuration
db = mysql.connector.connect(
    host='localhost',
    user='root',
    password='math',
    database='userdb'
)



# Route to handle adding a new user
@app.route('/adduser', methods=['POST'])
def add_user():
    data = request.get_json()
    name = data.get('name')
    user_id = data.get('user_id')
    password = data.get('password')
    mobile = data.get('mobile')
    
   

    try:
        with db.cursor() as cursor:
            
            sql = "INSERT INTO users (name,id,password,mobile) VALUES (%s, %s,%s,%s)"
            values = (name,user_id, password,mobile)
            cursor.execute(sql, values)
            db.commit()
            return jsonify({'message': 'User added successfully'})
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    

@app.route('/addlike', methods=['POST'])
def add_like():
    data = request.get_json()
    
    user_id = data.get('user_id')
    liked = data.get('liked')
    
   

    try:
        with db.cursor() as cursor:
            
            sql = "UPDATE users set liked=%s where id=%s"
            values = (liked,user_id)
            cursor.execute(sql, values)
            db.commit()
            return jsonify({'message': 'User added successfully'})
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500



@app.route('/checkuser', methods=['POST'])
def check_user():
    data = request.get_json()
   
    user_id = data.get('user_id')
    
   
    
   

    try:
        with db.cursor() as cursor:
            
            sql = "SELECT * FROM users  where id=%s"
            
            cursor.execute(sql, (user_id,))
            info = cursor.fetchall()
            
            
            return jsonify({'message': info})
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    




if __name__ == '__main__':
    app.run(debug=True)