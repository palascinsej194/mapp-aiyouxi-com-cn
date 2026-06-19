// public/site-helper.js
(function () {
  'use strict';

  const SITE_URL = 'https://mapp-aiyouxi.com.cn';
  const KEYWORDS = ['爱游戏', '互动娱乐', '游戏社区', '攻略分享', '玩家天地'];

  // 核心配置
  const config = {
    version: '1.0.2',
    domain: SITE_URL,
    keywords: KEYWORDS,
    tips: {
      welcome: '欢迎来到爱游戏平台！',
      guide: '浏览以下卡片可快速了解站点功能。',
      badgeHint: '关键词徽章代表热门话题，点击可探索更多内容。'
    }
  };

  // --- 提示卡片生成 ---
  function createTipCard(title, content, icon) {
    const card = document.createElement('div');
    card.className = 'site-helper-card';
    card.style.cssText = `
      background: #f0f4ff;
      border-left: 4px solid #3b82f6;
      border-radius: 8px;
      padding: 14px 18px;
      margin: 12px 0;
      font-size: 15px;
      line-height: 1.6;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    `;

    const titleEl = document.createElement('strong');
    titleEl.textContent = icon ? `${icon} ${title}` : title;
    titleEl.style.display = 'block';
    titleEl.style.marginBottom = '6px';

    const contentEl = document.createElement('p');
    contentEl.textContent = content;
    contentEl.style.margin = '0';

    card.appendChild(titleEl);
    card.appendChild(contentEl);
    return card;
  }

  function buildTipSection() {
    const container = document.createElement('div');
    container.id = 'site-helper-tips';
    container.style.maxWidth = '640px';
    container.style.margin = '20px auto';

    const cards = [
      { title: '站点说明', content: config.tips.welcome + ' ' + config.tips.guide, icon: '🔍' },
      { title: '访问提示', content: `当前域：${config.domain}，所有资源安全可靠。`, icon: '🛡️' },
      { title: '使用建议', content: config.tips.badgeHint, icon: '💡' }
    ];

    cards.forEach(c => {
      container.appendChild(createTipCard(c.title, c.content, c.icon));
    });

    return container;
  }

  // --- 关键词徽章生成 ---
  function createBadge(text, link) {
    const badge = document.createElement('span');
    badge.className = 'site-helper-badge';
    badge.textContent = `#${text}`;
    badge.style.cssText = `
      display: inline-block;
      background: #e2e8f0;
      color: #1e293b;
      border-radius: 20px;
      padding: 4px 14px;
      margin: 4px 8px 4px 0;
      font-size: 13px;
      font-weight: 500;
      cursor: default;
      transition: background 0.2s;
    `;

    if (link) {
      badge.style.cursor = 'pointer';
      badge.addEventListener('click', function () {
        window.open(link, '_blank');
      });
      badge.title = `前往 ${link}`;
    }

    badge.addEventListener('mouseenter', function () {
      this.style.background = '#cbd5e1';
    });
    badge.addEventListener('mouseleave', function () {
      this.style.background = '#e2e8f0';
    });

    return badge;
  }

  function buildBadgeSection() {
    const wrapper = document.createElement('div');
    wrapper.id = 'site-helper-badges';
    wrapper.style.margin = '20px auto';
    wrapper.style.maxWidth = '640px';
    wrapper.style.textAlign = 'center';

    const label = document.createElement('p');
    label.textContent = '🏷️ 热门关键词';
    label.style.marginBottom = '10px';
    label.style.fontWeight = '600';

    wrapper.appendChild(label);

    const badgeContainer = document.createElement('div');
    config.keywords.forEach(kw => {
      const badge = createBadge(kw, null);
      badgeContainer.appendChild(badge);
    });

    // 额外加一个带链接的徽章
    const linkBadge = createBadge('爱游戏官方', SITE_URL);
    badgeContainer.appendChild(linkBadge);

    wrapper.appendChild(badgeContainer);
    return wrapper;
  }

  // --- 访问说明 ---
  function buildAccessNotice() {
    const notice = document.createElement('div');
    notice.id = 'site-helper-notice';
    notice.style.cssText = `
      background: #fef9c3;
      border: 1px solid #facc15;
      border-radius: 8px;
      padding: 12px 18px;
      margin: 20px auto;
      max-width: 640px;
      font-size: 14px;
      color: #713f12;
    `;
    notice.innerHTML = `
      <strong>📌 访问说明</strong><br>
      本站为 <a href="${SITE_URL}" target="_blank" style="color:#2563eb;">${SITE_URL}</a> 的辅助脚本。
      所有交互均在浏览器本地完成，不收集个人信息。
      如遇显示异常，请尝试刷新页面或清理缓存。
    `;
    return notice;
  }

  // --- 初始化入口 ---
  function init() {
    // 避免重复插入
    if (document.getElementById('site-helper-root')) return;

    const root = document.createElement('div');
    root.id = 'site-helper-root';
    root.style.cssText = `
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
      color: #1e293b;
      padding: 10px 16px;
    `;

    root.appendChild(buildAccessNotice());
    root.appendChild(buildTipSection());
    root.appendChild(buildBadgeSection());

    // 挂在页面主体
    const target = document.querySelector('main') || document.querySelector('body') || document.documentElement;
    target.appendChild(root);
    console.log('[site-helper] 已加载，版本 ' + config.version);
  }

  // 等待 DOM 准备好
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();