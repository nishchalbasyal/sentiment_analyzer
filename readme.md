# Sentimental Analyzer



Welcome to Sentimental Analyzer! This application allows you to analyze text sentiment, providing both positive and negative scores represented in charts and a sentiment analyzer meter. Below are the instructions to set up and use the project effectively.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/nishchalbasyal/sentimentalayzer/
    ```
2. Navigate to the project directory:
    ```bash
    cd SentimentalAnalyzer
    ```
3. Set up a virtual environment (optional but recommended):
    ```bash
    python3 -m venv venv
    ```
4. Activate the virtual environment:
    - On Windows:
        ```bash
        venv\Scripts\activate
        ```
    - On macOS and Linux:
        ```bash
        source venv/bin/activate
        ```
5. Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

## Usage

1. Run the Django development server:
    ```bash
    python manage.py runserver
    ```
2. Access the application in your web browser at `http://localhost:8000/`.
3. Navigate through the following pages:
    - **Homepage**: Landing page providing an overview of the application.
    - **Login Page**: Access to user authentication and login.
    - **Register Page**: Registration form for new users.
    - **Analyzer Page**: Main page for analyzing text sentiment, displaying sentiment scores in charts and an analyzer meter.
4. Enter the text you want to analyze on the Analyzer Page and click the "Check" button.
5. View the sentiment analysis results, including positive and negative scores represented in charts and an analyzer meter.

## Project Structure

```
main/
│
├── etc/
├── include/
├── Lib/
├── Scripts/
├── SentimentAnalyzer/
├── share/
├── pyvenv.cfg
├── readme.md
└── requirements.txt
```

## Screenshots

![Sentimental Analyzer](demoUtils/Part1_HomePage.gif)
![Sentimental Analyzer](demoUtils/Part2_LoginPage.gif)
![Sentimental Analyzer](demoUtils/Part4_FinalDemonstration.gif)

## Contributors

- [Nishchal Basyal](https://github.com/nishchalbasyal)
- [Shiv Gaire](https://github.com/shiva-gaire1853)

---

Feel free to contribute, report issues, or provide feedback to make Sentimental Analyzer even better!
