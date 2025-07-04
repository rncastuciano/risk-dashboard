// Filter Storage Keys Documentation

// Updated Filter Persistence Strategy:
// Each page now has TWO separate storage keys for complete filter state management:

// 1. LAST FILTER STATE (auto-persistence):
// - 'actionTracker_lastFilterState' (Action Tracker page)
// - 'metrics_lastFilterState' (Metrics page)
// - 'riskRegister_lastFilterState' (Risk Register page)

// 2. FAVORITE FILTERS (manual save/load):
// - 'actionTracker_favoriteFilter' (Action Tracker favorites)
// - 'metrics_favoriteFilter' (Metrics favorites)
// - 'riskRegister_favoriteFilter' (Risk Register favorites)

// 3. REGULAR FILTER STATE (managed by useGenericFilters):
// - 'filters_actionTracker' (Action Tracker current filters)
// - 'filters_metrics' (Metrics current filters)
// - 'filters_riskRegister' (Risk Register current filters)

// HOW IT WORKS:
// 1. When user applies filters → automatically saved to 'lastFilterState'
// 2. When user clears filters → empty state saved to 'lastFilterState'
// 3. When user switches pages → last filter state is restored when they return
// 4. When user clicks star → saves to 'favoriteFilter' (separate from last state)
// 5. When user clicks star again → loads favorite filters explicitly

// USER EXPERIENCE:
// - Apply filters → Switch pages → Return = Filters exactly as they left them
// - Clear filters → Switch pages → Return = No filters (as they left it)
// - Save favorite → Clear filters → Switch pages → Return = No filters (respects last state)
// - Click star icon → Load favorite filters (explicit action)

// This ensures complete isolation between pages and respects user intent!
