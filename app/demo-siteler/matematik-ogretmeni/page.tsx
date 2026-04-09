import {
  BookOpenText,
  FileBadge2,
  FileText,
  GraduationCap,
  Heart,
  MessageCircleMore,
  NotebookPen,
  Phone,
  Sigma,
  ThumbsDown,
  ThumbsUp,
  Trophy,
} from "lucide-react";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Matematik Öğretmeni Demo Site",
  description:
    "Matematik öğretmeni için hazırlanmış; çalışma paylaşımı, PDF belge akışı, yorum ve tepki sistemi gösteren örnek demo sayfası.",
  path: "/demo-siteler/matematik-ogretmeni",
  keywords: [
    "matematik öğretmeni demo site",
    "öğretmen web sitesi örneği",
    "eğitim içerik sitesi",
    "pdf paylaşım sitesi",
  ],
});

const classBoards = [
  { grade: "5. Sınıf", theme: "Kesirler, doğal sayılar, problem çözme", accent: "bg-[#1cdaff]/14 text-[#0fc2ff]" },
  { grade: "6. Sınıf", theme: "Oran, cebirsel ifadeler, veri analizi", accent: "bg-[#86ff96]/14 text-[#53ea68]" },
  { grade: "7. Sınıf", theme: "Rasyonel sayılar, eşitlik, yüzdeler", accent: "bg-[#ffd86a]/14 text-[#ffbf1f]" },
  { grade: "8. Sınıf", theme: "LGS kampı, yeni nesil sorular, denemeler", accent: "bg-[#ff8ad8]/14 text-[#ff73cf]" },
];

const postFeed = [
  {
    title: "7. Sınıf Oran-Orantı Çalışma Kağıdı",
    type: "PDF Çalışma",
    file: "oran-oranti-calismasi.pdf",
    summary:
      "Yeni nesil sorularla hazırlanmış 12 soruluk tekrar föyü. Altında öğrenci yorumları ve çözüm tartışmaları akıyor.",
    likes: 84,
    dislikes: 3,
    comments: 17,
    emojis: ["🔥 26", "👏 18", "🧠 12"],
  },
  {
    title: "LGS Problemler Mini Deneme",
    type: "Word Belgesi",
    file: "lgs-problemler-mini-deneme.docx",
    summary:
      "8. sınıf öğrencileri için paylaşılmış mini deneme. Öğrenciler sonuç yorumlarını bırakabiliyor, öğretmen geri dönüş yazabiliyor.",
    likes: 119,
    dislikes: 5,
    comments: 29,
    emojis: ["🚀 33", "💯 21", "😵 9"],
  },
  {
    title: "5. Sınıf Kesirler Video Özeti",
    type: "Başlık Görseli + Not",
    file: "kesirler-ozet-gorseli.png",
    summary:
      "Görsel anlatım, kısa açıklama ve indirilebilir ek dosya bağlantısı aynı paylaşım kartında buluşuyor.",
    likes: 62,
    dislikes: 1,
    comments: 11,
    emojis: ["❤️ 14", "✨ 10", "🙌 8"],
  },
];

const comments = [
  { name: "Zeynep A.", text: "Hocam 3. sorunun çözümünü de paylaşır mısınız? PDF çok faydalı olmuş.", accent: "from-[#27d8ff] to-[#2c70ff]" },
  { name: "Mert K.", text: "LGS denemesi baya iyiydi. Özellikle problem soruları tam sınav gibiydi.", accent: "from-[#79ff8e] to-[#2fd46f]" },
  { name: "Elif T.", text: "Emoji tepkileri güzel olmuş. Çalışmanın zor kısmını diğer öğrencilerden de görebiliyoruz.", accent: "from-[#ff98de] to-[#ff5eb8]" },
];

export default function MatematikOgretmeniDemoPage() {
  return (
    <section className="container-main py-8 sm:py-10">
      <SeoJsonLd
        data={createBreadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Demo Siteler", path: "/demo-siteler" },
          { name: "Matematik Öğretmeni", path: "/demo-siteler/matematik-ogretmeni" },
        ])}
      />

      <div className="overflow-hidden rounded-[38px] border border-[#2d3fff]/30 bg-[#0c0f24] text-white shadow-[0_36px_110px_rgba(0,0,0,0.34)]">
        <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#4de3ff,transparent_24%),radial-gradient(circle_at_top_right,#5f65ff,transparent_26%),radial-gradient(circle_at_bottom_left,#a7ff66,transparent_18%),linear-gradient(135deg,#0a0b1c,#162450_42%,#241587_74%,#0a0b1c)] px-6 py-10 sm:px-10 sm:py-12">
          <div className="demo-spin-slow absolute right-[-4rem] top-[-4rem] h-44 w-44 rounded-full border border-white/10" />
          <div className="demo-float-delay absolute right-[12%] top-[42%] hidden h-20 w-20 rounded-full border border-white/12 bg-[#fff37f]/14 shadow-[0_16px_38px_rgba(255,243,127,0.18)] md:block" />

          <div className="grid gap-8 lg:grid-cols-[1.06fr_0.94fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#7fefff]/18 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b3f6ff]">
                <Sigma className="h-4 w-4" />
                Matematik Öğretmeni Demo
              </div>
              <h1 className="mt-6 max-w-5xl text-4xl font-black leading-[0.9] tracking-[-0.08em] sm:text-5xl lg:text-[5rem]">
                Çalışma paylaşan
                <span className="demo-gradient-shift block bg-[linear-gradient(90deg,#74f7ff,#84ff8a,#ffe56a,#ff8be8)] bg-clip-text text-transparent">
                  öğretmen sitesi böyle görünmeli.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/74 sm:text-lg">
                Bu demo klasik öğretmen biyografi sayfası değil. İçerik paylaşımı, PDF ve Word dosyaları, yorum alanı,
                like-dislike ve emoji tepkileri bir eğitim topluluğu gibi aynı akışta çalışıyor.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#paylasimlar" className="rounded-full bg-[#fff37f] px-6 py-3 text-sm font-semibold text-[#171a35] shadow-[0_16px_38px_rgba(255,243,127,0.24)]">
                  Paylaşımları Gör
                </a>
                <a href="#siniflar" className="rounded-full border border-white/14 bg-white/8 px-6 py-3 text-sm font-semibold text-white">
                  Sınıfları İncele
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[2rem] border border-white/10 bg-white/8 p-5 backdrop-blur">
                <div className="text-[11px] uppercase tracking-[0.22em] text-[#8ff6ff]">İçerik Akışı</div>
                <div className="mt-3 text-3xl font-black text-white">PDF + Word + Görsel</div>
                <p className="mt-4 text-sm leading-7 text-white/70">Her paylaşım başlık görseli ve belge dosyasıyla yayınlanabiliyor.</p>
              </div>
              <div className="rounded-[2rem] border border-[#fff37f]/22 bg-[linear-gradient(135deg,#fff37f,#9dff67)] p-5 text-[#17202e]">
                <div className="text-[11px] uppercase tracking-[0.22em] text-[#495114]">Topluluk</div>
                <div className="mt-3 text-3xl font-black">Yorum + Tepki</div>
                <p className="mt-4 text-sm leading-7 font-medium">Like, dislike ve emoji tepkileri aynı paylaşımda toplanıyor.</p>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-white/8 p-5 backdrop-blur sm:col-span-2">
                <div className="flex items-center gap-3 text-[#b3f6ff]">
                  <GraduationCap className="h-5 w-5" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">Öğretmen Kimliği</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-white/72">
                  Ana sayfa, biyografi, iletişim, sınıf bazlı ayrım ve çalışma paylaşımı aynı markada birleşiyor. Yani öğretmen siteye içerik koydukça
                  yaşayan bir eğitim merkezi görünümü oluşuyor.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div id="siniflar" className="bg-[#f7f9ff] px-6 py-10 text-[#1b2240] sm:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#365cff]">Sınıf Bazlı Akış</div>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] sm:text-[2.9rem]">
                Her seviye için canlı öğrenme panosu.
              </h2>
            </div>
            <div className="rounded-full bg-[#1b2240] px-4 py-2 text-sm font-semibold text-[#d7dcff]">
              Öğretmen isterse konu bazlı da bölebilir
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {classBoards.map((board, index) => (
              <article
                key={board.grade}
                className={`rounded-[2rem] border p-6 shadow-[0_18px_40px_rgba(32,44,86,0.08)] ${index % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]"}`}
                style={{ borderColor: "rgba(61,93,255,0.1)", background: index === 3 ? "linear-gradient(135deg,#1b2240,#2d35ff)" : "#ffffff", color: index === 3 ? "#ffffff" : "#1b2240" }}
              >
                <div className={`inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${index === 3 ? "bg-white/12 text-[#fff37f]" : board.accent}`}>
                  {board.grade}
                </div>
                <h3 className="mt-5 text-2xl font-black">{board.grade}</h3>
                <p className={`mt-4 text-sm leading-7 ${index === 3 ? "text-white/76" : "text-[#5b6485]"}`}>{board.theme}</p>
              </article>
            ))}
          </div>
        </div>

        <div id="paylasimlar" className="grid gap-0 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="bg-[#121633] px-6 py-10 sm:px-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8ff6ff]">Paylaşım Akışı</div>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-white sm:text-[2.8rem]">
              Öğretmenin yaptığı çalışma burada gerçek post gibi akmalı.
            </h2>

            <div className="mt-8 space-y-5">
              {postFeed.map((post, index) => (
                <article key={post.title} className={`rounded-[2rem] border p-5 ${index === 1 ? "bg-[linear-gradient(135deg,#253cff,#11238f)]" : "bg-white/6"} border-white/10`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className={`inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${index === 1 ? "bg-white/14 text-[#fff37f]" : "bg-[#1d254f] text-[#8ff6ff]"}`}>
                        {post.type}
                      </div>
                      <h3 className="mt-4 text-2xl font-black text-white">{post.title}</h3>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-3">
                      {post.type.includes("PDF") ? <FileBadge2 className="h-5 w-5 text-[#fff37f]" /> : post.type.includes("Word") ? <FileText className="h-5 w-5 text-[#8ff6ff]" /> : <BookOpenText className="h-5 w-5 text-[#86ff96]" />}
                    </div>
                  </div>

                  <div className="mt-4 rounded-[1.3rem] border border-white/10 bg-white/8 px-4 py-3 text-sm font-medium text-white/78">
                    Dosya: {post.file}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-white/74">{post.summary}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {post.emojis.map((emoji) => (
                      <span key={emoji} className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-semibold text-white/76">
                        {emoji}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-white/82">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#18204b] px-3 py-2">
                      <ThumbsUp className="h-4 w-4 text-[#86ff96]" />
                      {post.likes}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#18204b] px-3 py-2">
                      <ThumbsDown className="h-4 w-4 text-[#ff9acb]" />
                      {post.dislikes}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#18204b] px-3 py-2">
                      <MessageCircleMore className="h-4 w-4 text-[#8ff6ff]" />
                      {post.comments} yorum
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="bg-[linear-gradient(135deg,#f7f9ff,#eef4ff)] px-6 py-10 text-[#1b2240] sm:px-10">
            <div className="rounded-[2rem] border border-[#dce4ff] bg-white p-6 shadow-[0_18px_42px_rgba(35,55,122,0.08)]">
              <div className="flex items-center gap-3 text-[#365cff]">
                <NotebookPen className="h-5 w-5" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">Yorum Duvarı</span>
              </div>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.05em]">
                Paylaşım altına yorum yapılan yapı müşteriyi ikna eder.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#5d678d]">
                Öğrenciler soru soruyor, öğretmen cevap veriyor, diğer öğrenciler emoji ve like ile katılıyor. Böylece site
                statik bir vitrin değil, eğitim topluluğu gibi çalışıyor.
              </p>

              <div className="mt-6 space-y-4">
                {comments.map((comment) => (
                  <article key={comment.name} className="rounded-[1.5rem] border border-[#e4eaff] bg-[#f8faff] p-4">
                    <div className={`inline-flex rounded-full bg-gradient-to-r ${comment.accent} px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white`}>
                      {comment.name}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[#556186]">{comment.text}</p>
                  </article>
                ))}
              </div>

              <div className="mt-6 rounded-[1.7rem] bg-[linear-gradient(135deg,#1e2fff,#18c8ff)] p-5 text-white">
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">Öğretmen Profili</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-white/86">
                  Buraya kısa biyografi, başarılar, iletişim ve özel ders / grup ders bilgileri eklenebilir. Böylece site hem içerik merkezi hem de güven profili olur.
                </p>
              </div>

              <div className="mt-6 grid gap-3">
                <a href="tel:+905333850572" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1b2240] px-4 py-3 text-sm font-semibold text-white">
                  <Phone className="h-4 w-4 text-[#fff37f]" />
                  0533 385 05 72
                </a>
                <div className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#f2f5ff] px-4 py-3 text-sm font-semibold text-[#365cff]">
                  <Heart className="h-4 w-4 text-[#ff73cf]" />
                  İletişim / Hakkında / Biyografi / Ders Düzeyleri
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
