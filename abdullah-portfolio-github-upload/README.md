# Abdullah Alharbi — Portfolio A & B

موقع HTML/CSS/JavaScript ثابت، جاهز للرفع على GitHub والنشر على Render.
هذه النسخة تضم أقل من 100 ملف لتناسب الرفع من متصفح GitHub. تم تجميع الصور والخطوط المكررة في assets مشتركة، مع إبقاء كل الصفحات.
يحتوي صفحة الترحيب ونسختي A وB والمقارنة وسجل البرومبتات والنسخة المحفوظة.
آخر التعديلات مشمولة: إزالة المعدل من الصفحات والسيرة، شعار ع في B، الوضعان الفاتح والداكن، وحركات النصوص مع الحفاظ على تأثير الاسم السابق.

## 1. الرفع على GitHub

1. فك ضغط الملف.
2. أنشئ repository على GitHub.
3. ارفع **محتويات هذا المجلد** إلى جذر repository، بحيث يظهر `render.yaml` و`README.md` ومجلد `dist` مباشرة.
4. لا ترفع ملف ZIP نفسه فقط؛ يجب أن تظهر ملفات الموقع داخل repository.

## 2. النشر على Render

1. افتح https://dashboard.render.com/.
2. اختر **New → Static Site** واربط GitHub repository.
3. اختر الفرع الذي رفعت عليه الملفات، مثل `main`.
4. استخدم هذه الإعدادات:

| الحقل | القيمة |
| --- | --- |
| Root Directory | اتركه فارغًا إذا رفعت المحتويات إلى جذر repository |
| Build Command | `echo "Static site ready"` |
| Publish Directory | `dist` |
| Environment Variables | لا يحتاج أي متغيرات أو API keys |

5. اضغط **Create Static Site / Deploy**.

لا يحتاج الموقع Start Command. لا تختَر Web Service في الإعداد اليدوي؛ هذا الموقع جاهز كـStatic Site.

### بديل: Blueprint

اختر **New → Blueprint** واربط repository. سيقرأ Render ملف `render.yaml` الموجود في الجذر.
وجود `type: web` مع `runtime: static` داخل YAML هو تنسيق Blueprint الخاص بالمواقع الثابتة.

## الصفحات

- `/` — الترحيب والاختيار بين النسختين.
- `/version-a/` — Portfolio A.
- `/version-b/` — Portfolio B.
- `/compare.html` — المقارنة المستقلة.
- `/prompts.html` — البرومبتات وسجل التعديلات.
- `/saved/graphite/` — التصميم المحفوظ، مع إزالة المعدل منه أيضًا.

## التعديل محليًا

- عدّل صفحات وتصميم الموقع داخل `dist/`.
- عند تعديل A أو B أو `theme.css` شغّل قبل الرفع:

```bash
python3 scripts/build-previews.py
```

هذا يحدّث معاينات صفحة الترحيب من نفس ملفات الموقع، مع تضمين الخطوط والشعار والتنسيق بداخلها.
النشر الأول لا يحتاج تشغيل هذا الأمر؛ المعاينات جاهزة في الملفات الحالية.

للمعاينة المحلية عندك:

```bash
python3 -m http.server 8000 --directory dist
```

ثم افتح http://localhost:8000/.

## التواصل والروابط

نموذج التواصل يفتح مسودة في تطبيق البريد لدى الزائر؛ لا يرسل الرسائل من خادم.
السيرة الذاتية تفتح PDF في تبويب جديد. رابط GitHub يفتح مستودع Nabeeh.
أمثلة Nabeeh توضيحية؛ الموقع لا ينفذ AI inference ولا يحتاج خدمة AI.

## التراخيص

تراخيص الخطوط والشعارات الخارجية وإسناد المصادر موجودة بجانب الأصول داخل `dist/assets/` و`content/preview-fonts/`.
المرجع الرسمي للنشر: https://render.com/docs/static-sites
ومرجع إعداد YAML: https://render.com/docs/blueprint-spec
