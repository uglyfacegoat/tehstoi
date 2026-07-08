import {
  FileCheck2,
  Map,
  MessageCircle,
  Search,
  Truck,
} from 'lucide-react';

const steps = [
  {
    id: 'request',
    title: 'Заявка',
    text: 'Вы оставляете заявку удобным способом: по телефону, через форму на сайте или по почте.',
    Icon: MessageCircle,
  },
  {
    id: 'inspect',
    title: 'Осмотр объекта',
    text: 'Наш специалист выезжает на объект, оценивает объём, тип отходов и условия подъезда.',
    Icon: Search,
  },
  {
    id: 'route',
    title: 'Маршрутный лист / согласование',
    text: 'Составляем маршрутный лист, согласовываем объём, сроки и календарный план работ.',
    Icon: Map,
  },
  {
    id: 'work',
    title: 'Выполнение работ',
    text: 'Подаём спецтехнику и выполняем работы с соблюдением норм безопасности.',
    Icon: Truck,
  },
  {
    id: 'docs',
    title: 'Акт и документы',
    text: 'Передаём акт выполненных работ и полный пакет сопроводительных документов.',
    Icon: FileCheck2,
  },
];

export function Workflow() {
  return (
    <section className="siteSection workflowSection workflowMapSection" id="workflow">
      <div className="workflowMapHeader">
        <h2>Как мы работаем</h2>
        <p>
          Прозрачный процесс от заявки до закрывающих документов.<br />
          Работаем по <span>I-IV классу опасности отходов.</span>
        </p>
        <img
          className="workflowCoverageAsset"
          src="/assets/workflow/russia-coverage-card.png"
          alt="Работаем по всей России, более 650 городов и посёлков"
        />
      </div>

      <div className="workflowScheme">
        <img className="workflowRouteAsset" src="/assets/workflow/route-desktop.png" alt="" />

        {steps.map(({ id, title, text, Icon }) => (
          <article className={`workflowStep workflowStep-${id}`} key={id}>
            <Icon size={36} strokeWidth={1.8} />
            <strong>{title}</strong>
            <p>{text}</p>
          </article>
        ))}
      </div>

      <img
        className="workflowSafetyAsset"
        src="/assets/workflow/safety-ticket.png"
        alt="Безопасность и ответственность на каждом этапе"
      />
      <img
        className="workflowBottomAsset"
        src="/assets/workflow/bottom-guarantees.png"
        alt="Работаем безопасно, соблюдаем экологические нормы, собственный парк техники, полный комплект документов"
      />
    </section>
  );
}
