from flask import Flask, render_template
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

@app.route("/")
@app.route("/index")
def hello():
    return render_template("index.html")

class Purchases(Resource):
    def get(self, my_id):
        purchases = []
        lines = open("/static/data/purchases.txt", "r").readlines()
        for i in range(len(lines)):
            lines[i] = lines[i].split("\t")
            purchases.append({
                    user_id: my_id,
                    date: lines[i][0],
                    company: lines[i][1],
                    category: lines[i][2],
                    amount: int(lines[i][3])
                })

        return jsonify({ user_purchases: purchases })

class Deposits(Resource):
    def get(self, my_id):
        deposits = []
        lines = open("/static/data/deposits.txt", "r").readlines()
        for i in range(len(lines)):
            lines[i] = lines[i].split("\t")
            purchases.append({
                    user_id: my_id,
                    date: lines[i][0],
                    amount: int(lines[i][1])
                })

        return jsonify({ user_deposits: deposits })

api.add_resource(Purchases, "/purchases/<string:my_id>")
api.add_resource(Deposits, "/deposits/<string:my_id>")

if __name__ == "__main__":
    app.run()
