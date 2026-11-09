import { useEffect, useState } from 'react';
import { useAdmin } from '../AdminContext';
import { supabase } from '../../lib/supabaseClient';
import { createItem, updateItem } from '../../services/adminApi';
import PageHeader from '../components/PageHeader';
import { PrimaryButton } from '../components/Buttons';
import { Input, TextArea } from '../components/FormFields';
import { ImageUpload } from '../components/UploadFields';
import ErrorBanner from '../components/ErrorBanner';

const TABLE = 'site_settings';
const FIELDS = [
  'banner_title_ar', 'banner_title_en', 'banner_line1_ar', 'banner_line1_en',
  'banner_line2_ar', 'banner_line2_en', 'banner_button_ar', 'banner_button_en', 'banner_image_url',
];

const T = {
  ar: {
    title: 'البانر الرئيسي',
    hint: 'السكشن اللي تحت الفيديو في الصفحة الرئيسية. أي خانة فاضية = بيظهر النص الافتراضي.',
    image: 'صورة الخلفية (اختياري — فاضية = الصورة الحالية)',
    title_ar: 'العنوان بالعربي', title_en: 'العنوان بالإنجليزي',
    line1_ar: 'السطر الأول بالعربي', line1_en: 'السطر الأول بالإنجليزي',
    line2_ar: 'السطر الثاني بالعربي', line2_en: 'السطر الثاني بالإنجليزي',
    button_ar: 'كلمة الزرار بالعربي', button_en: 'كلمة الزرار بالإنجليزي',
    preview: 'معاينة', save: 'حفظ', saving: 'جارٍ الحفظ…', saved: 'تم الحفظ ✓', loading: 'جارٍ التحميل…',
  },
  en: {
    title: 'Home banner',
    hint: 'The section under the video on the home page. Empty field = default text.',
    image: 'Background image (optional — empty = current image)',
    title_ar: 'Title (Arabic)', title_en: 'Title (English)',
    line1_ar: 'Line 1 (Arabic)', line1_en: 'Line 1 (English)',
    line2_ar: 'Line 2 (Arabic)', line2_en: 'Line 2 (English)',
    button_ar: 'Button (Arabic)', button_en: 'Button (English)',
    preview: 'Preview', save: 'Save', saving: 'Saving…', saved: 'Saved ✓', loading: 'Loading…',
  },
};

export default function AdminBanner() {
  const { lang } = useAdmin();
  const L = T[lang] || T.ar;
  const [row, setRow] = useState(null);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase.from(TABLE).select('*').order('created_at').limit(1).maybeSingle()
      .then(({ data, error: err }) => {
        if (err) setError(err.message);
        setRow(data || null);
        setForm(Object.fromEntries(FIELDS.map((k) => [k, data?.[k] ?? ''])));
      });
  }, []);

  useEffect(() => {
    if (!saved) return;
    const t = setTimeout(() => setSaved(false), 2500);
    return () => clearTimeout(t);
  }, [saved]);

  const bind = (k) => ({ value: form?.[k] ?? '', onChange: (e) => setForm((f) => ({ ...f, [k]: e.target.value })) });

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const values = { ...form };
      const updated = row?.id ? await updateItem(TABLE, row.id, values) : await createItem(TABLE, values);
      setRow(updated);
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!form) return <p className="text-sm text-gray-500">{L.loading}</p>;

  return (
    <div>
      <PageHeader title={L.title} />
      <p className="-mt-3 mb-4 text-sm text-gray-500">{L.hint}</p>

      <form onSubmit={submit} className="space-y-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
        {error && <ErrorBanner message={error} />}

        <ImageUpload label={L.image} folder="banner" value={form.banner_image_url}
          onChange={(v) => setForm((f) => ({ ...f, banner_image_url: v }))} onBusy={setUploading} />

        <div className="grid gap-4 md:grid-cols-2">
          <Input label={L.title_ar} dir="rtl" {...bind('banner_title_ar')} />
          <Input label={L.title_en} dir="ltr" {...bind('banner_title_en')} />
          <TextArea label={L.line1_ar} dir="rtl" rows={2} {...bind('banner_line1_ar')} />
          <TextArea label={L.line1_en} dir="ltr" rows={2} {...bind('banner_line1_en')} />
          <TextArea label={L.line2_ar} dir="rtl" rows={2} {...bind('banner_line2_ar')} />
          <TextArea label={L.line2_en} dir="ltr" rows={2} {...bind('banner_line2_en')} />
          <Input label={L.button_ar} dir="rtl" {...bind('banner_button_ar')} />
          <Input label={L.button_en} dir="ltr" {...bind('banner_button_en')} />
        </div>

        <div>
          <span className="mb-1.5 block text-xs font-medium text-gray-600">{L.preview}</span>
          <div dir="rtl" className="rounded-xl bg-cover bg-center p-6 md:p-8"
            style={{ backgroundImage: `linear-gradient(90deg, rgba(255,255,255,.1), rgba(255,255,255,.85)), url(${form.banner_image_url || '/novida.png'})` }}>
            <h3 className="mb-3 text-2xl font-extrabold text-[#162D77]">{form.banner_title_ar || '—'}</h3>
            <p className="mb-4 max-w-xl text-[#0A183B]">{form.banner_line1_ar} <br /> {form.banner_line2_ar}</p>
            <span className="inline-block rounded-lg bg-[#162D77] px-5 py-2 text-sm font-bold text-white">{form.banner_button_ar || 'تواصل معنا'}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-gray-100 pt-5">
          <PrimaryButton type="submit" disabled={saving || uploading}>{saving ? L.saving : L.save}</PrimaryButton>
          {saved && <span className="text-sm text-green-600">{L.saved}</span>}
        </div>
      </form>
    </div>
  );
}
