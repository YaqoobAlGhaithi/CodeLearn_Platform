import { describe, expect, it } from "vitest";
import { calculateProgress, createCommentInput, createTopicInput } from "../shared/learning";

describe("learning helpers", () => {
  it("calculates a bounded rounded progress percentage", () => {
    expect(calculateProgress(0, 10)).toBe(0);
    expect(calculateProgress(1, 3)).toBe(33);
    expect(calculateProgress(12, 10)).toBe(100);
    expect(calculateProgress(1, 0)).toBe(0);
  });

  it("accepts a valid topic and applies the default category", () => {
    const result = createTopicInput.parse({
      title: "كيف أتعلم Flexbox؟",
      content: "أحتاج إلى مثال بسيط يوضح طريقة ترتيب العناصر.",
    });
    expect(result.category).toBe("general");
  });

  it("rejects short forum content", () => {
    expect(() => createTopicInput.parse({ title: "سؤال", content: "قصير" })).toThrow();
    expect(() => createCommentInput.parse({ topicId: 0, content: "تعليق" })).toThrow();
  });
});
