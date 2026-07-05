import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Download,
  FileText,
  Info,
  ShieldCheck,
  Trash2,
  Truck,
} from 'lucide-react';

type PriceRow = {
  icon: typeof Truck;
  service: string;
  unit: string;
  volume: string;
  price: string;
};

type FormState = {
  service: string;
  area: string;
  objectType: string;
  comment: string;
};

type FormErrors = Partial<Record<keyof Pick<FormState, 'service' | 'area' | 'objectType'>, string>>;

const pricingTabs: Array<{ id: string; label: string; rows: PriceRow[] }> = [
  {
    id: 'business',
    label: 'ДДД — юрлица',
    rows: [
      { icon: Truck, service: 'Дезинфекция (ДДД)', unit: 'м²', volume: 'до 1 000', price: 'от 25 ₽' },
      { icon: Building2, service: 'Дезинсекция (ДДД)', unit: 'м²', volume: 'до 1 000', price: 'от 20 ₽' },
      { icon: Truck, service: 'Дератизация (ДДД)', unit: 'м²', volume: 'до 1 000', price: 'от 18 ₽' },
      { icon: FileText, service: 'Комплексная обработка (ДДД)', unit: 'м²', volume: 'до 1 000', price: 'от 35 ₽' },
      { icon: Trash2, service: 'Вывоз отходов I-IV класса опасности', unit: 'м³ / т', volume: 'от 1', price: 'от 1 500 ₽' },
    ],
  },
  {
    id: 'private',
    label: 'ДДД — физлица',
    rows: [
      { icon: Truck, service: 'Дезинфекция квартиры', unit: 'м²', volume: 'от 30', price: 'от 45 ₽' },
      { icon: Building2, service: 'Дезинсекция квартиры', unit: 'м²', volume: 'от 30', price: 'от 40 ₽' },
      { icon: Truck, service: 'Дератизация участка', unit: 'сотка', volume: 'от 1', price: 'от 900 ₽' },
      { icon: FileText, service: 'Комплексная обработка', unit: 'объект', volume: 'от 1', price: 'от 3 500 ₽' },
      { icon: Trash2, service: 'Вывоз бытовых отходов', unit: 'м³', volume: 'от 1', price: 'от 1 200 ₽' },
    ],
  },
  {
    id: 'waste',
    label: 'Утилизация',
    rows: [
      { icon: Trash2, service: 'Медицинские отходы', unit: 'кг', volume: 'от 10', price: 'от 65 ₽' },
      { icon: Truck, service: 'Загрязнённые грунты', unit: 'т', volume: 'от 1', price: 'от 2 800 ₽' },
      { icon: Truck, service: 'Покрышки и шины', unit: 'шт.', volume: 'от 20', price: 'от 180 ₽' },
      { icon: FileText, service: 'Биологические отходы', unit: 'кг', volume: 'от 10', price: 'от 95 ₽' },
      { icon: Building2, service: 'Комплексный договор', unit: 'мес.', volume: 'от 1', price: 'от 15 000 ₽' },
    ],
  },
];

const objectOptions = ['Склад / логистика', 'Производство', 'Ресторан / общепит', 'Медучреждение', 'Офис / БЦ', 'Жилой объект'];

const benefits = [
  { title: 'Оперативный выезд', text: 'от 2 часов по Москве и области', Icon: Clock3 },
  { title: 'Гарантия результата', text: 'предоставляем акт выполненных работ', Icon: ShieldCheck },
  { title: 'Работаем по договору', text: 'соблюдаем требования СанПиН и ФЗ-89', Icon: FileText },
  { title: 'Скидки для клиентов', text: 'индивидуальные условия при долгосрочном сотрудничестве', Icon: Building2 },
];

function CustomDropdown({
  label,
  placeholder,
  value,
  options,
  open,
  error,
  onToggle,
  onSelect,
}: {
  label: string;
  placeholder: string;
  value: string;
  options: string[];
  open: boolean;
  error?: string;
  onToggle: () => void;
  onSelect: (value: string) => void;
}) {
  return (
    <label className={`calcField calcSelectField${error ? ' isInvalid' : ''}`}>
      <span>{label}</span>
      <div className="calcSelectWrap">
        <button className="calcSelectTrigger" type="button" aria-expanded={open} onClick={onToggle}>
          <span className={value ? 'hasValue' : ''}>{value || placeholder}</span>
          <ChevronDown size={22} strokeWidth={2.1} />
        </button>
        {open && (
          <div className="calcDropdown" role="listbox">
            {options.map((option, index) => (
              <button
                type="button"
                role="option"
                aria-selected={option === value}
                key={option}
                onClick={() => onSelect(option)}
              >
                <small>{String(index + 1).padStart(2, '0')}</small>
                <span>{option}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <div className="fieldAlert"><AlertTriangle size={15} /> {error}</div>}
    </label>
  );
}

export function Pricing() {
  const [activeTabId, setActiveTabId] = useState(pricingTabs[0].id);
  const [openSelect, setOpenSelect] = useState<'service' | 'objectType' | null>(null);
  const [form, setForm] = useState<FormState>({ service: '', area: '', objectType: '', comment: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [resultAlert, setResultAlert] = useState('');

  const activeTab = useMemo(
    () => pricingTabs.find((tab) => tab.id === activeTabId) ?? pricingTabs[0],
    [activeTabId],
  );

  const serviceOptions = useMemo(() => activeTab.rows.map((row) => row.service), [activeTab]);

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
    setOpenSelect(null);
    setForm((current) => ({ ...current, service: '' }));
    setErrors((current) => ({ ...current, service: undefined }));
    setResultAlert('');
  };

  const handleDownload = () => {
    const header = 'Услуга;Ед. изм.;Объём / площадь;Цена от';
    const lines = activeTab.rows.map((row) => `${row.service};${row.unit};${row.volume};${row.price}`);
    const blob = new Blob([`\uFEFF${[header, ...lines].join('\n')}`], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `price-${activeTab.id}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCalculate = () => {
    const nextErrors: FormErrors = {};

    if (!form.service) nextErrors.service = 'Выберите услугу из списка';
    if (!form.area.trim()) nextErrors.area = 'Укажите площадь или объём';
    if (!form.objectType) nextErrors.objectType = 'Выберите тип объекта';

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setResultAlert('');
      return;
    }

    const selectedRow = activeTab.rows.find((row) => row.service === form.service);
    setOpenSelect(null);
    setResultAlert(`Предварительный ориентир: ${selectedRow?.price ?? 'по запросу'}. Точный расчёт подготовим после проверки объекта.`);
  };

  return (
    <section className="siteSection pricingSection" id="pricing">
      <div className="breadcrumbs">⌂ / Услуги / <span>Прайс-лист и расчет стоимости</span></div>
      <div className="sectionHeader wide">
        <h2>Прайс-лист и расчет стоимости</h2>
        <p>Прозрачные цены на санитарные услуги и утилизацию отходов. Рассчитайте стоимость или свяжитесь с нами для индивидуального предложения.</p>
      </div>

      <div className="pricingPath"><Truck size={25} /></div>

      <div className="pricingLayout">
        <div className="pricingTableBlock">
          <div className="priceTabs" role="tablist" aria-label="Раздел прайс-листа">
            {pricingTabs.map((tab) => (
              <button
                className={tab.id === activeTabId ? 'active' : undefined}
                type="button"
                role="tab"
                aria-selected={tab.id === activeTabId}
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="paperCard priceTable">
            <div className="priceHead">
              <span>Услуга</span>
              <span>Ед. изм.</span>
              <span>Объём / площадь</span>
              <span>Цена от, ₽<small>без НДС</small></span>
            </div>
            {activeTab.rows.map(({ icon: Icon, service, unit, volume, price }) => (
              <div className="priceRow" key={`${activeTab.id}-${service}`}>
                <Icon size={27} strokeWidth={1.8} />
                <strong>{service}</strong>
                <span>{unit}</span>
                <span>{volume}</span>
                <b>{price}</b>
              </div>
            ))}
            <div className="tableFoot">
              <Info size={26} />
              <span>Итоговая стоимость зависит от объёма, типа объекта и класса опасности отходов. Выезд специалиста и составление акта — бесплатно.</span>
              <button type="button" onClick={handleDownload}>Скачать прайс-лист <Download size={18} /></button>
            </div>
          </div>
        </div>

        <form className="paperCard calcForm" onSubmit={(event) => event.preventDefault()}>
          <h3>Рассчитать стоимость</h3>

          <CustomDropdown
            label="Вид услуги"
            placeholder="Выберите услугу"
            value={form.service}
            options={serviceOptions}
            open={openSelect === 'service'}
            error={errors.service}
            onToggle={() => setOpenSelect(openSelect === 'service' ? null : 'service')}
            onSelect={(value) => {
              setForm((current) => ({ ...current, service: value }));
              setErrors((current) => ({ ...current, service: undefined }));
              setOpenSelect(null);
            }}
          />

          <label className={`calcField${errors.area ? ' isInvalid' : ''}`}>
            <span>Площадь / объём</span>
            <div className="calcInputShell">
              <input
                value={form.area}
                placeholder="Например, 150 м² или 5 м³"
                onChange={(event) => {
                  setForm((current) => ({ ...current, area: event.target.value }));
                  setErrors((current) => ({ ...current, area: undefined }));
                }}
              />
            </div>
            {errors.area && <div className="fieldAlert"><AlertTriangle size={15} /> {errors.area}</div>}
          </label>

          <CustomDropdown
            label="Тип объекта"
            placeholder="Выберите тип объекта"
            value={form.objectType}
            options={objectOptions}
            open={openSelect === 'objectType'}
            error={errors.objectType}
            onToggle={() => setOpenSelect(openSelect === 'objectType' ? null : 'objectType')}
            onSelect={(value) => {
              setForm((current) => ({ ...current, objectType: value }));
              setErrors((current) => ({ ...current, objectType: undefined }));
              setOpenSelect(null);
            }}
          />

          <label className="calcField">
            <span>Комментарий</span>
            <div className="calcInputShell calcTextareaShell">
              <textarea
                value={form.comment}
                placeholder="Укажите особенности объекта или дополнительные пожелания"
                onChange={(event) => setForm((current) => ({ ...current, comment: event.target.value }))}
              />
            </div>
          </label>

          {resultAlert && (
            <div className="calcResultAlert">
              <CheckCircle2 size={18} />
              <span>{resultAlert}</span>
            </div>
          )}

          <button type="button" onClick={handleCalculate}>Получить расчёт <ArrowUpRight size={24} /></button>
          <p><ShieldCheck size={18} /> Ваши данные защищены и не передаются третьим лицам</p>
        </form>
      </div>

      <div className="priceBenefits">
        {benefits.map(({ title, text, Icon }) => (
          <article className="benefit" key={title}>
            <Icon size={34} strokeWidth={1.75} />
            <div><strong>{title}</strong><p>{text}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}
