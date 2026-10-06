from flask import *
from subprocess import *
app = Flask(__name__)
jogos = {}
cat = run(["cat", "db.json"], capture_output=True, text=True)
if cat.stderr == "":
    pass
else:
    run(["touch", "db.json"])

@app.route("/", methods=["POST", "GET"])
def index():
    return render_template(
        "index.html"
    )
app.run()
