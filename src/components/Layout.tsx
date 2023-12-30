import { FC } from 'hono/jsx'

export const Layout: FC = (props) =>{
  return (
    <div class="bg-slate-400 p-8 flex flex-col gap-2">
      <h1>CONTACTS.APP</h1>
      <h2>A Demo Contacts Application</h2>
      {props.children}
    </div>
  )
}