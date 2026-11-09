import './OurLeadership.css'
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLeaders } from "../../hooks/useContent";
import { localized } from "../../utils/localized";

// صورة القائد — الإطار ثابت (ratio) فكل الصور بنفس المقاس، والصورة بتتقص من فوق علشان الوش يبان
function LeaderPhoto({ src, alt, ratio = "aspect-[3/4]", className = "", dark = false }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  const showImg = src && !failed;
  return (
    <div className={`w-full ${ratio} overflow-hidden flex items-center justify-center ${dark ? "bg-white/10" : "bg-gray-100"} ${className}`}>
      {showImg ? (
        <img className="w-full h-full object-cover object-[50%_15%]" src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <svg viewBox="0 0 24 24" className={`w-1/3 h-1/3 ${dark ? "text-white/40" : "text-gray-300"}`} fill="currentColor" aria-label={alt}>
          <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5z" />
        </svg>
      )}
    </div>
  );
}

// نافذة التفاصيل — خلفية زرقا، بتتفتح زي صفحة كتاب، والصورة مربعة
function LeaderModal({ lead, lang, onClose }) {
  const [closing, setClosing] = useState(false);
  const close = () => { setClosing(true); setTimeout(onClose, 380); };

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, []);

  const rtl = lang === "ar";
  const name = localized(lead, "name", lang);
  const position = localized(lead, "position", lang);
  const bio = localized(lead, "bio", lang);

  return (
    <div className={`leader-backdrop ${closing ? "is-closing" : ""}`} onClick={close}>
      <div className="leader-book" dir={rtl ? "rtl" : "ltr"}>
        <div
          className={`leader-page ${rtl ? "from-right" : "from-left"} ${closing ? "is-closing" : ""}`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={name}
        >
          <button onClick={close} className="leader-close" aria-label={rtl ? "إغلاق" : "Close"}>×</button>

          <div className="leader-page-inner">
            <div className="leader-photo-col">
              <LeaderPhoto src={lead.image_url} alt={name} ratio="aspect-square" className="rounded-2xl ring-4 ring-white/15 shadow-2xl" dark />
            </div>
            <div className="leader-text">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">{name}</h2>
              {position && <h3 className="leader-position">{position}</h3>}
              <span className="leader-rule" aria-hidden="true" />
              {bio && <p className="text-white/85 text-lg leading-9 whitespace-pre-line">{bio}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// الكارت: صورة + اسم + منصب فقط (التصميم الأصلي)، والتفاصيل في النافذة الزرقا
const OurLeadership = () => {
  const { i18n } = useTranslation();
  const { data: leads } = useLeaders();
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <div className="container py-20">
        <div className="text-center pb-32 pt-20">
          <h1 data-aos="fade-up"
            data-aos-offset="0"
            data-aos-once="true"
            data-aos-delay="300" className=" mb-5 text-3xl
                sm:text-4xl
                md:text-5xl
                font-bold font-extrabold   text-center">القياده<br /> التي تقود التقدم
          </h1>
          <p>مجلس الاداره </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 items-start">
          {leads.map((lead) => {
            const name = localized(lead, "name", i18n.language);
            return (
              <div
                key={lead.id}
                className="board-card hover:text-primary hover:border-primary cursor-pointer w-full flex flex-col"
                onClick={() => setSelected(lead)}
              >
                <LeaderPhoto src={lead.image_url} alt={name} className="rounded-lg" />
                <h2 className="pt-4 pb-2 text-black font-extrabold">{name}</h2>
                <h3 className="text-textPara mb-4">{localized(lead, "position", i18n.language)}</h3>
              </div>
            );
          })}
        </div>
      </div>

      {selected && <LeaderModal lead={selected} lang={i18n.language} onClose={() => setSelected(null)} />}
    </div>
  )
}

export default OurLeadership
