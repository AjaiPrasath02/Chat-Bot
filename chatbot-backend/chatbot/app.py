from flask import Flask, request, jsonify
from flask_cors import CORS
from llm_integration import get_llm_response


app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

@app.route('/api/query', methods=['POST'])
def handle_query():
    try:
        data = request.get_json()
        user_query = data.get('query')

        # Get LLM response or database query
        response = get_llm_response(user_query)

        return jsonify({"response": response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

