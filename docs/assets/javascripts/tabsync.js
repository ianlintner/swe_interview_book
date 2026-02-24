/**
 * Global language tab synchronization.
 *
 * When a user selects a language tab (e.g. Python → TypeScript),
 * every other tabbed code block on the page switches to the same language.
 * The choice is also persisted in localStorage so it survives page navigation.
 */
(function () {
  const STORAGE_KEY = "preferred-code-lang";

  function activateTabByLabel(label) {
    document.querySelectorAll(".tabbed-labels label").forEach(function (el) {
      if (el.textContent.trim() === label) {
        el.click();
      }
    });
  }

  function restorePreference() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      activateTabByLabel(saved);
    }
  }

  function observe() {
    document.addEventListener("click", function (e) {
      var target = e.target.closest(".tabbed-labels label");
      if (!target) return;
      var label = target.textContent.trim();
      localStorage.setItem(STORAGE_KEY, label);
      // Defer so the native tab switch completes first
      setTimeout(function () {
        activateTabByLabel(label);
      }, 0);
    });
  }

  // Run after MkDocs Material finishes rendering tabs
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      restorePreference();
      observe();
    });
  } else {
    restorePreference();
    observe();
  }
})();
