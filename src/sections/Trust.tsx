import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowUpRight,
  Download,
  Factory,
  FileText,
  Maximize2,
  ShieldCheck,
  Truck,
  UserRoundCheck,
  X,
  ZoomIn,
} from 'lucide-react';

type DocumentPage = {
  src: string;
  title: string;
  label: string;
};

type TrustDocument = {
  id: string;
  title: string;
  note: string;
  href: string;
  fileLabel: string;
  pages: DocumentPage[];
};

type ActivePage = DocumentPage & {
  documentTitle: string;
};

const trustFacts = [
  { id: 'market', num: '10+', label: 'лет на рынке санитарных услуг', Icon: Factory },
  { id: 'fleet', num: '250+', label: 'единиц техники в автопарке', Icon: Truck },
  { id: 'staff', num: '300+', label: 'квалифицированных специалистов', Icon: UserRoundCheck },
  { id: 'clients', num: '1000+', label: 'постоянных клиентов', Icon: FileText },
];

const documents: TrustDocument[] = [
  {
    id: 'licenses',
    title: 'Лицензии ТСИ',
    note: 'Полный пакет лицензий компании на обращение с отходами и санитарные работы.',
    href: '/assets/trust/tsi-licenses.pdf',
    fileLabel: 'PDF, 7 листов',
    pages: Array.from({ length: 7 }, (_, index) => ({
      src: `/assets/trust/pages/tsi-licenses-page-${String(index + 1).padStart(2, '0')}.webp`,
      title: 'Лицензии ТСИ',
      label: `Лист ${index + 1}`,
    })),
  },
  {
    id: 'sanitary',
    title: 'Санитарно-эпидемиологическое заключение',
    note: 'Официальное заключение для подтверждения соответствия требованиям.',
    href: '/assets/trust/sanitary-conclusion.pdf',
    fileLabel: 'PDF, 1 лист',
    pages: [
      {
        src: '/assets/trust/pages/sanitary-conclusion-page-01.webp',
        title: 'Санитарно-эпидемиологическое заключение',
        label: 'Лист 1',
      },
    ],
  },
  {
    id: 'company',
    title: 'Карта предприятия',
    note: 'Реквизиты компании для договора, бухгалтерии и закрывающих документов.',
    href: '/assets/trust/company-card.pdf',
    fileLabel: 'PDF, 1 лист',
    pages: [
      {
        src: '/assets/trust/pages/company-card-page-01.png',
        title: 'Карта предприятия',
        label: 'Лист 1',
      },
    ],
  },
];

const downloadLinks = [
  { title: 'Лицензии ТСИ', href: '/assets/trust/tsi-licenses.pdf', meta: 'PDF', detail: '7 листов' },
  { title: 'Санитарное заключение', href: '/assets/trust/sanitary-conclusion.pdf', meta: 'PDF', detail: '1 лист' },
  { title: 'Карта предприятия', href: '/assets/trust/company-card.pdf', meta: 'PDF', detail: '1 лист' },
];

function DocumentZoom({ page, onClose }: { page: ActivePage; onClose: () => void }) {
  return createPortal(
    <div className="documentZoomOverlay" role="dialog" aria-modal="true" aria-label="Просмотр документа">
      <button className="documentZoomBackdrop" type="button" aria-label="Закрыть просмотр" onClick={onClose} />
      <div className="documentZoomPanel">
        <div className="documentZoomTop">
          <div>
            <strong>{page.documentTitle}</strong>
            <span>{page.label}</span>
          </div>
          <button type="button" onClick={onClose} aria-label="Закрыть">
            <X size={24} />
          </button>
        </div>
        <div className="documentZoomScroll">
          <img src={page.src} alt={`${page.title}, ${page.label}`} />
        </div>
        <div className="documentZoomHint"><ZoomIn size={18} /> Документ можно прокрутить и рассмотреть крупнее</div>
      </div>
    </div>,
    document.body,
  );
}

export function Trust() {
  const allPages = useMemo(
    () => documents.flatMap((doc) => doc.pages.map((page) => ({ ...page, documentTitle: doc.title }))),
    [],
  );
  const [activePage, setActivePage] = useState<ActivePage | null>(null);

  return (
    <section className="siteSection trustSection trustSectionPro" id="trust">
      <div className="trustSectionHead">
        <span className="sectionKicker">Документы</span>
        <h2>Лицензии и доверие</h2>
        <p>
          Работаем официально, соблюдаем требования законодательства и показываем реальные документы компании без
          декоративных заглушек.
        </p>
      </div>

      <aside className="trustIntro trustIntroPro">
        <div className="trustActions trustActionsPro">
          <a className="trustPrimaryAction trustControlButton" href="#contacts">
            <span>Запросить документы</span>
            <ArrowUpRight size={22} />
          </a>
          <a className="trustSecondaryAction trustControlButton" href="/assets/trust/tsi-licenses.pdf" download>
            <span>Скачать комплект</span>
            <Download size={22} />
          </a>
        </div>

        <div className="trustDownloadStack" aria-label="Скачать документы">
          {downloadLinks.map((link) => (
            <a className="trustDownloadCard trustControlButton" href={link.href} download key={link.href}>
              <span>{link.title}</span>
              <Download size={22} strokeWidth={2.2} />
            </a>
          ))}
        </div>
      </aside>

      <div className="licenseCards licenseCardsPro" aria-label="Листы документов">
        <div className="trustNotePanel">
          <ShieldCheck size={30} strokeWidth={1.8} />
          <strong>Все листы можно открыть крупно</strong>
          <span>Нажмите на любой документ или кнопку с лупой.</span>
        </div>

        {documents.map((doc) => (
          <section className={`documentGroup documentGroup--${doc.id}`} key={doc.id}>
            <div className="documentGroupHeader">
              <div>
                <strong>{doc.title}</strong>
                <span>{doc.note}</span>
              </div>
              <a href={doc.href} download>
                <Download size={17} /> {doc.fileLabel}
              </a>
            </div>

            <div className="documentPagesGrid">
              {doc.pages.map((page) => (
                <button
                  className="documentPageCard"
                  type="button"
                  onClick={() => setActivePage({ ...page, documentTitle: doc.title })}
                  key={page.src}
                >
                  <span className="documentPageImage">
                    <img src={page.src} alt={`${page.title}, ${page.label}`} loading="lazy" />
                  </span>
                  <span className="documentPageMeta">
                    <b>{page.label}</b>
                    <span><Maximize2 size={15} /> Увеличить</span>
                  </span>
                </button>
              ))}
            </div>
          </section>
        ))}

      </div>

      <div className="trustFacts trustFactsPro">
        {trustFacts.map(({ id, num, label, Icon }) => (
          <article className={`trustFactItem trustFactItem--${id}`} key={label}>
            <Icon size={31} strokeWidth={1.75} />
            <strong>{num}</strong>
            <span>{label}</span>
          </article>
        ))}
      </div>

      {activePage && <DocumentZoom page={activePage} onClose={() => setActivePage(null)} />}
    </section>
  );
}
