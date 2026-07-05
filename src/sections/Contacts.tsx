import { useState } from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from 'lucide-react';

const serviceOptions = [
  'Дератизация',
  'Дезинсекция',
  'Дезинфекция',
  'Фумигация',
  'Пест-контроль',
  'Утилизация отходов I-IV класса',
];

type RequestState = {
  name: string;
  phone: string;
  service: string;
  address: string;
  area: string;
  comment: string;
  consent: boolean;
};

type RequestErrors = Partial<Record<keyof RequestState, string>>;

function FooterLogo() {
  return (
    <div className="footerBrand">
      <span className="logoIcon"><i /><b /></span>
      <div>
        <strong>ТехСтройИнвест</strong>
        <span>Санитарные услуги<br />и утилизация отходов</span>
      </div>
    </div>
  );
}

const footerGroups = [
  {
    title: 'Услуги',
    links: [
      ['Дератизация', '#services'],
      ['Дезинсекция', '#services'],
      ['Дезинфекция', '#services'],
      ['Фумигация', '#services'],
      ['Пест-контроль', '#services'],
      ['Утилизация отходов', '#waste'],
    ],
  },
  {
    title: 'Отходы I-IV класса',
    links: [
      ['Медицинские отходы', '#waste'],
      ['Загрязнённые грунты', '#waste'],
      ['Покрышки и шины', '#waste'],
      ['Биологические отходы', '#waste'],
      ['Бумага и макулатура', '#waste'],
      ['Комплексный договор', '#waste'],
    ],
  },
  {
    title: 'Отрасли',
    links: [
      ['Склады и логистика', '#services'],
      ['Производства', '#services'],
      ['Рестораны и общепит', '#services'],
      ['Медучреждения', '#services'],
      ['Офисы и БЦ', '#services'],
      ['Полный пакет документов', '#services'],
    ],
  },
  {
    title: 'Документы',
    links: [
      ['Лицензии', '#trust'],
      ['Сертификаты', '#trust'],
      ['Договор', '#contacts'],
      ['Акты и отчётность', '#waste'],
    ],
  },
  {
    title: 'Компания',
    links: [
      ['Как мы работаем', '#workflow'],
      ['Прайс-лист', '#pricing'],
      ['О компании', '#trust'],
      ['Контакты', '#contacts'],
    ],
  },
] as const;

function RequestDropdown({
  value,
  open,
  error,
  onToggle,
  onSelect,
}: {
  value: string;
  open: boolean;
  error?: string;
  onToggle: () => void;
  onSelect: (value: string) => void;
}) {
  return (
    <label className={`requestField requestSelectField${error ? ' isInvalid' : ''}`}>
      <span>Вид услуги*</span>
      <div className="requestSelectWrap">
        <button className="requestSelectTrigger" type="button" aria-expanded={open} onClick={onToggle}>
          <span className={value ? 'hasValue' : ''}>{value || 'Выберите услугу'}</span>
          <ChevronDown size={20} strokeWidth={2.1} />
        </button>
        {open && (
          <div className="requestDropdown" role="listbox">
            {serviceOptions.map((option, index) => (
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
      {error && <div className="requestAlert"><AlertTriangle size={15} /> {error}</div>}
    </label>
  );
}

export function Contacts() {
  const [openSelect, setOpenSelect] = useState(false);
  const [form, setForm] = useState<RequestState>({
    name: '',
    phone: '',
    service: '',
    address: '',
    area: '',
    comment: '',
    consent: false,
  });
  const [errors, setErrors] = useState<RequestErrors>({});
  const [result, setResult] = useState('');

  const setField = <K extends keyof RequestState>(field: K, value: RequestState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setResult('');
  };

  const handleSubmit = () => {
    const nextErrors: RequestErrors = {};

    if (!form.name.trim()) nextErrors.name = 'Укажите имя';
    if (!form.phone.trim()) nextErrors.phone = 'Укажите телефон';
    if (!form.service) nextErrors.service = 'Выберите услугу';
    if (!form.address.trim()) nextErrors.address = 'Укажите адрес объекта';
    if (!form.area.trim()) nextErrors.area = 'Укажите площадь или объём';
    if (!form.consent) nextErrors.consent = 'Нужно согласие на обработку данных';

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setResult('');
      return;
    }

    setOpenSelect(false);
    setResult('Заявка собрана. Специалист свяжется с вами и уточнит детали объекта.');
  };

  return (
    <section className="siteSection contactsSection" id="contacts">
      <div className="sectionHeader wide">
        <div>
          <h2>Контакты и заявка</h2>
          <p>Готовы помочь вашему бизнесу. Свяжитесь с нами удобным способом или оставьте заявку — мы перезвоним.</p>
        </div>
      </div>

      <div className="contactsLayout">
        <div className="paperCard contactCard contactCardClean">
          <div className="contactCardTop">
            <span>ООО</span>
            <h3>ТехСтройИнвест</h3>
            <p>Санитарные услуги и утилизация отходов для бизнеса по всей России.</p>
          </div>

          <div className="contactInfoList">
            <article>
              <MapPin size={28} />
              <div>
                <span>Адрес</span>
                <strong>454008, г. Челябинск, ул. Линейная, д. 96, оф. 201</strong>
              </div>
            </article>
            <article>
              <Phone size={28} />
              <div>
                <span>Телефон</span>
                <strong>8 800 775-22-45</strong>
                <small>Звонок по России бесплатный</small>
              </div>
            </article>
            <article>
              <Clock size={28} />
              <div>
                <span>Режим работы</span>
                <strong>Пн-Пт: 8:00-18:00</strong>
                <small>Сб-Вс: выходной</small>
              </div>
            </article>
            <article>
              <Mail size={28} />
              <div>
                <span>E-mail</span>
                <strong>info@tsinvest74.ru</strong>
              </div>
            </article>
          </div>
        </div>

        <form className="paperCard requestForm requestFormPro" onSubmit={(event) => event.preventDefault()}>
          <h3>Оставить заявку</h3>

          <div className="formTwo">
            <label className={`requestField${errors.name ? ' isInvalid' : ''}`}>
              <span>Имя*</span>
              <input value={form.name} placeholder="Введите ваше имя" onChange={(event) => setField('name', event.target.value)} />
              {errors.name && <div className="requestAlert"><AlertTriangle size={15} /> {errors.name}</div>}
            </label>
            <label className={`requestField${errors.phone ? ' isInvalid' : ''}`}>
              <span>Телефон*</span>
              <input value={form.phone} placeholder="+7 (___) ___-__-__" onChange={(event) => setField('phone', event.target.value)} />
              {errors.phone && <div className="requestAlert"><AlertTriangle size={15} /> {errors.phone}</div>}
            </label>
          </div>

          <RequestDropdown
            value={form.service}
            open={openSelect}
            error={errors.service}
            onToggle={() => setOpenSelect((current) => !current)}
            onSelect={(value) => {
              setField('service', value);
              setOpenSelect(false);
            }}
          />

          <label className={`requestField${errors.address ? ' isInvalid' : ''}`}>
            <span>Адрес объекта*</span>
            <input value={form.address} placeholder="Введите адрес объекта" onChange={(event) => setField('address', event.target.value)} />
            {errors.address && <div className="requestAlert"><AlertTriangle size={15} /> {errors.address}</div>}
          </label>

          <div className="formTwo">
            <label className={`requestField${errors.area ? ' isInvalid' : ''}`}>
              <span>Площадь / объём*</span>
              <input value={form.area} placeholder="Например: 150 м² или 10 м³" onChange={(event) => setField('area', event.target.value)} />
              {errors.area && <div className="requestAlert"><AlertTriangle size={15} /> {errors.area}</div>}
            </label>
            <label className="requestField">
              <span>Комментарий</span>
              <input value={form.comment} placeholder="Дополнительная информация" onChange={(event) => setField('comment', event.target.value)} />
            </label>
          </div>

          <label className={`consent requestConsent${errors.consent ? ' isInvalid' : ''}`}>
            <input type="checkbox" checked={form.consent} onChange={(event) => setField('consent', event.target.checked)} />
            <span>Согласен на обработку персональных данных</span>
          </label>
          {errors.consent && <div className="requestAlert requestConsentAlert"><AlertTriangle size={15} /> {errors.consent}</div>}

          {result && (
            <div className="requestResultAlert">
              <CheckCircle2 size={18} />
              <span>{result}</span>
            </div>
          )}

          <div className="requestBottom">
            <button type="button" onClick={handleSubmit}>Отправить заявку <ArrowUpRight size={24} /></button>
            <p><ShieldCheck size={28} /> Ваши данные защищены и не передаются третьим лицам</p>
          </div>
        </form>
      </div>

      <footer className="siteFooter">
        <FooterLogo />
        <nav className="footerNav" aria-label="Навигация по сайту">
          {footerGroups.map((group) => (
            <div className="footerCol" key={group.title}>
              <strong>{group.title}</strong>
              {group.links.map(([label, href]) => (
                <a href={href} key={label}>{label}</a>
              ))}
            </div>
          ))}
          <div className="footerCol footerContactCol">
            <strong>Контакты</strong>
            <a href="tel:88007752245">8 800 775-22-45</a>
            <a href="mailto:info@tsinvest74.ru">info@tsinvest74.ru</a>
            <span>454008, г. Челябинск, ул. Линейная, д. 96, оф. 201</span>
          </div>
        </nav>
      </footer>
    </section>
  );
}
