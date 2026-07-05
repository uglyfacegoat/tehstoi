import { ArrowRight, Biohazard, Building2, CheckSquare, Factory, FileCheck2, Hotel, Utensils } from 'lucide-react';

const services = [
  { num: '01', title: 'Дератизация', text: 'Уничтожение грызунов и защита объектов от их повторного появления.', asset: '/assets/services-industries/service-rat.png', assetClass: 'ratAsset' },
  { num: '02', title: 'Дезинсекция', text: 'Борьба с насекомыми-вредителями: от тараканов и муравьёв до клещей и комаров.', asset: '/assets/services-industries/service-bug.png', assetClass: 'bugAsset' },
  { num: '03', title: 'Дезинфекция', text: 'Устранение бактерий, вирусов и грибков. Профилактика инфекций и санитарная обработка.', asset: '/assets/services-industries/service-bacteria.png', assetClass: 'bacteriaAsset' },
  { num: '04', title: 'Фумигация', text: 'Газовая обработка помещений и продукции для уничтожения вредителей на всех стадиях.', asset: '/assets/services-industries/service-chemistry.png', assetClass: 'chemistryAsset' },
  { num: '05', title: 'Пест-контроль', text: 'Комплексная система мониторинга и защиты от вредителей на постоянной основе.', asset: '/assets/services-industries/service-route.png', assetClass: 'routeAsset' },
  { num: '06', title: 'Утилизация отходов', text: 'Сбор, вывоз и безопасная утилизация отходов I-IV класса опасности с полным документооборотом.', asset: '/assets/services-industries/service-hazard.png', assetClass: 'hazardAsset' },
];

const industries = [
  { title: 'Склады и логистика', text: 'Защита товарных запасов и инфраструктуры от вредителей и санитарных рисков.', Icon: Building2 },
  { title: 'Производства', text: 'Соблюдение санитарных норм на предприятиях любого профиля.', Icon: Factory },
  { title: 'Рестораны и общепит', text: 'Гигиена пищевого производства и зон обслуживания.', Icon: Utensils },
  { title: 'Медучреждения', text: 'Дезинфекция и контроль инфекций в медицинских организациях.', Icon: Biohazard },
  { title: 'Офисы и БЦ', text: 'Комфортная и безопасная рабочая среда для сотрудников и посетителей.', Icon: Hotel },
];

const featureChecks = [
  'Выезд и анализ объекта',
  'Разработка решения',
  'Проведение работ',
  'Документальное сопровождение',
  'Гарантия и контроль результата',
];

export function ServicesIndustries() {
  return (
    <section className="siteSection servicesSection" id="services">
      <div className="sectionKicker">Услуги и отрасли</div>
      <div className="sectionHeader">
        <h2>Решаем задачи вашего бизнеса</h2>
        <p>Комплексные решения по санитарии, защите и утилизации для безопасной работы объектов.</p>
      </div>

      <div className="servicesShowcase">
        <div className="serviceGrid">
          {services.map(({ num, title, text, asset, assetClass }) => (
            <article className="paperCard serviceCard" key={title}>
              <div className="cardHeader">
                <span>{num}</span>
                <strong>{title}</strong>
              </div>
              <p>{text}</p>
              <img className={`serviceAsset ${assetClass}`} src={asset} alt="" />
              <button aria-label={`${title}: подробнее`}><ArrowRight size={25} /></button>
            </article>
          ))}
        </div>

        <aside className="paperCard serviceFeature">
          <div className="featureCopy">
            <h3>Полный цикл работ под ключ</h3>
            <ul>
              {featureChecks.map((item) => (
                <li key={item}><CheckSquare size={17} />{item}</li>
              ))}
            </ul>
          </div>
          <div className="featureMap">
            <img src="/assets/services-industries/service-russia-map.png" alt="" />
          </div>
          <img className="featureWorker" src="/assets/services-industries/service-worker.png" alt="Специалист проводит санитарную обработку" />
        </aside>
      </div>

      <h3 className="sectionSubhead">Отрасли, с которыми мы работаем</h3>
      <div className="industryGrid">
        {industries.map(({ title, text, Icon }) => (
          <article className="paperCard industryCard" key={title}>
            <div className="industryHead">
              <Icon size={31} strokeWidth={1.8} />
              <strong>{title}</strong>
            </div>
            <p>{text}</p>
            <button aria-label={`${title}: подробнее`}><ArrowRight size={22} /></button>
          </article>
        ))}
        <article className="paperCard industryCard docsIndustry">
          <div className="industryHead">
            <FileCheck2 size={31} strokeWidth={1.8} />
            <strong>Работаем по договору с полным пакетом документов</strong>
          </div>
          <p>Акты, протоколы, журналы учёта, рекомендации и отчётность.</p>
          <button>Подробнее</button>
          <img src="/assets/hero/step-document.png" alt="" />
        </article>
      </div>
    </section>
  );
}
