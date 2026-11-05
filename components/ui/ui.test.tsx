import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

describe("Button", () => {
  it("renders children with the button slot", () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("data-slot", "button");
  });

  it("merges a custom className", () => {
    render(<Button className="custom-class">Save</Button>);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("applies variant and size classes", () => {
    render(
      <Button variant="destructive" size="icon">
        X
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button.className).toContain("text-destructive");
    expect(button.className).toContain("size-8");
  });

  it("is not focusable-clickable when disabled", () => {
    render(<Button disabled>Nope</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});

describe("Badge", () => {
  it("renders a span by default with badge slot", () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText("New");
    expect(badge.tagName).toBe("SPAN");
    expect(badge).toHaveAttribute("data-slot", "badge");
  });

  it("applies the requested variant and custom className", () => {
    render(
      <Badge variant="outline" className="extra">
        Tag
      </Badge>
    );
    const badge = screen.getByText("Tag");
    expect(badge).toHaveClass("extra");
    expect(badge.className).toContain("text-foreground");
  });

  it("supports the render prop to change the element", () => {
    render(<Badge render={<a href="/x" />}>Link</Badge>);
    expect(screen.getByRole("link", { name: "Link" })).toHaveAttribute("href", "/x");
  });
});

describe("Card", () => {
  it("renders all card parts with their slots", () => {
    render(
      <Card size="sm" className="my-card">
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
          <CardAction>Action</CardAction>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText("Title")).toHaveAttribute("data-slot", "card-title");
    expect(screen.getByText("Description")).toHaveAttribute("data-slot", "card-description");
    expect(screen.getByText("Action")).toHaveAttribute("data-slot", "card-action");
    expect(screen.getByText("Content")).toHaveAttribute("data-slot", "card-content");
    expect(screen.getByText("Footer")).toHaveAttribute("data-slot", "card-footer");

    const card = screen.getByText("Content").closest('[data-slot="card"]');
    expect(card).toHaveAttribute("data-size", "sm");
    expect(card).toHaveClass("my-card");
  });

  it("defaults to the default size", () => {
    render(<Card>Body</Card>);
    expect(screen.getByText("Body")).toHaveAttribute("data-size", "default");
  });
});

describe("Input", () => {
  it("renders with type and placeholder", () => {
    render(<Input type="email" placeholder="you@example.com" />);
    const input = screen.getByPlaceholderText("you@example.com");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("data-slot", "input");
  });

  it("is disabled when requested", () => {
    render(<Input disabled placeholder="x" />);
    expect(screen.getByPlaceholderText("x")).toBeDisabled();
  });
});

describe("Label", () => {
  it("associates with a control via htmlFor", () => {
    render(
      <>
        <Label htmlFor="name">Name</Label>
        <input id="name" />
      </>
    );
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByText("Name")).toHaveAttribute("data-slot", "label");
  });
});

describe("Separator", () => {
  it("is horizontal by default", () => {
    render(<Separator data-testid="sep" />);
    const sep = screen.getByTestId("sep");
    expect(sep).toHaveAttribute("data-slot", "separator");
    expect(sep).toHaveAttribute("data-orientation", "horizontal");
  });

  it("supports vertical orientation", () => {
    render(<Separator orientation="vertical" data-testid="sep" />);
    expect(screen.getByTestId("sep")).toHaveAttribute("data-orientation", "vertical");
  });
});

describe("Textarea", () => {
  it("renders a textarea with slot and value", () => {
    render(<Textarea defaultValue="hello" aria-label="msg" className="mine" />);
    const el = screen.getByLabelText("msg");
    expect(el.tagName).toBe("TEXTAREA");
    expect(el).toHaveValue("hello");
    expect(el).toHaveAttribute("data-slot", "textarea");
    expect(el).toHaveClass("mine");
  });
});
