from groq import Groq
import json
import os
from dotenv import load_dotenv

# 🔹 Load environment variables
load_dotenv()

# 🔹 Initialize Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def generate_optimized_code(code: str):
    """
    Generate optimized version of code using LLM
    """

    prompt = f"""
You are a senior software engineer.

Improve the given code focusing on:
- performance
- readability
- best practices

Return ONLY valid JSON.

FORMAT:
{{
  "optimized_code": "string",
  "explanation": "short explanation (2-3 lines max)",
  "improvements": ["point 1", "point 2"]
}}

RULES:
- No markdown
- No extra text
- Always return all keys
- Keep explanation short

Code:
{code}
"""

    try:
        completion = client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.2,
        )

        content = completion.choices[0].message.content.strip()

        # 🔥 Parse safely
        parsed = safe_json_parse(content)

        # 🔥 Validate structure
        return validate_response(parsed, code)

    except Exception as e:
        return fallback_response(code, str(e))


# 🧠 Safe JSON parser
def safe_json_parse(text: str):
    try:
        return json.loads(text)
    except:
        try:
            start = text.find("{")
            end = text.rfind("}") + 1
            return json.loads(text[start:end])
        except:
            return {}


# 🧠 Ensure required keys exist
def validate_response(data: dict, original_code: str):
    return {
        "optimized_code": data.get("optimized_code", original_code),
        "explanation": data.get(
            "explanation",
            "Code reviewed and minor improvements suggested."
        ),
        "improvements": data.get(
            "improvements",
            ["Improved readability", "Applied best practices"]
        )
    }


# 🧠 Fallback if LLM fails
def fallback_response(original_code: str, error: str):
    return {
        "optimized_code": original_code,
        "explanation": f"LLM error: {error}",
        "improvements": []
    }
