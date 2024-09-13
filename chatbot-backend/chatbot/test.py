# test_import.py
try:
    from flask_cors import CORS
    print("Import successful")
except ImportError as e:
    print(f"Import failed: {e}")
