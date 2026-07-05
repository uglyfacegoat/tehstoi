import { ArrowRight, Biohazard, FileText, Recycle, ShieldCheck, Truck } from 'lucide-react';

const wasteTypes = [
  {
    title: 'Медицинские отходы',
    asset: '/assets/waste-disposal/medical-barrel.png',
    assetClass: 'medicalWasteAsset',
  },
  {
    title: 'Загрязнённые грунты',
    asset: '/assets/waste-disposal/contaminated-soil.png',
    assetClass: 'soilWasteAsset',
  },
  {
    title: 'Покрышки и шины',
    asset: '/assets/waste-disposal/tires.png',
    assetClass: 'tiresWasteAsset',
  },
  {
    title: 'Биологические отходы',
    asset: '/assets/waste-disposal/bio-waste-bag.png',
    assetClass: 'bioWasteAsset',
  },
  {
    title: 'Бумага и макулатура',
    asset: '/assets/waste-disposal/paper-stack.png',
    assetClass: 'paperWasteAsset',
  },
  {
    title: 'Комплексный договор',
    asset: '/assets/waste-disposal/contract-clipboard.png',
    assetClass: 'contractWasteAsset',
  },
];

const cycle = [
  ['Сбор', 'Организуем сбор отходов на территории заказчика.'],
  ['Транспортировка', 'Перевозка лицензированным транспортом.'],
  ['Обезвреживание', 'Передача на лицензированные объекты.'],
  ['Документы', 'Паспорта отходов, договоры, акты, лицензии.'],
  ['Отчётность', 'Подготовка данных для контролирующих органов.'],
];

export function WasteDisposal() {
  return (
    <section className="siteSection wasteSection" id="waste">
      <div className="sectionHeader wide">
        <h2>Утилизация отходов I-IV класса</h2>
        <p>Отдельное направление для сложных и юридически важных задач: сбор, транспортировка, обезвреживание, документы и отчётность.</p>
      </div>

      <div className="wasteLayout">
        <div className="wasteCards">
          {wasteTypes.map(({ title, asset, assetClass }, index) => (
            <article className="paperCard wasteCard" key={title}>
              <div className="cardHeader">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{title}</strong>
              </div>
              <img className={`wasteAsset ${assetClass}`} src={asset} alt="" />
              <button aria-label={`${title}: подробнее`}><ArrowRight size={24} /></button>
            </article>
          ))}
        </div>
        <aside className="paperCard wasteCycle">
          <h3>Полный цикл работ с отходами</h3>
          {cycle.map(([title, text], index) => (
            <div className="cycleRow" key={title}>
              {index === 0 && <Truck size={27} />}
              {index === 1 && <Truck size={27} />}
              {index === 2 && <Recycle size={27} />}
              {index === 3 && <FileText size={27} />}
              {index === 4 && <ShieldCheck size={27} />}
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
          ))}
          <div className="yellowNote"><Biohazard size={22} /> Соблюдаем экологическое законодательство</div>
        </aside>
      </div>
    </section>
  );
}
