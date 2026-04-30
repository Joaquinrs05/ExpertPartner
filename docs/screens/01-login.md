# Screen 01 — Login

**Route:** `/login`  
**Design ref:** `stitch_consultancy_operations_hub/login_expert_partner/`  
**Skill:** `skills/04-auth-login.md`

## Layout
Centered card on grey background with subtle dot-grid pattern. Card floats with `box-shadow: 0 8px 32px rgba(0,0,0,0.08)`.

## Elements
- Logo icon + "Expert Partner" (h2) + "Management Suite Access" (body-md, muted)
- Email input — icon: envelope, placeholder: `name@consultancy.com`
- Password input — icon: lock, + "Forgot password?" right-aligned link
- "LOG IN →" button — black, full-width, uppercase, `letter-spacing: 0.08em`
- Footer — legal text + "Contact IT Support" link

## Behavior
- Submit with empty fields → red border + "This field is required" on each empty input
- Loading state → spinner replaces arrow, button disabled
- Success → redirect based on role
- Input focus → emerald border + 2px glow
