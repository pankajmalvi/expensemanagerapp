# Neobrutalism Design System: ExpenseFlow

**Version**: 1.0.0  
**Design Philosophy**: Authentic Neobrutalism  
**Core Principles**: High contrast, crisp borders, hard offset drop shadows, solid flat colors, zero gradients, zero blurry drop shadows, high utility, zero AI slop.

---

## 1. Principles & Anti-Patterns

### Core Principles
1. **Bold Structure**: Solid 2px–3px jet-black borders (`#000000`) defining all functional boundaries.
2. **Hard-Edge Shadows**: Offset drop shadows with 0px blur radius (e.g., `4px 4px 0px 0px #000000`).
3. **Tactile Micro-interactions**: Hover moves the element towards the shadow (`translate(2px, 2px)` with shadow reducing to `2px 2px`), active clicks flatten completely (`translate(4px, 4px)` with shadow `0px 0px`).
4. **Vibrant & Accessible Surfaces**: Saturated pastel and canary accent fills grounded by stark ink-black typography and off-white neutral backdrops.
5. **Purpose-Driven CTAs**: Clear, direct, action-oriented button copy without fluff or generic filler phrases.
6. **Dual-Layer Validation Feedback**: Immediate inline alerts with high-contrast badge containers, clear icons, and descriptive remedy instructions.

### Anti-Patterns to Strictly Avoid ("Anti-Slop")
- ❌ **No Gradients**: Never use linear or radial gradients (`bg-gradient-to-...`).
- ❌ **No Blurry Soft Shadows**: Never use fuzzy shadows (`shadow-md`, `shadow-lg`, `shadow-2xl` without custom offset).
- ❌ **No Glassmorphism**: No translucent frosted glass effects (`backdrop-blur-...`, `bg-white/30`).
- ❌ **No Tech Stack Jargon in End-User UI**: Never display developer details (e.g. "FastAPI backend", "SQLite database", "Test cases passing") in user-facing components.
- ❌ **No Useless Generic Placeholders**: Form placeholders must show realistic examples (e.g., `"e.g., Grocery shopping, Electric bill"`).

---

## 2. Color Palette & Semantic Tokens

| Token Name | Hex Code | Tailwind Utility | Semantic Purpose |
|---|---|---|---|
| **Canvas Background** | `#FAF9F6` | `bg-[#FAF9F6]` | Page canvas, soft off-white/alabaster reducing eye strain |
| **Ink Black** | `#000000` / `#121212` | `bg-black`, `text-black` | Borders, shadows, headings, high-contrast labels |
| **Pure White** | `#FFFFFF` | `bg-white` | Card backgrounds, input surfaces, badge fills |
| **Canary Yellow** | `#FEF08A` | `bg-[#FEF08A]` | Primary attention, action items, category highlights |
| **Mint Green** | `#BBF7D0` | `bg-[#BBF7D0]` | Financial income/amounts, positive states, success alerts |
| **Emerald Accent** | `#4EFA94` | `bg-[#4EFA94]` | Primary submit buttons, successful actions |
| **Coral Pink** | `#FECDD3` | `bg-[#FECDD3]` | Expense metrics, warning banners, error alerts |
| **Sky Blue** | `#BAE6FD` | `bg-[#BAE6FD]` | Average metrics, secondary information |
| **Lilac Purple** | `#E9D5FF` | `bg-[#E9D5FF]` | Category badges, classification tags |
| **Muted Neutral** | `#525252` | `text-neutral-600` | Secondary description text, captions |

---

## 3. Typography Scale

- **Display / Page Title**: `text-2xl sm:text-3xl font-black tracking-tight text-black`
- **Section / Card Heading**: `text-lg font-black tracking-tight text-black`
- **Metric Values**: `text-3xl sm:text-4xl font-black tracking-tight text-black`
- **Form Labels**: `text-xs font-black uppercase tracking-wider text-black`
- **Body / Descriptions**: `text-xs sm:text-sm font-semibold text-neutral-700`
- **Pills / Badges**: `text-xs font-black text-black`
- **Table Data**: `text-sm font-bold text-black`

---

## 4. Elevation, Borders & Shadows

```css
/* Standard Cards */
border: 3px solid #000000;
box-shadow: 4px 4px 0px 0px #000000;
border-radius: 0.75rem;

/* Hoverable Cards */
transition: all 0.15s ease-in-out;
&:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px 0px #000000;
}

/* Primary & Action Buttons */
border: 3px solid #000000;
box-shadow: 4px 4px 0px 0px #000000;
border-radius: 0.5rem;
&:hover:not(:disabled) {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px 0px #000000;
}
&:active:not(:disabled) {
  transform: translate(4px, 4px);
  box-shadow: 0px 0px 0px 0px #000000;
}

/* Inputs & Dropdowns */
border: 3px solid #000000;
box-shadow: 3px 3px 0px 0px #000000;
border-radius: 0.5rem;
&:focus {
  outline: none;
  border-color: #000000;
  box-shadow: 5px 5px 0px 0px #000000;
  transform: translate(-1px, -1px);
}

/* Micro Badges / Pills */
border: 2px solid #000000;
box-shadow: 2px 2px 0px 0px #000000;
border-radius: 0.375rem;
```

---

## 5. Component Patterns

### 5.1 KPI Summary Metric Cards
- 3-column layout on desktop, single-column on mobile.
- High-contrast background color (`#FECDD3` for Total, `#BBF7D0` for Count, `#BAE6FD` for Average).
- Upper banner badge indicating metric type.
- Prominent formatted figure with subtle helper text.

### 5.2 Category Section
- Inline creation form: text input with placeholder + `+ Add` button.
- Real-time client-side duplicate warning before submitting.
- Active category list displayed as interactive chips with attached expense counter badges (e.g. `Food (3)`).
- Empty state: dashed border container with actionable helper message.

### 5.3 Expense Form
- Title input, numeric amount input (with currency prefix), category dropdown.
- When categories are empty: inputs disabled with prominent canary warning prompt to create a category first.
- Inline error and success feedback banners.
- Primary full-width CTA: `Record Expense`.

### 5.4 Expense Ledger Table
- Clean tabular view with crisp borders.
- Columns: Date & Time, Title, Category Badge, Formatted Amount.
- Empty state: clean Neobrutal card with `Inbox` icon and direct encouragement to record the first transaction.

---

## 6. Implementation Checklist for New Components

1. Does the component use flat solid colors without any gradients?
2. Are all borders jet-black (`#000000`) with 2px or 3px width?
3. Are all shadows hard offset shadows without blur (`box-shadow: Xpx Ypx 0px 0px #000`)?
4. Are hover and active states tactile (translating into the shadow)?
5. Is the copy direct, professional, and free of developer/interview jargon?
6. Are form errors displayed with high contrast and explicit remedy guidance?
