from flask import Flask, request, jsonify
from transformers import pipeline
import os

# Initialize Flask app
app = Flask(__name__)

# Load Hugging Face pipeline for translation (You can replace this with any model you need)
translation_model = pipeline("translation", model="Helsinki-NLP/opus-mt-en-es")

@app.route('/translate-youtube', methods=['POST'])
def translate_youtube():
    data = request.get_json()

    video_link = data.get('videoLink', '')
    language = data.get('language', 'es')  # Default to Spanish

    if not video_link:
        return jsonify({'error': 'No video link provided'}), 400

    # Here, you would normally use an API to fetch subtitles or transcriptions from the video link
    # For now, we'll mock the transcription as an example
    transcription = "This is a sample transcription from the video."

    # Perform translation
    translated_text = translation_model(transcription, target_lang=language)[0]['translation_text']

    return jsonify({'translatedText': translated_text})

# Run the Flask server
if __name__ == '__main__':
    app.run(debug=True)
