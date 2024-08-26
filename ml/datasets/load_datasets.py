from datasets import load_dataset
from transformers import LlamaTokenizer

def load_and_preprocess_data(dataset_name, tokenizer_name="huggingface/llama-3b"):
    """
    Load and preprocess the dataset for training.
    """
    # Initialize the tokenizer
    tokenizer = LlamaTokenizer.from_pretrained(tokenizer_name)

    # Load the dataset
    dataset = load_dataset(dataset_name)

    # Preprocess the dataset
    def preprocess_function(examples):
        return tokenizer(examples['text'], padding="max_length", truncation=True, max_length=512)

    tokenized_datasets = dataset.map(preprocess_function, batched=True)
    
    return tokenized_datasets

if __name__ == "__main__":
    # Example: load and preprocess a dataset
    dataset_name = "path_or_name_of_your_dataset"  # Replace with the actual dataset name or path
    tokenized_datasets = load_and_preprocess_data(dataset_name)
    tokenized_datasets.save_to_disk("path_to_save_preprocessed_data")  # Specify the correct path
