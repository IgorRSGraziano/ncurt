import Router from "next/router";

export default function Home() {
  function mudarUrl(url: string) {
    window.location.href = url;
  }
  return (
    <div>
      Hello
      {/* {Router.push('google.com')} */}
      <p>Olá</p>
      <button onClick={() => mudarUrl('google.com')}>Mudar URL</button>
    </div>
  )
}
