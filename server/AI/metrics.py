import ast
from radon.complexity import cc_visit


# 🟢 LOC
def calculate_loc(code: str) -> int:
    return len([line for line in code.split("\n") if line.strip()])


# 🟢 Cyclomatic Complexity
def calculate_cyclomatic_complexity(code: str) -> int:
    try:
        results = cc_visit(code)
        return sum(block.complexity for block in results)
    except Exception:
        return 0


# 🟢 Nesting Depth
class NestingVisitor(ast.NodeVisitor):
    def __init__(self):
        self.max_depth = 0
        self.current_depth = 0

    def generic_visit(self, node):
        if isinstance(node, (ast.If, ast.For, ast.While, ast.FunctionDef)):
            self.current_depth += 1
            self.max_depth = max(self.max_depth, self.current_depth)

        super().generic_visit(node)

        if isinstance(node, (ast.If, ast.For, ast.While, ast.FunctionDef)):
            self.current_depth -= 1


def calculate_nesting_depth(code: str) -> int:
    try:
        tree = ast.parse(code)
        visitor = NestingVisitor()
        visitor.visit(tree)
        return visitor.max_depth
    except Exception:
        return 0


# 🟢 Time Complexity (FIXED)
def estimate_time_complexity(code: str) -> str:
    try:
        tree = ast.parse(code)

        loops = 0
        nested_loops = False

        for node in ast.walk(tree):
            if isinstance(node, (ast.For, ast.While)):
                loops += 1

                # check if loop contains another loop
                for child in ast.walk(node):
                    if child != node and isinstance(child, (ast.For, ast.While)):
                        nested_loops = True

        # 🔥 Sorting detection
        if "sort(" in code:
            return "O(n log n)"

        # 🔥 Nested loops → quadratic
        if nested_loops:
            return "O(n^2)"

        # 🔥 Single loop
        if loops == 1:
            return "O(n)"

        # 🔥 No loops
        if loops == 0:
            return "O(1)"

        # fallback
        return "O(n)"

    except Exception:
        return "Unknown"


# 🟢 Space Complexity (FIXED)
def estimate_space_complexity(code: str) -> str:
    try:
        tree = ast.parse(code)

        dynamic_structures = any(
            isinstance(node, (ast.List, ast.Dict, ast.Set))
            for node in ast.walk(tree)
        )

        if dynamic_structures:
            return "O(n)"

        return "O(1)"

    except Exception:
        return "Unknown"


# 🟢 Code Smells
def detect_code_smells(loc, nesting):
    smells = 0

    if loc > 40:
        smells += 1

    if nesting > 3:
        smells += 1

    return smells


# 🟢 Maintainability Score
def calculate_maintainability(loc, complexity, nesting, smells):
    score = 100

    score -= complexity * 2
    score -= nesting * 3
    score -= smells * 5
    score -= loc // 5

    return max(0, min(100, score))


# 🟢 MAIN FUNCTION
def compute_metrics(code: str):
    loc = calculate_loc(code)
    complexity = calculate_cyclomatic_complexity(code)
    nesting = calculate_nesting_depth(code)

    time_c = estimate_time_complexity(code)
    space_c = estimate_space_complexity(code)

    smells = detect_code_smells(loc, nesting)

    maintainability = calculate_maintainability(
        loc, complexity, nesting, smells
    )

    return {
        "loc": loc,
        "cyclomatic_complexity": complexity,
        "nesting_depth": nesting,
        "estimated_time_complexity": time_c,
        "estimated_space_complexity": space_c,
        "code_smells": smells,
        "maintainability_score": maintainability,
    }
