from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from cryptography.fernet import Fernet
import requests
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

# Load environment variables
load_dotenv()

# Generate encryption key
key = Fernet.generate_key()
fernet = Fernet(key)

# Encrypt the API key
encrypted_api_key = fernet.encrypt(os.getenv('YT_API_KEY').encode())

def get_decrypted_api_key():
    return fernet.decrypt(encrypted_api_key).decode()

@app.route('/api/comments/<video_id>')
def get_comments(video_id):
    try:
        api_key = get_decrypted_api_key()
        comments = []
        next_page_token = None
        
        while True:
            url = 'https://www.googleapis.com/youtube/v3/commentThreads'
            params = {
                'part': 'snippet',
                'videoId': video_id,
                'key': api_key,
                'maxResults': 100
            }
            
            if next_page_token:
                params['pageToken'] = next_page_token
                
            response = requests.get(url, params=params)
            
            if not response.ok:
                return jsonify({'error': 'Failed to fetch comments'}), response.status_code
                
            data = response.json()
            
            for item in data['items']:
                comment = {
                    'id': item['id'],
                    'author': item['snippet']['topLevelComment']['snippet']['authorDisplayName'],
                    'text': item['snippet']['topLevelComment']['snippet']['textDisplay']
                }
                comments.append(comment)
            
            next_page_token = data.get('nextPageToken')
            if not next_page_token:
                break
        
        return jsonify({
            'comments': comments,
            'count': len(comments)
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)