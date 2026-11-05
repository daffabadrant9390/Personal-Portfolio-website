import { beforeEach, describe, expect, it } from "vitest";
import { useContactStore } from "./useContactStore";

const validForm = {
  name: "Daffa",
  email: "daffa@example.com",
  subject: "Hello",
  message: "I would like to work together.",
};

function fillForm(values: Partial<typeof validForm> = {}) {
  const { setField } = useContactStore.getState();
  Object.entries({ ...validForm, ...values }).forEach(([field, value]) =>
    setField(field as keyof typeof validForm, value)
  );
}

beforeEach(() => {
  useContactStore.getState().reset();
});

describe("useContactStore", () => {
  it("starts empty and idle", () => {
    const state = useContactStore.getState();
    expect(state.name).toBe("");
    expect(state.email).toBe("");
    expect(state.subject).toBe("");
    expect(state.message).toBe("");
    expect(state.status).toBe("idle");
    expect(state.errors).toEqual({});
  });

  it("updates a single field", () => {
    useContactStore.getState().setField("name", "Daffa");
    expect(useContactStore.getState().name).toBe("Daffa");
    expect(useContactStore.getState().email).toBe("");
  });

  it("updates the submission status", () => {
    useContactStore.getState().setStatus("submitting");
    expect(useContactStore.getState().status).toBe("submitting");
  });

  describe("validate", () => {
    it("reports an error for every empty field", () => {
      const isValid = useContactStore.getState().validate();

      expect(isValid).toBe(false);
      expect(useContactStore.getState().errors).toEqual({
        name: "Name is required",
        email: "Email is required",
        subject: "Subject is required",
        message: "Message is required",
      });
    });

    it("treats whitespace-only values as empty", () => {
      fillForm({ name: "   ", subject: "\t", message: "\n" });

      expect(useContactStore.getState().validate()).toBe(false);
      const { errors } = useContactStore.getState();
      expect(errors.name).toBe("Name is required");
      expect(errors.subject).toBe("Subject is required");
      expect(errors.message).toBe("Message is required");
      expect(errors.email).toBeUndefined();
    });

    it.each(["plainaddress", "missing@tld", "@no-local.com", "two@@example.com", "spaces in@example.com"])(
      "rejects the invalid email %s",
      (email) => {
        fillForm({ email });

        expect(useContactStore.getState().validate()).toBe(false);
        expect(useContactStore.getState().errors.email).toBe("Invalid email address");
      }
    );

    it.each(["user@example.com", "first.last+tag@sub.example.co.id", "a_b-c@example.io"])(
      "accepts the valid email %s",
      (email) => {
        fillForm({ email });

        expect(useContactStore.getState().validate()).toBe(true);
        expect(useContactStore.getState().errors).toEqual({});
      }
    );

    it("trims surrounding whitespace before checking the email", () => {
      fillForm({ email: "  user@example.com  " });
      expect(useContactStore.getState().validate()).toBe(true);
    });

    it("passes for a fully valid form", () => {
      fillForm();
      expect(useContactStore.getState().validate()).toBe(true);
      expect(useContactStore.getState().errors).toEqual({});
    });

    it("clears old errors once the form becomes valid", () => {
      useContactStore.getState().validate();
      expect(Object.keys(useContactStore.getState().errors)).toHaveLength(4);

      fillForm();
      expect(useContactStore.getState().validate()).toBe(true);
      expect(useContactStore.getState().errors).toEqual({});
    });
  });

  it("clears only the error of the field being edited", () => {
    useContactStore.getState().validate();

    useContactStore.getState().setField("name", "Daffa");

    const { errors } = useContactStore.getState();
    expect(errors.name).toBeUndefined();
    expect(errors.email).toBe("Email is required");
    expect(errors.subject).toBe("Subject is required");
    expect(errors.message).toBe("Message is required");
  });

  it("resets values, status and errors", () => {
    fillForm();
    useContactStore.getState().setStatus("success");
    useContactStore.getState().setField("email", "");
    useContactStore.getState().validate();

    useContactStore.getState().reset();

    const state = useContactStore.getState();
    expect(state.name).toBe("");
    expect(state.email).toBe("");
    expect(state.subject).toBe("");
    expect(state.message).toBe("");
    expect(state.status).toBe("idle");
    expect(state.errors).toEqual({});
  });
});
