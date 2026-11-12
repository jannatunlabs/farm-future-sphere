import React, { useState } from "react";
import {
  Sliders,
  CloudRain,
  Thermometer,
  Activity,
  Layers,
  AlertCircle,
  CheckCircle,
  Sun,
  Droplets,
  TrendingUp,
} from "lucide-react";
import { waterForecast, waterStressTrend } from "./terrafarm/data";

interface MonthNdvi {
  month: string;
  ndvi: number;
  status: "good" | "stress" | "bare";
  crop: string;
  note: string;
}

const seasonalNdviData: MonthNdvi[] = [
  { month: "জানু", ndvi: 0.65, status: "good", crop: "বোরো/সরিষা", note: "সতেজ বৃদ্ধি" },
  { month: "ফেব্রু", ndvi: 0.72, status: "good", crop: "বোরো/সরিষা", note: "সর্বোচ্চ সবুজায়ন" },
  {
    month: "মার্চ",
    ndvi: 0.42,
    status: "stress",
    crop: "বোরো/মুগ",
    note: "তাপ ও পানির চাপ (Water Stress)",
  },
  {
    month: "এপ্রিল",
    ndvi: 0.35,
    status: "stress",
    crop: "খরিফ-১",
    note: "খরা ও উচ্চ তাপমাত্রায় ফসল দুর্বল",
  },
  {
    month: "মে",
    ndvi: 0.18,
    status: "bare",
    crop: "খালি জমি",
    note: "ফসল কাটার পর পতিত/খালি জমি (Bare-field)",
  },
  {
    month: "জুন",
    ndvi: 0.22,
    status: "bare",
    crop: "বীজতলা/প্রস্তুতি",
    note: "আমন রোপণের পূর্ববর্তী খালি সময়",
  },
  {
    month: "জুলাই",
    ndvi: 0.55,
    status: "good",
    crop: "আমন ধান",
    note: "বর্ষার পানিতে দ্রুত বৃদ্ধি",
  },
  { month: "আগস্ট", ndvi: 0.78, status: "good", crop: "আমন ধান", note: "সর্বোচ্চ NDVI মান" },
  { month: "সেপ্টে", ndvi: 0.74, status: "good", crop: "আমন ধান", note: "স্থিতিশীল বৃদ্ধি" },
  {
    month: "অক্টো",
    ndvi: 0.48,
    status: "stress",
    crop: "আমন (পাকার সময়)",
    note: "মৌসুমি বৃষ্টি কমে যাওয়ার চাপ",
  },
  {
    month: "নভে",
    ndvi: 0.2,
    status: "bare",
    crop: "খালি জমি",
    note: "আমন কাটার পর জমি খালি (Bare-field)",
  },
  {
    month: "ডিসে",
    ndvi: 0.45,
    status: "good",
    crop: "রবি ফসল শুরু",
    note: "নতুন চারা গজানোর পর্যায়",
  },
];

export const ScenarioAndNdviSection: React.FC = () => {
  // Feature #11: Scenario Lab Sliders State
  const [rainfallChange, setRainfallChange] = useState<number>(-15); // % change (-40% to +40%)
  const [tempChange, setTempChange] = useState<number>(1.5); // °C change (0°C to +4°C)

  // Calculate impact based on sliders
  const waterStressRisk = Math.min(
    100,
    Math.max(10, Math.round(40 - rainfallChange * 0.8 + tempChange * 12)),
  );
  const boroYieldImpact = Math.round(rainfallChange * 0.3 - tempChange * 8);
  const diversifiedYieldImpact = Math.round(rainfallChange * 0.12 - tempChange * 3.5);

  return (
    <section className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-8 bg-white rounded-2xl border border-slate-200 my-6 shadow-sm">
      {/* Feature #11: Scenario Slider (Future Simulation / Scenario Lab) */}
      <div className="space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="w-6 h-6 text-indigo-600" />
            Future Simulation / Scenario Lab (বৃষ্টি ও তাপমাত্রা স্লাইডার)
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            ভবিষ্যতে বৃষ্টিপাত বা তাপমাত্রা বদলালে আপনার চলমান ও বিকল্প ফসল চক্রের ওপর কী প্রভাব
            পড়বে তা স্লাইডার সরিয়ে দেখুন (NEX-GDDP-CMIP6 মডেল ভিত্তিক)।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-slate-50 p-5 rounded-xl border border-slate-200">
          {/* Sliders Control */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <div className="flex justify-between text-sm font-semibold text-slate-800 mb-2">
                <span className="flex items-center gap-1.5">
                  <CloudRain className="w-4 h-4 text-blue-600" />
                  বৃষ্টিপাতের পরিবর্তন (Rainfall Change):
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-bold ${
                    rainfallChange < 0 ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {rainfallChange > 0 ? `+${rainfallChange}%` : `${rainfallChange}%`}
                </span>
              </div>
              <input
                type="range"
                min={-40}
                max={40}
                step={5}
                value={rainfallChange}
                onChange={(e) => setRainfallChange(Number(e.target.value))}
                className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>-৪০% (তীব্র খরা)</span>
                <span>০% (স্বাভাবিক)</span>
                <span>+৪০% (অতিবৃষ্টি)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-semibold text-slate-800 mb-2">
                <span className="flex items-center gap-1.5">
                  <Thermometer className="w-4 h-4 text-red-600" />
                  গড় তাপমাত্রা বৃদ্ধি (Temperature Shift):
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-800">
                  +{tempChange.toFixed(1)}°C
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={4}
                step={0.5}
                value={tempChange}
                onChange={(e) => setTempChange(Number(e.target.value))}
                className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>+০.০°C (বর্তমান)</span>
                <span>+২.০°C (মাঝারি উষ্ণায়ন)</span>
                <span>+৪.০°C (চরম উষ্ণায়ন)</span>
              </div>
            </div>
          </div>

          {/* Simulation Output */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-medium">পানির ঘাটতি ঝুঁকি</p>
              <p
                className={`text-2xl font-bold mt-1 ${
                  waterStressRisk >= 65
                    ? "text-red-600"
                    : waterStressRisk >= 40
                      ? "text-amber-600"
                      : "text-green-600"
                }`}
              >
                {waterStressRisk}%
              </p>
              <p className="text-[11px] text-slate-600 mt-1">
                {waterStressRisk >= 65
                  ? "উচ্চ ঝুঁকি: গভীর নলকূপের ওপর তীব্র চাপ"
                  : "সহনীয় পর্যায়ের পানির চাপ"}
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-medium">চলমান (বোরো-আমন) ফলন প্রভাব</p>
              <p
                className={`text-2xl font-bold mt-1 ${
                  boroYieldImpact < -10 ? "text-red-600" : "text-amber-600"
                }`}
              >
                {boroYieldImpact > 0 ? `+${boroYieldImpact}%` : `${boroYieldImpact}%`}
              </p>
              <p className="text-[11px] text-slate-600 mt-1">তাপমাত্রা ও সেচ সংকটে ফলন হ্রাস</p>
            </div>

            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm">
              <p className="text-xs text-emerald-800 font-semibold">
                বিকল্প (সরিষা-মুগ-আমন) প্রভাব
              </p>
              <p className="text-2xl font-bold text-emerald-700 mt-1">
                {diversifiedYieldImpact > 0
                  ? `+${diversifiedYieldImpact}%`
                  : `${diversifiedYieldImpact}%`}
              </p>
              <p className="text-[11px] text-emerald-800 mt-1">খরা-সহনশীল হওয়ায় ক্ষতি অনেক কম</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature #10: Seasonal NDVI Curve (Bare-field & Weak Crop Periods) */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-6 h-6 text-emerald-600" />
              NDVI মৌসুমি রেখা: জমি খালি থাকা (Bare-field) ও ফসলের চাপের সময়
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              MODIS ও Landsat NDVI বিশ্লেষণ থেকে বছরের কোন সময়ে জমি খালি থাকে এবং কখন ফসল পানির
              অভাবে দুর্বল থাকে তা চিহ্নিত করা হয়েছে।
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-medium">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-100 text-emerald-800">
              <CheckCircle className="w-3.5 h-3.5" /> সুস্থ ফসল (NDVI &gt; 0.5)
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-100 text-amber-800">
              <Sun className="w-3.5 h-3.5" /> ফসল দুর্বল / পানির চাপ
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-red-100 text-red-800">
              <AlertCircle className="w-3.5 h-3.5" /> জমি খালি (Bare-field)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2.5 pt-2">
          {seasonalNdviData.map((item, idx) => {
            const barColor =
              item.status === "good"
                ? "bg-emerald-500 border-emerald-600"
                : item.status === "stress"
                  ? "bg-amber-500 border-amber-600"
                  : "bg-red-400 border-red-500";
            const cardBg =
              item.status === "good"
                ? "bg-emerald-50/50 border-emerald-200"
                : item.status === "stress"
                  ? "bg-amber-50/70 border-amber-300"
                  : "bg-red-50/70 border-red-300";

            return (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border flex flex-col justify-between ${cardBg}`}
              >
                <div className="text-center">
                  <span className="text-xs font-bold text-slate-800">{item.month}</span>
                  <p className="text-[10px] text-slate-500 font-medium truncate">{item.crop}</p>
                </div>

                {/* Vertical Bar */}
                <div className="h-24 w-full flex items-end justify-center my-2 bg-white/80 rounded-lg p-1.5 border border-slate-200/60">
                  <div
                    className={`w-full rounded-t transition-all border-t-2 ${barColor}`}
                    style={{ height: `${Math.round(item.ndvi * 100)}%` }}
                  />
                </div>

                <div className="text-center space-y-0.5">
                  <span className="text-xs font-extrabold text-slate-900">{item.ndvi}</span>
                  <p className="text-[10px] leading-tight text-slate-700">{item.note}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature #14: Harmonizing Different Resolution NASA Data into a Common Grid */}
      <div className="pt-4 border-t border-slate-200">
        <div className="bg-slate-900 text-slate-100 rounded-xl p-5 space-y-3">
          <h3 className="text-base font-bold flex items-center gap-2 text-emerald-400">
            <Layers className="w-5 h-5" />
            পদ্ধতিগত ব্যাখ্যা: ভিন্ন রেজোলিউশনের NASA ডেটা কীভাবে এক Grid-এ মেলানো হয়েছে? (Data
            Harmonization)
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            NASA-র বিভিন্ন স্যাটেলাইট সেন্সরের ফুটের মাপ (Spatial Resolution) ভিন্ন। যেমন:{" "}
            <strong>Landsat 8/9 (৩০ মিটার)</strong>,{" "}
            <strong>SRTM Digital Elevation (৩০ মিটার)</strong>,{" "}
            <strong>MODIS NDVI (২৫০ মিটার)</strong>, <strong>SMAP Soil Moisture (৯ কিমি)</strong>,{" "}
            <strong>GPM Rainfall (১০ কিমি)</strong> এবং <strong>NASA POWER (১০০ কিমি)</strong>। এই
            সব ডেটাকে কৃষকের জমির সিদ্ধান্তে ব্যবহারের জন্য একটি{" "}
            <strong>
              সাধারণ ১ কিমি × ১ কিমি অ্যাগ্রো-ইকোলজিক্যাল গ্রিডে (Common Evaluation Grid)
            </strong>{" "}
            রূপান্তর করা হয়েছে:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
            <div className="bg-slate-800/90 p-3 rounded-lg border border-slate-700">
              <strong className="text-white block mb-1">
                ১. ডাউনস্কেলিং (Bilinear Interpolation):
              </strong>
              SMAP (৯ কিমি) ও POWER (৫০ কিমি)-এর মতো বড় গ্রিডের আবহাওয়া ও মাটির আর্দ্রতার ডেটাকে
              Bilinear Interpolation ও SRTM উচ্চতা ডেটার সাহায্যে স্থানীয় গ্রিডে নামিয়ে আনা হয়।
            </div>
            <div className="bg-slate-800/90 p-3 rounded-lg border border-slate-700">
              <strong className="text-white block mb-1">
                ২. আপস্কেলিং ও মাস্কিং (Spatial Aggregation):
              </strong>
              Landsat (৩০ মিটার) ও MODIS (২৫০ মিটার) থেকে শুধু ফসলি জমির পিক্সেলগুলো (Cropland Mask)
              আলাদা করে মেঘমুক্ত ৮-দিনের কম্পোজিট গড় তৈরি করা হয়।
            </div>
            <div className="bg-slate-800/90 p-3 rounded-lg border border-slate-700">
              <strong className="text-white block mb-1">
                ৩. স্থানীয় মাটি পরীক্ষার সমন্বয় (Ground Calibration):
              </strong>
              স্যাটেলাইট গ্রিডের গড় মানের সাথে কৃষকের দেওয়া স্থানীয় মাটি পরীক্ষার (pH, N, P, K) মান
              মিলিয়ে চূড়ান্ত স্কোর ও নির্ভরযোগ্যতা (Confidence Level) নির্ধারণ করা হয়।
            </div>
          </div>
        </div>
      </div>

      {/* Feature #9: Dual Water Forecast (Present vs NEX-GDDP-CMIP6 Future) */}
      <div className="pt-4 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Droplets className="w-6 h-6 text-blue-600" />
              দ্বৈত পানির পূর্ভাভাস (Dual Water Forecast): বর্তমান বনাম ভবিষ্যৎ
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              বর্তমান পরিস্থিতির সাথে NEX-GDDP-CMIP6 জলবায়ু মডেলের ভবিষ্যৎ পূর্ভাভাসের তুলনা করুন।
              পরিসর (Range) অনিশ্চয়তাকে তুলে ধরে।
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {waterForecast.map((wf, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-slate-900 text-sm">{wf.period}</h4>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {wf.unit}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">সর্বনিম্ন (Low)</span>
                  <span className="font-bold text-red-600">{wf.low}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">মাঝারি (Medium)</span>
                  <span className="font-bold text-amber-600">{wf.medium}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">সর্বোচ্চ (High)</span>
                  <span className="font-bold text-green-600">{wf.high}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100">
                <p className="text-[11px] text-slate-600 leading-relaxed">{wf.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-amber-600" />
            মৌসুমজুড়ে water-stress নজরদারি (Seasonal Water-Stress Monitoring)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {waterStressTrend.map((st, idx) => (
              <div key={idx} className="rounded-lg bg-slate-50 border border-slate-200 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">{st.period}</span>
                  <span
                    className={`text-lg font-bold ${
                      st.stress >= 40
                        ? "text-red-600"
                        : st.stress >= 25
                          ? "text-amber-600"
                          : "text-green-600"
                    }`}
                  >
                    {st.stress}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full mt-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      st.stress >= 40
                        ? "bg-red-500"
                        : st.stress >= 25
                          ? "bg-amber-500"
                          : "bg-green-500"
                    }`}
                    style={{ width: `${st.stress}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  ফসলের বৃদ্ধি মৌসুমে পানির চাপের অবস্থা
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScenarioAndNdviSection;
