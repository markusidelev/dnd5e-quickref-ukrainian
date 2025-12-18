// Dynamically load the correct data files (2024 or standard) and language-specific variants
(function() {
    var rules2024 = localStorage.getItem('rules2024') === 'true';
    // language stored as 'appLanguage' (values: 'en' or 'uk')
    var lang = localStorage.getItem('appLanguage') || (navigator.language || navigator.userLanguage || 'en');
    lang = (lang + '').toLowerCase().startsWith('uk') ? 'uk' : (lang === 'en' ? 'en' : (lang.indexOf('uk') === 0 ? 'uk' : 'en'));
    var head = document.getElementsByTagName('head')[0];

    // Helper to inject a script tag for a data file with optional fallback on error
    function loadScript(src, fallback) {
        var script = document.createElement('script');
        script.src = src;
        script.defer = false;
        if (fallback) {
            script.onerror = function () {
                // load fallback (English) if language-specific file missing
                try {
                    var fb = document.createElement('script');
                    fb.src = fallback;
                    fb.defer = false;
                    head.appendChild(fb);
                } catch (e) {
                    // swallow
                }
            };
        }
        head.appendChild(script);
    }

    // Load either the 2024 or standard data file for a given base name and language
    function loadRuleFile(base) {
        var prefix = rules2024 ? 'js/2024_' : 'js/';
        var eng = prefix + base + '.js';
        if (lang === 'uk') {
            var uk = prefix + base + '_uk.js';
            loadScript(uk, eng);
        } else {
            loadScript(eng);
        }
    }

    // List of all rule data files to load
    var ruleFiles = [
        'data_movement',
        'data_action',
        'data_bonusaction',
        'data_reaction',
        'data_condition',
        'data_environment',
    ];

    ruleFiles.forEach(loadRuleFile);
})();

// Translations for UI strings
var UI_TRANSLATIONS = {
    en: {
        collapseAll: 'Collapse',
        movement: { title: 'Movement', floatRight: 'limited by movement speed', subtitle: 'You can move at any time during your turn (before, after, or during actions).' },
        action: { title: 'Action', floatRight: '1/turn', subtitle: 'You can also interact with one object or feature of the environment for free.' },
        bonus: { title: 'Bonus action', floatRight: 'max. 1/turn', subtitle: 'You can take a bonus action only when a special ability, spell, or feature states that you can do something as a bonus action.' },
        reaction: { title: 'Reaction', floatRight: 'max. 1/round', subtitle: 'A reaction is an instant response to a trigger of some kind, which can occur on your turn or on someone else\'s.' },
        condition: { title: 'Condition', subtitle: 'Conditions alter your capabilities in a variety of ways, and can arise as a result of a spell, a class feature, a monster\'s attack, or other effect.' },
        environment: {
            title: 'Environmental Effects',
            sub1: 'Effects that obscure vision can prove a significant hindrance to most adventuring tasks.',
            sub2: 'The presence or absence of light in an environment creates three categories of illumination.',
            sub3: 'Some creatures have extraordinary senses that allow them to perceive their environment.',
            sub4: 'Obstacles can provide cover during combat, making a target more difficult to harm.'
        },
        settings: { title: 'Settings', subtitle: 'You can change below toggles to adjust settings for this page.' },
        optional: { title: 'Include Optional Rules (*)', desc: 'Show/hide optional official rules.' },
        homebrew: { title: 'Include Homebrew Rules (**)', desc: 'Show/hide most common homebrew rules.' },
        darkmode: { title: 'Darkmode', desc: 'Enable/Disable Darkmode' },
        rules2024_on: { title: 'Switch to 2014 Rules', desc: 'Switches to the D&D 2014 (legacy) ruleset.' },
        rules2024_off: { title: 'Switch to 2024 Rules', desc: 'Switches to the D&D 2024 ruleset.' },
        activeRuleset_on: 'Current Ruleset: D&D 2024',
        activeRuleset_off: 'Current Ruleset: D&D 2014 (legacy)',
        feedback: { title: 'Leave Feedback', desc: 'Found an issue or have a suggestion? Let me know!' },
        cookie: { text: 'This website uses cookies to ensure you get the best experience on our website.', button: 'Accept' }
    },
    uk: {
        collapseAll: 'Згорнути',
        movement: { title: 'Рух', floatRight: 'обмежено швидкістю руху', subtitle: 'Ви можете рухатися в будь-який момент під час свого ходу (до, після або під час дій).' },
        action: { title: 'Дія', floatRight: '1/хід', subtitle: 'Ви також можете взаємодіяти з одним об\'єктом або елементом середовища безкоштовно.' },
        bonus: { title: 'Бонусна дія', floatRight: 'макс. 1/хід', subtitle: 'Ви можете виконати бонусну дію тільки коли особливість, заклинання або здатність дозволяє це.' },
        reaction: { title: 'Реакція', floatRight: 'макс. 1/раунд', subtitle: 'Реакція — миттєва відповідь на певний тригер, яка може статися у ваш хід або під час ходу іншого.' },
        condition: { title: 'Стан', subtitle: 'Стан впливає на ваші можливості по-різному і може виникнути через заклинання, особливість класу, атаку монстра або інший ефект.' },
        environment: {
            title: 'Ефекти навколишнього середовища',
            sub1: 'Ефекти, що затемнюють огляд, можуть суттєво ускладнити виконання завдань під час пригоди.',
            sub2: 'Присутність або відсутність світла у середовищі створює три категорії освітлення.',
            sub3: 'Деякі істоти мають надзвичайні почуття, що дозволяють їм сприймати навколишнє середовище.',
            sub4: 'Перешкоди можуть надавати укриття в бою, ускладнюючи нанесення шкоди цілі.'
        },
        settings: { title: 'Налаштування', subtitle: 'Ви можете змінити наведені нижче перемикачі, щоб налаштувати цю сторінку.' },
        optional: { title: 'Включити необов\'язкові правила (*)', desc: 'Показати/сховати необов\'язкові офіційні правила.' },
        homebrew: { title: 'Включити домашні правила (**)', desc: 'Показати/сховати найпоширеніші домашні правила.' },
        darkmode: { title: 'Темна тема', desc: 'Увімкнути/вимкнути темну тему' },
        rules2024_on: { title: 'Переключити на правила 2014', desc: 'Переключає на застарілий набір правил D&D 2014.' },
        rules2024_off: { title: 'Переключити на правила 2024', desc: 'Переключає на набір правил D&D 2024.' },
        activeRuleset_on: 'Поточний набір правил: D&D 2024',
        activeRuleset_off: 'Поточний набір правил: D&D 2014',
        feedback: { title: 'Залишити відгук', desc: 'Знайшли проблему або маєте пропозицію? Повідомте мене!' },
        cookie: { text: 'Цей вебсайт використовує файли cookie, щоб забезпечити кращий досвід користування.', button: 'Прийняти' }
    }
};

// Add OLED translations
UI_TRANSLATIONS.en.oled = { title: 'OLED True Black', desc: 'Enable deep black theme for OLED screens.' };
UI_TRANSLATIONS.uk.oled = { title: 'OLED: справжня чорна', desc: 'Увімкнути глибоку чорну тему для OLED-екранів.' };

// Apply translations to static UI elements
function applyTranslations(lang) {
    if (!lang) lang = document.documentElement.lang || 'en';
    var t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;

    // Collapse all buttons
    document.querySelectorAll('.collapse-all-btn').forEach(function(btn) {
        btn.textContent = t.collapseAll;
    });

    // Section titles and float-right labels
    var s = document.getElementById('section-movement');
    if (s) {
        var el = s.querySelector('.section-title-text');
        if (el) {
            // set text node for title without disturbing children
            for (var i = 0; i < el.childNodes.length; i++) {
                if (el.childNodes[i].nodeType === Node.TEXT_NODE) {
                    el.childNodes[i].nodeValue = t.movement.title + ' ';
                    break;
                }
            }
        }
        var fr = s.querySelector('.float-right'); if (fr) fr.textContent = t.movement.floatRight;
        var sub = s.querySelector('.section-content .section-row.section-subtitle'); if (sub) sub.textContent = t.movement.subtitle;
    }

    var s2 = document.getElementById('section-action');
    if (s2) {
        var el2 = s2.querySelector('.section-title-text');
        if (el2) for (var i = 0; i < el2.childNodes.length; i++) if (el2.childNodes[i].nodeType === Node.TEXT_NODE) { el2.childNodes[i].nodeValue = t.action.title + ' '; break; }
        var fr2 = s2.querySelector('.float-right'); if (fr2) fr2.textContent = t.action.floatRight;
        var sub2 = s2.querySelector('.section-content .section-row.section-subtitle'); if (sub2) sub2.textContent = t.action.subtitle;
    }

    var sb = document.getElementById('section-bonus-action');
    if (sb) {
        var elb = sb.querySelector('.section-title-text');
        if (elb) for (var i = 0; i < elb.childNodes.length; i++) if (elb.childNodes[i].nodeType === Node.TEXT_NODE) { elb.childNodes[i].nodeValue = t.bonus.title + ' '; break; }
        var frb = sb.querySelector('.float-right'); if (frb) frb.textContent = t.bonus.floatRight;
        var subb = sb.querySelector('.section-content .section-row.section-subtitle'); if (subb) subb.textContent = t.bonus.subtitle;
    }

    var sr = document.getElementById('section-reaction');
    if (sr) {
        var elr = sr.querySelector('.section-title-text');
        if (elr) for (var i = 0; i < elr.childNodes.length; i++) if (elr.childNodes[i].nodeType === Node.TEXT_NODE) { elr.childNodes[i].nodeValue = t.reaction.title + ' '; break; }
        var frr = sr.querySelector('.float-right'); if (frr) frr.textContent = t.reaction.floatRight;
        var subr = sr.querySelector('.section-content .section-row.section-subtitle'); if (subr) subr.textContent = t.reaction.subtitle;
    }

    var sc = document.getElementById('section-condition');
    if (sc) {
        var elc = sc.querySelector('.section-title-text');
        if (elc) for (var i = 0; i < elc.childNodes.length; i++) if (elc.childNodes[i].nodeType === Node.TEXT_NODE) { elc.childNodes[i].nodeValue = t.condition.title + ' '; break; }
        var subc = sc.querySelector('.section-content .section-row.section-subtitle'); if (subc) subc.textContent = t.condition.subtitle;
    }

    var se = document.getElementById('section-environment');
    if (se) {
        var ele = se.querySelector('.section-title-text');
        if (ele) for (var i = 0; i < ele.childNodes.length; i++) if (ele.childNodes[i].nodeType === Node.TEXT_NODE) { ele.childNodes[i].nodeValue = t.environment.title + ' '; break; }
        var subs = se.querySelectorAll('.section-content .section-row.section-subtitle');
        if (subs && subs.length >= 4) {
            subs[0].textContent = t.environment.sub1;
            subs[1].textContent = t.environment.sub2;
            subs[2].textContent = t.environment.sub3;
            subs[3].textContent = t.environment.sub4;
        }
    }

    // Settings labels
    var settingsTitle = document.querySelector('#section-settings .section-title-text');
    if (settingsTitle) for (var i = 0; i < settingsTitle.childNodes.length; i++) if (settingsTitle.childNodes[i].nodeType === Node.TEXT_NODE) { settingsTitle.childNodes[i].nodeValue = t.settings.title + ' '; break; }
    var settingsSub = document.querySelector('#section-settings .section-content .section-row.section-subtitle'); if (settingsSub) settingsSub.textContent = t.settings.subtitle;

    var opt = document.getElementById('optional-toggle-item'); if (opt) { var tt = opt.querySelector('.item-title'); var td = opt.querySelector('.item-desc'); if (tt) tt.textContent = t.optional.title; if (td) td.textContent = t.optional.desc; }
    var hb = document.getElementById('homebrew-toggle-item'); if (hb) { var ht = hb.querySelector('.item-title'); var hd = hb.querySelector('.item-desc'); if (ht) ht.textContent = t.homebrew.title; if (hd) hd.textContent = t.homebrew.desc; }
    var dm = document.getElementById('darkmode-toggle-item'); if (dm) { var dmt = dm.querySelector('.item-title'); var dmd = dm.querySelector('.item-desc'); if (dmt) dmt.textContent = t.darkmode.title; if (dmd) dmd.textContent = t.darkmode.desc; }

    var fb = document.getElementById('2024rules-toggle-item'); if (fb) { /* updateRulesToggleLabel will fill titles */ }

    var feedback = document.getElementById('feedback-link-item'); if (feedback) { var ft = feedback.querySelector('.item-title'); var fd = feedback.querySelector('.item-desc'); if (ft) ft.textContent = t.feedback.title; if (fd) fd.textContent = t.feedback.desc; }

    // Cookie notice
    var cookie = document.getElementById('cookie-notice'); if (cookie) { var p = cookie.querySelector('p'); var btn = cookie.querySelector('#accept-cookies'); if (p) p.textContent = t.cookie.text; if (btn) btn.textContent = t.cookie.button; }

        // OLED label
        var oledItem = document.getElementById('oled-toggle-item'); if (oledItem) { var ot = oledItem.querySelector('.item-title'); var od = oledItem.querySelector('.item-desc'); if (ot) ot.textContent = t.oled.title; if (od) od.textContent = t.oled.desc; }

}

// Create and append a quick reference item to a section
// Sets up modal open logic for the item
function add_quickref_item(parent, data, type) {
    var icon = data.icon || "perspective-dice-six-faces-one";
    var subtitle = data.subtitle || "";
    var title = data.title || "[no title]";
    var optional = data.optional || "Standard rule";
    var description = data.description || data.subtitle || "";
    var bullets = data.bullets || [];
    var reference = data.reference || "";

    var item = document.createElement("div");
    item.className = "item itemsize";

    var itemTextContainer = document.createElement("div");
    itemTextContainer.className = "item-text-container text";

    var itemTitle = document.createElement("div");
    itemTitle.className = "item-title";
    itemTitle.textContent = title;
    itemTextContainer.appendChild(itemTitle);

    var itemDesc = document.createElement("div");
    itemDesc.className = "item-desc";
    itemDesc.textContent = subtitle;
    itemTextContainer.appendChild(itemDesc);
    
    var itemHeader = document.createElement("div");
    itemHeader.className = "item-header";
    itemHeader.innerHTML = `
        <div class="item-icon iconsize icon-${icon}"></div>
    `;
    itemHeader.appendChild(itemTextContainer);
    itemHeader.innerHTML += '<span class="chevron"></span>';

    var bulletsHTML = bullets.map(function (bullet) {
        if (typeof bullet === 'object' && bullet.collapsible) {
            var contentHtml = bullet.content.map(p => `<p>${p}</p>`).join('');
            return `
                <div class="item-collapsible-container">
                    <div class="item-collapsible-title">
                        ${bullet.title}
                    </div>
                    <div class="item-collapsible-content">
                        ${contentHtml}
                    </div>
                </div>`;
        } else {
            return `<p>${bullet}</p>`;
        }
    }).join("\n<hr>\n");

    var itemContent = document.createElement("div");
    itemContent.className = "item-content collapsed";
    itemContent.innerHTML = `
        <p class="item-description">${description}</p>
        <div class="item-bullets">${bulletsHTML}</div>
        <div class="item-reference">${reference}</div>
    `;

    item.appendChild(itemHeader);
    item.appendChild(itemContent);

    // Start with content collapsed
    itemContent.classList.add('collapsed');

    itemHeader.addEventListener('click', () => {
        const chevron = itemHeader.querySelector('.chevron');
        const willBeCollapsed = !itemContent.classList.contains('collapsed');
        chevron.classList.toggle('collapsed');

        if (willBeCollapsed) { // Collapsing
            // Set max-height to current scrollHeight then to 0
            itemContent.style.maxHeight = itemContent.scrollHeight + 'px';
            // force reflow
            void itemContent.offsetHeight;
            itemContent.style.maxHeight = '0px';
            itemContent.style.opacity = '0';
            itemContent.classList.add('collapsed');
        } else { // Expanding
            // Set from 0 to full height then remove max-height
            itemContent.style.maxHeight = '0px';
            itemContent.classList.remove('collapsed');
            // force reflow
            void itemContent.offsetHeight;
            itemContent.style.maxHeight = itemContent.scrollHeight + 'px';
            itemContent.style.opacity = '1';
            // after transition ends, clear the inline max-height
            itemContent.addEventListener('transitionend', function te(ev) {
                if (ev.propertyName === 'max-height') {
                    itemContent.style.maxHeight = '';
                    itemContent.removeEventListener('transitionend', te);
                }
            });
        }
        // After toggling, update the "Collapse all" button state for the parent section
        updateCollapseAllButtonState(item.closest('.section-container'));
    });

    item.setAttribute("title", optional);
    parent.appendChild(item);
}

// Fill a section with quickref items from a data array
function fill_section(data, parentname, type) {
    var parent = document.getElementById(parentname);
    if (parent && data && data.length > 0) {
        parent.classList.add('items-grid-container');
    }
    data.forEach(function (item) {
        add_quickref_item(parent, item, type);
    });
}

// Initialize all quickref sections and apply initial filtering
function init() {
    fill_section(data_movement, "basic-movement", "Move");
    fill_section(data_action, "basic-actions", "Action");
    fill_section(data_bonusaction, "basic-bonus-actions", "Bonus action");
    fill_section(data_reaction, "basic-reactions", "Reaction");
    fill_section(data_condition, "basic-conditions", "Condition");
    fill_section(data_environment_obscurance, "environment-obscurance", "Environment");
    fill_section(data_environment_light, "environment-light", "Environment");
    fill_section(data_environment_vision, "environment-vision", "Environment");
    fill_section(data_environment_cover, "environment-cover", "Environment");

    // Apply initial filtering after items are created
    if (typeof window.handleRulesToggle === 'function') {
        window.handleRulesToggle();
    }
    // Set initial state for all "Collapse all" buttons
    document.querySelectorAll('.section-container').forEach(section => {
        updateCollapseAllButtonState(section);
    });
}

// Wait for all data scripts to be loaded before initializing and filtering
window.onload = function() {
    function waitForDataAndInit() {
        // Check if all required data variables are defined
        if (
            typeof data_movement !== 'undefined' &&
            typeof data_action !== 'undefined' &&
            typeof data_bonusaction !== 'undefined' &&
            typeof data_reaction !== 'undefined' &&
            typeof data_condition !== 'undefined' &&
            typeof data_environment_obscurance !== 'undefined' &&
            typeof data_environment_light !== 'undefined' &&
            typeof data_environment_vision !== 'undefined' &&
            typeof data_environment_cover !== 'undefined'
        ) {
            init();
        } else {
            // Try again in 50ms
            setTimeout(waitForDataAndInit, 50);
        }
    }
    waitForDataAndInit();
}

// Handle section collapse/expand
function initCollapsibleSections() {
    const sections = document.querySelectorAll('.section-container');
    sections.forEach(section => {
        // if (section.id === 'section-settings') return; // This line was preventing the settings section from being collapsible.

        const title = section.querySelector('.section-title');
        const content = section.querySelector('.section-content');
        const chevron = section.querySelector('.chevron');
        const collapseAllBtn = section.querySelector('.collapse-all-btn');
        updateCollapseAllButtonState(section); // Set initial state

        // Get saved state from localStorage, default to expanded
        const isCollapsed = localStorage.getItem(section.id + '-collapsed') === 'true';
        if (isCollapsed) {
            content.classList.add('collapsed');
            chevron.classList.add('collapsed');
        }

        // Helper to animate collapse/expand using max-height
        function animateContent(collapsed) {
            // Ensure we have an explicit maxHeight to animate from/to
            const fullHeight = content.scrollHeight + 'px';
            if (!collapsed) {
                // expanding: set from 0 to full height then remove max-height so it can grow naturally
                content.style.maxHeight = '0px';
                content.classList.remove('collapsed');
                // force reflow
                void content.offsetHeight;
                content.style.maxHeight = fullHeight;
                content.style.opacity = '1';
                // after transition ends, clear the inline max-height
                content.addEventListener('transitionend', function te(ev) {
                    if (ev.propertyName === 'max-height') {
                        content.style.maxHeight = '';
                        content.removeEventListener('transitionend', te);
                    }
                });
            } else {
                // collapsing: set max-height to current scrollHeight then to 0
                content.style.maxHeight = fullHeight;
                // force reflow
                void content.offsetHeight;
                content.style.maxHeight = '0px';
                content.style.opacity = '0';
                content.classList.add('collapsed');
            }
        }

        title.addEventListener('click', () => {
            const willBeCollapsed = !content.classList.contains('collapsed');
            // toggle chevron immediately for snappy UI
            chevron.classList.toggle('collapsed');
            animateContent(willBeCollapsed);
            // Save state to localStorage
            localStorage.setItem(section.id + '-collapsed', willBeCollapsed);
        });

        if (collapseAllBtn) {
            collapseAllBtn.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent section from collapsing/expanding
                const expandedItems = section.querySelectorAll('.item:not(:has(.item-content.collapsed)) .item-header');
                expandedItems.forEach(header => {
                    header.click();
                });
            });
        }
    });
}

// Checks a section for any expanded items and sets the disabled state of the "Collapse all" button.
function updateCollapseAllButtonState(section) {
    if (!section) return;
    const collapseAllBtn = section.querySelector('.collapse-all-btn');
    if (!collapseAllBtn) return;

    // Find items that are both visible (not filtered out) and expanded
    const expandedVisibleItems = section.querySelectorAll('.item:not(.item-hidden):not(:has(.item-content.collapsed))');

    if (expandedVisibleItems.length === 0) {
        collapseAllBtn.disabled = true;
    } else {
        collapseAllBtn.disabled = false;
    }
}

// DOMContentLoaded: Set up settings toggles, state, and filtering logic
// This block runs as soon as the DOM is ready
// Handles all settings toggles and their event listeners
// Also defines the filtering logic for quickref items

document.addEventListener("DOMContentLoaded", function () {
    // Trigger fade-in on page load
    document.body.classList.add('fade-in');

    // Initialize collapsible sections
    initCollapsibleSections();
    // Ensure document.lang is set from saved preference so translations apply correctly
    try {
        var savedLang = localStorage.getItem('appLanguage');
        if (!savedLang) {
            var nav = (navigator.language || navigator.userLanguage || 'en');
            savedLang = nav.toLowerCase().startsWith('uk') ? 'uk' : 'en';
        }
        document.documentElement.lang = savedLang;
        applyTranslations(savedLang);
    } catch (e) {
        try { applyTranslations(document.documentElement.lang || 'en'); } catch (e) {}
    }
    // Listen for dynamic language changes (fallback)
    document.addEventListener('languageChanged', function (ev) {
        try { applyTranslations(ev.detail && ev.detail.lang ? ev.detail.lang : document.documentElement.lang); } catch (e) {}
    });
    // Ensure default values for toggles in localStorage

    // Update settings section to show app version instead of "collapse all" button
    const versionDisplay = document.getElementById('app-version-display');
    if (versionDisplay && window.dndQuickRefAppVersion) {
        versionDisplay.textContent = 'v' + window.dndQuickRefAppVersion;
        // Make it look like a label rather than a disabled button
        versionDisplay.style.cursor = 'default';
        versionDisplay.style.pointerEvents = 'none';
    }
    if (localStorage.getItem('optional') === null) {
        localStorage.setItem('optional', 'false');
    }
    if (localStorage.getItem('homebrew') === null) {
        localStorage.setItem('homebrew', 'false');
    }

    // Get references to all settings checkboxes
    var optionalCheckbox = document.getElementById('optional-switch');
    var homebrewCheckbox = document.getElementById('homebrew-switch');
    var darkModeCheckbox = document.getElementById('darkmode-switch');
    var rules2024Checkbox = document.getElementById('rules2024-switch');

    // Set initial toggle state from localStorage
    var rules2024 = localStorage.getItem('rules2024') === 'true';
    rules2024Checkbox.checked = rules2024;

    // Update the label on load to indicate which ruleset the toggle will switch to
    function updateRulesToggleLabel() {
        var labelItem = document.getElementById('2024rules-toggle-item');
        if (!labelItem) return;
        var titleEl = labelItem.querySelector('.item-title');
        var descEl = labelItem.querySelector('.item-desc');

        var activeLabel = document.getElementById('active-ruleset-label');
        var lang = document.documentElement.lang || 'en';
        var t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;

        if (rules2024Checkbox.checked) {
            if (titleEl) titleEl.textContent = t.rules2024_on.title;
            if (descEl) descEl.textContent = t.rules2024_on.desc;
            if (activeLabel) activeLabel.textContent = t.activeRuleset_on;
        } else {
            if (titleEl) titleEl.textContent = t.rules2024_off.title;
            if (descEl) descEl.textContent = t.rules2024_off.desc;
            if (activeLabel) activeLabel.textContent = t.activeRuleset_off;
        }
    }
    updateRulesToggleLabel();

    var darkmode = localStorage.getItem('darkmode') === 'true';
    darkModeCheckbox.checked = darkmode;

    var oled = localStorage.getItem('oled') === 'true';
    var oledCheckbox = document.getElementById('oled-switch');
    if (oledCheckbox) oledCheckbox.checked = oled;

    var optional = localStorage.getItem('optional') === 'true';
    optionalCheckbox.checked = optional;

    var homebrew = localStorage.getItem('homebrew') === 'true';
    homebrewCheckbox.checked = homebrew;

    // Apply dark mode state on load
    handleDarkModeToggle();
    // Apply OLED mode on load
    try { handleOLEDToggle(); } catch (e) { /* ignore if handler not ready */ }

    // Filtering logic for quickref items based on toggles
    function handleRulesToggle() {
        var items = document.getElementsByClassName('item itemsize');
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var ruleType = item.getAttribute('title') || '';
            var low = ruleType.toLowerCase();
            // Normalize detection to support English and Ukrainian labels
            var isOptional = low.indexOf('optional') !== -1 || low.indexOf('необов') !== -1 || low.indexOf('optional rule') !== -1;
            var isHomebrew = low.indexOf('homebrew') !== -1 || low.indexOf('домаш') !== -1 || low.indexOf('homebrew rule') !== -1;
            var isStandard = low.indexOf('standard') !== -1 || low.indexOf('стандарт') !== -1;

            if (isOptional || isHomebrew || isStandard) {
                // Show item if:
                // - It's an optional rule and the optional toggle is ON
                // - It's a homebrew rule and the homebrew toggle is ON
                // - It's a standard rule (always show)
                if ((isOptional && optionalCheckbox.checked) ||
                    (isHomebrew && homebrewCheckbox.checked) ||
                    (isStandard && !isOptional && !isHomebrew)) {
                    item.classList.remove('item-hidden');
                    item.classList.remove('item-removed');
                } else {
                    item.classList.add('item-hidden');
                    setTimeout(() => {
                        if (item.classList.contains('item-hidden')) {
                            item.classList.add('item-removed');
                        }
                    }, 300);
                }
            } else {
                // Always show settings toggles and other non-rule items
                item.classList.remove('item-hidden');
                item.classList.remove('item-removed');
            }
        }
        // After filtering, update all "Collapse all" buttons as item visibility has changed
        document.querySelectorAll('.section-container').forEach(section => {
            updateCollapseAllButtonState(section);
        });
    }
    // Expose filtering function globally so init() can call it
    window.handleRulesToggle = handleRulesToggle;

    // Event listeners for toggles: update localStorage and re-filter on change
    optionalCheckbox.addEventListener('change', function() {
        localStorage.setItem('optional', optionalCheckbox.checked ? 'true' : 'false');
        // Reload page to ensure language-specific data files and UI fully refresh
        document.body.classList.remove('fade-in');
        document.body.classList.add('fade-out');
        setTimeout(function() { location.reload(); }, 650);
    });
    homebrewCheckbox.addEventListener('change', function() {
        localStorage.setItem('homebrew', homebrewCheckbox.checked ? 'true' : 'false');
        // Reload page to ensure changes apply consistently
        document.body.classList.remove('fade-in');
        document.body.classList.add('fade-out');
        setTimeout(function() { location.reload(); }, 650);
    });
    darkModeCheckbox.addEventListener('change', function() {
        localStorage.setItem('darkmode', darkModeCheckbox.checked ? 'true' : 'false');
        handleDarkModeToggle();
    });
    if (oledCheckbox) {
        oledCheckbox.addEventListener('change', function() {
            // Persist and apply OLED mode immediately
            localStorage.setItem('oled', oledCheckbox.checked ? 'true' : 'false');
            handleOLEDToggle();
        });
    }
    // When the rules toggle changes, update the label immediately then perform the switch (which reloads)
    rules2024Checkbox.addEventListener('change', function() {
        updateRulesToggleLabel();
        handle2024RulesToggle();
    });

    // Toggle dark mode classes on the page
    function handleDarkModeToggle() {
        const darkModeElements = document.querySelectorAll('.dark-mode, .page-background');
        darkModeElements.forEach(element => {
            if (darkModeCheckbox.checked) {
                element.classList.add('dark-mode-active');
            } else {
                element.classList.remove('dark-mode-active');
            }
        });
        localStorage.setItem('darkmode', darkModeCheckbox.checked ? 'true' : 'false');
    }

    // Handle OLED true-black mode
    function handleOLEDToggle() {
        const oledElements = document.querySelectorAll('.dark-mode, .page-background');
        const oledOn = (oledCheckbox && oledCheckbox.checked) || false;
        oledElements.forEach(element => {
            if (oledOn) {
                element.classList.add('oled-mode');
            } else {
                element.classList.remove('oled-mode');
            }
        });
        localStorage.setItem('oled', oledOn ? 'true' : 'false');
    }

    // Handle switching between 2024 and standard rules
    function handle2024RulesToggle() {
        localStorage.setItem('rules2024', rules2024Checkbox.checked ? 'true' : 'false');
        // Fade out the body, then reload the page
        document.body.classList.remove('fade-in');
        document.body.classList.add('fade-out');
        setTimeout(() => {
            location.reload();
        }, 650); // This should match the transition duration in quickref.css
    }

    // Set up click handlers for the settings toggle items (for better UX)
    var optionalToggleItem = document.getElementById('optional-toggle-item');
    var homebrewToggleItem = document.getElementById('homebrew-toggle-item');
    var darkModeToggleItem = document.getElementById('darkmode-toggle-item');
    var rules2024ToggleItem = document.getElementById('2024rules-toggle-item');

    function handleToggleClick(checkbox) {
        return function() {
            checkbox.checked = !checkbox.checked;
            checkbox.dispatchEvent(new Event('change'));
        };
    }

    optionalToggleItem.addEventListener('click', handleToggleClick(optionalCheckbox));
    homebrewToggleItem.addEventListener('click', handleToggleClick(homebrewCheckbox));
    darkModeToggleItem.addEventListener('click', handleToggleClick(darkModeCheckbox));
    rules2024ToggleItem.addEventListener('click', handleToggleClick(rules2024Checkbox));
    var oledToggleItem = document.getElementById('oled-toggle-item');
    if (oledToggleItem) oledToggleItem.addEventListener('click', handleToggleClick(oledCheckbox));
});

// === Smooth Fade + Grid Reflow ===
function hideItem(item) {
  if (item.classList.contains('item-hidden')) return;
  item.classList.add('item-hiding');
  setTimeout(() => {
    item.classList.remove('item-hiding');
    item.classList.add('item-hidden');
  }, 250);
}

function showItem(item) {
  if (!item.classList.contains('item-hidden')) return;
  item.classList.remove('item-hidden');
  item.classList.add('item-showing');
  setTimeout(() => {
    item.classList.remove('item-showing');
  }, 250);
}
// Replace toggle logic:
// if (shouldHide) hideItem(item); else showItem(item);
