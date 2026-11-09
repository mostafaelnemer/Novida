import "./Banner.css"
import {Link} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSiteSettings } from "../../hooks/useContent";

// نص البانر بيتعدل من لوحة التحكم ← الإعدادات (جدول site_settings)
// لو الخانة فاضية في لوحة التحكم بيظهر النص الافتراضي من ملف الترجمة
function Banner() {
  const { t, i18n } = useTranslation();
  const { data: s, loading } = useSiteSettings();
  const en = i18n.language === "en";

  const pick = (field) => {
    if (loading) return "";
    const v = s?.[`banner_${field}_${en ? "en" : "ar"}`];
    return v && v.trim() ? v : t(`banner.${field}`);
  };

  return (
        <div className="Banner " style={s?.banner_image_url ? { backgroundImage: `url("${s.banner_image_url}")` } : undefined}>
       <div className="container  mx-auto h-full">
        <div className="Banner-content  ">
           <div className="">
             <h2 className="mb-7 font-extrabold text-4xl leading-tight text-primary min-h-[1.25em]">{pick("title")}</h2>
            <h3 className="text-2xl mb-8 text-navy w-9/12">{pick("line1")} <br/> {pick("line2")}</h3>
             <button> 
                  <Link className=' cursor-pointer hover:bg-white hover:text-primary transition-all  bg-primary font-bold text-white py-2 px-6  rounded-lg' to="/TextMe">{pick("button") || t("banner.button")} </Link>
             </button>
           </div>
        </div>
       </div>
    </div>
  )
}

export default Banner
