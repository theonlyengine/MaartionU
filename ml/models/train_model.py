from transformers import LlamaForCausalLM, LlamaTokenizer, Trainer, TrainingArguments
from datasets import load_from_disk

def load_model_and_tokenizer(model_name):
    """
    Load the LLaMA model and tokenizer.
    """
    tokenizer = LlamaTokenizer.from_pretrained(model_name)
    model = LlamaForCausalLM.from_pretrained(model_name)
    
    return model, tokenizer

def fine_tune_model(model, tokenizer, dataset_path):
    """
    Fine-tune the LLaMA model on the provided dataset.
    """
    # Load the preprocessed dataset
    datasets = load_from_disk(dataset_path)
    
    # Set training arguments
    training_args = TrainingArguments(
        output_dir="./results",
        evaluation_strategy="epoch",
        learning_rate=2e-5,
        per_device_train_batch_size=4,
        num_train_epochs=3,
        weight_decay=0.01,
        save_total_limit=2,
    )
    
    # Initialize Trainer
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=datasets['train'],
        eval_dataset=datasets['test'],
    )
    
    # Fine-tune the model
    trainer.train()

    # Save the fine-tuned model
    model.save_pretrained("path_to_save_finetuned_model")
    tokenizer.save_pretrained("path_to_save_finetuned_model")

if __name__ == "__main__":
    # Load the model and tokenizer
    model_name = "huggingface/llama3"
    model, tokenizer = load_model_and_tokenizer(model_name)

    # Fine-tune the model
    dataset_path = "path_to_your_preprocessed_dataset"
    fine_tune_model(model, tokenizer, dataset_path)
