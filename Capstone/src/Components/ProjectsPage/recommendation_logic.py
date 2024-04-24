import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os

def recommend_projects(user_interests, data, N=10):
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

    return recommended_projects[['title']]

# Get the current directory
current_dir = os.path.dirname(os.path.abspath(__file__))
# Path to the dataset within React folder
data_path = os.path.join(current_dir, 'C:\Users\abdul\Documents\GitHub\Capstone\Capstone\src\assets\Fyp.csv', 'react', 'public', 'fyp.csv')

# Load data
data = pd.read_csv(data_path, encoding='latin1')

# Prompt user for preferences
user_interests = input("Enter your interests: ")

# Recommend projects based on user preferences
recommended_projects = recommend_projects(user_interests, data)

print(recommended_projects)
