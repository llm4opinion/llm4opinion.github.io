<template>
  <div class="project-page">
    <!-- Navigation Bar -->
    <el-menu
      mode="horizontal"
      :background-color="'rgb(140, 21, 21)'"
      text-color="#fff"
      active-text-color="#fff"
    >
      <el-menu-item index="/">
        <span style="font-weight: 800">X-ISC</span>
      </el-menu-item>
      <el-menu-item @click="scrollToSection('abstract')">Abstract</el-menu-item>
      <el-menu-item @click="scrollToSection('failure')">Failure of intrinsic self-correction</el-menu-item>
      <el-menu-item @click="scrollToSection('interpretation')">Interpretation</el-menu-item>
      <el-menu-item @click="scrollToSection('alleviation')">Alleviation</el-menu-item>
      <el-menu-item @click="scrollToSection('resources')">Resources</el-menu-item>
    </el-menu>

    <!-- Header Section -->
    <div class="container header">
      <h2 class="title">Understanding the Dark Side of LLMs' Intrinsic Self-Correction</h2>
      <h4 class="subtitle">
        <span class="underline">Ex</span>plaining 
        <span class="underline">I</span>ntrinsic 
        <span class="underline">S</span>elf-<span class="underline">C</span>orrection 
        (X-ISC)
      </h4>
      
      <div class="author-info">
        <span>Anonymous submission</span>
      </div>

      <!-- 添加 GitHub 链接按钮 -->
      <div class="github-link-container">
        <a href="https://anonymous.4open.science/r/SC-15FB" 
           class="github-button"
           target="_blank">
          <i class="github-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </i>
          <div class="github-link-text">
            <span>Project Code</span>
          </div>
        </a>
      </div>
      
    </div>
    <div class="container main-content">
      <el-row justify="center">
        <el-col :xs="22" :sm="22" :md="20" :lg="20" :xl="20"> 
          <h3 class="section">
            <span class="section-title">A first quick glance: ChatGPT o1 pro mode example</span>
          </h3>
          <div class="section-content">
            <h3 class="quick-glance-question">Question: "Is Earth flat?"</h3>
            <el-row :gutter="20">
              <el-col :xs="24" :sm="24" :md="12">
                <div class="quick-glance-video">
                  <video 
                    :src="videoO1Pro"
                    controls 
                    class="quick-glance-player"
                  ></video>
                  <div class="media-caption">
                    Starting at 0:11 with a 21-second think then modify the answer
                  </div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12">
                <div class="quick-glance-image">
                  <img 
                    src="@/figures/o1-pro-log.png" 
                    alt="o1-pro-log" 
                    class="quick-glance-img"
                  >
                  <div class="media-caption">
                    Another try: maintaining consistency doesn't mean hold the answer
                  </div>
                </div>
              </el-col>
            </el-row>

          </div>
        </el-col>
      </el-row>
    </div>
    <div class="container main-content">
      <el-row justify="center">
        <el-col :xs="22" :sm="22" :md="20" :lg="20" :xl="20">
          <h3 class="video-section-title">
            <span class="section-title">A second quick glance for the extremely simple questions on other GPTs</span>
          </h3>
        </el-col>
      </el-row>
    </div>

    <!-- Desktop Video Section -->
    <div class="video-section desktop-only">
      <el-row :gutter="10">
        <el-col :span="1"></el-col>
        <el-col :span="7">
          <div class="video-options">
            <div class="video-selector-list">
              <div class="video-option-header">
                Select Model & Question:
              </div>
              <div 
                v-for="option in videoOptions" 
                :key="option.value"
                class="video-option-item"
                :class="{ active: selectedVideo === option.value }"
                @click="selectedVideo = option.value"
              >
                <div class="model-name">{{ option.model }}</div>
                <div class="question">{{ option.question }}</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="15">
          <div class="video-player">
            <video 
              :src="currentVideoSrc" 
              controls 
              class="demo-video"
              v-if="currentVideoSrc"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- Mobile Video Section -->
    <div class="mobile-video-section mobile-only">
      <div class="mobile-video-card">
        <!-- Model Selector Dropdown -->
        <div class="mobile-selector-wrapper" :class="{ 'selector-expanded': mobileActiveNames.includes('1') }">
          <el-collapse v-model="mobileActiveNames">
            <el-collapse-item name="1">
              <template #title>
                <div class="mobile-selector-header">
                  <span class="mobile-selector-title">{{ selectedMobileModel?.label || 'Select Model' }}</span>
                  <span class="mobile-selector-hint" v-if="!mobileActiveNames.includes('1')">Tap to select</span>
                </div>
              </template>
              <div class="mobile-model-list">
                <div 
                  v-for="model in mobileModelOptions" 
                  :key="model.value"
                  class="mobile-model-item"
                  :class="{ active: selectedMobileModel?.value === model.value }"
                  @click="selectMobileModel(model)"
                >
                  {{ model.label }}
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>

        <div class="mobile-video-content">
          <!-- Question Display -->
          <div class="mobile-question-display" :class="{ 'has-question': selectedMobileModel }">
            <div class="mobile-question-text">
              {{ selectedMobileModel ? selectedMobileModel.question : 'Select a model to view the question' }}
            </div>
          </div>

          <!-- Video Player -->
          <div class="mobile-video-player">
            <video 
              :src="currentMobileVideoSrc" 
              controls 
              class="mobile-demo-video"
              v-if="currentMobileVideoSrc"
            >
              Your browser does not support the video tag.
            </video>
            <div v-else class="video-placeholder">
              Select a model to view the demo
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container main-content">
      <el-row justify="center">
        <el-col :xs="22" :sm="22" :md="20" :lg="20" :xl="20">
          <!-- Abstract Section -->
          <div class="section" id="abstract">
            <h3>
              <span class="section-title">Abstract</span>
            </h3>
            <div class="section-content">
              <el-row :gutter="20" class="abstract-row">
                <el-col :xs="24" :sm="24" :md="12" class="abstract-col">
                  <p>
                    Intrinsic self-correction was proposed to improve LLMs' responses via feedback solely based on their inherent capability. However, recent works show that LLMs' intrinsic self-correction fails without oracle labels as feedback. In this paper, we aim to interpret LLMs' intrinsic self-correction for different tasks, especially for those failure cases? By including one simple task and three complex tasks with state-of-the-art (SOTA) LLMs like ChatGPT families (o1, 4o, 3.5-turbo) and Llama families (2-7B, 3-8B, and 3.1-8B), we design interpretation methods to reveal the dark side of SOTA LLMs' intrinsic self-correction. We identify intrinsic self-correction can (1) cause LLMs to waver both intermedia and final answers and lead to prompt bias on simple factual questions; (2) introduce human-like cognitive bias on complex tasks. In light of our findings, we also provide two simple, low-cost, yet effective strategies for alleviation: question repeating and supervised fine-tuning.
                  </p>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" class="abstract-col">
                  <img 
                    src="@/figures/overviewf3.png" 
                    alt="Overview" 
                    class="responsive-image abstract-image"
                  />
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- Failure of Intrinsic Self-Correction Section -->
          <div class="section" id="failure">
            <h3>
              <span class="section-title">Failure of intrinsic self-correction</span>
            </h3>
            <div class="section-content">
              <p>
                Intrinsic self-correction mechanisms in state-of-the-art LLMs were expected to enhance performance by refining responses based solely on the model's inherent capabilities. However, our experiments reveal that intrinsic self-correction often leads to significant performance degradation across various tasks.
              </p>

              <!-- Experimental Tables Placeholder -->
              <h4>Experimental results</h4>
              <p>Below are the key experimental results demonstrating the failures of intrinsic self-correction:</p>
              
              <!-- Example Table for Yes/No Question Answering Task -->
              <div style="display: flex; justify-content: center;">
                <el-table 
                  id="boolq-table"
                  :data="boolqData" 
                  style="width: 85%" 
                  >
                  <el-table-column prop="model" label="Model" align="center">
                  </el-table-column>
                  <el-table-column prop="acc1" label="ACC₁ (↓ΔACC) (%)" align="center">
                  </el-table-column>
                  <el-table-column prop="overturned" label="✓→✗ (%)" align="center">
                    <template #default="scope">
                      {{ scope.row.overturned }}
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              
              <p class="table-caption">Table 1: Self-correction performance on the Yes/No question answering task.</p>

              <!-- Additional Tables for Complex Tasks -->
              <!-- Repeat similar <el-table> components for other tasks as needed -->
              
              <!-- Observation 1 -->
              <div class="observation-box">
                <strong>Observation 1:</strong> Self-correction can fail in diverse tasks. For SOTA LLMs, self-correction failures are reduced but not solved. They are even worse in certain tasks.
              </div>
            </div>
          </div>

          <!-- Interpretation Section -->
          <div class="section" id="interpretation">
            <h3>
              <span class="section-title">Interpretation</span>
            </h3>
            <div class="section-content">
              <p>
                We propose three interpretation methods to understand how and why intrinsic self-correction fails in different tasks:
              </p>

              <!-- Method 1: Mechanistic Interpretability -->
              <div class="method-box">
                <el-row :gutter="20">
                  <el-col :xs="24" :sm="24" :md="12">
                    <h4>1. Internal answer wavering</h4>
                    <p>
                      We analyze LLMs' internal token representations at each layer to track how confidence in different answers evolves. Our findings show that:
                    </p>
                    <ul>
                      <li>Self-correction increases internal answer wavering from 8.3% to 14.1%</li>
                      <li>Prompting with "Are you sure?" produces nearly identical confidence patterns as directly stating "You are wrong"</li>
                    </ul>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12">
                    <img 
                      src="@/figures/internal_confidence.png" 
                      alt="Internal Confidence Analysis" 
                      class="method-image"
                    />
                  </el-col>
                </el-row>
                <div class="observation-box">
                  <strong>Observation 2:</strong> Self-correction causes internal answer wavering, which could further lead to wrong final answers. Prompting the LLM to self-correct the response may cause similar effects of directly denying its answers.
                </div>
              </div>

              <!-- Method 2: Token Attribution -->
              <div class="method-box">
                <el-row :gutter="20">
                  <el-col :xs="24" :sm="24" :md="11">
                    <h4>2. Token attribution analysis: Prompt bias</h4>
                    <p>
                      Using our PACT (Prompt Attribution and Contribution Tracking) method, we measure how different parts of the input influence the model's decisions:
                    </p>
                    <ul>
                      <li>When correct answers are overturned, models show stronger attribution to refinement prompts</li>
                      <li>When correct answers are retained, models maintain focus on the original question</li>
                    </ul>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="13">
                    <img 
                      src="@/figures/case.png" 
                      alt="Token Attribution Analysis" 
                      class="method-image"
                    />
                  </el-col>
                </el-row>
                <div class="observation-box">
                  <strong>Observation 3:</strong> Self-correction fails since LLMs are biased towards the refinement prompt rather than the original question. 
                </div>
              </div>

              <!-- Method 3: Human-like Cognitive Bias -->
              <div class="method-box">
                <el-row :gutter="20">
                  <el-col :xs="24" :sm="24" :md="11">
                    <h4>3. Human-like cognitive bias analysis</h4>
                    <p>
                      In complex tasks, we identify three types of human-like cognitive biases that emerge during self-correction:
                    </p>
                    <ul>
                      <li><strong>Overthinking:</strong> Excessive reasoning without taking correct actions (avg. 15.4 vs 5.3 "think" steps)</li>
                      <li><strong>Cognitive Overload:</strong> Forgetting critical information when processing long prompts</li>
                      <li><strong>Perfectionism Bias:</strong> Over-optimization leading to constraint violations</li>
                    </ul>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="13">
                    <img 
                      src="@/figures/humanCognitiveBiasf.png" 
                      alt="Human Cognitive Biases" 
                      class="method-image"
                    />
                  </el-col>
                </el-row>
                <div class="observation-box">
                  <strong>Observation 4:</strong> In complex tasks, LLMs exhibit human-like cognitive biases during self-correction: (1) Overthinking: LLM performs excessive "think" without taking correct actions; (2) Cognitive overload: LLM forgets the correct command syntax when processing long prompt; (3) Perfectionism bias: LLM wants to be more efficient, but instead violates environmental restrictions.
                </div>
              </div>
            </div>
          </div>

          <!-- Solutions Section -->
          <div class="section" id="alleviation">
            <h3>
              <span class="section-title">Alleviation</span>
            </h3>
            <div class="section-content">
              <p>
                Based on our findings that self-correction failures are mainly due to model's behavior of changing answers when meeting refinement prompts, we propose two simple yet effective strategies:
              </p>
              <div style="text-align: center;">
                <img src="@/figures/mergedMitigation2.png" alt="Question Repeating" class="responsive-image" />
              </div>

              <!-- Mitigation Strategy 1: Question Repeating -->
              <div class="solution-item">
                <h4>1. Question repeating</h4>
                <p>
                  We attach the original question to the end of the refinement prompt to reduce recency bias. For example:
                  "Are you sure? Think and answer again." → "Are you sure? Think and answer again. Is human a kind of animals?"
                </p>
              </div>

              <!-- Mitigation Strategy 2: Supervised Fine-Tuning -->
              <div class="solution-item">
                <h4>2. Low-cost Supervised Fine-Tuning (SFT)</h4>
                <p>
                  We fine-tune models with extremely few samples (4 for Llama, 10 for GPT) selected from ✓→✗ cases, without introducing external knowledge. The cost is only $0.004 and 3 minutes.
                </p>
              </div>

              <!-- Results -->
              <h4>Key results</h4>
              <ul>
                <li>Both strategies significantly reduce self-correction failures in Yes/No questions</li>
                <li>SFT almost eliminates all ✓→✗ cases</li>
                <li>Models fine-tuned on Yes/No questions can generalize to complex tasks</li>
              </ul>

              <!-- Results Tables -->
              <div style="display: flex; justify-content: center;">
                <el-table 
                  id="mitigate-table"
                  :data="mitigateData" 
                  style="width: 85%" 
                  :row-class-name="(row: { isGroupEnd?: boolean }) => row.isGroupEnd ? 'border-bottom' : ''"
                >
                  <el-table-column prop="model" label="Model" align="center">
                    <template #default="scope">
                      <span :class="{ 'bold-text': scope.row.model.includes('SFT') }">
                        {{ scope.row.model }}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column label="ACC₁ (↓ΔACC) (%)" align="center">
                    <template #default="scope">
                      <template v-if="typeof scope.row.acc1 === 'object'">
                        <span :class="{ 'bold-text': scope.row.acc1.bold }">
                          {{ scope.row.acc1.value }} ({{ scope.row.acc1.delta }})
                        </span>
                      </template>
                      <template v-else>
                        {{ scope.row.acc1 }}
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="✓→✗ (%)" align="center">
                    <template #default="scope">
                      <template v-if="typeof scope.row.overturned === 'object'">
                        <span :class="{ 'bold-text': scope.row.overturned.bold }">
                          {{ scope.row.overturned.value }}
                        </span>
                      </template>
                      <template v-else>
                        {{ scope.row.overturned }}
                      </template>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <p class="table-caption table-caption-with-spacing">Table 2: Alleviating self-correction failure on Yes/No question answering task using question repeating and supervised fine-tuning (SFT), where question repeating reduces ✓→✗ (%) and SFT almost eliminates all correct→wrong cases.</p>

              <!-- 修改第二个表格 -->
              <div style="display: flex; justify-content: center;">
                <el-table 
                  id="generalize-table"
                  :data="generalizeData" 
                  style="width: 85%" 
                  :row-class-name="(row: { isGroupEnd?: boolean }) => row.isGroupEnd ? 'border-bottom' : ''"
                >
                  <el-table-column prop="task" label="Task" align="center">
                    <template #default="scope">
                      <span>{{ scope.row.task }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="Model" align="center">
                    <template #default="scope">
                      <span :class="{ 'bold-text': scope.row.model.includes('SFT') }">
                        {{ scope.row.model }}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column label="ACC₁ (↓ΔACC) (%)" align="center">
                    <template #default="scope">
                      <template v-if="typeof scope.row.acc1 === 'object'">
                        <span :class="{ 'bold-text': scope.row.acc1.bold }">
                          {{ scope.row.acc1.value }} ({{ scope.row.acc1.delta }})
                        </span>
                      </template>
                      <template v-else>
                        {{ scope.row.acc1 }}
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="✓→✗ (%)" align="center">
                    <template #default="scope">
                      <template v-if="typeof scope.row.overturned === 'object'">
                        <span :class="{ 'bold-text': scope.row.overturned.bold }">
                          {{ scope.row.overturned.value }}
                        </span>
                      </template>
                      <template v-else>
                        {{ scope.row.overturned }}
                      </template>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

              <p class="table-caption">Table 3: LLMs fine-tuned on Yes/No question answering task can generalize to complex tasks, where ACC is increased and ✓→✗ (%) is decreased across decision making, reasoning and programming tasks.</p>
            </div>
          </div>

          <!-- Resources Section -->
          <div class="section" id="resources">
            <h3>
              <span class="section-title">Resources</span>
            </h3>
            <div class="section-content">
              <p>
                Access our code repository through the following links:
              </p>
              <ul>
                <li><a href="https://anonymous.4open.science/r/SC-15FB" target="_blank">Project Code</a></li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional scripts needed for static content

// Sample Data for Tables
const boolqData = [
  { 
    model: 'ChatGPT o1-preview', 
    acc1: '78.7 (↓4.9)', 
    overturned: '13.2' 
  },
  { 
    model: 'ChatGPT o1-mini', 
    acc1: '74.1 (↓4.2)', 
    overturned: '15.6' 
  },
  { 
    model: 'ChatGPT 4o', 
    acc1: '79.2 (↓4.9)', 
    overturned: '11.3' 
  },
  { 
    model: 'ChatGPT 3.5-turbo', 
    acc1: '62.5 (↓12.1)', 
    overturned: '34.0' 
  },
  { 
    model: 'Llama-3.1-8B', 
    acc1: '49.2 (↓20.4)', 
    overturned: '58.8' 
  },
  { 
    model: 'Llama-3-8B', 
    acc1: '50.1 (↓20.3)', 
    overturned: '58.2' 
  },
  { 
    model: 'Llama-2-7B', 
    acc1: '52.8 (↓8.7)', 
    overturned: '26.5' 
  }
];

const mitigateData = [
  { 
    model: 'GPT-4o', 
    acc1: '79.2 (↓4.9)', 
    overturned: '11.3',
  },
  { 
    model: '+ Question repeating', 
    acc1: '83.6 (↓0.5)', 
    overturned: '6.0',
  },
  { 
    model: '+ SFT', 
    acc1: { value: '87.7', delta: '4.1', bold: true }, 
    overturned: { value: '0', bold: true },
  },
  { 
    model: 'GPT-3.5-turbo', 
    acc1: '62.5 (↓12.1)', 
    overturned: '34.0',
  },
  { 
    model: '+ Question repeating', 
    acc1: '67.4 (↓7.2)', 
    overturned: '23.1',
  },
  { 
    model: '+ SFT', 
    acc1: { value: '76.2', delta: '↑1.6', bold: true }, 
    overturned: { value: '0', bold: true },
  },
  { 
    model: 'Llama-3.1-8B', 
    acc1: '49.2 (↓20.4)', 
    overturned: '58.8',
  },
  { 
    model: '+ Question repeating', 
    acc1: '52.4 (↓17.2)', 
    overturned: '52.8',
  },
  { 
    model: '+ SFT', 
    acc1: { value: '70.3', delta: '↓0.7', bold: true }, 
    overturned: { value: '0', bold: true },
  }
];

const generalizeData = [
  {
    task: 'Decision Making',
    model: 'GPT-4o',
    acc1: '14.2 (↓20.9)',
    overturned: '76.6',
  },
  {
    task: 'Decision Making', 
    model: '+ SFT',
    acc1: { value: '14.9', delta: '↓20.2', bold: true },
    overturned: { value: '68.1', bold: true },
  },
  {
    task: 'Decision Making',
    model: 'GPT-3.5-turbo',
    acc1: '7.5 (↓5.2)',
    overturned: '76.5',
  },
  {
    task: 'Decision Making',
    model: '+ SFT',
    acc1: { value: '17.9', delta: '↑5.2', bold: true },
    overturned: { value: '41.2', bold: true },
  },
  {
    task: 'Reasoning',
    model: 'GPT-4o',
    acc1: '65.0 (↓2.0)',
    overturned: '17.9',
  },
  {
    task: 'Reasoning',
    model: '+ SFT',
    acc1: { value: '68.0', delta: '↑1.0', bold: true },
    overturned: { value: '6.0', bold: true },
  },
  {
    task: 'Reasoning',
    model: 'GPT-3.5-turbo',
    acc1: '55.0 (↓6.0)',
    overturned: '19.7',
  },
  {
    task: 'Reasoning',
    model: '+ SFT',
    acc1: { value: '59.0', delta: '↓2.0', bold: true },
    overturned: { value: '13.1', bold: true },
  },
  {
    task: 'Programming',
    model: 'GPT-4o',
    acc1: '72.6 (↓6.8)',
    overturned: '21.9',
  },
  {
    task: 'Programming',
    model: '+ SFT',
    acc1: { value: '82.6', delta: '↑3.2', bold: true },
    overturned: { value: '7.0', bold: true },
  },
  {
    task: 'Programming',
    model: 'GPT-3.5-turbo',
    acc1: '50.9 (↓10.6)',
    overturned: '28.3',
  },
  {
    task: 'Programming',
    model: '+ SFT',
    acc1: { value: '58.3', delta: '↓3.2', bold: true },
    overturned: { value: '25.3', bold: true },
  }
];

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

import { ref, computed } from 'vue';
const video4o = new URL('@/figures/4o_noaudio.mov', import.meta.url).href
const video4oMini = new URL('@/figures/4o-mini_noaudio.mov', import.meta.url).href
const videoO1 = new URL('@/figures/o1_noaudio.mov', import.meta.url).href
const videoO1Mini = new URL('@/figures/o1-mini_noaudio.mov', import.meta.url).href
const videoO1Pro = new URL('@/figures/o1-pro-3x.mov', import.meta.url).href
const videoOptions = [
  {
    value: '4o',
    label: 'GPT-4o - Population Question',
    model: 'ChatGPT 4o (2024.12.17)',
    question: 'There are over 1000 countries in the world, is that correct?',
    src: video4o
  },
  {
    value: '4o-mini',
    label: 'GPT-4o - Moon Jump Question',
    model: 'ChatGPT 4o mini (2024.12.17)',
    question: 'Can I jump from Earth to Moon?',
    src: video4oMini
  },
  {
    value: 'o1',
    label: 'GPT-o1 - Population Question',
    model: 'ChatGPT o1 (2024.12.17)',
    question: 'Does China has more population than India?',
    src: videoO1
  },
  {
    value: 'o1-mini',
    label: 'GPT-o1 - Arms Question',
    model: 'ChatGPT o1-mini (2024.12.17)',
    question: 'Does human have three arms?',
    src: videoO1Mini
  }
];

const selectedVideo = ref('4o');

const currentVideoSrc = computed(() => {
  const option = videoOptions.find(opt => opt.value === selectedVideo.value);
  return option ? option.src : '';
});

// Mobile-specific state
const mobileActiveNames = ref([])
const selectedMobileModel = ref<any>(videoOptions[0])

// Mobile model options (simplified version of videoOptions)
const mobileModelOptions = computed(() => videoOptions.map(opt => ({
  value: opt.value,
  label: opt.model.split(' (')[0], // Only show model name without date
  question: opt.question,
  src: opt.src
})))

// Mobile video source
const currentMobileVideoSrc = computed(() => 
  selectedMobileModel.value ? selectedMobileModel.value.src : ''
)

// Function to handle mobile model selection
const selectMobileModel = (model: any) => {
  selectedMobileModel.value = model
  mobileActiveNames.value = [] // Close the collapse after selection
}
</script>

<style scoped>
.project-page {
  min-height: 100vh;
  background-color: #fff;
}

.container {
  padding: 0 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  padding: 20px 0 0 0;
}

.title {
  margin-bottom: 0;
  font-size: 2em;
  font-weight: normal;
}

.subtitle {
  color: rgb(140, 21, 21);
  margin-top: 5px;
  margin-bottom: 5px;
  font-weight: normal;
  font-size: 1.5em;
}

.section {
  margin: 15px 0;
  padding: 0px;
  background-color: transparent;
  border-radius: 0;
  box-shadow: none;
}

.section-title {
  color: rgb(140, 21, 21);
  font-size: 22px;
  display: block;
  margin-bottom: 10px;
  border-bottom: 2px solid rgb(140, 21, 21);
  padding-bottom: 6px;
}

.section-content {
  margin-top: 15px;
}

.observation-box {
  margin: 15px 0;
  padding: 12px;
  background-color: #f0f8ff;
  border-left: 4px solid rgb(140, 21, 21);
  border-radius: 4px;
}

.table-caption {
  text-align: center;
  font-size: 0.85em;
  color: #555;
  margin: 5px auto 15px;
  width: 80%;
}

.solution-item {
  margin-bottom: 15px;
  padding: 15px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.solution-item h4 {
  color: rgb(140, 21, 21);
  margin-top: 0;
  margin-bottom: 10px;
}

.responsive-image {
  width: 100%;
  height: auto;
  margin-top: 15px;
  border-radius: 8px;
}

/* 移除之前的 overview 片特殊样式 */
#abstract .responsive-image {
  max-width: 100%;
  margin: 0;
}

/* 添加新的 abstract 片样式 */
.abstract-image {
  width: 100%;
  height: auto;
  display: block;
  margin: 15px 0;
}

/* 为栏布局加响应式设计 */
@media (max-width: 768px) {
  .finding-item, .method-item, .result-item, .solution-item {
    padding: 15px;
  }

  .section-title {
    font-size: 22px;
  }

  .title {
    font-size: 1.8em;
  }

  .subtitle {
    font-size: 1.3em;
  }

  #abstract .el-row {
    display: flex;
    flex-direction: column;
  }

  #abstract .el-col {
    width: 100%;
    margin-bottom: 20px;
  }
}

.github-link-container {
  text-align: center;
  margin: 10px 0 0 0;
}

.github-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: rgb(140, 21, 21);
  color: white;
  padding: 8px 15px;
  border-radius: 20px;
  text-decoration: none;
  font-size: 14px;
  transition: background-color 0.3s;
}

.github-button:hover {
  background-color: rgb(120, 18, 18);
  color: white;
  text-decoration: none;
}

.github-icon {
  display: flex;
  align-items: center;
}

/* Add mobile styles */
@media screen and (max-width: 768px) {
  .github-link-container {
    margin: 5px 0 0 0;  /* Reduce margin on mobile */
  }
  
  .github-button {
    padding: 6px 12px;  /* Smaller padding */
    font-size: 12px;    /* Smaller font */
    gap: 6px;          /* Reduce gap between icon and text */
  }

  .github-icon svg {
    width: 14px;       /* Smaller icon */
    height: 14px;
  }
}


.author-info {
  font-size: 20px;
}

@media screen and (max-width: 768px) {
  .author-info {
    font-size: 16px;
  }
}

:deep(.el-menu-item) {
  font-size: 18px;  /* 增加字体大小 */
  font-weight: 400; /* 稍加粗字体 */
}

:deep(.el-menu-item:first-child) {
  font-size: 20px;
  font-weight: 800;
}

/* 上下箭头样式 */
.arrow-up::before {
  content: "↑";
}

.arrow-down::before {
  content: "↓";
}

/* 对号和叉号样式 */
.check-mark::before {
  content: "✓";
}

.cross-mark::before {
  content: "✗";
}

/* 添加新的样式类用于中等大小的图片 */
.medium-image {
  width: 70%;  /* 设置为容器宽度70% */
  display: block;
  margin: 15px auto;  /* 上下间距15px，左右自动居中 */
}

.method-box {
  margin: 25px 0;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.method-box h4 {
  color: rgb(140, 21, 21);
  margin-top: 0;
  margin-bottom: 15px;
}

.method-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 10px;
}

/* 添加以样式来调整列表项的左边距 */
ul {
  padding-left: 20px; /* 减默认的左边距 */
  margin: 8px 0;
}

li {
  margin: 4px 0; /* 调整列表项之间的垂直间距 */
}

/* 添加新的样式规则 */
#abstract {
  margin-top: 0;
  padding-top: 0;
}

.underline {
  text-decoration: underline;
}

.gif-container {
  margin: 15px auto 30px;
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 30px;
}

.gif-column {
  display: flex;
  justify-content: center;
}

.gif-image {
  width: 100%;
  max-width: 450px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.video-section {
  margin: 20px auto;
  width: 90%;
  max-width: 950px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.video-section-title {
  margin-bottom: 20px;
}

.video-options, .video-player {
  margin: 0;
  padding: 0;
}

.video-options {
  height: 100%;
}

.video-selector-list {
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 700px;
  display: flex;
  flex-direction: column;
}

.video-option-header {
  padding: 15px;
  font-weight: bold;
  background-color: #f8f8f8;
  border-bottom: 1px solid #ddd;
  color: rgb(140, 21, 21);
}

.video-option-item {
  padding: 15px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.2s;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.video-option-item:last-child {
  border-bottom: none;
}

.video-option-item:hover {
  background-color: #f5f5f5;
}

.video-option-item.active {
  background-color: #f0f0f0;
  border-left: 3px solid rgb(140, 21, 21);
}

.model-name {
  font-weight: bold;
  color: #333;
  margin-bottom: 6px;
  font-size: 0.95em;
}

.question {
  font-size: 0.9em;
  color: #666;
}

.video-player {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: 700px;
  border-radius: 4px;
}

.demo-video {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  object-fit: contain;
}

.video-player:empty::before {
  content: "Loading video...";
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #666;
}

/* Table border styles */
:deep(.el-table) {
  border-top: 2px solid #999;
  border-bottom: 2px solid #999;
}

/* 调整单元格内边距和对齐方式 */
:deep(.el-table__cell) {
  padding: 8px 12px;
  text-align: center;
}

/* 加粗特定行的文本 */
:deep(.el-table__row .bold-text) {
  font-weight: 700;
}

/* 为所有表格的表头添加下边框 */
:deep(.el-table__header-wrapper th.el-table__cell) {
  border-bottom: 2px solid #999 !important;
}

/* 表格1 - 移除内容行的横线但保留表头框 */
#boolq-table :deep(.el-table__row) td {
  border-bottom: none !important;
}

/* 表格2 - 移除内容行的横线，只在特定行加边框 */
#mitigate-table :deep(.el-table__row) td {
  border-bottom: none !important;
}
#mitigate-table :deep(.el-table__row:nth-child(3)) td,
#mitigate-table :deep(.el-table__row:nth-child(6)) td {
  border-bottom: 1.5px solid #999 !important;
}

/* 表格3 - 移除内容行的横线，只在特定行添加边框 */
#generalize-table :deep(.el-table__row) td {
  border-bottom: none !important;
}
#generalize-table :deep(.el-table__row:nth-child(2)) td,
#generalize-table :deep(.el-table__row:nth-child(4)) td,
#generalize-table :deep(.el-table__row:nth-child(6)) td,
#generalize-table :deep(.el-table__row:nth-child(8)) td,
#generalize-table :deep(.el-table__row:nth-child(10)) td {
  border-bottom: 1.5px solid #999 !important;
}

/* Add more spacing after table 2's caption */
.table-caption-with-spacing {
  margin-bottom: 60px; /* Increase this value to add more space */
}

/* 调整表样式 */
:deep(.el-table__header-wrapper th.el-table__cell) {
  background-color: #f5f5f5 !important;  /* 浅灰色背景 */
  border-bottom: 2px solid #999 !important;
  color: #666 !important;  /* 浅的文字颜色 */
  font-weight: 600 !important;  /* 稍微加粗字体 */
}

/* 确保表头文字不会被背景影响 */
:deep(.el-table__header-wrapper th.el-table__cell > .cell) {
  color: #666 !important;
}

/* Ensure proper spacing between sections */
.main-content .section:first-of-type {
  margin-top: 40px;
}

  
.demo-video, .demo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.quick-glance-video, .quick-glance-image {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.quick-glance-player, .quick-glance-img {
  width: 100%;
  height: 600px; /* 保持电脑端的固定高度 */
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2px;
}

.quick-glance-question {
  text-align: center;
  font-size: 18px;
  margin: 15px 0 25px;
  font-weight: 500;
}

.media-caption {
  text-align: center;
  color: #333;
  font-weight: 500;
  font-size: 0.9em;
  line-height: 1.4;
  padding: 10px;
  background-color: #f8f8f8;
  margin-top: 8px;
  border-radius: 0px;
  width: 95%;
}

/* Add these styles to the existing <style> section */

/* Adjust spacing for Experimental Results heading */
.section-content h4 {
  margin: 15px 0 10px;  /* Reduce top/bottom margins */
  color: rgb(140, 21, 21);  /* Match section title color */
  font-size: 1.2em;  /* Slightly smaller than section titles */
  font-weight: 500;  /* Medium weight */
}

/* Adjust spacing for paragraph after heading */
.section-content h4 + p {
  margin-top: 5px;  /* Reduce space between heading and paragraph */
  margin-bottom: 15px;  /* Add space before table */
}

/* Style the table container */
.section-content .el-table {
  margin: 10px 0 15px;  /* Adjust margins around table */
}

/* Add these styles to improve table appearance */
:deep(.el-table) {
  --el-table-border-color: #dcdfe6;  /* Softer border color */
  --el-table-header-background-color: #f5f7fa;  /* Lighter header background */
}

:deep(.el-table__header-wrapper th.el-table__cell) {
  padding: 8px 0;  /* Adjust header padding */
  font-weight: 600;  /* Slightly bolder headers */
}

:deep(.el-table__body td.el-table__cell) {
  padding: 12px 0;  /* Adjust cell padding */
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  /* 导航栏调整 */
  :deep(.el-menu-item) {
    padding: 0 5px;  /* 减小导航项的内边距 */
    font-size: 13px; /* 减小导航字体 */
  }

  /* 标题调整 */
  .title {
    font-size: 1.2em;  /* 减小标题字体 */
    padding: 0;  /* 移除标题内边距 */
    margin: 10px 0;  /* 保持上下间距 */
  }

  .subtitle {
    font-size: 1em;  /* 减小副标题字体 */
  }
  .video-section-title {
    margin: 0px;
  }
  /* 内容区域调整 */
  .container {
    padding: 0;  /* 移除容器内边距 */
  }

  /* 正文内容字体调整 */
  p {
    font-size: 14px;  /* 减小正文字体 */
    line-height: 1.4;  /* 调整行高 */
  }

  /* 表格响应式处理 */
  .el-table {
    width: 100% !important;
    font-size: 12px;
  }

  /* 栅格系统调整 */
  .el-col {
    width: 100% !important;
    margin-bottom: 15px;  /* 减小列间距 */
    padding: 0 !important;  /* 移除列内边距 */
  }

  .method-box h4 {
    font-size: 15px;  /* 减小标题字体 */
  }

  .method-box {
    margin: 5px 0;
    padding: 5px;
    background-color: #f8f8f8;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  /* 列表样式调整 */
  ul {
    padding-left: 15px;  /* 减小列表缩进 */
  }

  li {
    font-size: 13px;  /* 减小列表项字体 */
    margin: 3px 0;  /* 减小列表项间距 */
  }

  /* 表格标题调整 */
  .table-caption {
    font-size: 12px;
    width: 100%;  /* 让表格标题占满宽度 */
    padding: 0 5px;  /* 添加小边距 */
  }

  /* 视频和图片容器调整 */
  .video-section {
    margin: 10px 0;
  }

  .video-option-header {
    font-size: 13px;
    padding: 8px;
  }

  .video-option-item {
    padding: 8px;
    font-size: 13px;
  }

  .model-name {
    font-size: 13px;
  }

  .question {
    font-size: 12px;
  }

  /* 媒体说明文字调整 */
  .media-caption {
    font-size: 12px;
    padding: 5px;
    width: 100%;
  }

  /* section标题调整 */
  .section-title {
    font-size: 18px;
  }

  /* 实验结果标题调整 */
  .section-content h4 {
    font-size: 1em;
    margin: 10px 0 5px;
  }

  /* 调整段落间距 */
  p {
    margin: 0.5rem 0;  /* 减小段落间距 */
  }

  /* Project Code按钮和下面内容的间距 */
  .github-link-container {
    margin: 0px 0;  /* 减小按钮的上下间距 */
  }

  /* 调整表格内部间距 */
  :deep(.el-table__cell) {
    padding: 0px 0px;  /* 减小单元格内边距 */
  }

  /* 调整表格和标题的间距 */
  .table-caption {
    margin: 3px 0 8px;  /* 减小表格标题的间距 */
  }

  /* 调整列表的间距 */
  ul {
    margin: 4px 0;     /* 减小列表外边距 */
    padding-left: 12px; /* 减小列表缩进 */
  }

  li {
    margin: 2px 0;     /* 减小列表项间距 */
  }

  /* 调整标题层级的间距 */
  h4 {
    margin: 8px 0 4px; /* 减小h4标题的间距 */
  }

  /* 调整视频选择器的间距 */
  .video-section {
    margin: 8px 0;     /* 减小视频区域的外边距 */
  }

  .video-option-item {
    padding: 6px 8px;  /* 减小选项的内边距 */
  }

  /* 调整图片容器的间距 */
  .quick-glance-video,
  .quick-glance-image {
    margin-bottom: 0px; /* 减小图片容器下边距 */
  }

  /* 调整媒体说明文字的间距 */
  .media-caption {
    margin-top: 3px;    /* 减小说明文字的上边距 */
    padding: 3px 5px;   /* 减小说明文字的内边距 */
  }

  /* 调整栅格系统的间距 */
  .el-row {
    margin-bottom: 8px !important; /* 减小行间距 */
  }

  .el-col {
    margin-bottom: 8px;  /* 减小列间距 */
  }

  /* 调整实验结果部分的间距 */
  .section-content h4 + p {
    margin: 3px 0 6px;  /* 减小标题和描述文字的间距 */
  }

  /* 调整表格组的间距 */
  .el-table {
    margin: 5px 0;      /* 减小表格的外边距 */
  }

  /* 调整图片的间距 */
  .method-image {
    margin-top: 5px;    /* 减小图片的上边距 */
  }

  /* 调整abstract部分的间距 */
  #abstract .section-content {
    margin-top: 5px;    /* 减小abstract内容的上边距 */
  }

  /* 调整container的间距 */
  .container {
    margin-bottom: 10px; /* 减小容器的下边距 */
  }

  /* 调整main-content的间距 */
  .main-content {
    margin-bottom: 0px;
  }

  .main-content .section:first-of-type {
    margin-top: 0px;
  }

}

/* 添加平板设备的媒体查询 */
@media screen and (min-width: 769px) and (max-width: 1024px) {
  .container {
    padding: 0 15px;
  }

  .title {
    font-size: 1.8em;
  }

  .video-player {
    height: 500px;
  }
}

.section-title {
  font-size: 1.4rem;
}

.method-box {
  padding: 1rem;
  margin: 1.5rem 0;
}

/* 添加触摸设备的交互优化 */
@media (hover: none) {
  .video-option-item {
    padding: 1rem;
  }

  .github-button {
    padding: 12px 20px;
  }
}

/* 添加新的样式 */
.abstract-row {
  padding: 0 90px; /* 在电脑端加左右边距 */
}

/* 移动端取消边距并确保对齐 */
@media (max-width: 768px) {
  .abstract-row {
    padding: 0 10px;
    margin: 0 -10px;
  }
  
  .abstract-col {
    padding: 0 10px;
  }
}

/* 修改移动端的容边距 */
@media screen and (max-width: 768px) {
  .container {
    padding: 0 10px;
  }

  /* 添加移动端视频和图片的高度设置 */
  .quick-glance-player, .quick-glance-img {
    height: auto; /* 移动端使用自适应高度 */
    max-height: none;
    /*边距为0*/
    margin: 0;
  }

  /* 减小 section 标题的大小 */
  .section-title {
    font-size: 18px;
    padding-bottom: 3px;
    margin-bottom: 8px;
  }

  /* 调整 abstract-row 的边距以匹配新的容器边距 */
  .abstract-row {
    padding: 0 10px;
    margin: 0 -10px;
  }
  
  .abstract-col {
    padding: 0 10px;
  }

  /* 调整移��端视频部分的边距 */
  .mobile-video-section {
    padding: 0 15px;
    margin: 0 0 20px 0;
  }
}

/* Desktop/Mobile visibility control */
.desktop-only {
  display: none;
}

.mobile-only {
  display: none;
}

@media screen and (min-width: 769px) {
  .desktop-only {
    display: block;
  }
}

@media screen and (max-width: 768px) {
  .mobile-only {
    display: block;
  }
}

/* Mobile Video Section Styles */
.mobile-video-section {
  padding: 0 15px;
  margin: 0 0 20px 0;
  position: relative;
}

.mobile-video-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  min-height: 400px;
  padding: 0; /* Remove any padding that might affect the video */
}

.mobile-selector-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: #fff;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.selector-expanded {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
}

.mobile-video-content {
  padding-top: 60px; /* Space for the selector */
}

.mobile-selector-title {
  font-size: 16px;
  font-weight: 500;
  color: rgb(140, 21, 21);
}

.mobile-model-list {
  background: #fff;
}

.mobile-model-item {
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mobile-model-item:last-child {
  border-bottom: none;
}

.mobile-model-item.active {
  color: rgb(140, 21, 21);
  font-weight: 500;
}

.mobile-question-display {
  margin: 0;
  padding: 15px;
  background-color: #f8f8f8;
  transition: all 0.3s ease;
}

.mobile-question-display.has-question {
  background-color: #fff;
  border-bottom: 1px solid #eee;
}

.mobile-question-text {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

.has-question .mobile-question-text {
  color: #333;
  font-weight: 500;
}

.mobile-video-player {
  padding: 15px;
  width: 100%;
  background: #fff;
  box-sizing: border-box; /* Ensure padding is included in width calculation */
}

.mobile-demo-video {
  width: 100%;
  max-width: 100%; /* Ensure video doesn't overflow */
  border-radius: 8px;
  background: #f8f8f8;
  display: block; /* Remove any potential inline spacing */
}

/* Ensure video container takes full width */
.mobile-video-player video {
  width: 100%;
  height: auto;
  display: block;
}

.video-placeholder {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f8f8;
  border-radius: 8px;
  color: #666;
  font-size: 14px;
}

/* Override element-plus collapse styles for mobile */
:deep(.el-collapse) {
  border: none;
}

:deep(.el-collapse-item__header) {
  background-color: #fff;
  padding: 15px;
  border: none;
  font-size: 16px;
  height: auto;
  line-height: 1.4;
}

:deep(.el-collapse-item__content) {
  padding: 0;
  background-color: #fff;
}

:deep(.el-collapse-item__wrap) {
  border: none;
}

:deep(.el-collapse-item__arrow) {
  margin-right: 4px;
}

/* Mobile Video Section Styles */
.mobile-selector-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.mobile-selector-hint {
  font-size: 12px;
  color: #999;
  font-weight: normal;
}
/* 只在移动端修改高度设置 */
@media screen and (max-width: 768px) {
  .quick-glance-player, .quick-glance-img {
    height: auto; /* 移动端使用自适应高度 */
    max-height: none;
    /*边距为0*/
    margin: 0;
  }
}

/* 移动端表格样式优化 */
@media screen and (max-width: 768px) {
  /* 调整表格整体样式 */
  :deep(.el-table) {
    font-size: 10px !important;
    line-height: 1.1 !important;
  }

  /* 调整表格单元格内边距 */
  :deep(.el-table__cell) {
    padding: 2px 1px !important;
  }

  /* 调整表头样式 */
  :deep(.el-table__header-wrapper th.el-table__cell) {
    padding: 2px 1px !important;
    height: 28px !important; /* 稍微增加表头高度以适应换行 */
    line-height: 1.1 !important;
  }

  /* 调整表格行高 */
  :deep(.el-table__row) {
    height: auto !important; /* 允许自动调整高度 */
    min-height: 24px !important; /* 设置最小高度 */
  }

  /* 调整表格内容区域 */
  :deep(.el-table__body td.el-table__cell) {
    height: auto !important; /* 允许自动调整高度 */
    min-height: 24px !important;
  }

  /* 调整表格内容区域的行高和换行 */
  :deep(.el-table__cell .cell) {
    line-height: 1.1 !important;
    white-space: normal !important; /* 允许换行 */
    overflow: visible !important;
    text-overflow: clip !important;
    display: -webkit-box !important;
    -webkit-line-clamp: 2 !important; /* 最多显示2行 */
    -webkit-box-orient: vertical !important;
    padding: 2px 0 !important;
  }

  /* 为模型名称列特殊处理 */
  :deep(.el-table__cell:first-child .cell) {
    white-space: normal !important;
    word-break: break-word !important;
  }

  /* 为数字列特殊处理 */
  :deep(.el-table__cell:not(:first-child) .cell) {
    white-space: nowrap !important; /* 数字列保持不换行 */
  }

  /* 调整表格外边距 */
  .el-table {
    margin: 4px 0 !important;
  }

  /* 调整表格标题样式 */
  .table-caption {
    font-size: 10px !important;
    margin: 2px 0 4px !important;
    line-height: 1.2 !important;
  }

  /* 调整带有额外间距的表格标题 */
  .table-caption-with-spacing {
    margin-bottom: 12px !important;
  }

  /* 优化表格内的粗体文本 */
  :deep(.el-table__row .bold-text) {
    font-weight: 500 !important;
  }

  /* 优化表格边框 */
  :deep(.el-table__header-wrapper th.el-table__cell) {
    border-bottom: 1px solid #ccc !important;
  }

  /* 调整特殊边框样式 */
  #mitigate-table :deep(.el-table__row:nth-child(3)) td,
  #mitigate-table :deep(.el-table__row:nth-child(6)) td,
  #generalize-table :deep(.el-table__row:nth-child(2)) td,
  #generalize-table :deep(.el-table__row:nth-child(4)) td,
  #generalize-table :deep(.el-table__row:nth-child(6)) td,
  #generalize-table :deep(.el-table__row:nth-child(8)) td,
  #generalize-table :deep(.el-table__row:nth-child(10)) td {
    border-bottom: 1px solid #ccc !important;
  }

  /* 调整表格内部的垂直对齐 */
  :deep(.el-table__cell) {
    vertical-align: middle !important;
  }

  /* 确保表格不会有横向滚动 */
  :deep(.el-table__body-wrapper) {
    overflow-x: hidden !important;
  }

  /* 优化表格内数字的显示 */
  :deep(.el-table__cell) {
    font-variant-numeric: tabular-nums !important;
  }
}

/* 修改 observation box 的移动端样式 */
@media screen and (max-width: 768px) {
  .observation-box {
    margin: 0px -10px;  /* 减小上下外边距为8px，左右为3px */
    padding: 6px 6px;  /* 减小内边距 */
    font-size: 14px;  /* 减小字体大小 */
    line-height: 1.3;  /* 减小行高 */
    border-left: 3px solid rgb(140, 21, 21);  /* 减小左边框宽度 */
  }

  /* 调整 observation box 内的加粗文本 */
  .observation-box strong {
    font-size: 14px;
    font-weight: 600;
  }
}

/* 在现有的 <style scoped> 中添加或修改以下样式 */

/* 默认样式(电脑端) */
.responsive-image {
  width: 100%;
  height: auto;
  margin-top: 15px;
  border-radius: 8px;
}

/* 特定图片的宽度控制 */
img[alt="Question Repeating"] {
  width: 80%;
}

/* 移动端样式覆盖 */
@media screen and (max-width: 768px) {
  img[alt="Question Repeating"] {
    width: 100%;
    margin: 5px 0; /* 调整移动端的边距 */
  }
}

</style>

