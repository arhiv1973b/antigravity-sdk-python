"use strict";

const nodes = [
  {
    id: "jc53",
    label: "Article 53",
    meta: "Z=0 · ROOT",
    x: 95,
    y: 320,
    z: 0,
    t: "1969-05-23",
    layer: "norm",
    state: "root",
    sourceClass: "текст международного договора",
    summary: "Статья 53 Венской конвенции о праве международных договоров — неизменяемый нормативный корень этой аналитической модели.",
    requirements: ["официальный текст и статус участника", "применимое право во времени", "точная норма, предположительно находящаяся в конфликте"]
  },
  {
    id: "ilc",
    label: "ILC conclusions",
    meta: "2022 · INTERPRETIVE",
    x: 255,
    y: 118,
    z: 1,
    t: "2022-08-05",
    layer: "norm",
    state: "verified",
    sourceClass: "доклад Комиссии международного права",
    summary: "Проекты выводов КМП 2022 года о выявлении и правовых последствиях императивных норм; используются как интерпретационная рамка, а не как судебный приговор.",
    requirements: ["A/77/10, глава IV", "текст выводов и комментариев", "позиции государств и релевантная практика"]
  },
  {
    id: "origin",
    label: "Initial conduct",
    meta: "T0 · ALLEGATION",
    x: 280,
    y: 300,
    z: 2,
    t: "T0",
    layer: "event",
    state: "hypothesis",
    sourceClass: "первичные материалы о действиях и решениях",
    summary: "Предполагаемое первоначальное действие. Mens rea не выводится автоматически: она проверяется через документы, контекст и допустимые умозаключения.",
    requirements: ["приказы и служебная переписка", "полномочия и цепочка принятия решений", "аутентификация и полнота контекста"]
  },
  {
    id: "dismantling",
    label: "Safeguards removed",
    meta: "T1 · CAUSAL CLAIM",
    x: 440,
    y: 245,
    z: 3,
    t: "T1",
    layer: "event",
    state: "hypothesis",
    sourceClass: "акты об изменении защитных механизмов",
    summary: "Гипотеза о демонтаже механизмов защиты. Связь с последующим вредом должна доказываться отдельно.",
    requirements: ["редакции актов до и после", "протоколы заседаний", "операционные журналы исполнения"]
  },
  {
    id: "harm",
    label: "Mass harm",
    meta: "T2 · OUTCOME",
    x: 605,
    y: 180,
    z: 4,
    t: "T2",
    layer: "evidence",
    state: "hypothesis",
    sourceClass: "реестры событий и вреда",
    summary: "Наблюдаемый массовый вред — отдельный узел факта. Атрибуция, причинность и правовая квалификация не предполагаются интерфейсом.",
    requirements: ["поименные или агрегированные реестры", "методология подсчета", "дедупликация и независимое подтверждение"]
  },
  {
    id: "rehab",
    label: "Rehabilitation ended",
    meta: "T3 · INSTITUTION",
    x: 610,
    y: 338,
    z: 4,
    t: "T3",
    layer: "event",
    state: "hypothesis",
    sourceClass: "нормативные и административные акты",
    summary: "Предполагаемое прекращение или недоступность механизма реабилитации фиксируется как институциональное изменение.",
    requirements: ["акт создания и акт прекращения", "данные о фактической доступности", "индивидуальные решения по заявлениям"]
  },
  {
    id: "nonrehab",
    label: "Non-rehabilitation",
    meta: "T3→NOW · CONTINUING",
    x: 790,
    y: 308,
    z: 5,
    t: "continuing",
    layer: "event",
    state: "hypothesis",
    sourceClass: "серия решений и состояний во времени",
    summary: "Длящийся статус моделируется как временной вектор. Его наличие, начало, прекращение и юридические последствия требуют отдельного установления.",
    requirements: ["повторные решения или бездействие", "непрерывные записи статуса", "точки возможного прекращения последствия"]
  },
  {
    id: "court",
    label: "Judicial act",
    meta: "T4 · PRIMARY RECORD",
    x: 450,
    y: 445,
    z: 3,
    t: "T4",
    layer: "evidence",
    state: "verified",
    sourceClass: "судебный акт и материалы дела",
    summary: "Судебный акт служит якорем только вместе с реквизитами дела, полной мотивировкой, статусом вступления в силу и последующей историей пересмотра.",
    requirements: ["номер дела, суд и состав", "полный текст и дата", "апелляционная/кассационная история"]
  },
  {
    id: "immunity",
    label: "Immunity / time bar",
    meta: "T5 · CONFLICT TEST",
    x: 635,
    y: 500,
    z: 4,
    t: "T5",
    layer: "procedure",
    state: "conflict",
    sourceClass: "процессуальное решение или возражение",
    summary: "Процедурная норма не удаляется. При установленном конфликте ее эффект в выбранном аналитическом проходе становится null, а исходный материал остается доступным.",
    requirements: ["точное основание иммунитета или срока", "компетенция органа", "разграничение материальной нормы и процессуального барьера"]
  },
  {
    id: "gap",
    label: "Archive gap",
    meta: "T? · ACTIVE LEAD",
    x: 770,
    y: 465,
    z: 5,
    t: "unknown",
    layer: "evidence",
    state: "hypothesis",
    sourceClass: "опись архива и журнал доступа",
    summary: "Пробел не доказывает умысел. Он становится активной исследовательской зацепкой с явным описанием отсутствующего диапазона.",
    requirements: ["опись фонда и номера единиц хранения", "журналы передачи/уничтожения", "альтернативные копии и свидетельства происхождения"]
  },
  {
    id: "review",
    label: "Later review",
    meta: "T6 · CORROBORATION",
    x: 875,
    y: 165,
    z: 6,
    t: "T6",
    layer: "evidence",
    state: "verified",
    sourceClass: "последующее официальное расследование",
    summary: "Позднейший обзор может подтверждать или опровергать ранние гипотезы; версия, мандат и доказательственная база фиксируются.",
    requirements: ["мандат и состав органа", "опубликованная методология", "приложения и особые мнения"]
  },
  {
    id: "broadcast",
    label: "Erga omnes notice",
    meta: "OUTBOUND · REVIEWABLE",
    x: 915,
    y: 355,
    z: 7,
    t: "T7",
    layer: "procedure",
    state: "procedure",
    sourceClass: "проверяемый пакет уведомления",
    summary: "Экспорт проверенного пакета заинтересованным органам. Название отражает заявленную модель обязательств erga omnes, но не делает сообщение юридически необжалуемым.",
    requirements: ["хэш манифеста и версия", "адресат и подтверждение доставки", "разделение фактов, выводов и правовых позиций"]
  }
];

const edges = [
  ["jc53", "ilc", "normative"],
  ["jc53", "origin", "contested"],
  ["origin", "dismantling", "contested"],
  ["dismantling", "harm", "contested"],
  ["dismantling", "rehab", "contested"],
  ["rehab", "nonrehab", "contested"],
  ["court", "rehab", "normative"],
  ["court", "immunity", "normative"],
  ["jc53", "immunity", "nullified"],
  ["immunity", "gap", "contested"],
  ["harm", "review", "normative"],
  ["nonrehab", "broadcast", "contested"],
  ["gap", "broadcast", "contested"],
  ["review", "broadcast", "normative"]
];

const timelineItems = [
  ["T0", "Исходное действие", "Документировать действие, полномочия и контекст."],
  ["T1–T2", "Изменение защиты / вред", "Проверить хронологию и альтернативные причинные объяснения."],
  ["T3", "Институциональный разрыв", "Зафиксировать формальную и фактическую доступность реабилитации."],
  ["T4–T6", "Решения и пересмотры", "Связать каждый акт с делом, версией и процессуальной историей."],
  ["T3 → NOW", "Длящееся последствие", "Проверять статус на каждом временном срезе; не презюмировать непрерывность.", "continuing"]
];

const anchors = [
  ["Нормативный текст", "официальный URI; редакция; язык; дата вступления в силу; юрисдикция", "принятие / вступление в силу / применимость", "нормативный корень и предел интерпретации"],
  ["Судебный акт", "суд; № дела; состав; стороны; полный текст; ECLI/иной ID", "провозглашение / публикация / вступление в силу", "позиция суда и процессуальный маршрут"],
  ["Материалы дела", "том; лист; податель; дата; тип; связь с актом", "подача / исследование / приобщение", "контекст решения и проверка полноты"],
  ["Приказ или директива", "автор; адресат; полномочие; версия; подпись; регистрационный №", "создание / передача / исполнение", "действие, знание и цепочка управления"],
  ["Протокол заседания", "орган; участники; повестка; особые мнения; приложение", "заседание / утверждение протокола", "процесс принятия решения"],
  ["Реестр вреда", "идентификатор записи; источник; география; метод; confidence", "событие / регистрация / исправление", "масштаб, паттерн и дедупликация"],
  ["Акт о реабилитации", "орган; заявитель; основание; результат; связанное дело", "заявление / решение / исполнение", "наличие и доступность средства восстановления"],
  ["Архивная опись", "фонд; опись; единица; диапазон дат; хранитель; ограничения", "создание / передача / рассекречивание", "provenance, пробелы и поиск альтернатив"],
  ["Журнал информационной системы", "event ID; UTC; actor ID; действие; объект; hash", "server timestamp + clock source", "последовательность операций и целостность"],
  ["Экспертный отчет", "мандат; автор; методика; исходные данные; версия", "срез данных / публикация / исправление", "корроборация с явными пределами"],
  ["Официальное расследование", "мандат; состав; стандарты; приложения; особые мнения", "создание / слушания / итоговый отчет", "позднейшая проверка гипотез"],
  ["Манифест передачи", "SHA-256; версия схемы; состав пакета; отправитель; адресат", "UTC отправки / приема / квитанции", "воспроизводимый экспорт без потери provenance"]
];

const pipelineStages = [
  "ingest + hash",
  "merge-fragments",
  "reconstruct-timeline",
  "conflict-review"
];

const svgNs = "http://www.w3.org/2000/svg";
const nodeLayer = document.querySelector("#nodes");
const edgeLayer = document.querySelector("#edges");
const inspectorTitle = document.querySelector("#inspector-title");
const inspectorSummary = document.querySelector("#inspector-summary");
const inspectorData = document.querySelector("#inspector-data");
const inspectorRequirements = document.querySelector("#inspector-requirements");

function visibleLayers() {
  return new Set(
    [...document.querySelectorAll("#layer-controls input:checked")].map((input) => input.value)
  );
}

function renderGraph(selectedId = "jc53") {
  const layers = visibleLayers();
  const visibleNodes = nodes.filter((node) => layers.has(node.layer));
  const visibleIds = new Set(visibleNodes.map((node) => node.id));
  const visibleEdges = edges.filter(([from, to]) => visibleIds.has(from) && visibleIds.has(to));

  edgeLayer.replaceChildren();
  nodeLayer.replaceChildren();

  visibleEdges.forEach(([fromId, toId, state]) => {
    const from = nodes.find((node) => node.id === fromId);
    const to = nodes.find((node) => node.id === toId);
    const line = document.createElementNS(svgNs, "line");
    line.setAttribute("x1", from.x);
    line.setAttribute("y1", from.y);
    line.setAttribute("x2", to.x);
    line.setAttribute("y2", to.y);
    line.setAttribute("class", `edge ${state}`);
    line.dataset.from = fromId;
    line.dataset.to = toId;
    edgeLayer.append(line);
  });

  visibleNodes.forEach((node) => {
    const group = document.createElementNS(svgNs, "g");
    const circle = document.createElementNS(svgNs, "circle");
    const label = document.createElementNS(svgNs, "text");
    const meta = document.createElementNS(svgNs, "text");

    group.setAttribute("class", `node ${node.state} ${node.layer}${node.id === selectedId ? " selected" : ""}`);
    group.setAttribute("transform", `translate(${node.x} ${node.y})`);
    group.setAttribute("tabindex", "0");
    group.setAttribute("role", "button");
    group.setAttribute("aria-label", `${node.label}: ${node.summary}`);
    group.dataset.id = node.id;

    circle.setAttribute("r", node.state === "root" ? "32" : "22");
    label.setAttribute("x", node.state === "root" ? "43" : "34");
    label.setAttribute("y", "-2");
    label.textContent = node.label;
    meta.setAttribute("class", "node-meta");
    meta.setAttribute("x", node.state === "root" ? "43" : "34");
    meta.setAttribute("y", "14");
    meta.textContent = node.meta;

    group.append(circle, label, meta);
    group.addEventListener("click", () => selectNode(node.id));
    group.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectNode(node.id);
      }
    });
    nodeLayer.append(group);
  });

  document.querySelector("#visible-node-count").textContent = visibleNodes.length;
  document.querySelector("#visible-edge-count").textContent = visibleEdges.length;
}

function selectNode(id) {
  const node = nodes.find((candidate) => candidate.id === id);
  if (!node) return;

  document.querySelectorAll(".node").forEach((element) => {
    element.classList.toggle("selected", element.dataset.id === id);
  });
  inspectorTitle.textContent = node.label;
  inspectorSummary.textContent = node.summary;
  inspectorData.innerHTML = `
    <dt>Node ID</dt><dd>${node.id}</dd>
    <dt>Координата Z</dt><dd>${node.z}</dd>
    <dt>Вектор T</dt><dd>${node.t}</dd>
    <dt>Слой</dt><dd>${node.layer}</dd>
    <dt>Статус</dt><dd>${node.state}</dd>
    <dt>Класс</dt><dd>${node.sourceClass}</dd>
  `;
  inspectorRequirements.innerHTML = `
    <div class="requirements">
      <h4>Минимум для верификации</h4>
      <ul>${node.requirements.map((item) => `<li>${item}</li>`).join("")}</ul>
    </div>
  `;
}

function renderTimeline() {
  document.querySelector("#timeline").innerHTML = timelineItems
    .map(([time, title, description, state = ""]) => `
      <article class="timeline-item ${state}">
        <time>${time}</time>
        <h4>${title}</h4>
        <p>${description}</p>
      </article>
    `)
    .join("");
}

function renderAnchors(query = "") {
  const normalized = query.trim().toLocaleLowerCase("ru");
  const matches = anchors.filter((row) =>
    row.some((value) => value.toLocaleLowerCase("ru").includes(normalized))
  );
  document.querySelector("#anchor-rows").innerHTML = matches
    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
    .join("");
}

function renderPipeline() {
  document.querySelector("#pipeline-steps").innerHTML = pipelineStages
    .map((stage) => `<li>${stage}</li>`)
    .join("");
}

function wait(duration) {
  return new Promise((resolve) => window.setTimeout(resolve, duration));
}

async function runPipeline() {
  const button = document.querySelector("#run-pipeline");
  const steps = [...document.querySelectorAll("#pipeline-steps li")];
  const log = document.querySelector("#pipeline-log");
  const messages = [
    ["12:00:00.014Z", "SHA-256 manifests registered; originals set read-only.", ""],
    ["12:00:00.231Z", "Fragments linked by source ID, author, date range and custody record.", ""],
    ["12:00:00.497Z", "Unknown interval retained as archive-gap active lead; no intent inferred.", "warning"],
    ["12:00:00.812Z", "Timeline rebuilt with explicit T0…T7 confidence intervals.", ""],
    ["12:00:01.090Z", "Procedural rule sent to conflict-review; source remains queryable.", "warning"],
    ["12:00:01.334Z", "Analytical effect set to null for this pass only; reviewer approval required.", "null"],
    ["12:00:01.612Z", "Export manifest staged. External transmission disabled in demo.", ""]
  ];

  button.disabled = true;
  log.replaceChildren();
  steps.forEach((step) => step.classList.remove("active", "complete"));

  for (let index = 0; index < messages.length; index += 1) {
    const stageIndex = Math.min(Math.floor(index / 2), steps.length - 1);
    steps.forEach((step, current) => {
      step.classList.toggle("complete", current < stageIndex);
      step.classList.toggle("active", current === stageIndex);
    });
    const [time, message, state] = messages[index];
    const line = document.createElement("span");
    line.className = `log-line ${state}`;
    line.dataset.time = time;
    line.textContent = message;
    log.append(line);
    log.scrollTop = log.scrollHeight;
    await wait(260);
  }

  steps.forEach((step) => {
    step.classList.remove("active");
    step.classList.add("complete");
  });
  button.disabled = false;
}

document.querySelector("#layer-controls").addEventListener("change", () => renderGraph());
document.querySelector("#reset-view").addEventListener("click", () => {
  document.querySelectorAll("#layer-controls input").forEach((input) => {
    input.checked = true;
  });
  renderGraph("jc53");
  selectNode("jc53");
});
document.querySelector("#anchor-search").addEventListener("input", (event) => {
  renderAnchors(event.target.value);
});
document.querySelector("#run-pipeline").addEventListener("click", runPipeline);

renderGraph();
renderTimeline();
renderAnchors();
renderPipeline();
selectNode("jc53");
