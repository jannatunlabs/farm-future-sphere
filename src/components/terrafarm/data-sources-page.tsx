import { Layers } from "lucide-react";

export const DataSourcesPage = () => {
  return (
    <section className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-8 bg-white rounded-2xl border border-slate-200 my-6 shadow-sm">
      <div className="border-b border-slate-200 pb-3">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-6 h-6 text-indigo-600" />
          Data Sources (NASA Earth Observation Data)
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          AgroMind uses multiple NASA Earth observation datasets, each with different spatial
          resolutions, temporal frequencies, and limitations. The table below summarizes each source
          and how it is used in the application.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl border border-slate-200">
          <thead>
            <tr className="bg-slate-50 text-left text-sm text-slate-600">
              <th className="p-4 border-b border-slate-200">Dataset</th>
              <th className="p-4 border-b border-slate-200">Spatial Resolution</th>
              <th className="p-4 border-b border-slate-200">Temporal Resolution</th>
              <th className="p-4 border-b border-slate-200">Key Variables</th>
              <th className="p-4 border-b border-slate-200">Limitations</th>
              <th className="p-4 border-b border-slate-200">AgroMind Usage</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-sm text-slate-700">
              <td className="p-4 border-b border-slate-100 font-medium">
                SMAP (Soil Moisture Active Passive)
              </td>
              <td className="p-4 border-b border-slate-100">9 km</td>
              <td className="p-4 border-b border-slate-100">2–3 days</td>
              <td className="p-4 border-b border-slate-100">Soil moisture, freeze/thaw state</td>
              <td className="p-4 border-b border-slate-100">
                Coarse resolution limits field-level detail; radio frequency interference possible.
              </td>
              <td className="p-4 border-b border-slate-100">
                Soil moisture input for water resilience scoring; hydrology forecasts
              </td>
            </tr>
            <tr className="odd:bg-slate-50 text-sm text-slate-700">
              <td className="p-4 border-b border-slate-100 font-medium">
                GPM (Global Precipitation Measurement)
              </td>
              <td className="p-4 border-b border-slate-100">10 km</td>
              <td className="p-4 border-b border-slate-100">3-hourly</td>
              <td className="p-4 border-b border-slate-100">Rainfall rate, precipitation type</td>
              <td className="p-4 border-b border-slate-100">
                Over land underestimation in mountainous regions; gauges needed for calibration.
              </td>
              <td className="p-4 border-b border-slate-100">
                Rainfall change slider input; drought/flood risk assessment
              </td>
            </tr>
            <tr className="text-sm text-slate-700 odd:bg-slate-50">
              <td className="p-4 border-b border-slate-100 font-medium">
                POWER (Prediction of Worldwide Energy Resources)
              </td>
              <td className="p-4 border-b border-slate-100">~100 km</td>
              <td className="p-4 border-b border-slate-100">Daily/Monthly</td>
              <td className="p-4 border-b border-slate-100">
                Surface temperature, solar radiation, wind speed
              </td>
              <td className="p-4 border-b border-slate-100">
                Very coarse; good for broad climate trends but not field-scale detail.
              </td>
              <td className="p-4 border-b border-slate-100">
                Temperature & rainfall shift baselines; long-term climate adaptation planning
              </td>
            </tr>
            <tr className="odd:bg-slate-50 text-sm text-slate-700">
              <td className="p-4 border-b border-slate-100 font-medium">
                MODIS (Moderate Resolution Imaging Spectroradiometer)
              </td>
              <td className="p-4 border-b border-slate-100">250 m – 1 km</td>
              <td className="p-4 border-b border-slate-100">8-day composite</td>
              <td className="p-4 border-b border-slate-100">
                NDVI, EVI, land surface temperature, albedo
              </td>
              <td className="p-4 border-b border-slate-100">
                Cloud cover interference; 8-day revisit may miss short-duration events.
              </td>
              <td className="p-4 border-b border-slate-100">
                Seasonal NDVI curve; vegetation health scoring across 12 months
              </td>
            </tr>
            <tr className="text-sm text-slate-700 odd:bg-slate-50">
              <td className="p-4 border-b border-slate-100 font-medium">Landsat 8/9</td>
              <td className="p-4 border-b border-slate-100">30 m</td>
              <td className="p-4 border-b border-slate-100">16-day revisit</td>
              <td className="p-4 border-b border-slate-100">
                Surface reflectance, vegetation indices, soil moisture
              </td>
              <td className="p-4 border-b border-slate-100">
                Great detail but limited temporal coverage; cloud contamination requires
                compositing.
              </td>
              <td className="p-4 border-b border-slate-100">
                High-resolution reference; specific field boundary mapping when needed
              </td>
            </tr>
            <tr className="odd:bg-slate-50 text-sm text-slate-700">
              <td className="p-4 border-b border-slate-100 font-medium">
                GRACE (Gravity Recovery and Climate Experiment)
              </td>
              <td className="p-4 border-b border-slate-100">~200–300 km (mascon)</td>
              <td className="p-4 border-b border-slate-100">Monthly</td>
              <td className="p-4 border-b border-slate-100">Total Terrestrial Water Storage</td>
              <td className="p-4 border-b border-slate-100">
                Very coarse; measures total water storage change, not liquid water or soil moisture
                directly.
              </td>
              <td className="p-4 border-b border-slate-100">
                Groundwater depletion trends; long-term basin-scale hydrology context
              </td>
            </tr>
            <tr className="text-sm text-slate-700 odd:bg-slate-50">
              <td className="p-4 border-b border-slate-100 font-medium">
                SRTM (Shuttle Radar Topography Mission)
              </td>
              <td className="p-4 border-b border-slate-100">30 m</td>
              <td className="p-4 border-b border-slate-100">Single-pass (2000)</td>
              <td className="p-4 border-b border-slate-100">Elevation, terrain slope, aspect</td>
              <td className="p-4 border-b border-slate-100">
                No vegetation-penetrating data; terrain-derived products only (e.g., slope, aspect).
              </td>
              <td className="p-4 border-b border-slate-100">
                Elevation layers for risk mapping; drainage analysis; flood susceptibility
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
        <h3 className="text-base font-bold text-slate-900 mb-3">Data Harmonization</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          These datasets vary in spatial resolution (30 m Landsat to 200+ km GRACE), temporal
          frequency (daily GPM to monthly GRACE), and measured variables. To combine them into
          meaningful agroclimatic insights, AgroMind applies the following harmonization strategy:
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-2">
          <li>
            <strong>Downscaling:</strong> SMAP (9 km) and POWER (50 km) data are bilinearly
            interpolated and combined with SRTM elevation data to generate local-scale estimates.
          </li>
          <li>
            <strong>Upscaling & masking:</strong> Landsat (30 m) and MODIS (250 m–1 km) pixel values
            are aggregated within cropland masks to produce consistent 1 km evaluation grid
            averages.
          </li>
          <li>
            <strong>Ground calibration:</strong> Satellite grid averages are calibrated against
            optional farmer-provided local soil test data (pH, N, P, K) to produce final confidence
            scores.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default DataSourcesPage;
