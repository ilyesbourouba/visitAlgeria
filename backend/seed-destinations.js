const pool = require('./config/db');

const wilayas = [
  { id: 1, en: 'Adrar', ar: 'أدرار' },
  { id: 2, en: 'Chlef', ar: 'الشلف' },
  { id: 3, en: 'Laghouat', ar: 'الأغواط' },
  { id: 4, en: 'Oum El Bouaghi', ar: 'أم البواقي' },
  { id: 5, en: 'Batna', ar: 'باتنة' },
  { id: 6, en: 'Béjaïa', ar: 'بجاية' },
  { id: 7, en: 'Biskra', ar: 'بسكرة' },
  { id: 8, en: 'Béchar', ar: 'بشار' },
  { id: 9, en: 'Blida', ar: 'البليدة' },
  { id: 10, en: 'Bouïra', ar: 'البويرة' },
  { id: 11, en: 'Tamanrasset', ar: 'تمنراست' },
  { id: 12, en: 'Tébessa', ar: 'تبسة' },
  { id: 13, en: 'Tlemcen', ar: 'تلمسان' },
  { id: 14, en: 'Tiaret', ar: 'تيارت' },
  { id: 15, en: 'Tizi Ouzou', ar: 'تيزي وزو' },
  { id: 16, en: 'Algiers', ar: 'الجزائر' },
  { id: 17, en: 'Djelfa', ar: 'الجلفة' },
  { id: 18, en: 'Jijel', ar: 'جيجل' },
  { id: 19, en: 'Sétif', ar: 'سطيف' },
  { id: 20, en: 'Saïda', ar: 'سعيدة' },
  { id: 21, en: 'Skikda', ar: 'سكيكدة' },
  { id: 22, en: 'Sidi Bel Abbès', ar: 'سيدي بلعباس' },
  { id: 23, en: 'Annaba', ar: 'عنابة' },
  { id: 24, en: 'Guelma', ar: 'قالمة' },
  { id: 25, en: 'Constantine', ar: 'قسنطينة' },
  { id: 26, en: 'Médéa', ar: 'المدية' },
  { id: 27, en: 'Mostaganem', ar: 'مستغانم' },
  { id: 28, en: "M'Sila", ar: 'المسيلة' },
  { id: 29, en: 'Mascara', ar: 'معسكر' },
  { id: 30, en: 'Ouargla', ar: 'ورقلة' },
  { id: 31, en: 'Oran', ar: 'وهران' },
  { id: 32, en: 'El Bayadh', ar: 'البيض' },
  { id: 33, en: 'Illizi', ar: 'إليزي' },
  { id: 34, en: 'Bordj Bou Arréridj', ar: 'برج بوعريريج' },
  { id: 35, en: 'Boumerdès', ar: 'بومرداس' },
  { id: 36, en: 'El Tarf', ar: 'الطارف' },
  { id: 37, en: 'Tindouf', ar: 'تندوف' },
  { id: 38, en: 'Tissemsilt', ar: 'تيسمسيلت' },
  { id: 39, en: 'El Oued', ar: 'الوادي' },
  { id: 40, en: 'Khenchela', ar: 'خنشلة' },
  { id: 41, en: 'Souk Ahras', ar: 'سوق أهراس' },
  { id: 42, en: 'Tipaza', ar: 'تيبازة' },
  { id: 43, en: 'Mila', ar: 'ميلة' },
  { id: 44, en: 'Aïn Defla', ar: 'عين الدفلى' },
  { id: 45, en: 'Naâma', ar: 'النعامة' },
  { id: 46, en: 'Aïn Témouchent', ar: 'عين تيموشنت' },
  { id: 47, en: 'Ghardaïa', ar: 'غرداية' },
  { id: 48, en: 'Relizane', ar: 'غليزان' },
  { id: 49, en: 'Timimoun', ar: 'تيميمون' },
  { id: 50, en: 'Bordj Badji Mokhtar', ar: 'برج باجي مختار' },
  { id: 51, en: 'Ouled Djellal', ar: 'أولاد جلال' },
  { id: 52, en: 'Béni Abbès', ar: 'بني عباس' },
  { id: 53, en: 'Aïn Salah', ar: 'عين صالح' },
  { id: 54, en: 'Aïn Guezzam', ar: 'عين قزام' },
  { id: 55, en: 'Touggourt', ar: 'تقرت' },
  { id: 56, en: 'Djanet', ar: 'جانت' },
  { id: 57, en: "El M'Ghair", ar: 'المغير' },
  { id: 58, en: 'El Menia', ar: 'المنيعة' }
];

async function seed() {
  try {
    console.log('--- Seeding 58 Wilayas ---');
    for (const w of wilayas) {
      await pool.query(
        'INSERT INTO destinations (id, name_en, name_ar, sort_order) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE name_en = ?, name_ar = ?',
        [w.id, w.en, w.ar, w.id, w.en, w.ar]
      );
    }
    console.log('✅ Seeding complete');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seed();
