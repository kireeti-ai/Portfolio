"use client"

import { FileText, Sparkles, Briefcase, FlaskConical, Brain, ChevronRight, Cpu, BarChart3, Lightbulb, BookOpen, GitBranch, Layers, Target, TrendingUp, ExternalLink, TestTubes, Gauge } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"

export function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [expandedSection, setExpandedSection] = useState<string | null>("overview")

  // ── Equipoise RAG Data ──
  const equipoiseContributions = [
    "Built Equipoise — a Retrieval-Augmented Generation system that verifies biomedical scientific claims by retrieving and synthesising evidence from the SciFact corpus (5,183 abstracts).",
    "Designed a multi-stage RAG pipeline: Query Reformulation → Hybrid Retrieval (Dense + BM25) → Cross-Encoder Reranking → LLM Verdict Generation with anti-hallucination guardrails.",
    "Developed three original evaluation metrics — Support Recall, Contradiction Recall, and Balance Score — to measure retrieval bias toward confirming vs. contradicting evidence.",
    "Ran systematic experiments across 4 retrieval strategies (Dense, BM25, Hybrid, Query-Reformulation) on 300 stratified SciFact claims, achieving a top Balance Score of 1.04.",
    "Conducted Top-K sensitivity analysis (K=3, 5, 10) identifying K=5 as the optimal setting — higher K introduced noise that degraded verdict quality.",
    "Evaluated 3 prompt variants (Neutral, Biased, Structured) using RAGAS framework, achieving 0.74 faithfulness and 0.96 answer relevancy with the structured prompt.",
    "Implemented anti-hallucination guardrails including mandatory PMID citations, explicit relevance checks, and \"Insufficient Evidence\" fallback rules.",
    "Automated the full experimentation pipeline with SQLite result storage, LangSmith tracing, and reproducible evaluation scripts.",
    "Built a Streamlit interface for interactive claim verification with real-time evidence retrieval and verdict display.",
    "Investigated Semantic Collapse bias — where dense retrieval systematically under-ranks contradicting evidence due to language dissimilarity.",
  ]

  const architectureSteps = [
    { step: "Query Reformulation", detail: "Llama 3.3 70B rewrites claims to include both confirming and negation terms", color: "bg-[#6366F1]" },
    { step: "Hybrid Retrieval", detail: "Dense (BGE-base) + BM25 search across 5,183 SciFact abstracts", color: "bg-[#2F81F7]" },
    { step: "Cross-Encoder Reranking", detail: "ms-marco-MiniLM re-scores top 30 → top 5 most relevant", color: "bg-[#FF6B7A]" },
    { step: "LLM Verdict Generation", detail: "Structured prompt with anti-hallucination rules + PMID citations", color: "bg-[#10B981]" },
    { step: "RAGAS Evaluation", detail: "Faithfulness, Answer Relevancy, Context Precision & Recall", color: "bg-[#F59E0B]" },
  ]

  const equipoiseResults = [
    { metric: "Balance Score", value: "1.04", detail: "Dense retrieval (best)", icon: <Target className="w-4 h-4" /> },
    { metric: "Faithfulness", value: "0.74", detail: "Structured prompt", icon: <TrendingUp className="w-4 h-4" /> },
    { metric: "Answer Relevancy", value: "0.96", detail: "Structured prompt", icon: <BarChart3 className="w-4 h-4" /> },
    { metric: "Claims Evaluated", value: "300", detail: "150 SUPPORT + 150 CONTRADICT", icon: <Layers className="w-4 h-4" /> },
  ]

  const equipoiseFindings = [
    { text: "Dense retrieval achieves the best Balance Score after reranking — BM25 is fastest but lowest recall.", icon: <Brain className="w-4 h-4" /> },
    { text: "K=5 is the 'Goldilocks' setting — K=10 dilutes the signal and hurts Balance Score despite higher raw recall.", icon: <Target className="w-4 h-4" /> },
    { text: "Structured prompts with anti-hallucination rules dramatically outperform neutral and biased variants (0.96 vs 0.46 relevancy).", icon: <Lightbulb className="w-4 h-4" /> },
    { text: "Semantic Collapse bias is measurably present — contradicting papers use different language and score lower in vector similarity.", icon: <Cpu className="w-4 h-4" /> },
  ]

  // ── Zero-Shot NLP Benchmark Data ──
  const benchmarkContributions = [
    "Conducted a systematic benchmark comparing 3 transformer-based NLI models (DistilBERT, RoBERTa, BART-large-MNLI) for zero-shot news classification on 300 AG News test articles.",
    "Designed and tested 3 prompt engineering strategies — Short (single-word labels), Descriptive (keyword phrases), and Hypothesis (NLI-style sentences) — across all models.",
    "Ran 9 total experiments (3 models × 3 prompts) with quantitative evaluation using accuracy, F1-score, inference speed, and confidence distributions.",
    "Discovered RoBERTa + Hypothesis prompt achieves 77.5% accuracy — matching BART-large at 4× the inference speed (0.02s vs 0.08s per article).",
    "Performed confusion matrix analysis and confidence-gap evaluation to identify systematic failure modes and model reliability differences.",
    "Built automated experimentation pipelines using Hugging Face zero-shot classification pipelines for reproducible evaluation.",
  ]

  const benchmarkResults = [
    { model: "DistilBERT", prompt: "Hypothesis", accuracy: "71.5%", f1: "0.723", speed: "0.01s" },
    { model: "RoBERTa", prompt: "Hypothesis", accuracy: "77.5%", f1: "0.781", speed: "0.02s" },
    { model: "BART-large", prompt: "Hypothesis", accuracy: "77.0%", f1: "0.784", speed: "0.08s" },
  ]

  const benchmarkFindings = [
    { text: "Prompt formulation influences zero-shot performance more than model size — Hypothesis prompts boosted DistilBERT from 56.5% to 71.5%.", icon: <Lightbulb className="w-4 h-4" /> },
    { text: "RoBERTa + Hypothesis is the winner — matches BART-large accuracy at 4× the speed, best cost-performance trade-off.", icon: <Gauge className="w-4 h-4" /> },
    { text: "Descriptive prompts help large models but hurt small ones — DistilBERT dropped from 56.5% to 51.5% with descriptive labels.", icon: <Brain className="w-4 h-4" /> },
    { text: "Confidence-gap analysis revealed RoBERTa produces more calibrated predictions than BART despite similar top-line accuracy.", icon: <BarChart3 className="w-4 h-4" /> },
  ]

  // ── Combined Technologies & Skills ──
  const technologies = [
    "Python", "LangChain", "ChromaDB", "rank-bm25",
    "Hugging Face Transformers", "Hugging Face Datasets", "PyTorch", "RAGAS",
    "Streamlit", "SQLite", "LangSmith", "Scikit-learn",
    "OpenRouter", "Llama 3.3 70B", "BGE-base-en-v1.5",
    "Cross-Encoder MiniLM", "SciFact Corpus", "Pandas", "Matplotlib"
  ]

  const skills = [
    "Retrieval-Augmented Generation", "Scientific Claim Verification",
    "Evidence-Based Reasoning", "Evaluation Metric Design",
    "Retrieval Bias Analysis", "Prompt Engineering",
    "Anti-Hallucination Techniques", "Zero-Shot Learning",
    "NLP Research Methodology", "Transformer Model Evaluation",
    "Experimental Design", "Performance Benchmarking",
    "Data Analysis & Visualization"
  ]

  const interests = [
    {
      title: "Data Structures & Algorithms",
      description: "Strong problem-solving skills with a focus on optimizing time and space complexity.",
      color: "bg-[#6366F1]",
    },
    {
      title: "Backend Development",
      description: "Building robust, scalable APIs and microservices.",
      color: "bg-[#2F81F7]",
    },
    {
      title: "Cloud Computing",
      description: "Deploying containerized applications on AWS (S3, EC2, IAM, RDS, Lambda, ECR, ECS, EKS) and Azure with modern DevOps practices.",
      color: "bg-[#FF6B7A]",
    },
  ]

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <>
      {/* ── Experience Section ── */}
      <section id="experience" className="bg-[#F8F7F4] py-16 md:py-24" ref={ref}>
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">

            {/* Section Header */}
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-black text-white px-5 py-2 rounded-full text-sm font-bold mb-6 border-2 border-black shadow-[3px_3px_0px_0px_rgba(99,102,241,1)]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Briefcase className="w-4 h-4" />
                Work Experience
              </motion.div>
              <motion.h2
                className="text-3xl md:text-4xl lg:text-6xl font-bold leading-[1.3]"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Professional{" "}
                <motion.span
                  className="bg-[#6366F1] text-white px-3 py-1 inline-block"
                  initial={{ scale: 0.8 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  Experience
                </motion.span>
              </motion.h2>
            </motion.div>

            {/* Experience Card */}
            <motion.div
              className="bg-white border-4 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Card Header */}
              <div className="bg-[#6366F1] p-6 md:p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <motion.span
                      className="bg-white/20 backdrop-blur-sm text-white text-xs md:text-sm font-bold px-4 py-1.5 rounded-full border border-white/30"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      DRDO – Defence R&D
                    </motion.span>
                    <span className="bg-white text-[#6366F1] text-xs md:text-sm font-bold px-4 py-1.5 rounded-full">
                      Internship
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                    AI Research Intern
                  </h3>
                  <p className="text-white/90 text-base md:text-lg font-medium">
                    Defence Research and Development Laboratory (DRDL), Hyderabad
                  </p>
                </div>
              </div>

              {/* Card Body – Accordion Sections */}
              <div className="divide-y-2 divide-black/10">

                {/* Overview */}
                <div>
                  <button
                    onClick={() => toggleSection("overview")}
                    className="w-full flex items-center justify-between p-5 md:p-8 text-left hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#6366F1] rounded-xl flex items-center justify-center text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <span className="text-lg md:text-xl font-bold">Overview</span>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedSection === "overview" ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-black transition-colors" />
                    </motion.div>
                  </button>
                  {expandedSection === "overview" && (
                    <motion.div
                      className="px-5 md:px-8 pb-6 md:pb-8"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-4xl mb-4">
                        During my internship at the Defence Research and Development Laboratory (DRDL), Hyderabad, I worked on the development and evaluation of AI systems for biomedical scientific claim verification. The work was split into two major research tracks:
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4 max-w-4xl">
                        <div className="bg-[#6366F1]/5 border-2 border-[#6366F1]/20 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 bg-[#6366F1] rounded-lg flex items-center justify-center text-white text-xs font-bold">1</div>
                            <span className="font-bold text-sm">Equipoise RAG</span>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            A RAG system that verifies biomedical claims by retrieving both supporting <em>and</em> contradicting evidence from the SciFact corpus — measuring retrieval bias with original metrics.
                          </p>
                        </div>
                        <div className="bg-[#2F81F7]/5 border-2 border-[#2F81F7]/20 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 bg-[#2F81F7] rounded-lg flex items-center justify-center text-white text-xs font-bold">2</div>
                            <span className="font-bold text-sm">Zero-Shot NLP Benchmark</span>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            A systematic comparison of 3 transformer models × 3 prompt strategies for zero-shot news classification — 9 experiments on 300 AG News articles.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* ─── EQUIPOISE RAG ─── */}
                {/* Equipoise: What I Built */}
                <div>
                  <button
                    onClick={() => toggleSection("equipoise-work")}
                    className="w-full flex items-center justify-between p-5 md:p-8 text-left hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#6366F1] rounded-xl flex items-center justify-center text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <FlaskConical className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-lg md:text-xl font-bold block leading-tight">Equipoise — Biomedical Claim Verification</span>
                        <span className="text-xs md:text-sm text-gray-500 font-medium">RAG pipeline · SciFact corpus · Evidence synthesis</span>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedSection === "equipoise-work" ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-black transition-colors" />
                    </motion.div>
                  </button>
                  {expandedSection === "equipoise-work" && (
                    <motion.div
                      className="px-5 md:px-8 pb-6 md:pb-8"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                        {equipoiseResults.map((result, i) => (
                          <motion.div
                            key={result.metric}
                            className="bg-gray-50 border-2 border-black/10 rounded-xl p-3 md:p-4 text-center"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                          >
                            <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
                              {result.icon}
                              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">{result.metric}</span>
                            </div>
                            <div className="text-xl md:text-2xl font-bold text-[#0B0B0B]">{result.value}</div>
                            <div className="text-[10px] md:text-xs text-gray-500">{result.detail}</div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Contributions */}
                      <ul className="space-y-3 max-w-4xl mb-6">
                        {equipoiseContributions.map((item, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start gap-3 text-gray-600 text-sm md:text-base leading-relaxed"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}
                          >
                            <span className="w-2 h-2 bg-[#6366F1] rounded-full mt-2 flex-shrink-0" />
                            {item}
                          </motion.li>
                        ))}
                      </ul>

                      {/* Architecture Pipeline */}
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">System Architecture</h4>
                      <div className="max-w-3xl space-y-2 mb-6">
                        {architectureSteps.map((step, i) => (
                          <motion.div
                            key={i}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.06 }}
                          >
                            <div className="flex flex-col items-center flex-shrink-0">
                              <div className={`w-8 h-8 ${step.color} rounded-lg flex items-center justify-center text-white text-xs font-bold border-2 border-black`}>
                                {i + 1}
                              </div>
                              {i < architectureSteps.length - 1 && (
                                <div className="w-0.5 h-4 bg-black/15 mt-0.5" />
                              )}
                            </div>
                            <div className="pt-1">
                              <span className="font-bold text-[#0B0B0B] text-sm">{step.step}</span>
                              <span className="text-gray-500 text-sm"> — {step.detail}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Key Findings */}
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Key Findings</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {equipoiseFindings.map((finding, i) => (
                          <motion.div
                            key={i}
                            className="bg-gray-50 border-2 border-black/10 rounded-xl p-4 hover:border-[#6366F1]/30 transition-colors"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-[#6366F1]/10 rounded-lg flex items-center justify-center text-[#6366F1] flex-shrink-0 mt-0.5">
                                {finding.icon}
                              </div>
                              <p className="text-gray-700 text-sm leading-relaxed">{finding.text}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* ─── ZERO-SHOT BENCHMARK ─── */}
                <div>
                  <button
                    onClick={() => toggleSection("benchmark-work")}
                    className="w-full flex items-center justify-between p-5 md:p-8 text-left hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#2F81F7] rounded-xl flex items-center justify-center text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <TestTubes className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-lg md:text-xl font-bold block leading-tight">Zero-Shot NLP Benchmark</span>
                        <span className="text-xs md:text-sm text-gray-500 font-medium">3 models × 3 prompts · AG News · 9 experiments</span>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedSection === "benchmark-work" ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-black transition-colors" />
                    </motion.div>
                  </button>
                  {expandedSection === "benchmark-work" && (
                    <motion.div
                      className="px-5 md:px-8 pb-6 md:pb-8"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Best Results Table */}
                      <div className="mb-6">
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Best Results (Hypothesis Prompt)</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full max-w-2xl text-sm">
                            <thead>
                              <tr className="border-b-2 border-black">
                                <th className="text-left py-3 pr-4 font-bold text-[#0B0B0B]">Model</th>
                                <th className="text-center py-3 px-3 font-bold text-[#0B0B0B]">Accuracy</th>
                                <th className="text-center py-3 px-3 font-bold text-[#0B0B0B]">F1</th>
                                <th className="text-center py-3 pl-3 font-bold text-[#0B0B0B]">Speed</th>
                              </tr>
                            </thead>
                            <tbody>
                              {benchmarkResults.map((row, i) => (
                                <motion.tr
                                  key={row.model}
                                  className={`border-b border-black/10 ${row.model === "RoBERTa" ? "bg-[#2F81F7]/5" : ""}`}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                >
                                  <td className="py-3 pr-4">
                                    <div className="flex items-center gap-2">
                                      {row.model === "RoBERTa" && (
                                        <span className="bg-[#2F81F7] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">WINNER</span>
                                      )}
                                      <span className={`font-semibold ${row.model === "RoBERTa" ? "text-[#2F81F7]" : "text-gray-700"}`}>{row.model}</span>
                                    </div>
                                  </td>
                                  <td className={`text-center py-3 px-3 font-bold ${row.model === "RoBERTa" ? "text-[#2F81F7]" : "text-gray-700"}`}>{row.accuracy}</td>
                                  <td className={`text-center py-3 px-3 font-bold ${row.model === "RoBERTa" ? "text-[#2F81F7]" : "text-gray-700"}`}>{row.f1}</td>
                                  <td className={`text-center py-3 pl-3 font-medium ${row.model === "RoBERTa" ? "text-[#2F81F7]" : "text-gray-500"}`}>{row.speed}/article</td>
                                </motion.tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 italic">
                          Winner: RoBERTa + Hypothesis — matches BART-large accuracy at 4× the speed
                        </p>
                      </div>

                      {/* Contributions */}
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">What I Did</h4>
                      <ul className="space-y-3 max-w-4xl mb-6">
                        {benchmarkContributions.map((item, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start gap-3 text-gray-600 text-sm md:text-base leading-relaxed"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}
                          >
                            <span className="w-2 h-2 bg-[#2F81F7] rounded-full mt-2 flex-shrink-0" />
                            {item}
                          </motion.li>
                        ))}
                      </ul>

                      {/* Key Findings */}
                      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Key Findings</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {benchmarkFindings.map((finding, i) => (
                          <motion.div
                            key={i}
                            className="bg-gray-50 border-2 border-black/10 rounded-xl p-4 hover:border-[#2F81F7]/30 transition-colors"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-[#2F81F7]/10 rounded-lg flex items-center justify-center text-[#2F81F7] flex-shrink-0 mt-0.5">
                                {finding.icon}
                              </div>
                              <p className="text-gray-700 text-sm leading-relaxed">{finding.text}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Technologies & Skills */}
                <div>
                  <button
                    onClick={() => toggleSection("tech")}
                    className="w-full flex items-center justify-between p-5 md:p-8 text-left hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#10B981] rounded-xl flex items-center justify-center text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <span className="text-lg md:text-xl font-bold">Technologies & Skills</span>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedSection === "tech" ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-black transition-colors" />
                    </motion.div>
                  </button>
                  {expandedSection === "tech" && (
                    <motion.div
                      className="px-5 md:px-8 pb-6 md:pb-8"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="max-w-4xl space-y-6">
                        {/* Technologies */}
                        <div>
                          <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Tech Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {technologies.map((tech, i) => (
                              <motion.span
                                key={tech}
                                className="bg-black text-white text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full border-2 border-black hover:bg-[#6366F1] transition-colors cursor-default"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.03 }}
                                whileHover={{ scale: 1.05, y: -2 }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        {/* Skills */}
                        <div>
                          <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Skills Developed</h4>
                          <div className="flex flex-wrap gap-2">
                            {skills.map((skill, i) => (
                              <motion.span
                                key={skill}
                                className="bg-[#F3F0FF] text-[#6366F1] text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full border-2 border-[#6366F1]/20 hover:border-[#6366F1] transition-colors cursor-default"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.03 }}
                                whileHover={{ scale: 1.05, y: -2 }}
                              >
                                {skill}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Core Interests Section ── */}
      <section className="bg-black py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              className="text-white pt-0 md:pt-12 md:sticky md:top-12 self-start"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2
                className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 md:mb-8 leading-[1.3]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                My Core{" "}
                <motion.span
                  className="bg-[#6366F1] text-white px-3 py-1 inline-block"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  Interests
                </motion.span>
              </motion.h2>
              <motion.p
                className="text-gray-400 mb-8 md:mb-10 leading-relaxed text-base md:text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Passionate about building scalable, secure, and high-performance software applications. Currently exploring distributed systems and AI-powered applications.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Button asChild className="bg-white text-black hover:bg-gray-50 rounded-lg py-5 px-8 md:py-[22px] md:px-[62px] text-base md:text-lg font-semibold h-auto w-full sm:w-auto sm:min-w-[240px] hover:scale-105 transition-transform">
                  <a href="mailto:kireetiv2005@gmail.com">
                    <FileText className="w-5 h-5" />
                    Contact Me
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            <div className="space-y-6">
              {interests.map((interest, index) => (
                <motion.div
                  key={index}
                  className="bg-white border-4 border-black rounded-3xl min-h-[180px] md:min-h-[200px]"
                  initial={{ opacity: 0, x: 50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                  whileHover={{ y: -8, boxShadow: "8px 8px 0px 0px rgba(255,255,255,0.3)" }}
                >
                  <div className="flex items-center justify-between mb-4 md:mb-6 pt-6 md:pt-8 px-6 md:px-8">
                    <motion.div
                      className={`${interest.color} text-white px-4 py-2 rounded-full text-sm md:text-base font-bold`}
                      whileHover={{ scale: 1.05 }}
                    >
                      Interest #{index + 1}
                    </motion.div>
                    <motion.div
                      className={`w-10 h-10 md:w-12 md:h-12 ${interest.color} rounded-full flex items-center justify-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </motion.div>
                  </div>

                  <div className="border-t-[3px] border-black mb-4 md:mb-6"></div>

                  <div className="px-6 md:px-8 pb-6 md:pb-8">
                    <h3 className="text-xl md:text-[28px] leading-tight md:leading-[40px] font-bold text-[#0B0B0B] mb-2 md:mb-3">
                      {interest.title}
                    </h3>
                    <p className="text-[#393939] text-base md:text-[20px] leading-relaxed md:leading-[32px]">
                      {interest.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
