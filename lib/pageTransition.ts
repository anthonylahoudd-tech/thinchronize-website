// Minimal pub/sub so any component can trigger the page transition
// without needing React context.

type Handler = (href: string) => void
const handlers: Handler[] = []

/** Call this from buttons, links, or anywhere to trigger a transition */
export function transitionTo(href: string) {
  handlers.forEach(fn => fn(href))
}

/** PageTransition registers here to receive navigation requests */
export function onTransitionNavigate(fn: Handler): () => void {
  handlers.push(fn)
  return () => {
    const i = handlers.indexOf(fn)
    if (i > -1) handlers.splice(i, 1)
  }
}
