import pandas as pd
import json
import os

try:
    # ===== Resolve correct absolute path =====
    base_dir = os.path.dirname(os.path.abspath(__file__))  # scripts/
    file_path = os.path.join(
        base_dir,
        "../data/intern_assignment_support_pack_dev_only_v3.xlsx"
    )

    # Normalize path (important on Windows)
    file_path = os.path.normpath(file_path)

    print(f"📂 Reading Excel from: {file_path}")

    # ===== Load Excel =====
    xls = pd.ExcelFile(file_path)

    combined_data = {}

    # ===== Sheet name mapping =====
    sheet_mapping = {
        "Dim_Developers": "developers",
        "Fact_Jira_Issues": "issues",
        "Fact_Pull_Requests": "pullRequests",
        "Fact_CI_Deployments": "deployments",
        "Fact_Bug_Reports": "bugs"
    }

    for sheet, key in sheet_mapping.items():
        df = pd.read_excel(xls, sheet_name=sheet)

        # ===== Convert datetime columns to ISO =====
        for col in df.select_dtypes(include=['datetime64', 'datetime64[ns]']).columns:
            df[col] = df[col].dt.strftime('%Y-%m-%dT%H:%M:%SZ')

        # ===== Replace NaN with None =====
        df = df.where(pd.notnull(df), None)

        # ===== Store cleaned data =====
        combined_data[key] = df.to_dict(orient='records')

    # ===== Output path (inside backend/data) =====
    output_path = os.path.join(base_dir, "../data/data.json")
    output_path = os.path.normpath(output_path)

    # ===== Save JSON =====
    with open(output_path, 'w') as f:
        json.dump(combined_data, f, indent=2)

    print(f"✅ JSON file created successfully at: {output_path}")
    print(f"Keys: {list(combined_data.keys())}")

    # Optional preview
    preview = json.dumps(combined_data, indent=2)
    print("\nPreview:")
    print(preview[:500] + "\n...\n" + preview[-500:])

except Exception as e:
    print(f"❌ Error: {e}")