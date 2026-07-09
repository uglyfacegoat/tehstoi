import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Factory,
  FileText,
  Grid3X3,
  Menu,
  MousePointer2,
  Phone,
  Send,
  Truck,
  UserRoundCheck,
  X,
} from 'lucide-react';
import { LogoMark } from '../components/LogoMark';

const nav = [
  { label: 'Услуги', href: '#services' },
  { label: 'Отрасли', href: '#services' },
  { label: 'Объекты', href: '#waste' },
  { label: 'Документы', href: '#trust' },
  { label: 'О компании', href: '#trust' },
  { label: 'Контакты', href: '#contacts' },
];

const phones = [
  { label: 'Санитарные услуги', value: '+7 978 282-28-22', href: '+79782822822' },
  { label: 'Экология и утилизация', value: '+7 914 545-83-02', href: '+79145458302' },
];

const steps = [
  { num: '01', title: 'Заявка', text: 'Оставьте заявку удобным способом', type: 'checklist' },
  { num: '02', title: 'Маршрутный лист', text: 'Согласуем выезд и предоставим маршрутный лист', type: 'route' },
  { num: '03', title: 'Акт и документы', text: 'Предоставим акт выполненных работ и закрывающие документы', type: 'document' },
];

const facts = [
  { num: '10+', label: 'лет', caption: 'на рынке санитарных услуг', Icon: Factory },
  { num: '250+', label: 'единиц техники', caption: 'в автопарке', Icon: Truck },
  { num: '300+', label: 'квалифицированных', caption: 'специалистов', Icon: UserRoundCheck },
  { num: '1000+', label: 'постоянных', caption: 'клиентов', Icon: FileText },
];

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="ТехСтройИнвест">
      <span className="logoIcon" aria-hidden="true">
        <LogoMark />
      </span>
      <span className="logoText">
        <strong>ТехСтройИнвест</strong>
        <small>Санитарные услуги и утилизация отходов</small>
      </span>
    </a>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mainPhone = phones[0];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="topbar">
      <Logo />
      <nav className="desktopNav" aria-label="Основная навигация">
        {nav.map((item) => <a href={item.href} key={item.label}>{item.label}</a>)}
      </nav>
      <a className="headerPhone" href={`tel:${mainPhone.href}`} aria-label={`Позвонить: ${mainPhone.label}`}>
        <Phone className="headerPhoneIcon" size={21} strokeWidth={2.7} />
        <span className="headerPhoneText">
          <strong>{mainPhone.value}</strong>
          <span>{mainPhone.label}</span>
        </span>
      </a>
      <a className="mobileHeaderAction mobilePhoneAction" href={`tel:${mainPhone.href}`} aria-label={`Позвонить: ${mainPhone.label}`}>
        <Phone size={30} strokeWidth={2.5} />
      </a>
      <button
        className={`mobileMenuButton${isMenuOpen ? ' isOpen' : ''}`}
        type="button"
        aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        {isMenuOpen ? <X size={34} strokeWidth={2.4} /> : <Menu size={38} strokeWidth={2.4} />}
      </button>
      <a className="headerCta" href="#contacts">Оставить заявку <ArrowUpRight size={20} /></a>
      {isMenuOpen && (
        <div className="mobileMenuPanel" id="mobile-menu">
          <div className="mobileMenuHead">
            <span className="mobileMenuLogo" aria-hidden="true">
              <LogoMark />
            </span>
            <div>
              <strong>ТехСтройИнвест</strong>
              <span>Санитарные услуги и утилизация отходов</span>
            </div>
          </div>
          <nav aria-label="Мобильная навигация">
            {nav.map((item, index) => (
              <a href={item.href} key={item.label} onClick={closeMenu}>
                <small>{String(index + 1).padStart(2, '0')}</small>
                <span>{item.label}</span>
                <ArrowUpRight size={19} strokeWidth={2.2} />
              </a>
            ))}
          </nav>
          <div className="mobileMenuPhones">
            {phones.map((phone) => (
              <a href={`tel:${phone.href}`} key={phone.href} onClick={closeMenu}>
                <span>{phone.label}</span>
                <strong>{phone.value}</strong>
                <Phone size={20} strokeWidth={2.4} />
              </a>
            ))}
          </div>
          <a className="mobileMenuRequest" href="#contacts" onClick={closeMenu}>
            Оставить заявку <Send size={19} strokeWidth={2.4} />
          </a>
        </div>
      )}
    </header>
  );
}

function StepVisual({ type }: { type: string }) {
  if (type === 'route') {
    return <div className="routeVisual"><img src="/assets/hero/step-map.png" alt="" /></div>;
  }

  if (type === 'document') {
    return <div className="docVisual"><img src="/assets/hero/step-document.png" alt="" /></div>;
  }

  return <div className="checkVisual"><img src="/assets/hero/step-clipboard.png" alt="" /></div>;
}

function StepCard({ step }: { step: (typeof steps)[number] }) {
  return (
    <article className="stepCard">
      <div className="cardHeader">
        <span>{step.num}</span>
        <strong>{step.title}</strong>
      </div>
      <p>{step.text}</p>
      <StepVisual type={step.type} />
      <button aria-label={`${step.title}: подробнее`}><ArrowRight size={27} /></button>
    </article>
  );
}

function DangerClasses() {
  return (
    <aside className="danger" aria-label="Классы опасности отходов">
      <h3>Класс опасности отходов</h3>
      {[
        ['I', 'чрезвычайно опасные', false],
        ['II', 'высоко опасные', false],
        ['III', 'умеренно опасные', true],
        ['IV', 'мало опасные', false],
      ].map(([level, text, active]) => (
        <div className={active ? 'active' : ''} key={level.toString()}>
          <b>{level}</b>
          <span>{text}</span>
        </div>
      ))}
    </aside>
  );
}

function HeroPhoto() {
  return (
    <section className="photoScene" aria-label="Сервисный транспорт и документы">
      <div className="photoFrame">
        <img src="/assets/hero/hero-orange-truck.png" alt="Оранжевый санитарный спецтранспорт на промышленном объекте" />
      </div>
      <img className="mapNoteAsset" src="/assets/hero/russia-note.png" alt="Работаем по всей России" />
      <img className="licenseNoteAsset" src="/assets/hero/license-note.png" alt="Лицензия на обращение с отходами I-IV класса" />
      <DangerClasses />
    </section>
  );
}

function FactPanel() {
  return (
    <section className="factPanel" aria-label="Факты в цифрах">
      <h2>Факты в цифрах</h2>
      <div className="factGrid">
        {facts.map(({ num, label, caption, Icon }) => (
          <article key={num}>
            <Icon size={27} strokeWidth={1.8} />
            <strong>{num}</strong>
            <span>{label}</span>
            <p>{caption}</p>
          </article>
        ))}
      </div>
      <img className="problemStripAsset" src="/assets/hero/problem-strip.png" alt="Устраняем проблемы: грызуны, насекомые, клопы, плесень, запахи" />
    </section>
  );
}

export function Hero() {
  return (
    <>
      <Header />
      <section className="hero" id="top">
        <div className="titleBlock">
          <h1>Санитарные услуги и утилизация отходов для бизнеса</h1>
          <p>Комплексное решение: от заявки до закрывающих документов. Работаем с отходами I-IV класса опасности.</p>
          <div className="actions">
            <a className="primary" href="#contacts">Оставить заявку <ArrowUpRight size={22} /></a>
            <a className="secondary" href="#pricing">Рассчитать объём <Grid3X3 size={21} /></a>
          </div>
        </div>
        <HeroPhoto />
        <div className="steps">{steps.map((step) => <StepCard step={step} key={step.num} />)}</div>
        <FactPanel />
      </section>
      <section className="nextLine">
        <h2>Решаем задачи вашего бизнеса</h2>
        <div className="slider"><i /></div>
        <a href="#services">Смотреть все услуги <MousePointer2 size={18} /></a>
      </section>
    </>
  );
}
