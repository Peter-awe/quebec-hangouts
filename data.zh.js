/*
 * Québec Hangouts: Simplified Chinese text for the content in data.js.
 * Keyed by id. Arrays (tags, facts, sources) line up index by index with the English ones.
 * Every number, price, time and date must match data.js; update both files together.
 * Anything missing here falls back to English.
 */
window.QH_ZH = {
  categories: {
    nature: { label: '山水', note: '秋叶最佳观赏期预测：劳伦琴山区 10 月第 1 周 · 奥福德山和蒙特雷吉（Montérégie）第 3 周 · 蒙特利尔第 3–4 周' },
    eat: { label: '美食', note: '有时候出门就是为了吃一顿好的' },
    cepsum: { label: 'CEPSUM', note: '蒙特利尔大学体育中心，UdeM、Polytechnique 和 HEC 学生凭学生证免费 · 2100 boul. Édouard-Montpetit · 工作日 6:30–23:00，周末 8:30–20:30' },
    climb: { label: '攀岩', note: 'Peter 每周五晚上的固定节目，一起来。' },
    museums: { label: '博物馆', note: '哪天去都行，下雨天尤其合适' },
    events: { label: '节庆演出', note: '球赛、音乐会、灯光和集市' },
    snow: { label: '冰雪', note: '2026–27 雪季' }
  },

  activities: {
    'oka-apples': {
      name: '摘苹果 + 奥卡国家公园',
      local: 'Navette Nature 大巴一日游 · Parc national d’Oka',
      blurb: '坐大巴的一日游：上午在 Labonté de la pomme 果园摘苹果，下午去奥卡国家公园走 Calvaire 步道。每人带回一篮 3 升的苹果。',
      alt: '奥卡 Calvaire 步道上的小石头礼拜堂，周围是橙色的秋叶',
      tags: ['不用开车', '还剩 2 个日期'],
      facts: [
        ['价格', '学生（凭学生证）$47.50 · 成人 $52.25（含大巴、公园门票和苹果）'],
        ['行程', '8:30 从蒙特利尔长途汽车站（Berri-UQAM）出发，约 17:00 回来'],
        ['预订', '每人自己在 Navette Nature 订票。出发前 14 天取消可全额退款。'],
        ['注意', '9 月 20–27 日：世界自行车锦标赛期间，汽车站周边道路封闭，请预留更多时间。']
      ],
      notes: { '2026-09-19': '8:30 发车', '2026-09-27': '8:30 发车' },
      endedNote: '这一季没有更多行程了。',
      sources: ['Navette Nature · 奥卡摘苹果一日游 2026（价格、行程）', 'Navette Nature · 9 月日历', 'Orléans Express · 汽车站封路通知']
    },
    'tremblant-park': {
      name: '翠湖国家公园（Mont-Tremblant）',
      local: 'Navette Nature 大巴一日游 · Lac-Monroe 片区',
      blurb: '坐班车去劳伦琴山区的 Monroe 湖玩一整天。预计 9 月最后一周那里的树叶会变色一半。',
      alt: '森林覆盖的山丘倒映在平静的 Monroe 湖面上',
      tags: ['不用开车', '还剩 2 个日期'],
      facts: [
        ['价格', '学生（凭学生证）$61 · 成人 $66（含大巴和公园门票）'],
        ['行程', '8:00 从蒙特利尔长途汽车站（Berri-UQAM）出发，17:00 离开 Monroe 湖，约 19:15 回到蒙特利尔'],
        ['预订', '每人自己在 Navette Nature 订票。出发前 14 天取消可全额退款。'],
        ['注意', '9 月 20–27 日：世界自行车锦标赛期间，汽车站周边道路封闭，请预留更多时间。']
      ],
      notes: { '2026-09-19': '8:00 发车', '2026-09-27': '8:00 发车' },
      endedNote: '这一季没有更多行程了。',
      sources: ['Navette Nature · 翠湖一日游 2026（价格、行程）', 'Navette Nature · 9 月日历', 'Bonjour Québec · 2026 秋叶预测']
    },
    'orford-park': {
      name: '奥福德山国家公园（Mont-Orford）',
      local: 'Navette Nature 大巴一日游 · Lac-Stukely 片区',
      blurb: '坐班车去东部镇区（Eastern Townships）的 Stukely 湖玩一天。那里的秋叶来得晚，预计 10 月第三周最美。',
      alt: 'Stukely 湖，后面是一座圆顶的森林山',
      tags: ['不用开车', '还剩 1 个日期'],
      facts: [
        ['价格', '学生（凭学生证）$58.25 · 成人 $65.25（含大巴和公园门票）'],
        ['行程', '8:30 从蒙特利尔长途汽车站（Berri-UQAM）出发，约 18:30 回来'],
        ['预订', '每人自己在 Navette Nature 订票。出发前 14 天取消可全额退款。'],
        ['注意', '9 月 20–27 日：世界自行车锦标赛期间，汽车站周边道路封闭，请预留更多时间。']
      ],
      notes: { '2026-09-26': '8:30 发车' },
      endedNote: '这一季没有更多行程了。',
      sources: ['Navette Nature · 奥福德山一日游 2026（价格、行程）', 'Navette Nature · 9 月日历', 'Bonjour Québec · 2026 秋叶预测']
    },
    'mont-royal': {
      name: '皇家山公园',
      local: 'Parc du Mont-Royal · Mount Royal Park',
      blurb: '城市正中间的山：林间小路、观景台，还有海狸湖（Beaver Lake）。9 月的周末可以在湖边租划艇和草坪游戏。',
      alt: '皇家山上的海狸湖，秋天的树，多云的天空',
      tags: ['不用开车', '每天开放'],
      facts: [
        ['开放时间', '每天 6:00 到午夜'],
        ['费用', '官网没有列门票费；有 5 个收费停车场'],
        ['海狸湖', '周末出租划艇和户外游戏用品，中午到 18:00，到 9 月 28 日为止'],
        ['交通', '11 路公交车穿过公园 · 海狸湖馆：2000 chemin Remembrance'],
        ['注意', '10 月 4 日前，山脚下的 Avenue du Parc 因世界自行车锦标赛封闭（比赛日为 9 月 19–27 日）。']
      ],
      sources: ['蒙特利尔市政府 · 皇家山公园（开放时间、停车）', 'Les amis de la montagne · 划艇和户外游戏', 'STM · 皇家山公园（11 路公交）', '蒙特利尔市政府 · UCI 锦标赛封路信息']
    },
    'jean-drapeau': {
      name: '让-德拉波公园（Parc Jean-Drapeau）',
      local: '圣海伦岛（Île Sainte-Hélène）和圣母岛（Île Notre-Dame）',
      blurb: '圣劳伦斯河上的两座岛，坐黄线地铁就到：看河景、散步，还有建在 Expo 67 世博会旧球形馆里的环境博物馆 Biosphère。',
      alt: '绿树后面 Biosphère 的网格球顶',
      tags: ['不用开车', '每天开放'],
      facts: [
        ['开放时间', '圣海伦岛 6:00 到午夜 · 圣母岛 6:00 到 23:00，每天开放'],
        ['Biosphère', '博物馆单独买票：18 岁以上学生 $19，成人 $25.50（2026 年）'],
        ['交通', [{ metro: 'yellow', station: 'Jean-Drapeau' }, ' · A 区票价']]
      ],
      sources: ['让-德拉波公园 · 常见问题（开放时间）', '让-德拉波公园 · 怎么去', 'Espace pour la vie · 2026 门票价格']
    },
    'gault': {
      name: '圣伊莱尔山（Mont Saint-Hilaire）',
      local: 'Gault 自然保护区 · 麦吉尔大学',
      blurb: '麦吉尔大学在 Hertel 湖周围的自然保护区：25 公里林间步道，最高爬升约 280 米。预计蒙特雷吉地区的秋叶在 10 月第三周最美。',
      alt: '被森林山丘环绕的 Hertel 湖',
      tags: ['需预约时段', '每天开放'],
      facts: [
        ['价格', '成人一日票 $8.96 · 17 岁及以下免费 · 没有学生价'],
        ['预订', '只能网上预约固定的到达时段。迟到会被拒绝入园，所以大家要订同一个时段。'],
        ['步道', '每天开放，夏令时期间 8:00–18:00，冬季 8:00–16:00'],
        ['交通', '422 chemin des Moulins, Mont-Saint-Hilaire。官网列了 200 路公交、exo 361 预约巴士和火车；拼车最方便。']
      ],
      sources: ['Gault 自然保护区 · 户外活动（价格、开放时间、规定）', 'Gault 自然保护区 · 联系方式（地址、交通）', 'Bonjour Québec · 2026 秋叶预测']
    },
    'acropole': {
      name: 'L’Acropole des Draveurs 登顶步道',
      local: '马尔拜河高峡谷国家公园（Hautes-Gorges-de-la-Rivière-Malbaie）· 沙勒沃伊（Charlevoix）',
      blurb: '沙勒沃伊最有名的登顶路线：穿过森林爬到北极-高山植被的山顶，脚下远远是马尔拜河。难度高，从蒙特利尔出发要花一个周末。',
      alt: '从 L’Acropole des Draveurs 山顶俯瞰陡峭悬崖之间的马尔拜河谷',
      tags: ['难度高', '需要开车', '周末出行', '步道开放到 10 月 12 日'],
      facts: [
        ['路线', '往返 11.2 公里 · 爬升 800 米 · 4 到 6 小时'],
        ['开放季节', '通常从 6 月第二个周五开放到感恩节周一（2026 年 10 月 12 日），视步道状况而定'],
        ['出发时间', '9 月：日出到中午之间出发，15:30 前必须从山顶下撤。10 月 1 日到关闭：中午前出发，15:00 前下撤。护林员会在最后清场。'],
        ['要带', '登山鞋、每人至少 2 升水、登山杖、保暖衣物（山顶通常比山下冷 5–10 °C）'],
        ['交通', '步道起点在 Le Pin-Blanc 露营地（6 公里处）。公园离魁北克城 170 公里；夏季两个游客中心之间必须坐园区班车。'],
        ['门票', 'Sépaq 一日入园费，每位成人 $10.30']
      ],
      endedNote: '步道已在感恩节周一（10 月 12 日）之后关闭，通常要到 6 月第二个周五才重新开放。',
      sources: ['Sépaq · L’Acropole des Draveurs 重要信息（开放季节、出发和下撤时间）', 'Sépaq · 高峡谷公园徒步路线', 'Sépaq · 高峡谷公园交通和开放时间', 'Sépaq · 国家公园门票价格']
    },
    'sbl': {
      name: '劳伦琴生物站（SBL）',
      local: 'Station de biologie des Laurentides（蒙特利尔大学）',
      blurb: '蒙特利尔大学的野外研究站：16.4 平方公里的森林，大约十五个湖，在城北一小时车程。可以住一晚、在食堂吃饭、划独木舟。',
      alt: '平静的湖面，木码头和小船，四周是森林',
      tags: ['过夜', '需要开车', '开放到 11 月 1 日'],
      facts: [
        ['住一晚 + 餐', 'UdeM、Poly 和 HEC 学生 $52 · 其他学生 $88.55 · 其他人 $123.50（含午餐、晚餐和双人间的一个床位；另加税）'],
        ['一日游', '含午餐：UdeM、Poly 和 HEC 学生 $16 · 其他学生 $27.25 · 其他人 $38'],
        ['可以玩', '独木舟或划艇、徒步步道、篝火、沙滩排球、乒乓球、桌游'],
        ['交通', '592 chemin du lac Croche, Saint-Hippolyte。这条路上没有公交站，需要开车。'],
        ['预订', '打电话 450-563-3111（按 1）或发邮件到 sbl@iro.umontreal.ca。超过 20 人的团体必须发邮件预订。']
      ],
      endedNote: '11 月 1 日之后本季关闭。',
      sources: ['SBL · 规划你的行程', 'SBL · 2026 夏季价格，UdeM（PDF）', 'SBL · 2026 夏季价格，校外（PDF）', 'SBL · 休闲活动', 'SBL · 预订网站', 'SBL · 园区介绍']
    },

    'yokato': {
      name: 'Yokato Yokabai',
      local: '拉面 · 高原区（Plateau-Mont-Royal）',
      blurb: '高原区一家小店的博多风豚骨拉面，和居酒屋 Ichigo Ichie 共用店面。入选米其林指南，标签是“值得排队”。',
      board: { kicker: '米其林指南', sub: '豚骨 · 芝麻 · 素食' },
      tags: ['米其林指南', '不接受预约'],
      facts: [
        ['拉面', '豚骨（Tonkotsu，猪骨汤）、芝麻（Gomami，芝麻汤底），还有一款素食拉面'],
        ['价格', '米其林指南标为 $$'],
        ['营业时间', '周一至周三 11:30–14:30 和 17:00–22:00 · 周四到 22:30 · 周五到 23:00 · 周六 11:30–23:00 · 周日 11:30–22:00'],
        ['排队', '拉面这边不接受预约。店家建议 17:00–18:00 或 20:30–21:45 去，排队时间短一些。'],
        ['地址', ['4185 rue Drolet · ', { metro: 'orange', station: 'Mont-Royal' }]]
      ],
      sources: ['Yokato Yokabai · 官网（营业时间、菜单、预约）', '米其林指南 · Yokato Yokabai']
    },
    'affaire-ketchup': {
      name: 'L’Affaire est Ketchup',
      local: '法式小馆 · 魁北克城 Saint-Roch 区',
      blurb: 'Saint-Roch 区的一家迷你小馆，做“重新演绎的家常菜”（店家自己的说法），菜单经常换，写在黑板上。值得专门为它安排一天魁北克城之旅。',
      board: { kicker: '魁北克城', sub: '菜单写在黑板上' },
      tags: ['需提前订位', '魁北克城'],
      facts: [
        ['价格', '他们的 Facebook 页面标为 $$$'],
        ['订位', '页面上写着要提前订位（“Réserver d’avance!!!”）。电话 418-529-9020。'],
        ['营业时间', '网上没有公布。打电话时顺便确认哪天营业。'],
        ['地址', '46 rue Saint-Joseph Est, Québec（Saint-Roch 区）']
      ],
      sources: ['L’Affaire est Ketchup · Facebook 页面（地址、电话、价格、订位）', 'Frommer’s · L’Affaire est Ketchup（黑板菜单）']
    },

    'cepsum-skate': {
      name: '自由滑冰',
      local: 'CEPSUM 冰场',
      blurb: '伴着音乐的公众滑冰，冰上有工作人员看管。只能向前滑。',
      tags: ['UdeM · Poly · HEC 学生免费', '最多提前 2 天预约'],
      facts: [
        ['价格', 'UdeM、Poly 和 HEC 学生免费 · 非会员 16 岁以上 $7 · 15 岁以下 $4'],
        ['秋季时间', '周三 12:05–13:35 · 周五 16:15–17:45 · 周日 11:55–12:50（到 12 月 20 日）'],
        ['预约', '最多提前 2 天、从 19:00 开始预约：CEPSUM 网上系统、电话 514-343-6150 或前台'],
        ['季节', '自由滑冰从 9 月开到 4 月']
      ],
      endedNote: '秋季滑冰时间表已于 12 月 20 日结束，冬季时间请看 CEPSUM 官网。',
      sources: ['CEPSUM · 自由练习（滑冰：价格、时间、预约）']
    },
    'cepsum-badminton': {
      name: '羽毛球',
      local: 'CEPSUM 球场',
      blurb: '订好场地就能打。UdeM、Poly 和 HEC 学生是 CEPSUM 会员，订场包含在免费会籍里。',
      tags: ['UdeM · Poly · HEC 学生免费订场', '仅限会员预约'],
      facts: [
        ['谁能订', 'UdeM、Poly 和 HEC 学生自动成为会员。非会员不能订场；会员可以给朋友买一张 $20 的访客卡，但要先问前台是否包含订场。'],
        ['时间', 'CEPSUM 开放时间内每天都可以（有例外）'],
        ['预约', '最多提前 2 天、从 19:00 开始预约：CEPSUM 网上系统、电话 514-343-6150 或前台'],
        ['装备', 'CEPSUM 可以租器材']
      ],
      sources: ['CEPSUM · 自由练习（球拍类：时间、预约）', 'CEPSUM · 校园学生（免费会籍包含哪些）']
    },
    'cepsum-tennis': {
      name: '网球',
      local: 'CEPSUM 球场',
      blurb: '和羽毛球一样：学生会员订场包含在免费会籍里。想先学一学的话，有成人初级课。',
      tags: ['UdeM · Poly · HEC 学生免费订场', '仅限会员预约'],
      facts: [
        ['谁能订', 'UdeM、Poly 和 HEC 学生自动成为会员。非会员不能订场；会员可以给朋友买一张 $20 的访客卡，但要先问前台是否包含订场。'],
        ['时间', 'CEPSUM 开放时间内每天都可以（有例外）'],
        ['预约', '最多提前 2 天、从 19:00 开始预约：CEPSUM 网上系统、电话 514-343-6150 或前台'],
        ['课程', '成人 1 级，秋季班 9 月 14 日开课：13–14 节课，每节 1 小时 15 分，周一 17:30、周三 18:45 或周四 20:15 · 会员 $280–302']
      ],
      sources: ['CEPSUM · 自由练习（球拍类：时间、预约）', 'CEPSUM · 网球 1 级']
    },
    'cepsum-gym': {
      name: '健身房',
      local: 'CEPSUM 训练室',
      blurb: '器械和有氧训练室不包含在学生免费会籍里：要另外办健身卡，或者按次付费。可以看实时人流量，挑人少的时候去。',
      tags: ['需要办卡', '实时人流量'],
      facts: [
        ['学生卡', '4 个月 $110 + 税（一次付清），或 12 个月每月 $18.33 + 税'],
        ['单次', '会员 $12'],
        ['带朋友', '访客卡 $20（16 岁以上），含健身房使用和基础器材租借；5 张 $91'],
        ['开放时间', 'CEPSUM：工作日 6:30–23:00，周末 8:30–20:30'],
        ['人流量', [{ link: 'https://www.cepsum.umontreal.ca/achalandage-salle-d-entrainement', label: '实时人流量' }]]
      ],
      sources: ['CEPSUM · 校园学生（健身卡价格）', 'CEPSUM · 访客卡', 'CEPSUM · 实时人流量']
    },

    'blocshop-mileex': {
      name: 'Bloc Shop 周五攀岩',
      local: 'Bloc Shop Mile-Ex · 抱石',
      blurb: 'Peter 几乎每个周五晚上都在这里爬，因为周五全天只要 $10。这里是抱石：不用绳子，岩壁高 3 到 4.5 米，下面铺着厚垫子，不用预约。欢迎第一次来的新手。',
      tags: ['周五 $10', '无需预约', '欢迎新手'],
      facts: [
        ['周五', '全天 $10（“Vendredix”优惠，现场购买），平时 $19 · 价格不含税'],
        ['其他日子', '非高峰 $15（工作日 15:00 前、周末 15:00 后）· 7 天不限次 $26'],
        ['装备', '租鞋 $5 · 粉袋 $3 · 穿运动服（必须穿上衣）'],
        ['第一次来', '在网上或前台签免责声明；工作人员会用 2–3 分钟讲安全规则'],
        ['营业时间', '周一至周五 10:00–23:00 · 周六周日 9:00–21:00'],
        ['地址', '6595A rue Saint-Urbain, Mile-Ex']
      ],
      dayNotes: { 5: '晚上' },
      sources: ['Bloc Shop · 价格（Vendredix、单日票、租借、营业时间）', 'Bloc Shop · 第一次来', 'Bloc Shop · 场馆和地址']
    },

    'redpath': {
      name: '雷德帕斯博物馆（Redpath Museum）',
      local: '麦吉尔大学',
      blurb: '麦吉尔校园里一座维多利亚时代的自然历史博物馆，有魁北克最大的恐龙化石收藏（去跟蛇发女怪龙和三角龙打个招呼），还有加拿大第二大的古埃及文物收藏。',
      alt: '雷德帕斯博物馆华丽天花板下的蛇发女怪龙骨架',
      tags: ['自愿付费', '45–60 分钟'],
      facts: [
        ['价格', '自愿捐款；成人建议 $12'],
        ['开放时间', '周二至周五 9:00–16:30 · 周六 10:00–16:00 · 周日、周一和法定假日闭馆'],
        ['交通', ['859 Sherbrooke St. W · ', { metro: 'green', station: 'McGill' }, ' 或 ', { metro: 'green', station: 'Peel' }]],
        ['须知', '7 人及以上的团体必须提前预约并付团体费。没有电梯，没有空调，展厅内不能吃东西。']
      ],
      sources: ['Redpath · 参观（门票、开放时间）', 'Redpath · 常见问题（收藏、交通、规定）', '麦吉尔大学 · 重要日期（2026–27 法定假日）']
    },
    'mbam': {
      name: '蒙特利尔美术馆',
      local: 'Musée des beaux-arts de Montréal（MBAM）',
      blurb: 'Sherbrooke 街上的城市大型美术馆。25 岁及以下免费入场。',
      alt: '蓝天下蒙特利尔美术馆的新古典主义立面',
      tags: ['25 岁及以下免费'],
      facts: [
        ['价格', '25 岁及以下免费 · 26 岁及以上 $32'],
        ['免费日', '每月第一个周日，魁北克居民免费参观馆藏（需预约）'],
        ['开放时间', '周二 10–17 · 周三 10–21 · 周四至周日 10–17 · 周一闭馆'],
        ['交通', ['1380 Sherbrooke St. W · ', { metro: 'green', station: 'Peel' }, ' 或 ', { metro: 'green', station: 'Guy-Concordia' }]]
      ],
      sources: ['MBAM · 规划参观（开放时间、价格、每月第一个周日）']
    },
    'mccord': {
      name: '麦科德·斯图尔特博物馆',
      local: 'Musée McCord Stewart',
      blurb: '蒙特利尔的社会历史博物馆，就在 McGill 地铁站旁边。周三晚上免费。',
      alt: '麦科德·斯图尔特博物馆内部：高高的中庭，楼梯旁有一根雕刻图腾柱',
      tags: ['周三下午 5 点后免费', '学生价'],
      facts: [
        ['价格', '18–30 岁学生：网上 $15（现场加 $2，带学生证和全日制在读证明）· 成人网上 $20'],
        ['优惠时段', '周三 17:00 起免费（特展可能收 $10）· 每月第一个周日自愿付费'],
        ['开放时间', '周二 10–17 · 周三 10–21 · 周四至周日 10–17 · 周一闭馆（10 月 12 日周一开放）'],
        ['交通', [{ metro: 'green', station: 'McGill' }, ' · 24 路公交']]
      ],
      sources: ['McCord Stewart · 价格', 'McCord Stewart · 开放时间']
    },
    'pac': {
      name: '卡利埃尔角博物馆（Pointe-à-Callière）',
      local: '蒙特利尔考古与历史博物馆',
      blurb: '建在蒙特利尔发源地上的博物馆，在老城。看完正好去老港散步。',
      alt: '蒙特利尔老城卡利埃尔角博物馆的塔楼',
      tags: ['青年价'],
      facts: [
        ['价格', '18–30 岁：$20 · 31–64 岁：$30（需证件，含税）'],
        ['开放时间', '周二至周五 10–17 · 周六周日 11–17 · 闭馆前一小时停止售票'],
        ['交通', '350 place Royale，蒙特利尔老城']
      ],
      sources: ['Pointe-à-Callière · 开放时间和价格']
    },

    'gardens-of-light': {
      name: '灯光花园（Gardens of Light）',
      local: 'Jardins de lumière · 蒙特利尔植物园',
      blurb: '晚上在植物园的三个文化园区里看灯，最后走到中国园的梦湖。同一张门票白天也能游览整个植物园。',
      alt: '夜里中国园梦湖上发光的龙形花灯',
      tags: ['到 11 月 1 日', '分时段门票'],
      facts: [
        ['晚间开放', '9 月 3–17 日：19:30–21:00 · 9 月 18 日–10 月 3 日：19:00–21:00 · 10 月 4–20 日：18:30–21:00 · 10 月 21 日–11 月 1 日：18:00–21:00'],
        ['门票', '要预约分时段门票。2026 年 Espace pour la vie 单馆门票：18 岁以上学生 $19（蒙特利尔地区居民 $14.75），成人 $25.50'],
        ['须知', '风雨无阻'],
        ['交通', ['4101 Sherbrooke St. E · ', { metro: 'green', station: 'Pie-IX' }]]
      ],
      endedNote: '灯光花园已于 11 月 1 日结束。',
      sources: ['Espace pour la vie · 灯光花园（日期、时间、门票）', 'Espace pour la vie · 2026 门票价格', 'Espace pour la vie · 怎么去植物园']
    },
    'carabins': {
      name: 'Carabins 橄榄球赛',
      local: '蒙特利尔大学 · CEPSUM 体育场',
      blurb: '在蒙特利尔大学校园看加拿大大学橄榄球。开球前可以在 CEPSUM 露台参加车尾派对（tailgate）。',
      alt: '穿蓝黑球衣的大学橄榄球队员在争球线上',
      tags: ['还剩 4 场主场'],
      facts: [
        ['门票', '常规赛 $13.00–$34.25 · 10 月 16 日和 10 月 31 日 $16.50–$49.25（另加服务费和税）'],
        ['车尾派对', '开球前 3 小时起，在冰场附近的 CEPSUM 露台；有免费烧烤炉，食物自带；可以带罐装饮料，不能带玻璃瓶'],
        ['交通', ['2100 boul. Édouard-Montpetit · ', { metro: 'blue', station: 'Édouard-Montpetit' }, ' · 停车位非常少']]
      ],
      notes: { '2026-09-18': '对 Sherbrooke · 19:00', '2026-10-03': '对 Concordia · 13:00', '2026-10-16': '对 Laval · 19:00', '2026-10-31': '半决赛 · 14:00' },
      endedNote: '本季没有主场比赛了。',
      sources: ['Carabins · 橄榄球门票（赛程、价格）', 'Carabins · 球迷指南（车尾派对、交通）']
    },
    'udem-concerts': {
      name: '蒙特利尔大学免费音乐会',
      local: 'Faculté de musique · 蒙特利尔大学音乐学院',
      blurb: '音乐学院整个乐季都有免费的晚间音乐会：教授演出、当代音乐合奏团、爵士与世界音乐、甘美兰、合唱团。',
      alt: '冬天 Salle Claude-Champagne 弧形的现代主义外立面',
      tags: ['免费', '19:30'],
      facts: [
        ['价格', '免费'],
        ['地址', ['大多在 Salle Claude-Champagne，200 av. Vincent-d’Indy · ', { metro: 'blue', station: 'Édouard-Montpetit' }]],
        ['其他场地', '10 月 22 日和 1 月 14 日：Église Saint-Viateur d’Outremont · 10 月 23 日和 1 月 15 日：Salle Serge-Garant（B-484）']
      ],
      notes: {
        '2026-10-22': '教授演出', '2026-10-23': '教授演出', '2026-11-13': '当代音乐', '2026-11-20': '教授演出',
        '2026-12-01': '爵士与世界音乐', '2026-12-19': '甘美兰', '2026-12-20': '合唱团', '2027-01-14': '教授演出', '2027-01-15': '教授演出'
      },
      endedNote: '本季没有更多免费音乐会了。',
      sources: ['音乐学院 · 2026–2027 乐季']
    },
    'xmas-market': {
      name: '圣诞大集市',
      local: 'Grand Marché de Noël · 娱乐区（Quartier des spectacles）',
      blurb: 'Jeanne-Mance 街上的节日集市，整个季节有 150 多项免费活动。',
      alt: '人们在 Place des Arts 雪中的木头摊位之间走动',
      tags: ['11 月 13 日 – 1 月 3 日', '150 多项免费活动'],
      facts: [
        ['11 月 13 日–12 月 13 日', '周三至周五 15:00–22:00 · 周六 11:00–22:00 · 周日 11:00–20:00'],
        ['12 月 16 日–1 月 3 日', '每天 15:00–22:00 · 12 月 21–23 日 11:00 开始 · 12 月 24–25 日 11:00–19:00'],
        ['地址', 'Jeanne-Mance 街，娱乐区（Quartier des spectacles）']
      ],
      endedNote: '集市已于 1 月 3 日结束。',
      sources: ['Noël Montréal · 圣诞大集市（日期、时间）']
    },
    'mtl-en-lumiere': {
      name: '蒙特利尔灯光节（MONTRÉAL EN LUMIÈRE）',
      local: '冬季节庆',
      blurb: '蒙特利尔二月的大型节庆。2027 年的日期已经公布；开放时间、节目和价格还没公布。',
      alt: '夜里人们走在被蓝色和粉色节日灯光照亮的街上',
      tags: ['2027 年 2 月 18–28 日'],
      facts: [
        ['日期', '2027 年 2 月 18 日到 28 日'],
        ['待公布', '2027 年的开放时间、节目和价格']
      ],
      endedNote: '2027 年的节庆已经结束。',
      sources: ['MONTRÉAL EN LUMIÈRE · 官网']
    },

    'bromont-ski': {
      name: '布罗蒙滑雪一日游（Bromont）',
      local: 'Bromont, montagne d’expériences',
      blurb: '东部镇区的日场和夜场滑雪，学生票适用到 25 岁。',
      alt: '布罗蒙红屋顶房子上方积雪的滑雪山坡',
      tags: ['25 岁前学生价', '需要开车'],
      facts: [
        ['13–25 岁学生', 'Apex 卡每张票 $66（买 2–3 张）或 $61（买 4–8 张）· 售票处 $120'],
        ['成人', 'Apex 卡 $86 或 $80 · 售票处 $142'],
        ['雪季', 'Versant du Village 计划 12 月 4 日（周五）开放；日场和夜场，每周 7 天'],
        ['须知', '另加税。带年龄或学生身份证明。价格为 2026–27 雪季。']
      ],
      sources: ['Bromont · 2026–27 滑雪票', 'Bromont · 冬季详细时间表']
    },
    'tremblant-ski': {
      name: '翠湖滑雪一日游（Tremblant）',
      local: 'Mont-Tremblant · 劳伦琴山区',
      blurb: '劳伦琴山区的翠湖。没有学生价，但 10 月 15 日前买 2 到 7 天的票，每天更便宜。',
      alt: '山顶覆雪的云杉，远眺劳伦琴山区',
      tags: ['需要开车', '11 月 26 日开放'],
      facts: [
        ['18–69 岁成人', '1 天 $148 起 · 旺季 $164–$195 · 10 月 15 日前买 2–7 天票，每天 $104 起'],
        ['雪季', '2026 年 11 月 26 日到 2027 年 4 月 18 日（12 月 25 日和 1 月 1 日关闭）'],
        ['旺季', '12 月 27 日–1 月 2 日、2 月 13–19 日，以及 1 月、2 月、3 月的每个周五到周日'],
        ['须知', '另加特许费（royalty）和税。没有学生票种。']
      ],
      sources: ['Tremblant · 2026/27 冬季缆车票', 'Tremblant · 开放时间（雪季日期）']
    }
  },

  movieCountries: {
    'USA': '美国', 'UK': '英国', 'France': '法国', 'Canada': '加拿大', 'Japan': '日本', 'South Korea': '韩国',
    'Mainland China': '中国大陆', 'Hong Kong': '香港', 'Taiwan': '台湾', 'India': '印度', 'Spain': '西班牙',
    'Italy': '意大利', 'Germany': '德国', 'Other': '其他'
  },
  movieGenres: {
    'Comedy': '喜剧', 'Drama': '剧情', 'Romance': '爱情', 'Horror': '恐怖', 'Thriller': '惊悚', 'Sci-fi': '科幻',
    'Action': '动作', 'Animation': '动画', 'Documentary': '纪录片', 'Crime': '犯罪', 'Fantasy': '奇幻', 'Family': '家庭'
  },

  // Same order as DEALS in data.js.
  deals: [
    { name: '学生交通卡（STM）', what: 'A 区全交通方式月票 $66，原价 $110。', who: '魁北克认可学校的 6–64 岁全日制学生，要有带照片的 OPUS 卡（网上办 $15）。' },
    { name: 'Carte Accès Montréal（蒙特利尔市民卡）', what: '每年 $11，在市属场馆和合作商家享受折扣。', who: '住在蒙特利尔岛上的所有人。带照片的学生证可以当身份证明。' },
    { name: 'Espace pour la vie（自然博物馆群）', what: '生物穹顶（Biodôme）、植物园、昆虫馆、天文馆、Biosphère：18 岁以上学生 $19.00，住在蒙特利尔都会区的 $14.75（2026 年价格）。', who: '出示学生证。' },
    { name: '蒙特利尔美术馆', what: '25 岁及以下免费入场。每月第一个周日，魁北克居民免费参观馆藏。', who: '按年龄；每月第一个周日需要预约。' },
    { name: '麦科德·斯图尔特博物馆', what: '学生网上 $15；周三 17:00 起免费；每月第一个周日自愿付费。', who: '18–30 岁学生，带学生证和全日制在读证明。' },
    { name: '卡利埃尔角博物馆', what: '$20，原价 $30。', who: '18–30 岁，需证件。' },
    { name: '蒙特利尔交响乐团（OSM）', what: '2–5 区座位 $30，每场数量有限。', who: '35 岁及以下，需年龄证明。不适用于 POP、Jeux d’enfants 和慈善音乐会。' },
    { name: '蒙特利尔歌剧院', what: '门票 $34；3 部歌剧套票用优惠码 ODM1834 减 15%。', who: '18–34 岁，入场时查证件。' },
    { name: '蒙特利尔大芭蕾舞团（Les Grands Ballets）', what: '办 $15 的“Je me pointe!”会员后，门票减 30%（每场 2 张；《胡桃夹子》除外）。', who: '18–34 岁，需年龄证明。' },
    { name: '魁北克国家公园（Sépaq）', what: '成人每天 $10.30，或 $93 一年不限次进入所有魁北克国家公园。', who: '没有学生价。17 岁及以下免费。' },
    { name: '加拿大国家公园发现卡（Parks Canada Discovery Pass）', what: '成人 $83.50，有效期 2026 年 9 月到 2027 年 9 月，含税。', who: '没有学生价。17 岁及以下免费。' },
    { name: '免费法语课', what: '魁北克政府的非全日制法语课程免费。', who: '16 岁以上、住在魁北克。国际学生如果以就读认可的学习项目为主要身份，也符合条件。' }
  ]
};
