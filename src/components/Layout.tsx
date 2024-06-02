import { FC } from 'hono/jsx'

export const Layout: FC = (props) => {
  return (
    <div class="w-screen h-full bg-slate-400 p-8 flex flex-col gap-2">
      <h1 class="text-3xl font-bold">CONTACTS.APP</h1>
      <h2 class="text-xl font-bold">A Demo Contacts Application</h2>
      <div class="border border-slate-800"/>
      <button hx-post="/logout" hx-target="body" hx-push-url="true">Log out</button>
      {props.children}
    </div>
  )
}