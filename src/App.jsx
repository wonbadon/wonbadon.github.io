import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

const Guide = lazy(() => import('./pages/Guide'))
const LaborRightsGuide = lazy(() => import('./pages/LaborRightsGuide'))
const LaborCalculationGuide = lazy(() => import('./pages/LaborCalculationGuide'))
const LeavingJob = lazy(() => import('./pages/LeavingJob'))
const OvertimeGuide = lazy(() => import('./pages/OvertimeGuide'))
const SeveranceGuide = lazy(() => import('./pages/SeveranceGuide'))
const AnnualLeaveGuide = lazy(() => import('./pages/AnnualLeaveGuide'))
const LaborPensionGuide = lazy(() => import('./pages/LaborPensionGuide'))
const RetirementPlanningGuide = lazy(() => import('./pages/RetirementPlanningGuide'))
const WageRightsGuide = lazy(() => import('./pages/WageRightsGuide'))
const SalarySlipGuide = lazy(() => import('./pages/SalarySlipGuide'))
const InsuranceReportingGuide = lazy(() => import('./pages/InsuranceReportingGuide'))
const InsuranceBenefitsGuide = lazy(() => import('./pages/InsuranceBenefitsGuide'))
const UnemploymentBenefitsGuide = lazy(() => import('./pages/UnemploymentBenefitsGuide'))
const DismissalGuide = lazy(() => import('./pages/DismissalGuide'))
const YearEndBonusGuide = lazy(() => import('./pages/YearEndBonusGuide'))
const OfferNegotiationGuide = lazy(() => import('./pages/OfferNegotiationGuide'))
const ProbationRightsGuide = lazy(() => import('./pages/ProbationRightsGuide'))
const ExitHandoverGuide = lazy(() => import('./pages/ExitHandoverGuide'))
const ComplaintGuide = lazy(() => import('./pages/ComplaintGuide'))
const LeaveGuide = lazy(() => import('./pages/LeaveGuide'))
const PartTimeRightsGuide = lazy(() => import('./pages/PartTimeRightsGuide'))
const ParentalLeaveGuide = lazy(() => import('./pages/ParentalLeaveGuide'))
const AttendanceDisputeGuide = lazy(() => import('./pages/AttendanceDisputeGuide'))
const FlexibleScheduleGuide = lazy(() => import('./pages/FlexibleScheduleGuide'))
const TyphoonWorkdayGuide = lazy(() => import('./pages/TyphoonWorkdayGuide'))
const Scenarios = lazy(() => import('./pages/Scenarios'))
const FAQ = lazy(() => import('./pages/FAQ'))
const About = lazy(() => import('./pages/About'))
const Overtime = lazy(() => import('./pages/Overtime'))
const AnnualLeave = lazy(() => import('./pages/AnnualLeave'))
const Severance = lazy(() => import('./pages/Severance'))
const LaborPension = lazy(() => import('./pages/LaborPension'))
const SalarySlip = lazy(() => import('./pages/SalarySlip'))
const InsurancePremium = lazy(() => import('./pages/InsurancePremium'))
const InsuranceBrackets = lazy(() => import('./pages/InsuranceBrackets'))
const WageConverter = lazy(() => import('./pages/WageConverter'))
const YearEndBonus = lazy(() => import('./pages/YearEndBonus'))
const NoticePeriod = lazy(() => import('./pages/NoticePeriod'))
const ParentalLeave = lazy(() => import('./pages/ParentalLeave'))
const OccupationalAccident = lazy(() => import('./pages/OccupationalAccident'))
const TyphoonWorkday = lazy(() => import('./pages/TyphoonWorkday'))
const RightsCheck = lazy(() => import('./pages/RightsCheck'))
const SalaryCompare = lazy(() => import('./pages/SalaryCompare'))
const DisputeChecker = lazy(() => import('./pages/DisputeChecker'))
const RetirementPlanner = lazy(() => import('./pages/RetirementPlanner'))
const NotFound = lazy(() => import('./pages/NotFound'))

function RouteFallback() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="section-card">
        <p className="text-sm font-semibold text-slate-500" aria-live="polite">頁面載入中...</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/labor-rights-guide" element={<LaborRightsGuide />} />
          <Route path="/labor-calculation-guide" element={<LaborCalculationGuide />} />
          <Route path="/leaving-job" element={<LeavingJob />} />
          <Route path="/overtime-guide" element={<OvertimeGuide />} />
          <Route path="/severance-guide" element={<SeveranceGuide />} />
          <Route path="/annual-leave-guide" element={<AnnualLeaveGuide />} />
          <Route path="/labor-pension-guide" element={<LaborPensionGuide />} />
          <Route path="/retirement-planning-guide" element={<RetirementPlanningGuide />} />
          <Route path="/wage-rights" element={<WageRightsGuide />} />
          <Route path="/salary-slip-guide" element={<SalarySlipGuide />} />
          <Route path="/insurance-reporting-guide" element={<InsuranceReportingGuide />} />
          <Route path="/insurance-benefits-guide" element={<InsuranceBenefitsGuide />} />
          <Route path="/unemployment-benefits-guide" element={<UnemploymentBenefitsGuide />} />
          <Route path="/dismissal-guide" element={<DismissalGuide />} />
          <Route path="/year-end-bonus-guide" element={<YearEndBonusGuide />} />
          <Route path="/offer-negotiation-guide" element={<OfferNegotiationGuide />} />
          <Route path="/probation-rights-guide" element={<ProbationRightsGuide />} />
          <Route path="/exit-handover-guide" element={<ExitHandoverGuide />} />
          <Route path="/complaint-guide" element={<ComplaintGuide />} />
          <Route path="/leave-guide" element={<LeaveGuide />} />
          <Route path="/part-time-rights-guide" element={<PartTimeRightsGuide />} />
          <Route path="/parental-leave-guide" element={<ParentalLeaveGuide />} />
          <Route path="/attendance-dispute-guide" element={<AttendanceDisputeGuide />} />
          <Route path="/flexible-schedule-guide" element={<FlexibleScheduleGuide />} />
          <Route path="/typhoon-workday-guide" element={<TyphoonWorkdayGuide />} />
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
      </Suspense>
    </Layout>
  )
}
