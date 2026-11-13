# Datasets and Data Sources Used in AgroMind

AgroMind combines NASA Earth-observation datasets with local and
external agricultural, geographic, weather, soil, and water information.
The tables below document the sources and their intended roles in the
project.

**Important:** A dataset's inclusion in this reference list does not by
itself mean that it has already been integrated into the current
prototype. Some sources may be optional, supporting, or intended for
later development. Availability, spatial resolution, time coverage, and
suitability should be checked before operational use.

## 1. NASA Earth Observation and Scientific Datasets

  --------------------------------------------------------------------------------------------------------------
  Dataset                 Source                                                      Intended use in AgroMind
  ----------------------- ----------------------------------------------------------- --------------------------
  **NASA POWER**          [power.larc.nasa.gov](https://power.larc.nasa.gov/)         Historical temperature,
                                                                                      rainfall, humidity, solar
                                                                                      radiation, and land-memory
                                                                                      analysis.

  **GPM IMERG**           [NASA Earthdata --                                          Rainfall monitoring,
                          GPM](https://www.earthdata.nasa.gov/data/instruments/gpm)   extreme rainfall analysis,
                                                                                      water budgeting, and
                                                                                      flood-risk assessment.

  **MODIS NDVI/EVI**      [NASA LP DAAC](https://lpdaac.usgs.gov/)                    Vegetation indicators,
                                                                                      seasonal crop-growth
                                                                                      patterns, and fallow-land
                                                                                      detection.

  **SRTM / NASADEM**      [NASA Earthdata](https://www.earthdata.nasa.gov/)           Land elevation and Haor
                                                                                      flood-risk assessment.

  **MODIS LST**           [NASA LP DAAC](https://lpdaac.usgs.gov/)                    Land-surface temperature
                                                                                      and heat-stress analysis.

  **MODIS ET (MOD16)**    [NASA LP DAAC](https://lpdaac.usgs.gov/)                    Evapotranspiration and
                                                                                      crop water-consumption
                                                                                      estimation.

  **MODIS Land Cover      [NASA LP DAAC](https://lpdaac.usgs.gov/)                    Identification of
  (MCD12Q1)**                                                                         agricultural land,
                                                                                      forests, and water bodies.

  **MODIS/VIIRS Flood     [NASA Earthdata](https://www.earthdata.nasa.gov/)           Historical floodwater
  Water Map (MCDWD)**                                                                 mapping and flood-risk
                                                                                      assessment.

  **GLDAS / FLDAS**       [NASA Earthdata](https://www.earthdata.nasa.gov/)           Soil-moisture and
                                                                                      evapotranspiration
                                                                                      estimation.

  **SMAP (L3, L4)**       [NASA Earthdata](https://www.earthdata.nasa.gov/)           Regional soil-moisture
                                                                                      estimation and
                                                                                      water-availability
                                                                                      context.

  **NEX-GDDP-CMIP6**      [NASA NCCS](https://www.nccs.nasa.gov/)                     Future climate projections
                                                                                      and rainfall/temperature
                                                                                      trends.

  **Landsat / HLS**       [NASA Harmonized Landsat                                    Higher-resolution
                          Sentinel-2](https://hls.gsfc.nasa.gov/)                     vegetation monitoring and
                                                                                      land observation.

  **MODIS LAI / GPP**     [NASA LP DAAC](https://lpdaac.usgs.gov/)                    Leaf-area,
                                                                                      vegetation-productivity,
                                                                                      and crop-growth analysis.

  **OPERA DSWx**          [NASA/JPL OPERA](https://www.jpl.nasa.gov/go/opera)         Surface-water mapping and
                                                                                      flood monitoring.

  **MERRA-2**             [NASA GES DISC](https://disc.gsfc.nasa.gov/)                Historical global weather
                                                                                      and climate reanalysis.

  **GPM IMERG             [NASA Earthdata --                                          Near-real-time rainfall
  Early/Late**            GPM](https://www.earthdata.nasa.gov/data/instruments/gpm)   monitoring.

  **GFSAD**               [NASA LP DAAC](https://lpdaac.usgs.gov/)                    Agricultural-land mapping.

  **GRACE / GRACE-FO**    [NASA/JPL GRACE](https://grace.jpl.nasa.gov/)               Regional
                                                                                      groundwater-storage
                                                                                      trends.

  **NISAR**               [NASA/JPL NISAR](https://nisar.jpl.nasa.gov/)               Radar-based land and water
                                                                                      monitoring.

  **ECOSTRESS**           [NASA ECOSTRESS](https://ecostress.jpl.nasa.gov/)           Plant and land
                                                                                      temperature-stress
                                                                                      research.

  **GEDI**                [GEDI Mission](https://gedi.umd.edu/)                       Vegetation height and
                                                                                      ecosystem-structure
                                                                                      research.
  --------------------------------------------------------------------------------------------------------------

## 2. Local and External Data Sources

  -----------------------------------------------------------------------------------------------------
  Dataset / Source        Source link                                           Intended use in
                                                                                AgroMind
  ----------------------- ----------------------------------------------------- -----------------------
  **OpenStreetMap**       [openstreetmap.org](https://www.openstreetmap.org/)   Land identification,
                                                                                mapping, and location
                                                                                selection.

  **GADM**                [gadm.org](https://gadm.org/)                         Administrative
                                                                                boundaries and
                                                                                geographic
                                                                                identification.

  **BBS -- Bangladesh     [bbs.gov.bd](https://bbs.gov.bd/)                     Agricultural
  Bureau of Statistics**                                                        statistics,
                                                                                administrative
                                                                                information, and
                                                                                crop-production data.

  **BMD -- Bangladesh     [bmd.gov.bd](https://bmd.gov.bd/)                     Local rainfall and
  Meteorological                                                                weather data for
  Department**                                                                  validating NASA data.

  **DAE -- Department of  [dae.gov.bd](https://dae.gov.bd/)                     Local crop calendars,
  Agricultural                                                                  farming practices, and
  Extension**                                                                   agricultural
                                                                                recommendations.

  **BRRI -- Bangladesh    [brri.gov.bd](https://brri.gov.bd/)                   Rice varieties, crop
  Rice Research                                                                 duration, water
  Institute**                                                                   requirements, and
                                                                                flood-tolerant
                                                                                varieties.

  **BARI -- Bangladesh    [bari.gov.bd](https://bari.gov.bd/)                   Alternative crop
  Agricultural Research                                                         varieties, crop
  Institute**                                                                   rotation, and crop
                                                                                recommendations.

  **SRDI -- Soil Resource [srdi.gov.bd](https://srdi.gov.bd/)                   Soil properties,
  Development Institute**                                                       salinity maps, soil
                                                                                fertility, and soil pH.

  **Farmer Soil Test**    Local farmer / soil-testing laboratory                Field-level soil
                                                                                electrical conductivity
                                                                                (EC), pH, salinity, and
                                                                                nutrient information.

  **SoilGrids**           [soilgrids.org](https://soilgrids.org/)               Estimated soil type,
                                                                                organic matter, pH, and
                                                                                other soil properties.

  **BWDB -- Bangladesh    [bwdb.gov.bd](https://www.bwdb.gov.bd/)               River water levels,
  Water Development                                                             water availability, and
  Board**                                                                       flood information.

  **FFWC -- Flood         [ffwc.gov.bd](https://ffwc.gov.bd/)                   Flood forecasting,
  Forecasting and Warning                                                       river levels, and
  Centre**                                                                      flood-risk assessment.

  **FAO-56**              [FAO](https://www.fao.org/)                           Crop-water
                                                                                requirements,
                                                                                evapotranspiration, and
                                                                                crop coefficient (Kc)
                                                                                guidance.

  **FAO EcoCrop**         [FAO](https://www.fao.org/)                           Crop suitability,
                                                                                environmental
                                                                                requirements, and
                                                                                crop-selection
                                                                                information.

  **DAM -- Department of  [dam.gov.bd](https://dam.gov.bd/)                     Agricultural market
  Agricultural                                                                  demand and qualitative
  Marketing**                                                                   market information.
  -----------------------------------------------------------------------------------------------------

## 3. How the Data Supports AgroMind

-   **Land memory:** Historical weather and vegetation observations help
    describe seasonal conditions and identify periods when land may be
    fallow.
-   **Water budget:** Rainfall, evapotranspiration, soil-moisture
    context, and crop-water requirements support comparisons of crop
    water needs.
-   **Haor Clock:** Elevation, rainfall, floodwater records, river
    levels, and local crop calendars support assessment of potential
    flash-flood exposure.
-   **Salinity Shield:** Soil-test results and SRDI information support
    assessment of soil salinity and crop suitability.
-   **Crop-rotation comparison:** Crop calendars, crop characteristics,
    water requirements, and local agricultural guidance help evaluate
    alternative rotations.

## 4. Data Limitations and Responsible Use

-   Satellite and model datasets have different spatial resolutions,
    time coverage, update schedules, and uncertainty.
-   Satellite-derived vegetation indices indicate vegetation conditions;
    they do not directly prove that a crop is healthy or identify every
    crop type.
-   NASA datasets do not directly measure field-level soil salinity or
    soil nutrients. Soil tests and relevant local sources are needed for
    those assessments.
-   Broad regional datasets, including some soil-moisture products,
    should not be presented as precise measurements of an individual
    small field.
-   Flood-risk assessment is not the same as a guaranteed flood
    prediction.
-   Future climate datasets provide projections or scenarios, not
    certain weather forecasts.
-   Data sources should be validated and cited before being used to
    generate operational recommendations.

AgroMind is intended as a decision-support tool. Its outputs should be
considered alongside farmer knowledge and advice from local agricultural
experts.
