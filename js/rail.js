/* ============================================================
   More Work — peek rail
   手動控制、不自動輪播、到底停住不循環。
   四種操作方式：左右箭頭鈕、觸控板橫向滑動、滑鼠拖曳、鍵盤方向鍵。
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  var track = document.querySelector('.rail-track');
  var viewport = document.querySelector('.rail-viewport');
  if (!track || !viewport) return;

  var slides = Array.prototype.slice.call(track.querySelectorAll('.rail-slide'));
  if (!slides.length) return;

  var prev  = document.querySelector('[data-rail="prev"]');
  var next  = document.querySelector('[data-rail="next"]');
  var count = document.querySelector('.rail-count');
  var bar   = document.querySelector('.rail-bar i');
  var i = 0;

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function step() {
    var g = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
    return slides[0].getBoundingClientRect().width + g;
  }

  function render(offset) {
    var x = i * step() - (offset || 0);
    track.style.transform = 'translateX(' + (-x) + 'px)';

    if (offset) return;                        // 拖曳中不更新指示器
    if (count) count.textContent = pad(i + 1) + ' / ' + pad(slides.length);
    if (bar)   bar.style.transform = 'scaleX(' + ((i + 1) / slides.length) + ')';
    if (prev)  prev.disabled = (i === 0);
    if (next)  next.disabled = (i === slides.length - 1);

    slides.forEach(function (s, k) {
      s.setAttribute('aria-hidden', k !== i);
      s.querySelectorAll('a, button, video').forEach(function (el) {
        if (k === i) el.removeAttribute('tabindex');
        else el.setAttribute('tabindex', '-1');
      });
    });
  }

  function go(n) {
    i = Math.max(0, Math.min(slides.length - 1, n));
    render();
  }

  if (prev) prev.addEventListener('click', function () { go(i - 1); });
  if (next) next.addEventListener('click', function () { go(i + 1); });

  /* ---------- 鍵盤 ---------- */
  viewport.setAttribute('tabindex', '0');
  viewport.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); go(i - 1); }
  });

  /* ---------- 觸控板橫向滑動 ----------
     累積 deltaX，超過門檻才換一張，換完鎖 500ms，
     不然一個手勢會一路滑到底。 */
  var acc = 0, lock = false, wheelTimer;
  viewport.addEventListener('wheel', function (e) {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;   // 縱向捲動就放手
    e.preventDefault();
    if (lock) return;

    acc += e.deltaX;
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(function () { acc = 0; }, 180);

    if (Math.abs(acc) > 60) {
      go(acc > 0 ? i + 1 : i - 1);
      acc = 0;
      lock = true;
      setTimeout(function () { lock = false; }, 500);
    }
  }, { passive: false });

  /* ---------- 滑鼠拖曳 ---------- */
  var dragging = false, startX = 0, moved = 0;

  viewport.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'touch') return;      // 觸控走下面的 touch handler
    if (e.target.closest('a, button')) return;  // 讓連結還能點
    dragging = true; startX = e.clientX; moved = 0;
    viewport.classList.add('is-dragging');
    viewport.setPointerCapture(e.pointerId);
  });

  viewport.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    moved = e.clientX - startX;
    render(moved);
  });

  function endDrag() {
    if (!dragging) return;
    dragging = false;
    viewport.classList.remove('is-dragging');
    if (Math.abs(moved) > step() * 0.18) go(moved < 0 ? i + 1 : i - 1);
    else render();
    moved = 0;
  }
  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);
  viewport.addEventListener('pointerleave', endDrag);

  /* ---------- 手機觸控 ----------
     先判斷方向，橫向才攔截，不然會跟頁面垂直捲動打架 */
  var x0 = null, y0 = null, axis = null;

  viewport.addEventListener('touchstart', function (e) {
    x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; axis = null;
  }, { passive: true });

  viewport.addEventListener('touchmove', function (e) {
    if (x0 === null) return;
    var dx = e.touches[0].clientX - x0, dy = e.touches[0].clientY - y0;
    if (axis === null) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
    }
    if (axis === 'x') { e.preventDefault(); render(dx); }
  }, { passive: false });

  viewport.addEventListener('touchend', function (e) {
    if (x0 !== null && axis === 'x') {
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) go(dx < 0 ? i + 1 : i - 1);
      else render();
    }
    x0 = y0 = axis = null;
  }, { passive: true });

  var t;
  window.addEventListener('resize', function () {
    clearTimeout(t); t = setTimeout(function () { render(); }, 120);
  });

  render();
});
