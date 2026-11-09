.board-card:hover {
  border-color: var(--primary, #162D77);
}

/* ───────── نافذة التفاصيل: تتفتح زي صفحة كتاب ───────── */
.leader-backdrop {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(6, 14, 40, .72);
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  padding: 16px;
  animation: leaderFade .35s ease both;
}
.leader-backdrop.is-closing { animation: leaderFadeOut .38s ease both; }

.leader-book { perspective: 2200px; width: min(1100px, 100%); }

.leader-page {
  position: relative;
  max-height: 92vh; overflow-y: auto;
  border-radius: 22px;
  color: #fff;
  background:
    radial-gradient(900px 500px at 85% -10%, rgba(255,255,255,.12), transparent 60%),
    linear-gradient(160deg, #1d3a94 0%, #162D77 45%, #0e1f57 100%);
  box-shadow: 0 40px 100px -20px rgba(0,0,0,.6), inset 0 0 0 1px rgba(255,255,255,.08);
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
/* الصفحة بتلف حوالين "كعب الكتاب" — يمين في العربي، شمال في الإنجليزي */
.leader-page.from-right { transform-origin: right center; animation: leaderOpenR .8s cubic-bezier(.2,.75,.2,1) both; }
.leader-page.from-left  { transform-origin: left center;  animation: leaderOpenL .8s cubic-bezier(.2,.75,.2,1) both; }
.leader-page.from-right.is-closing { animation: leaderCloseR .38s ease-in both; }
.leader-page.from-left.is-closing  { animation: leaderCloseL .38s ease-in both; }

/* ظل الطيّة اللي بيختفي والصفحة بتتفرد */
.leader-page::after {
  content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  background: linear-gradient(90deg, rgba(0,0,0,.45), transparent 40%);
  animation: leaderCrease .8s ease both;
}
.leader-page.from-right::after { background: linear-gradient(270deg, rgba(0,0,0,.45), transparent 40%); }

.leader-page-inner {
  display: grid; grid-template-columns: minmax(0, 380px) 1fr; gap: 44px;
  padding: 48px;
  animation: leaderContent .5s .35s ease both;
}
.leader-photo-col { align-self: start; position: sticky; top: 0; }
.leader-position { color: #BFD0FF; font-weight: 700; font-size: 1.125rem; margin-bottom: 18px; }
.leader-rule { display: block; width: 64px; height: 3px; border-radius: 3px; background: rgba(255,255,255,.55); margin-bottom: 22px; }

.leader-close {
  position: absolute; top: 16px; inset-inline-end: 16px; z-index: 2;
  width: 42px; height: 42px; border-radius: 50%;
  background: rgba(255,255,255,.14); color: #fff; font-size: 26px; line-height: 1;
  border: 1px solid rgba(255,255,255,.25); cursor: pointer; transition: background .2s, transform .2s;
}
.leader-close:hover { background: rgba(255,255,255,.28); transform: rotate(90deg); }

@keyframes leaderFade { from { opacity: 0 } to { opacity: 1 } }
@keyframes leaderFadeOut { from { opacity: 1 } to { opacity: 0 } }
@keyframes leaderOpenR { 0% { transform: rotateY(-95deg); opacity: .2 } 60% { opacity: 1 } 100% { transform: rotateY(0) } }
@keyframes leaderOpenL { 0% { transform: rotateY(95deg);  opacity: .2 } 60% { opacity: 1 } 100% { transform: rotateY(0) } }
@keyframes leaderCloseR { to { transform: rotateY(-80deg); opacity: 0 } }
@keyframes leaderCloseL { to { transform: rotateY(80deg);  opacity: 0 } }
@keyframes leaderCrease { 0% { opacity: 1 } 100% { opacity: 0 } }
@keyframes leaderContent { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: none } }

@media (max-width: 860px) {
  .leader-page-inner { grid-template-columns: 1fr; gap: 26px; padding: 64px 22px 30px; }
  .leader-photo-col { position: static; max-width: 340px; width: 100%; margin: 0 auto; }
}
@media (prefers-reduced-motion: reduce) {
  .leader-page, .leader-page::after, .leader-page-inner, .leader-backdrop { animation: none !important; }
}
