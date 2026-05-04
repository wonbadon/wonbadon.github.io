import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Overtime from './pages/Overtime'
import AnnualLeave from './pages/AnnualLeave'
import Severance from './pages/Severance'
import LaborPension from './pages/LaborPension'
import SalarySlip from './pages/SalarySlip'
import InsurancePremium from './pages/InsurancePremium'
import InsuranceBrackets from './pages/InsuranceBrackets'
import WageConverter from './pages/WageConverter'
import YearEndBonus from './pages/YearEndBonus'
import NoticePeriod from './pages/NoticePeriod'
import ParentalLeave from './pages/ParentalLeave'
import OccupationalAccident from './pages/OccupationalAccident'
import TyphoonWorkday from './pages/TyphoonWorkday'
import RightsCheck from './pages/RightsCheck'
import SalaryCompare from './pages/SalaryCompare'
import DisputeChecker from './pages/DisputeChecker'
import RetirementPlanner from './pages/RetirementPlanner'
import LeavingJob from './pages/LeavingJob'
import OvertimeGuide from './pages/OvertimeGuide'
import SeveranceGuide from './pages/SeveranceGuide'
import AnnualLeaveGuide from './pages/AnnualLeaveGuide'
import LaborPensionGuide from './pages/LaborPensionGuide'
import WageRightsGuide from './pages/WageRightsGuide'
import DismissalGuide from './pages/DismissalGuide'
import LeaveGuide from './pages/LeaveGuide'
import Guide from './pages/Guide'
import Scenarios from './pages/Scenarios'
import FAQ from './pages/FAQ'
import About from './pages/About'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/leaving-job" element={<LeavingJob />} />
        <Route path="/overtime-guide" element={<OvertimeGuide />} />
        <Route path="/severance-guide" element={<SeveranceGuide />} />
        <Route path="/annual-leave-guide" element={<AnnualLeaveGuide />} />
        <Route path="/labor-pension-guide" element={<LaborPensionGuide />} />
        <Route path="/wage-rights" element={<WageRightsGuide />} />
        <Route path="/dismissal-guide" element={<DismissalGuide />} />
        <Route path="/leave-guide" element={<LeaveGuide />} />
        <Route path="/scenarios" element={<Scenarios />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/about" element={<About />} />
        <Route path="/overtime" element={<Overtime />} />
        <Route path="/annual-leave" element={<AnnualLeave />} />
        <Route path="/severance" element={<Severance />} />
        <Route path="/labor-pension" element={<LaborPension />} />
        <Route path="/salary-slip" element={<SalarySlip />} />
        <Route path="/insurance-premium" element={<InsurancePremium />} />
        <Route path="/insurance-brackets" element={<InsuranceBrackets />} />
        <Route path="/wage-converter" element={<WageConverter />} />
        <Route path="/year-end-bonus" element={<YearEndBonus />} />
        <Route path="/notice-period" element={<NoticePeriod />} />
        <Route path="/parental-leave" element={<ParentalLeave />} />
        <Route path="/occupational-accident" element={<OccupationalAccident />} />
        <Route path="/typhoon-workday" element={<TyphoonWorkday />} />
        <Route path="/rights-check" element={<RightsCheck />} />
        <Route path="/salary-compare" element={<SalaryCompare />} />
        <Route path="/dispute-checker" element={<DisputeChecker />} />
        <Route path="/retirement-planner" element={<RetirementPlanner />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
