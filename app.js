// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initializeTabs();
    initializeTheme();
    initializeChecklist();
    initializeAdSimulator();
    initializeContentFilter();
    initializeRoiCalculator();
});

// Theme Toggling Logic
function initializeTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const isLight = body.classList.contains('light-theme');
        themeBtn.innerHTML = isLight ? '<i data-lucide="moon"></i>' : '<i data-lucide="sun"></i>';
        lucide.createIcons();
    });
}

// Tab Pane Switching Logic
function initializeTabs() {
    const navLinks = document.querySelectorAll('.nav-link');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetTab = link.getAttribute('data-tab');
            
            // Toggle sidebar link states
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Toggle visibility of panels
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === targetTab) {
                    pane.classList.add('active');
                }
            });
            
            // Scroll content to top
            document.querySelector('.main-content').scrollTop = 0;
        });
    });
}

// Checklist Audit Score Logic
function initializeChecklist() {
    const checkboxes = document.querySelectorAll('.styled-checkbox');
    const progressBadge = document.getElementById('checklist-progress');
    const scoreText = document.getElementById('global-score-pct');
    const scoreCircle = document.querySelector('.score-circle');
    
    function updateScore() {
        const total = checkboxes.length;
        const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
        
        progressBadge.textContent = `${checked}/${total}`;
        
        // Base audit score is 42%. Max score is 100%. Scale remaining 58% dynamically.
        const baseScore = 42;
        const calculatedScore = Math.round(baseScore + (checked / total) * 58);
        
        scoreText.textContent = `${calculatedScore}%`;
        
        // Update circle indicator graphic
        scoreCircle.style.background = `conic-gradient(var(--brand-green) ${calculatedScore}%, var(--border-color) 0)`;
    }
    
    checkboxes.forEach(cb => {
        cb.addEventListener('change', updateScore);
    });
    
    // Run initial update
    updateScore();
}

// Ad Simulator Concept Database
const adConcepts = {
    ftwz: {
        text: "📊 Supply Chain Heads & CFOs: Are you optimizing your duty payments? Genex Free Trade Warehousing Zone (FTWZ) solutions allow you to defer customs duties until product dispatch. Store raw materials or imported cargo duty-free, minimize storage costs, and improve cash flow cycles. 🚀",
        headline: "Optimize Customs Duty Cycles with Genex FTWZ Storage Solutions",
        desc: "Pan-India bonded and duty-free warehousing configurations.",
        cta: "Get Quote",
        overlay: "FTWZ DUTY DEFERMENT",
        insight: "FTWZ concepts target B2B manufacturers and corporate procurement directors looking to defer customs duties, reduce raw material overheads, and bypass trade bottlenecks."
    },
    coldchain: {
        text: "🌡️ Zero-deviation pharmaceutical logistics. Our modern cold storage networks are designed specifically for temperature-sensitive drugs, biologicals, and healthcare supplies. Monitored 24/7 with WMS integrations and double power backups.",
        headline: "Strict Temperature Control Pharma Cold-Chain Logistics | India",
        desc: "GDPR & WHO compliance infrastructure. Speak to a cold chain manager.",
        cta: "Learn More",
        overlay: "COLD CHAIN LOGISTICS",
        insight: "Pharma and clinical logistics require severe proof of trust. This ad copy highlights continuous monitoring, system backups, and regulatory standards to convince stakeholders."
    },
    projectcargo: {
        text: "🏗️ Heavy cargo handling requires extreme route engineering. From machinery transport to manufacturing plant setup, the Genex Project Logistics team handles ODC (over-dimensional cargo) safely, managing customs clearance and heavy crane setups.",
        headline: "Industrial Heavy Lift & Project Cargo Management Specialists",
        desc: "Turnkey project transport from port to plant foundation. View track record.",
        cta: "Book Assessment",
        overlay: "HEAVY LIFT CARGO",
        insight: "Project cargo relies heavily on visual authority. Running video views ads or photographic carousels of real transport projects builds immediate B2B confidence."
    },
    '3pl': {
        text: "💼 Consolidate and scale your logistics. Genex Logistics provides custom 3PL contract warehousing, advanced sorting systems, and pan-India express cargo distribution. Dynamically manage storage footprint without fixed overhead costs.",
        headline: "End-to-End Contract Logistics & Multi-Modal Warehousing",
        desc: "Over 800,000 sq.ft of B2B warehouse capacity across strategic Indian logistics hubs.",
        cta: "Request Quote",
        overlay: "3PL CONTRACT STORAGE",
        insight: "3PL contract logistics solutions target businesses seeking to outsource warehousing. Frame copy around scaling footprints, saving operational staff costs, and reliability."
    }
};

// Ad simulator frame switching & mockup renderer
function initializeAdSimulator() {
    const conceptSelect = document.getElementById('ad-style-select');
    const viewMobileBtn = document.getElementById('view-mobile');
    const viewDesktopBtn = document.getElementById('view-desktop');
    const phoneFrame = document.getElementById('phone-frame');
    
    const fbText = document.getElementById('fb-text');
    const fbHeadline = document.getElementById('fb-headline');
    const fbLinkDesc = document.getElementById('fb-link-desc');
    const fbCtaText = document.getElementById('fb-cta-text');
    const fbOverlay = document.getElementById('fb-overlay-type');
    const adInsightText = document.getElementById('ad-insight-text');
    
    // Updates ad mockup contents
    function updateMockupContent(conceptKey) {
        const concept = adConcepts[conceptKey];
        if (!concept) return;
        
        fbText.textContent = concept.text;
        fbHeadline.textContent = concept.headline;
        fbLinkDesc.textContent = concept.desc;
        fbCtaText.textContent = concept.cta;
        fbOverlay.textContent = concept.overlay;
        adInsightText.textContent = concept.insight;
    }
    
    // Dropdown change listener
    conceptSelect.addEventListener('change', (e) => {
        updateMockupContent(e.target.value);
    });
    
    // View mode handlers (Mobile vs Desktop frame layouts)
    viewMobileBtn.addEventListener('click', () => {
        viewDesktopBtn.classList.remove('active');
        viewMobileBtn.classList.add('active');
        
        phoneFrame.className = "device-frame mobile-mockup animate-pulse-border";
        phoneFrame.style.width = "380px";
    });
    
    viewDesktopBtn.addEventListener('click', () => {
        viewMobileBtn.classList.remove('active');
        viewDesktopBtn.classList.add('active');
        
        phoneFrame.className = "device-frame desktop-mockup animate-pulse-border";
        phoneFrame.style.width = "100%";
    });
}

// Content calendar filter system
function initializeContentFilter() {
    const pills = document.querySelectorAll('.pill');
    const calendarDays = document.querySelectorAll('.calendar-day');
    
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            
            const filterValue = pill.getAttribute('data-filter');
            
            calendarDays.forEach(day => {
                if (filterValue === 'all' || day.getAttribute('data-cat') === filterValue) {
                    day.classList.remove('hidden');
                } else {
                    day.classList.add('hidden');
                }
            });
        });
    });
}

// Interactive B2B ROI & Lead Calculator logic
function initializeRoiCalculator() {
    const inBudget = document.getElementById('range-budget');
    const inCpc = document.getElementById('range-cpc');
    const inConv = document.getElementById('range-conv');
    const inDealVal = document.getElementById('range-deal-value');
    const inCloseRate = document.getElementById('range-deal-close');
    
    // Label DOM targets
    const lblBudget = document.getElementById('val-budget');
    const lblCpc = document.getElementById('val-cpc');
    const lblConv = document.getElementById('val-conv');
    const lblDealVal = document.getElementById('val-deal-value');
    const lblCloseRate = document.getElementById('val-deal-close');
    
    // Output DOM targets
    const outLeads = document.getElementById('out-leads');
    const outCpl = document.getElementById('out-cpl');
    const outDealsClosed = document.getElementById('out-deals-closed');
    const outPipeline = document.getElementById('out-pipeline');
    const outRoi = document.getElementById('out-roi');
    const outSpendLbl = document.getElementById('out-spend-lbl');
    const outNewCustLbl = document.getElementById('out-new-cust-lbl');
    const outValLbl = document.getElementById('out-val-lbl');
    
    function formatCurrency(number) {
        return Math.round(number).toLocaleString('en-IN');
    }
    
    function calculateMetrics() {
        const budget = parseFloat(inBudget.value);
        const cpc = parseFloat(inCpc.value);
        const conv = parseFloat(inConv.value) / 100;
        const dealValue = parseFloat(inDealVal.value);
        const closeRate = parseFloat(inCloseRate.value) / 100;
        
        // Update input labels in real time
        lblBudget.textContent = formatCurrency(budget);
        lblCpc.textContent = cpc;
        lblConv.textContent = inConv.value;
        lblDealVal.textContent = formatCurrency(dealValue);
        lblCloseRate.textContent = inCloseRate.value;
        
        // Calculate outputs
        const clicks = budget / cpc;
        const leads = clicks * conv;
        const cpl = leads > 0 ? (budget / leads) : 0;
        const deals = leads * closeRate;
        const pipeline = deals * dealValue;
        
        // ROI calculation: (Profit / Spend) * 100
        const profit = pipeline - budget;
        const roiPercent = budget > 0 ? (profit / budget) * 100 : 0;
        
        // Render Output text
        outLeads.textContent = Math.round(leads);
        outCpl.textContent = formatCurrency(cpl);
        outDealsClosed.textContent = deals.toFixed(1);
        outPipeline.textContent = formatCurrency(pipeline);
        
        if (roiPercent < 0) {
            outRoi.textContent = `${Math.round(roiPercent)}%`;
            outRoi.style.color = 'var(--color-danger)';
        } else {
            outRoi.textContent = `${Math.round(roiPercent).toLocaleString()}%`;
            outRoi.style.color = 'var(--brand-green)';
        }
        
        // Bottom highlights card updates
        outSpendLbl.textContent = formatCurrency(budget);
        outNewCustLbl.textContent = deals.toFixed(1);
        outValLbl.textContent = formatCurrency(dealValue);
    }
    
    // Add input event listeners for smooth slider updates
    const inputs = [inBudget, inCpc, inConv, inDealVal, inCloseRate];
    inputs.forEach(input => {
        input.addEventListener('input', calculateMetrics);
    });
    
    // Run initial execution to render default states
    calculateMetrics();
}
