import { useEffect } from "react"

export const Home = () => {

  useEffect(() => {
    document.title = "Realtor Clone | Home"
  }, [])

  return (
    <div>Home</div>
  )
}