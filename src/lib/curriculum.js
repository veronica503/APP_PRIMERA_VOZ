// Plan de estudios de "Mi Primera Voz"
// Alineado a los Programas de Desarrollo y Aprendizaje del MINED de El Salvador
// y a la Ciencia de la Lectura (Etapas Emergente e Inicial).

export const AREAS = {
  lectura: {
    key: "lectura",
    title: "LECTURA",
    emoji: "📖",
    color: "#10B981",
    soft: "rgba(16, 185, 129, 0.12)",
    action: "Continuar",
    description: "Sonidos, vocales, sílabas, palabras y comprensión de cuentos.",
  },
  escritura: {
    key: "escritura",
    title: "ESCRITURA",
    emoji: "✏️",
    color: "#F59E0B",
    soft: "rgba(245, 158, 11, 0.12)",
    action: "Trazar",
    description: "Motricidad fina, trazos, letras y palabras sencillas.",
  },
  habla: {
    key: "habla",
    title: "HABLA",
    emoji: "🗣️",
    color: "#3B82F6",
    soft: "rgba(59, 130, 246, 0.12)",
    action: "Practicar",
    description: "Sonidos, pronunciación, vocabulario y expresión oral.",
  },
};

export const AREA_LIST = ["habla", "lectura", "escritura"];

const VOCALS = ["A", "E", "I", "O", "U"];
const CONSONANTS = ["M", "P", "S", "L", "T", "N", "R", "C", "D", "B"];

// 20 niveles por área con título y enfoque de habilidad
export const LEVELS = {
  lectura: [
    { title: "Sonidos del entorno", skill: "Conciencia auditiva", stage: "Emergente" },
    { title: "Vocal A", skill: "Principio alfabético", stage: "Emergente" },
    { title: "Vocal E", skill: "Principio alfabético", stage: "Emergente" },
    { title: "Vocal I", skill: "Principio alfabético", stage: "Emergente" },
    { title: "Vocal O", skill: "Principio alfabético", stage: "Emergente" },
    { title: "Vocal U", skill: "Principio alfabético", stage: "Emergente" },
    { title: "Repaso de vocales", skill: "Correlación fonema-grafema", stage: "Emergente" },
    { title: "Consonante M", skill: "Principio alfabético", stage: "Inicial" },
    { title: "Consonante P", skill: "Principio alfabético", stage: "Inicial" },
    { title: "Consonante S", skill: "Principio alfabético", stage: "Inicial" },
    { title: "Consonante L", skill: "Principio alfabético", stage: "Inicial" },
    { title: "Sílabas directas: ma me mi mo mu", skill: "Decodificación", stage: "Inicial" },
    { title: "Sílabas directas: pa pe pi po pu", skill: "Decodificación", stage: "Inicial" },
    { title: "Sílabas inversas", skill: "Decodificación", stage: "Inicial" },
    { title: "Palabras familiares", skill: "Lectura de palabras", stage: "Inicial" },
    { title: "Palabras de uso cotidiano", skill: "Lectura de palabras", stage: "Inicial" },
    { title: "Oraciones cortas", skill: "Fluidez inicial", stage: "Inicial" },
    { title: "Cuento: personajes", skill: "Comprensión literal", stage: "Inicial" },
    { title: "Cuento: secuencia", skill: "Comprensión literal", stage: "Inicial" },
    { title: "Cuento: inferencias", skill: "Comprensión inferencial", stage: "Inicial" },
  ],
  escritura: [
    { title: "Garabatos significativos", skill: "Motricidad fina", stage: "Emergente" },
    { title: "Trazos libres", skill: "Grafomotricidad", stage: "Emergente" },
    { title: "Líneas y formas", skill: "Grafomotricidad", stage: "Emergente" },
    { title: "Control de pinza", skill: "Motricidad fina", stage: "Emergente" },
    { title: "Trazo: línea recta", skill: "Grafomotricidad", stage: "Emergente" },
    { title: "Trazo: círculo", skill: "Grafomotricidad", stage: "Emergente" },
    { title: "Trazo: zigzag", skill: "Grafomotricidad", stage: "Emergente" },
    { title: "Trazo de la A", skill: "Escritura de letras", stage: "Emergente" },
    { title: "Trazo de la E", skill: "Escritura de letras", stage: "Emergente" },
    { title: "Trazo de la I", skill: "Escritura de letras", stage: "Emergente" },
    { title: "Trazo de la O", skill: "Escritura de letras", stage: "Emergente" },
    { title: "Trazo de la U", skill: "Escritura de letras", stage: "Emergente" },
    { title: "Consonantes simples", skill: "Escritura de letras", stage: "Inicial" },
    { title: "Mi nombre", skill: "Escritura de palabras", stage: "Inicial" },
    { title: "Palabras sencillas", skill: "Codificación", stage: "Inicial" },
    { title: "Palabras del entorno", skill: "Codificación", stage: "Inicial" },
    { title: "Oraciones cortas", skill: "Producción escrita", stage: "Inicial" },
    { title: "Planificar la idea", skill: "Proceso de escritura", stage: "Inicial" },
    { title: "Revisar la escritura", skill: "Proceso de escritura", stage: "Inicial" },
    { title: "Codificación alfabética", skill: "Codificación", stage: "Inicial" },
  ],
  habla: [
    { title: "Sonidos vocálicos", skill: "Producción de sonidos", stage: "Emergente" },
    { title: "Onomatopeyas", skill: "Conciencia fonológica", stage: "Emergente" },
    { title: "Sonidos del entorno", skill: "Discriminación auditiva", stage: "Emergente" },
    { title: "Repetición de palabras", skill: "Lenguaje oral", stage: "Emergente" },
    { title: "Rimas", skill: "Conciencia fonológica", stage: "Emergente" },
    { title: "Trabalenguas simples", skill: "Fluidez articulatoria", stage: "Emergente" },
    { title: "Canciones", skill: "Lenguaje oral", stage: "Emergente" },
    { title: "Vocabulario: objetos", skill: "Vocabulario de primer nivel", stage: "Emergente" },
    { title: "Vocabulario: acciones", skill: "Vocabulario de primer nivel", stage: "Emergente" },
    { title: "Descripción de personas", skill: "Vocabulario de segundo nivel", stage: "Inicial" },
    { title: "Descripción de objetos", skill: "Vocabulario de segundo nivel", stage: "Inicial" },
    { title: "Narración corta", skill: "Narración", stage: "Inicial" },
    { title: "Modulación de voz", skill: "Expresión oral", stage: "Inicial" },
    { title: "Expresión espontánea", skill: "Expresión oral", stage: "Inicial" },
    { title: "Asociación imagen-palabra", skill: "Lenguaje oral", stage: "Inicial" },
    { title: "Pronunciación clara", skill: "Articulación", stage: "Inicial" },
    { title: "Frases cortas", skill: "Producción oral", stage: "Inicial" },
    { title: "Expresión de ideas", skill: "Producción oral", stage: "Inicial" },
    { title: "Conversación guiada", skill: "Interacción oral", stage: "Inicial" },
    { title: "Narración de sucesos", skill: "Narración", stage: "Inicial" },
  ],
};

export const ACTIVITIES_PER_LEVEL = 12;

// Genera las actividades de un nivel dado (determinista por área + nivel)
export function getActivities(area, levelNumber) {
  const level = LEVELS[area][levelNumber - 1];
  if (!level) return [];
  const seed = area.charCodeAt(0) * 100 + levelNumber;
  const acts = [];
  for (let i = 0; i < ACTIVITIES_PER_LEVEL; i++) {
    acts.push(generateActivity(area, levelNumber, level, i, seed + i * 7));
  }
  return acts;
}

function pick(arr, n) {
  return arr[n % arr.length];
}

function shuffle(opts, seed) {
  const a = [...opts];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateActivity(area, levelNumber, level, index, seed) {
  if (area === "lectura") return genLectura(levelNumber, level, index, seed);
  if (area === "escritura") return genEscritura(levelNumber, level, index, seed);
  return genHabla(levelNumber, level, index, seed);
}

function genLectura(levelNumber, level, index, seed) {
  // Niveles 2-6: vocales individuales; 8-11: consonantes; 12-14: sílabas; 15-16: palabras; 17: oraciones; 18-20: comprensión
  if (levelNumber === 1) {
    return {
      type: "escuchar",
      instruction: "Escucha y toca el sonido que escuchas",
      prompt: pick(["el viento", "el agua", "un carro", "un perro", "un pájaro"], index),
      options: ["🌬️", "💧", "🚗", "🐶", "🐦"],
      correct: index % 5,
      speak: pick(["viento", "agua", "carro", "perro", "pájaro"], index),
    };
  }
  if (levelNumber >= 2 && levelNumber <= 6) {
    const v = VOCALS[levelNumber - 2];
    const others = shuffle(VOCALS, seed).filter((x) => x !== v).slice(0, 3);
    const opts = shuffle([v, ...others], seed);
    return {
      type: "escuchar",
      instruction: `Escucha y encuentra la vocal ${v}`,
      prompt: `Vocal ${v}`,
      options: opts,
      correct: opts.indexOf(v),
      speak: v,
    };
  }
  if (levelNumber === 7) {
    const v = pick(VOCALS, seed);
    const opts = shuffle(VOCALS, seed);
    return {
      type: "escuchar",
      instruction: "Escucha la vocal y tócala",
      prompt: `Vocal ${v}`,
      options: opts,
      correct: opts.indexOf(v),
      speak: v,
    };
  }
  if (levelNumber >= 8 && levelNumber <= 11) {
    const c = CONSONANTS[levelNumber - 8];
    const others = shuffle(CONSONANTS, seed).filter((x) => x !== c).slice(0, 3);
    const opts = shuffle([c, ...others], seed);
    return {
      type: "escuchar",
      instruction: `Encuentra la letra ${c}`,
      prompt: `Letra ${c}`,
      options: opts,
      correct: opts.indexOf(c),
      speak: c.toLowerCase(),
    };
  }
  if (levelNumber >= 12 && levelNumber <= 13) {
    const base = levelNumber === 12 ? "m" : "p";
    const syllables = [`${base}a`, `${base}e`, `${base}i`, `${base}o`, `${base}u`];
    const syl = pick(syllables, index);
    const opts = shuffle(syllables, seed);
    return {
      type: "escuchar",
      instruction: "Escucha la sílaba y tócala",
      prompt: syl,
      options: opts,
      correct: opts.indexOf(syl),
      speak: syl,
    };
  }
  if (levelNumber === 14) {
    const inv = pick(["am", "em", "im", "om", "um"], index);
    const opts = shuffle(["am", "em", "im", "om", "um"], seed);
    return {
      type: "escuchar",
      instruction: "Escucha la sílaba inversa",
      prompt: inv,
      options: opts,
      correct: opts.indexOf(inv),
      speak: inv,
    };
  }
  if (levelNumber >= 15 && levelNumber <= 16) {
    const words = ["mamá", "papá", "casa", "sol", "luna", "gato", "oso", "mesa"];
    const w = pick(words, index);
    const opts = shuffle(words, seed).slice(0, 4);
    if (!opts.includes(w)) opts[0] = w;
    const o = shuffle(opts, seed + 1);
    return {
      type: "escuchar",
      instruction: "Escucha la palabra y elige la imagen",
      prompt: w,
      options: o.map((x) => wordEmoji(x)),
      optionLabels: o,
      correct: o.indexOf(w),
      speak: w,
    };
  }
  if (levelNumber === 17) {
    const sentences = ["El sol brilla", "La luna sale", "Mi mamá canta", "El gato corre"];
    const s = pick(sentences, index);
    return {
      type: "repetir",
      instruction: "Lee la oración en voz alta",
      prompt: s,
      speak: s,
    };
  }
  // 18-20 comprensión
  const stories = [
    { text: "Había una niña llamada Ana. Ella tenía un gato gris.", q: "¿Cómo se llamaba la niña?", options: ["Ana", "Luna", "Sofía"], correct: 0 },
    { text: "El perro de Luis corre rápido tras la pelota roja.", q: "¿De qué color era la pelota?", options: ["Roja", "Azul", "Verde"], correct: 0 },
    { text: "María sembró una planta. Primero la regó, luego salió el sol.", q: "¿Qué hizo María primero?", options: ["Regar la planta", "Ver el sol", "Correr"], correct: 0 },
  ];
  const story = pick(stories, index);
  return {
    type: "comprension",
    instruction: story.q,
    prompt: story.text,
    options: story.options,
    correct: story.correct,
    speak: story.text + " " + story.q,
  };
}

function genEscritura(levelNumber, level, index, seed) {
  if (levelNumber <= 3) {
    const shapes = ["linea", "circulo", "zigzag", "ondula"];
    return {
      type: "trazar",
      instruction: "Traza con tu dedo siguiendo la guía",
      prompt: pick(["Línea recta", "Círculo", "Zigzag", "Onda"], levelNumber - 1 + index),
      shape: pick(shapes, levelNumber - 1 + index),
    };
  }
  if (levelNumber === 4) {
    return {
      type: "trazar",
      instruction: "Traza pequeños puntos con tu dedo",
      prompt: "Control de pinza",
      shape: "puntos",
    };
  }
  if (levelNumber >= 5 && levelNumber <= 7) {
    const shapes = ["linea", "circulo", "zigzag", "ondula", "cruz"];
    return {
      type: "trazar",
      instruction: "Traza la forma con tu dedo",
      prompt: pick(["Línea", "Círculo", "Zigzag", "Onda", "Cruz"], index),
      shape: pick(shapes, index),
    };
  }
  if (levelNumber >= 8 && levelNumber <= 12) {
    const v = VOCALS[levelNumber - 8];
    return {
      type: "trazar",
      instruction: `Traza la letra ${v}`,
      prompt: `Letra ${v}`,
      shape: "letra",
      letter: v,
    };
  }
  if (levelNumber === 13) {
    const c = pick(CONSONANTS, index);
    return {
      type: "trazar",
      instruction: `Traza la letra ${c}`,
      prompt: `Letra ${c}`,
      shape: "letra",
      letter: c,
    };
  }
  if (levelNumber >= 14 && levelNumber <= 16) {
    const words = ["sol", "luna", "casa", "mesa", "gato", "oso"];
    const w = pick(words, index);
    return {
      type: "trazar",
      instruction: "Copia la palabra",
      prompt: w,
      shape: "palabra",
      letter: w,
    };
  }
  if (levelNumber === 17) {
    return {
      type: "trazar",
      instruction: "Escribe una oración corta",
      prompt: "El sol brilla",
      shape: "palabra",
      letter: "El sol brilla",
    };
  }
  // 18-20 proceso de escritura
  return {
    type: "trazar",
    instruction: "Planifica y escribe tu idea",
    prompt: pick(["Mi familia", "Mi mascota", "Mi casa", "Mi escuela"], index),
    shape: "palabra",
    letter: "",
    free: true,
  };
}

function genHabla(levelNumber, level, index, seed) {
  if (levelNumber === 1) {
    const v = pick(VOCALS, index);
    return {
      type: "repetir",
      instruction: `Repite la vocal ${v}`,
      prompt: v,
      speak: v,
    };
  }
  if (levelNumber === 2) {
    const ono = [
      { w: "¡Muu!", e: "🐮" },
      { w: "¡Guau!", e: "🐶" },
      { w: "¡Miau!", e: "🐱" },
      { w: "¡Pío!", e: "🐦" },
      { w: "¡Beee!", e: "🐑" },
    ];
    const o = pick(ono, index);
    return {
      type: "repetir",
      instruction: "Imita el sonido del animal",
      prompt: o.w,
      emoji: o.e,
      speak: o.w,
    };
  }
  if (levelNumber === 3) {
    return {
      type: "repetir",
      instruction: "Escucha y repite el sonido",
      prompt: pick(["tic tac", "pum pum", "fuuu", "clap clap"], index),
      speak: pick(["tic tac", "pum pum", "fuuu", "clap clap"], index),
    };
  }
  if (levelNumber === 4) {
    const words = ["mamá", "papá", "casa", "sol", "luna", "mesa", "gato", "oso"];
    const w = pick(words, index);
    return {
      type: "repetir",
      instruction: "Repite la palabra",
      prompt: w,
      emoji: wordEmoji(w),
      speak: w,
    };
  }
  if (levelNumber === 5) {
    const rhymes = [
      { a: "gato", b: "zapato" },
      { a: "sol", b: "col" },
      { a: "luna", b: "cuna" },
      { a: "flor", b: "color" },
    ];
    const r = pick(rhymes, index);
    return {
      type: "escuchar",
      instruction: "¿Qué palabra rima?",
      prompt: r.a,
      options: [r.b, pick(["perro", "mesa", "árbol"], index)],
      correct: 0,
      speak: `${r.a} ... ${r.b}`,
    };
  }
  if (levelNumber === 6) {
    return {
      type: "repetir",
      instruction: "Repite el trabalenguas despacio",
      prompt: pick(["Pito, pito, colorito", "Tres tristes tigres", "Casa casa casa"], index),
      speak: pick(["Pito pito colorito", "Tres tristes tigres", "Casa casa casa"], index),
    };
  }
  if (levelNumber === 7) {
    return {
      type: "repetir",
      instruction: "Canta con el robot",
      prompt: pick(["La vaca Lola", "Los pollitos", "Arroz con leche"], index),
      speak: pick(["La vaca Lola", "Los pollitos dicen", "Arroz con leche"], index),
    };
  }
  if (levelNumber >= 8 && levelNumber <= 11) {
    const vocab = [
      { w: "manzana", e: "🍎" },
      { w: "pelota", e: "⚽" },
      { w: "libro", e: "📚" },
      { w: "correr", e: "🏃" },
      { w: "saltar", e: "🤸" },
      { w: "comer", e: "🍽️" },
      { w: "abuelita", e: "👵" },
      { w: "doctor", e: "👨‍⚕️" },
    ];
    const v = pick(vocab, index);
    return {
      type: "repetir",
      instruction: "Di el nombre de la imagen",
      prompt: v.w,
      emoji: v.e,
      speak: v.w,
    };
  }
  if (levelNumber >= 12 && levelNumber <= 14) {
    return {
      type: "repetir",
      instruction: "Cuenta lo que ves con tu voz",
      prompt: pick(["Un día soleado", "El perro corre", "La niña lee", "El barco navega"], index),
      emoji: pick(["☀️", "🐶", "👧", "⛵"], index),
      speak: pick(["Un día soleado", "El perro corre", "La niña lee", "El barco navega"], index),
    };
  }
  if (levelNumber >= 15 && levelNumber <= 20) {
    return {
      type: "repetir",
      instruction: "Escucha y repite la frase",
      prompt: pick([
        "Me gusta jugar",
        "Mi mamá me quiere",
        "Hoy hace calor",
        "Tengo un perro gris",
        "Voy a la escuela",
        "La luna es blanca",
      ], index),
      speak: pick([
        "Me gusta jugar",
        "Mi mamá me quiere",
        "Hoy hace calor",
        "Tengo un perro gris",
        "Voy a la escuela",
        "La luna es blanca",
      ], index),
    };
  }
}

function wordEmoji(w) {
  const map = {
    mamá: "👩", papá: "👨", casa: "🏠", sol: "☀️", luna: "🌙",
    gato: "🐱", oso: "🐻", mesa: "🪑", perro: "🐶", pelota: "⚽",
    manzana: "🍎", libro: "📚",
  };
  return map[w] || "⭐";
}

export function getStageForGrade(grade) {
  if (grade === "Parvularia 4" || grade === "Parvularia 5") return "Emergente";
  return "Inicial";
}

// Nivel inicial sugerido según el grado
export function startingLevelForGrade(grade) {
  if (grade === "Parvularia 4") return 1;
  if (grade === "Parvularia 5") return 5;
  if (grade === "Parvularia 6") return 10;
  return 14; // Primer grado
}