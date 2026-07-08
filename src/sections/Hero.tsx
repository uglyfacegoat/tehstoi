import {
  ArrowRight,
  ArrowUpRight,
  Factory,
  FileText,
  Grid3X3,
  MousePointer2,
  Phone,
  Truck,
  UserRoundCheck,
} from 'lucide-react';

const nav = ['Услуги', 'Отрасли', 'Объекты', 'Документы', 'О компании', 'Контакты'];

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
    <a className="logo" href="#" aria-label="ТехСтройИнвест">
      <span className="logoIcon" aria-hidden="true">
        <svg width="127" height="102" viewBox="0 0 127 102" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 2L2 12V20H29V21.5V68L52 82V78V75.5V20H55H83V2H10Z" fill="#181817" />
          <path d="M125 4.5L67 37.5V100H84L123 78V59.5L90 75.5L87 74V54.5V48L125 25V8.5V4.5Z" fill="#F05A16" />
        </svg>
      </span>
      <span className="logoText">
        <strong>ТехСтройИнвест</strong>
        <small>Санитарные услуги и утилизация отходов</small>
      </span>
    </a>
  );
}

function Header() {
  return (
    <header className="topbar">
      <Logo />
      <nav aria-label="Основная навигация">
        {nav.map((item) => <a href="#" key={item}>{item}</a>)}
      </nav>
      <div className="headerPhone">
        <Phone className="headerPhoneIcon" size={21} strokeWidth={2.7} />
        <strong>8 800 775-22-45</strong>
        <span>Пн-Пт 8:00-18:00</span>
      </div>
      <a className="headerCta" href="#">Оставить заявку <ArrowUpRight size={20} /></a>
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
      <section className="hero">
        <div className="titleBlock">
          <h1>Санитарные услуги и утилизация отходов для бизнеса</h1>
          <p>Комплексное решение: от заявки до закрывающих документов. Работаем с отходами I-IV класса опасности.</p>
          <div className="actions">
            <a className="primary" href="#">Оставить заявку <ArrowUpRight size={22} /></a>
            <a className="secondary" href="#">Рассчитать объём <Grid3X3 size={21} /></a>
          </div>
        </div>
        <HeroPhoto />
        <div className="steps">{steps.map((step) => <StepCard step={step} key={step.num} />)}</div>
        <FactPanel />
      </section>
      <section className="nextLine">
        <h2>Решаем задачи вашего бизнеса</h2>
        <div className="slider"><i /></div>
        <a href="#">Смотреть все услуги <MousePointer2 size={18} /></a>
      </section>
    </>
  );
}
