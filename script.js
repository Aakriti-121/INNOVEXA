    
    // ========================================================
    // EDITABLE STUDENT PROFILE STATE & STORAGE
    // ========================================================
    const defaultStudentProfile = {
      name: 'Alex Malhotra',
      roll: 'BT22CSE084',
      institute: 'National Institute of Technology (NIT) / Tech University',
      branch: 'Bachelor of Technology - Computer Science & Engineering (B.Tech CSE)',
      sem: 'Sem 4 (Spring)',
      cohort: '2022 — 2026',
      cgpa: 7.42,
      targetCgpa: 8.00,
      email: 'alex.malhotra@btech.ac.in',
      phone: '+91 98765 43210',
      advisor: 'Prof. K. Sharma',
      advisorContact: 'advisor.cse@btech.ac.in • Room 208'
    };

    function getRegisteredUsers() {
      try {
        const raw = localStorage.getItem('annovexa_registered_users');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === 'object') return parsed;
        }
      } catch (e) {
        console.error('Error reading registered users', e);
      }
      return {
        'alex.vance@btech.ac.in': {
          email: 'alex.vance@btech.ac.in',
          profileCompleted: true,
          profile: Object.assign({}, defaultStudentProfile)
        },
        'alex.malhotra@btech.ac.in': {
          email: 'alex.malhotra@btech.ac.in',
          profileCompleted: true,
          profile: Object.assign({}, defaultStudentProfile)
        },
        'priya.sharma@btech.ac.in': {
          email: 'priya.sharma@btech.ac.in',
          profileCompleted: true,
          profile: {
            name: 'Priya Sharma',
            roll: 'BT22ECE042',
            institute: 'Indian Institute of Information Technology (IIIT)',
            branch: 'Bachelor of Technology - Electronics & Communication Engineering (B.Tech ECE)',
            sem: 'Sem 4 (Spring)',
            cohort: '2022 — 2026',
            cgpa: 8.12,
            targetCgpa: 8.50,
            email: 'priya.sharma@btech.ac.in',
            phone: '+91 98123 45678',
            advisor: 'Dr. M. K. Iyer',
            advisorContact: 'advisor.ece@iiit.ac.in • Room 104'
          }
        }
      };
    }

    function getStudentProfile() {
      try {
        const saved = localStorage.getItem('annovexa_student_profile');
        if (saved) {
          return Object.assign({}, defaultStudentProfile, JSON.parse(saved));
        }
      } catch (e) {
        console.error('Error loading profile from localStorage', e);
      }
      return Object.assign({}, defaultStudentProfile);
    }

    function applyProfileToUI() {
      const p = getStudentProfile();

      // Update Card 1 in view-profile
      const nameEl = document.getElementById('profileCardName');
      if (nameEl) nameEl.innerText = p.name;

      const rollBadgeEl = document.getElementById('profileCardRollBadge');
      if (rollBadgeEl) rollBadgeEl.innerText = 'ID: ' + p.roll;

      const instEl = document.getElementById('profileCardInstitute');
      if (instEl) instEl.innerText = p.institute;

      const branchEl = document.getElementById('profileCardBranch');
      if (branchEl) branchEl.innerText = p.branch;

      const cohortEl = document.getElementById('profileCardCohort');
      if (cohortEl) cohortEl.innerText = p.cohort;

      const semEl = document.getElementById('profileCardSem');
      if (semEl) semEl.innerText = p.sem;

      const cgpaEl = document.getElementById('profileCardCgpa');
      if (cgpaEl) {
        cgpaEl.innerHTML = p.cgpa.toFixed(2) + ' <span style="font-size: 13px; color: #64748b; font-weight: 500;">/ 10.00</span>';
      }

      // Update Topbars across all 5 unified pages
      const firstName = p.name.trim().split(' ')[0] || 'Student';
      document.querySelectorAll('.topbar-user-name').forEach(el => {
        el.innerText = firstName;
      });
      document.querySelectorAll('.topbar-user-roll').forEach(el => {
        el.innerText = p.roll;
      });
      document.querySelectorAll('.topbar-user-avatar-initial').forEach(el => {
        el.innerText = p.name.trim().charAt(0).toUpperCase() || 'A';
      });

      // Update semester pills in topbars
      const semNum = p.sem.replace(/[^0-9]/g, '') || '4';
      const shortBranch = p.branch.includes('CSE') ? 'B.Tech CSE' : 'B.Tech';
      document.querySelectorAll('.topbar-semester-pill span').forEach(el => {
        el.innerText = '🎓 ' + shortBranch + ' • Sem ' + semNum;
      });

      // Update modal inputs with current values
      const inName = document.getElementById('editProfileName');
      if (inName) inName.value = p.name;

      const inRoll = document.getElementById('editProfileRoll');
      if (inRoll) inRoll.value = p.roll;

      const inInst = document.getElementById('editProfileInstitute');
      if (inInst) inInst.value = p.institute;

      const inBranch = document.getElementById('editProfileBranch');
      if (inBranch) inBranch.value = p.branch;

      const inSem = document.getElementById('editProfileSem');
      if (inSem) inSem.value = p.sem;

      const inCohort = document.getElementById('editProfileCohort');
      if (inCohort) inCohort.value = p.cohort;

      const inCgpa = document.getElementById('editProfileCgpa');
      if (inCgpa) inCgpa.value = p.cgpa;

      const inTargetCgpa = document.getElementById('editProfileTargetCgpa');
      if (inTargetCgpa) inTargetCgpa.value = p.targetCgpa;

      const inEmail = document.getElementById('editProfileEmail');
      if (inEmail) inEmail.value = p.email;

      const inPhone = document.getElementById('editProfilePhone');
      if (inPhone) inPhone.value = p.phone;

      const inAdvisor = document.getElementById('editProfileAdvisor');
      if (inAdvisor) inAdvisor.value = p.advisor;

      const inAdvisorContact = document.getElementById('editProfileAdvisorContact');
      if (inAdvisorContact) inAdvisorContact.value = p.advisorContact;
    }

    function saveProfileEdits() {
      const emailField = document.getElementById('editProfileEmail');
      let currentEmail = (emailField?.value || '').trim();
      if (!currentEmail) {
        currentEmail = localStorage.getItem('annovexa_current_user_email') || 'alex.malhotra@btech.ac.in';
      }

      const updated = {
        name: (document.getElementById('editProfileName')?.value || 'Student').trim(),
        roll: (document.getElementById('editProfileRoll')?.value || 'BT24NEW001').trim(),
        institute: (document.getElementById('editProfileInstitute')?.value || 'National Institute of Technology (NIT) / Tech University').trim(),
        branch: (document.getElementById('editProfileBranch')?.value || 'B.Tech - Computer Science & Engineering').trim(),
        sem: document.getElementById('editProfileSem')?.value || 'Sem 4 (Spring)',
        cohort: (document.getElementById('editProfileCohort')?.value || '2024 — 2028').trim(),
        cgpa: parseFloat(document.getElementById('editProfileCgpa')?.value) || 8.00,
        targetCgpa: parseFloat(document.getElementById('editProfileTargetCgpa')?.value) || 8.50,
        email: currentEmail,
        phone: (document.getElementById('editProfilePhone')?.value || '').trim(),
        advisor: (document.getElementById('editProfileAdvisor')?.value || 'Prof. Faculty Advisor').trim(),
        advisorContact: (document.getElementById('editProfileAdvisorContact')?.value || '').trim()
      };

      try {
        localStorage.setItem('annovexa_student_profile', JSON.stringify(updated));
        localStorage.setItem('annovexa_current_user_email', currentEmail);

        // Update user registry marking profile as completed
        const users = getRegisteredUsers();
        users[currentEmail.toLowerCase()] = {
          email: currentEmail,
          profileCompleted: true,
          profile: updated
        };
        localStorage.setItem('annovexa_registered_users', JSON.stringify(users));
      } catch (e) {
        console.error('Error saving profile to localStorage', e);
      }

      applyProfileToUI();
      closeProfileModal();
      showToast(`Student profile calibrated! Welcome aboard, ${updated.name}.`);
      if (typeof navigateTo === 'function') navigateTo('dashboard');
    }

    // Initialize profile immediately and on DOM load
    applyProfileToUI();
    window.addEventListener('DOMContentLoaded', applyProfileToUI);
    window.addEventListener('load', applyProfileToUI);

    // State management
    const state = {
      isLoggedIn: true,
      currentView: 'dashboard',
      activeTimeline: 7,
      // Sample academic data
      subjects: [
        { code: 'CS601', name: 'Distributed Systems', held: 42, attended: 36, prof: 'Prof. K. Sharma' },
        { code: 'CS602', name: 'Compiler Design', held: 50, attended: 38, prof: 'Dr. R. Verma' },
        { code: 'CS603', name: 'Machine Learning', held: 50, attended: 44, prof: 'Dr. S. Nair' },
        { code: 'CS604', name: 'Cloud Computing Lab', held: 45, attended: 36, prof: 'Prof. A. Saxena' },
        { code: 'CS605', name: 'Information Security', held: 40, attended: 33, prof: 'Dr. P. Deshmukh' }
      ]
    };

    // Calculate cushion for attendance (classes can be missed without going below 75%)
    // If % >= 75: max skips = floor((attended - 0.75*held) / 0.75)
    // If % < 75: classes needed = ceil((0.75*held - attended) / 0.25)
    function getSubjectCushion(attended, held) {
      const pct = (attended / held) * 100;
      if (pct >= 75.0) {
        const skips = Math.floor((attended - 0.75 * held) / 0.75);
        return { isSafe: true, skips: skips };
      } else {
        const needed = Math.ceil((0.75 * held - attended) / 0.25);
        return { isSafe: false, needed: needed };
      }
    }

    // ========================================================
    // MOBILE OFF-CANVAS DRAWER & RESPONSIVE CONTROLS
    // ========================================================
    function toggleCockpitDrawer() {
      const activeView = document.querySelector('.view-container.active');
      const sidebar = activeView ? activeView.querySelector('.cockpit-sidebar') : document.querySelector('.cockpit-sidebar');
      const backdrop = document.getElementById('cockpitDrawerBackdrop');
      if (!sidebar) return;

      const isOpening = !sidebar.classList.contains('mobile-open');

      document.querySelectorAll('.cockpit-sidebar').forEach(sb => {
        if (isOpening) {
          sb.classList.add('mobile-open');
        } else {
          sb.classList.remove('mobile-open');
        }
      });

      if (backdrop) {
        if (isOpening) {
          backdrop.classList.add('active');
          document.body.style.overflow = 'hidden';
        } else {
          backdrop.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    }

    function closeCockpitDrawer() {
      document.querySelectorAll('.cockpit-sidebar').forEach(el => {
        el.classList.remove('mobile-open');
      });
      const backdrop = document.getElementById('cockpitDrawerBackdrop');
      if (backdrop) backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Close mobile drawer on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeCockpitDrawer();
    });

    // SPA Navigation Handler
    function navigateTo(viewId) {
      // Always close off-canvas mobile drawer on navigation
      closeCockpitDrawer();

      // The dashboard and all authenticated academic tools show only after login / signin
      if (!state.isLoggedIn && viewId !== 'home') {
        openLoginModal();
        showToast('Please sign in or log in to access the Sovereign Academic Dashboard.', true);
        return;
      }

      state.currentView = viewId;

      // Update view containers
      document.querySelectorAll('.view-container').forEach(el => {
        el.classList.remove('active');
      });
      const activeEl = document.getElementById('view-' + viewId);
      if (activeEl) activeEl.classList.add('active');

      // Sync authenticated body class for mobile bottom navigation (< 768px app bar)
      if (viewId === 'home') {
        document.body.classList.remove('authenticated-view');
      } else {
        document.body.classList.add('authenticated-view');
      }

      // Sync mobile bottom navigation tabs
      document.querySelectorAll('.mobile-tab-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      const activeMobileTab = document.getElementById('mobileNavTab-' + viewId);
      if (activeMobileTab) activeMobileTab.classList.add('active');

      // Top navbar visibility (Dashboard and Attendance Cockpit have their own integrated sovereign sidebar & topbar matching screen.png)
      const appHeader = document.getElementById('appHeader');
      if (appHeader) {
        if (viewId === 'dashboard' || viewId === 'attendance' || viewId === 'study-plan' || viewId === 'analytics' || viewId === 'profile') {
          appHeader.style.display = 'none';
        } else {
          appHeader.style.display = 'flex';
        }
      }

      // Update nav link styles
      document.querySelectorAll('.nav-item button').forEach(btn => {
        btn.classList.remove('active');
      });
      const currentBtn = document.getElementById('nav-btn-' + viewId);
      if (currentBtn) currentBtn.classList.add('active');

      if (viewId === 'attendance') {
        updateCockpitUI();
        runAttendanceSimulation();
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ========================================================
    // ATTENDANCE COCKPIT ENGINE (Semester 5 CSE)
    // ========================================================
    const cockpitCourses = [
      { code: 'CS401', name: 'Data Structures & Algorithms', subtitle: 'Core Theory • Module 3 (Trees & Graphs)', held: 40, attended: 38, baseHeld: 40, baseAttended: 38, today: 'present' },
      { code: 'CS402', name: 'Mathematics IV (Probability)', subtitle: 'Applied Math • Module 2 (Eigenvalues & Fourier)', held: 36, attended: 27, baseHeld: 36, baseAttended: 27, today: null },
      { code: 'CS403', name: 'Operating Systems', subtitle: 'Core Systems • Module 4 (Memory & Semaphores)', held: 35, attended: 28, baseHeld: 35, baseAttended: 28, today: null },
      { code: 'CS404', name: 'Design & Analysis of Algo', subtitle: 'Analysis • Module 3 (Greedy & Dynamic)', held: 22, attended: 15, baseHeld: 22, baseAttended: 15, today: null },
      { code: 'CS405', name: 'Digital Logic & Micro Lab', subtitle: 'Practical Lab • Hardware Module 2', held: 16, attended: 15, baseHeld: 16, baseAttended: 15, today: null },
      { code: 'HS401', name: 'Technical Comm & Ethics', subtitle: 'Humanities • Module 1 (Technical Rhetoric)', held: 16, attended: 14, baseHeld: 16, baseAttended: 14, today: null }
    ];

    let currentAttendanceTarget = 0.75;
    let currentSimulatorMode = 'recovery';

    // Daily Attendance Handlers for 6 Subject Cards (Matching screen.png)
    function markSubjectAttendance(code, type) {
      const course = cockpitCourses.find(c => c.code === code);
      if (!course) return;

      const btnPresent = document.getElementById('btn-present-' + code);
      const btnAbsent = document.getElementById('btn-absent-' + code);
      const btnOff = document.getElementById('btn-off-' + code);

      // Reset button styles
      [btnPresent, btnAbsent, btnOff].forEach(b => {
        if (b) {
          b.style.background = 'rgba(255, 255, 255, 0.03)';
          b.style.border = '1px solid rgba(255, 255, 255, 0.08)';
          b.style.color = '#cbd5e1';
          b.style.fontWeight = '600';
        }
      });

      // Rollback previous today action if re-clicking
      if (course.today === 'present') {
        course.attended = Math.max(0, course.attended - 1);
        course.held = Math.max(0, course.held - 1);
      } else if (course.today === 'absent') {
        course.held = Math.max(0, course.held - 1);
      }

      course.today = type;

      if (type === 'present') {
        course.held += 1;
        course.attended += 1;
        if (btnPresent) {
          btnPresent.style.background = '#00d2ff';
          btnPresent.style.border = 'none';
          btnPresent.style.color = '#080d19';
          btnPresent.style.fontWeight = '700';
        }
        showToast('Logged Present: ' + course.code + ' (' + course.attended + '/' + course.held + ' attended)');
      } else if (type === 'absent') {
        course.held += 1;
        if (btnAbsent) {
          btnAbsent.style.background = 'rgba(248, 113, 113, 0.2)';
          btnAbsent.style.border = '1px solid #f87171';
          btnAbsent.style.color = '#f87171';
          btnAbsent.style.fontWeight = '700';
        }
        showToast('Logged Absent: ' + course.code + ' (' + course.attended + '/' + course.held + ' attended)', true);
      } else {
        if (btnOff) {
          btnOff.style.background = 'rgba(255, 255, 255, 0.12)';
          btnOff.style.border = '1px solid rgba(255, 255, 255, 0.25)';
          btnOff.style.color = '#ffffff';
          btnOff.style.fontWeight = '700';
        }
        showToast('Logged No Class / Off for ' + course.code);
      }

      updateCockpitUI();
      runAttendanceSimulation();
    }

    function markAllDailyPresent() {
      cockpitCourses.forEach(c => {
        if (c.today === 'present') {
          c.attended = Math.max(0, c.attended - 1);
          c.held = Math.max(0, c.held - 1);
        } else if (c.today === 'absent') {
          c.held = Math.max(0, c.held - 1);
        }
        c.today = 'present';
        c.held += 1;
        c.attended += 1;

        const btnPresent = document.getElementById('btn-present-' + c.code);
        const btnAbsent = document.getElementById('btn-absent-' + c.code);
        const btnOff = document.getElementById('btn-off-' + c.code);

        [btnAbsent, btnOff].forEach(b => {
          if (b) {
            b.style.background = 'rgba(255, 255, 255, 0.03)';
            b.style.border = '1px solid rgba(255, 255, 255, 0.08)';
            b.style.color = '#cbd5e1';
          }
        });
        if (btnPresent) {
          btnPresent.style.background = '#00d2ff';
          btnPresent.style.border = 'none';
          btnPresent.style.color = '#080d19';
          btnPresent.style.fontWeight = '700';
        }
      });

      updateCockpitUI();
      runAttendanceSimulation();
      showToast('All 6 timetable slots marked Present for Today, Oct 24, 2024.');
    }

    function resetDailyAttendance() {
      cockpitCourses.forEach(c => {
        c.held = c.baseHeld;
        c.attended = c.baseAttended;
        c.today = null;

        const btnPresent = document.getElementById('btn-present-' + c.code);
        const btnAbsent = document.getElementById('btn-absent-' + c.code);
        const btnOff = document.getElementById('btn-off-' + c.code);

        [btnPresent, btnAbsent, btnOff].forEach(b => {
          if (b) {
            b.style.background = 'rgba(255, 255, 255, 0.03)';
            b.style.border = '1px solid rgba(255, 255, 255, 0.08)';
            b.style.color = '#cbd5e1';
            b.style.fontWeight = '600';
          }
        });
      });

      // Default first card present to match screen.png
      const firstCourse = cockpitCourses[0];
      if (firstCourse) {
        firstCourse.today = 'present';
        const b = document.getElementById('btn-present-' + firstCourse.code);
        if (b) {
          b.style.background = '#00d2ff';
          b.style.border = 'none';
          b.style.color = '#080d19';
          b.style.fontWeight = '700';
        }
      }

      updateCockpitUI();
      runAttendanceSimulation();
      showToast('Daily timetable logging reset to baseline.');
    }

    // Interactive Simulator & Telemetry Engine
    function runAttendanceSimulation() {
      const selectEl = document.getElementById('simCourseSelect');
      const sliderEl = document.getElementById('simThresholdSlider');
      if (!selectEl) return;

      const courseCode = selectEl.value;
      const targetPct = sliderEl ? parseFloat(sliderEl.value) : 75;
      const target = targetPct / 100;

      const course = cockpitCourses.find(c => c.code === courseCode) || cockpitCourses[3];
      const curPct = (course.attended / course.held) * 100;

      const alertBanner = document.getElementById('simAlertBanner');
      const alertTitle = document.getElementById('simAlertTitle');
      const alertMsg = document.getElementById('simAlertMessage');
      const alertCur = document.getElementById('simAlertCurrent');
      const streakBadge = document.getElementById('simStreakBadge');
      const streakCount = document.getElementById('simStreakCount');

      if (curPct < targetPct) {
        const needed = Math.ceil((target * course.held - course.attended) / (1 - target));
        if (alertBanner) {
          alertBanner.style.background = 'rgba(248, 113, 113, 0.06)';
          alertBanner.style.borderColor = 'rgba(248, 113, 113, 0.25)';
        }
        if (alertTitle) {
          alertTitle.innerText = 'IMMEDIATE RECOVERY REQUIRED';
          alertTitle.style.color = '#f87171';
        }
        if (alertMsg) {
          alertMsg.innerHTML = 'You must attend the next <strong style="color: #ffffff;">' + needed + ' consecutive classes</strong> without missing to hit <strong style="color: #00d2ff;">' + targetPct.toFixed(1) + '%</strong> (' + (course.attended + needed) + '/' + (course.held + needed) + ' attended).';
        }
        if (alertCur) {
          alertCur.innerText = 'Current standing: ' + course.attended + '/' + course.held + ' (' + curPct.toFixed(1) + '%) is below target threshold.';
        }
        if (streakBadge) streakBadge.style.background = '#dc2626';
        if (streakCount) streakCount.innerText = '+' + needed + ' Classes';
      } else {
        const skippable = Math.floor((course.attended - target * course.held) / target);
        if (alertBanner) {
          alertBanner.style.background = 'rgba(16, 185, 129, 0.06)';
          alertBanner.style.borderColor = 'rgba(16, 185, 129, 0.25)';
        }
        if (alertTitle) {
          alertTitle.innerText = 'SAFE DISCRETIONARY MARGIN';
          alertTitle.style.color = '#34d399';
        }
        if (alertMsg) {
          alertMsg.innerHTML = 'You can safely bunk up to <strong style="color: #ffffff;">' + skippable + ' classes</strong> while staying strictly above <strong style="color: #00d2ff;">' + targetPct.toFixed(1) + '%</strong> (' + course.attended + '/' + (course.held + skippable) + ' attended).';
        }
        if (alertCur) {
          alertCur.innerText = 'Current standing: ' + course.attended + '/' + course.held + ' (' + curPct.toFixed(1) + '%) holds positive safety cushion.';
        }
        if (streakBadge) streakBadge.style.background = '#059669';
        if (streakCount) streakCount.innerText = '+' + skippable + ' Safe';
      }

      // Populate Scenarios Table
      const horizons = [1, 3, 5, 10];
      const tableBody = document.getElementById('simScenariosTableBody');
      if (tableBody) {
        tableBody.innerHTML = horizons.map(k => {
          const pAtt = course.attended + k;
          const pTot = course.held + k;
          const pPct = ((pAtt / pTot) * 100).toFixed(1);

          const aAtt = course.attended;
          const aTot = course.held + k;
          const aPct = ((aAtt / aTot) * 100).toFixed(1);

          const sAtt = course.attended + Math.floor(k / 2);
          const sTot = course.held + k;
          const sPct = ((sAtt / sTot) * 100).toFixed(1);

          const isSafe = parseFloat(pPct) >= targetPct;
          const badgeHtml = isSafe
            ? '<span style="background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px;">Eligible</span>'
            : '<span style="background: rgba(220, 38, 38, 0.2); color: #f87171; border: 1px solid rgba(220, 38, 38, 0.4); font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px;">Debarred</span>';

          return '<tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.04);">' +
            '<td style="padding: 10px 14px; color: #ffffff; font-weight: 600;">+' + k + ' Classes</td>' +
            '<td style="padding: 10px 14px; color: #00d2ff; font-weight: 700;">' + pPct + '% <span style="font-size: 11px; color: #64748b;">(' + pAtt + '/' + pTot + ')</span></td>' +
            '<td style="padding: 10px 14px; color: #94a3b8;">' + aPct + '% <span style="font-size: 11px; color: #64748b;">(' + aAtt + '/' + aTot + ')</span></td>' +
            '<td style="padding: 10px 14px; color: #94a3b8;">' + sPct + '% <span style="font-size: 11px; color: #64748b;">(' + sAtt + '/' + sTot + ')</span></td>' +
            '<td style="padding: 10px 14px; text-align: right;">' + badgeHtml + '</td>' +
          '</tr>';
        }).join('');
      }
    }

    function updateSimThreshold(val) {
      const label = document.getElementById('simThresholdLabel');
      if (label) {
        label.innerText = val + '% ' + (parseInt(val) === 75 ? '(BEU Baseline)' : '(Custom Threshold)');
      }
      runAttendanceSimulation();
    }

    function switchSimulatorMode(mode) {
      currentSimulatorMode = mode;
      const btnRec = document.getElementById('btnPlannerRecovery');
      const btnBunk = document.getElementById('btnPlannerBunk');

      if (mode === 'recovery') {
        if (btnRec) {
          btnRec.style.background = '#00d2ff';
          btnRec.style.color = '#080d19';
          btnRec.style.fontWeight = '700';
        }
        if (btnBunk) {
          btnBunk.style.background = 'transparent';
          btnBunk.style.color = '#94a3b8';
          btnBunk.style.fontWeight = '600';
        }
        showToast('Predictive Mode: Recovery Streak Calculator active.');
      } else {
        if (btnRec) {
          btnRec.style.background = 'transparent';
          btnRec.style.color = '#94a3b8';
          btnRec.style.fontWeight = '600';
        }
        if (btnBunk) {
          btnBunk.style.background = '#00d2ff';
          btnBunk.style.color = '#080d19';
          btnBunk.style.fontWeight = '700';
        }
        showToast('Predictive Mode: Bunk Margin & Skip Quotas active.');
      }
      runAttendanceSimulation();
    }

    function setAttendanceTarget(target) {
      currentAttendanceTarget = target;
      const btn75 = document.getElementById('btnTarget75');
      const btn80 = document.getElementById('btnTarget80');
      
      if (target === 0.75) {
        if (btn75) {
          btn75.style.background = 'var(--sky-gradient)';
          btn75.style.color = '#080c14';
        }
        if (btn80) {
          btn80.style.background = 'transparent';
          btn80.style.color = '#94a3b8';
        }
        const sTarget = document.getElementById('sidebarTargetLabel');
        if (sTarget) sTarget.innerText = 'Target: 75%';
      } else {
        if (btn75) {
          btn75.style.background = 'transparent';
          btn75.style.color = '#94a3b8';
        }
        if (btn80) {
          btn80.style.background = 'var(--sky-gradient)';
          btn80.style.color = '#080c14';
        }
        const sTarget = document.getElementById('sidebarTargetLabel');
        if (sTarget) sTarget.innerText = 'Target: 80%';
      }

      updateCockpitUI();
      showToast(`Threshold recalibrated to ${(target * 100).toFixed(0)}%. Course margins updated.`);
    }

    function markCourse(code, isPresent) {
      const course = cockpitCourses.find(c => c.code === code);
      if (!course) return;

      course.held += 1;
      if (isPresent) {
        course.attended += 1;
        showToast(`Logged Present: ${course.code} (${course.attended}/${course.held})`);
      } else {
        showToast(`Logged Absent: ${course.code} (${course.attended}/${course.held})`, true);
      }

      updateCockpitUI();
    }

    function updateCockpitUI() {
      let totalHeld = 0;
      let totalAttended = 0;
      let hazardCourses = [];
      let netCushionSlots = 0;

      cockpitCourses.forEach(c => {
        totalHeld += c.held;
        totalAttended += c.attended;

        const pct = (c.attended / c.held) * 100;
        const targetPct = currentAttendanceTarget * 100;
        const marginDelta = pct - targetPct;

        // Elements
        const pctEl = document.getElementById('pct-' + c.code);
        const countsEl = document.getElementById('counts-' + c.code);
        const marginEl = document.getElementById('margin-' + c.code);
        const barEl = document.getElementById('bar-' + c.code);
        const badgeEl = document.getElementById('badge-' + c.code);
        const alertBoxEl = document.getElementById('alert-' + c.code);
        const alertTextEl = document.getElementById('alertText-' + c.code);

        if (pctEl) pctEl.innerText = pct.toFixed(1) + '%';
        if (countsEl) countsEl.innerText = `(${c.attended}/${c.held})`;

        if (pct >= targetPct) {
          // Safe buffer
          const safeSkips = Math.floor((c.attended - currentAttendanceTarget * c.held) / currentAttendanceTarget);
          netCushionSlots += safeSkips;

          if (pctEl) pctEl.style.color = pct < targetPct + 3 ? '#38bdf8' : '#34d399';
          if (barEl) {
            barEl.style.width = Math.min(pct, 100) + '%';
            barEl.style.background = pct < targetPct + 3 ? '#38bdf8' : '#34d399';
          }
          if (marginEl) {
            marginEl.style.background = pct < targetPct + 3 ? 'rgba(56, 189, 248, 0.15)' : 'rgba(16, 185, 129, 0.15)';
            marginEl.style.color = pct < targetPct + 3 ? '#38bdf8' : '#34d399';
            marginEl.innerText = `+${marginDelta.toFixed(1)}% ${pct < targetPct + 3 ? 'tight margin' : 'safe'}`;
          }
          if (badgeEl) {
            badgeEl.style.background = pct < targetPct + 3 ? 'rgba(56, 189, 248, 0.15)' : 'rgba(16, 185, 129, 0.15)';
            badgeEl.style.color = pct < targetPct + 3 ? '#38bdf8' : '#34d399';
            badgeEl.style.borderColor = pct < targetPct + 3 ? 'rgba(56, 189, 248, 0.3)' : 'rgba(16, 185, 129, 0.3)';
            badgeEl.innerText = pct < targetPct + 3 ? '✦ Borderline' : 'Safe Buffer';
          }
          if (alertBoxEl) {
            alertBoxEl.style.background = pct < targetPct + 3 ? 'rgba(56, 189, 248, 0.06)' : 'rgba(16, 185, 129, 0.06)';
            alertBoxEl.style.borderColor = pct < targetPct + 3 ? 'rgba(56, 189, 248, 0.25)' : 'rgba(16, 185, 129, 0.25)';
            alertBoxEl.style.color = pct < targetPct + 3 ? '#bae6fd' : '#a7f3d0';
          }
          if (alertTextEl) {
            if (safeSkips === 0) {
              alertTextEl.innerHTML = `Cannot skip any class. Next single absence immediately plunges your score down to <strong style="color: #f43f5e;">${(((c.attended) / (c.held + 1)) * 100).toFixed(1)}%</strong>.`;
            } else {
              alertTextEl.innerHTML = `You can safely bunk up to <strong style="color: #fff;">${safeSkips} lecture${safeSkips === 1 ? '' : 's'}</strong> while maintaining above ${targetPct.toFixed(0)}% threshold.`;
            }
          }
        } else {
          // Debar Hazard
          hazardCourses.push(c);
          const needed = Math.ceil((currentAttendanceTarget * c.held - c.attended) / (1 - currentAttendanceTarget));

          if (pctEl) pctEl.style.color = '#f43f5e';
          if (barEl) {
            barEl.style.width = Math.min(pct, 100) + '%';
            barEl.style.background = '#f43f5e';
          }
          if (marginEl) {
            marginEl.style.background = 'rgba(244, 63, 94, 0.15)';
            marginEl.style.color = '#f43f5e';
            marginEl.innerText = `${marginDelta.toFixed(1)}% to ${targetPct.toFixed(0)}%`;
          }
          if (badgeEl) {
            badgeEl.style.background = 'rgba(244, 63, 94, 0.15)';
            badgeEl.style.color = '#f43f5e';
            badgeEl.style.borderColor = 'rgba(244, 63, 94, 0.3)';
            badgeEl.innerText = '▲ Debar Risk';
          }
          if (alertBoxEl) {
            alertBoxEl.style.background = 'rgba(244, 63, 94, 0.06)';
            alertBoxEl.style.borderColor = 'rgba(244, 63, 94, 0.25)';
            alertBoxEl.style.color = '#fca5a5';
          }
          if (alertTextEl) {
            alertTextEl.innerHTML = `Attend next <strong style="color: #fff;">${needed} consecutive</strong> lectures to reclaim safe ${targetPct.toFixed(0)}% threshold. Zero bunk allowance.`;
          }
        }
      });

      // Overall calculations (including historical aggregate of 194 / 236)
      const baseHeld = 236;
      const baseAtt = 194;
      const totalDeltaAtt = totalAttended - (21 + 23 + 21 + 16 + 21);
      const totalDeltaHeld = totalHeld - (29 + 26 + 25 + 21 + 26);
      const curAttendedAll = baseAtt + totalDeltaAtt;
      const curHeldAll = baseHeld + totalDeltaHeld;
      const aggPct = (curAttendedAll / curHeldAll) * 100;
      const missedCount = curHeldAll - curAttendedAll;
      const missedPct = (missedCount / curHeldAll) * 100;

      // Update KPI Cards
      const kpiPct = document.getElementById('kpiAggregatePct');
      if (kpiPct) kpiPct.innerText = aggPct.toFixed(1) + '%';
      
      const kpiSub = document.getElementById('kpiAggregateSub');
      if (kpiSub) kpiSub.innerText = `${curAttendedAll} attended of ${curHeldAll} held`;

      const kpiBadge = document.getElementById('kpiAggregateBadge');
      if (kpiBadge) {
        const buffer = aggPct - (currentAttendanceTarget * 100);
        kpiBadge.innerText = (buffer >= 0 ? '+' : '') + buffer.toFixed(1) + '% buffer';
        kpiBadge.style.color = buffer >= 0 ? '#34d399' : '#f43f5e';
      }

      const kpiMissedVal = document.getElementById('kpiMissedVal');
      if (kpiMissedVal) kpiMissedVal.innerText = missedCount;

      const kpiMissedTotal = document.getElementById('kpiMissedTotal');
      if (kpiMissedTotal) kpiMissedTotal.innerText = `/ ${curHeldAll}`;

      const kpiMissedPct = document.getElementById('kpiMissedPct');
      if (kpiMissedPct) kpiMissedPct.innerText = `${missedPct.toFixed(1)}% Absenteeism`;

      const kpiCushionVal = document.getElementById('kpiCushionVal');
      if (kpiCushionVal) kpiCushionVal.innerText = (netCushionSlots >= 0 ? '+' : '') + netCushionSlots;

      const kpiHazardCount = document.getElementById('kpiHazardCount');
      if (kpiHazardCount) {
        kpiHazardCount.innerText = hazardCourses.length === 0 ? '0 Courses' : `${hazardCourses.length} Course${hazardCourses.length > 1 ? 's' : ''}`;
        kpiHazardCount.style.color = hazardCourses.length === 0 ? '#34d399' : '#ffffff';
      }

      const kpiHazardName = document.getElementById('kpiHazardName');
      if (kpiHazardName) {
        if (hazardCourses.length === 0) {
          kpiHazardName.innerText = 'All modules above threshold';
          kpiHazardName.style.color = '#34d399';
        } else {
          kpiHazardName.innerText = `${hazardCourses[0].code} (${hazardCourses[0].name.split(' ')[0]}) critically breached`;
          kpiHazardName.style.color = '#fca5a5';
        }
      }

      // Sidebar indicators
      const sPill = document.getElementById('sidebarSafePill');
      if (sPill) {
        const safeTotal = Math.max(0, netCushionSlots);
        sPill.innerText = `+${safeTotal} safe`;
        sPill.style.color = safeTotal > 0 ? '#34d399' : '#f43f5e';
      }
      const sCurr = document.getElementById('sidebarCurrentLabel');
      if (sCurr) sCurr.innerText = aggPct.toFixed(1) + '%';

      // Update Copilot advice
      const copilotText = document.getElementById('copilotAdviceText');
      if (copilotText) {
        if (hazardCourses.length > 0) {
          const worst = hazardCourses[0];
          const needed = Math.ceil((currentAttendanceTarget * worst.held - worst.attended) / (1 - currentAttendanceTarget));
          copilotText.innerHTML = `Prioritize upcoming <strong>${worst.name}</strong> sessions (${worst.schedule}). Attending next ${needed} classes elevates ${worst.code} above ${(currentAttendanceTarget * 100).toFixed(0)}%, securing full debarment immunity.`;
        } else {
          copilotText.innerHTML = `All courses exceed current defense threshold (${(currentAttendanceTarget * 100).toFixed(0)}%). You hold <strong>+${netCushionSlots} bunk buffers</strong> across all modules without risking debarment.`;
        }
      }

      // Re-run Forecaster
      const slider = document.getElementById('forecasterMissedSlider');
      if (slider) handleForecasterSlider(slider.value);

      // Update New Cockpit Metric Cards (screen.png)
      const overallPctEl = document.getElementById('cockpitOverallPct');
      const overallBufferEl = document.getElementById('cockpitOverallBuffer');
      const totalHeldEl = document.getElementById('cockpitTotalHeld');
      const totalAttendedEl = document.getElementById('cockpitTotalAttended');
      const totalMissedEl = document.getElementById('cockpitTotalMissed');
      const critCountEl = document.getElementById('cockpitCritCount');
      const critSubEl = document.getElementById('cockpitCritSub');
      const safeBunksEl = document.getElementById('cockpitSafeBunks');
      const donutPctEl = document.getElementById('donutAggregatePct');

      // 142 held, 116 attended, 26 missed base + any changes from today
      const diffAttended = totalAttended - (38 + 27 + 28 + 15 + 15 + 14);
      const diffHeld = totalHeld - (40 + 36 + 35 + 22 + 16 + 16);
      const curAttended142 = 116 + diffAttended;
      const curHeld142 = 142 + diffHeld;
      const curMissed142 = curHeld142 - curAttended142;
      const curPct142 = (curAttended142 / curHeld142) * 100;
      const curBuffer = curPct142 - 75.0;

      const formattedPct = (81.4 + (curPct142 - 81.69)).toFixed(1) + '%';
      if (overallPctEl) overallPctEl.innerText = formattedPct;
      if (donutPctEl) donutPctEl.innerText = formattedPct;
      if (overallBufferEl) {
        overallBufferEl.innerText = (curBuffer >= 0 ? '+' : '') + curBuffer.toFixed(1) + '% Buffer';
        overallBufferEl.style.color = curBuffer >= 0 ? '#00d2ff' : '#f87171';
      }
      if (totalHeldEl) totalHeldEl.innerText = curHeld142;
      if (totalAttendedEl) totalAttendedEl.innerText = curAttended142;
      if (totalMissedEl) totalMissedEl.innerText = curMissed142;

      // Update critical count
      const criticalCourses = cockpitCourses.filter(c => (c.attended / c.held) < 0.75);
      if (critCountEl) {
        critCountEl.innerText = criticalCourses.length === 1 ? '1 Course' : criticalCourses.length + ' Courses';
        critCountEl.style.color = criticalCourses.length === 0 ? '#34d399' : '#f87171';
      }
      if (critSubEl) {
        if (criticalCourses.length > 0) {
          critSubEl.innerText = criticalCourses[0].code + ' ' + criticalCourses[0].name.split(' ')[0] + ' ' + ((criticalCourses[0].attended / criticalCourses[0].held) * 100).toFixed(1) + '%';
          critSubEl.style.color = '#fca5a5';
        } else {
          critSubEl.innerText = 'All modules above 75% cutoff';
          critSubEl.style.color = '#34d399';
        }
      }

      // Update discretionary bunks
      let totalSafePeriods = 0;
      cockpitCourses.forEach(c => {
        if ((c.attended / c.held) >= 0.75) {
          totalSafePeriods += Math.floor((c.attended - 0.75 * c.held) / 0.75);
        }
      });
      if (safeBunksEl) safeBunksEl.innerText = Math.max(0, totalSafePeriods);

      // Update individual 6 cards (screen.png)
      cockpitCourses.forEach(c => {
        const pct = (c.attended / c.held) * 100;
        const pEl = document.getElementById('pct-' + c.code);
        const cntEl = document.getElementById('counts-' + c.code);
        const cshEl = document.getElementById('cushion-' + c.code);
        const bEl = document.getElementById('bar-' + c.code);

        if (pEl) {
          pEl.innerText = pct.toFixed(1) + '%';
          pEl.style.color = pct < 75 ? '#f87171' : (c.code === 'CS402' ? '#ffffff' : '#00d2ff');
        }
        if (cntEl) cntEl.innerText = '(' + c.attended + '/' + c.held + ' attended)';
        if (bEl) {
          bEl.style.width = Math.min(pct, 100) + '%';
          bEl.style.background = pct < 75 ? '#f87171' : '#00d2ff';
        }
        if (cshEl) {
          if (pct < 75) {
            const need = Math.ceil((0.75 * c.held - c.attended) / 0.25);
            cshEl.innerText = 'Needs ' + need + ' to hit 75%';
            cshEl.style.color = '#fb923c';
          } else {
            const skip = Math.floor((c.attended - 0.75 * c.held) / 0.75);
            cshEl.innerText = skip + ' skippable';
            cshEl.style.color = skip === 0 ? '#f87171' : '#34d399';
          }
        }
      });
    }

    function handleForecasterSlider(val) {
      const num = parseInt(val, 10);
      const display = document.getElementById('forecasterSliderVal');
      if (display) display.innerText = num;

      const baseHeld = 236;
      const baseAttended = 194;
      const futureTotal = 10;
      const futureAttended = Math.max(0, futureTotal - num);

      const projectedHeld = baseHeld + futureTotal;
      const projectedAttended = baseAttended + futureAttended;
      const currentPct = ((baseAttended / baseHeld) * 100);
      const projPct = ((projectedAttended / projectedHeld) * 100);
      const delta = (projPct - currentPct);

      const simCurrentAgg = document.getElementById('simCurrentAgg');
      if (simCurrentAgg) simCurrentAgg.innerText = currentPct.toFixed(2) + '%';

      const simProjectedAgg = document.getElementById('simProjectedAgg');
      if (simProjectedAgg) simProjectedAgg.innerText = projPct.toFixed(2) + '%';

      const simProjectedSub = document.getElementById('simProjectedSub');
      if (simProjectedSub) simProjectedSub.innerText = `${projectedAttended} / ${projectedHeld}`;

      const simMarginDelta = document.getElementById('simMarginDelta');
      if (simMarginDelta) {
        simMarginDelta.innerText = (delta >= 0 ? '+' : '') + delta.toFixed(2) + '%';
        simMarginDelta.style.color = projPct >= (currentAttendanceTarget * 100) ? '#34d399' : '#f43f5e';
      }

      const simMarginStatus = document.getElementById('simMarginStatus');
      if (simMarginStatus) {
        if (projPct >= 80) {
          simMarginStatus.innerText = 'Optimal Safety';
          simMarginStatus.style.color = '#34d399';
        } else if (projPct >= 75) {
          simMarginStatus.innerText = 'Within Safe Range';
          simMarginStatus.style.color = '#38bdf8';
        } else {
          simMarginStatus.innerText = 'Debar Threat!';
          simMarginStatus.style.color = '#f43f5e';
        }
      }
    }

    function resetBunkSlider() {
      const slider = document.getElementById('forecasterMissedSlider');
      if (slider) {
        slider.value = 0;
        handleForecasterSlider(0);
        showToast('Reset forecaster: zero anticipated absences modeled.');
      }
    }

    function filterAttendanceCards(query) {
      const q = (query || '').toLowerCase().trim();
      const cards = document.querySelectorAll('.course-card');
      cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        if (!q || text.includes(q)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    // OD & Medical Claim Handlers
    function openFileODModal() {
      const modal = document.getElementById('odModal');
      if (modal) modal.classList.add('active');
    }
    function closeFileODModal() {
      const modal = document.getElementById('odModal');
      if (modal) modal.classList.remove('active');
    }
    function closeODModalOnOutside(e) {
      if (e && e.target && e.target.id === 'odModal') closeFileODModal();
    }
    function handleODFileSelected(input) {
      if (input && input.files && input.files[0]) {
        const label = document.getElementById('odFileLabel');
        if (label) label.innerHTML = `<strong style="color: #34d399;">✓ Attached:</strong> ${input.files[0].name}`;
      }
    }
    function handleODSubmit(e) {
      if (e) e.preventDefault();
      const courseSelect = document.getElementById('odCourseSelect');
      const typeSelect = document.getElementById('odTypeSelect');
      const countInput = document.getElementById('odLectureCount');
      const refInput = document.getElementById('odRefCode');
      if (!courseSelect || !typeSelect) return;

      const courseCode = courseSelect.value;
      const type = typeSelect.value;
      const count = countInput ? (parseInt(countInput.value, 10) || 1) : 1;
      const ref = (refInput && refInput.value) ? refInput.value : 'Sanctioned';

      // Apply credit if specific course
      if (courseCode !== 'ALL') {
        const c = cockpitCourses.find(item => item.code === courseCode);
        if (c) {
          c.attended += count;
          showToast(`OD Approved: +${count} lectures credited to ${c.code}!`);
        }
      } else {
        cockpitCourses.forEach(c => c.attended += 1);
        showToast(`OD Approved: +${count} lectures credited across all modules!`);
      }

      // Add to list
      const list = document.getElementById('dutyCreditsList');
      if (list) {
        const item = document.createElement('div');
        item.style.cssText = 'background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 8px; padding: 12px 14px; display: flex; justify-content: space-between; align-items: center; animation: fadeIn 0.3s ease;';
        item.innerHTML = `
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 32px; height: 32px; border-radius: 6px; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); display: flex; align-items: center; justify-content: center; color: #38bdf8;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <div style="font-size: 13.5px; font-weight: 700; color: #ffffff;">${type}</div>
              <div style="font-size: 11.5px; color: #64748b; margin-top: 2px;">
                ${courseCode === 'ALL' ? 'All Classes' : courseCode} • <span style="color: #94a3b8;">${ref}</span>
              </div>
            </div>
          </div>
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 10.5px; font-weight: 700; background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); padding: 3px 8px; border-radius: 4px;">
            +${count} Applied
          </span>
        `;
        list.prepend(item);
      }

      closeFileODModal();
      updateCockpitUI();
    }

    // Profile Modal Handlers
    function openProfileModal(isOnboarding = false) {
      if (typeof applyProfileToUI === 'function') applyProfileToUI();
      const modal = document.getElementById('profileModal');
      const banner = document.getElementById('profileOnboardingBanner');
      const title = document.getElementById('profileModalTitle');
      const sub = document.getElementById('profileModalSubtitle');
      const submitBtnText = document.getElementById('editProfileSubmitBtnText');

      if (isOnboarding) {
        if (banner) banner.style.display = 'block';
        if (title) title.innerText = 'Setup Student Profile';
        if (sub) sub.innerText = 'Configure your academic credentials to calibrate your statutory autopilot';
        if (submitBtnText) submitBtnText.innerText = 'Save & Launch Cockpit 🚀';
      } else {
        if (banner) banner.style.display = 'none';
        if (title) title.innerText = 'Edit Student Profile';
        if (sub) sub.innerText = 'Update personal details and academic standing metrics';
        if (submitBtnText) submitBtnText.innerText = 'Save Profile';
      }

      if (modal) modal.classList.add('active');

      // Autofocus the first field for quick entry
      setTimeout(() => {
        const nameInput = document.getElementById('editProfileName');
        const rollInput = document.getElementById('editProfileRoll');
        if (isOnboarding) {
          if (nameInput && (!nameInput.value || nameInput.value === 'Student' || nameInput.value.startsWith('New Student'))) {
            nameInput.focus();
            nameInput.select();
          } else if (rollInput) {
            rollInput.focus();
          }
        }
      }, 120);
    }

    function closeProfileModal() {
      const modal = document.getElementById('profileModal');
      if (modal) modal.classList.remove('active');
    }
    function closeProfileModalOnOutside(e) {
      if (e && e.target && e.target.id === 'profileModal') closeProfileModal();
    }

    // Login Modal Handlers & Auth State
    let currentAuthMode = 'signin';

    function setAuthMode(mode) {
      currentAuthMode = mode;
      const signInBtn = document.getElementById('authModeSignInBtn');
      const signUpBtn = document.getElementById('authModeSignUpBtn');
      const nameGroup = document.getElementById('loginFullNameGroup');
      const submitBtnText = document.getElementById('loginSubmitBtnText');
      const subTitle = document.getElementById('loginModalSubTitle');
      const demoSection = document.getElementById('loginDemoProfilesSection');

      if (mode === 'signup') {
        if (signInBtn) {
          signInBtn.style.background = 'transparent';
          signInBtn.style.color = '#94a3b8';
          signInBtn.style.fontWeight = '600';
        }
        if (signUpBtn) {
          signUpBtn.style.background = 'rgba(0, 210, 255, 0.2)';
          signUpBtn.style.color = '#00d2ff';
          signUpBtn.style.fontWeight = '750';
        }
        if (nameGroup) nameGroup.style.display = 'block';
        if (submitBtnText) submitBtnText.innerText = 'Register & Setup Profile →';
        if (subTitle) subTitle.innerText = 'New Student Account Setup';
        if (demoSection) demoSection.style.display = 'none';
      } else {
        if (signInBtn) {
          signInBtn.style.background = 'rgba(0, 210, 255, 0.2)';
          signInBtn.style.color = '#00d2ff';
          signInBtn.style.fontWeight = '750';
        }
        if (signUpBtn) {
          signUpBtn.style.background = 'transparent';
          signUpBtn.style.color = '#94a3b8';
          signUpBtn.style.fontWeight = '600';
        }
        if (nameGroup) nameGroup.style.display = 'none';
        if (submitBtnText) submitBtnText.innerText = 'Login to Student Terminal ↗';
        if (subTitle) subTitle.innerText = 'Autonomous Academic Portal';
        if (demoSection) demoSection.style.display = 'block';
      }
    }

    function openLoginModal() {
      const modal = document.getElementById('loginModal');
      if (modal) modal.classList.add('active');
    }
    function closeLoginModal() {
      const modal = document.getElementById('loginModal');
      if (modal) modal.classList.remove('active');
    }
    function closeLoginModalOnOutside(e) {
      if (e && e.target && e.target.id === 'loginModal') {
        closeLoginModal();
      }
    }

    function activateLoggedInUI() {
      state.isLoggedIn = true;

      // Adjust navigation visibility safely
      document.querySelectorAll('.pre-login-only').forEach(el => {
        if (el) el.style.display = 'none';
      });
      document.querySelectorAll('.post-login-only').forEach(el => {
        if (el) el.style.display = 'block';
      });
      const pre = document.getElementById('preLoginActions');
      if (pre) pre.style.display = 'none';
      const post = document.getElementById('postLoginProfile');
      if (post) post.style.display = 'flex';

      // Update navLoginBtn on homepage header if present
      const navLogin = document.getElementById('navLoginBtn');
      if (navLogin) {
        navLogin.innerHTML = `
          <span style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; box-shadow: 0 0 6px #10b981;"></span>
          Dashboard →
        `;
        navLogin.onclick = () => navigateTo('dashboard');
      }

      // Render updated tables & dashboard
      if (typeof renderDashboardMatrix === 'function') renderDashboardMatrix();
      if (typeof renderAttendanceRiskTable === 'function') renderAttendanceRiskTable();
      if (typeof runBunkSimulation === 'function') runBunkSimulation();
      if (typeof renderTimeline === 'function') renderTimeline(state.activeTimeline);
      if (typeof calculateGradCGPA === 'function') calculateGradCGPA();
    }

    function handleLoginSubmit(e) {
      if (e && typeof e.preventDefault === 'function') e.preventDefault();

      const emailInput = document.getElementById('loginEmail');
      const passInput = document.getElementById('loginPass');
      const nameInput = document.getElementById('signupFullName');

      const email = (emailInput?.value || '').trim();
      const pass = (passInput?.value || '').trim();
      const enteredName = (nameInput?.value || '').trim();

      if (!email) {
        if (typeof showToast === 'function') showToast('Please enter your student email');
        return;
      }

      const users = getRegisteredUsers();
      const emailKey = email.toLowerCase();
      const isSignUp = currentAuthMode === 'signup';
      const existingUser = users[emailKey];

      // A user is treated as a new user if:
      // 1. Explicitly in signup mode
      // 2. Or the email is not in the registered users database
      // 3. Or their profile has not been completed yet
      const isNewUser = isSignUp || !existingUser || !existingUser.profileCompleted;

      if (isNewUser) {
        // Derive clean initial name from entered name or email username
        let studentName = enteredName;
        if (!studentName) {
          const emailUser = email.split('@')[0].replace(/[._-]/g, ' ');
          studentName = emailUser.split(' ')
            .filter(Boolean)
            .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(' ') || 'New Student';
        }

        // Initialize fresh profile for this student
        const newProfile = {
          name: studentName,
          roll: '', // intentionally empty to ask user
          institute: 'National Institute of Technology (NIT) / Tech University',
          branch: 'Bachelor of Technology - Computer Science & Engineering (B.Tech CSE)',
          sem: 'Sem 1 (Fall)',
          cohort: '2024 — 2028',
          cgpa: 8.00,
          targetCgpa: 8.50,
          email: email,
          phone: '',
          advisor: 'Prof. Faculty Advisor',
          advisorContact: 'advisor@btech.ac.in • Room 101'
        };

        // Record user as logged in with profile pending
        users[emailKey] = {
          email: email,
          profileCompleted: false,
          profile: newProfile
        };

        try {
          localStorage.setItem('annovexa_registered_users', JSON.stringify(users));
          localStorage.setItem('annovexa_current_user_email', email);
          localStorage.setItem('annovexa_student_profile', JSON.stringify(newProfile));
        } catch (err) {
          console.error('Error saving new student credentials', err);
        }

        // Activate logged-in UI and close login modal
        activateLoggedInUI();
        closeLoginModal();
        applyProfileToUI();
        navigateTo('dashboard');

        // Populate fields in the Edit Student Profile modal
        const inName = document.getElementById('editProfileName');
        if (inName) inName.value = newProfile.name;
        const inRoll = document.getElementById('editProfileRoll');
        if (inRoll) inRoll.value = '';
        const inEmail = document.getElementById('editProfileEmail');
        if (inEmail) inEmail.value = email;
        const inInstitute = document.getElementById('editProfileInstitute');
        if (inInstitute) inInstitute.value = newProfile.institute;
        const inBranch = document.getElementById('editProfileBranch');
        if (inBranch) inBranch.value = newProfile.branch;
        const inSem = document.getElementById('editProfileSem');
        if (inSem) inSem.value = newProfile.sem;
        const inCohort = document.getElementById('editProfileCohort');
        if (inCohort) inCohort.value = newProfile.cohort;
        const inCgpa = document.getElementById('editProfileCgpa');
        if (inCgpa) inCgpa.value = newProfile.cgpa;
        const inTargetCgpa = document.getElementById('editProfileTargetCgpa');
        if (inTargetCgpa) inTargetCgpa.value = newProfile.targetCgpa;

        // Prompt user immediately by opening the Edit Student Profile modal!
        openProfileModal(true);

        if (typeof showToast === 'function') {
          showToast(`✨ Welcome to Annovexa, ${studentName}! Please configure your student profile.`);
        }
      } else {
        // Existing user with completed profile
        try {
          localStorage.setItem('annovexa_current_user_email', email);
          if (existingUser.profile) {
            localStorage.setItem('annovexa_student_profile', JSON.stringify(existingUser.profile));
          }
        } catch (err) {
          console.error(err);
        }

        activateLoggedInUI();
        closeLoginModal();
        applyProfileToUI();
        navigateTo('dashboard');

        if (typeof showToast === 'function') {
          showToast(`Welcome back, ${existingUser.profile?.name || 'Student'}! Terminal unlocked.`);
        }
      }
    }

    function quickDemoLogin() {
      // Set to demo profile Alex Vance
      const alexProfile = Object.assign({}, defaultStudentProfile);
      try {
        localStorage.setItem('annovexa_current_user_email', 'alex.vance@btech.ac.in');
        localStorage.setItem('annovexa_student_profile', JSON.stringify(alexProfile));
      } catch (err) {}

      activateLoggedInUI();
      closeLoginModal();
      applyProfileToUI();
      navigateTo('dashboard');
      if (typeof showToast === 'function') {
        showToast('Demo Terminal initialized as Alex Vance (B.Tech CSE)');
      }
    }

    function handleLogout() {
      state.isLoggedIn = false;
      try {
        localStorage.removeItem('annovexa_current_user_email');
      } catch (e) {}

      if (typeof closeProfileModal === 'function') closeProfileModal();
      document.querySelectorAll('.pre-login-only').forEach(el => {
        if (el) el.style.display = 'block';
      });
      document.querySelectorAll('.post-login-only').forEach(el => {
        if (el) el.style.display = 'none';
      });
      const pre = document.getElementById('preLoginActions');
      if (pre) pre.style.display = 'block';
      const post = document.getElementById('postLoginProfile');
      if (post) post.style.display = 'none';

      const navLogin = document.getElementById('navLoginBtn');
      if (navLogin) {
        navLogin.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
            <polyline points="10 17 15 12 10 7"/>
            <line x1="15" y1="12" x2="3" y2="12"/>
          </svg>
          Login
        `;
        navLogin.onclick = () => openLoginModal();
      }

      navigateTo('home');
      if (typeof showToast === 'function') showToast('Signed out successfully. Academic session locked.');
    }

    // ========================================================
    // SOVEREIGN DASHBOARD INTERACTIVE HANDLERS
    // ========================================================
    function toggleUserDropdown() {
      const dd = document.getElementById('userDropdownMenu');
      if (dd) {
        dd.style.display = dd.style.display === 'none' ? 'block' : 'none';
      }
    }

    // Close user dropdown if clicking outside
    document.addEventListener('click', function(e) {
      const dd = document.getElementById('userDropdownMenu');
      const trigger = e.target.closest('#dashUserMenuTrigger');
      if (dd && dd.style.display === 'block' && !trigger && !dd.contains(e.target)) {
        dd.style.display = 'none';
      }
    });

    let focusTimerInterval = null;
    let focusRemainingSeconds = 5400; // 90 minutes
    let isFocusRunning = false;

    function startFocusBlock(title, minutes) {
      const modal = document.getElementById('focusTimerModal');
      const titleEl = document.getElementById('focusBlockTitle');
      const digitsEl = document.getElementById('focusTimerDigits');
      if (titleEl) titleEl.innerText = title;
      focusRemainingSeconds = minutes * 60;
      isFocusRunning = true;
      if (digitsEl) {
        const m = Math.floor(focusRemainingSeconds / 60);
        const s = focusRemainingSeconds % 60;
        digitsEl.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
      }
      const playPauseBtn = document.getElementById('focusPlayPauseBtn');
      if (playPauseBtn) playPauseBtn.innerText = 'Pause Session';

      clearInterval(focusTimerInterval);
      focusTimerInterval = setInterval(() => {
        if (isFocusRunning && focusRemainingSeconds > 0) {
          focusRemainingSeconds--;
          const m = Math.floor(focusRemainingSeconds / 60);
          const s = focusRemainingSeconds % 60;
          if (digitsEl) digitsEl.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
          if (focusRemainingSeconds === 0) {
            clearInterval(focusTimerInterval);
            showToast('Focus session complete! Excellent work.');
          }
        }
      }, 1000);

      if (modal) modal.classList.add('active');
    }

    function toggleFocusTimer() {
      isFocusRunning = !isFocusRunning;
      const playPauseBtn = document.getElementById('focusPlayPauseBtn');
      if (playPauseBtn) {
        playPauseBtn.innerText = isFocusRunning ? 'Pause Session' : 'Resume Session';
      }
    }

    function finishFocusBlock() {
      clearInterval(focusTimerInterval);
      closeFocusTimerModal();
      showToast('Focus block completed! 90 mins logged to Study Analytics.');
      // Mark slot 3 as completed
      const slot = document.getElementById('slot-3');
      if (slot) {
        const btn = slot.querySelector('button');
        if (btn) {
          btn.style.background = '#00d2ff';
          btn.style.border = 'none';
          btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#080d19" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>';
        }
        const badge = slot.querySelector('.slot-status-badge');
        if (badge) {
          badge.className = 'slot-status-badge';
          badge.style.color = '#38bdf8';
          badge.style.background = 'rgba(56, 189, 248, 0.15)';
          badge.innerText = 'Completed';
        }
        const title = slot.querySelector('.slot-title');
        if (title) {
          title.style.textDecoration = 'line-through';
          title.style.color = '#94a3b8';
        }
      }
    }

    function closeFocusTimerModal() {
      const modal = document.getElementById('focusTimerModal');
      if (modal) modal.classList.remove('active');
    }

    function closeFocusTimerModalOnOutside(e) {
      if (e && e.target && e.target.id === 'focusTimerModal') closeFocusTimerModal();
    }

    function toggleTimelineSlot(index) {
      const slot = document.getElementById('slot-' + index);
      if (!slot) return;
      const btn = slot.querySelector('button');
      const badge = slot.querySelector('.slot-status-badge');
      const title = slot.querySelector('.slot-title');
      const isCompleted = btn && (btn.style.background === 'rgb(0, 210, 255)' || btn.style.background === '#00d2ff');

      if (isCompleted) {
        // Toggle back to pending
        if (btn) {
          btn.style.background = 'transparent';
          btn.style.border = '2px solid #475569';
          btn.innerHTML = '';
        }
        if (badge) {
          badge.style.color = '#f87171';
          badge.style.background = 'transparent';
          badge.innerText = 'Pending';
        }
        if (title) {
          title.style.textDecoration = 'none';
          title.style.color = '#ffffff';
        }
        showToast('Task marked pending.');
      } else {
        // Complete
        if (btn) {
          btn.style.background = '#00d2ff';
          btn.style.border = 'none';
          btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#080d19" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>';
        }
        if (badge) {
          badge.style.color = '#38bdf8';
          badge.style.background = 'rgba(56, 189, 248, 0.15)';
          badge.innerText = 'Completed';
        }
        if (title) {
          title.style.textDecoration = 'line-through';
          title.style.color = '#94a3b8';
        }
        showToast('Task marked complete ✓');
      }
    }

    function generateAdaptiveSchedule() {
      showToast('Generating AI Adaptive Schedule based on attendance cushion and syllabus backlog...');
      setTimeout(() => {
        showToast('Study schedule regenerated! Priority assigned to CS402 and CS401.');
      }, 900);
    }

    function openRemedialModal() {
      const modal = document.getElementById('remedialModal');
      if (modal) modal.classList.add('active');
    }
    function closeRemedialModal() {
      const modal = document.getElementById('remedialModal');
      if (modal) modal.classList.remove('active');
    }
    function closeRemedialModalOnOutside(e) {
      if (e && e.target && e.target.id === 'remedialModal') closeRemedialModal();
    }

    function dismissAdvisory() {
      const banner = document.getElementById('advisoryBanner');
      if (banner) {
        banner.style.transition = 'all 0.3s ease';
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          if (banner) banner.style.display = 'none';
        }, 300);
        showToast('Advisory dismissed. Archived in Academic Log.');
      }
    }

    function openQuizUploadModal() {
      const modal = document.getElementById('quizUploadModal');
      if (modal) modal.classList.add('active');
    }
    function closeQuizUploadModal() {
      const modal = document.getElementById('quizUploadModal');
      if (modal) modal.classList.remove('active');
    }
    function closeQuizUploadModalOnOutside(e) {
      if (e && e.target && e.target.id === 'quizUploadModal') closeQuizUploadModal();
    }

    function handleQuizFileSelect(input) {
      const label = document.getElementById('quizFileLabel');
      if (input && input.files && input.files[0] && label) {
        label.innerHTML = `<span style="color: #34d399; font-weight: 600;">Selected:</span> ${input.files[0].name}`;
      }
    }

    function submitQuizMarks() {
      const courseEl = document.getElementById('quizCourseSelect');
      const scoreEl = document.getElementById('quizScoreInput');
      const course = courseEl ? courseEl.value : 'MA401';
      const score = scoreEl ? scoreEl.value : '85';
      closeQuizUploadModal();
      showToast(`Logged score ${score}/100 for ${course}. Health Matrix updated!`);
    }

    function openCgpaModal() {
      const modal = document.getElementById('cgpaSimModal');
      if (modal) modal.classList.add('active');
    }
    function closeCgpaModal() {
      const modal = document.getElementById('cgpaSimModal');
      if (modal) modal.classList.remove('active');
    }
    function closeCgpaModalOnOutside(e) {
      if (e && e.target && e.target.id === 'cgpaSimModal') closeCgpaModal();
    }

    function updateCgpaSimOutput() {
      const slider = document.getElementById('simCgpaSlider');
      if (!slider) return;
      const val = parseFloat(slider.value).toFixed(2);
      const targetVal = document.getElementById('simTargetVal');
      if (targetVal) targetVal.innerText = val;
      const reqSgpa = Math.max(0, Math.min(10, (parseFloat(val) * 4 - 7.4 * 3))).toFixed(2);
      const reqEl = document.getElementById('simRequiredSgpa');
      const feasEl = document.getElementById('simFeasibilityText');
      if (reqEl) reqEl.innerText = reqSgpa;
      if (feasEl) {
        if (reqSgpa > 9.8) {
          feasEl.innerText = 'High Stretch: Requires straight A+ (10.0) in all remaining credits';
          feasEl.style.color = '#f43f5e';
        } else if (reqSgpa > 8.5) {
          feasEl.innerText = 'Realistic Target: Requires 4 "A" grades and 2 "B+" grades';
          feasEl.style.color = '#00d2ff';
        } else {
          feasEl.innerText = 'Comfortable: Achievable with current academic trajectory';
          feasEl.style.color = '#34d399';
        }
      }
    }

    // Interactive Toast Messenger
    function showToast(msg, isAlert = false) {
      let toast = document.getElementById('globalToast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'globalToast';
        toast.className = 'toast-alert';
        document.body.appendChild(toast);
      }
      toast.innerHTML = `
        <span style="color: ${isAlert ? '#f43f5e' : '#00d2ff'}; font-weight: bold;">●</span>
        <span>${msg}</span>
      `;
      toast.classList.add('show');
      clearTimeout(window.toastTimer);
      window.toastTimer = setTimeout(() => {
        toast.classList.remove('show');
      }, 3200);
    }

    // Dynamic Aggregate Calculations
    function updateAggregateStats() {
      let totalHeld = 0;
      let totalAtt = 0;
      let totalSkips = 0;
      let atRiskCount = 0;
      let maxHazardSub = null;
      let minPct = 100;

      state.subjects.forEach(sub => {
        totalHeld += sub.held;
        totalAtt += sub.attended;
        const cushion = getSubjectCushion(sub.attended, sub.held);
        if (cushion.isSafe) {
          totalSkips += cushion.skips;
        } else {
          atRiskCount++;
        }
        const pct = (sub.attended / sub.held) * 100;
        if (pct < minPct) {
          minPct = pct;
          maxHazardSub = sub;
        }
      });

      const overallPct = ((totalAtt / totalHeld) * 100).toFixed(1);

      // Update Dashboard top stats
      const dashPct = document.getElementById('dashAttPercent');
      if (dashPct) dashPct.innerText = overallPct + '%';

      const dashBar = document.getElementById('dashAttBar');
      if (dashBar) dashBar.style.width = Math.min(overallPct, 100) + '%';

      const dashBadge = document.getElementById('dashAttBadge');
      if (dashBadge) {
        if (overallPct >= 75) {
          dashBadge.className = 'badge badge-safe';
          dashBadge.innerText = overallPct + '% SAFE';
        } else {
          dashBadge.className = 'badge badge-hazard';
          dashBadge.innerText = overallPct + '% DEBAR RISK';
        }
      }

      // Update Attendance View top cards
      const totAttPct = document.getElementById('totalAttPercentage');
      if (totAttPct) totAttPct.innerText = overallPct + '%';

      const netBunk = document.getElementById('netBunkCushion');
      if (netBunk) netBunk.innerText = '+' + totalSkips + ' Classes';
    }

    // Quick Attendance Log (+1 Attended or +1 Bunked)
    function quickLogAttendance(idx, wasAttended) {
      const sub = state.subjects[idx];
      if (!sub) return;

      sub.held += 1;
      if (wasAttended) {
        sub.attended += 1;
        showToast(`Logged Present: ${sub.code} (${sub.attended}/${sub.held})`);
      } else {
        showToast(`Logged Bunk/Absence: ${sub.code} (${sub.attended}/${sub.held})`, true);
      }

      updateAggregateStats();
      renderDashboardMatrix();
      renderAttendanceRiskTable();
      loadSimSubjectData();
    }

    let activeAttendanceFilter = 'all';
    function filterAttendanceTable(type) {
      activeAttendanceFilter = type;
      renderAttendanceRiskTable();
    }

    // Render Dashboard Matrix with Quick Log controls
    function renderDashboardMatrix() {
      const tbody = document.getElementById('dashMatrixBody');
      if (!tbody) return;
      tbody.innerHTML = '';

      state.subjects.forEach((sub, idx) => {
        const pct = ((sub.attended / sub.held) * 100).toFixed(1);
        const cushion = getSubjectCushion(sub.attended, sub.held);

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${sub.code}</strong> • ${sub.name}</td>
          <td>${sub.held}</td>
          <td>${sub.attended}</td>
          <td class="font-mono"><strong>${pct}%</strong></td>
          <td>
            <span class="badge ${cushion.isSafe ? (cushion.skips <= 1 ? 'badge-warn' : 'badge-safe') : 'badge-hazard'}">
              ${cushion.isSafe ? (cushion.skips <= 1 ? 'AT RISK' : 'HEALTHY') : 'DEBAR HAZARD'}
            </span>
          </td>
          <td>
            ${cushion.isSafe 
              ? `<span style="color: #34d399; font-size: 13px;">+${cushion.skips} Bunk${cushion.skips === 1 ? '' : 's'}</span>` 
              : `<span style="color: #f43f5e; font-size: 13px;">Attend next ${cushion.needed} mandatory</span>`}
          </td>
          <td>
            <div style="display: flex; gap: 4px;">
              <button class="btn btn-outline btn-xs" style="color: #34d399; border-color: rgba(52,211,153,0.3);" onclick="quickLogAttendance(${idx}, true)" title="Attended lecture">+ Attend</button>
              <button class="btn btn-outline btn-xs" style="color: #f43f5e; border-color: rgba(244,63,94,0.3);" onclick="quickLogAttendance(${idx}, false)" title="Missed lecture">+ Bunk</button>
            </div>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }

    // Render Debar Defense Table with filters and quick mark
    function renderAttendanceRiskTable() {
      const tbody = document.getElementById('attendanceRiskTableBody');
      if (!tbody) return;
      tbody.innerHTML = '';

      state.subjects.forEach((sub, idx) => {
        const pct = parseFloat(((sub.attended / sub.held) * 100).toFixed(1));
        const cushion = getSubjectCushion(sub.attended, sub.held);

        // Filter check
        if (activeAttendanceFilter === 'risk' && pct >= 78.0) return;
        if (activeAttendanceFilter === 'safe' && pct < 80.0) return;

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>
            <div style="font-weight: 700;">${sub.code}: ${sub.name}</div>
            <div style="font-size: 12px; color: var(--text-dim);">${sub.prof}</div>
          </td>
          <td style="color: var(--text-muted); font-size: 13px;">${sub.prof}</td>
          <td class="font-mono">${sub.held}</td>
          <td class="font-mono">${sub.attended}</td>
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="font-mono" style="font-weight: 700; ${pct < 75 ? 'color: #f43f5e' : (pct < 78 ? 'color: #fbbf24' : 'color: #38bdf8')}">${pct}%</span>
              <div class="progress-bar-bg" style="width: 70px; height: 6px;">
                <div class="progress-bar-fill ${pct < 75 ? 'fill-hazard' : (pct < 78 ? 'fill-warn' : 'fill-sky')}" style="width: ${Math.min(pct, 100)}%;"></div>
              </div>
            </div>
          </td>
          <td>
            ${cushion.isSafe 
              ? `<span class="badge badge-safe">+${cushion.skips} Available</span>` 
              : `<span class="badge badge-hazard">DEFICIT (-${cushion.needed})</span>`}
          </td>
          <td>
            <div style="display: flex; gap: 4px;">
              <button class="btn btn-outline btn-xs" style="color: #34d399; border-color: rgba(52,211,153,0.3);" onclick="quickLogAttendance(${idx}, true)">+1 Att</button>
              <button class="btn btn-outline btn-xs" style="color: #f43f5e; border-color: rgba(244,63,94,0.3);" onclick="quickLogAttendance(${idx}, false)">+1 Bunk</button>
            </div>
          </td>
          <td>
            <button class="btn btn-outline btn-sm" onclick="selectSubjectForSim(${idx})">Forecast</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }

    // Bunk Forecaster Logic
    function loadSimSubjectData() {
      const sel = document.getElementById('simSubjectSelect');
      if (!sel) return;
      const idx = parseInt(sel.value, 10);
      const sub = state.subjects[idx];
      const attEl = document.getElementById('simAttended');
      const totEl = document.getElementById('simTotal');
      const attNextEl = document.getElementById('simAttendNext');
      const bunkNextEl = document.getElementById('simBunkNext');
      if (sub && attEl && totEl && attNextEl && bunkNextEl) {
        attEl.value = sub.attended;
        totEl.value = sub.held;
        attNextEl.value = 0;
        bunkNextEl.value = 1;
        runBunkSimulation();
      }
    }

    function selectSubjectForSim(idx) {
      const sub = state.subjects[idx];
      if (sub) {
        navigateTo('attendance');
        showToast(`Forecaster active: ${sub.code} (${((sub.attended / sub.held) * 100).toFixed(1)}%)`);
        const heroAtt = document.getElementById('heroSimAttended');
        const heroTot = document.getElementById('heroSimTotal');
        if (heroAtt && heroTot) {
          heroAtt.value = sub.attended;
          heroTot.value = sub.held;
          if (typeof calcHeroMarginSimulator === 'function') calcHeroMarginSimulator();
        }
      }
      const sel = document.getElementById('simSubjectSelect');
      if (sel) {
        sel.value = idx;
        loadSimSubjectData();
      }
      const simBox = document.getElementById('bunkOutputTerminal');
      if (simBox) simBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function resetSimFields() {
      loadSimSubjectData();
    }

    function runBunkSimulation() {
      const attEl = document.getElementById('simAttended');
      const totEl = document.getElementById('simTotal');
      const attNextEl = document.getElementById('simAttendNext');
      const bunkNextEl = document.getElementById('simBunkNext');
      if (!attEl || !totEl || !attNextEl || !bunkNextEl) {
        if (typeof calcHeroMarginSimulator === 'function') {
          calcHeroMarginSimulator();
        }
        return;
      }

      const curAttended = parseFloat(attEl.value) || 0;
      const curTotal = parseFloat(totEl.value) || 1;
      const willAttend = parseFloat(attNextEl.value) || 0;
      const willBunk = parseFloat(bunkNextEl.value) || 0;

      const newAttended = curAttended + willAttend;
      const newTotal = curTotal + willAttend + willBunk;
      const projectedPct = ((newAttended / newTotal) * 100);

      const terminal = document.getElementById('bunkOutputTerminal');
      if (!terminal) return;

      const currentPct = ((curAttended / curTotal) * 100).toFixed(1);
      const diff = (projectedPct - parseFloat(currentPct)).toFixed(1);
      const diffSign = diff >= 0 ? `+${diff}%` : `${diff}%`;

      let verdict = '';
      let statusColor = '#38bdf8';

      if (projectedPct >= 75.0) {
        const safeMargin = Math.floor((newAttended - 0.75 * newTotal) / 0.75);
        verdict = `>> [SAFE DEBAR STATUS]\n>> You will remain above the 75% threshold.\n>> Resulting Bunk Buffer: +${safeMargin} additional class(es) can still be skipped safely.`;
        statusColor = '#34d399';
      } else {
        const deficitClasses = Math.ceil((0.75 * newTotal - newAttended) / 0.25);
        verdict = `>> [ALERT: DEBAR HAZARD TRIGGERED!]\n>> You will plunge to ${projectedPct.toFixed(1)}% (< 75.0%).\n>> RECOVERY REQUIREMENT: You must attend ${deficitClasses} consecutive classes without missing to restore 75% standing.`;
        statusColor = '#f43f5e';
      }

      terminal.innerHTML = `
        <div style="color: #64748b; margin-bottom: 6px;">// ANNOVEXA DEFENSIVE SIMULATION RUNNER v2.6</div>
        <div>Current Standing: <span style="color: #fff;">${curAttended}/${curTotal} (${currentPct}%)</span></div>
        <div>Simulated Scenario: Attend +${willAttend} | Skip -${willBunk}</div>
        <div style="margin: 8px 0; font-size: 15px; font-weight: 700;">
          Projected Percentage: <span style="color: ${statusColor};">${projectedPct.toFixed(2)}%</span> 
          <span style="font-size: 12px; color: ${diff >= 0 ? '#34d399' : '#f43f5e'};">(${diffSign})</span>
        </div>
        <div style="white-space: pre-line; color: ${statusColor};">${verdict}</div>
      `;
    }

    // Timeline Planner Toggle
    function toggleTimeline(days) {
      state.activeTimeline = days;
      const btn7 = document.getElementById('plan7Btn');
      if (btn7) btn7.classList.toggle('active', days === 7);
      const btn30 = document.getElementById('plan30Btn');
      if (btn30) btn30.classList.toggle('active', days === 30);
      renderTimeline(days);
    }

    function renderTimeline(days) {
      const container = document.getElementById('timelineContent');
      if (!container) return;

      if (days === 7) {
        container.innerHTML = `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
            <div style="padding: 16px; background: rgba(255, 255, 255, 0.02); border-radius: 10px; border-left: 3px solid var(--sky-primary);">
              <div style="font-size: 11px; color: var(--sky-primary); font-weight: 700;">DAY 1 - 2</div>
              <div style="font-weight: 600; font-size: 14px; margin: 4px 0;">Compiler Design Module 3</div>
              <div style="font-size: 12px; color: var(--text-muted);">LR(0) & SLR(1) parsing tables drill. Solve 4 PYQ questions.</div>
            </div>
            <div style="padding: 16px; background: rgba(255, 255, 255, 0.02); border-radius: 10px; border-left: 3px solid #fbbf24;">
              <div style="font-size: 11px; color: #fbbf24; font-weight: 700;">DAY 3 - 4</div>
              <div style="font-weight: 600; font-size: 14px; margin: 4px 0;">Cloud Lab Practice</div>
              <div style="font-size: 12px; color: var(--text-muted);">Configure Docker multi-stage builds & mock lab viva setup.</div>
            </div>
            <div style="padding: 16px; background: rgba(255, 255, 255, 0.02); border-radius: 10px; border-left: 3px solid #10b981;">
              <div style="font-size: 11px; color: #34d399; font-weight: 700;">DAY 5 - 7</div>
              <div style="font-weight: 600; font-size: 14px; margin: 4px 0;">Distributed Algorithms Sprint</div>
              <div style="font-size: 12px; color: var(--text-muted);">Lamport Timestamps & Chandy-Lamport Snapshot proofs.</div>
            </div>
          </div>
        `;
      } else {
        container.innerHTML = `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
            <div style="padding: 16px; background: rgba(255, 255, 255, 0.02); border-radius: 10px; border-left: 3px solid #818cf8;">
              <div style="font-size: 11px; color: #a5b4fc; font-weight: 700;">WEEK 1 - 2 (DAYS 1-14)</div>
              <div style="font-weight: 600; font-size: 14px; margin: 4px 0;">Internal Assessment 2 Consolidation</div>
              <div style="font-size: 12px; color: var(--text-muted);">Cover remaining 35% of syllabus across ML and Distributed Systems.</div>
            </div>
            <div style="padding: 16px; background: rgba(255, 255, 255, 0.02); border-radius: 10px; border-left: 3px solid #fbbf24;">
              <div style="font-size: 11px; color: #fbbf24; font-weight: 700;">WEEK 3 (DAYS 15-21)</div>
              <div style="font-weight: 600; font-size: 14px; margin: 4px 0;">Major Project Phase 1 Evaluation</div>
              <div style="font-size: 12px; color: var(--text-muted);">Submission of technical report and architecture diagram to coordinator.</div>
            </div>
            <div style="padding: 16px; background: rgba(255, 255, 255, 0.02); border-radius: 10px; border-left: 3px solid var(--sky-primary);">
              <div style="font-size: 11px; color: var(--sky-primary); font-weight: 700;">WEEK 4 (DAYS 22-30)</div>
              <div style="font-weight: 600; font-size: 14px; margin: 4px 0;">Pre-Endsem Mock Test Sprints</div>
              <div style="font-size: 12px; color: var(--text-muted);">Simulate timed 3-hour university board exams under strict conditions.</div>
            </div>
          </div>
        `;
      }
    }

    // CGPA Simulator
    function calculateGradCGPA() {
      const el6 = document.getElementById('sliderSem6');
      const el7 = document.getElementById('sliderSem7');
      const el8 = document.getElementById('sliderSem8');
      if (!el6 || !el7 || !el8) return;

      const s6 = parseFloat(el6.value) || 8.75;
      const s7 = parseFloat(el7.value) || 9.00;
      const s8 = parseFloat(el8.value) || 9.20;

      const val6 = document.getElementById('cgpa-val-sem6');
      const val7 = document.getElementById('cgpa-val-sem7');
      const val8 = document.getElementById('cgpa-val-sem8');
      if (val6) val6.innerText = s6.toFixed(2) + ' SGPA';
      if (val7) val7.innerText = s7.toFixed(2) + ' SGPA';
      if (val8) val8.innerText = s8.toFixed(2) + ' SGPA';

      // Past credits: 110 credits with 8.54 CGPA = 939.4 grade points
      // Sem 6: 22 cr
      // Sem 7: 20 cr
      // Sem 8: 18 cr
      // Total Degree: 170 credits
      const pastGradePoints = 110 * 8.54;
      const futureGradePoints = (s6 * 22) + (s7 * 20) + (s8 * 18);
      const totalPoints = pastGradePoints + futureGradePoints;
      const cumulativeCGPA = (totalPoints / 170).toFixed(2);

      const cgpaDisplay = document.getElementById('simulatedDegreeCGPA');
      const honorsDisplay = document.getElementById('degreeHonorsStatus');

      if (cgpaDisplay) cgpaDisplay.innerText = cumulativeCGPA + ' CGPA';

      if (honorsDisplay) {
        if (cumulativeCGPA >= 8.50) {
          honorsDisplay.innerText = 'Qualification: First Class with Distinction (Honors Division)';
          honorsDisplay.style.color = '#34d399';
        } else if (cumulativeCGPA >= 7.50) {
          honorsDisplay.innerText = 'Qualification: First Class Division';
          honorsDisplay.style.color = '#38bdf8';
        } else {
          honorsDisplay.innerText = 'Qualification: Second Class Division';
          honorsDisplay.style.color = '#fbbf24';
        }
      }
    }

    function resetCgpaSliders() {
      const el6 = document.getElementById('sliderSem6');
      const el7 = document.getElementById('sliderSem7');
      const el8 = document.getElementById('sliderSem8');
      if (el6) el6.value = 8.75;
      if (el7) el7.value = 9.00;
      if (el8) el8.value = 9.20;
      calculateGradCGPA();
    }

    function openVaultResource(name) {
      showToast(`Opening academic vault link: [${name}]`);
    }

    // ==========================================
    // Focus Revision Sprint Timer (Pomodoro Engine)
    // ==========================================
    let sprintSecondsLeft = 25 * 60;
    let sprintTimerInterval = null;
    let sprintIsRunning = false;
    let sprintsFinished = 3;

    function formatSprintTime(secs) {
      const m = Math.floor(secs / 60).toString().padStart(2, '0');
      const s = (secs % 60).toString().padStart(2, '0');
      return `${m}:${s}`;
    }

    function updateSprintDisplay() {
      const display = document.getElementById('pomodoroTimerDisplay');
      if (display) display.innerText = formatSprintTime(sprintSecondsLeft);
    }

    function toggleSprintTimer() {
      const btn = document.getElementById('sprintStartBtn');
      const phaseText = document.getElementById('sprintPhaseText');

      if (!sprintIsRunning) {
        sprintIsRunning = true;
        if (btn) {
          btn.innerText = 'Pause Sprint';
          btn.className = 'btn btn-outline btn-sm';
          btn.style.color = '#fbbf24';
          btn.style.borderColor = 'rgba(251, 191, 36, 0.4)';
        }
        if (phaseText) {
          phaseText.innerText = 'Focus Revision in Progress...';
          phaseText.style.color = '#38bdf8';
        }
        showToast('Sprint active: Focus on lecture notes & PYQs.');

        sprintTimerInterval = setInterval(() => {
          if (sprintSecondsLeft > 0) {
            sprintSecondsLeft--;
            updateSprintDisplay();
          } else {
            clearInterval(sprintTimerInterval);
            sprintIsRunning = false;
            sprintsFinished++;
            const badge = document.getElementById('sprintsCompletedBadge');
            if (badge) badge.innerText = `${sprintsFinished} SPRINTS LOGGED TODAY (${sprintsFinished * 25}m)`;
            showToast('🎉 Sprint Completed! Take a 5-minute cognitive rest.');
            if (btn) {
              btn.innerText = 'Start Focus';
              btn.className = 'btn btn-primary btn-sm';
            }
            if (phaseText) phaseText.innerText = 'Sprint Completed!';
          }
        }, 1000);
      } else {
        clearInterval(sprintTimerInterval);
        sprintIsRunning = false;
        if (btn) {
          btn.innerText = 'Resume Focus';
          btn.className = 'btn btn-primary btn-sm';
          btn.style.color = '#0b0f19';
        }
        if (phaseText) phaseText.innerText = 'Sprint Paused';
        showToast('Sprint paused.');
      }
    }

    function resetSprintTimer(mins) {
      clearInterval(sprintTimerInterval);
      sprintIsRunning = false;
      sprintSecondsLeft = mins * 60;
      updateSprintDisplay();
      const btn = document.getElementById('sprintStartBtn');
      const phaseText = document.getElementById('sprintPhaseText');
      if (btn) {
        btn.innerText = 'Start Focus';
        btn.className = 'btn btn-primary btn-sm';
        btn.style.color = '#0b0f19';
      }
      if (phaseText) phaseText.innerText = mins <= 5 ? 'Rest & Recharge Break' : 'Deep Work Focus Phase';
    }

    function cancelSprintTimer() {
      resetSprintTimer(25);
      showToast('Sprint reset to 25 minutes.');
    }

    // ==========================================
    // High-Yield Syllabus Topic Checklist Tracker
    // ==========================================
    function updateTopicTracker() {
      const container = document.getElementById('topicsMasteredBadge');
      const checkboxes = document.querySelectorAll('#view-study-plan input[type="checkbox"]');
      if (!checkboxes.length) return;

      let checkedCount = 0;
      checkboxes.forEach(cb => {
        if (cb.checked) checkedCount++;
      });

      const total = checkboxes.length;
      const pct = Math.round((checkedCount / total) * 100);
      if (container) {
        container.innerText = `${checkedCount} / ${total} TOPICS MASTERED (${pct}%)`;
      }
    }

    // ==========================================
    // Medical Exemption & Condonation Policy Logic
    // ==========================================
    function calcMedicalCondonation() {
      const selectEl = document.getElementById('medCourseSelect');
      const daysEl = document.getElementById('medDaysInput');
      const resultBox = document.getElementById('medVerdictResult');
      if (!selectEl || !daysEl || !resultBox) return;

      const subIdx = parseInt(selectEl.value, 10);
      const medDays = parseInt(daysEl.value, 10) || 0;
      const sub = state.subjects[subIdx];
      if (!sub) return;

      const rawPct = (sub.attended / sub.held) * 100;
      // University policy: Each verified medical day can cover up to 1 missed hour in that course,
      // provided adjusted attendance is capped at 10% condonation relief or max 75.0%.
      const excusedSessions = Math.min(medDays, sub.held - sub.attended);
      const adjustedAttended = sub.attended + excusedSessions;
      const adjustedPct = ((adjustedAttended / sub.held) * 100).toFixed(1);

      if (rawPct >= 75.0) {
        resultBox.innerHTML = `
          <span style="color: #34d399;">● Current attendance is already safe (${rawPct.toFixed(1)}%).</span>
          <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">Condonation petition is not required for ${sub.code}.</div>
        `;
      } else if (rawPct >= 65.0) {
        if (parseFloat(adjustedPct) >= 75.0) {
          resultBox.innerHTML = `
            <span style="color: #34d399;">● APPROVED (Dean Medical Exemption):</span> 
            Relief of +${excusedSessions} sessions yields <strong style="color: #38bdf8;">${adjustedPct}%</strong>. Clears 75.0% threshold.
          `;
        } else {
          const neededMore = Math.ceil((0.75 * sub.held) - adjustedAttended);
          resultBox.innerHTML = `
            <span style="color: #fbbf24;">● CONDITIONAL RELIEF:</span>
            Adjusted to ${adjustedPct}%. Still short by ${neededMore} lecture(s). Must attend next classes.
          `;
        }
      } else {
        resultBox.innerHTML = `
          <span style="color: #f43f5e;">● CRITICAL: Current is ${rawPct.toFixed(1)}% (< 65.0%).</span>
          <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">University regulations prohibit Dean condonation below 65% floor. Immediate attendance recovery mandatory.</div>
        `;
      }
    }

    // ==========================================
    // Graduation CGPA Target Reverse Solver
    // ==========================================
    function solveTargetCGPA() {
      const targetInput = document.getElementById('targetCgpaInput');
      if (!targetInput) return;
      const target = parseFloat(targetInput.value);
      const out = document.getElementById('targetSolverOutput');
      if (!out || isNaN(target)) return;

      // Degree model: 170 credits total
      // Past 1-5: 110 credits @ 8.54 = 939.4 grade points
      // Future 6-8: 60 credits remaining (22 + 20 + 18)
      const pastPoints = 110 * 8.54;
      const totalPointsNeeded = target * 170;
      const futurePointsNeeded = totalPointsNeeded - pastPoints;
      const requiredFutureAvg = futurePointsNeeded / 60;

      if (requiredFutureAvg > 10.0) {
        out.innerHTML = `Target <strong style="color: #f43f5e;">${target.toFixed(2)} CGPA</strong> is mathematically unreachable (requires ${requiredFutureAvg.toFixed(2)} SGPA > 10.0 scale).`;
      } else if (requiredFutureAvg < 0) {
        out.innerHTML = `Target already secured with past academic credits!`;
      } else {
        const difficultyColor = requiredFutureAvg >= 9.5 ? '#f43f5e' : (requiredFutureAvg >= 9.0 ? '#fbbf24' : '#34d399');
        out.innerHTML = `Required Future Run-Rate: <strong style="color: ${difficultyColor};">${requiredFutureAvg.toFixed(2)} SGPA</strong> average across Sem 6, 7 & 8.`;
      }
    }

    // ==========================================
    // Interactive Academic Terminal
    // ==========================================
    function execTerminalCmd(cmd) {
      const input = document.getElementById('terminalCmdInput');
      if (input) input.value = cmd;
      submitTerminalCmd();
    }

    function submitTerminalCmd() {
      const input = document.getElementById('terminalCmdInput');
      const terminal = document.getElementById('academicInteractiveTerminal');
      if (!input || !terminal) return;

      const raw = input.value.trim();
      if (!raw) return;
      input.value = '';

      const cmd = raw.toLowerCase();
      let response = '';

      if (cmd === 'clear') {
        terminal.innerHTML = `
          <div style="color: #64748b;">// ANNOVEXA TERMINAL BUFFER RESET.</div>
          <div style="color: #38bdf8;">>> Ready for command input.</div>
        `;
        return;
      } else if (cmd.startsWith('eval --risk') || cmd === 'risk') {
        let riskSubs = state.subjects.filter(s => ((s.attended/s.held)*100) < 78.0);
        let logLines = riskSubs.map(s => `  - [WARNING] ${s.code} (${s.name}): ${((s.attended/s.held)*100).toFixed(1)}% | 0 bunks margin`).join('\n');
        response = `
>> ATTENDANCE INTEGRITY AUDIT:
>> Analyzed 6 enrolled curricular modules against 75.0% statutory threshold.
${logLines || '  >> All modules currently operating with healthy bunk cushion.'}
>> Actionable Command: Prioritize CS602 (Compiler Design) Thursday lecture to avoid debar flag.`;
      } else if (cmd.startsWith('predict --cgpa') || cmd === 'cgpa') {
        response = `
>> CGPA GRADUATION SIMULATION MATRIX:
>> Completed Sem 1-5: 110 Credits @ 8.54 Cumulative CGPA (Grade points: 939.40).
>> Remaining Sem 6-8: 60 Credits.
>> Projected Outcome: 8.71 CGPA (Qualifies for 'First Class with Distinction & Honors').
>> Run 'target 9.0' or use the reverse solver to recalibrate elective grades.`;
      } else if (cmd.startsWith('audit --internals') || cmd === 'internals') {
        response = `
>> INTERNAL MARKS COMPLIANCE AUDIT:
>> Distributed Systems: 28/30 Midterm | 19/20 Assignment | 46/50 Lab -> Projected Grade: O (Outstanding)
>> Compiler Design:    24/30 Midterm | 17/20 Assignment | 42/50 Lab -> Projected Grade: A+ (Very Good)
>> Machine Learning:    29/30 Midterm | 20/20 Assignment | 48/50 Lab -> Projected Grade: O (Outstanding)
>> Internal aggregate average: 91.5% (+14.2% above semester peer average).`;
      } else if (cmd.startsWith('sprint --tactics') || cmd === 'sprint') {
        response = `
>> MIDTERM SPRINT TACTICAL RECOMMENDATIONS:
>> 1. Master Raft Consensus & Byzantine Fault proofs (CS601) - 16 marks guaranteed.
>> 2. Practice LALR(1) Parsing Table conflicts (CS602) - 14 marks guaranteed.
>> 3. Review CNN Max-Pooling backprop derivations (CS603) - 12 marks guaranteed.
>> Recommended Focus Cadence: 2 x 25-minute Pomodoro sprints per evening.`;
      } else if (cmd === 'help') {
        response = `
>> AVAILABLE ACADEMIC COMMANDS:
>> - eval --risk        : Evaluates debar hazards and net cushion across all courses
>> - predict --cgpa     : Displays credit-weighted graduation honors projections
>> - audit --internals  : Breaks down internal assessment marks, assignments & lab viva
>> - sprint --tactics   : Displays highest-yield numericals and PYQ exam strategies
>> - clear              : Clears terminal scrollback`;
      } else {
        response = `>> Command not recognized: '${raw}'. Type 'help' for supported academic diagnostic commands.`;
      }

      const entry = document.createElement('div');
      entry.style.marginTop = '8px';
      entry.style.borderTop = '1px solid rgba(255,255,255,0.06)';
      entry.style.paddingTop = '6px';
      entry.innerHTML = `
        <div style="color: #f1f5f9;"><span style="color: var(--sky-primary);">annovexa:~$</span> ${raw}</div>
        <div style="color: #38bdf8; white-space: pre-wrap;">${response}</div>
      `;
      terminal.appendChild(entry);
      terminal.scrollTop = terminal.scrollHeight;
    }

    // Homescreen Interaction Handlers (Matching screen.png)
    function handleNavAction(action) {
      if (action === 'features') {
        if (state.currentView !== 'home') navigateTo('home');
        const el = document.getElementById('features-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'attendance-calc') {
        navigateTo('attendance');
      } else if (action === 'study-plans') {
        if (!state.isLoggedIn) {
          const el = document.getElementById('blueprint-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
          navigateTo('study-plan');
        }
      } else if (action === 'resources') {
        if (!state.isLoggedIn) {
          const el = document.getElementById('department-coverage-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
          navigateTo('analytics');
        }
      } else if (action === 'pricing') {
        showToast('Annovexa Core Tier is 100% Free Forever for all B.Tech undergraduates.');
      }
    }

    function calcHeroMarginSimulator() {
      const attInput = document.getElementById('heroSimAttended');
      const totInput = document.getElementById('heroSimTotal');
      const threshInput = document.getElementById('heroSimThreshold');
      
      if (!attInput || !totInput || !threshInput) return;

      const attended = Math.max(0, parseInt(attInput.value) || 0);
      const total = Math.max(1, parseInt(totInput.value) || 1);
      const threshold = parseFloat(threshInput.value) || 0.75;

      const pct = (attended / total) * 100;
      const targetPct = threshold * 100;

      const pctEl = document.getElementById('heroSimCurrentPct');
      const statusEl = document.getElementById('heroSimStatusText');
      const bunksValEl = document.getElementById('heroSimBunksRemaining');
      const bunksLabelEl = document.getElementById('heroSimBunksLabel');

      if (pctEl) {
        pctEl.innerText = pct.toFixed(2) + '%';
        pctEl.style.color = pct >= targetPct ? '#34d399' : '#f43f5e';
      }

      if (pct >= targetPct) {
        const safeBunks = Math.floor((attended - threshold * total) / threshold);
        if (statusEl) {
          statusEl.innerText = `Safe buffer active. You are cleared for upcoming events.`;
        }
        if (bunksValEl) {
          bunksValEl.innerText = safeBunks;
          bunksValEl.style.color = '#38bdf8';
        }
        if (bunksLabelEl) {
          bunksLabelEl.innerText = 'safe bunks remaining';
        }
      } else {
        const needed = Math.ceil((threshold * total - attended) / (1 - threshold));
        if (statusEl) {
          statusEl.innerText = `⚠️ Attendance Hazard! Must attend next ${needed} consecutive lectures to recover ${targetPct.toFixed(0)}%.`;
        }
        if (bunksValEl) {
          bunksValEl.innerText = `+${needed}`;
          bunksValEl.style.color = '#f43f5e';
        }
        if (bunksLabelEl) {
          bunksLabelEl.innerText = 'mandatory classes to attend';
        }
      }
    }

    function submitHeroInitialize(e) {
      if (e) e.preventDefault();
      const input = document.getElementById('heroEmailInput');
      const email = input ? input.value.trim() : '';
      if (email) {
        if (typeof setAuthMode === 'function') setAuthMode('signup');
        const loginEmail = document.getElementById('loginEmail');
        if (loginEmail) loginEmail.value = email;
        const pass = document.getElementById('loginPass');
        if (pass) pass.value = '';
        openLoginModal();
        showToast(`Welcome! Enter a password to initialize your student profile.`);
      } else {
        openLoginModal();
      }
    }


    // ========================================================
    // ADAPTIVE STUDY PLAN ENGINE (screen.png)
    // ========================================================
    let currentWeekNumber = 7;
    const weekLabels = {
      6: 'Week 6 (Oct 07 - Oct 13)',
      7: 'Week 7 (Oct 14 - Oct 20)',
      8: 'Week 8 (Oct 21 - Oct 27)'
    };

    function changeWeek(delta) {
      currentWeekNumber += delta;
      if (currentWeekNumber < 6) currentWeekNumber = 6;
      if (currentWeekNumber > 8) currentWeekNumber = 8;
      
      const labelEl = document.getElementById('weekLabelText');
      if (labelEl) {
        labelEl.innerHTML = currentWeekNumber === 7 
          ? 'Week 7 <span style="color: #94a3b8; font-weight: 400;">(Oct 14 - Oct 20)</span>'
          : (currentWeekNumber === 6 
              ? 'Week 6 <span style="color: #94a3b8; font-weight: 400;">(Oct 07 - Oct 13)</span>'
              : 'Week 8 <span style="color: #94a3b8; font-weight: 400;">(Oct 21 - Oct 27)</span>');
      }
      showToast('Switched to ' + weekLabels[currentWeekNumber]);
    }

    function setTimetableView(mode) {
      const gridWrapper = document.getElementById('timetableGridWrapper');
      const listWrapper = document.getElementById('timetableListWrapper');
      const gridBtn = document.getElementById('viewToggleGrid');
      const listBtn = document.getElementById('viewToggleList');

      if (mode === 'grid') {
        if (gridWrapper) gridWrapper.style.display = 'block';
        if (listWrapper) listWrapper.style.display = 'none';
        if (gridBtn) {
          gridBtn.style.background = '#00d2ff';
          gridBtn.style.color = '#080d19';
          gridBtn.style.fontWeight = '700';
        }
        if (listBtn) {
          listBtn.style.background = 'transparent';
          listBtn.style.color = '#94a3b8';
          listBtn.style.fontWeight = '600';
        }
      } else {
        if (gridWrapper) gridWrapper.style.display = 'none';
        if (listWrapper) listWrapper.style.display = 'block';
        if (listBtn) {
          listBtn.style.background = '#00d2ff';
          listBtn.style.color = '#080d19';
          listBtn.style.fontWeight = '700';
        }
        if (gridBtn) {
          gridBtn.style.background = 'transparent';
          gridBtn.style.color = '#94a3b8';
          gridBtn.style.fontWeight = '600';
        }
      }
    }

    function regenerateStudyTimetable() {
      showToast('AI Cognitive Balancing: Recalibrating 24-hour syllabus schedule...');
      setTimeout(() => {
        showToast('Timetable successfully optimized! Dynamic weights preserved v4.2');
      }, 700);
    }

    function openStudyBlockModal(code, course, topic, duration, priority, detail) {
      const modal = document.getElementById('studyBlockModal');
      if (!modal) return;
      const codeEl = document.getElementById('studyModalCode');
      if (codeEl) codeEl.innerText = code || '';
      const priorityEl = document.getElementById('studyModalPriority');
      if (priorityEl) priorityEl.innerText = priority || '';
      const titleEl = document.getElementById('studyModalTitle');
      if (titleEl) titleEl.innerText = (course || '') + ': ' + (topic || '');
      const durationEl = document.getElementById('studyModalDuration');
      if (durationEl) durationEl.innerText = duration || '';
      const detailEl = document.getElementById('studyModalDetail');
      if (detailEl) detailEl.innerText = detail || '';
      modal.classList.add('active');
    }

    function closeStudyBlockModal() {
      const modal = document.getElementById('studyBlockModal');
      if (modal) modal.classList.remove('active');
    }

    function closeStudyBlockModalOnOutside(e) {
      if (e && e.target && e.target.id === 'studyBlockModal') closeStudyBlockModal();
    }

    function openUpdateScoresModal() {
      const modal = document.getElementById('updateScoresModal');
      if (modal) modal.classList.add('active');
    }

    function closeUpdateScoresModal() {
      const modal = document.getElementById('updateScoresModal');
      if (modal) modal.classList.remove('active');
    }

    function closeUpdateScoresModalOnOutside(e) {
      if (e && e.target && e.target.id === 'updateScoresModal') closeUpdateScoresModal();
    }

    function updateScoreCalc(type, val) {
      const score = parseInt(val);
      const mult = (30 / score).toFixed(1) + 'x';
      if (type === 'Math') {
        const el = document.getElementById('scoreValMath');
        if (el) el.innerText = val + ' / 30 (Gap: ' + mult + ')';
      } else if (type === 'Algo') {
        const el = document.getElementById('scoreValAlgo');
        if (el) el.innerText = val + ' / 30 (Gap: ' + mult + ')';
      } else if (type === 'OS') {
        const el = document.getElementById('scoreValOS');
        if (el) el.innerText = val + ' / 30 (Gap: ' + mult + ')';
      } else if (type === 'Soft') {
        const el = document.getElementById('scoreValSoft');
        if (el) el.innerText = val + ' / 30 (Gap: ' + mult + ')';
      }
    }

    function saveUpdatedScores() {
      closeUpdateScoresModal();
      showToast('Scores saved! Recalibrating adaptive schedule weights...');
      regenerateStudyTimetable();
    }

    const pyqData = {
      'CS402': [
        { title: '2023 End-Sem: Diagonalization of Real Symmetric 3x3 Matrices', marks: '14 Marks', difficulty: 'Hard', solved: true },
        { title: '2022 End-Sem: Joint Probability Density & Marginal Distributions', marks: '10 Marks', difficulty: 'Medium', solved: true },
        { title: '2021 Mid-Sem: Cauchy Residue Theorem Complex Integrals', marks: '8 Marks', difficulty: 'Medium', solved: true },
        { title: '2020 Mid-Sem: Fourier Half-Range Cosine Series Expansion', marks: '12 Marks', difficulty: 'Hard', solved: false }
      ],
      'CS404': [
        { title: '2023 End-Sem: 0/1 Knapsack Dynamic Programming Proof & Code', marks: '14 Marks', difficulty: 'Hard', solved: true },
        { title: '2022 End-Sem: Bellman-Ford Negative Weight Cycle Detection', marks: '10 Marks', difficulty: 'Medium', solved: true },
        { title: '2021 Mid-Sem: Master Theorem Recurrence Solver & Proof', marks: '8 Marks', difficulty: 'Easy', solved: true },
        { title: '2020 Mid-Sem: Ford-Fulkerson Max Flow Min Cut Cutset Drill', marks: '12 Marks', difficulty: 'Hard', solved: true }
      ],
      'CS403': [
        { title: '2023 End-Sem: Banker Algorithm Safe State Multi-Resource Matrix', marks: '14 Marks', difficulty: 'Medium', solved: true },
        { title: '2022 End-Sem: Multi-level Feedback Queue Scheduling Gantt Chart', marks: '10 Marks', difficulty: 'Easy', solved: true },
        { title: '2021 Mid-Sem: Inverted Page Tables & TLB Hit Ratio Numericals', marks: '8 Marks', difficulty: 'Medium', solved: true }
      ]
    };

    function openPyqVault(filter) {
      const modal = document.getElementById('pyqVaultModal');
      if (!modal) return;
      modal.classList.add('active');
      filterPyqList(filter === 'all' ? 'CS402' : filter);
    }

    function closePyqVaultModal() {
      const modal = document.getElementById('pyqVaultModal');
      if (modal) modal.classList.remove('active');
    }

    function closePyqVaultModalOnOutside(e) {
      if (e && e.target && e.target.id === 'pyqVaultModal') closePyqVaultModal();
    }

    function filterPyqList(code) {
      const container = document.getElementById('pyqListContainer');
      if (!container) return;

      ['CS402', 'CS404', 'CS403'].forEach(c => {
        const btn = document.getElementById('pyqTab' + (c === 'CS402' ? 'Math' : (c === 'CS404' ? 'Algo' : 'OS')));
        if (btn) {
          if (c === code) {
            btn.className = 'btn btn-sm btn-primary';
          } else {
            btn.className = 'btn btn-sm btn-outline';
          }
        }
      });

      const items = pyqData[code] || [];
      let html = '';
      items.forEach(q => {
        html += `
          <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 12px 14px; display: flex; justify-content: space-between; align-items: center; gap: 10px;">
            <div>
              <div style="font-size: 13px; font-weight: 700; color: #ffffff; margin-bottom: 3px;">${q.title}</div>
              <div style="display: flex; gap: 8px; font-size: 11px; color: #94a3b8; font-family: monospace;">
                <span style="color: #00d2ff;">${q.marks}</span>
                <span>•</span>
                <span style="color: ${q.difficulty === 'Hard' ? '#f43f5e' : (q.difficulty === 'Medium' ? '#f59e0b' : '#34d399')};">${q.difficulty}</span>
              </div>
            </div>
            <button class="btn btn-outline btn-sm" onclick="showToast('Loading AI-annotated solution steps for ${q.title.substring(0, 20)}...');">
              View Solution ↗
            </button>
          </div>
        `;
      });
      container.innerHTML = html;
    }

    // Initialize default states on boot
    window.addEventListener('DOMContentLoaded', () => {
      calcHeroMarginSimulator();
      renderDashboardMatrix();
      renderAttendanceRiskTable();
      renderTimeline(7);
      runBunkSimulation();
      calculateGradCGPA();
      calcMedicalCondonation();
      solveTargetCGPA();
      updateTopicTracker();
      updateAggregateStats();
      updateCockpitUI();
      runAttendanceSimulation();
    });


    // Functions for Performance Analytics
    function commitAllocationsToSchedule() {
      showToast('Adaptive allocations committed! Personalized Study Plan timetable updated with +3.5h Math IV focus.');
      setTimeout(() => {
        navigateTo('study-plan');
      }, 1200);
    }

    function recalculateAnalytics() {
      showToast('Telemetry refresh: Running neural gap analysis on latest quiz marks...');
      setTimeout(() => {
        showToast('Telemetry synchronized! SGPA projection held stable at 7.64 (Intervention headroom: +1.18).');
      }, 1400);
    }

    function openAuditLogModal() {
      const modal = document.getElementById('auditLogModal');
      if (modal) modal.classList.add('active');
    }

    function closeAuditLogModal() {
      const modal = document.getElementById('auditLogModal');
      if (modal) modal.classList.remove('active');
    }

    function downloadAuditLogCSV() {
      const csvData = "Subject,Code,Credits,DiagnosticScore,PriorityWeight,BaselineHours,AdaptiveHours,ProjectedDelta\n" +
        "Mathematics IV,MA401,4,52.0%,0.92,2.5,6.0,+17.5%\n" +
        "Digital Logic & Design,CS403,3,61.0%,0.64,3.0,4.5,+11.2%\n" +
        "Operating Systems,CS402,4,68.0%,0.58,3.5,4.0,+8.4%\n" +
        "Data Structures & Algorithms,CS401,4,78.0%,0.31,5.0,3.0,+4.0%\n" +
        "Communication Skills,HS401,2,84.0%,0.15,2.0,1.0,+2.0%\n";
      
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', 'Annovexa_Academic_Audit_Log_Alex_BT22CSE084.csv');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast('Audit Log CSV exported successfully.');
    }

    const subjectDiagnosticsData = {
      'MA401': {
        name: 'Mathematics IV (Numerical Methods & Probability)',
        code: 'MA401 • 4 Credits',
        score: '52.0% [CRITICAL]',
        statusColor: '#f43f5e',
        gaps: [
          { topic: 'Calculus of Variations', mastery: '34%', status: 'Urgent Remedial' },
          { topic: 'Eigenvalue Decomposition & Matrix Norms', mastery: '38%', status: 'Critical Gap' },
          { topic: 'Probability Distributions & Central Limit', mastery: '62%', status: 'Moderate' },
          { topic: 'Fourier Series & Boundary Value Problems', mastery: '74%', status: 'Stable' }
        ],
        action: 'Start 25-Min Math IV Sprint',
        note: 'Prerequisite for Sem 5 Machine Learning (CS502). Rebalanced allocation: 6.0 hrs/week.'
      },
      'CS403': {
        name: 'Digital Logic & Computer Architecture',
        code: 'CS403 • 3 Credits',
        score: '61.0% [MODERATE]',
        statusColor: '#fbbf24',
        gaps: [
          { topic: 'Sequential Circuits & Flip-Flop Timing', mastery: '52%', status: 'Remedial' },
          { topic: 'Karnaugh Maps & Quine-McCluskey', mastery: '76%', status: 'Strong' },
          { topic: 'Microprogrammed Control Unit Design', mastery: '55%', status: 'Gap' }
        ],
        action: 'Review Circuit Drills',
        note: 'Allocation raised to 4.5 hrs/week (+50%) for upcoming Unit Test 2.'
      },
      'CS402': {
        name: 'Operating Systems & System Programming',
        code: 'CS402 • 4 Credits',
        score: '68.0% [MODERATE]',
        statusColor: '#38bdf8',
        gaps: [
          { topic: 'Virtual Memory & Page Replacement', mastery: '64%', status: 'Moderate' },
          { topic: 'Semaphore & Mutex Concurrency Drills', mastery: '58%', status: 'Remedial' },
          { topic: 'Process Scheduling Algorithms', mastery: '82%', status: 'Mastered' }
        ],
        action: 'Open OS PYQ Practice',
        note: 'Scheduled for 4.0 hrs/week (+14%) with weekly quiz review.'
      },
      'CS401': {
        name: 'Data Structures & Algorithms',
        code: 'CS401 • 4 Credits',
        score: '78.0% [STRONG]',
        statusColor: '#34d399',
        gaps: [
          { topic: 'Dynamic Programming & Memoization', mastery: '72%', status: 'Good' },
          { topic: 'Tree Traversals & AVL Balance', mastery: '88%', status: 'Mastered' },
          { topic: 'Graph Shortest Paths (Dijkstra/Bellman)', mastery: '76%', status: 'Strong' }
        ],
        action: 'Code Problem Drill',
        note: 'Mastery confirmed. Allocation safely lowered to 3.0 hrs/week (-40%) to free cognitive bandwidth.'
      },
      'HS401': {
        name: 'Communication Skills & Technical Writing',
        code: 'HS401 • 2 Credits',
        score: '84.0% [MASTERED]',
        statusColor: '#34d399',
        gaps: [
          { topic: 'Executive Summaries & Formal Memos', mastery: '86%', status: 'Mastered' },
          { topic: 'Technical Presentation Delivery', mastery: '82%', status: 'Mastered' }
        ],
        action: 'View Writing Guidelines',
        note: 'Maintenance mode: 1.0 hr/week (-50%). Highest scoring subject in current semester.'
      }
    };

    function openSubjectDiagnostic(code) {
      const data = subjectDiagnosticsData[code];
      if (!data) return;
      
      const container = document.getElementById('subjectDiagnosticContent');
      if (!container) return;

      container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 14px;">
          <div>
            <div style="font-size: 11px; font-family: 'JetBrains Mono', monospace; font-weight: 700; color: ${data.statusColor};">${data.code}</div>
            <h3 style="font-size: 17px; font-weight: 800; color: #ffffff; margin: 3px 0 0 0;">${data.name}</h3>
          </div>
          <button onclick="closeSubjectDiagnostic()" style="background: transparent; border: none; color: #94a3b8; font-size: 22px; cursor: pointer; line-height: 1;">&times;</button>
        </div>

        <div style="margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); padding: 10px 14px; border-radius: 8px;">
          <span style="font-size: 13px; color: #94a3b8;">Current Diagnostic Score:</span>
          <span style="font-size: 14px; font-family: 'JetBrains Mono', monospace; font-weight: 800; color: ${data.statusColor};">${data.score}</span>
        </div>

        <div style="margin-bottom: 18px;">
          <div style="font-size: 11px; font-family: 'JetBrains Mono', monospace; color: #94a3b8; margin-bottom: 8px;">SUB-TOPIC BREAKDOWN & MASTERY VECTORS:</div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${data.gaps.map(g => `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: rgba(6, 10, 18, 0.6); border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; font-size: 12.5px;">
                <span style="color: #f8fafc;">${g.topic}</span>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #00d2ff;">${g.mastery}</span>
                  <span style="font-size: 10.5px; padding: 2px 6px; border-radius: 4px; background: rgba(255,255,255,0.06); color: #94a3b8;">${g.status}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <p style="font-size: 12px; color: #94a3b8; margin-bottom: 18px; line-height: 1.5;">
          ${data.note}
        </p>

        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button onclick="closeSubjectDiagnostic()" class="btn btn-outline btn-sm">Close</button>
          <button onclick="closeSubjectDiagnostic(); startPomodoroTimer('${data.name}');" class="btn btn-primary btn-sm" style="background: #00d2ff; color: #080d19; font-weight: 700; border: none;">${data.action}</button>
        </div>
      `;

      const modal = document.getElementById('subjectDiagnosticModal');
      if (modal) modal.classList.add('active');
    }

    function closeSubjectDiagnostic() {
      const modal = document.getElementById('subjectDiagnosticModal');
      if (modal) modal.classList.remove('active');
    }
  

    // ========================================================
    // PROFILE & RESPONSIBLE AI GOVERNANCE ENGINE
    // ========================================================
    let studentStudyCapacity = 6.5;
    let postClassHours = 3.5;
    let postClassRoutineMode = 'hours';

    function updateDailyStudyCapacity(val) {
      studentStudyCapacity = parseFloat(val);
      const display = document.getElementById('studyCapacityDisplay');
      if (display) {
        display.textContent = studentStudyCapacity.toFixed(1) + ' hrs/day';
      }
      showToast('Daily capacity updated to ' + studentStudyCapacity.toFixed(1) + ' hrs. AI scheduler adjusted.');
    }

    function changePostClassHours(delta) {
      postClassHours = Math.max(1.0, Math.min(8.0, postClassHours + delta));
      renderPostClassHours();
    }

    function setPostClassQuickHour(hrs) {
      const numHrs = typeof hrs === 'number' ? hrs : 3.5;
      postClassHours = numHrs;
      renderPostClassHours();
      document.querySelectorAll('.routine-chip').forEach(c => {
        if (c && c.textContent && c.textContent.trim() === numHrs.toFixed(1) + 'h') {
          c.classList.add('active');
          c.style.background = '#00d2ff';
          c.style.color = '#080d19';
          c.style.borderColor = '#00d2ff';
          c.style.fontWeight = '800';
        } else if (c) {
          c.classList.remove('active');
          c.style.background = 'rgba(255, 255, 255, 0.04)';
          c.style.color = '#cbd5e1';
          c.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          c.style.fontWeight = 'normal';
        }
      });
      showToast('Post-class study target set to ' + numHrs.toFixed(1) + ' hrs.');
    }

    function renderPostClassHours() {
      const display = document.getElementById('postClassHoursDisplay');
      const hrs = typeof postClassHours === 'number' ? postClassHours : 3.5;
      if (display) display.textContent = hrs.toFixed(1) + ' hrs';
    }

    function setPostClassRoutineMode(mode) {
      postClassRoutineMode = mode;
      const btnTime = document.getElementById('btnRoutineTime');
      const btnHours = document.getElementById('btnRoutineHours');
      if (mode === 'time') {
        if (btnTime) {
          btnTime.style.background = '#00d2ff';
          btnTime.style.color = '#080d19';
          btnTime.style.fontWeight = '700';
        }
        if (btnHours) {
          btnHours.style.background = 'transparent';
          btnHours.style.color = '#94a3b8';
          btnHours.style.fontWeight = '600';
        }
        showToast('Switched to Time-wise Window (17:30 - 21:00).');
      } else {
        if (btnHours) {
          btnHours.style.background = '#00d2ff';
          btnHours.style.color = '#080d19';
          btnHours.style.fontWeight = '700';
        }
        if (btnTime) {
          btnTime.style.background = 'transparent';
          btnTime.style.color = '#94a3b8';
          btnTime.style.fontWeight = '600';
        }
        showToast('Switched to Hour-wise Duration.');
      }
    }

    function savePostClassSchedule() {
      const hrs = typeof postClassHours === 'number' ? postClassHours : 3.5;
      showToast('Post-class schedule (' + hrs.toFixed(1) + ' hrs) committed to Adaptive Timetable.');
    }

    function resetLearningModelWeights() {
      if (confirm('Are you sure you want to reset the personal learning model heuristics to default weights?')) {
        studentStudyCapacity = 6.5;
        postClassHours = 3.5;
        const slider = document.getElementById('studyCapacityRange');
        if (slider) slider.value = "6.5";
        updateDailyStudyCapacity(6.5);
        renderPostClassHours();
        showToast('Personal heuristic drift cleared. Adaptive v2.4 recalibrated.');
      }
    }

    function revokeNonEssentialPermissions() {
      const benchmark = document.getElementById('permAnonymizedBenchmark');
      const pacing = document.getElementById('permAdaptivePacing');
      if (benchmark) benchmark.checked = false;
      if (pacing) pacing.checked = false;
      showToast('Non-essential telemetry revoked. Privacy boundaries strictly enforced.');
    }

    function togglePermission(el, name) {
      const isChecked = el && el.checked ? true : false;
      showToast((name || 'Permission') + ' permission ' + (isChecked ? 'ENABLED' : 'DISABLED') + '.');
    }

    function openVirtualIdModal() {}
    function closeVirtualIdModal() {}

    function openEthicsPolicyModal() {
      const modal = document.getElementById('ethicsPolicyModal');
      if (modal) modal.classList.add('active');
    }

    function closeEthicsPolicyModal() {
      const modal = document.getElementById('ethicsPolicyModal');
      if (modal) modal.classList.remove('active');
    }

    // ========================================================
    // UNIQUE HOMEPAGE: REAL-TIME CAMPUS CLOCK & COMMAND HUD
    // ========================================================
    function updateCampusClock() {
      const clockEl = document.getElementById('liveCampusClock');
      if (!clockEl) return;
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const istDate = new Date(utc + (3600000 * 5.5));
      const hours = String(istDate.getHours()).padStart(2, '0');
      const minutes = String(istDate.getMinutes()).padStart(2, '0');
      const seconds = String(istDate.getSeconds()).padStart(2, '0');
      clockEl.innerText = `${hours}:${minutes}:${seconds} IST`;
    }
    setInterval(updateCampusClock, 1000);
    updateCampusClock();

    // ========================================================
    // UNIQUE HOMEPAGE: INTERACTIVE STATUTORY CALCULATOR REPL
    // ========================================================
    function updateHeroCalculator(val) {
      const slider = document.getElementById('heroCalcSlider');
      const valDisplay = document.getElementById('heroCalcVal');
      const regSelect = document.getElementById('heroCalcReg');
      const courseSelect = document.getElementById('heroCalcCourseType');
      const badge = document.getElementById('heroCalcRiskBadge');
      const bunksEl = document.getElementById('heroCalcBunksRemaining');
      const subEl = document.getElementById('heroCalcBunkSub');
      const adviceEl = document.getElementById('heroCalcAdvice');

      if (!slider || !valDisplay) return;

      const currentVal = parseFloat(val !== undefined ? val : slider.value);
      valDisplay.innerText = currentVal.toFixed(1) + '%';

      const statutoryThreshold = parseFloat(regSelect ? regSelect.value : '75');
      const courseType = courseSelect ? courseSelect.value : 'theory';
      
      const margin = currentVal - statutoryThreshold;

      if (margin >= 4.0) {
        if (badge) {
          badge.style.background = 'rgba(16, 185, 129, 0.15)';
          badge.style.color = '#10b981';
          badge.style.borderColor = 'rgba(16, 185, 129, 0.35)';
          badge.innerText = `✔ NOMINAL CLEARANCE (+${margin.toFixed(1)}%)`;
        }
        const safeBunks = Math.max(1, Math.floor(margin / 2.2));
        if (bunksEl) {
          bunksEl.innerText = `${safeBunks} Safe Bunks`;
          bunksEl.style.color = '#34d399';
        }
        if (subEl) subEl.innerText = `Statutory buffer intact (§6.2)`;
        if (adviceEl) adviceEl.innerText = `High-compliance buffer. You have ${safeBunks} discretionary bunks before crossing the ${statutoryThreshold}% university statutory minimum.`;
      } else if (margin >= 0) {
        if (badge) {
          badge.style.background = 'rgba(245, 158, 11, 0.15)';
          badge.style.color = '#f59e0b';
          badge.style.borderColor = 'rgba(245, 158, 11, 0.35)';
          badge.innerText = `⚠ BORDERLINE SAFE (+${margin.toFixed(1)}%)`;
        }
        if (bunksEl) {
          bunksEl.innerText = `1 Discretionary Bunk`;
          bunksEl.style.color = '#f59e0b';
        }
        if (subEl) subEl.innerText = `Remaining before debarment trigger`;
        if (adviceEl) adviceEl.innerText = `You are hovering within 1 lecture of the ${statutoryThreshold}% boundary. Missing 1 more class immediately drops you into debarment alert status.`;
      } else {
        if (badge) {
          badge.style.background = 'rgba(244, 63, 94, 0.18)';
          badge.style.color = '#f43f5e';
          badge.style.borderColor = 'rgba(244, 63, 94, 0.4)';
          badge.innerText = `▲ STATUTORY BREACH (${margin.toFixed(1)}%)`;
        }
        const sessionsNeeded = Math.ceil(Math.abs(margin) * 0.45) || 1;
        if (bunksEl) {
          bunksEl.innerText = `Must Attend ${sessionsNeeded} Classes`;
          bunksEl.style.color = '#f43f5e';
        }
        if (subEl) subEl.innerText = `Consecutively to regain §6.2 clearance`;
        if (adviceEl) adviceEl.innerText = `Critical statutory deficit! You are debarred under regulation §6.2 unless you file a medical condonation or attend the next ${sessionsNeeded} consecutive lectures.`;
      }
    }

    function setHeroCalcPreset(threshold, targetVal) {
      const regSelect = document.getElementById('heroCalcReg');
      const slider = document.getElementById('heroCalcSlider');
      if (regSelect) {
        regSelect.value = threshold;
      }
      if (slider && targetVal !== undefined) {
        slider.value = targetVal;
      }
      if (typeof updateHeroCalculator === 'function') {
        updateHeroCalculator(slider ? slider.value : undefined);
      }
      document.querySelectorAll('.hero-preset-btn').forEach(btn => {
        if (btn.getAttribute('data-threshold') == threshold) {
          btn.style.background = 'rgba(0, 210, 255, 0.25)';
          btn.style.borderColor = '#00d2ff';
          btn.style.color = '#ffffff';
        } else {
          btn.style.background = 'rgba(15, 23, 42, 0.7)';
          btn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          btn.style.color = '#94a3b8';
        }
      });
    }

    const branchData = {
      cse: {
        title: 'Computer Science & Engineering (CSE)',
        badge: 'VTU / AKTU 2022 SCHEME §6.2',
        courses: [
          { code: 'CS601', name: 'Compiler Design & Lexical Analysis', pct: 94.2, attended: '33/35', safeBunks: 4, status: 'Nominal', time: 'Tomorrow 09:30 AM', color: '#10b981' },
          { code: 'CS602', name: 'Computer Networks & Socket API', pct: 76.4, attended: '26/34', safeBunks: 1, status: 'Critical', time: 'Today 02:00 PM (Lab)', color: '#f43f5e' },
          { code: 'CS603', name: 'Database & Distributed Storage Systems', pct: 88.0, attended: '22/25', safeBunks: 3, status: 'Nominal', time: 'Friday 11:30 AM', color: '#38bdf8' }
        ],
        projectedSgpa: '8.85',
        cieProgress: '22.5 / 25 Avg'
      },
      aids: {
        title: 'Artificial Intelligence & Data Science (AI/DS)',
        badge: 'AUTONOMOUS INDUSTRY 4.0 SCHEME',
        courses: [
          { code: 'AI501', name: 'Deep Neural Networks & PyTorch Lab', pct: 91.5, attended: '31/34', safeBunks: 3, status: 'Nominal', time: 'Tomorrow 10:00 AM', color: '#10b981' },
          { code: 'DS502', name: 'Big Data Pipeline Engineering & Spark', pct: 74.2, attended: '23/31', safeBunks: 0, status: 'Breach Imminent', time: 'Today 03:30 PM', color: '#f43f5e' },
          { code: 'AI503', name: 'Natural Language Processing & LLMs', pct: 84.6, attended: '22/26', safeBunks: 2, status: 'Nominal', time: 'Thursday 11:00 AM', color: '#a855f7' }
        ],
        projectedSgpa: '9.04',
        cieProgress: '23.8 / 25 Avg'
      },
      ece: {
        title: 'Electronics & Communication Engineering (ECE)',
        badge: 'AICTE HARDWARE/EMBEDDED TIER',
        courses: [
          { code: 'EC601', name: 'Digital Signal Processing (DSP) & MATLAB', pct: 82.5, attended: '33/40', safeBunks: 2, status: 'Nominal', time: 'Tomorrow 08:30 AM', color: '#38bdf8' },
          { code: 'EC602', name: 'VLSI Design & Cadence Virtuoso Lab', pct: 77.0, attended: '20/26', safeBunks: 1, status: 'Borderline', time: 'Today 01:30 PM (Lab)', color: '#f59e0b' },
          { code: 'EC603', name: 'Embedded Systems & ARM Cortex Microcontrollers', pct: 89.2, attended: '25/28', safeBunks: 3, status: 'Nominal', time: 'Friday 09:30 AM', color: '#10b981' }
        ],
        projectedSgpa: '8.62',
        cieProgress: '21.0 / 25 Avg'
      },
      mech: {
        title: 'Mechanical & Mechatronics Engineering (MECH)',
        badge: 'CORE ENGINEERING LAB PROTOCOL',
        courses: [
          { code: 'ME601', name: 'Finite Element Analysis (FEA) & ANSYS', pct: 85.0, attended: '34/40', safeBunks: 3, status: 'Nominal', time: 'Tomorrow 10:30 AM', color: '#38bdf8' },
          { code: 'ME602', name: 'Heat Transfer & Applied Thermodynamics', pct: 73.8, attended: '28/38', safeBunks: 0, status: 'Debarment Hazard', time: 'Today 11:30 AM', color: '#f43f5e' },
          { code: 'ME603', name: 'Robotics Kinematics & CNC Automation Lab', pct: 93.3, attended: '14/15', safeBunks: 2, status: 'Nominal', time: 'Thursday 02:00 PM (Lab)', color: '#10b981' }
        ],
        projectedSgpa: '8.48',
        cieProgress: '20.5 / 25 Avg'
      },
      eee: {
        title: 'Electrical & Electronics Engineering (EEE)',
        badge: 'POWER SYSTEMS & DRIVES CURRICULUM',
        courses: [
          { code: 'EE601', name: 'Power System Analysis & Smart Grids', pct: 79.5, attended: '31/39', safeBunks: 1, status: 'Borderline', time: 'Tomorrow 09:00 AM', color: '#f59e0b' },
          { code: 'EE602', name: 'Power Electronics Converters & Inverters', pct: 88.6, attended: '31/35', safeBunks: 3, status: 'Nominal', time: 'Today 02:30 PM', color: '#10b981' },
          { code: 'EE603', name: 'Control Systems Design & Simulink Lab', pct: 90.0, attended: '18/20', safeBunks: 2, status: 'Nominal', time: 'Friday 10:00 AM (Lab)', color: '#38bdf8' }
        ],
        projectedSgpa: '8.70',
        cieProgress: '22.0 / 25 Avg'
      }
    };

    function switchHomepageBranch(branchKey) {
      const data = branchData[branchKey] || branchData.cse;
      
      document.querySelectorAll('.branch-selector-tab').forEach(tab => {
        if (tab.getAttribute('data-branch') === branchKey) {
          tab.style.background = 'rgba(0, 210, 255, 0.2)';
          tab.style.borderColor = '#00d2ff';
          tab.style.color = '#ffffff';
          tab.style.boxShadow = '0 0 16px rgba(0, 210, 255, 0.25)';
        } else {
          tab.style.background = 'rgba(15, 23, 42, 0.6)';
          tab.style.borderColor = 'rgba(255, 255, 255, 0.08)';
          tab.style.color = '#94a3b8';
          tab.style.boxShadow = 'none';
        }
      });

      const titleEl = document.getElementById('branchShowcaseTitle');
      const badgeEl = document.getElementById('branchShowcaseBadge');
      const coursesEl = document.getElementById('branchShowcaseCourses');
      const sgpaEl = document.getElementById('branchShowcaseSgpa');
      const cieEl = document.getElementById('branchShowcaseCie');

      if (titleEl) titleEl.innerText = data.title;
      if (badgeEl) badgeEl.innerText = data.badge;
      if (sgpaEl) sgpaEl.innerText = data.projectedSgpa;
      if (cieEl) cieEl.innerText = data.cieProgress;

      if (coursesEl) {
        coursesEl.innerHTML = data.courses.map(c => `
          <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid ${c.pct < 75 ? 'rgba(244, 63, 94, 0.35)' : 'rgba(255, 255, 255, 0.08)'}; border-radius: 10px; padding: 14px 16px; transition: all 0.2s;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-family: 'JetBrains Mono'; font-size: 11px; font-weight: 800; color: #38bdf8; background: rgba(56, 189, 248, 0.12); padding: 2px 7px; border-radius: 4px;">${c.code}</span>
                <span style="font-size: 13.5px; font-weight: 700; color: #ffffff;">${c.name}</span>
              </div>
              <div style="font-size: 13px; font-weight: 800; color: ${c.color}; font-family: 'JetBrains Mono';">${c.pct}% (${c.attended})</div>
            </div>
            <div style="height: 6px; width: 100%; border-radius: 9999px; background: rgba(255, 255, 255, 0.08); overflow: hidden; margin-bottom: 8px;">
              <div style="width: ${c.pct}%; height: 100%; background: ${c.pct >= 75 ? 'linear-gradient(90deg, #06b6d4, #10b981)' : 'linear-gradient(90deg, #f59e0b, #f43f5e)'}; border-radius: 9999px;"></div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px;">
              <span style="color: ${c.pct >= 75 ? '#34d399' : '#f43f5e'}; font-weight: 700; font-family: 'JetBrains Mono';">
                ${c.pct >= 75 ? `✔ Safe to bunk ${c.safeBunks} sessions` : '▲ CRITICAL: Debarment boundary breached!'}
              </span>
              <span style="color: #64748b; font-family: 'JetBrains Mono';">${c.time}</span>
            </div>
          </div>
        `).join('');
      }
    }

    function selectCombatPersona(personaKey) {
      document.querySelectorAll('.persona-card-wrap').forEach(card => {
        if (card.getAttribute('data-persona') === personaKey) {
          card.style.borderColor = '#00d2ff';
          card.style.background = 'rgba(14, 25, 48, 0.9)';
          card.style.boxShadow = '0 0 30px rgba(0, 210, 255, 0.2)';
        } else {
          card.style.borderColor = 'rgba(255, 255, 255, 0.08)';
          card.style.background = 'rgba(8, 14, 28, 0.7)';
          card.style.boxShadow = 'none';
        }
      });
      if (personaKey === 'builder') {
        showToast('Activated: The Hackathon Builder preset (75.2% Buffer Lock, 14 safe bunks, 80/20 PYQs).');
      } else if (personaKey === 'pointer') {
        showToast('Activated: The 9.5 Pointer Hunter preset (CIE Radar Max, 100% Lab Viva Vault).');
      } else if (personaKey === 'recuperator') {
        showToast('Activated: The Recuperator preset (Consecutive recovery streak calculated, medical waiver mapped).');
      }
    }
    function switchHeroSubsystem(mode) {
      const modes = ['statutory', 'circadian', 'cie', 'bunks'];
      modes.forEach(m => {
        const btn = document.getElementById(`subsystem-tab-${m}`);
        if (btn) {
          if (m === mode) {
            btn.style.background = 'rgba(0, 210, 255, 0.18)';
            btn.style.borderColor = '#00d2ff';
            btn.style.color = '#ffffff';
          } else {
            btn.style.background = 'transparent';
            btn.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            btn.style.color = '#94a3b8';
          }
        }
      });

      const statsDeck = document.getElementById('telemetryStatsDeck');
      const bodyDeck = document.getElementById('telemetryBodyDeck');
      if (!statsDeck || !bodyDeck) return;

      if (mode === 'statutory') {
        statsDeck.innerHTML = `
          <div class="screen-stat-card">
            <div style="font-size: 10.5px; font-family: 'JetBrains Mono', monospace; font-weight: 750; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">OVERALL AGGREGATE</div>
            <div style="display: flex; align-items: baseline; gap: 8px;">
              <span style="font-size: 32px; font-weight: 850; color: #ffffff; font-family: 'JetBrains Mono', monospace; line-height: 1;">81.4%</span>
              <span style="font-size: 11px; font-weight: 750; color: #10b981; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); padding: 2px 7px; border-radius: 4px; font-family: 'JetBrains Mono';">+0.4% SAFE</span>
            </div>
            <div style="font-size: 11px; color: #94a3b8; margin-top: 6px;">Cutoff: 75.0% Min | Status: Nominal</div>
          </div>
          <div class="screen-stat-card">
            <div style="font-size: 10.5px; font-family: 'JetBrains Mono', monospace; font-weight: 750; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">DISCRETIONARY BUNKS</div>
            <div style="display: flex; align-items: baseline; gap: 8px;">
              <span style="font-size: 32px; font-weight: 850; color: #38bdf8; font-family: 'JetBrains Mono', monospace; line-height: 1;">12</span>
              <span style="font-size: 13px; font-weight: 700; color: #38bdf8;">SAFE BUNKS</span>
              <span style="font-size: 10.5px; font-weight: 700; color: #38bdf8; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.3); padding: 2px 6px; border-radius: 4px; font-family: 'JetBrains Mono';">Protected</span>
            </div>
            <div style="font-size: 11px; color: #94a3b8; margin-top: 6px;">Before 75% Boundary</div>
          </div>
          <div class="screen-stat-card">
            <div style="font-size: 10.5px; font-family: 'JetBrains Mono', monospace; font-weight: 750; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">DEBARMENT HAZARD</div>
            <div style="display: flex; align-items: baseline; gap: 8px;">
              <span style="font-size: 32px; font-weight: 850; color: #34d399; font-family: 'JetBrains Mono', monospace; line-height: 1;">0.00</span>
              <span style="font-size: 11px; font-weight: 750; color: #34d399; background: rgba(52, 211, 153, 0.15); border: 1px solid rgba(52, 211, 153, 0.3); padding: 2px 7px; border-radius: 4px; font-family: 'JetBrains Mono';">0.00 RISK</span>
            </div>
            <div style="font-size: 11px; color: #94a3b8; margin-top: 6px;">Metric Gain: BunkTrend | Rule §6.2: Pass</div>
          </div>
          <div class="screen-stat-card">
            <div style="font-size: 10.5px; font-family: 'JetBrains Mono', monospace; font-weight: 750; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">PREDICTED SGPA</div>
            <div style="display: flex; align-items: baseline; gap: 8px;">
              <span style="font-size: 32px; font-weight: 850; color: #ffffff; font-family: 'JetBrains Mono', monospace; line-height: 1;">8.74</span>
              <span style="font-size: 11px; font-weight: 750; color: #cbd5e1; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); padding: 2px 7px; border-radius: 4px; font-family: 'JetBrains Mono';">±0.12 DEV</span>
            </div>
            <div style="font-size: 11px; color: #94a3b8; margin-top: 6px;">Confidence: OPTIMIZE CIE | Top 5% ELIGIBLE</div>
          </div>
        `;

        bodyDeck.innerHTML = `
          <div style="background: rgba(10, 16, 28, 0.7); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; text-align: left;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <span style="font-size: 13.5px; font-weight: 800; color: #ffffff; letter-spacing: -0.01em;">Active Module Statutory Margins</span>
                <span style="font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700; color: #38bdf8; background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.25); padding: 3px 8px; border-radius: 4px;">REG §6.2 INTERPOLATED</span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 14px;">
                <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 8px; padding: 12px 14px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <div style="font-size: 13px; font-weight: 700; color: #ffffff;">CS801: Compiler Design & Automata</div>
                    <div style="font-size: 12px; font-weight: 800; color: #22d3ee; font-family: 'JetBrains Mono';">94.2% (33/35 Attended)</div>
                  </div>
                  <div style="height: 6px; width: 100%; border-radius: 9999px; background: rgba(255, 255, 255, 0.08); overflow: hidden; margin-bottom: 8px;">
                    <div style="width: 94.2%; height: 100%; background: linear-gradient(90deg, #06b6d4, #10b981); border-radius: 9999px;"></div>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px;">
                    <span style="color: #34d399; font-weight: 700; background: rgba(52, 211, 153, 0.12); border: 1px solid rgba(52, 211, 153, 0.25); padding: 2px 7px; border-radius: 4px; font-family: 'JetBrains Mono';">✔ Safe to bunk 4 consecutive sessions</span>
                    <span style="color: #64748b; font-family: 'JetBrains Mono';">Status: Nominal | Next: Tomorrow 09:30 AM</span>
                  </div>
                </div>
                <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(244, 63, 94, 0.25); border-radius: 8px; padding: 12px 14px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <div style="font-size: 13px; font-weight: 700; color: #ffffff;">CS402: Computer Networks & Protocols</div>
                    <div style="font-size: 12px; font-weight: 800; color: #f43f5e; font-family: 'JetBrains Mono';">76.4% (Critical Attendance)</div>
                  </div>
                  <div style="height: 6px; width: 100%; border-radius: 9999px; background: rgba(255, 255, 255, 0.08); overflow: hidden; margin-bottom: 8px;">
                    <div style="width: 76.4%; height: 100%; background: linear-gradient(90deg, #f59e0b, #f43f5e); border-radius: 9999px;"></div>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px;">
                    <span style="color: #f43f5e; font-weight: 700; background: rgba(244, 63, 94, 0.14); border: 1px solid rgba(244, 63, 94, 0.3); padding: 2px 7px; border-radius: 4px; font-family: 'JetBrains Mono';">▲ CRITICAL ZONE: Must attend next 3 classes</span>
                    <span style="color: #f43f5e; font-family: 'JetBrains Mono';">Status: Critical | Today 02:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="background: rgba(10, 16, 28, 0.7); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; text-align: left;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <span style="font-size: 13.5px; font-weight: 800; color: #ffffff; letter-spacing: -0.01em;">Circadian Rest Engine</span>
                <span style="font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700; color: #a855f7; background: rgba(168, 85, 247, 0.12); border: 1px solid rgba(168, 85, 247, 0.25); padding: 3px 8px; border-radius: 4px;">SLOT: EV1 P/L</span>
              </div>
              <div style="font-size: 11px; font-family: 'JetBrains Mono', monospace; font-weight: 750; color: #22d3ee; margin-bottom: 4px;">● OPTIMAL DEEP FOCUS BLOCK</div>
              <div style="font-size: 26px; font-weight: 900; color: #ffffff; letter-spacing: -0.02em; margin-bottom: 6px;">10:15 PM — 01:00 AM</div>
              <div style="font-size: 12.5px; color: #94a3b8; line-height: 1.55; margin-bottom: 14px;">Post synaptic recuperation window detected. Recommended for Distributed Systems CIE revision.</div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid rgba(255, 255, 255, 0.06); font-size: 11.5px; font-family: 'JetBrains Mono', monospace;">
              <span style="color: #94a3b8;">Bio-Telemetry: Synced</span>
              <span style="color: #34d399; font-weight: 700;">● System Guard ACTIVE</span>
            </div>
          </div>
        `;
      } else if (mode === 'circadian') {
        statsDeck.innerHTML = `
          <div class="screen-stat-card">
            <div style="font-size: 10.5px; font-family: 'JetBrains Mono'; font-weight: 750; color: #a855f7; text-transform: uppercase;">SLEEP ARCHITECTURE</div>
            <div style="display: flex; align-items: baseline; gap: 8px;">
              <span style="font-size: 32px; font-weight: 850; color: #ffffff; font-family: 'JetBrains Mono'; line-height: 1;">7h 15m</span>
              <span style="font-size: 11px; font-weight: 750; color: #a855f7; background: rgba(168, 85, 247, 0.15); padding: 2px 7px; border-radius: 4px;">OPTIMAL</span>
            </div>
            <div style="font-size: 11px; color: #94a3b8; margin-top: 6px;">REM: 23.4% • Deep Slow Wave: 18.2%</div>
          </div>
          <div class="screen-stat-card">
            <div style="font-size: 10.5px; font-family: 'JetBrains Mono'; font-weight: 750; color: #22d3ee; text-transform: uppercase;">PEAK COGNITIVE HORIZON</div>
            <div style="display: flex; align-items: baseline; gap: 8px;">
              <span style="font-size: 32px; font-weight: 850; color: #22d3ee; font-family: 'JetBrains Mono'; line-height: 1;">09:30</span>
              <span style="font-size: 13px; font-weight: 700; color: #38bdf8;">AM</span>
              <span style="font-size: 10.5px; font-weight: 700; color: #10b981; background: rgba(16, 185, 129, 0.15); padding: 2px 6px; border-radius: 4px;">HIGH ALPHA</span>
            </div>
            <div style="font-size: 11px; color: #94a3b8; margin-top: 6px;">Duration: 3.5 hrs uninterrupted window</div>
          </div>
          <div class="screen-stat-card">
            <div style="font-size: 10.5px; font-family: 'JetBrains Mono'; font-weight: 750; color: #f59e0b; text-transform: uppercase;">ACCUMULATED SLEEP DEBT</div>
            <div style="display: flex; align-items: baseline; gap: 8px;">
              <span style="font-size: 32px; font-weight: 850; color: #f59e0b; font-family: 'JetBrains Mono'; line-height: 1;">-1.2h</span>
              <span style="font-size: 11px; font-weight: 750; color: #f59e0b; background: rgba(245, 158, 11, 0.15); padding: 2px 7px; border-radius: 4px;">MILD</span>
            </div>
            <div style="font-size: 11px; color: #94a3b8; margin-top: 6px;">Offset by 20m power nap scheduled at 17:00</div>
          </div>
          <div class="screen-stat-card">
            <div style="font-size: 10.5px; font-family: 'JetBrains Mono'; font-weight: 750; color: #10b981; text-transform: uppercase;">MENTAL CLARITY INDEX</div>
            <div style="display: flex; align-items: baseline; gap: 8px;">
              <span style="font-size: 32px; font-weight: 850; color: #ffffff; font-family: 'JetBrains Mono'; line-height: 1;">91/100</span>
              <span style="font-size: 11px; font-weight: 750; color: #10b981; background: rgba(16, 185, 129, 0.15); padding: 2px 7px; border-radius: 4px;">EXCELLENT</span>
            </div>
            <div style="font-size: 11px; color: #94a3b8; margin-top: 6px;">Ready for Math IV / OS Algorithmic proofing</div>
          </div>
        `;

        bodyDeck.innerHTML = `
          <div style="background: rgba(10, 16, 28, 0.7); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 20px; text-align: left;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
              <span style="font-size: 14px; font-weight: 800; color: #ffffff;">24-Hour Circadian Alertness Curve</span>
              <span style="font-family: 'JetBrains Mono'; font-size: 10px; color: #a855f7; background: rgba(168, 85, 247, 0.15); padding: 3px 8px; border-radius: 4px;">BIOMETRIC HARMONIZATION</span>
            </div>
            <div style="height: 100px; width: 100%; margin-bottom: 12px;">
              <svg width="100%" height="100%" viewBox="0 0 500 100" preserveAspectRatio="none">
                <path d="M 0 80 Q 70 90, 120 20 T 250 40 T 360 15 T 500 85 L 500 100 L 0 100 Z" fill="rgba(168, 85, 247, 0.15)"/>
                <path d="M 0 80 Q 70 90, 120 20 T 250 40 T 360 15 T 500 85" fill="none" stroke="#a855f7" stroke-width="2.5"/>
                <circle cx="120" cy="20" r="5" fill="#a855f7"/>
                <circle cx="360" cy="15" r="5" fill="#22d3ee"/>
              </svg>
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'JetBrains Mono'; font-size: 11px; color: #94a3b8;">
              <span>06:00 (Wake)</span>
              <span style="color: #a855f7;">09:30 - 13:00 (Peak Alertness)</span>
              <span>15:00 (Post-Lunch Dip)</span>
              <span style="color: #22d3ee;">21:30 - 00:30 (Second Peak)</span>
            </div>
          </div>
          <div style="background: rgba(10, 16, 28, 0.7); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 20px; text-align: left; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 14px; font-weight: 800; color: #ffffff; margin-bottom: 8px;">Autonomous Study Recommendations</div>
              <p style="font-size: 12.5px; color: #cbd5e1; line-height: 1.55; margin-bottom: 14px;">
                Your biological cortisol peak aligns perfectly with tomorrow morning's 09:30 AM Compiler Design slot. Do not bunk this class; your memory encoding index is 2.8x higher than late night study.
              </p>
              <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 10px 14px;">
                <div style="font-size: 11px; font-family: 'JetBrains Mono'; color: #00d2ff;">SCHEDULED ACTION:</div>
                <div style="font-size: 13px; font-weight: 700; color: #fff;">25-Min Math IV Sprint at 21:45 PM</div>
              </div>
            </div>
            <button onclick="openLoginModal()" class="btn btn-primary" style="margin-top: 14px; padding: 9px; justify-content: center; font-size: 12.5px;">Login to Sync Circadian Calendar →</button>
          </div>
        `;
      } else if (mode === 'cie') {
        statsDeck.innerHTML = `
          <div class="screen-stat-card">
            <div style="font-size: 10.5px; font-family: 'JetBrains Mono'; font-weight: 750; color: #10b981; text-transform: uppercase;">CIE-2 SGPA PROJECTION</div>
            <div style="display: flex; align-items: baseline; gap: 8px;">
              <span style="font-size: 32px; font-weight: 850; color: #ffffff; font-family: 'JetBrains Mono'; line-height: 1;">8.92</span>
              <span style="font-size: 11px; font-weight: 750; color: #10b981; background: rgba(16, 185, 129, 0.15); padding: 2px 7px; border-radius: 4px;">TARGET 9.0+</span>
            </div>
            <div style="font-size: 11px; color: #94a3b8; margin-top: 6px;">Weight: 40% Continuous Assessment</div>
          </div>
          <div class="screen-stat-card">
            <div style="font-size: 10.5px; font-family: 'JetBrains Mono'; font-weight: 750; color: #f43f5e; text-transform: uppercase;">MATH IV INTERNAL SCORE</div>
            <div style="display: flex; align-items: baseline; gap: 8px;">
              <span style="font-size: 32px; font-weight: 850; color: #f43f5e; font-family: 'JetBrains Mono'; line-height: 1;">18.5/25</span>
              <span style="font-size: 10.5px; font-weight: 700; color: #f43f5e; background: rgba(244, 63, 94, 0.15); padding: 2px 6px; border-radius: 4px;">GAP: 3.5x</span>
            </div>
            <div style="font-size: 11px; color: #94a3b8; margin-top: 6px;">Target for CIE-2: 22.0/25 minimum</div>
          </div>
          <div class="screen-stat-card">
            <div style="font-size: 10.5px; font-family: 'JetBrains Mono'; font-weight: 750; color: #38bdf8; text-transform: uppercase;">OS & NETWORKS INTERNAL</div>
            <div style="display: flex; align-items: baseline; gap: 8px;">
              <span style="font-size: 32px; font-weight: 850; color: #38bdf8; font-family: 'JetBrains Mono'; line-height: 1;">22.5/25</span>
              <span style="font-size: 11px; font-weight: 750; color: #38bdf8; background: rgba(56, 189, 248, 0.15); padding: 2px 7px; border-radius: 4px;">HIGH STABLE</span>
            </div>
            <div style="font-size: 11px; color: #94a3b8; margin-top: 6px;">Process Sync & Virtual Memory secure</div>
          </div>
          <div class="screen-stat-card">
            <div style="font-size: 10.5px; font-family: 'JetBrains Mono'; font-weight: 750; color: #fbbf24; text-transform: uppercase;">SYLLABUS RETENTION RATIO</div>
            <div style="display: flex; align-items: baseline; gap: 8px;">
              <span style="font-size: 32px; font-weight: 850; color: #ffffff; font-family: 'JetBrains Mono'; line-height: 1;">74.8%</span>
              <span style="font-size: 11px; font-weight: 750; color: #fbbf24; background: rgba(251, 191, 36, 0.15); padding: 2px 7px; border-radius: 4px;">+4.2% WK</span>
            </div>
            <div style="font-size: 11px; color: #94a3b8; margin-top: 6px;">Space repetition active on 14 units</div>
          </div>
        `;

        bodyDeck.innerHTML = `
          <div style="background: rgba(10, 16, 28, 0.7); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 20px; text-align: left;">
            <div style="font-size: 14px; font-weight: 800; color: #ffffff; margin-bottom: 12px;">CIE-2 High-Yield Subject Breakdown</div>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="background: rgba(15, 23, 42, 0.6); padding: 10px 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.06);">
                <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                  <span style="color: #fff; font-weight: 700;">MA401: Numerical Methods & Probability</span>
                  <span style="color: #f43f5e; font-family: 'JetBrains Mono'; font-weight: 750;">Gap Multiplier: 3.5x</span>
                </div>
                <div style="height: 5px; background: rgba(255,255,255,0.08); border-radius: 999px; overflow: hidden;">
                  <div style="width: 58%; height: 100%; background: #f43f5e;"></div>
                </div>
              </div>
              <div style="background: rgba(15, 23, 42, 0.6); padding: 10px 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.06);">
                <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                  <span style="color: #fff; font-weight: 700;">CS403: Operating Systems & Virtual Memory</span>
                  <span style="color: #38bdf8; font-family: 'JetBrains Mono'; font-weight: 750;">Ready: 88%</span>
                </div>
                <div style="height: 5px; background: rgba(255,255,255,0.08); border-radius: 999px; overflow: hidden;">
                  <div style="width: 88%; height: 100%; background: #38bdf8;"></div>
                </div>
              </div>
            </div>
          </div>
          <div style="background: rgba(10, 16, 28, 0.7); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 20px; text-align: left; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 14px; font-weight: 800; color: #ffffff; margin-bottom: 8px;">CIE Score Impact on University Degree</div>
              <p style="font-size: 12.5px; color: #94a3b8; line-height: 1.55;">
                Scoring ≥22 in CIE-2 across all 4-credit courses unlocks campus placement eligibility for Tier-1 engineering firms (Goldman Sachs, Cisco, Google IDC).
              </p>
            </div>
            <button onclick="openLoginModal()" class="btn btn-primary" style="margin-top: 14px; padding: 9px; justify-content: center; font-size: 12.5px;">Login to Track Internal Marks →</button>
          </div>
        `;
      } else if (mode === 'bunks') {
        statsDeck.innerHTML = `
          <div class="screen-stat-card">
            <div style="font-size: 10.5px; font-family: 'JetBrains Mono'; font-weight: 750; color: #38bdf8; text-transform: uppercase;">TOTAL DISCRETIONARY BUNKS</div>
            <div style="display: flex; align-items: baseline; gap: 8px;">
              <span style="font-size: 32px; font-weight: 850; color: #38bdf8; font-family: 'JetBrains Mono'; line-height: 1;">12</span>
              <span style="font-size: 11px; font-weight: 750; color: #38bdf8; background: rgba(56, 189, 248, 0.15); padding: 2px 7px; border-radius: 4px;">PROTECTED</span>
            </div>
            <div style="font-size: 11px; color: #94a3b8; margin-top: 6px;">Across all 6 registered semester courses</div>
          </div>
          <div class="screen-stat-card">
            <div style="font-size: 10.5px; font-family: 'JetBrains Mono'; font-weight: 750; color: #34d399; text-transform: uppercase;">COMPILER DESIGN BUFFER</div>
            <div style="display: flex; align-items: baseline; gap: 8px;">
              <span style="font-size: 32px; font-weight: 850; color: #34d399; font-family: 'JetBrains Mono'; line-height: 1;">+4</span>
              <span style="font-size: 11px; font-weight: 750; color: #34d399; background: rgba(52, 211, 153, 0.15); padding: 2px 7px; border-radius: 4px;">SAFE</span>
            </div>
            <div style="font-size: 11px; color: #94a3b8; margin-top: 6px;">Can skip without condonation penalty</div>
          </div>
          <div class="screen-stat-card">
            <div style="font-size: 10.5px; font-family: 'JetBrains Mono'; font-weight: 750; color: #f43f5e; text-transform: uppercase;">MATH IV BUFFER</div>
            <div style="display: flex; align-items: baseline; gap: 8px;">
              <span style="font-size: 32px; font-weight: 850; color: #f43f5e; font-family: 'JetBrains Mono'; line-height: 1;">0</span>
              <span style="font-size: 11px; font-weight: 750; color: #f43f5e; background: rgba(244, 63, 94, 0.15); padding: 2px 7px; border-radius: 4px;">0 LEFTOVER</span>
            </div>
            <div style="font-size: 11px; color: #94a3b8; margin-top: 6px;">Zero bunks allowed until next 2 attended</div>
          </div>
          <div class="screen-stat-card">
            <div style="font-size: 10.5px; font-family: 'JetBrains Mono'; font-weight: 750; color: #10b981; text-transform: uppercase;">LAB / PRACTICAL BUFFER</div>
            <div style="display: flex; align-items: baseline; gap: 8px;">
              <span style="font-size: 32px; font-weight: 850; color: #ffffff; font-family: 'JetBrains Mono'; line-height: 1;">+2</span>
              <span style="font-size: 11px; font-weight: 750; color: #10b981; background: rgba(16, 185, 129, 0.15); padding: 2px 7px; border-radius: 4px;">CLEARED</span>
            </div>
            <div style="font-size: 11px; color: #94a3b8; margin-top: 6px;">DBMS Lab practical unit quota intact</div>
          </div>
        `;

        bodyDeck.innerHTML = `
          <div style="background: rgba(10, 16, 28, 0.7); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 20px; text-align: left;">
            <div style="font-size: 14px; font-weight: 800; color: #ffffff; margin-bottom: 12px;">Strategic Bunk Feasibility Radar</div>
            <p style="font-size: 12.5px; color: #cbd5e1; line-height: 1.55; margin-bottom: 12px;">
              Annovexa prevents accidental debarment by ranking every upcoming lecture by strategic bunk safety:
            </p>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 6px; padding: 8px 12px; font-size: 12px; color: #34d399;">
                ✔ Tomorrow 14:00 (DBMS Seminar): Safe to skip. Retains 91.2% aggregate.
              </div>
              <div style="background: rgba(244, 63, 94, 0.12); border: 1px solid rgba(244, 63, 94, 0.3); border-radius: 6px; padding: 8px 12px; font-size: 12px; color: #f87171;">
                ✖ Friday 09:30 (Math IV Tutorial): DO NOT BUNK. Triggers automatic HOD debarment warning.
              </div>
            </div>
          </div>
          <div style="background: rgba(10, 16, 28, 0.7); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 20px; text-align: left; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 14px; font-weight: 800; color: #ffffff; margin-bottom: 8px;">Autonomous Debarment Shield</div>
              <p style="font-size: 12.5px; color: #94a3b8; line-height: 1.55;">
                Every semester, over 120,000 engineering students in India face year-loss or semester debarment. Annovexa mathematically guarantees your degree progression.
              </p>
            </div>
            <button onclick="openLoginModal()" class="btn btn-primary" style="margin-top: 14px; padding: 9px; justify-content: center; font-size: 12.5px;">Login to Activate Debarment Shield →</button>
          </div>
        `;
      }
    }

    // ========================================================
    // SIMULATION REPL MODAL HANDLERS
    // ========================================================
    function openSimulationModal() {
      const modal = document.getElementById('simModal');
      if (modal) modal.classList.add('active');
    }

    function closeSimulationModal() {
      const modal = document.getElementById('simModal');
      if (modal) modal.classList.remove('active');
    }

    function runSimModalScenario(type) {
      const badge = document.getElementById('simModalBadge');
      const detail = document.getElementById('simModalDetail');
      if (!badge || !detail) return;

      if (type === 'hackathon') {
        badge.style.color = '#10b981';
        badge.style.background = 'rgba(16, 185, 129, 0.15)';
        badge.innerText = 'CLEARED (78.2%)';
        detail.innerText = 'Selecting Hackathon Weekend temporarily drops your CS402 Math IV buffer to 76.8%, but keeps overall aggregate safe without invoking statutory condonation penalties.';
      } else if (type === 'illness') {
        badge.style.color = '#38bdf8';
        badge.style.background = 'rgba(56, 189, 248, 0.15)';
        badge.innerText = 'WAIVED VIA OD/MEDICAL §6.2';
        detail.innerText = 'Filing a Medical Exemption condones up to 10% attendance under university regulation §6.2. Your requirement is reduced from 75% to 65%, keeping you 100% debarment-proof.';
      } else if (type === 'cram') {
        badge.style.color = '#a855f7';
        badge.style.background = 'rgba(168, 85, 247, 0.15)';
        badge.innerText = 'SGPA +0.6 BOOST';
        detail.innerText = 'Allocating 15 focus sprint hours to Numerical Methods and Operating Systems bridges 3 prerequisite gaps and increases your predicted SGPA to 9.15.';
      }
    }

    // ========================================================
    // DEMO PROFILE SELECTOR FOR LOGIN MODAL
    // ========================================================
    function selectDemoProfile(profile) {
      if (typeof setAuthMode === 'function') setAuthMode('signin');
      const emailInput = document.getElementById('loginEmail');
      const passInput = document.getElementById('loginPass');
      if (!emailInput || !passInput) return;

      if (profile === 'alex') {
        emailInput.value = 'alex.vance@btech.ac.in';
        passInput.value = 'engineer2026';
        if (typeof showToast === 'function') showToast('Selected Alex Vance (B.Tech CSE - 81.4% Attendance)');
      } else if (profile === 'priya') {
        emailInput.value = 'priya.sharma@btech.ac.in';
        passInput.value = 'ece2026';
        if (typeof showToast === 'function') showToast('Selected Priya Sharma (B.Tech ECE - 74.8% Critical Alert)');
      }
    }

