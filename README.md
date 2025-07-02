# Risk Dashboard Web App

This project is a **React + Vite** web application for managing and visualising enterprise risk, metrics, and action tracking. It is designed for the Risk Team at Flagstone and provides dashboards, registers, and summaries using mock data for rapid prototyping and development.

---

## Features

- **Enterprise Risk Overview:** Aggregated risk posture, radar charts, and monthly trends.
- **Risk Register:** Hierarchical risk register with filtering, expansion, and department/category breakdowns.
- **Metrics Dashboard:** Tolerance monitoring, summary cards, and hierarchical metric tables.
- **Action Tracker:** Track incidents, issues, and risk actions with filtering and summary views.
- **Favorites & Filters:** Save, load, and clear favorite filter sets for quick access.
- **Mock Data Driven:** All dashboards use mock data for development and demonstration.

---

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [ESLint](https://eslint.org/)

---

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Run the development server:**
   ```sh
   npm run dev
   ```

3. **Open your browser:**  
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## Project Structure

```
src/
  components/         # Shared and page-specific React components
  data/               # Mock data for risks, metrics, trends, action tracker, etc.
  hooks/              # Custom React hooks (filters, expansion, etc.)
  pages/              # Main page components (RiskOverview, RiskRegister, Metrics, ActionTracker)
  config/             # Filter and table configuration files
  App.tsx             # Main app entry
  main.tsx            # Vite entry point
```

---

## Customization

- **Mock Data:**  
  Update or extend the mock data in `src/data/` to reflect your organization's risks, metrics, and actions.
- **Filters & Tables:**  
  Adjust filter configs in `src/config/` and table columns/components as needed.

---

## Notes

- This project is for internal prototyping and demonstration.  
- No real backend or authentication is included; all data is local and mock-based.
- For production, connect to your real data sources and add authentication as needed.

---

## License

This project is for internal use at Flagstone.  
Contact the Risk Team