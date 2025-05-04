# Weather Data Viewer

This is a simple Angular application developed as part of a technical test. It allows users to search for an address, retrieve geographic coordinates using a geocoding API, and display historical weather data (temperature, humidity, wind) in chart format.

## Main Features

- Address autocomplete with real-time suggestions
- Automatic retrieval of latitude and longitude using the OpenCage Geocoding API
- Three weather charts:
  - Daily average temperature
  - Humidity
  - Wind speed
- Option to download weather data in JSON format

## Technologies Used

- Angular 17 (standalone components)
- Tailwind CSS (responsive layout)
- PrimeNG (UI components)
- Highcharts (dynamic chart rendering)
- RxJS (reactive data handling)
- OpenCage Geocoding API
- Open-Meteo Historical API

## Project Structure

- `src/core/models` – TypeScript models for API responses and UI ViewModels
- `src/core/services` – Services handling application state and HTTP calls (geocoding and weather)
- `src/core/view-model-services` – Services that convert raw API data into UI-ready ViewModels
- `src/components` – Standalone components (address form, weather display)
- `src/utils/chart` – Highcharts wrapper component with custom configuration

## Notes

- The application uses external APIs (OpenCage, Open-Meteo) and requires an internet connection to function.
- The OpenCage API key is currently hardcoded for simplicity. In a production setup, it should be placed in an environment variable or configuration file.
- The layout is built with TailwindCSS, and components like the autocomplete and calendar are provided by PrimeNG.


## How to Run the Project

1. Clone the repository or copy the project locally
2. Open a terminal in the project root folder
3. Run the following commands:

```bash
npm install
ng serve

