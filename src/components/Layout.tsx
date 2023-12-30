import { FC } from 'hono/jsx'

export const Layout: FC = (props) => {
  return (
    <div class="w-screen h-screen bg-slate-400 p-8 flex flex-col gap-2">
      <h1 class="text-3xl font-bold">CONTACTS.APP</h1>
      <h2 class="text-xl font-bold">A Demo Contacts Application</h2>
      <div class="border border-slate-800"/>
      {props.children}
    </div>
  )
}