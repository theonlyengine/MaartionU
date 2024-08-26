import os
import subprocess

def run_pipeline():
    """
    Run the entire training pipeline: from dataset loading to model fine-tuning.
    """
    # Step 1: Load and preprocess the dataset
    dataset_script_path = os.path.join("datasets", "load_datasets.py")
    subprocess.run(["python", dataset_script_path])

    # Step 2: Fine-tune the model
    model_training_script_path = os.path.join("models", "train_model.py")
    subprocess.run(["python", model_training_script_path])

if __name__ == "__main__":
    # Execute the training pipeline
    run_pipeline()
