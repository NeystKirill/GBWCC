const RU_MAP = {
  а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'yo',ж:'zh',з:'z',и:'i',
  й:'j',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',
  у:'u',ф:'f',х:'kh',ц:'ts',ч:'ch',ш:'sh',щ:'sch',ъ:'',ы:'y',
  ь:'',э:'e',ю:'yu',я:'ya'
}

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[а-яё]/g, ch => RU_MAP[ch] || ch)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
