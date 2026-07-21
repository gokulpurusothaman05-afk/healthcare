/* ==========================================================================
   STACKLY - INTERACTIVE CALCULATORS
   AI Cancer Risk Index & Hospital Resource Estimation Calculators
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initRiskCalculator();
  initHospitalCostCalculator();
});

function initRiskCalculator() {
  const ageInput = document.getElementById('calcAge');
  const biomarkerInput = document.getElementById('calcBiomarker');
  const symptomInput = document.getElementById('calcSymptom');
  
  const scoreVal = document.getElementById('calcScoreVal');
  const riskBadge = document.getElementById('calcRiskBadge');

  if (!ageInput || !biomarkerInput || !symptomInput) return;

  function calculateRisk() {
    const age = parseInt(ageInput.value) || 35;
    const biomarker = parseInt(biomarkerInput.value) || 20;
    const symptom = parseInt(symptomInput.value) || 10;

    // Weighted risk index calculation
    const score = Math.min(99.9, Math.max(1.2, (age * 0.35) + (biomarker * 0.45) + (symptom * 0.2)));
    const rounded = score.toFixed(1);

    if (scoreVal) scoreVal.textContent = rounded + '%';

    if (riskBadge) {
      if (score < 25) {
        riskBadge.textContent = 'Low Risk Probability';
        riskBadge.className = 'badge badge-success';
      } else if (score < 60) {
        riskBadge.textContent = 'Moderate Biomarker Elevation';
        riskBadge.className = 'badge badge-warning';
      } else {
        riskBadge.textContent = 'High Clinical Attention Recommended';
        riskBadge.className = 'badge badge-danger';
      }
    }
  }

  [ageInput, biomarkerInput, symptomInput].forEach(inp => {
    inp.addEventListener('input', calculateRisk);
  });
  calculateRisk();
}

function initHospitalCostCalculator() {
  const bedsInput = document.getElementById('calcBeds');
  const scansInput = document.getElementById('calcScans');
  const savingsVal = document.getElementById('calcSavingsVal');

  if (!bedsInput || !scansInput) return;

  function calculateSavings() {
    const beds = parseInt(bedsInput.value) || 100;
    const scans = parseInt(scansInput.value) || 500;

    // Projected monthly savings ($350 saved per scan using non-invasive AI triage)
    const annualSavings = (scans * 350 * 12) + (beds * 4200);
    const formatted = '$' + annualSavings.toLocaleString();

    if (savingsVal) savingsVal.textContent = formatted;
  }

  [bedsInput, scansInput].forEach(inp => {
    inp.addEventListener('input', calculateSavings);
  });
  calculateSavings();
}
