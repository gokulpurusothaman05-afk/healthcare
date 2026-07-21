/* ==========================================================================
   STACKLY - DASHBOARD CONTROLLER (CLIENT & ADMIN)
   Sidebar Navigation, Dynamic Tab Switching & Chart.js Visualizations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initDashboardSidebar();
  initClientCharts();
  initAdminCharts();
});

/* --------------------------------------------------------------------------
   Sidebar Navigation & Section Router
   -------------------------------------------------------------------------- */
function initDashboardSidebar() {
  const sidebarItems = document.querySelectorAll('.sidebar-item[data-section]');
  const sections = document.querySelectorAll('.dash-section');

  sidebarItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const targetSectionId = item.getAttribute('data-section');
      
      // If item links to external page (e.g., Logout or Index), don't preventDefault
      if (!targetSectionId) return;
      e.preventDefault();

      // Update Active Sidebar Item
      sidebarItems.forEach(si => si.classList.remove('active'));
      item.classList.add('active');

      // Hide all sections and activate target section
      sections.forEach(sec => {
        sec.classList.remove('active');
        if (sec.id === targetSectionId) {
          sec.classList.add('active');
          // Smooth scroll to top of section on mobile
          if (window.innerWidth < 992) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
      });
    });
  });

  // Mobile Sidebar Toggle Handler
  const toggleBtn = document.getElementById('dashSidebarToggle');
  const sidebar = document.querySelector('.dashboard-sidebar');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }
}

/* --------------------------------------------------------------------------
   Client Dashboard Chart.js Initializers
   -------------------------------------------------------------------------- */
function initClientCharts() {
  const vitalsCtx = document.getElementById('clientVitalsChart');
  if (vitalsCtx && typeof Chart !== 'undefined') {
    new Chart(vitalsCtx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Heart Rate (BPM)',
            data: [72, 75, 71, 78, 74, 70, 72],
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.15)',
            fill: true,
            tension: 0.4
          },
          {
            label: 'Blood Oxygen (%)',
            data: [98, 99, 97, 99, 98, 99, 98],
            borderColor: '#14b8a6',
            backgroundColor: 'rgba(20, 184, 166, 0.1)',
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: '#94a3b8' } }
        },
        scales: {
          x: { ticks: { color: '#64748b' }, grid: { color: 'rgba(255,255,255,0.05)' } },
          y: { ticks: { color: '#64748b' }, grid: { color: 'rgba(255,255,255,0.05)' } }
        }
      }
    });
  }

  const aiConfidenceCtx = document.getElementById('clientConfidenceChart');
  if (aiConfidenceCtx && typeof Chart !== 'undefined') {
    new Chart(aiConfidenceCtx, {
      type: 'bar',
      data: {
        labels: ['Chest X-Ray', 'Brain MRI', 'Genomic Biomarker', 'Blood Panel', 'Skin Lesion'],
        datasets: [{
          label: 'AI Diagnostic Match (%)',
          data: [99.2, 98.6, 99.8, 97.4, 98.1],
          backgroundColor: [
            'rgba(37, 99, 235, 0.7)',
            'rgba(20, 184, 166, 0.7)',
            'rgba(139, 92, 246, 0.7)',
            'rgba(6, 182, 212, 0.7)',
            'rgba(59, 130, 246, 0.7)'
          ],
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#64748b' }, grid: { display: false } },
          y: { min: 90, max: 100, ticks: { color: '#64748b' }, grid: { color: 'rgba(255,255,255,0.05)' } }
        }
      }
    });
  }
}

/* --------------------------------------------------------------------------
   Admin Dashboard Chart.js Initializers
   -------------------------------------------------------------------------- */
function initAdminCharts() {
  const modelCtx = document.getElementById('adminModelLatencyChart');
  if (modelCtx && typeof Chart !== 'undefined') {
    new Chart(modelCtx, {
      type: 'line',
      data: {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
        datasets: [
          {
            label: 'Inference Latency (ms)',
            data: [14, 12, 18, 22, 19, 15, 13],
            borderColor: '#38bdf8',
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            fill: true,
            tension: 0.3
          },
          {
            label: 'Model Precision Rate (%)',
            data: [99.5, 99.4, 99.6, 99.3, 99.5, 99.7, 99.6],
            borderColor: '#a855f7',
            borderDash: [5, 5],
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: { ticks: { color: '#64748b' } },
          y: { position: 'left', ticks: { color: '#64748b' } },
          y1: { position: 'right', min: 98, max: 100, ticks: { color: '#a855f7' } }
        }
      }
    });
  }

  const gpuCtx = document.getElementById('adminGpuChart');
  if (gpuCtx && typeof Chart !== 'undefined') {
    new Chart(gpuCtx, {
      type: 'doughnut',
      data: {
        labels: ['Radiology AI Cluster', 'Genomic LLM Cluster', 'EHR NLP Cluster', 'Idle Reserve'],
        datasets: [{
          data: [45, 30, 15, 10],
          backgroundColor: ['#2563eb', '#14b8a6', '#8b5cf6', '#334155'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8' } } }
      }
    });
  }
}
