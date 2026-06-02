# Valet Company Website Template

Static, responsive website foundation for Western Parking. Open `index.html`
directly or run a local server:

```bash
python3 -m http.server 4173
```

## Brand configuration

Business and contact details live in the `siteConfig` object at the top of
`script.js`. The supplied Western Parking artwork is stored at:

```text
assets/western-parking-logo.png
```

The visible placeholders update automatically across the page.

## Form connection

The quote form is intentionally front-end only for the first pass. Replace the
demo submit handler in `script.js` with the final Formspree, CRM, email, or API
integration once the destination is known.
