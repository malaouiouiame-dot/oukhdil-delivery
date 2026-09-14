'use client'

import { useState } from 'react'
import {
  ArrowRight,
  Bike,
  Check,
  ChevronDown,
  Clock3,
  MapPin,
  MessageCircle,
  Menu,
  Phone,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react'

const posterUrl = '/poster.jpg'

const services = [
  { image: '/services/repas.jpg', arabic: 'توصيل الأكل و الشهيوات', title: 'Repas & fast-food', detail: 'Tacos, pizzas, snacks' },
  { image: '/services/pharmacie.jpg', arabic: 'إقتناء الأدوية من الصيدلية', title: 'Pharmacie', detail: 'Médicaments & garde' },
  { image: '/services/gateaux.jpg', arabic: 'توصيل الحلويات', title: 'Gâteaux & pâtisseries', detail: "Anniversaires et douceurs" },
  { image: '/services/factures.jpg', arabic: 'أداء الفواتير', title: 'Factures & urgences', detail: 'Paiement et petites courses' },
  { image: '/services/courses.jpg', arabic: 'التقدية', title: 'Courses du quotidien', detail: 'Marjane, Carrefour, BIM, souk' },
]

const neighborhoods = ['Guéliz', 'Hivernage', 'Médina', 'Daoudiate', 'Targa', 'Mhamid', 'Palmeraie', 'Massira']

export default function Page() {
  const [selected, setSelected] = useState(0)
  const [address, setAddress] = useState('')
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [description, setDescription] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const whatsappMessage = encodeURIComponent(
    `Bonjour Oukhdil Delivery,\nNom : ${clientName || 'à préciser'}\nTéléphone : ${clientPhone || 'à préciser'}\nService : ${services[selected].title}\nDétails : ${description || 'aucune précision'}\nAdresse : ${address || 'à préciser'}`
  )
  const whatsappUrl = `https://wa.me/212690820745?text=${whatsappMessage}`

    function handleConfirm() {
    if (!clientName.trim()) {
      setErrorMsg('Merci d’indiquer votre nom.')
      return
    }
    if (!clientPhone.trim()) {
      setErrorMsg('Merci d’indiquer votre numéro de téléphone.')
      return
    }
    if (!address.trim()) {
      setErrorMsg('Merci d’indiquer votre adresse ou quartier.')
      return
    }
    setErrorMsg('')
    window.open(whatsappUrl, '_blank')
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#faf7f3] text-[#0d2340]">
      <header className="sticky top-0 z-50 border-b border-[#eee0d0] bg-[#faf7f3]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#accueil" className="flex items-center gap-3" aria-label="Oukhdil Delivery accueil">
            <img src="/logo.png" alt="Oukhdil Delivery" className="h-14 w-14 rounded-full object-contain" />
          </a>
          <nav className="hidden items-center gap-8 text-sm font-bold md:flex">
            <a href="#services" className="transition-colors hover:text-[#f5821f]">Services</a>
            <a href="#tarifs" className="transition-colors hover:text-[#f5821f]">Tarifs</a>
            <a href="#fonctionnement" className="transition-colors hover:text-[#f5821f]">Comment ça marche</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="tel:0690820745" className="hidden items-center gap-2 rounded-full bg-[#f5821f] px-4 py-2.5 text-sm font-black text-white shadow-sm transition-transform hover:-translate-y-0.5 sm:flex"><Phone size={16} /> 06 90 82 07 45</a>
            <button className="rounded-xl p-2 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">{menuOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
        {menuOpen && <nav className="flex flex-col gap-4 border-t border-[#eee0d0] px-5 py-4 text-sm font-bold md:hidden"><a href="#services" onClick={() => setMenuOpen(false)}>Services</a><a href="#tarifs" onClick={() => setMenuOpen(false)}>Tarifs</a><a href="#fonctionnement" onClick={() => setMenuOpen(false)}>Comment ça marche</a></nav>}
      </header>

      <section id="accueil" className="relative isolate overflow-hidden bg-[#0d2340]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:py-20">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f5821f]/30 bg-[#173359] px-3 py-1.5 text-xs font-bold text-[#ffc48a]"><Sparkles size={14} /> Livraison locale, pensée pour Marrakech</div>
            <h1 className="max-w-2xl text-balance text-5xl font-black leading-[.95] tracking-[-.055em] text-white sm:text-7xl">Votre ville<br /><span className="text-[#f5821f]">Vos envies</span><br />Livrées rapidement</h1>
            <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-[#c9d7ea] sm:text-lg">Oukhdil Delivery simplifie votre quotidien avec un service de livraison rapide, fiable et accessible partout à Marrakech.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="#commander" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#f5821f] px-6 py-4 font-black text-white transition-transform hover:-translate-y-1">Commander maintenant <ArrowRight size={18} /></a><a href="https://wa.me/212690820745" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 px-6 py-4 font-bold text-white transition-colors hover:bg-white/10"><MessageCircle size={18} /> WhatsApp direct</a></div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-[#c9d7ea]"><span className="flex items-center gap-2"><Clock3 size={16} className="text-[#f5821f]" /> Rapide & ponctuel</span><span className="flex items-center gap-2"><MapPin size={16} className="text-[#f5821f]" /> Marrakech intra-muros</span></div>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-lg"><div className="absolute -inset-4 rounded-[2.5rem] border border-[#f5821f]/20" /><div className="relative overflow-hidden rounded-[2rem] border-[6px] border-[#f5821f] bg-[#173359] shadow-[0_22px_60px_rgba(0,0,0,.3)]"><img src={posterUrl} alt="Affiche Oukhdil Delivery avec livreur à Marrakech" className="h-[510px] w-full object-cover object-top sm:h-[590px]" /></div></div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24"><div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-3 text-xs font-black uppercase tracking-[.2em] text-[#f5821f]">Nos services</p><h2 className="text-3xl font-black tracking-tight sm:text-4xl">On s’occupe de tout.</h2></div><p className="max-w-sm text-sm leading-6 text-[#6b7a90]">Un seul contact pour tous vos petits besoins qui font une grande différence au quotidien.</p></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{services.map((service, index) => <button key={service.title} onClick={() => { setSelected(index); document.getElementById('commander')?.scrollIntoView({ behavior: 'smooth' }) }} className={`group overflow-hidden rounded-3xl border text-left transition-all hover:-translate-y-1 hover:shadow-xl ${selected === index ? 'border-[#f5821f] shadow-lg' : 'border-[#eee0d0]'} ${selected === index ? 'bg-[#0d2340] text-white' : 'bg-white'}`}>
  <img src={service.image} alt={service.title} className="h-32 w-full object-cover" />
  <div className="p-5">
    <span className={`block text-sm font-black ${selected === index ? 'text-[#f5821f]' : 'text-[#0d2340]'}`}>{service.title}</span>
    <span className={`mt-2 block text-right font-semibold ${selected === index ? 'text-white' : 'text-[#0d2340]'}`} dir="rtl">{service.arabic}</span>
    <span className={`mt-2 block text-xs ${selected === index ? 'text-[#c9d7ea]' : 'text-[#6b7a90]'}`}>{service.detail}</span>
  </div>
</button>)}</div></section>

      <section id="commander" className="bg-[#fff3e6] px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[.2em] text-[#f5821f]">Simple comme un message</p>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Votre livraison,<br />en quelques clics.</h2>
            <p className="mt-5 max-w-md leading-7 text-[#6b7a90]">Choisissez un service, indiquez votre quartier, votre nom, votre numéro de téléphone et confirmez votre demande directement sur WhatsApp.</p>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_rgba(13,35,64,.1)] sm:p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-[.15em] text-[#f5821f]">Nouvelle demande</span>
                <h3 className="mt-2 text-2xl font-black">Que faut-il livrer ?</h3>
              </div>
              <span className="rounded-full bg-[#fff3e6] px-3 py-1 text-xs font-black text-[#c2570a]">Rapide</span>
            </div>

            <label className="mb-2 block text-sm font-bold">Service sélectionné</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {services.map((service, index) => (
                <button key={service.title} onClick={() => setSelected(index)} className={`rounded-xl border p-3 text-left text-xs font-bold ${selected === index ? 'border-[#f5821f] bg-[#fff3e6] text-[#c2570a]' : 'border-[#eee0d0]'}`}>
                  <img src={service.image} alt={service.title} className="mr-2 inline-block h-6 w-6 rounded-md object-cover align-middle" />{service.title}
                </button>
              ))}
            </div>

            <label htmlFor="address" className="mb-2 mt-6 block text-sm font-bold">Adresse ou quartier à Marrakech</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-3.5 text-[#f5821f]" size={18} />
              <input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="......." className="w-full rounded-xl border border-[#eee0d0] bg-[#faf7f3] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#f5821f]" />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {neighborhoods.slice(0, 5).map((place) => (
                <button key={place} onClick={() => setAddress(place)} className="rounded-full bg-[#f5f1eb] px-3 py-1.5 text-xs font-semibold text-[#6b7a90] hover:bg-[#fce4c6]">{place}</button>
              ))}
            </div>

            <label htmlFor="clientName" className="mb-2 mt-6 block text-sm font-bold">Votre nom</label>
            <div className="relative">
              <Check className="absolute left-4 top-3.5 text-[#f5821f]" size={18} />
              <input id="clientName" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="......." className="w-full rounded-xl border border-[#eee0d0] bg-[#faf7f3] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#f5821f]" />
            </div>

            <label htmlFor="clientPhone" className="mb-2 mt-4 block text-sm font-bold">Votre numéro de téléphone</label>
            <div className="relative">
              <Phone className="absolute left-4 top-3.5 text-[#f5821f]" size={18} />
              <input id="clientPhone" type="tel" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} placeholder="06 XX XX XX XX" className="w-full rounded-xl border border-[#eee0d0] bg-[#faf7f3] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#f5821f]" />
            </div>

            <label htmlFor="description" className="mb-2 mt-4 block text-sm font-bold">Précisez votre commande</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description de votre commande...."
              rows={3}
              className="w-full rounded-xl border border-[#eee0d0] bg-[#faf7f3] p-4 text-sm outline-none transition focus:border-[#f5821f]"
            />

            {errorMsg && <p className="mt-4 rounded-xl bg-red-50 px-4 py-2 text-xs font-bold text-red-600">{errorMsg}</p>}

            <div className="mt-7 flex items-center justify-between border-t border-[#f0e8dc] pt-5">
              <div>
                <span className="block text-xs text-[#6b7a90]">Livraison estimée</span>
                <strong className="text-2xl font-black">À partir de 20 DH</strong>
              </div>
              <button
                onClick={handleConfirm}
                className="inline-flex items-center gap-2 rounded-xl bg-[#f5821f] px-4 py-3 text-sm font-black text-white hover:bg-[#e06f0f]"
              >
                <MessageCircle size={17} /> Confirmer
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="tarifs" className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20"><div className="grid items-center gap-8 rounded-[2rem] bg-[#f5821f] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:p-14"><div><p className="text-xs font-black uppercase tracking-[.2em] text-[#7a3d00]">Tarification Marrakech</p><h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl">Une course au juste prix, sans surprise</h2><p className="mt-4 max-w-xl leading-7 text-[#fff0de]">Le prix s’adapte à votre quartier et à votre demande. Toujours avec transparence, toujours à partir de 20 DH.</p></div></div></section>

      <section id="fonctionnement" className="border-t border-[#eee0d0] bg-white px-5 py-16 lg:px-8"><div className="mx-auto max-w-7xl"><div className="text-center"><p className="text-xs font-black uppercase tracking-[.2em] text-[#f5821f]">Oukhdil, au quotidien</p><h2 className="mt-3 text-3xl font-black tracking-tight">Rapide. Fiable. Local</h2></div><div className="mx-auto mt-10 grid max-w-4xl gap-8 sm:grid-cols-3">{[['01', 'Vous choisissez', 'Une catégorie, votre quartier, votre nom et votre numéro de téléphone.'], ['02', 'On s’organise', 'Notre équipe confirme par WhatsApp.'], ['03', 'On vous livre', 'Suivez votre commande jusqu’à la porte.']].map(([number, title, detail]) => <div key={number} className="text-center"><span className="mx-auto grid size-12 place-items-center rounded-2xl bg-[#0d2340] text-sm font-black text-[#f5821f]">{number}</span><h3 className="mt-4 font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-[#6b7a90]">{detail}</p></div>)}</div></div></section>

      <footer className="bg-[#0d2340] px-5 py-8 text-white lg:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><img src="/logo.png" alt="Oukhdil Delivery" className="h-10 w-10 rounded-full object-contain" /><div><strong className="text-lg font-black">OUKHDIL <span className="text-[#f5821f]">DELIVERY</span></strong><p className="mt-1 text-xs text-[#a9bed8]">Services de livraison rapide et fiable à Marrakech.</p></div></div><div className="flex items-center gap-3"><a href="tel:0690820745" className="grid size-10 place-items-center rounded-xl bg-white/10 hover:bg-white/20" aria-label="Appeler Oukhdil"><Phone size={18} /></a><a href="https://wa.me/212690820745" target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-xl bg-[#f5821f] text-white hover:bg-[#e06f0f]" aria-label="WhatsApp Oukhdil"><MessageCircle size={18} /></a><span className="ml-2 text-sm font-bold">06 90 82 07 45</span></div></div></footer>
    </main>
  )
}
