
# Vitamin Pastanesi - İK & CRM

## Proje Açıklaması
Bu proje, Vitamin Pastanesi için geliştirilmiş bir **İnsan Kaynakları (İK) ve CRM (Müşteri İlişkileri Yönetimi)** uygulamasıdır.  
Projenin amacı, işletmenin personel ve müşteri yönetimini kolaylaştırmak, kayıtları takip etmek ve raporlamayı düzenlemektir.  

---

## Ekran Görüntüleri
**<img width="1208" height="625" alt="image" src="https://github.com/user-attachments/assets/f4e5625c-6931-482a-9ae4-09089bb9744e" />
** 
<img width="1193" height="618" alt="image" src="https://github.com/user-attachments/assets/ab7e939e-c987-4f7e-9fbc-aae1e827b316" />



---

## Kullanılan API ve Örnek Endpoint
Projede kullanıcı verilerini ve örnek personel/müşteri verilerini almak için **[RandomUser API](https://randomuser.me/)** kullanılmıştır.  

**Örnek Endpoint:**  
tps://randomuser.me/api/?results=6

bootstrap kullanılmıştır

https://vitamin-pastanesi.netlify.app/ canlı demo linki
pwa özellikleri
Kanki, senin projende PWA (Progressive Web App) özelliğini kurmaya çalıştığını görüyorum (dosyalarındaki manifest.json ve hizmet-çalışanı.js (Service Worker) bunun kanıtı).

PWA, web siteni bir mobil uygulama gibi telefona yüklenebilir hale getirir. Ancak GitHub Pages'te çalışmamasının veya "API çalışmıyor" gibi görünmesinin sebebi genelde Service Worker'ın dosyaları yanlış aramasıdır.

PWA'nın düzgün çalışması için 3 ana direk vardır:

1. Web Manifest (manifest.json)
Bu dosya uygulamanın telefon ekranında nasıl görüneceğini belirler.

Hata Riski: İkon yolların (icons/icon-192.png) yanlışsa PWA yüklenemez.

İpucu: Tarayıcıda (Chrome) İncele -> Application -> Manifest sekmesine gir. Orada kırmızı bir hata var mı bak.

2. Service Worker (hizmet-çalışanı.js)
Senin kodundaki en kritik parça bu. Bu dosya bir "vekil sunucu" gibi davranır; internet olmasa bile sitenin açılmasını sağlar.

Senin Kodundaki Sorun: Dosya isminde Türkçe karakter (ç, ş, ı) kullanmışsın. GitHub Pages üzerinde bu dosya kayıt edilemeyebilir.

Çözüm: Dosya ismini sw.js veya service-worker.js yap. index.html içinde bu dosyayı çağırdığın (navigator.serviceWorker.register) kısmı da güncelle.

3. HTTPS Zorunluluğu
PWA'lar güvenlik nedeniyle sadece https:// protokolünde çalışır. GitHub Pages bunu otomatik sağlar, o yüzden burada bir sorun yok. Ancak yerel bilgisayarında (localhost) deniyorsan çalışmayabilir.
