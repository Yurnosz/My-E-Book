document.addEventListener("DOMContentLoaded", function() {
  const backToLastReadButton = document.getElementById("back-to-last-read");
  const pages = document.querySelectorAll('.content > div');

  function saveLastReadPosition() {
    const currentPageId = getCurrentPageId();
    localStorage.setItem("lastReadPosition", currentPageId);
  }

  function backToLastRead() {
    const lastReadPosition = localStorage.getItem("lastReadPosition");

    if (lastReadPosition) {
      const targetPage = document.getElementById(lastReadPosition);
      if (targetPage) {
        targetPage.scrollIntoView();
      }
    }
  }

  function getCurrentPageId() {
    for (const page of pages) {
      if (isPageVisible(page)) {
        return page.id;
      }
    }
    return null;
  }

  function isPageVisible(page) {
    const rect = page.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  for (const page of pages) {
    const nextPageButton = page.querySelector('.next-page');
    const prevPageButton = page.querySelector('.prev-page');

    if (nextPageButton) {
      nextPageButton.addEventListener("click", function() {
        const targetPageId = nextPageButton.getAttribute("data-target");
        const targetPage = document.getElementById(targetPageId);
        if (targetPage) {
          targetPage.scrollIntoView();
          saveLastReadPosition();
        }
      });
    }

    if (prevPageButton) {
      prevPageButton.addEventListener("click", function() {
        const targetPageId = prevPageButton.getAttribute("data-target");
        const targetPage = document.getElementById(targetPageId);
        if (targetPage) {
          targetPage.scrollIntoView();
          saveLastReadPosition();
        }
      });
    }
  }

  const lastReadPosition = localStorage.getItem("lastReadPosition");
  if (lastReadPosition) {
    backToLastReadButton.href = "#";
  }

  // Otomatis kembali ke tempat terakhir kali baca saat halaman dimuat
  setTimeout(function() {
    backToLastRead();
  }, 500);
});