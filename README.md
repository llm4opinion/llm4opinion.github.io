# Harnessing Large Language Models to Decode Public Opinions

This is the code repository of our anonymous submission: Harnessing Large Language Models to Decode Public Opinions. We propose Mind: an LLM-based framework for public opinion analysis from social media.

This repository contains:
1. Datasets of synthetic comments and real-world comments from social media (New York Times, Reddit).
2. Main code of Mind.
3. Code to visualize Top opinions.

📣📣Please also check our anonymous [project website](https://llm4opinion.site).

Mind decodes public opinion evolution from news "Trump intensifies criticism of F.B.I. and journalists" (**Left**: English version; **Right**: Chinese version).

## Abstract
Decoding public opinions of news from large-scale human comments is crucial but difficult. Recently, large language models (LLMs) show remarkable ability in understanding human language which provides potential to enhance public opinion analysis. However, adopting LLMs to analyze comments of news to get opinions still remains challenging due to the messy syntax, implicit meanings, and redundancy presented in real-world human comments. In this paper, we propose Mind, an LLM-based framework to analyze public opinions from news and related human comments with three modules: (1) syntax reform adopts Halliday's systemic functional linguistics to restructure comments into clear structures, (2) context enrichment enriches background information for opinion extraction, and (3) opinion pooling dynamically maintains a reasonable number of clustered opinions derived from the comments. We evaluate Mind on both the synthetic dataset and real-world news to demonstrate it can correctly capture public opinion distributions, construct hierarchical opinion structures, and capture the evolution of opinions as new developments unfold.

<p align="center">
  <img src="image.png" width="450">
</p>

## Setup

### Environment setup
1. Create a new conda environment:
```bash
conda create -n mind python=3.9 -y  # Python >= 3.9 required
conda activate mind
```

2. Install PyTorch:
- Visit [PyTorch's website](https://pytorch.org/get-started/locally/) to install PyTorch 2.5.1 with the configuration matching your hardware.

3. Install dependencies:
```bash
pip install -r requirements.txt
```

### API configuration
For OpenAI models: Configure `OPENAI_API_KEY` and `OPENAI_BASE_URL` in `config.py`

## 1. Datasets

We include datasets of synthetic comments and real-world comments from social media (New York Times, Reddit) in `./dataset`. 
- Synthetic dataset in `./dataset/synthetic`
- Dataset from NYT in `./dataset/NYT`
- Dataset from Reddit in `./dataset/reddit`

In `config.py`, we put dataset config including the news and directory.

## 2. Main code of Mind

The main code to launch Mind is `mind.py`. We provide an example of command below:
```bash
python mind.py --semantic --syntax --commentLevels 1 --rag --dataset KeepPressure --exp_dir ./exp/YellowVest/KeepPressure/
```
- **--semantic**: Activate context enrichment module.
- **--syntax**: Activate syntax reform module.
- **--commentLevels**: Comment levels to analysis. 0 means no consideration of comment levels. 1 means only consider first level comments. 2 means consider first two level comments.
- **--rag**: Activate rag database for generating initial opinions.
- **--dataset**: Dataset name to analyze, choose from ('synthetic','TrumpNYT','USCapitol','HightTax','KeepPressure','NotreDame','SetFire','SpeedCamera')
- **--exp_dir**: Experiment directory to store results.

## 3. Code to visualize Top opinions

Once an analysis of Mind is finished, results are stored in **--exp_dir**. We use the script `metrics.ipynb` to give top opinions decoded by Mind from comments.
