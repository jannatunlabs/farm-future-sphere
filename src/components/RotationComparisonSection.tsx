import React, { useState } from "react";
import {
  Droplets,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldAlert,
  Sprout,
  Satellite,
  HelpCircle,
  TrendingUp,
} from "lucide-react";

type WaterAvailability = "low" | "medium" | "high";
type EquipmentLevel = "manual" | "basic_machinery" | "advanced";

interface RotationOption {
  id: string;
  title: string;
  badge: string;
  isCurrent?: boolean;
  sequence: string[];
  confidence: "High" | "Medium" | "Low";
  scores: {
    soilFertility: number;
    waterResilience: number;
    yieldStability: number;
    costAndLabor: number;
  };
  marketSuitability: string;
  evidenceCard: {
    reason: string;
    evidence: string;
    benefits: string[];
    dataGaps: string;
    validationRisks: string;
  };
}

export const RotationComparisonSection: React.FC = () => {
  // Feature #5: Farmer Constraints Input (Water & Equipment)
  const [waterConstraint, setWaterConstraint] = useState<WaterAvailability>("low");
  const [equipmentConstraint, setEquipmentConstraint] = useState<EquipmentLevel>("basic_machinery");
  const [soilTested, setSoilTested] = useState<boolean>(false);

  // Feature #4: Farmer Priority Weighting (পানি, মাটি, আয়, বাজার অগ্রাধিকার)
  // Each priority maps to one axis of the 4-axis scorecard and rescales the final score.
  const [priorities, setPriorities] = useState<Record<string, number>>({
    water: 25,
    soil: 25,
    income: 25,
    market: 25,
  });

  const weightedScore = (scores: RotationOption["scores"], weights: Record<string, number>) => {
    const total = weights.water + weights.soil + weights.income + weights.market;
    if (total === 0) return 0;
    return Math.round(
      (scores.waterResilience * weights.water +
        scores.soilFertility * weights.soil +
        scores.yieldStability * weights.income +
        scores.costAndLabor * weights.market) /
        total,
    );
  };

  // Feature #6 & #7: 3 Rotation Strategies (including current) + Full Evidence Cards
  const getRotations = (): RotationOption[] => {
    const isLowWater = waterConstraint === "low";
    const isManual = equipmentConstraint === "manual";

    return [
      {
        id: "current",
        title: "চলমান কৌশল: বোরো ধান → পতিত → আমন ধান",
        badge: "আপনার বর্তমান ফসল চক্র",
        isCurrent: true,
        sequence: ["বোরো ধান (শীত-গ্রীষ্ম)", "পতিত জমি", "আমন ধান (বর্ষা)"],
        confidence: soilTested ? "High" : "Medium",
        scores: {
          soilFertility: 45,
          waterResilience: isLowWater ? 30 : 55,
          yieldStability: 65,
          costAndLabor: 50,
        },
        marketSuitability:
          "উচ্চ বাজার চাহিদা (স্থায়ী বাজার), তবে সেচ খরচ বেশি হওয়ায় নিট মুনাফা কমে যাওয়ার ঝুঁকি থাকে।",
        evidenceCard: {
          reason:
            "স্থানীয়ভাবে প্রচলিত এবং কৃষকের পরিচিত পদ্ধতি হওয়ায় এটি বেসলাইন (চলমান) হিসেবে ধরা হয়েছে।",
          evidence:
            "NASA SMAP ও GRACE ডেটা অনুযায়ী শুষ্ক মৌসুমে ভূগর্ভস্থ পানির স্তর দ্রুত নিচে নামছে এবং একটানা ধান চাষে মাটির জৈব উপাদান হ্রাস পাচ্ছে।",
          benefits: [
            "কৃষকের পূর্ব অভিজ্ঞতা ও নিশ্চিত বাজার ব্যবস্থা",
            "বর্ষায় আমন ধানে অতিরিক্ত সেচের প্রয়োজন হয় না",
          ],
          dataGaps: soilTested
            ? "স্থানীয় পর্যায়ে ভূগর্ভস্থ পানির সুনির্দিষ্ট গভীরতার তাৎক্ষণিক সেন্সর ডেটা নেই।"
            : "স্থানীয় মাটির N, P, K ও pH পরীক্ষার ডেটা দেওয়া হয়নি; স্যাটেলাইট অনুমানের ওপর নির্ভর করা হয়েছে।",
          validationRisks:
            "খরা প্রবণ বছরে বোরো মৌসুমে সেচ পাম্পে পানি না পাওয়া গেলে ফলন ৩০-৪০% পর্যন্ত কমে যেতে পারে।",
        },
      },
      {
        id: "water_saving",
        title: "বিকল্প ১ (পানি সাশ্রয়ী): সরিষা → মুগ ডাল → আমন ধান",
        badge: isLowWater ? "সবচেয়ে উপযোগী (পানি সাশ্রয়ী)" : "উন্নত মাটি ও পানি কৌশল",
        sequence: ["সরিষা (রবি)", "মুগ ডাল (খরিফ-১)", "আমন ধান (খরিফ-২)"],
        confidence: soilTested ? "High" : "Medium",
        scores: {
          soilFertility: 88,
          waterResilience: 92,
          yieldStability: 82,
          costAndLabor: isManual ? 70 : 85,
        },
        marketSuitability:
          "ভোজ্যতেল (সরিষা) ও ডালের স্থানীয় বাজারে উচ্চ মূল্যের চাহিদা রয়েছে এবং উৎপাদন খরচ তুলনামূলক কম।",
        evidenceCard: {
          reason:
            "পানির প্রাপ্যতা কম বা মাঝারি হলে এবং মাটির প্রাকৃতিক নাইট্রোজেন বাড়াতে এই চক্রটি সবচেয়ে কার্যকর।",
          evidence:
            "NASA POWER ও GPM বৃষ্টিপাত বিশ্লেষণ এবং NEX-GDDP-CMIP6 জলবায়ু পূর্বাভাস অনুযায়ী রবি ও খরিফ-১ মৌসুমে ৬০-৭০% কম পানি ব্যবহার করে এই ফসলগুলো টিকে থাকতে পারে।",
          benefits: [
            "বোরো ধানের তুলনায় প্রায় ৬৫% সেচের পানি সাশ্রয় হয়",
            "মুগ ডালের শিকড় মাটিতে প্রাকৃতিক নাইট্রোজেন যুক্ত করে (সারের খরচ কমায়)",
            "বছরে ৩টি ফসল পাওয়ায় ঝুঁকি বণ্টিত হয়",
          ],
          dataGaps:
            "সরিষা তোলার পর মুগ ডাল বপনের সময় স্বল্পমেয়াদী অতিবৃষ্টির স্থানীয় মাইক্রো-ক্লাইমেট ডেটার সীমাবদ্ধতা রয়েছে।",
          validationRisks:
            "জমিতে পানি নিষ্কাশনের সুব্যবস্থা না থাকলে সরিষা ও মুগ ডালের শিকড় পচে যাওয়ার ঝুঁকি থাকে; স্থানীয় কৃষি কর্মকর্তার পরামর্শে জাত নির্বাচন জরুরি।",
        },
      },
      {
        id: "resilient_diversified",
        title: "বিকল্প ২ (জলবায়ু সহনশীল): ভুট্টা → সবজি/পাট → আমন ধান",
        badge:
          equipmentConstraint !== "manual" ? "উচ্চ ফলন ও বাজার উপযোগী" : "মাঝারি শ্রম ও উচ্চ আয়",
        sequence: ["ভুট্টা (রবি)", "পাট বা স্বল্পমেয়াদী সবজি (খরিফ-১)", "আমন ধান (খরিফ-২)"],
        confidence: soilTested ? "High" : "Low",
        scores: {
          soilFertility: 75,
          waterResilience: 78,
          yieldStability: 86,
          costAndLabor: isManual ? 55 : 80,
        },
        marketSuitability:
          "পোল্ট্রি ও ফিশ ফিডের জন্য ভুট্টার ব্যাপক চাহিদা রয়েছে এবং পাট/সবজি নগদ অর্থের জোগান দেয়।",
        evidenceCard: {
          reason:
            "গভীর মূলী ও অগভীর মূলী ফসলের সমন্বয়ে মাটির নিচের স্তরের পুষ্টি ব্যবহার এবং উচ্চ ফলন নিশ্চিত করতে এটি প্রস্তাবিত।",
          evidence:
            "MODIS NDVI এবং ফসলের শিকড়ের গভীরতা (Root Depth) বিশ্লেষণ দেখায় যে ভুট্টা ও পাটের পর্যায়ক্রমিক চাষে মাটির গঠন উন্নত হয় এবং তাপমাত্রা বৃদ্ধির সহনশীলতা বাড়ে।",
          benefits: [
            "বোরো ধানের চেয়ে ভুট্টায় পানির চাহিদা অনেক কম কিন্তু ফলন বেশি",
            "পাটের পাতা ঝরে মাটিতে প্রচুর জৈব পদার্থ যোগ করে",
            "তাপমাত্রা কিছুটা বাড়লেও ভুট্টার ফলন স্থিতিশীল থাকে",
          ],
          dataGaps:
            "ভুট্টা মাড়াই ও শুকানোর আধুনিক যন্ত্রপাতি আপনার এলাকায় সহজলভ্য কি না এবং মাটির জিঙ্ক/বোরন ঘাটতির তথ্য অসম্পূর্ণ।",
          validationRisks:
            "হাতে চাষ ও মাড়াই করতে গেলে শ্রমিকের খরচ বেড়ে যেতে পারে এবং ফল আর্মিওয়ার্ম (Fall Armyworm) পোকার আক্রমণ স্থানীয়ভাবে যাচাই করা প্রয়োজন।",
        },
      },
    ];
  };

  const rotations = getRotations();

  const getConfidenceBadge = (level: "High" | "Medium" | "Low") => {
    if (level === "High") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-300">
          <CheckCircle2 className="w-3.5 h-3.5" /> নির্ভরযোগ্যতা: উচ্চ (High)
        </span>
      );
    }
    if (level === "Medium") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
          <AlertTriangle className="w-3.5 h-3.5" /> নির্ভরযোগ্যতা: মাঝারি (Medium)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-300">
        <ShieldAlert className="w-3.5 h-3.5" /> নির্ভরযোগ্যতা: কম (Low - মাটি পরীক্ষা প্রয়োজন)
      </span>
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return "bg-green-600";
    if (score >= 55) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <section className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6 bg-slate-50 rounded-2xl border border-slate-200 my-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Sprout className="w-7 h-7 text-green-600" />
            ফসল চক্র (Crop Rotation) তুলনা ও প্রমাণ-কার্ড
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            আপনার জমির সীমাবদ্ধতা অনুযায়ী চলমান ফসল চক্রের সাথে আরও ২টি বিকল্প কৌশলের তুলনা করুন।
          </p>
        </div>

        {/* Feature #16 Disclaimer Badge */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 max-w-md flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <span>
            <strong>সতর্কবার্তা:</strong> এটি একটি সহায়ক টুল, কৃষকের বিচার বা স্থানীয় কৃষি
            বিশেষজ্ঞের বিকল্প নয়। নতুন ফসল চক্র শুরুর আগে উপ-সহকারী কৃষি কর্মকর্তার পরামর্শ নিন।
          </span>
        </div>
      </div>

      {/* Feature #13: Satellite vs Ground Measurement Explanation Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Satellite className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
          <div>
            <h3 className="text-sm font-bold text-blue-950">
              স্যাটেলাইট বনাম মাটি পরীক্ষার পার্থক্য (কেন মাটি পরীক্ষা জরুরি?)
            </h3>
            <p className="text-xs sm:text-sm text-blue-900 mt-0.5">
              <strong>“স্যাটেলাইট এলাকার তথ্য দেয়, মাটি পরীক্ষা আপনার জমির তথ্য দেয়।”</strong>{" "}
              NASA স্যাটেলাইট (যেমন SMAP, MODIS) কয়েক কিলোমিটার জুড়ে আর্দ্রতা ও সবুজায়নের গড় হিসাব
              দেয়, কিন্তু আপনার নির্দিষ্ট জমির pH বা সারের ঘাটতি কেবল স্থানীয় মাটি পরীক্ষাতেই শতভাগ
              নিশ্চিত হওয়া যায়।
            </p>
          </div>
        </div>
        <label className="flex items-center gap-2 text-xs font-medium text-blue-950 bg-white px-3 py-2 rounded-lg border border-blue-200 cursor-pointer shrink-0">
          <input
            type="checkbox"
            checked={soilTested}
            onChange={(e) => setSoilTested(e.target.checked)}
            className="rounded text-blue-600 focus:ring-blue-500"
          />
          আমার জমির মাটি পরীক্ষার তথ্য আছে
        </label>
      </div>

      {/* Feature #5: Farmer Constraints Input (Water Availability & Machinery) */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
          <Wrench className="w-5 h-5 text-slate-700" />
          আপনার সীমাবদ্ধতা ও সক্ষমতা নির্বাচন করুন (ফলাফল স্বয়ংক্রিয়ভাবে আপডেট হবে)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Water Availability */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-blue-600" />
              ১. পানির প্রাপ্যতা (সেচের সুবিধা):
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "low", label: "কম / বৃষ্টিনির্ভর" },
                { id: "medium", label: "মাঝারি সেচ" },
                { id: "high", label: "পর্যাপ্ত সেচ" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setWaterConstraint(item.id as WaterAvailability)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                    waterConstraint === item.id
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Equipment / Machinery */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-emerald-600" />
              ২. কৃষি যন্ত্রপাতি ও শ্রমিক সুবিধা:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "manual", label: "হাতে চাষ / সীমিত" },
                { id: "basic_machinery", label: "পাওয়ার টিলার / মাড়াই" },
                { id: "advanced", label: "আধুনিক যন্ত্রপাতি" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setEquipmentConstraint(item.id as EquipmentLevel)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                    equipmentConstraint === item.id
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Feature #4: Farmer Priority Weighting (NEW) */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          আপনার অগ্রাধিকার ওজন (Farmer Priority Weighting)
        </h3>
        <p className="text-sm text-slate-600 mb-4">
          কৃষকের প্রাথমিক লক্ষ্য অনুযায়ী ৪-অক্ষের স্কোরকার্ডের ওজন বদলায়। সব মূল্য সমান রাখলে
          প্রতিটি কৌশলের সমগ্র স্কোর পরিবর্তন হয়।
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Water priority */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <label className="block text-xs font-medium text-slate-700 mb-1">
              <Droplets className="w-3.5 h-3.5 text-blue-600" />
              পানি (Water): {priorities.water}%
            </label>
            <input
              type="range"
              min={0}
              max={50}
              step={1}
              value={priorities.water}
              onChange={(e) => setPriorities((p) => ({ ...p, water: Number(e.target.value) }))}
              className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
            </div>
          </div>

          {/* Soil priority */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <label className="block text-xs font-medium text-slate-700 mb-1">
              <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
              মাটি (Soil): {priorities.soil}%
            </label>
            <input
              type="range"
              min={0}
              max={50}
              step={1}
              value={priorities.soil}
              onChange={(e) => setPriorities((p) => ({ ...p, soil: Number(e.target.value) }))}
              className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-red-600"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
            </div>
          </div>

          {/* Income priority */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <label className="block text-xs font-medium text-slate-700 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              আয় (Income): {priorities.income}%
            </label>
            <input
              type="range"
              min={0}
              max={50}
              step={1}
              value={priorities.income}
              onChange={(e) => setPriorities((p) => ({ ...p, income: Number(e.target.value) }))}
              className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
            </div>
          </div>

          {/* Market priority */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <label className="block text-xs font-medium text-slate-700 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
              বাজার (Market): {priorities.market}%
            </label>
            <input
              type="range"
              min={0}
              max={50}
              step={1}
              value={priorities.market}
              onChange={(e) => setPriorities((p) => ({ ...p, market: Number(e.target.value) }))}
              className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature #6 & #7: 3 Rotation Comparison Cards + Evidence Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {rotations.map((rotation) => (
          <div
            key={rotation.id}
            className={`flex flex-col justify-between rounded-2xl bg-white border-2 transition-all shadow-sm overflow-hidden ${
              rotation.isCurrent
                ? "border-slate-300"
                : rotation.id === "water_saving" && waterConstraint === "low"
                  ? "border-green-600 ring-2 ring-green-500/20"
                  : "border-emerald-200"
            }`}
          >
            <div>
              {/* Card Top Banner */}
              <div
                className={`px-4 py-2 text-xs font-bold flex items-center justify-between ${
                  rotation.isCurrent ? "bg-slate-200 text-slate-800" : "bg-emerald-600 text-white"
                }`}
              >
                <span>{rotation.badge}</span>
                {rotation.isCurrent && <span>চলমান (Baseline)</span>}
              </div>

              <div className="p-5 space-y-4">
                {/* Title & Confidence */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900">{rotation.title}</h3>
                  <div>{getConfidenceBadge(rotation.confidence)}</div>
                </div>

                {/* Crop Sequence Pills */}
                <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  {rotation.sequence.map((crop, idx) => (
                    <React.Fragment key={idx}>
                      <span className="text-xs font-semibold px-2.5 py-1 bg-white rounded border border-slate-300 text-slate-800">
                        {crop}
                      </span>
                      {idx < rotation.sequence.length - 1 && (
                        <span className="text-slate-400 font-bold">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Feature #8: 4-Axis Scorecard */}
                <div className="space-y-2 pt-1">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    ৪-অক্ষের স্কোরকার্ড (১০০-তে মূল্যায়ন)
                  </p>
                  {[
                    {
                      label: "মাটির উর্বরতা রক্ষা",
                      val: rotation.scores.soilFertility,
                    },
                    {
                      label: "পানি ও খরা সহনশীলতা",
                      val: rotation.scores.waterResilience,
                    },
                    {
                      label: "ফলনের স্থিতিশীলতা",
                      val: rotation.scores.yieldStability,
                    },
                    {
                      label: "খরচ ও শ্রম সাশ্রয়",
                      val: rotation.scores.costAndLabor,
                    },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium text-slate-700">
                        <span>{item.label}</span>
                        <span className="font-bold">{item.val}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${getScoreColor(item.val)}`}
                          style={{ width: `${item.val}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Feature #4: Weighted Overall Score (user-defined priorities) */}
                <div className="mt-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>সমগ্র ওজনিত স্কোর (Weighted Overall Score)</span>
                    <span className="text-base font-bold text-slate-900">
                      {weightedScore(rotation.scores, priorities)}%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    পানি {priorities.water}% · মাটি {priorities.soil}% · আয় {priorities.income}% ·
                    বাজার {priorities.market}%
                  </p>
                </div>

                {/* Feature #7: Detailed Evidence Card (প্রমাণ-কার্ড) */}
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-2.5 text-xs">
                  <div className="font-bold text-slate-900 border-b border-slate-200 pb-1.5 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-emerald-600" />
                    প্রমাণ-কার্ড (Evidence Card)
                  </div>

                  <div>
                    <span className="font-semibold text-slate-800">কেন এই কৌশল: </span>
                    <span className="text-slate-600">{rotation.evidenceCard.reason}</span>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-800">NASA ও ডেটা প্রমাণ: </span>
                    <span className="text-slate-600">{rotation.evidenceCard.evidence}</span>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-800">প্রধান সুবিধা:</span>
                    <ul className="list-disc list-inside text-slate-600 mt-1 space-y-0.5">
                      {rotation.evidenceCard.benefits.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-2 rounded bg-amber-50/80 border border-amber-200 text-amber-900">
                    <span className="font-semibold flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      তথ্যের ঘাটতি (Data Gaps):
                    </span>
                    <p className="mt-0.5">{rotation.evidenceCard.dataGaps}</p>
                  </div>

                  <div className="p-2 rounded bg-red-50/80 border border-red-200 text-red-900">
                    <span className="font-semibold flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5 text-red-700 shrink-0" />
                      স্থানীয় যাচাইয়ের ঝুঁকি:
                    </span>
                    <p className="mt-0.5">{rotation.evidenceCard.validationRisks}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature #17: Qualitative Market Suitability Footer */}
            <div className="px-5 py-3 bg-slate-100 border-t border-slate-200 text-xs text-slate-700 flex items-start gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900">বাজার উপযোগিতা: </span>
                {rotation.marketSuitability}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RotationComparisonSection;
