from flask import *
import subprocess
app = Flask(__name__)

@app.route("/", methods=["POST", "GET"])
def home():
    if request.method == "POST":
        subprocess.run("c:\\Users\\fcpla\\Downloads\\granny-legacy-offline-v1.9.1\\Granny Legacy Offline v1.9.1\\Play Granny Legacy x64.exe")
    return render_template(
        ["index.html"]
    )
app.run()