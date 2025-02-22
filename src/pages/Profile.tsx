import { FormEvent } from "react"
import { useProfile } from "../hooks/useProfile"

export default function ProfilePage() {
  const { profile, updateProfile } = useProfile()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const name = formData.get('name') as string
    const age = formData.get('age') as string

    updateProfile({
      name,
      age: Number(age)
    })

    window.location.reload()
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-saira">
        Profile
      </h1>

      <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          name="name"
          className="font-paytone rounded-2xl p-4 bg-gradient-to-b from-yellow-100 to-yellow-500 text-black"
          defaultValue={profile?.name || ""}
          placeholder="Enter your name"
          type="text"
        />
        <input
          name="age"
          className="font-paytone rounded-2xl p-4 bg-gradient-to-b from-yellow-100 to-yellow-500 text-black"
          defaultValue={profile?.age || ""}
          placeholder="Enter your age"
          type="number"
        />
        <button className="p-4 hover:cursor-pointer w-fit ml-auto rounded-2xl bg-[linear-gradient(to_bottom,#bbe,#bee,#aaf)] text-black font-saira text-xl">
          {profile ? "Update" : "Continue"}
        </button>
      </form>
    </div>
  )
}
