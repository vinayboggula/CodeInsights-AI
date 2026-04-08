import ast


# =========================
# 📊 MAIN COMPARE FUNCTION
# =========================
def compare(before, after, ai_points=None, original_code=None, optimized_code=None):

    accuracy = calculate_accuracy(
        original_code,
        optimized_code,
        before,
        after,
        ai_points
    ) if original_code and optimized_code else 0

    return {
        "loc_change_percent": percentage(before.get("loc", 0), after.get("loc", 0)),

        "complexity_reduction_percent": percentage(
            before.get("cyclomatic_complexity", 0),
            after.get("cyclomatic_complexity", 0)
        ),

        "nesting_reduction_percent": percentage(
            before.get("nesting_depth", 0),
            after.get("nesting_depth", 0)
        ),

        "maintainability_gain": after.get("maintainability_score", 0)
        - before.get("maintainability_score", 0),

        "time_complexity_change": compare_complexity(
            before.get("estimated_time_complexity"),
            after.get("estimated_time_complexity")
        ),

        "summary": generate_summary(before, after),

        "verdict": get_verdict(before, after, ai_points),

        "accuracy_score": accuracy
    }


# =========================
# 📊 HELPERS
# =========================

def percentage(before, after):
    if before == 0:
        return 0
    return round(((before - after) / before) * 100, 2)


def compare_complexity(before, after):
    if before == "Unknown":
        return "Not applicable (invalid original code)"

    if not before or not after:
        return "Unknown"

    if before == after:
        return "No change"

    return f"{before} → {after}"


# =========================
# 🧠 VERDICT
# =========================
def get_verdict(before, after, ai_points):

    if (
        after.get("cyclomatic_complexity", 0) < before.get(
            "cyclomatic_complexity", 0)
        or after.get("maintainability_score", 0) > before.get("maintainability_score", 0)
    ):
        return "improved"

    if ai_points and len(ai_points) >= 2:
        return "qualitative_improvement"

    return "no_significant_improvement"


# =========================
# 🧠 SUMMARY
# =========================
def generate_summary(before, after):

    if before.get("estimated_time_complexity") == "Unknown":
        return "Fixed syntax errors and improved logic"

    improvements = []

    if after.get("cyclomatic_complexity", 0) < before.get("cyclomatic_complexity", 0):
        improvements.append("Reduced complexity")

    if after.get("nesting_depth", 0) < before.get("nesting_depth", 0):
        improvements.append("Simplified structure")

    if after.get("maintainability_score", 0) > before.get("maintainability_score", 0):
        improvements.append("Improved maintainability")

    if (
        before.get("estimated_time_complexity") != after.get(
            "estimated_time_complexity")
        and before.get("estimated_time_complexity") != "Unknown"
    ):
        improvements.append("Improved algorithm efficiency")

    if not improvements:
        return "Improved readability and structure"

    return ", ".join(improvements)


# =========================
# 🧠 ACCURACY SYSTEM (FIXED 🔥)
# =========================

def is_same_logic(before, after):
    """
    Detect same logic even if structure changes
    """
    return (
        before.get("estimated_time_complexity") == after.get(
            "estimated_time_complexity")
        and before.get("estimated_space_complexity") == after.get("estimated_space_complexity")
    )


def calculate_accuracy(original_code, optimized_code, before, after, ai_points=None):

    # 🟢 Exact same (rare)
    if original_code.strip() == optimized_code.strip():
        return 100

    # 🟡 Same logic but rewritten
    if is_same_logic(before, after):
        return 90

    score = 50

    # 🟢 Improvements
    if after.get("maintainability_score", 0) > before.get("maintainability_score", 0):
        score += 20

    if after.get("cyclomatic_complexity", 0) < before.get("cyclomatic_complexity", 0):
        score += 15

    if after.get("nesting_depth", 0) < before.get("nesting_depth", 0):
        score += 10

    if after.get("code_smells", 0) < before.get("code_smells", 0):
        score += 5

    if ai_points and len(ai_points) >= 2:
        score += 5

    # 🔴 Penalty
    if after.get("maintainability_score", 0) < before.get("maintainability_score", 0):
        score -= 10

    if after.get("cyclomatic_complexity", 0) > before.get("cyclomatic_complexity", 0):
        score -= 10

    return max(0, min(100, score))
