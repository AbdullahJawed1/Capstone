from flask import Flask, request, jsonify
import pandas as pd
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS
import os


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Load the dataset
file_path = os.path.abspath('../Capstone/capstone/src/assets/Fyp.csv')

# Read the CSV file
data = pd.read_csv(file_path, encoding='latin1')

nltk.download('punkt')
nltk.download('stopwords')

def preprocess_text(text):
    # Tokenize the text
    tokens = word_tokenize(text.lower())
    
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    filtered_tokens = [word for word in tokens if word.isalnum() and word not in stop_words]
    
    # Return preprocessed text as a string
    return ' '.join(filtered_tokens)

def calculate_similarity(text1, text2):
    # Preprocess the texts
    preprocessed_text1 = preprocess_text(text1)
    preprocessed_text2 = preprocess_text(text2)
    
    # Create TF-IDF vectorizer
    tfidf_vectorizer = TfidfVectorizer()
    
    # Fit and transform the texts
    tfidf_matrix = tfidf_vectorizer.fit_transform([preprocessed_text1, preprocessed_text2])
    
    # Calculate cosine similarity
    cosine_sim = cosine_similarity(tfidf_matrix[0], tfidf_matrix[1])[0][0]
    
    return cosine_sim

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

@app.route('/check-similarity', methods=['POST'])
def check_similarity():
    # Get user input summary from request
    user_summary = request.json.get('user_summary', '')
    
    # Concatenate project titles and summaries
    project_texts = data['title'] + ' ' + data['summary']
    
    # Calculate similarity for each project text in the dataset
    max_similarity = 0
    most_similar_project = None
    for idx, project_text in enumerate(project_texts):
        similarity_percentage = calculate_similarity(project_text, user_summary)
        if similarity_percentage > max_similarity:
            max_similarity = similarity_percentage
            most_similar_project = data.iloc[idx]
    
    return jsonify({
        'most_similar_project': most_similar_project.to_dict(),
        'similarity_percentage': max_similarity
    })




@app.route('/recommend-projects', methods=['POST'])
def get_recommendations():
    user_interests = request.json.get('user_interests', '')  # Get user interests from request
    recommended_projects = recommend_projects(user_interests, data)
    return jsonify(recommended_projects)

if __name__ == '__main__':
    app.run(debug=True)
