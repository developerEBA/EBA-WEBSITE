import { faqTopics } from "./faq-data";

export function normalizeFaqSearch(value: string) {
  return value.normalize("NFKD").replace(/\p{Diacritic}/gu, "")
    .toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

export function searchFaqs(query: string) {
  const tokens = normalizeFaqSearch(query).split(/\s+/).filter(Boolean)
    .flatMap(token => {
      if (token === "pr") return ["public", "relations"];
      if (token === "ads" || token === "ad") return ["advertising"];
      if (token === "branding") return ["brand"];
      return [token];
    });
  return faqTopics.map(topic => ({
    ...topic,
    matches: topic.items.map(([question, answer], index) => ({ question, answer, index }))
      .filter(item => {
        const text = normalizeFaqSearch(`${topic.title} ${item.question} ${item.answer}`);
        const words = text.split(" ");
        return tokens.every(token => token.length <= 2 ? words.includes(token) : text.includes(token));
      }),
  })).filter(topic => topic.matches.length > 0);
}
