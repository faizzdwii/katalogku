(() => {
  "use strict";

  const STORAGE_KEY = "agrosmart_v1_state";

  const NAV_ITEMS = [
    { id: "dashboard", label: "Dashboard", icon: "📊", group: "Utama" },
    { id: "lands", label: "Manajemen Lahan", icon: "🗺️", group: "Budidaya" },
    { id: "crops", label: "Tanaman & Riwayat", icon: "🌱", group: "Budidaya" },
    { id: "schedules", label: "Jadwal & Perawatan", icon: "💧", group: "Budidaya" },
    { id: "calendar", label: "Kalender Aktivitas", icon: "📅", group: "Budidaya" },
    { id: "growth", label: "Monitoring Pertumbuhan", icon: "📈", group: "Budidaya" },
    { id: "agroai", label: "AgroAI Konsultasi", icon: "🤖", group: "Kecerdasan Tani" },
    { id: "analyzer", label: "AI Plant Analyzer", icon: "🔬", group: "Kecerdasan Tani" },
    { id: "weather", label: "Cuaca & Prakiraan", icon: "🌦️", group: "Lapangan" },
    { id: "harvests", label: "Hasil Panen", icon: "🌾", group: "Produksi & Pasar" },
    { id: "finance", label: "Keuangan Tani", icon: "💰", group: "Produksi & Pasar" },
    { id: "market", label: "AgroMarket", icon: "🛒", group: "Produksi & Pasar" },
    { id: "education", label: "Edukasi & Artikel", icon: "📚", group: "Pengetahuan" },
    { id: "reports", label: "Laporan Cetak", icon: "📄", group: "Pengetahuan" },
    { id: "admin", label: "Admin & Sistem", icon: "🛡️", group: "Sistem" },
    { id: "settings", label: "Profil & Integrasi", icon: "⚙️", group: "Sistem" }
  ];

  const DEFAULT_STATE = {
    viewMode: "landing",
    activeSection: "dashboard",
    searchQuery: "",
    filterCategory: "all",
    profile: {
      name: "Budi Santoso",
      role: "Ketua Kelompok Tani Makmur",
      location: "Deli Serdang, Sumatera Utara",
      farmName: "Kebun Terpadu Harapan Jaya",
      email: "budi.tani@agrosmart.id"
    },
    cloudConfig: {
      supabaseUrl: "",
      backendEndpoint: "/api/agroai",
      autoSyncLocal: true
    },
    lands: [
      {
        id: "LHN-01",
        name: "Blok Sawit & Tumpangsari A1",
        areaHa: 2.5,
        soilType: "Lempung Berpasir",
        soilPh: 6.4,
        irrigation: "Tetes & Parit Terkendali",
        status: "Aktif Produktif",
        notes: "Drainase baik, elevasi 45 mdpl."
      },
      {
        id: "LHN-02",
        name: "Sawah Irigasi B2",
        areaHa: 1.8,
        soilType: "Aluvial Subur",
        soilPh: 6.7,
        irrigation: "Irigasi Teknis",
        status: "Masa Tanam",
        notes: "Sumber air kanal utama lancar."
      },
      {
        id: "LHN-03",
        name: "Kebun Hortikultura C3",
        areaHa: 0.9,
        soilType: "Andosol Gembur",
        soilPh: 6.2,
        irrigation: "Sprinkler Otomatis",
        status: "Siap Panen",
        notes: "Mulsa perak terpasang merata."
      }
    ],
    crops: [
      {
        id: "CRP-01",
        landId: "LHN-01",
        name: "Cabai Rawit Unggul",
        variety: "Hibrida Lokal",
        plantedDate: "2026-09-05",
        expectedHarvest: "2026-12-10",
        stage: "Berbunga & Berbuah",
        history: "Olahan pupuk kandang 8 ton/ha + kapur dolomit."
      },
      {
        id: "CRP-02",
        landId: "LHN-02",
        name: "Padi Inpari 32",
        variety: "Inpari 32 HDB",
        plantedDate: "2026-08-20",
        expectedHarvest: "2026-12-02",
        stage: "Pengisian Bulir",
        history: "Tanam jajar legowo 2:1, pemupukan berimbang."
      },
      {
        id: "CRP-03",
        landId: "LHN-03",
        name: "Tomat Cherry Manis",
        variety: "F1 Tropis",
        plantedDate: "2026-09-15",
        expectedHarvest: "2026-11-30",
        stage: "Pematangan Buah",
        history: "Ajir lanjaran dipasang minggu ke-3."
      }
    ],
    schedules: [
      {
        id: "SCH-01",
        title: "Penyiraman Pagi Blok C3",
        type: "Penyiraman",
        landId: "LHN-03",
        date: "2026-11-27",
        time: "06:30",
        done: false,
        notes: "Durasi 25 menit sebelum terik."
      },
      {
        id: "SCH-02",
        title: "Pemupukan NPK Susulan II",
        type: "Pemupukan",
        landId: "LHN-01",
        date: "2026-11-28",
        time: "07:30",
        done: false,
        notes: "Dosis 180 kg/ha ditabur melingkar tajuk."
      },
      {
        id: "SCH-03",
        title: "Pengendalian Gulma & Sanitasi",
        type: "Perawatan",
        landId: "LHN-02",
        date: "2026-11-29",
        time: "08:00",
        done: false,
        notes: "Bersihkan saluran pembuangan air."
      },
      {
        id: "SCH-04",
        title: "Panen Perdana Tomat Cherry",
        type: "Panen",
        landId: "LHN-03",
        date: "2026-11-30",
        time: "07:00",
        done: false,
        notes: "Sortasi tingkat kematangan 80% merah."
      }
    ],
    growthLogs: [
      { id: "GRW-01", cropId: "CRP-01", date: "2026-10-15", heightCm: 42, healthScore: 88, moisturePct: 66, note: "Pertumbuhan vegetatif kuat." },
      { id: "GRW-02", cropId: "CRP-01", date: "2026-11-01", heightCm: 68, healthScore: 91, moisturePct: 70, note: "Muncul kuncup bunga merata." },
      { id: "GRW-03", cropId: "CRP-01", date: "2026-11-20", heightCm: 89, healthScore: 93, moisturePct: 69, note: "Buah muda mulai terbentuk." },
      { id: "GRW-04", cropId: "CRP-02", date: "2026-11-18", heightCm: 96, healthScore: 87, moisturePct: 75, note: "Malai menunduk sehat." }
    ],
    harvests: [
      { id: "HRV-01", cropId: "CRP-03", landId: "LHN-03", date: "2026-11-12", weightKg: 640, grade: "Grade A", pricePerKg: 14500 },
      { id: "HRV-02", cropId: "CRP-01", landId: "LHN-01", date: "2026-11-18", weightKg: 520, grade: "Grade A", pricePerKg: 28000 },
      { id: "HRV-03", cropId: "CRP-02", landId: "LHN-02", date: "2026-11-22", weightKg: 3450, grade: "Gabah Kering", pricePerKg: 6500 }
    ],
    finances: [
      { id: "FIN-01", date: "2026-10-01", type: "Modal", category: "Modal Awal Musim", description: "Modal kerja kelompok tani", amount: 25000000 },
      { id: "FIN-02", date: "2026-10-05", type: "Pengeluaran", category: "Pupuk & Benih", description: "Pembelian benih unggul, NPK & kompos", amount: 8400000 },
      { id: "FIN-03", date: "2026-10-20", type: "Pengeluaran", category: "Tenaga Kerja & Irigasi", description: "Upah tanam, perawatan & bahan bakar pompa", amount: 5200000 },
      { id: "FIN-04", date: "2026-11-12", type: "Pendapatan", category: "Penjualan Panen", description: "Panen tomat cherry 640 kg", amount: 9280000 },
      { id: "FIN-05", date: "2026-11-18", type: "Pendapatan", category: "Penjualan Panen", description: "Panen cabai rawit 520 kg", amount: 14560000 },
      { id: "FIN-06", date: "2026-11-22", type: "Pendapatan", category: "Penjualan Panen", description: "Panen padi 3.450 kg", amount: 22425000 }
    ],
    marketItems: [
      { id: "MKT-01", title: "Cabai Rawit Segar Kebun A1", seller: "Kebun Terpadu Harapan Jaya", price: 29000, unit: "kg", stockKg: 350, category: "Sayuran & Cabai", location: "Deli Serdang" },
      { id: "MKT-02", title: "Beras & Gabah Inpari 32 Pilihan", seller: "Kelompok Tani Makmur", price: 13500, unit: "kg", stockKg: 1800, category: "Padi & Biji-bijian", location: "Deli Serdang" },
      { id: "MKT-03", title: "Tomat Cherry Manis Grade A", seller: "Blok Hortikultura C3", price: 15000, unit: "kg", stockKg: 240, category: "Buah & Hortikultura", location: "Medan Sekitar" }
    ],
    chatHistory: [
      {
        id: "MSG-01",
        sender: "ai",
        text: "Halo! Saya AgroAI. Tanyakan strategi pemupukan berimbang, pencegahan hama, manajemen air, atau analisis budidaya sesuai kondisi lahan Anda."
      }
    ],
    notifications: [
      { id: "NTF-01", title: "Jadwal Penyiraman Besok Pagi", desc: "Blok C3 dijadwalkan penyiraman pukul 06:30 WIB.", time: "Hari ini", read: false },
      { id: "NTF-02", title: "Peringatan Hujan Sedang", desc: "Prakiraan hujan ringan-sedang sore ini; sesuaikan penyiraman manual.", time: "2 jam lalu", read: false },
      { id: "NTF-03", title: "Capaian Panen Tercatat", desc: "Panen padi 3.450 kg telah masuk ke rekap keuangan.", time: "Kemarin", read: true }
    ],
    articles: [
      {
        id: "EDU-01",
        title: "Pemupukan Berimbang NPK & Bahan Organik",
        category: "Nutrisi Tanah",
        readTime: "4 menit",
        summary: "Kombinasi pupuk organik dan anorganik menjaga pH tanah serta meningkatkan efisiensi serapan hara hingga 25%."
      },
      {
        id: "EDU-02",
        title: "Manajemen Irigasi Hemat Air Saat Transisi Musim",
        category: "Pengairan",
        readTime: "5 menit",
        summary: "Gunakan irigasi tetes atau pengairan berselang (AWD) untuk menjaga kelembapan zona perakaran tanpa pemborosan."
      },
      {
        id: "EDU-03",
        title: "Sanitasi Kebun & Pengendalian Hama Terpadu (PHT)",
        category: "Proteksi Tanaman",
        readTime: "6 menit",
        summary: "Deteksi dini bercak daun dan gulma sejak fase vegetatif menekan risiko gagal panen secara berkelanjutan."
      }
    ]
  };

  let state = loadState();

  function cloneDefault() {
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return cloneDefault();
      const parsed = JSON.parse(raw);
      return {
        ...cloneDefault(),
        ...parsed,
        profile: { ...DEFAULT_STATE.profile, ...(parsed.profile || {}) },
        cloudConfig: { ...DEFAULT_STATE.cloudConfig, ...(parsed.cloudConfig || {}) }
      };
    } catch {
      return cloneDefault();
    }
  }

  function saveState() {
    if (state.cloudConfig && state.cloudConfig.autoSyncLocal === false) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      updateStorageBadge();
    } catch {
      showToast("Penyimpanan lokal penuh atau dibatasi browser.", "warn");
    }
  }

  function updateStorageBadge() {
    const el = document.getElementById("storage-status-text");
    if (!el) return;
    const bytes = new Blob([JSON.stringify(state)]).size;
    const kb = (bytes / 1024).toFixed(1);
    el.textContent = `LocalStorage Aktif (${kb} KB)`;
  }

  // Safe DOM creation helpers (Anti-XSS: always uses textContent)
  function el(tag, className = "", text = "") {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== "") node.textContent = String(text);
    return node;
  }

  function clearEl(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  function formatRupiah(num) {
    const n = Number(num) || 0;
    return "Rp " + n.toLocaleString("id-ID");
  }

  function formatNumber(num) {
    return (Number(num) || 0).toLocaleString("id-ID");
  }

  function uid(prefix) {
    return `${prefix}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  }

  function getLandName(landId) {
    const found = state.lands.find((l) => l.id === landId);
    return found ? found.name : landId;
  }

  function getCropName(cropId) {
    const found = state.crops.find((c) => c.id === cropId);
    return found ? found.name : cropId;
  }

  function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const colorMap = {
      info: "bg-[#166534] text-white border-green-700",
      success: "bg-emerald-800 text-white border-emerald-600",
      warn: "bg-amber-500 text-stone-950 border-amber-600",
      error: "bg-red-700 text-white border-red-800"
    };
    const toast = el("div", `pointer-events-auto px-4 py-3 rounded-2xl border shadow-lg text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 ${colorMap[type] || colorMap.info}`);
    toast.appendChild(el("span", "", message));
    const closeBtn = el("button", "opacity-80 hover:opacity-100 font-bold", "✕");
    closeBtn.type = "button";
    closeBtn.addEventListener("click", () => toast.remove());
    toast.appendChild(closeBtn);
    container.appendChild(toast);
    setTimeout(() => {
      if (toast.parentNode) toast.remove();
    }, 3600);
  }

  function openModal(title, bodyBuilder) {
    const modal = document.getElementById("app-modal");
    const titleEl = document.getElementById("modal-title");
    const bodyEl = document.getElementById("modal-body");
    titleEl.textContent = title;
    clearEl(bodyEl);
    bodyBuilder(bodyEl);
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }

  function closeModal() {
    const modal = document.getElementById("app-modal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }

  function computeFinanceSummary() {
    let modalTotal = 0;
    let expenseTotal = 0;
    let incomeTotal = 0;
    state.finances.forEach((item) => {
      const amt = Number(item.amount) || 0;
      if (item.type === "Modal") modalTotal += amt;
      else if (item.type === "Pengeluaran") expenseTotal += amt;
      else if (item.type === "Pendapatan") incomeTotal += amt;
    });
    const profit = incomeTotal - expenseTotal;
    return { modalTotal, expenseTotal, incomeTotal, profit };
  }

  function computeTotalArea() {
    return state.lands.reduce((acc, l) => acc + (Number(l.areaHa) || 0), 0);
  }

  function computeTotalHarvestKg() {
    return state.harvests.reduce((acc, h) => acc + (Number(h.weightKg) || 0), 0);
  }

  // Navigation & View Switching
  function setViewMode(mode) {
    state.viewMode = mode;
    const landing = document.getElementById("landing-view");
    const workspace = document.getElementById("workspace-view");
    const toggleBtn = document.getElementById("btn-toggle-view");
    if (mode === "workspace") {
      landing.classList.add("hidden");
      workspace.classList.remove("hidden");
      toggleBtn.textContent = "Halaman Depan";
      renderWorkspace();
    } else {
      workspace.classList.add("hidden");
      landing.classList.remove("hidden");
      toggleBtn.textContent = "Buka Workspace";
      updateLandingStats();
    }
    saveState();
  }

  function navigateTo(sectionId) {
    state.activeSection = sectionId;
    state.filterCategory = "all";
    if (state.viewMode !== "workspace") {
      setViewMode("workspace");
      return;
    }
    closeMobileDrawer();
    renderWorkspace();
    saveState();
  }

  function openMobileDrawer() {
    document.getElementById("sidebar-nav").classList.remove("-translate-x-full");
    document.getElementById("drawer-backdrop").classList.remove("hidden");
  }

  function closeMobileDrawer() {
    document.getElementById("sidebar-nav").classList.add("-translate-x-full");
    document.getElementById("drawer-backdrop").classList.add("hidden");
  }

  function updateLandingStats() {
    const areaEl = document.getElementById("landing-stat-area");
    const profitEl = document.getElementById("landing-stat-profit");
    if (areaEl) areaEl.textContent = `${computeTotalArea().toFixed(1)} Ha`;
    if (profitEl) profitEl.textContent = formatRupiah(computeFinanceSummary().profit);
  }

  function updateHeaderProfile() {
    const nameEl = document.getElementById("header-user-name");
    const avEl = document.getElementById("header-avatar-initial");
    const nm = state.profile.name || "Petani";
    if (nameEl) nameEl.textContent = nm;
    if (avEl) {
      const parts = nm.trim().split(/\s+/);
      avEl.textContent = parts.slice(0, 2).map((p) => p[0] || "").join("").toUpperCase() || "AG";
    }
  }

  function updateNotifBadge() {
    const badge = document.getElementById("notif-badge");
    if (!badge) return;
    const unread = state.notifications.filter((n) => !n.read).length;
    if (unread > 0) {
      badge.textContent = String(unread);
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  }

  function renderSidebarNav() {
    const navList = document.getElementById("nav-menu-list");
    clearEl(navList);
    let currentGroup = "";
    NAV_ITEMS.forEach((item) => {
      if (item.group !== currentGroup) {
        currentGroup = item.group;
        navList.appendChild(el("p", "px-3 pt-3 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-stone-400", currentGroup));
      }
      const btn = el("button", "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition text-left");
      btn.type = "button";
      if (state.activeSection === item.id) {
        btn.classList.add("nav-item-active");
      } else {
        btn.classList.add("text-stone-700", "hover:bg-green-50", "font-medium");
      }
      const left = el("span", "flex items-center gap-2.5 truncate");
      left.appendChild(el("span", "text-base", item.icon));
      left.appendChild(el("span", "truncate", item.label));
      btn.appendChild(left);

      if (item.id === "schedules") {
        const pendingCount = state.schedules.filter((s) => !s.done).length;
        if (pendingCount > 0) {
          btn.appendChild(el("span", "nav-badge px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900", String(pendingCount)));
        }
      }
      btn.addEventListener("click", () => navigateTo(item.id));
      navList.appendChild(btn);
    });

    document.querySelectorAll(".mob-nav-btn").forEach((b) => {
      const target = b.getAttribute("data-nav");
      if (target === state.activeSection) {
        b.className = "mob-nav-btn flex flex-col items-center justify-center py-1.5 rounded-xl text-[11px] font-bold text-[#166534] bg-green-50";
      } else {
        b.className = "mob-nav-btn flex flex-col items-center justify-center py-1.5 rounded-xl text-[11px] font-semibold text-stone-600";
      }
    });
  }

  function renderWorkspace() {
    updateHeaderProfile();
    updateNotifBadge();
    updateStorageBadge();
    renderSidebarNav();

    const metaMap = {
      dashboard: ["Dashboard", "Dashboard Statistik Pertanian", "Ringkasan lahan, hasil panen, arus kas, dan grafik produktivitas."],
      lands: ["Budidaya", "Manajemen Lahan", "Tambah, ubah, tinjau detail, atau hapus blok lahan pertanian Anda."],
      crops: ["Budidaya", "Manajemen Tanaman & Riwayat", "Kelola komoditas aktif, varietas, fase tumbuh, dan riwayat penanaman."],
      schedules: ["Budidaya", "Jadwal Penyiraman, Pemupukan & Panen", "Atur tugas lapangan dan tandai penyelesaian aktivitas harian."],
      calendar: ["Budidaya", "Kalender Aktivitas & Pengingat", "Lihat jadwal berdasarkan tanggal dan tambahkan pengingat cepat."],
      growth: ["Budidaya", "Monitoring Pertumbuhan Tanaman", "Catat tinggi tanaman, indeks kesehatan, dan kelembapan tanah."],
      agroai: ["Kecerdasan Tani", "AgroAI Konsultasi Pertanian", "Tanya jawab agronomi, pemupukan, irigasi, dan pengendalian hama."],
      analyzer: ["Kecerdasan Tani", "AI Plant Analyzer", "Unggah foto daun atau tanaman untuk analisis awal kondisi dan rekomendasi."],
      weather: ["Lapangan", "Informasi Cuaca & Prakiraan Hujan", "Pantau kondisi cuaca lokal dan rencana irigasi 5 hari ke depan."],
      harvests: ["Produksi & Pasar", "Hasil Panen & Produktivitas", "Catat bobot panen, grade kualitas, dan produktivitas per hektare."],
      finance: ["Produksi & Pasar", "Keuangan Pertanian", "Kelola modal, pengeluaran, pendapatan, dan laba bersih usaha tani."],
      market: ["Produksi & Pasar", "AgroMarket – Katalog Hasil Pertanian", "Jelajahi atau tambahkan stok komoditas siap pasarkan."],
      education: ["Pengetahuan", "Edukasi & Artikel Pertanian", "Panduan praktik pertanian berkelanjutan dan efisiensi input."],
      reports: ["Pengetahuan", "Laporan Ringkas & Cetak", "Tinjau rekapitulasi usaha tani siap cetak atau salin ringkasan."],
      admin: ["Sistem", "Admin & Tata Kelola Data", "Pantau statistik sistem, ekspor/impor JSON, dan reset data demo."],
      settings: ["Sistem", "Profil Pengguna & Integrasi Backend", "Atur profil petani, endpoint backend AgroAI, dan struktur Supabase."]
    };

    const [crumb, title, sub] = metaMap[state.activeSection] || metaMap.dashboard;
    document.getElementById("section-breadcrumb").textContent = crumb;
    document.getElementById("section-title").textContent = title;
    document.getElementById("section-subtitle").textContent = sub;

    const actionsRoot = document.getElementById("section-actions");
    clearEl(actionsRoot);
    const sectionRoot = document.getElementById("dynamic-section-root");
    clearEl(sectionRoot);

    switch (state.activeSection) {
      case "dashboard":
        renderDashboard(sectionRoot, actionsRoot);
        break;
      case "lands":
        renderLands(sectionRoot, actionsRoot);
        break;
      case "crops":
        renderCrops(sectionRoot, actionsRoot);
        break;
      case "schedules":
        renderSchedules(sectionRoot, actionsRoot);
        break;
      case "calendar":
        renderCalendar(sectionRoot, actionsRoot);
        break;
      case "growth":
        renderGrowth(sectionRoot, actionsRoot);
        break;
      case "agroai":
        renderAgroAI(sectionRoot, actionsRoot);
        break;
      case "analyzer":
        renderPlantAnalyzer(sectionRoot, actionsRoot);
        break;
      case "weather":
        renderWeather(sectionRoot, actionsRoot);
        break;
      case "harvests":
        renderHarvests(sectionRoot, actionsRoot);
        break;
      case "finance":
        renderFinance(sectionRoot, actionsRoot);
        break;
      case "market":
        renderMarket(sectionRoot, actionsRoot);
        break;
      case "education":
        renderEducation(sectionRoot, actionsRoot);
        break;
      case "reports":
        renderReports(sectionRoot, actionsRoot);
        break;
      case "admin":
        renderAdmin(sectionRoot, actionsRoot);
        break;
      case "settings":
        renderSettings(sectionRoot, actionsRoot);
        break;
      default:
        renderDashboard(sectionRoot, actionsRoot);
    }
  }

  function makeKpiCard(label, value, subtext, accent = false) {
    const card = el("div", `p-5 rounded-2xl border shadow-sm ${accent ? "bg-[#166534] text-white border-[#166534]" : "bg-white text-stone-900 border-green-900/10"}`);
    card.appendChild(el("p", `text-xs font-bold uppercase tracking-wider ${accent ? "text-amber-300" : "text-stone-500"}`, label));
    card.appendChild(el("p", `text-2xl font-extrabold mt-1 ${accent ? "text-white" : "text-stone-900"}`, value));
    card.appendChild(el("p", `text-xs mt-1 ${accent ? "text-green-100" : "text-stone-500"}`, subtext));
    return card;
  }

  // Canvas Chart Renderer (Pure Canvas 2D)
  function drawBarChart(canvasId, labels, values, barColor = "#166534") {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(280, rect.width || 420);
    const height = 220;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const padLeft = 44;
    const padRight = 16;
    const padTop = 18;
    const padBottom = 36;
    const plotW = width - padLeft - padRight;
    const plotH = height - padTop - padBottom;
    const maxVal = Math.max(10, ...values.map((v) => Number(v) || 0));

    ctx.strokeStyle = "#e7e5e4";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padTop + (plotH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(width - padRight, y);
      ctx.stroke();
      const valLabel = Math.round(maxVal - (maxVal / 4) * i);
      ctx.fillStyle = "#78716c";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(String(valLabel), padLeft - 8, y + 4);
    }

    const count = Math.max(1, labels.length);
    const slotW = plotW / count;
    const barW = Math.min(44, Math.max(18, slotW * 0.52));

    labels.forEach((lbl, idx) => {
      const val = Number(values[idx]) || 0;
      const h = (val / maxVal) * plotH;
      const x = padLeft + idx * slotW + (slotW - barW) / 2;
      const y = padTop + plotH - h;

      ctx.fillStyle = idx % 2 === 1 ? "#EAB308" : barColor;
      ctx.beginPath();
      ctx.roundRect(x, y, barW, h, [6, 6, 0, 0]);
      ctx.fill();

      ctx.fillStyle = "#44403c";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(String(lbl).slice(0, 10), x + barW / 2, height - 12);
    });
  }

  // 1. DASHBOARD
  function renderDashboard(root, actions) {
    const addLahanBtn = el("button", "px-4 py-2 rounded-xl bg-[#166534] text-white text-xs sm:text-sm font-bold hover:bg-green-800 transition", "+ Lahan Baru");
    addLahanBtn.type = "button";
    addLahanBtn.addEventListener("click", () => openLandModal(null));
    actions.appendChild(addLahanBtn);

    const addTxBtn = el("button", "px-4 py-2 rounded-xl bg-[#EAB308] text-green-950 text-xs sm:text-sm font-bold hover:bg-amber-400 transition", "+ Catat Keuangan");
    addTxBtn.type = "button";
    addTxBtn.addEventListener("click", () => openFinanceModal());
    actions.appendChild(addTxBtn);

    const fin = computeFinanceSummary();
    const totalArea = computeTotalArea();
    const totalHarvest = computeTotalHarvestKg();

    const kpiGrid = el("div", "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4");
    kpiGrid.appendChild(makeKpiCard("Total Luas Lahan", `${totalArea.toFixed(1)} Ha`, `${state.lands.length} blok lahan terdaftar`, true));
    kpiGrid.appendChild(makeKpiCard("Total Hasil Panen", `${formatNumber(totalHarvest)} Kg`, `${state.harvests.length} kali pencatatan panen`));
    kpiGrid.appendChild(makeKpiCard("Pendapatan Panen", formatRupiah(fin.incomeTotal), `Pengeluaran: ${formatRupiah(fin.expenseTotal)}`));
    kpiGrid.appendChild(makeKpiCard("Laba Bersih", formatRupiah(fin.profit), `Modal tercatat: ${formatRupiah(fin.modalTotal)}`));
    root.appendChild(kpiGrid);

    const chartsGrid = el("div", "grid grid-cols-1 lg:grid-cols-2 gap-5");

    const chart1Card = el("div", "bg-white p-5 rounded-3xl border border-green-900/10 shadow-sm space-y-3");
    chart1Card.appendChild(el("h3", "font-extrabold text-stone-900", "Hasil Panen per Komoditas (Kg)"));
    const c1 = el("canvas", "chart-canvas");
    c1.id = "chart-harvest-crop";
    chart1Card.appendChild(c1);
    chartsGrid.appendChild(chart1Card);

    const chart2Card = el("div", "bg-white p-5 rounded-3xl border border-green-900/10 shadow-sm space-y-3");
    chart2Card.appendChild(el("h3", "font-extrabold text-stone-900", "Ringkasan Keuangan (Juta Rupiah)"));
    const c2 = el("canvas", "chart-canvas");
    c2.id = "chart-finance-summary";
    chart2Card.appendChild(c2);
    chartsGrid.appendChild(chart2Card);

    root.appendChild(chartsGrid);

    // Upcoming Schedules & Quick AI
    const bottomGrid = el("div", "grid grid-cols-1 lg:grid-cols-12 gap-5");
    const schedCard = el("div", "lg:col-span-7 bg-white p-5 rounded-3xl border border-green-900/10 shadow-sm space-y-3");
    const schedTop = el("div", "flex items-center justify-between");
    schedTop.appendChild(el("h3", "font-extrabold text-stone-900", "Jadwal Lapangan Mendatang"));
    const viewAllSched = el("button", "text-xs font-bold text-[#166534] hover:underline", "Lihat Semua");
    viewAllSched.type = "button";
    viewAllSched.addEventListener("click", () => navigateTo("schedules"));
    schedTop.appendChild(viewAllSched);
    schedCard.appendChild(schedTop);

    state.schedules.slice(0, 4).forEach((s) => {
      const row = el("div", "p-3.5 rounded-2xl bg-[#F8FAF5] border border-green-900/10 flex items-center justify-between gap-3");
      const info = el("div", "min-w-0");
      info.appendChild(el("p", `text-sm font-bold truncate ${s.done ? "line-through text-stone-400" : "text-stone-900"}`, s.title));
      info.appendChild(el("p", "text-xs text-stone-500", `${s.date} • ${s.time} • ${getLandName(s.landId)}`));
      row.appendChild(info);
      const badge = el("span", `px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0 ${s.done ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-900"}`, s.done ? "Selesai" : s.type);
      row.appendChild(badge);
      schedCard.appendChild(row);
    });
    bottomGrid.appendChild(schedCard);

    const aiCard = el("div", "lg:col-span-5 bg-gradient-to-br from-[#166534] to-green-900 text-white p-6 rounded-3xl shadow-sm flex flex-col justify-between space-y-4");
    const aiTop = el("div", "space-y-2");
    aiTop.appendChild(el("span", "inline-block px-3 py-1 rounded-full bg-white/15 text-amber-300 text-xs font-bold", "Asisten Cerdas Tani"));
    aiTop.appendChild(el("h3", "text-xl font-extrabold", "Butuh Saran Budidaya atau Cek Daun?"));
    aiTop.appendChild(el("p", "text-sm text-green-100", "Gunakan AgroAI untuk rekomendasi pemupukan & jadwal, atau AI Plant Analyzer untuk unggah foto tanaman."));
    aiCard.appendChild(aiTop);

    const aiBtns = el("div", "flex flex-wrap gap-2");
    const b1 = el("button", "px-4 py-2.5 rounded-xl bg-[#EAB308] text-green-950 text-xs font-extrabold hover:bg-amber-400 transition", "Buka AgroAI");
    b1.type = "button";
    b1.addEventListener("click", () => navigateTo("agroai"));
    const b2 = el("button", "px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition", "Plant Analyzer");
    b2.type = "button";
    b2.addEventListener("click", () => navigateTo("analyzer"));
    aiBtns.appendChild(b1);
    aiBtns.appendChild(b2);
    aiCard.appendChild(aiBtns);
    bottomGrid.appendChild(aiCard);

    root.appendChild(bottomGrid);

    requestAnimationFrame(() => {
      const cropLabels = state.harvests.map((h) => getCropName(h.cropId));
      const cropWeights = state.harvests.map((h) => h.weightKg);
      drawBarChart("chart-harvest-crop", cropLabels.length ? cropLabels : ["Belum Ada"], cropWeights.length ? cropWeights : [0], "#166534");

      drawBarChart(
        "chart-finance-summary",
        ["Modal", "Pengeluaran", "Pendapatan", "Laba"],
        [
          Number((fin.modalTotal / 1000000).toFixed(1)),
          Number((fin.expenseTotal / 1000000).toFixed(1)),
          Number((fin.incomeTotal / 1000000).toFixed(1)),
          Number((Math.max(0, fin.profit) / 1000000).toFixed(1))
        ],
        "#166534"
      );
    });
  }

  // 2. LAND MANAGEMENT
  function renderLands(root, actions) {
    const addBtn = el("button", "px-4 py-2.5 rounded-xl bg-[#166534] text-white text-xs sm:text-sm font-bold hover:bg-green-800 transition", "+ Tambah Lahan");
    addBtn.type = "button";
    addBtn.addEventListener("click", () => openLandModal(null));
    actions.appendChild(addBtn);

    const q = state.searchQuery.trim().toLowerCase();
    const list = state.lands.filter((l) => !q || l.name.toLowerCase().includes(q) || l.soilType.toLowerCase().includes(q) || l.status.toLowerCase().includes(q));

    if (!list.length) {
      root.appendChild(el("div", "bg-white p-8 rounded-3xl border border-green-900/10 text-center text-sm text-stone-500", "Tidak ada data lahan yang cocok dengan pencarian."));
      return;
    }

    const grid = el("div", "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5");
    list.forEach((land) => {
      const card = el("div", "bg-white p-5 rounded-3xl border border-green-900/10 shadow-sm flex flex-col justify-between space-y-4");
      const top = el("div", "space-y-2");
      const head = el("div", "flex items-start justify-between gap-2");
      head.appendChild(el("h3", "font-extrabold text-lg text-stone-900", land.name));
      head.appendChild(el("span", "px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-[#166534] shrink-0", land.status));
      top.appendChild(head);

      top.appendChild(el("p", "text-2xl font-extrabold text-[#166534]", `${Number(land.areaHa).toFixed(1)} Hektare`));
      top.appendChild(el("p", "text-xs text-stone-600", `Jenis Tanah: ${land.soilType} • pH ${land.soilPh}`));
      top.appendChild(el("p", "text-xs text-stone-600", `Irigasi: ${land.irrigation}`));
      top.appendChild(el("p", "text-xs text-stone-500 bg-[#F8FAF5] p-3 rounded-xl", land.notes || "Tanpa catatan tambahan."));
      card.appendChild(top);

      const btns = el("div", "flex flex-wrap gap-2 pt-2 border-t border-stone-100");
      const detailBtn = el("button", "px-3 py-1.5 rounded-xl bg-[#F8FAF5] hover:bg-green-50 text-[#166534] text-xs font-bold border border-green-900/15", "Detail");
      detailBtn.type = "button";
      detailBtn.addEventListener("click", () => openLandDetailModal(land));

      const editBtn = el("button", "px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-bold", "Edit");
      editBtn.type = "button";
      editBtn.addEventListener("click", () => openLandModal(land));

      const delBtn = el("button", "px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold", "Hapus");
      delBtn.type = "button";
      delBtn.addEventListener("click", () => confirmDeleteModal(`Hapus lahan "${land.name}"?`, () => {
        state.lands = state.lands.filter((x) => x.id !== land.id);
        saveState();
        renderWorkspace();
        showToast("Lahan berhasil dihapus.", "success");
      }));

      btns.appendChild(detailBtn);
      btns.appendChild(editBtn);
      btns.appendChild(delBtn);
      card.appendChild(btns);
      grid.appendChild(card);
    });
    root.appendChild(grid);
  }

  function openLandModal(existing) {
    openModal(existing ? "Edit Data Lahan" : "Tambah Lahan Baru", (body) => {
      const form = el("form", "space-y-3");

      const fName = makeInputField("Nama Blok Lahan", "text", existing ? existing.name : "", "Contoh: Blok Jagung D4");
      const fArea = makeInputField("Luas Lahan (Hektare)", "number", existing ? String(existing.areaHa) : "1.0", "0.5");
      fArea.input.step = "0.1";
      fArea.input.min = "0.1";
      const fSoil = makeInputField("Jenis Tanah", "text", existing ? existing.soilType : "Lempung Subur", "Lempung / Alluvial");
      const fPh = makeInputField("pH Tanah", "number", existing ? String(existing.soilPh) : "6.5", "6.5");
      fPh.input.step = "0.1";
      fPh.input.min = "3.0";
      fPh.input.max = "9.5";
      const fIrr = makeInputField("Sistem Irigasi", "text", existing ? existing.irrigation : "Irigasi Tetes", "Irigasi Tetes / Sprinkler");
      const fStatus = makeSelectField("Status Lahan", ["Aktif Produktif", "Masa Tanam", "Siap Panen", "Istirahat / Olah Tanah"], existing ? existing.status : "Aktif Produktif");
      const fNotes = makeInputField("Catatan Kondisi", "text", existing ? existing.notes : "", "Catatan drainase atau akses jalan");

      [fName.wrap, fArea.wrap, fSoil.wrap, fPh.wrap, fIrr.wrap, fStatus.wrap, fNotes.wrap].forEach((w) => form.appendChild(w));

      const submitBtn = el("button", "w-full py-3 rounded-xl bg-[#166534] text-white font-bold text-sm hover:bg-green-800 transition", existing ? "Simpan Perubahan" : "Simpan Lahan");
      submitBtn.type = "submit";
      form.appendChild(submitBtn);

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nameVal = fName.input.value.trim();
        const areaVal = parseFloat(fArea.input.value);
        if (!nameVal || isNaN(areaVal) || areaVal <= 0) {
          showToast("Nama lahan dan luas (> 0 Ha) wajib diisi.", "warn");
          return;
        }
        const payload = {
          id: existing ? existing.id : uid("LHN"),
          name: nameVal,
          areaHa: areaVal,
          soilType: fSoil.input.value.trim() || "Lempung",
          soilPh: parseFloat(fPh.input.value) || 6.5,
          irrigation: fIrr.input.value.trim() || "Manual",
          status: fStatus.select.value,
          notes: fNotes.input.value.trim()
        };
        if (existing) {
          state.lands = state.lands.map((l) => (l.id === existing.id ? payload : l));
          showToast("Data lahan diperbarui.", "success");
        } else {
          state.lands.unshift(payload);
          showToast("Lahan baru ditambahkan.", "success");
        }
        saveState();
        closeModal();
        renderWorkspace();
      });

      body.appendChild(form);
    });
  }

  function openLandDetailModal(land) {
    openModal(`Detail Lahan: ${land.name}`, (body) => {
      const box = el("div", "space-y-2 text-sm");
      box.appendChild(el("p", "", `Kode Lahan: ${land.id}`));
      box.appendChild(el("p", "", `Luas: ${Number(land.areaHa).toFixed(1)} Ha`));
      box.appendChild(el("p", "", `Jenis Tanah: ${land.soilType} (pH ${land.soilPh})`));
      box.appendChild(el("p", "", `Sistem Irigasi: ${land.irrigation}`));
      box.appendChild(el("p", "", `Status: ${land.status}`));
      box.appendChild(el("p", "text-stone-600", `Catatan: ${land.notes || "-"}`));

      const relatedCrops = state.crops.filter((c) => c.landId === land.id);
      box.appendChild(el("p", "font-bold pt-2 text-[#166534]", `Tanaman Terkait (${relatedCrops.length}):`));
      if (relatedCrops.length) {
        relatedCrops.forEach((c) => box.appendChild(el("p", "text-xs text-stone-700", `• ${c.name} (${c.stage})`)));
      } else {
        box.appendChild(el("p", "text-xs text-stone-500", "Belum ada tanaman tercatat pada lahan ini."));
      }
      body.appendChild(box);
    });
  }

  // 3. CROPS & PLANTING HISTORY
  function renderCrops(root, actions) {
    const addBtn = el("button", "px-4 py-2.5 rounded-xl bg-[#166534] text-white text-xs sm:text-sm font-bold hover:bg-green-800 transition", "+ Catat Tanaman");
    addBtn.type = "button";
    addBtn.addEventListener("click", () => openCropModal());
    actions.appendChild(addBtn);

    const grid = el("div", "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5");
    state.crops.forEach((crop) => {
      const card = el("div", "bg-white p-5 rounded-3xl border border-green-900/10 shadow-sm space-y-3");
      card.appendChild(el("div", "flex items-center justify-between gap-2", "")).append(
        el("h3", "font-extrabold text-lg text-stone-900", crop.name),
        el("span", "px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900", crop.stage)
      );
      card.appendChild(el("p", "text-xs font-semibold text-[#166534]", `Lahan: ${getLandName(crop.landId)} • Varietas: ${crop.variety}`));
      card.appendChild(el("p", "text-xs text-stone-600", `Tanam: ${crop.plantedDate} → Perkiraan Panen: ${crop.expectedHarvest}`));
      card.appendChild(el("p", "text-xs text-stone-600 bg-[#F8FAF5] p-3 rounded-xl", `Riwayat: ${crop.history}`));

      const delBtn = el("button", "text-xs font-bold text-red-700 hover:underline", "Hapus Catatan");
      delBtn.type = "button";
      delBtn.addEventListener("click", () => {
        state.crops = state.crops.filter((c) => c.id !== crop.id);
        saveState();
        renderWorkspace();
        showToast("Data tanaman dihapus.", "success");
      });
      card.appendChild(delBtn);
      grid.appendChild(card);
    });
    root.appendChild(grid);
  }

  function openCropModal() {
    openModal("Tambah Tanaman & Riwayat Tanam", (body) => {
      const form = el("form", "space-y-3");
      const landOptions = state.lands.map((l) => l.id);
      const fLand = makeSelectField("Pilih Lahan", landOptions.length ? landOptions : ["LHN-01"], landOptions[0] || "LHN-01");
      const fName = makeInputField("Nama Tanaman", "text", "", "Contoh: Jagung Manis");
      const fVar = makeInputField("Varietas", "text", "", "Contoh: Bonanza F1");
      const fPlanted = makeInputField("Tanggal Tanam", "date", "2026-11-27", "");
      const fHarvest = makeInputField("Perkiraan Panen", "date", "2027-02-15", "");
      const fStage = makeSelectField("Fase Pertumbuhan", ["Semai / Bibit", "Vegetatif Awal", "Berbunga & Berbuah", "Pengisian Bulir", "Pematangan Buah", "Siap Panen"], "Vegetatif Awal");
      const fHist = makeInputField("Riwayat Olah Tanah & Pemupukan", "text", "", "Catat perlakuan awal tanam");

      [fLand.wrap, fName.wrap, fVar.wrap, fPlanted.wrap, fHarvest.wrap, fStage.wrap, fHist.wrap].forEach((w) => form.appendChild(w));

      const btn = el("button", "w-full py-3 rounded-xl bg-[#166534] text-white font-bold text-sm hover:bg-green-800 transition", "Simpan Tanaman");
      btn.type = "submit";
      form.appendChild(btn);

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!fName.input.value.trim()) {
          showToast("Nama tanaman wajib diisi.", "warn");
          return;
        }
        state.crops.unshift({
          id: uid("CRP"),
          landId: fLand.select.value,
          name: fName.input.value.trim(),
          variety: fVar.input.value.trim() || "Lokal Unggul",
          plantedDate: fPlanted.input.value || "2026-11-27",
          expectedHarvest: fHarvest.input.value || "2027-02-01",
          stage: fStage.select.value,
          history: fHist.input.value.trim() || "Persiapan lahan standar."
        });
        saveState();
        closeModal();
        renderWorkspace();
        showToast("Tanaman berhasil dicatat.", "success");
      });
      body.appendChild(form);
    });
  }

  // 4. SCHEDULES
  function renderSchedules(root, actions) {
    const addBtn = el("button", "px-4 py-2.5 rounded-xl bg-[#166534] text-white text-xs sm:text-sm font-bold hover:bg-green-800 transition", "+ Buat Jadwal");
    addBtn.type = "button";
    addBtn.addEventListener("click", () => openScheduleModal());
    actions.appendChild(addBtn);

    const filterRow = el("div", "flex flex-wrap gap-2");
    ["all", "Penyiraman", "Pemupukan", "Perawatan", "Panen"].forEach((cat) => {
      const b = el("button", `px-3.5 py-2 rounded-xl text-xs font-bold border transition ${state.filterCategory === cat ? "bg-[#166534] text-white border-[#166534]" : "bg-white text-stone-700 border-green-900/15 hover:bg-green-50"}`, cat === "all" ? "Semua Jenis" : cat);
      b.type = "button";
      b.addEventListener("click", () => {
        state.filterCategory = cat;
        renderWorkspace();
      });
      filterRow.appendChild(b);
    });
    root.appendChild(filterRow);

    const items = state.schedules.filter((s) => state.filterCategory === "all" || s.type === state.filterCategory);
    const listWrap = el("div", "space-y-3");

    items.forEach((s) => {
      const row = el("div", "bg-white p-4 rounded-2xl border border-green-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3");
      const left = el("div", "space-y-1");
      left.appendChild(el("p", `font-extrabold text-sm ${s.done ? "line-through text-stone-400" : "text-stone-900"}`, `${s.title} (${s.type})`));
      left.appendChild(el("p", "text-xs text-stone-500", `${s.date} pukul ${s.time} • ${getLandName(s.landId)}`));
      left.appendChild(el("p", "text-xs text-stone-600", s.notes));
      row.appendChild(left);

      const right = el("div", "flex items-center gap-2 shrink-0");
      const toggleBtn = el("button", `px-3.5 py-2 rounded-xl text-xs font-bold transition ${s.done ? "bg-stone-100 text-stone-700" : "bg-[#EAB308] text-green-950 hover:bg-amber-400"}`, s.done ? "Batalkan Selesai" : "Tandai Selesai");
      toggleBtn.type = "button";
      toggleBtn.addEventListener("click", () => {
        s.done = !s.done;
        saveState();
        renderWorkspace();
        showToast(s.done ? "Jadwal ditandai selesai." : "Status jadwal diperbarui.", "success");
      });

      const delBtn = el("button", "px-3 py-2 rounded-xl text-xs font-bold bg-red-50 text-red-700 hover:bg-red-100", "Hapus");
      delBtn.type = "button";
      delBtn.addEventListener("click", () => {
        state.schedules = state.schedules.filter((x) => x.id !== s.id);
        saveState();
        renderWorkspace();
        showToast("Jadwal dihapus.", "success");
      });

      right.appendChild(toggleBtn);
      right.appendChild(delBtn);
      row.appendChild(right);
      listWrap.appendChild(row);
    });

    root.appendChild(listWrap);
  }

  function openScheduleModal(presetDate = "2026-11-28") {
    openModal("Tambah Jadwal Pertanian", (body) => {
      const form = el("form", "space-y-3");
      const fTitle = makeInputField("Judul Aktivitas", "text", "", "Contoh: Pemupukan Organik Blok A1");
      const fType = makeSelectField("Jenis Aktivitas", ["Penyiraman", "Pemupukan", "Perawatan", "Panen"], "Penyiraman");
      const landIds = state.lands.map((l) => l.id);
      const fLand = makeSelectField("Lahan", landIds.length ? landIds : ["LHN-01"], landIds[0] || "LHN-01");
      const fDate = makeInputField("Tanggal", "date", presetDate, "");
      const fTime = makeInputField("Jam", "time", "07:00", "");
      const fNotes = makeInputField("Catatan Pelaksanaan", "text", "", "Dosis, alat, atau instruksi khusus");

      [fTitle.wrap, fType.wrap, fLand.wrap, fDate.wrap, fTime.wrap, fNotes.wrap].forEach((w) => form.appendChild(w));
      const btn = el("button", "w-full py-3 rounded-xl bg-[#166534] text-white font-bold text-sm hover:bg-green-800 transition", "Simpan Jadwal");
      btn.type = "submit";
      form.appendChild(btn);

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!fTitle.input.value.trim()) {
          showToast("Judul aktivitas wajib diisi.", "warn");
          return;
        }
        state.schedules.unshift({
          id: uid("SCH"),
          title: fTitle.input.value.trim(),
          type: fType.select.value,
          landId: fLand.select.value,
          date: fDate.input.value || "2026-11-28",
          time: fTime.input.value || "07:00",
          done: false,
          notes: fNotes.input.value.trim()
        });
        state.notifications.unshift({
          id: uid("NTF"),
          title: `Jadwal Baru: ${fTitle.input.value.trim()}`,
          desc: `Dijadwalkan pada ${fDate.input.value} pukul ${fTime.input.value}.`,
          time: "Baru saja",
          read: false
        });
        saveState();
        closeModal();
        renderWorkspace();
        showToast("Jadwal & pengingat ditambahkan.", "success");
      });
      body.appendChild(form);
    });
  }

  // 5. CALENDAR
  function renderCalendar(root, actions) {
    const addBtn = el("button", "px-4 py-2.5 rounded-xl bg-[#EAB308] text-green-950 text-xs sm:text-sm font-bold hover:bg-amber-400 transition", "+ Pengingat Tanggal");
    addBtn.type = "button";
    addBtn.addEventListener("click", () => openScheduleModal("2026-11-29"));
    actions.appendChild(addBtn);

    const card = el("div", "bg-white p-5 rounded-3xl border border-green-900/10 shadow-sm space-y-4");
    card.appendChild(el("h3", "font-extrabold text-stone-900", "Kalender Jadwal November 2026"));

    const calGrid = el("div", "grid grid-cols-7 gap-2 text-center text-xs");
    ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].forEach((d) => {
      calGrid.appendChild(el("div", "font-extrabold text-stone-400 py-1", d));
    });

    // Nov 1, 2026 is Sunday (offset 0)
    for (let day = 1; day <= 30; day++) {
      const dateStr = `2026-11-${String(day).padStart(2, "0")}`;
      const dayEvents = state.schedules.filter((s) => s.date === dateStr);
      const cell = el("button", `p-2 rounded-2xl border min-h-[64px] flex flex-col items-start justify-between text-left transition ${dayEvents.length ? "bg-green-50/80 border-[#166534]/30 hover:bg-green-100" : "bg-[#F8FAF5] border-stone-100 hover:bg-stone-100"}`);
      cell.type = "button";
      cell.appendChild(el("span", "font-extrabold text-stone-800", String(day)));
      if (dayEvents.length) {
        cell.appendChild(el("span", "px-1.5 py-0.5 rounded bg-[#166534] text-white text-[10px] font-bold truncate w-full", `${dayEvents.length} tugas`));
      }
      cell.addEventListener("click", () => {
        openModal(`Agenda Tanggal ${dateStr}`, (body) => {
          if (!dayEvents.length) {
            body.appendChild(el("p", "text-sm text-stone-600", "Belum ada jadwal pada tanggal ini."));
          } else {
            dayEvents.forEach((ev) => {
              body.appendChild(el("div", "p-3 rounded-xl bg-[#F8FAF5] border border-green-900/10 text-sm font-semibold", `${ev.time} — ${ev.title} (${ev.type})`));
            });
          }
          const addForDay = el("button", "mt-3 w-full py-2.5 rounded-xl bg-[#166534] text-white text-xs font-bold", "+ Tambah Jadwal di Tanggal Ini");
          addForDay.type = "button";
          addForDay.addEventListener("click", () => {
            closeModal();
            openScheduleModal(dateStr);
          });
          body.appendChild(addForDay);
        });
      });
      calGrid.appendChild(cell);
    }

    card.appendChild(calGrid);
    root.appendChild(card);
  }

  // 6. GROWTH MONITORING
  function renderGrowth(root, actions) {
    const addBtn = el("button", "px-4 py-2.5 rounded-xl bg-[#166534] text-white text-xs sm:text-sm font-bold hover:bg-green-800 transition", "+ Catat Pertumbuhan");
    addBtn.type = "button";
    addBtn.addEventListener("click", () => openGrowthModal());
    actions.appendChild(addBtn);

    const grid = el("div", "grid grid-cols-1 md:grid-cols-2 gap-4");
    state.growthLogs.forEach((g) => {
      const card = el("div", "bg-white p-5 rounded-3xl border border-green-900/10 shadow-sm space-y-2");
      card.appendChild(el("div", "flex items-center justify-between", "")).append(
        el("h3", "font-extrabold text-stone-900", getCropName(g.cropId)),
        el("span", "text-xs font-bold text-[#166534]", g.date)
      );
      card.appendChild(el("p", "text-sm font-bold text-stone-800", `Tinggi: ${g.heightCm} cm • Kesehatan: ${g.healthScore}/100 • Kelembapan: ${g.moisturePct}%`));
      card.appendChild(el("p", "text-xs text-stone-600", g.note));
      grid.appendChild(card);
    });
    root.appendChild(grid);
  }

  function openGrowthModal() {
    openModal("Catat Pemantauan Pertumbuhan", (body) => {
      const form = el("form", "space-y-3");
      const cropIds = state.crops.map((c) => c.id);
      const fCrop = makeSelectField("Tanaman", cropIds.length ? cropIds : ["CRP-01"], cropIds[0] || "CRP-01");
      const fDate = makeInputField("Tanggal", "date", "2026-11-27", "");
      const fHeight = makeInputField("Tinggi Tanaman (cm)", "number", "75", "75");
      const fHealth = makeInputField("Skor Kesehatan (1-100)", "number", "90", "90");
      const fMoist = makeInputField("Kelembapan Tanah (%)", "number", "68", "68");
      const fNote = makeInputField("Catatan Observasi", "text", "", "Kondisi daun, tunas, atau hama");

      [fCrop.wrap, fDate.wrap, fHeight.wrap, fHealth.wrap, fMoist.wrap, fNote.wrap].forEach((w) => form.appendChild(w));
      const btn = el("button", "w-full py-3 rounded-xl bg-[#166534] text-white font-bold text-sm hover:bg-green-800 transition", "Simpan Log Pertumbuhan");
      btn.type = "submit";
      form.appendChild(btn);

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        state.growthLogs.unshift({
          id: uid("GRW"),
          cropId: fCrop.select.value,
          date: fDate.input.value || "2026-11-27",
          heightCm: Number(fHeight.input.value) || 0,
          healthScore: Math.min(100, Math.max(0, Number(fHealth.input.value) || 80)),
          moisturePct: Math.min(100, Math.max(0, Number(fMoist.input.value) || 65)),
          note: fNote.input.value.trim() || "Pemantauan rutin."
        });
        saveState();
        closeModal();
        renderWorkspace();
        showToast("Log pertumbuhan tersimpan.", "success");
      });
      body.appendChild(form);
    });
  }

  // 7. AGROAI CONSULTATION
  function generateAgroAIReply(promptText) {
    const q = promptText.toLowerCase();
    if (q.includes("pupuk") || q.includes("npk") || q.includes("urea")) {
      return "Rekomendasi Pemupukan: Terapkan pemupukan berimbang berbasis kebutuhan fase tumbuh (vegetatif kaya nitrogen, generatif/pembuahan dorong kalium & fosfat). Aplikasikan saat tanah lembap pada pagi/sore hari dan kombinasikan dengan bahan organik agar tidak mudah tercuci.";
    }
    if (q.includes("hama") || q.includes("kutu") || q.includes("ulat") || q.includes("jamur") || q.includes("busuk")) {
      return "Langkah Pengendalian Hama/Penyakit: Isolasi bagian tanaman yang terinfeksi berat, perbaiki sirkulasi udara & drainase, gunakan perangkap atau pestisida nabati/selektif sesuai ambang kendali, serta catat gejalanya di menu AI Plant Analyzer.";
    }
    if (q.includes("air") || q.includes("siram") || q.includes("irigasi") || q.includes("kemarau")) {
      return "Manajemen Air: Siram pada pagi hari (06.00–08.00) untuk menekan penguapan dan risiko embun berlebih di malam hari. Gunakan mulsa organik atau irigasi tetes untuk menjaga kelembapan zona akar.";
    }
    if (q.includes("panen") || q.includes("harga") || q.includes("jual")) {
      return "Optimasi Panen & Pemasaran: Lakukan panen pada tingkat kematangan tepat sesuai tujuan distribusi (pasar lokal vs jarak jauh), pisahkan sortasi grade, lalu cantumkan stok aktif di AgroMarket agar margin usaha tani optimal.";
    }
    return `Analisis AgroAI untuk "${promptText}": Berdasarkan ${state.lands.length} lahan aktif dan ${state.crops.length} komoditas tercatat, pastikan pH tanah berada di kisaran 6,0–7,0, cek kelembapan tanah secara berkala, dan jadwalkan pemupukan/penyiraman di menu Jadwal. Untuk jawaban model LLM langsung, hubungkan endpoint backend aman di menu Profil & Integrasi.`;
  }

  function renderAgroAI(root, actions) {
    const clearChatBtn = el("button", "px-4 py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-bold hover:bg-stone-200 transition", "Reset Chat");
    clearChatBtn.type = "button";
    clearChatBtn.addEventListener("click", () => {
      state.chatHistory = [DEFAULT_STATE.chatHistory[0]];
      saveState();
      renderWorkspace();
      showToast("Riwayat percakapan AgroAI direset.", "info");
    });
    actions.appendChild(clearChatBtn);

    const card = el("div", "bg-white rounded-3xl border border-green-900/10 shadow-sm p-5 space-y-4");

    const promptChips = el("div", "flex flex-wrap gap-2");
    ["Cara pemupukan susulan cabai & padi", "Tips mengatasi hama daun dan kelembapan", "Jadwal penyiraman efisien saat cuaca panas"].forEach((sample) => {
      const chip = el("button", "px-3 py-1.5 rounded-full bg-[#F8FAF5] hover:bg-green-50 border border-green-900/15 text-xs font-semibold text-[#166534]", sample);
      chip.type = "button";
      chip.addEventListener("click", () => {
        sendAgroAIMessage(sample);
      });
      promptChips.appendChild(chip);
    });
    card.appendChild(promptChips);

    const chatBox = el("div", "space-y-3 max-h-[380px] overflow-y-auto p-3 rounded-2xl bg-[#F8FAF5] border border-green-900/10");
    chatBox.id = "agroai-messages";
    state.chatHistory.forEach((msg) => {
      const isUser = msg.sender === "user";
      const bubble = el("div", `p-3.5 rounded-2xl max-w-[85%] text-sm leading-relaxed ${isUser ? "ml-auto bg-[#166534] text-white" : "bg-white border border-green-900/10 text-stone-800"}`);
      bubble.appendChild(el("p", `text-[10px] font-extrabold uppercase mb-1 ${isUser ? "text-amber-300" : "text-[#166534]"}`, isUser ? "Anda" : "AgroAI"));
      bubble.appendChild(el("p", "", msg.text));
      chatBox.appendChild(bubble);
    });
    card.appendChild(chatBox);

    const form = el("form", "flex gap-2");
    const input = el("input", "flex-1 px-4 py-3 rounded-xl border border-green-900/15 text-sm focus:outline-none focus:border-[#166534]");
    input.type = "text";
    input.placeholder = "Tulis pertanyaan pertanian Anda di sini...";
    const sendBtn = el("button", "px-5 py-3 rounded-xl bg-[#EAB308] text-green-950 font-extrabold text-sm hover:bg-amber-400 transition shrink-0", "Kirim");
    sendBtn.type = "submit";
    form.appendChild(input);
    form.appendChild(sendBtn);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val) return;
      input.value = "";
      sendAgroAIMessage(val);
    });

    card.appendChild(form);
    root.appendChild(card);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function sendAgroAIMessage(text) {
    state.chatHistory.push({ id: uid("MSG"), sender: "user", text });
    const reply = generateAgroAIReply(text);
    state.chatHistory.push({ id: uid("MSG"), sender: "ai", text: reply });
    saveState();
    renderWorkspace();
  }

  // 8. AI PLANT ANALYZER
  function renderPlantAnalyzer(root) {
    const card = el("div", "bg-white rounded-3xl border border-green-900/10 shadow-sm p-6 space-y-5");
    card.appendChild(el("p", "text-xs text-amber-900 bg-amber-50 border border-amber-200 p-3.5 rounded-2xl font-medium", "Catatan: Fitur ini melakukan analisis awal karakteristik citra daun/tanaman di browser dan bukan pengganti diagnosis laboratorium patologi tumbuhan."));

    const uploadGrid = el("div", "grid grid-cols-1 md:grid-cols-2 gap-6 items-start");
    const left = el("div", "space-y-4");

    const fileLabel = el("label", "block p-6 rounded-2xl border-2 border-dashed border-[#166534]/30 bg-[#F8FAF5] hover:bg-green-50/50 cursor-pointer text-center space-y-2 transition");
    fileLabel.appendChild(el("p", "text-2xl", "🌿"));
    fileLabel.appendChild(el("p", "text-sm font-bold text-[#166534]", "Pilih Foto Daun atau Tanaman"));
    fileLabel.appendChild(el("p", "text-xs text-stone-500", "Format PNG, JPG, atau WebP (maks. 5 MB)"));
    const fileInput = el("input", "hidden");
    fileInput.type = "file";
    fileInput.accept = "image/png,image/jpeg,image/webp";
    fileLabel.appendChild(fileInput);
    left.appendChild(fileLabel);

    const previewBox = el("div", "rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 min-h-[200px] flex items-center justify-center");
    previewBox.id = "plant-preview-box";
    previewBox.appendChild(el("span", "text-xs text-stone-400", "Pratinjau foto akan tampil di sini"));
    left.appendChild(previewBox);

    const analyzeBtn = el("button", "w-full py-3 rounded-xl bg-[#166534] text-white font-bold text-sm hover:bg-green-800 transition", "Jalankan Analisis Awal");
    analyzeBtn.type = "button";
    left.appendChild(analyzeBtn);

    const right = el("div", "bg-[#F8FAF5] p-5 rounded-2xl border border-green-900/10 space-y-3");
    right.id = "plant-analysis-result";
    right.appendChild(el("h3", "font-extrabold text-stone-900", "Hasil Analisis Awal"));
    right.appendChild(el("p", "text-sm text-stone-600", "Unggah foto tanaman lalu klik "Jalankan Analisis Awal" untuk melihat estimasi kondisi klorofil, potensi stres daun, dan langkah pencegahan."));

    let loadedImage = null;
    fileInput.addEventListener("change", () => {
      const file = fileInput.files && fileInput.files[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) {
        showToast("Ukuran gambar maksimal 5 MB.", "warn");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          loadedImage = img;
          clearEl(previewBox);
          const disp = el("img", "w-full max-h-64 object-contain");
          disp.src = String(reader.result || "");
          disp.alt = "Foto tanaman yang diunggah";
          previewBox.appendChild(disp);
        };
        img.src = String(reader.result || "");
      };
      reader.readAsDataURL(file);
    });

    analyzeBtn.addEventListener("click", () => {
      clearEl(right);
      right.appendChild(el("h3", "font-extrabold text-stone-900", "Hasil Analisis Awal"));
      if (!loadedImage) {
        right.appendChild(el("p", "text-sm text-amber-800", "Silakan pilih foto tanaman terlebih dahulu."));
        return;
      }
      // Sample pixel brightness/greenness safely on offscreen canvas
      const off = document.createElement("canvas");
      off.width = 64;
      off.height = 64;
      const octx = off.getContext("2d");
      octx.drawImage(loadedImage, 0, 0, 64, 64);
      const data = octx.getImageData(0, 0, 64, 64).data;
      let greenDominance = 0;
      let totalPixels = data.length / 4;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 1] > data[i] + 8 && data[i + 1] > data[i + 2] + 6) {
          greenDominance++;
        }
      }
      const greenPct = Math.round((greenDominance / totalPixels) * 100);
      const statusLabel = greenPct >= 35 ? "Dominasi Hijau Sehat" : "Perlu Observasi Bercak / Klorosis";
      const recText = greenPct >= 35
        ? "Sebaran warna hijau cukup dominan. Pertahankan kelembapan tanah, pantau sisi bawah daun dari kutu/tungau, dan ikuti jadwal pemupukan berkala."
        : "Terdeteksi proporsi non-hijau/kuning/gelap yang cukup tinggi pada citra. Periksa kemungkinan defisiensi hara, bercak daun, atau pencahayaan saat pemotretan.";

      right.appendChild(el("p", "text-lg font-extrabold text-[#166534]", `${statusLabel} (${greenPct}% piksel hijau dominan)`));
      right.appendChild(el("p", "text-sm text-stone-700 leading-relaxed", recText));
      right.appendChild(el("p", "text-xs text-stone-500 pt-2 border-t border-stone-200", `Resolusi citra: ${loadedImage.naturalWidth} × ${loadedImage.naturalHeight} px.`));
      showToast("Analisis awal foto selesai.", "success");
    });

    uploadGrid.appendChild(left);
    uploadGrid.appendChild(right);
    card.appendChild(uploadGrid);
    root.appendChild(card);
  }

  // 9. WEATHER
  function renderWeather(root) {
    const loc = state.profile.location || "Lokasi Kebun";
    const hero = el("div", "bg-gradient-to-r from-[#166534] to-green-800 text-white p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4");
    const left = el("div", "space-y-1");
    left.appendChild(el("p", "text-xs font-bold uppercase tracking-wider text-amber-300", `Prakiraan Cuaca • ${loc}`));
    left.appendChild(el("p", "text-3xl font-extrabold", "29°C • Cerah Berawan"));
    left.appendChild(el("p", "text-sm text-green-100", "Kelembapan udara 76% • Kecepatan angin 11 km/jam • Peluang hujan sore 45%"));
    hero.appendChild(left);
    hero.appendChild(el("div", "text-5xl", "🌤️"));
    root.appendChild(hero);

    const forecast = [
      { day: "Jumat", icon: "⛅", temp: "24°–30°C", rain: "45%", advice: "Cocok untuk inspeksi kebun pagi." },
      { day: "Sabtu", icon: "🌦️", temp: "23°–28°C", rain: "70%", advice: "Kurangi siraman manual sore hari." },
      { day: "Minggu", icon: "☀️", temp: "25°–31°C", rain: "20%", advice: "Baik untuk aplikasi pupuk daun pagi." },
      { day: "Senin", icon: "⛅", temp: "24°–30°C", rain: "35%", advice: "Pantau drainase blok dataran rendah." },
      { day: "Selasa", icon: "🌧️", temp: "22°–27°C", rain: "80%", advice: "Tunda penyemprotan saat hujan turun." }
    ];

    const grid = el("div", "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4");
    forecast.forEach((f) => {
      const card = el("div", "bg-white p-4 rounded-2xl border border-green-900/10 shadow-sm space-y-2");
      card.appendChild(el("div", "flex items-center justify-between", "")).append(
        el("span", "font-extrabold text-stone-900", f.day),
        el("span", "text-2xl", f.icon)
      );
      card.appendChild(el("p", "text-sm font-bold text-[#166534]", f.temp));
      card.appendChild(el("p", "text-xs text-stone-500", `Curah hujan: ${f.rain}`));
      card.appendChild(el("p", "text-xs text-stone-600", f.advice));
      grid.appendChild(card);
    });
    root.appendChild(grid);
  }

  // 10. HARVESTS
  function renderHarvests(root, actions) {
    const addBtn = el("button", "px-4 py-2.5 rounded-xl bg-[#166534] text-white text-xs sm:text-sm font-bold hover:bg-green-800 transition", "+ Catat Hasil Panen");
    addBtn.type = "button";
    addBtn.addEventListener("click", () => openHarvestModal());
    actions.appendChild(addBtn);

    const totalKg = computeTotalHarvestKg();
    const totalVal = state.harvests.reduce((s, h) => s + (Number(h.weightKg) || 0) * (Number(h.pricePerKg) || 0), 0);
    const kpi = el("div", "grid grid-cols-1 sm:grid-cols-2 gap-4");
    kpi.appendChild(makeKpiCard("Akumulasi Bobot Panen", `${formatNumber(totalKg)} Kg`, "Seluruh komoditas tercatat", true));
    kpi.appendChild(makeKpiCard("Estimasi Nilai Panen", formatRupiah(totalVal), "Berdasarkan harga satuan tercatat"));
    root.appendChild(kpi);

    const list = el("div", "space-y-3");
    state.harvests.forEach((h) => {
      const row = el("div", "bg-white p-4 rounded-2xl border border-green-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3");
      const left = el("div", "space-y-1");
      left.appendChild(el("p", "font-extrabold text-stone-900 text-sm", `${getCropName(h.cropId)} — ${formatNumber(h.weightKg)} Kg (${h.grade})`));
      left.appendChild(el("p", "text-xs text-stone-500", `${h.date} • Lahan: ${getLandName(h.landId)} • ${formatRupiah(h.pricePerKg)}/kg`));
      row.appendChild(left);
      row.appendChild(el("span", "font-extrabold text-[#166534] text-sm", formatRupiah((Number(h.weightKg) || 0) * (Number(h.pricePerKg) || 0))));
      list.appendChild(row);
    });
    root.appendChild(list);
  }

  function openHarvestModal() {
    openModal("Catat Hasil Panen", (body) => {
      const form = el("form", "space-y-3");
      const cropIds = state.crops.map((c) => c.id);
      const landIds = state.lands.map((l) => l.id);
      const fCrop = makeSelectField("Komoditas", cropIds.length ? cropIds : ["CRP-01"], cropIds[0] || "CRP-01");
      const fLand = makeSelectField("Lahan", landIds.length ? landIds : ["LHN-01"], landIds[0] || "LHN-01");
      const fDate = makeInputField("Tanggal Panen", "date", "2026-11-27", "");
      const fKg = makeInputField("Berat Panen (Kg)", "number", "250", "250");
      const fGrade = makeSelectField("Kualitas / Grade", ["Grade A", "Grade B", "Gabah Kering", "Curah Standar"], "Grade A");
      const fPrice = makeInputField("Harga per Kg (Rp)", "number", "15000", "15000");

      [fCrop.wrap, fLand.wrap, fDate.wrap, fKg.wrap, fGrade.wrap, fPrice.wrap].forEach((w) => form.appendChild(w));
      const btn = el("button", "w-full py-3 rounded-xl bg-[#166534] text-white font-bold text-sm hover:bg-green-800 transition", "Simpan Hasil Panen");
      btn.type = "submit";
      form.appendChild(btn);

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const kg = Number(fKg.input.value);
        const pr = Number(fPrice.input.value);
        if (isNaN(kg) || kg <= 0) {
          showToast("Berat panen harus lebih dari 0 Kg.", "warn");
          return;
        }
        const cropTitle = getCropName(fCrop.select.value);
        state.harvests.unshift({
          id: uid("HRV"),
          cropId: fCrop.select.value,
          landId: fLand.select.value,
          date: fDate.input.value || "2026-11-27",
          weightKg: kg,
          grade: fGrade.select.value,
          pricePerKg: isNaN(pr) ? 0 : pr
        });
        if (kg > 0 && pr > 0) {
          state.finances.unshift({
            id: uid("FIN"),
            date: fDate.input.value || "2026-11-27",
            type: "Pendapatan",
            category: "Penjualan Panen",
            description: `Panen ${cropTitle} ${formatNumber(kg)} kg`,
            amount: kg * pr
          });
        }
        saveState();
        closeModal();
        renderWorkspace();
        showToast("Hasil panen & pendapatan dicatat.", "success");
      });
      body.appendChild(form);
    });
  }

  // 11. FINANCE
  function renderFinance(root, actions) {
    const addBtn = el("button", "px-4 py-2.5 rounded-xl bg-[#166534] text-white text-xs sm:text-sm font-bold hover:bg-green-800 transition", "+ Transaksi Keuangan");
    addBtn.type = "button";
    addBtn.addEventListener("click", () => openFinanceModal());
    actions.appendChild(addBtn);

    const fin = computeFinanceSummary();
    const grid = el("div", "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4");
    grid.appendChild(makeKpiCard("Modal Tercatat", formatRupiah(fin.modalTotal), "Sumber dana usaha tani"));
    grid.appendChild(makeKpiCard("Total Pengeluaran", formatRupiah(fin.expenseTotal), "Input, tenaga & operasional"));
    grid.appendChild(makeKpiCard("Total Pendapatan", formatRupiah(fin.incomeTotal), "Hasil penjualan komoditas"));
    grid.appendChild(makeKpiCard("Keuntungan Bersih", formatRupiah(fin.profit), "Pendapatan dikurangi pengeluaran", true));
    root.appendChild(grid);

    const list = el("div", "space-y-2.5");
    state.finances.forEach((tx) => {
      const row = el("div", "bg-white p-4 rounded-2xl border border-green-900/10 flex items-center justify-between gap-3");
      const left = el("div", "min-w-0");
      left.appendChild(el("p", "font-bold text-sm text-stone-900 truncate", `${tx.category} — ${tx.description}`));
      left.appendChild(el("p", "text-xs text-stone-500", `${tx.date} • Jenis: ${tx.type}`));
      row.appendChild(left);

      const amtClass = tx.type === "Pendapatan" ? "text-[#166534]" : tx.type === "Pengeluaran" ? "text-red-700" : "text-amber-800";
      row.appendChild(el("span", `font-extrabold text-sm shrink-0 ${amtClass}`, `${tx.type === "Pengeluaran" ? "- " : ""}${formatRupiah(tx.amount)}`));
      list.appendChild(row);
    });
    root.appendChild(list);
  }

  function openFinanceModal() {
    openModal("Catat Transaksi Keuangan", (body) => {
      const form = el("form", "space-y-3");
      const fType = makeSelectField("Jenis Transaksi", ["Modal", "Pengeluaran", "Pendapatan"], "Pengeluaran");
      const fCat = makeInputField("Kategori", "text", "", "Contoh: Pupuk, Irigasi, Penjualan");
      const fDesc = makeInputField("Keterangan", "text", "", "Rincian transaksi");
      const fAmt = makeInputField("Nominal (Rp)", "number", "500000", "500000");
      const fDate = makeInputField("Tanggal", "date", "2026-11-27", "");

      [fType.wrap, fCat.wrap, fDesc.wrap, fAmt.wrap, fDate.wrap].forEach((w) => form.appendChild(w));
      const btn = el("button", "w-full py-3 rounded-xl bg-[#166534] text-white font-bold text-sm hover:bg-green-800 transition", "Simpan Transaksi");
      btn.type = "submit";
      form.appendChild(btn);

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const amt = Number(fAmt.input.value);
        if (isNaN(amt) || amt <= 0) {
          showToast("Nominal transaksi harus lebih dari 0.", "warn");
          return;
        }
        state.finances.unshift({
          id: uid("FIN"),
          date: fDate.input.value || "2026-11-27",
          type: fType.select.value,
          category: fCat.input.value.trim() || fType.select.value,
          description: fDesc.input.value.trim() || "Transaksi kebun",
          amount: amt
        });
        saveState();
        closeModal();
        renderWorkspace();
        showToast("Transaksi keuangan tersimpan.", "success");
      });
      body.appendChild(form);
    });
  }

  // 12. AGROMARKET
  function renderMarket(root, actions) {
    const addBtn = el("button", "px-4 py-2.5 rounded-xl bg-[#EAB308] text-green-950 text-xs sm:text-sm font-bold hover:bg-amber-400 transition", "+ Pasang Produk Tani");
    addBtn.type = "button";
    addBtn.addEventListener("click", () => openMarketModal());
    actions.appendChild(addBtn);

    const grid = el("div", "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5");
    state.marketItems.forEach((item) => {
      const card = el("div", "bg-white p-5 rounded-3xl border border-green-900/10 shadow-sm flex flex-col justify-between space-y-4");
      const top = el("div", "space-y-1.5");
      top.appendChild(el("span", "inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-100 text-[#166534]", item.category));
      top.appendChild(el("h3", "font-extrabold text-lg text-stone-900", item.title));
      top.appendChild(el("p", "text-xs text-stone-500", `Penjual: ${item.seller} • ${item.location}`));
      top.appendChild(el("p", "text-xl font-extrabold text-[#166534] pt-1", `${formatRupiah(item.price)} / ${item.unit}`));
      top.appendChild(el("p", "text-xs font-semibold text-stone-600", `Stok tersedia: ${formatNumber(item.stockKg)} ${item.unit}`));
      card.appendChild(top);

      const orderBtn = el("button", "w-full py-2.5 rounded-xl bg-[#166534] hover:bg-green-800 text-white text-xs font-bold transition", "Ajukan Pesanan (10 Kg)");
      orderBtn.type = "button";
      orderBtn.addEventListener("click", () => {
        const qty = 10;
        if (item.stockKg < qty) {
          showToast("Stok produk tidak mencukupi.", "warn");
          return;
        }
        item.stockKg -= qty;
        saveState();
        renderWorkspace();
        showToast(`Permintaan pesanan ${qty} ${item.unit} ${item.title} dicatat.`, "success");
      });
      card.appendChild(orderBtn);
      grid.appendChild(card);
    });
    root.appendChild(grid);
  }

  function openMarketModal() {
    openModal("Pasang Katalog AgroMarket", (body) => {
      const form = el("form", "space-y-3");
      const fTitle = makeInputField("Nama Komoditas", "text", "", "Contoh: Wortel Brastagi Segar");
      const fCat = makeSelectField("Kategori", ["Sayuran & Cabai", "Padi & Biji-bijian", "Buah & Hortikultura", "Olahan & Organik"], "Sayuran & Cabai");
      const fPrice = makeInputField("Harga per Kg (Rp)", "number", "12000", "12000");
      const fStock = makeInputField("Stok Tersedia (Kg)", "number", "300", "300");
      const fLoc = makeInputField("Lokasi Asal", "text", state.profile.location, "");

      [fTitle.wrap, fCat.wrap, fPrice.wrap, fStock.wrap, fLoc.wrap].forEach((w) => form.appendChild(w));
      const btn = el("button", "w-full py-3 rounded-xl bg-[#166534] text-white font-bold text-sm hover:bg-green-800 transition", "Publikasikan ke Katalog");
      btn.type = "submit";
      form.appendChild(btn);

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!fTitle.input.value.trim()) {
          showToast("Nama komoditas wajib diisi.", "warn");
          return;
        }
        state.marketItems.unshift({
          id: uid("MKT"),
          title: fTitle.input.value.trim(),
          seller: state.profile.farmName || state.profile.name,
          price: Number(fPrice.input.value) || 10000,
          unit: "kg",
          stockKg: Number(fStock.input.value) || 50,
          category: fCat.select.value,
          location: fLoc.input.value.trim() || state.profile.location
        });
        saveState();
        closeModal();
        renderWorkspace();
        showToast("Produk ditambahkan ke AgroMarket.", "success");
      });
      body.appendChild(form);
    });
  }

  // 13. EDUCATION
  function renderEducation(root) {
    const grid = el("div", "grid grid-cols-1 md:grid-cols-3 gap-5");
    state.articles.forEach((art) => {
      const card = el("div", "bg-white p-5 rounded-3xl border border-green-900/10 shadow-sm flex flex-col justify-between space-y-3");
      const top = el("div", "space-y-2");
      top.appendChild(el("div", "flex items-center justify-between text-xs font-bold", "")).append(
        el("span", "text-[#166534]", art.category),
        el("span", "text-stone-400", art.readTime)
      );
      top.appendChild(el("h3", "font-extrabold text-lg text-stone-900", art.title));
      top.appendChild(el("p", "text-sm text-stone-600 leading-relaxed", art.summary));
      card.appendChild(top);

      const readBtn = el("button", "text-xs font-extrabold text-[#166534] hover:underline text-left", "Baca Panduan Lengkap →");
      readBtn.type = "button";
      readBtn.addEventListener("click", () => {
        openModal(art.title, (b) => {
          b.appendChild(el("p", "text-xs font-bold text-[#166534]", `${art.category} • Waktu baca ${art.readTime}`));
          b.appendChild(el("p", "text-sm text-stone-700 leading-relaxed", art.summary));
          b.appendChild(el("p", "text-sm text-stone-700 leading-relaxed", "Terapkan pencatatan rutin di menu Jadwal dan Monitoring Pertumbuhan untuk membandingkan respon tanaman sebelum dan sesudah perlakuan."));
        });
      });
      card.appendChild(readBtn);
      grid.appendChild(card);
    });
    root.appendChild(grid);
  }

  // 14. REPORTS
  function renderReports(root, actions) {
    const printBtn = el("button", "px-4 py-2.5 rounded-xl bg-[#166534] text-white text-xs sm:text-sm font-bold hover:bg-green-800 transition", "Cetak / Simpan PDF");
    printBtn.type = "button";
    printBtn.addEventListener("click", () => window.print());
    actions.appendChild(printBtn);

    const fin = computeFinanceSummary();
    const card = el("div", "bg-white p-6 rounded-3xl border border-green-900/10 shadow-sm space-y-4");
    card.appendChild(el("h3", "text-xl font-extrabold text-stone-900", `Laporan Ringkas Usaha Tani — ${state.profile.farmName}`));
    card.appendChild(el("p", "text-xs text-stone-500", `Pengelola: ${state.profile.name} (${state.profile.role}) • Lokasi: ${state.profile.location}`));

    const summaryLines = [
      `• Total Luas Lahan: ${computeTotalArea().toFixed(1)} Ha (${state.lands.length} blok)`,
      `• Komoditas Tercatat: ${state.crops.length} tanaman | Total Panen: ${formatNumber(computeTotalHarvestKg())} Kg`,
      `• Modal: ${formatRupiah(fin.modalTotal)} | Pengeluaran: ${formatRupiah(fin.expenseTotal)} | Pendapatan: ${formatRupiah(fin.incomeTotal)}`,
      `• Laba Bersih Tercatat: ${formatRupiah(fin.profit)}`
    ];
    summaryLines.forEach((line) => card.appendChild(el("p", "text-sm font-semibold text-stone-800", line)));
    root.appendChild(card);
  }

  // 15. ADMIN DASHBOARD
  function renderAdmin(root) {
    const kpi = el("div", "grid grid-cols-1 sm:grid-cols-3 gap-4");
    kpi.appendChild(makeKpiCard("Total Entitas Data", String(state.lands.length + state.crops.length + state.schedules.length + state.harvests.length), "Lahan, tanaman, jadwal & panen", true));
    kpi.appendChild(makeKpiCard("Katalog AgroMarket", `${state.marketItems.length} Produk`, "Listing aktif di katalog"));
    kpi.appendChild(makeKpiCard("Standar Keamanan", "CSP + Anti-XSS", "Zero hardcoded secret & safe DOM"));
    root.appendChild(kpi);

    const panel = el("div", "bg-white p-6 rounded-3xl border border-green-900/10 shadow-sm space-y-4");
    panel.appendChild(el("h3", "font-extrabold text-stone-900", "Cadangan & Pemulihan Data (JSON)"));
    panel.appendChild(el("p", "text-sm text-stone-600", "Unduh salinan JSON data pertanian Anda atau kembalikan ke data contoh bawaan."));

    const row = el("div", "flex flex-wrap gap-3");
    const exportBtn = el("button", "px-4 py-2.5 rounded-xl bg-[#166534] text-white text-xs font-bold hover:bg-green-800 transition", "Unduh Backup JSON");
    exportBtn.type = "button";
    exportBtn.addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "agrosmart-backup.json";
      a.click();
      URL.revokeObjectURL(url);
      showToast("Backup JSON berhasil diunduh.", "success");
    });

    const resetBtn = el("button", "px-4 py-2.5 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold transition", "Reset ke Data Demo");
    resetBtn.type = "button";
    resetBtn.addEventListener("click", () => {
      confirmDeleteModal("Kembalikan seluruh data ke setelan awal demo?", () => {
        state = cloneDefault();
        saveState();
        renderWorkspace();
        showToast("Data dikembalikan ke setelan awal.", "info");
      });
    });

    row.appendChild(exportBtn);
    row.appendChild(resetBtn);
    panel.appendChild(row);
    root.appendChild(panel);
  }

  // 16. SETTINGS & CLOUD INTEGRATION STRUCTURE
  function renderSettings(root) {
    const grid = el("div", "grid grid-cols-1 lg:grid-cols-2 gap-6");

    // Profile Form
    const profCard = el("div", "bg-white p-6 rounded-3xl border border-green-900/10 shadow-sm space-y-4");
    profCard.appendChild(el("h3", "font-extrabold text-stone-900", "Profil Pengguna & Kebun"));
    const pForm = el("form", "space-y-3");
    const fName = makeInputField("Nama Lengkap", "text", state.profile.name, "");
    const fRole = makeInputField("Peran / Kelompok", "text", state.profile.role, "");
    const fFarm = makeInputField("Nama Kebun / Kelompok Tani", "text", state.profile.farmName, "");
    const fLoc = makeInputField("Lokasi Wilayah", "text", state.profile.location, "");
    [fName.wrap, fRole.wrap, fFarm.wrap, fLoc.wrap].forEach((w) => pForm.appendChild(w));

    const saveProf = el("button", "w-full py-3 rounded-xl bg-[#166534] text-white font-bold text-sm hover:bg-green-800 transition", "Simpan Profil");
    saveProf.type = "submit";
    pForm.appendChild(saveProf);
    pForm.addEventListener("submit", (e) => {
      e.preventDefault();
      state.profile.name = fName.input.value.trim() || "Petani";
      state.profile.role = fRole.input.value.trim() || "Petani";
      state.profile.farmName = fFarm.input.value.trim() || "Kebun AgroSmart";
      state.profile.location = fLoc.input.value.trim() || "Indonesia";
      saveState();
      updateHeaderProfile();
      showToast("Profil berhasil diperbarui.", "success");
    });
    profCard.appendChild(pForm);
    grid.appendChild(profCard);

    // Backend & Supabase Architecture Reference (No secrets stored)
    const cloudCard = el("div", "bg-white p-6 rounded-3xl border border-green-900/10 shadow-sm space-y-4");
    cloudCard.appendChild(el("h3", "font-extrabold text-stone-900", "Struktur Backend Supabase & Gemini API"));
    cloudCard.appendChild(el("p", "text-xs text-stone-600 leading-relaxed", "Demi keamanan (Zero Secrets), API Key Gemini dan Service Key Supabase ditempatkan di Environment Variables backend/serverless, bukan di kode frontend."));

    const cForm = el("form", "space-y-3");
    const fSupa = makeInputField("Supabase Project URL (Publik)", "url", state.cloudConfig.supabaseUrl, "https://xxxx.supabase.co");
    const fEnd = makeInputField("Endpoint Backend AgroAI", "text", state.cloudConfig.backendEndpoint, "/api/agroai");
    cForm.appendChild(fSupa.wrap);
    cForm.appendChild(fEnd.wrap);

    const saveCloud = el("button", "w-full py-3 rounded-xl bg-[#EAB308] text-green-950 font-extrabold text-sm hover:bg-amber-400 transition", "Simpan Konfigurasi Endpoint");
    saveCloud.type = "submit";
    cForm.appendChild(saveCloud);
    cForm.addEventListener("submit", (e) => {
      e.preventDefault();
      state.cloudConfig.supabaseUrl = fSupa.input.value.trim();
      state.cloudConfig.backendEndpoint = fEnd.input.value.trim() || "/api/agroai";
      saveState();
      showToast("Konfigurasi endpoint disimpan.", "success");
    });
    cloudCard.appendChild(cForm);

    const sqlBox = el("pre", "p-3.5 rounded-2xl bg-stone-900 text-green-100 text-[11px] overflow-x-auto leading-relaxed");
    sqlBox.textContent = `-- Skema tabel referensi Supabase (PostgreSQL)
create table if not exists public.lands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  area_ha numeric not null,
  soil_type text,
  soil_ph numeric,
  created_at timestamptz default now()
);`;
    cloudCard.appendChild(sqlBox);
    grid.appendChild(cloudCard);

    root.appendChild(grid);
  }

  // Form Helpers
  function makeInputField(labelText, type, value, placeholder) {
    const wrap = el("div", "space-y-1");
    wrap.appendChild(el("label", "block text-xs font-bold text-stone-700", labelText));
    const input = el("input", "w-full px-3.5 py-2.5 rounded-xl border border-green-900/15 text-sm bg-white focus:outline-none focus:border-[#166534]");
    input.type = type;
    input.value = value || "";
    if (placeholder) input.placeholder = placeholder;
    wrap.appendChild(input);
    return { wrap, input };
  }

  function makeSelectField(labelText, options, selectedVal) {
    const wrap = el("div", "space-y-1");
    wrap.appendChild(el("label", "block text-xs font-bold text-stone-700", labelText));
    const select = el("select", "w-full px-3.5 py-2.5 rounded-xl border border-green-900/15 text-sm bg-white focus:outline-none focus:border-[#166534]");
    options.forEach((opt) => {
      const o = el("option", "", opt === selectedVal && opt.startsWith("LHN-") ? getLandName(opt) : opt === selectedVal && opt.startsWith("CRP-") ? getCropName(opt) : opt);
      o.value = opt;
      if (opt === selectedVal) o.selected = true;
      select.appendChild(o);
    });
    wrap.appendChild(select);
    return { wrap, select };
  }

  function confirmDeleteModal(message, onConfirm) {
    openModal("Konfirmasi Tindakan", (body) => {
      body.appendChild(el("p", "text-sm text-stone-700", message));
      const row = el("div", "flex justify-end gap-2 pt-2");
      const cancel = el("button", "px-4 py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-bold", "Batal");
      cancel.type = "button";
      cancel.addEventListener("click", closeModal);
      const ok = el("button", "px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700", "Ya, Lanjutkan");
      ok.type = "button";
      ok.addEventListener("click", () => {
        closeModal();
        onConfirm();
      });
      row.appendChild(cancel);
      row.appendChild(ok);
      body.appendChild(row);
    });
  }

  // Notifications Drawer
  function renderNotifDrawer() {
    const list = document.getElementById("notif-list");
    clearEl(list);
    if (!state.notifications.length) {
      list.appendChild(el("p", "text-xs text-stone-500 text-center py-8", "Tidak ada notifikasi saat ini."));
      return;
    }
    state.notifications.forEach((n) => {
      const item = el("div", `p-3.5 rounded-2xl border text-xs space-y-1 ${n.read ? "bg-stone-50 border-stone-100" : "bg-green-50/70 border-[#166534]/20"}`);
      item.appendChild(el("div", "flex items-center justify-between font-bold", "")).append(
        el("span", "text-stone-900", n.title),
        el("span", "text-[10px] text-stone-400", n.time)
      );
      item.appendChild(el("p", "text-stone-600", n.desc));
      list.appendChild(item);
    });
  }

  function openNotifDrawer() {
    renderNotifDrawer();
    document.getElementById("notif-drawer").classList.remove("translate-x-full");
  }

  function closeNotifDrawer() {
    document.getElementById("notif-drawer").classList.add("translate-x-full");
  }

  // Global Listeners Initialization
  function bindEvents() {
    document.getElementById("btn-toggle-view").addEventListener("click", () => {
      setViewMode(state.viewMode === "workspace" ? "landing" : "workspace");
    });
    document.getElementById("brand-home-btn").addEventListener("click", () => setViewMode("landing"));
    document.getElementById("hero-cta-workspace").addEventListener("click", () => {
      state.activeSection = "dashboard";
      setViewMode("workspace");
    });
    document.getElementById("hero-cta-ai").addEventListener("click", () => {
      state.activeSection = "agroai";
      setViewMode("workspace");
    });
    document.getElementById("landing-quick-schedule").addEventListener("click", () => {
      state.activeSection = "schedules";
      setViewMode("workspace");
    });
    document.getElementById("btn-back-landing").addEventListener("click", () => setViewMode("landing"));
    document.getElementById("btn-profile-pill").addEventListener("click", () => navigateTo("settings"));

    document.getElementById("btn-mobile-drawer").addEventListener("click", openMobileDrawer);
    document.getElementById("btn-close-drawer").addEventListener("click", closeMobileDrawer);
    document.getElementById("drawer-backdrop").addEventListener("click", closeMobileDrawer);

    document.querySelectorAll(".mob-nav-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-nav");
        if (target) navigateTo(target);
      });
    });

    const handleSearch = (val) => {
      state.searchQuery = val || "";
      if (state.viewMode === "workspace") renderWorkspace();
    };
    document.getElementById("global-search-input").addEventListener("input", (e) => handleSearch(e.target.value));
    document.getElementById("mobile-search-input").addEventListener("input", (e) => handleSearch(e.target.value));

    document.getElementById("btn-close-modal").addEventListener("click", closeModal);
    document.getElementById("app-modal").addEventListener("click", (e) => {
      if (e.target.id === "app-modal") closeModal();
    });

    document.getElementById("btn-open-notifications").addEventListener("click", openNotifDrawer);
    document.getElementById("btn-close-notif").addEventListener("click", closeNotifDrawer);
    document.getElementById("btn-mark-all-read").addEventListener("click", () => {
      state.notifications.forEach((n) => {
        n.read = true;
      });
      saveState();
      updateNotifBadge();
      renderNotifDrawer();
      showToast("Semua notifikasi ditandai dibaca.", "success");
    });
    document.getElementById("btn-clear-notif").addEventListener("click", () => {
      state.notifications = [];
      saveState();
      updateNotifBadge();
      renderNotifDrawer();
      showToast("Daftar notifikasi dibersihkan.", "info");
    });

    window.addEventListener("resize", () => {
      if (state.viewMode === "workspace" && state.activeSection === "dashboard") {
        renderWorkspace();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindEvents();
    updateHeaderProfile();
    updateNotifBadge();
    updateLandingStats();
    updateStorageBadge();
    if (state.viewMode === "workspace") {
      setViewMode("workspace");
    }
  });
})();
