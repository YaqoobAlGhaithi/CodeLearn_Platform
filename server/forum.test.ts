import { describe, expect, it } from "vitest";
import { createTopicInput, createCommentInput } from "../shared/learning";

describe("Forum input validation schemas", () => {
  it("validates correct topic payload", () => {
    const data = {
      title: "كيف أبدأ مع React؟",
      content: "أريد معرفة أفضل المصادر للمبتدئين.",
      category: "react",
    };
    const parsed = createTopicInput.safeParse(data);
    expect(parsed.success).toBe(true);
  });

  it("fails on empty comment content", () => {
    const data = {
      topicId: 1,
      content: "أ",
    };
    const parsed = createCommentInput.safeParse(data);
    expect(parsed.success).toBe(false);
  });
});
