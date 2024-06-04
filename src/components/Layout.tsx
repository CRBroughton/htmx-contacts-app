import { FC } from 'hono/jsx'
import AddContact from './AddContact'

export const Layout: FC = (props) => {
  return (
    <div class="w-screen h-full  p-8 flex flex-col gap-2">
      <div>
        <div>
          <h1 class="text-3xl font-bold">CONTACTS.APP</h1>
          <h2 class="text-xl font-bold">A Demo Contacts Application</h2>
        </div>
        <div class="flex gap-2">
          <AddContact />
          <button hx-post="/logout" hx-target="body" hx-push-url="true">Log out</button>
        </div>
        <p class="mt-6">
          <span hx-get="/contacts/count" hx-trigger="revealed">
            <img width={25} id="spinner" class="htmx-indicator" src="public/spinner.svg" />
          </span>
        </p>
      </div>
      <div class="border border-slate-800"/>
      {props.children}
    </div>
  )
}