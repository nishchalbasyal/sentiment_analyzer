import joblib
import os


class SentimentAnalyzer:

    def __init__(self):
        project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

        vectorizer_path = os.path.join(project_dir, 'utils', 'vecotrizer.pkl')
        analyzer_path = os.path.join(project_dir, 'utils', 'logistic_model_best.pkl')

        self.vectorizer = joblib.load(vectorizer_path)
        self.analyzer = joblib.load(analyzer_path)
    
    def text_vectorizer(self,text):
        print(text)
        text_vector = self.vectorizer.transform([text])
        return text_vector
    
    def predict_sentiment(self,text_vector):
        output = self.analyzer.predict_proba(text_vector)
        return {'negative':round(output[0,0]*100), 'positive':round(output[0,1]*100)}



 