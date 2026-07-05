import { Hero } from './sections/Hero';
import { ServicesIndustries } from './sections/ServicesIndustries';
import { Workflow } from './sections/Workflow';
import { WasteDisposal } from './sections/WasteDisposal';
import { Pricing } from './sections/Pricing';
import { Trust } from './sections/Trust';
import { Contacts } from './sections/Contacts';
import './styles.css';
import './sections/sections.css';
import './styles/mobile/hero.css';
import './styles/mobile/services.css';
import './styles/mobile/workflow.css';
import './styles/mobile/waste.css';
import './styles/mobile/pricing.css';
import './styles/mobile/trust.css';
import './styles/mobile/contacts-footer.css';

export function App() {
  return (
    <main className="page">
      <Hero />
      <ServicesIndustries />
      <Workflow />
      <WasteDisposal />
      <Pricing />
      <Trust />
      <Contacts />
    </main>
  );
}
