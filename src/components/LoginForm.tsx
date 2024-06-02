export default function LoginForm() {
  return (
    <form action='/' method='POST'>
      <input
        name="username"
        type="text" placeholder="username" />
      <input
        name="password"
        type="text" placeholder="password" />
      <button>Submit</button>
    </form>
  )
}