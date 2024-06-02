import { PropsWithChildren } from 'hono/jsx'

type Props = {
  username?: string
  passwordSmall?: JSX.Element
}

export default function LoginForm({ username, passwordSmall }: PropsWithChildren<Props>) {
  return (
    <div class="container">
      <div class="flex flex-col justify-center w-full h-screen">
        <h3>HTMX Contact</h3>
        <form action='/' method='POST'>
          <input
            name="username"
            type="text" placeholder="username" />
          {username}
          <input
            name="password"
            type="text" placeholder="password" />
          {passwordSmall}
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}