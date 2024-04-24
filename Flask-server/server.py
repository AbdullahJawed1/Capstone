from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the dataset
data = pd.read_csv('C:\\Users\\abdul\\Documents\\GitHub\\Capstone\\Capstone\\src\\assets\\Fyp.csv', encoding='latin1')

def recommend_projects(user_interests, data, N=12):
    # Extract features
    tfidf_vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf_vectorizer.fit_transform(data['title'] + ' ' + data['summary'] + ' ' + data['domain'] + ' ' + data['tag'])

    # Transform user interests using the same vectorizer
    user_tfidf = tfidf_vectorizer.transform([user_interests])

    # Calculate similarity
    similarities = cosine_similarity(user_tfidf, tfidf_matrix).flatten()

    # Recommend top N projects
    top_indices = similarities.argsort()[::-1][:N]
    recommended_projects = data.iloc[top_indices]

    return recommended_projects.to_dict(orient='records')  # Return all columns

@app.route('/recommend-projects', methods=['POST'])
def get_recommendations():
    user_interests = request.json.get('user_interests', '')  # Get user interests from request
    recommended_projects = recommend_projects(user_interests, data)
    return jsonify(recommended_projects)

if __name__ == '__main__':
    app.run(debug=True)
