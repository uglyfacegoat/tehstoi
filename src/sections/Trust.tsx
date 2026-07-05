import { ArrowUpRight, Download, Factory, FileText, ShieldCheck, Truck, UserRoundCheck } from 'lucide-react';

const trustFacts = [
  { id: 'market', num: '10+', label: 'лет на рынке санитарных услуг', Icon: Factory },
  { id: 'fleet', num: '250+', label: 'единиц техники в автопарке', Icon: Truck },
  { id: 'staff', num: '300+', label: 'квалифицированных специалистов', Icon: UserRoundCheck },
  { id: 'clients', num: '1000+', label: 'постоянных клиентов', Icon: FileText },
];

const licenseDocs = [
  {
    id: 'waste',
    src: '/assets/trust/license-waste-document.png',
    alt: 'Лицензия на обращение с отходами I-IV классов опасности',
  },
  {
    id: 'ddd',
    src: '/assets/trust/license-ddd-document.png',
    alt: 'Лицензия на деятельность по дезинфекции, дезинсекции, дератизации объектов',
  },
];

export function Trust() {
  return (
    <section className="siteSection trustSection" id="trust">
      <div className="trustIntro">
        <h2>Лицензии и доверие</h2>
        <p>Работаем официально, соблюдаем требования законодательства и гарантируем безопасность на всех этапах.</p>
        <div className="trustActions">
          <button type="button">Запросить документы <ArrowUpRight size={22} /></button>
          <a href="/assets/trust/license-waste-document.png" download>
            Скачать комплект <Download size={17} /><span>PDF, 4.2 МБ</span>
          </a>
        </div>
        <article className="trustLawAssetCard">
          <img src="/assets/trust/law-standards-note.png" alt="Соблюдаем закон и стандарты" />
        </article>
      </div>

      <div className="licenseCards">
        {licenseDocs.map((doc) => (
          <article className={`licenseAssetCard licenseAssetCard--${doc.id}`} key={doc.src}>
            <img src={doc.src} alt={doc.alt} />
          </article>
        ))}
      </div>

      <div className="trustFacts">
        {trustFacts.map(({ id, num, label, Icon }) => (
          <article className={`trustFactItem trustFactItem--${id}`} key={label}>
            <Icon size={31} strokeWidth={1.75} />
            <strong>{num}</strong>
            <span>{label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
