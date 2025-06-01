import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS

server = Flask(__name__)
CORS(server)

DB_PATH = "users.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL
        )
    """)
    c.execute("""
        CREATE TABLE IF NOT EXISTS reservations(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            reserver TEXT NOT NULL,
            phoneNumber TEXT NOT NULL,
            date TEXT NOT NULL,
            time TEXT NOT NULL,
            tableNumber TEXT NOT NULL,
            people INTEGER NOT NULL
        )
    """)
    conn.commit()
    conn.close()

init_db()

@server.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT id, password FROM users WHERE username = ?",(username,))
    row = c.fetchone() #조회 경과 중 첫 번째 행만 가져옴
    conn.close()

    if row and row[1]== password:
        user_id = row[0]
        return jsonify({"success": True, "user_id":user_id})
    else:
        return jsonify({"success": False,"message":"아이디 또는 비밀번호가 틀렸습니다."})

@server.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute("INSERT INTO users (username, email, password) VALUES (?,?,?)", (username,email,password))
        conn.commit()
        conn.close()
        return jsonify({"success":True})
    except sqlite3.IntegrityError:
        return jsonify({"success": False, "message": "이미 존재하는 사용자입니다."})

@server.route("/api/reserve",methods=["POST"])
def reserve():
    data = request.get_json()

    required = ['user_id','reserver', 'phoneNumber','date','time','tableNumber','people']
    if not all(k in data for k in required):
        return jsonify({'success':False, 'message':'필수 정보 누락'}),400

    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute("INSERT INTO reservations (user_id, reserver, phoneNumber, date, time, tableNumber, people) VALUES (?,?,?,?,?,?,?)", (
            data['user_id'], data['reserver'],data['phoneNumber'],data['date'],data['time'],data['tableNumber'],int(data['people'].replace("명","").strip())
        ))
        conn.commit()
        conn.close()
        return jsonify({"success":True}),200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}),500

@server.route("/api/reserved-tables",methods=["GET"])
def get_reserved_tables():
    date = request.args.get("date")
    time = request.args.get("time")
    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute("SELECT tableNumber FROM reservations WHERE date=? AND time =?", (date, time))
        rows = c.fetchall() #조회된 모든 행을 리스트 형태로 가져옴
        conn.close()

        reserved_tables = [row[0] for row in rows]
        return jsonify({"success":True,"reserved_tables": reserved_tables}),200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}),500

@server.route("/api/cancel",methods=["GET"])
def cancel_check():
    user_id = request.args.get("user_id")

    if not user_id:
        return jsonify({"success": False, "message":"user_id가 필요합니다."}),400
    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute("SELECT * FROM reservations WHERE user_id = ?", (user_id,))
        rows = c.fetchall() #조회된 모든 행을 리스트 형태로 가져옴
        conn.close()

        reservations = []
        for row in rows:
            reservations.append({
                "id":row[0],
                "user_id": row[1],
                "reserver":row[2],
                "phoneNumber":row[3],
                "date":row[4],
                "time":row[5],
                "tableNumber":row[6],
                "people":row[7]
            })
        return jsonify({"success":True,"reservations": reservations}),200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}),500

@server.route("/api/cancel/<int:reservation_id>",methods=["DELETE"])
def cancel_reservation(reservation_id):
    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute("DELETE FROM reservations WHERE id = ?",(reservation_id,))
        conn.commit()
        conn.close()

        return jsonify({"success":True}),200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}),500

if __name__ == "__main__":
    server.run(port=5000,debug=True)