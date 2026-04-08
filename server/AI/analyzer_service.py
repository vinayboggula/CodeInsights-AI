from llm_service import generate_optimized_code
from comparison import compare
from metrics import compute_metrics
import ast


def is_valid_code(code: str) -> bool:
    try:
        ast.parse(code)
        return True
    except Exception:
        return False


def analyze(code: str):
    # 🟢 Step 0: Detect validity
    original_valid = is_valid_code(code)
    analysis_type = "normal"

    # 🟢 Step 1: Analyze original
    if original_valid:
        original_metrics = compute_metrics(code)
    else:
        original_metrics = {
            "loc": 0,
            "cyclomatic_complexity": 0,
            "nesting_depth": 0,
            "code_smells": 0,
            "maintainability_score": 0,
            "estimated_time_complexity": "Unknown",
            "estimated_space_complexity": "Unknown",
        }
        analysis_type = "invalid_code"

    # 🟢 Step 2: Call AI
    ai_result = generate_optimized_code(code)

    optimized_code = ai_result.get("optimized_code", code)
    explanation = ai_result.get("explanation", "No explanation provided")
    improvements = ai_result.get("improvements", [])

    # 🟢 Step 3: Validate optimized code
    optimized_valid = is_valid_code(optimized_code)

    if optimized_valid:
        optimized_metrics = compute_metrics(optimized_code)
    else:
        optimized_metrics = original_metrics

    # 🟢 Step 4: Detect syntax fix
    if not original_valid and optimized_valid:
        analysis_type = "syntax_fix"

    # 🟢 Step 5: Compare (🔥 FIX HERE)
    try:
        improvement = compare(
            original_metrics,
            optimized_metrics,
            ai_points=improvements,
            original_code=code,               # ✅ ADD THIS
            optimized_code=optimized_code     # ✅ ADD THIS
        )
    except Exception:
        improvement = {
            "summary": "Comparison unavailable",
            "verdict": "no_improvement",
            "accuracy_score": 0  # ✅ safety fallback
        }

    # 🟢 Step 6: Override summary for syntax fix
    if analysis_type == "syntax_fix":
        improvement["summary"] = "Fixed syntax errors and made code executable"
        improvement["verdict"] = "qualitative_improvement"

    # 🟢 Step 7: Final response
    return {
        "analysis_type": analysis_type,
        "original": {
            "metrics": original_metrics
        },
        "optimized": {
            "code": optimized_code,
            "metrics": optimized_metrics
        },
        "improvement_summary": improvement,
        "ai_explanation": explanation,
        "improvement_points": improvements
    }
